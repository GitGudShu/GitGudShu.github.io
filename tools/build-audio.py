"""Render the three demo sketches used by the music page.

These are original throwaway phrases, synthesised here, written only to make one
device audible each. They are not recordings of anyone's work, and they are
meant to be replaced by real recordings when there are some.

Run from the repo root: python tools/build-audio.py
"""
import subprocess
from pathlib import Path

import numpy as np
from scipy.signal import fftconvolve
from scipy.io import wavfile

ROOT = Path(__file__).resolve().parent.parent
DST = ROOT / "assets" / "audio"
SR = 44100
BEAT = 0.62


def freq(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def piano(midi, beats, amp=1.0):
    """Struck tone: a few partials, each decaying faster than the one below."""
    dur = beats * BEAT + 1.4
    t = np.linspace(0, dur, int(dur * SR), endpoint=False)
    f = freq(midi)
    out = np.zeros_like(t)
    for n, level in enumerate([1.0, 0.52, 0.28, 0.15, 0.08, 0.05], start=1):
        detune = 1 + 0.0004 * n * n
        decay = np.exp(-t * (1.5 + 0.55 * n))
        out += level * decay * np.sin(2 * np.pi * f * n * detune * t)

    attack = np.clip(t / 0.006, 0, 1)
    out *= attack
    # A touch of hammer noise, gone almost immediately.
    noise = np.random.default_rng(int(midi)).normal(0, 1, t.size) * np.exp(-t * 90)
    return (out + 0.05 * noise) * amp * 0.28


def pad(midi, beats, amp=1.0):
    """Sustained voice for the strings and the drone: slow in, slow out."""
    dur = beats * BEAT
    t = np.linspace(0, dur, int(dur * SR), endpoint=False)
    f = freq(midi)
    out = np.zeros_like(t)
    for n, level in enumerate([1.0, 0.45, 0.3, 0.16, 0.1], start=1):
        drift = 1 + 0.0012 * np.sin(2 * np.pi * (0.7 + 0.13 * n) * t)
        out += level * np.sin(2 * np.pi * f * n * t * drift)

    env = np.minimum(np.clip(t / 0.45, 0, 1), np.clip((dur - t) / 0.55, 0, 1))
    return out * env * amp * 0.12


class Track:
    def __init__(self):
        self.buf = np.zeros(int(SR * 2))

    def add(self, at, samples):
        start = int(at * SR)
        end = start + samples.size
        if end > self.buf.size:
            self.buf = np.pad(self.buf, (0, end - self.buf.size + SR))
        self.buf[start:end] += samples

    def melody(self, at, notes, amp=1.0):
        for midi, beats in notes:
            if midi is not None:
                self.add(at, piano(midi, beats, amp))
            at += beats * BEAT
        return at

    def chord(self, at, midis, beats, amp=1.0, voice=pad):
        for m in midis:
            self.add(at, voice(m, beats, amp))
        return at + beats * BEAT


def reverb(mono, seconds=1.6, wet=0.32):
    """Exponentially decaying noise as an impulse response. Cheap, and warm."""
    rng = np.random.default_rng(7)
    n = int(seconds * SR)
    t = np.linspace(0, seconds, n, endpoint=False)
    ir = rng.normal(0, 1, (n, 2)) * np.exp(-t * 4.2)[:, None]
    ir[0] = 1.0
    wetsig = np.stack([fftconvolve(mono, ir[:, c])[: mono.size] for c in range(2)], axis=1)
    wetsig /= np.max(np.abs(wetsig)) or 1
    dry = np.stack([mono, mono], axis=1)
    return (1 - wet) * dry + wet * wetsig


def finish(track, name):
    audio = reverb(track.buf)
    audio /= np.max(np.abs(audio)) or 1
    audio *= 0.89

    fade = int(0.4 * SR)
    audio[-fade:] *= np.linspace(1, 0, fade)[:, None]
    audio[: int(0.02 * SR)] *= np.linspace(0, 1, int(0.02 * SR))[:, None]

    wav = DST / f"{name}.wav"
    wavfile.write(wav, SR, (audio * 32767).astype(np.int16))
    mp3 = DST / f"{name}.mp3"
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav), "-b:a", "112k", str(mp3)],
        check=True,
    )
    wav.unlink()
    seconds = audio.shape[0] / SR
    print(f"{mp3.relative_to(ROOT)}  {seconds:.1f}s  {mp3.stat().st_size // 1024} KB")
    return seconds


# ---------------------------------------------------------------- the sketches

TUNE = [(67, 1), (69, 1), (72, 2), (71, 1), (69, 1), (67, 2),
        (65, 1), (67, 1), (69, 2), (64, 1), (62, 1), (60, 2)]


def melody_first():
    """The tune alone, then the same tune with something underneath it."""
    t = Track()
    end = t.melody(0.2, TUNE)

    at = end + 0.9
    t.melody(at, TUNE)
    for chord in [[48, 52, 55], [52, 55, 59], [41, 48, 53], [48, 52, 55]]:
        at = t.chord(at, chord, 4, amp=0.9)
    return t


def pedal_point():
    """One note held in the bass while everything above it moves."""
    t = Track()
    for bar in range(4):
        t.chord(0.2 + bar * 4 * BEAT, [36], 4, amp=1.5)

    at = 0.2
    for chord in [[52, 55, 60], [50, 55, 59], [52, 57, 60], [53, 57, 60]]:
        at = t.chord(at, chord, 4, amp=0.9)

    t.melody(0.2, [(67, 2), (72, 2), (71, 2), (69, 2),
                   (67, 2), (69, 2), (67, 4)], amp=0.85)
    return t


def borrowed_iv():
    """The same phrase twice. Second time the fourth chord turns minor."""
    t = Track()
    at = 0.2
    for third, top in [(57, 69), (56, 68)]:          # F major, then F minor
        t.chord(at, [48, 52, 55], 2, amp=0.9)
        t.melody(at, [(64, 2)])
        at += 2 * BEAT

        t.chord(at, [41, third, 60], 2, amp=0.95)    # F / Fm
        t.melody(at, [(top, 2)])                     # A natural, then A flat
        at += 2 * BEAT

        t.chord(at, [48, 52, 55], 4, amp=0.9)
        t.melody(at, [(67, 2), (64, 2)])
        at += 4 * BEAT + 0.5
    return t


def main():
    DST.mkdir(parents=True, exist_ok=True)
    for name, build in [("melody-first", melody_first),
                        ("pedal-point", pedal_point),
                        ("borrowed-iv", borrowed_iv)]:
        finish(build(), name)


if __name__ == "__main__":
    main()
