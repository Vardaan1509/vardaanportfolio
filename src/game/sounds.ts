// Web Audio synthesized sound effects — chiptune-style tones.
// All synthesized on the fly from oscillators; no external files.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;

  private ensure() {
    if (!this.ctx) {
      const AC =
        (window as unknown as { AudioContext: typeof AudioContext }).AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  setMuted(m: boolean) {
    this.muted = m;
  }
  isMuted() {
    return this.muted;
  }
  toggle() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Core beep with quick attack and decay — that classic GBA square-wave feel.
  private beep(
    freq: number,
    duration: number,
    type: OscillatorType = "square",
    volume = 0.05,
    when = 0,
    freqEnd?: number
  ) {
    const ctx = this.ensure();
    if (!ctx || this.muted) return;
    const now = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (freqEnd !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(freqEnd, now + duration / 1000);
    }
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration / 1000);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration / 1000 + 0.02);
  }

  // Two oscillators together for a fuller "chip" texture
  private chord(freqs: number[], duration: number, type: OscillatorType = "square", volume = 0.04, when = 0) {
    for (const f of freqs) this.beep(f, duration, type, volume, when);
  }

  step() {
    this.beep(160, 30, "square", 0.015);
  }

  talk() {
    // Quick two-note chirp when opening a dialogue or advancing lines
    this.beep(880, 40, "square", 0.05);
    this.beep(1200, 40, "square", 0.04, 0.045);
  }

  select() {
    // A crisp confirmation blip (menu select)
    this.beep(1200, 60, "square", 0.06);
  }

  encounter() {
    // Descending swoop into rising alarm — dramatic wild-encounter feel
    this.beep(880, 220, "sawtooth", 0.06, 0, 220);
    this.beep(440, 100, "square", 0.06, 0.24);
    this.beep(660, 100, "square", 0.06, 0.36);
    this.beep(880, 100, "square", 0.06, 0.48);
    this.beep(1100, 160, "square", 0.06, 0.60);
  }

  // Triumphant ascending arpeggio (like winning a battle)
  victory() {
    const notes = [523, 659, 784, 1046]; // C E G C (major triad + octave)
    notes.forEach((n, i) => {
      this.beep(n, 120, "square", 0.05, i * 0.11);
    });
    this.beep(1046, 300, "triangle", 0.05, 0.44);
    this.beep(1319, 400, "triangle", 0.04, 0.52);
  }

  defeat() {
    // Slow descending trill
    this.beep(392, 180, "triangle", 0.06);
    this.beep(311, 200, "triangle", 0.06, 0.18);
    this.beep(247, 280, "triangle", 0.06, 0.36);
    this.beep(196, 400, "sawtooth", 0.05, 0.60);
  }

  catchSound() {
    // Sharp two-tone "click" then chime like a pokeball snap-lock
    this.beep(660, 50, "square", 0.06);
    this.beep(880, 50, "square", 0.06, 0.06);
    setTimeout(() => this.chord([784, 988, 1174], 260, "triangle", 0.04), 200);
  }

  faint() {
    // Descending drop with a slight wobble
    this.beep(330, 200, "sawtooth", 0.06, 0, 220);
    this.beep(220, 220, "sawtooth", 0.06, 0.18, 150);
    this.beep(150, 320, "sawtooth", 0.06, 0.38, 90);
  }

  // "You received an item" — bright ascending trill
  give() {
    const seq = [523, 659, 784, 1046];
    seq.forEach((n, i) => this.beep(n, 90, "square", 0.05, i * 0.08));
    this.beep(1319, 300, "triangle", 0.04, 0.34);
  }
}

export const sounds = new SoundEngine();
