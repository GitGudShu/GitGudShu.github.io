import { readStored, writeStored } from './storage.js';
import { translate } from './i18n/index.js';
import { TRACKS, hasVideo, renderTrackArt } from './data/tracks.js';

export const VOLUME_KEY = 'tc-volume';

/**
 * Privacy-enhanced host, and nothing at all is requested from Google until the
 * visitor presses play. Until then the stage shows our own cover art.
 */
const HOST = 'https://www.youtube-nocookie.com';
const API = 'https://www.youtube.com/iframe_api';

export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

export function clampVolume(value) {
  if (!Number.isFinite(value)) return 1;
  return Math.min(1, Math.max(0, value));
}

export function nextIndex(index, length) {
  if (length <= 0) return 0;
  return (index + 1) % length;
}

let apiPromise = null;

function loadApi() {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    if (window.YT?.Player) { resolve(window.YT); return; }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT);
    };
    const script = document.createElement('script');
    script.src = API;
    script.async = true;
    script.onerror = () => reject(new Error('YouTube API blocked'));
    document.head.appendChild(script);
  });
  return apiPromise;
}

export function initPlayer({ root, dict, getLang }) {
  if (!root) return { destroy() {} };

  const el = (name) => root.querySelector(`[data-player-${name}]`);
  const stage = el('stage');
  const facade = el('facade');
  const artSlot = el('art');
  const titleSlot = el('title');
  const creditSlot = el('credit');
  const playBtn = el('play');
  const seek = el('seek');
  const time = el('time');
  const volume = el('volume');
  const status = el('status');
  const list = document.querySelector('[data-tracklist]');

  let index = 0;
  let yt = null;
  let ticker = 0;
  let seeking = false;

  const t = (key) => translate(dict, getLang(), key);
  const track = () => TRACKS[index];

  let level = clampVolume(parseFloat(readStored(VOLUME_KEY)) || 0.8);
  volume.value = String(Math.round(level * 100));

  function paintTrack() {
    const current = track();
    artSlot.innerHTML = renderTrackArt(current.id);
    titleSlot.textContent = t(`track.${current.id}.title`);
    creditSlot.textContent = t(`track.${current.id}.credit`);
    status.textContent = hasVideo(current) ? t('player.consent') : t('player.empty');
    root.classList.toggle('is-unset', !hasVideo(current));
    playBtn.disabled = !hasVideo(current);
    seek.value = '0';
    time.textContent = '0:00';
    list?.querySelectorAll('[data-track]').forEach((row) => {
      const on = row.dataset.track === current.id;
      row.classList.toggle('is-current', on);
      row.setAttribute('aria-current', on ? 'true' : 'false');
    });
  }

  function paintPlayState(playing) {
    root.classList.toggle('is-playing', playing);
    playBtn.setAttribute('aria-pressed', String(playing));
    playBtn.setAttribute('data-i18n-attr', `aria-label:${playing ? 'player.pause' : 'player.play'}`);
    playBtn.setAttribute('aria-label', t(playing ? 'player.pause' : 'player.play'));
  }

  function tick() {
    if (!yt?.getDuration || seeking) return;
    const duration = yt.getDuration();
    const at = yt.getCurrentTime();
    if (Number.isFinite(duration) && duration > 0) {
      seek.value = String(Math.round((at / duration) * 1000));
      time.textContent = `${formatTime(at)} / ${formatTime(duration)}`;
    }
  }

  function onState(event) {
    const playing = event.data === 1;
    paintPlayState(playing);
    clearInterval(ticker);
    if (playing) ticker = setInterval(tick, 400);
    if (event.data === 0) {
      index = nextIndex(index, TRACKS.length);
      paintTrack();
      mount(true);
    }
  }

  /** Replaces the facade with YouTube's own player. Called only on a click. */
  async function mount(autoplay) {
    const current = track();
    if (!hasVideo(current)) return;

    if (yt?.loadVideoById) {
      if (autoplay) yt.loadVideoById(current.videoId);
      else yt.cueVideoById(current.videoId);
      return;
    }

    root.classList.add('is-loaded');
    status.textContent = t('player.loading');
    let YT;
    try {
      YT = await loadApi();
    } catch {
      status.textContent = t('player.blocked');
      root.classList.remove('is-loaded');
      return;
    }

    const host = document.createElement('div');
    facade.hidden = true;
    stage.appendChild(host);

    yt = new YT.Player(host, {
      host: HOST,
      videoId: current.videoId,
      playerVars: { rel: 0, modestbranding: 1, playsinline: 1, autoplay: autoplay ? 1 : 0 },
      events: {
        onReady: () => {
          yt.setVolume(Math.round(level * 100));
          status.textContent = '';
          if (autoplay) yt.playVideo();
        },
        onStateChange: onState,
      },
    });
  }

  function toggle() {
    if (!yt) { mount(true); return; }
    if (yt.getPlayerState?.() === 1) yt.pauseVideo();
    else yt.playVideo();
  }

  function select(id, autoplay) {
    const found = TRACKS.findIndex((entry) => entry.id === id);
    if (found === -1) return;
    index = found;
    paintTrack();
    if (autoplay) mount(true);
  }

  playBtn.addEventListener('click', toggle);
  facade.addEventListener('click', () => mount(true));

  seek.addEventListener('input', () => { seeking = true; });
  seek.addEventListener('change', () => {
    const duration = yt?.getDuration?.();
    if (Number.isFinite(duration) && duration > 0) {
      yt.seekTo((Number(seek.value) / 1000) * duration, true);
    }
    seeking = false;
  });

  volume.addEventListener('input', () => {
    level = clampVolume(Number(volume.value) / 100);
    writeStored(VOLUME_KEY, String(level));
    yt?.setVolume?.(Math.round(level * 100));
  });

  list?.addEventListener('click', (event) => {
    const row = event.target.closest('[data-track]');
    if (row) select(row.dataset.track, true);
  });

  // "Hear it" buttons sitting next to the passage they belong to.
  for (const cue of document.querySelectorAll('[data-play]')) {
    cue.addEventListener('click', () => {
      select(cue.dataset.play, true);
      root.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  document.addEventListener('lang:changed', paintTrack);

  paintTrack();
  paintPlayState(false);

  return {
    play: (id) => select(id, true),
    destroy() {
      clearInterval(ticker);
      yt?.destroy?.();
      yt = null;
    },
  };
}
