import { readStored, writeStored } from './storage.js';
import { translate } from './i18n/index.js';
import { TRACKS, renderTrackArt } from './data/tracks.js';

export const VOLUME_KEY = 'tc-volume';

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

export function initPlayer({ root, dict, getLang }) {
  if (!root) return { destroy() {} };

  const audio = new Audio();
  audio.preload = 'metadata';

  const el = (name) => root.querySelector(`[data-player-${name}]`);
  const artSlot = el('art');
  const titleSlot = el('title');
  const noteSlot = el('note');
  const playBtn = el('play');
  const seek = el('seek');
  const time = el('time');
  const volume = el('volume');
  const list = document.querySelector('[data-tracklist]');

  let index = 0;
  let seeking = false;

  const t = (key) => translate(dict, getLang(), key);

  audio.volume = clampVolume(parseFloat(readStored(VOLUME_KEY)) || 0.8);
  volume.value = String(Math.round(audio.volume * 100));

  function paintTrack() {
    const track = TRACKS[index];
    artSlot.innerHTML = renderTrackArt(track.id);
    titleSlot.textContent = t(`track.${track.id}.title`);
    noteSlot.textContent = t(`track.${track.id}.note`);
    audio.src = track.src;
    seek.value = '0';
    time.textContent = `0:00 / ${formatTime(track.duration)}`;
    list?.querySelectorAll('[data-track]').forEach((row) => {
      row.classList.toggle('is-current', row.dataset.track === track.id);
      row.setAttribute('aria-current', row.dataset.track === track.id ? 'true' : 'false');
    });
  }

  function paintPlayState() {
    const playing = !audio.paused;
    root.classList.toggle('is-playing', playing);
    playBtn.setAttribute('aria-pressed', String(playing));
    playBtn.setAttribute('data-i18n-attr', `aria-label:${playing ? 'player.pause' : 'player.play'}`);
    playBtn.setAttribute('aria-label', t(playing ? 'player.pause' : 'player.play'));
  }

  function load(id, autoplay) {
    const found = TRACKS.findIndex((track) => track.id === id);
    if (found === -1) return;
    index = found;
    paintTrack();
    if (autoplay) audio.play().catch(() => { /* autoplay blocked, stay paused */ });
  }

  function toggle() {
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }

  audio.addEventListener('play', paintPlayState);
  audio.addEventListener('pause', paintPlayState);
  audio.addEventListener('ended', () => {
    index = nextIndex(index, TRACKS.length);
    paintTrack();
    audio.play().catch(() => {});
  });
  audio.addEventListener('timeupdate', () => {
    if (seeking || !Number.isFinite(audio.duration)) return;
    seek.value = String(Math.round((audio.currentTime / audio.duration) * 1000));
    time.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  });

  playBtn.addEventListener('click', toggle);
  seek.addEventListener('input', () => { seeking = true; });
  seek.addEventListener('change', () => {
    if (Number.isFinite(audio.duration)) audio.currentTime = (Number(seek.value) / 1000) * audio.duration;
    seeking = false;
  });
  volume.addEventListener('input', () => {
    audio.volume = clampVolume(Number(volume.value) / 100);
    writeStored(VOLUME_KEY, String(audio.volume));
  });

  list?.addEventListener('click', (event) => {
    const row = event.target.closest('[data-track]');
    if (row) load(row.dataset.track, true);
  });

  // "Hear it" buttons sitting inside the article, next to the thing they play.
  const cues = [...document.querySelectorAll('[data-play]')];
  for (const cue of cues) {
    cue.addEventListener('click', () => {
      load(cue.dataset.play, true);
      root.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  document.addEventListener('lang:changed', paintTrack);
  document.addEventListener('lang:changed', paintPlayState);

  paintTrack();
  paintPlayState();

  return {
    play: (id) => load(id, true),
    destroy() {
      audio.pause();
      audio.src = '';
    },
  };
}
