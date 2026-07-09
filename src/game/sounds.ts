// Web Audio programmatic sound effects — no asset files needed.
// All sounds are short synthesized tones.

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
    // Some browsers require a user gesture to resume the context.
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

  private beep(
    freq: number,
    duration: number,
    type: OscillatorType = "square",
    volume = 0.05,
    when = 0
  ) {
    const ctx = this.ensure();
    if (!ctx || this.muted) return;
    const now = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(volume, now + 0.005);
    gain.gain.linearRampToValueAtTime(0, now + duration / 1000);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration / 1000 + 0.02);
  }

  step() {
    this.beep(180, 40, "square", 0.02);
  }

  talk() {
    this.beep(520, 40, "square", 0.04);
    this.beep(700, 40, "square", 0.03, 0.05);
  }

  select() {
    this.beep(880, 60, "square", 0.05);
  }

  encounter() {
    // Rising alarm
    this.beep(220, 120, "sawtooth", 0.05);
    this.beep(280, 120, "sawtooth", 0.05, 0.13);
    this.beep(360, 180, "sawtooth", 0.06, 0.26);
  }

  victory() {
    this.beep(523, 100, "square", 0.05);
    this.beep(659, 100, "square", 0.05, 0.1);
    this.beep(784, 200, "square", 0.06, 0.2);
    this.beep(1046, 250, "triangle", 0.05, 0.4);
  }

  defeat() {
    this.beep(392, 150, "triangle", 0.05);
    this.beep(330, 150, "triangle", 0.05, 0.15);
    this.beep(262, 300, "triangle", 0.06, 0.3);
  }

  catchSound() {
    this.beep(660, 80, "square", 0.05);
    this.beep(880, 200, "sine", 0.05, 0.09);
  }

  faint() {
    this.beep(220, 200, "sawtooth", 0.07);
    this.beep(180, 250, "sawtooth", 0.07, 0.2);
    this.beep(140, 300, "sawtooth", 0.07, 0.45);
  }

  give() {
    this.beep(440, 80, "square", 0.05);
    this.beep(660, 80, "square", 0.05, 0.09);
    this.beep(880, 160, "triangle", 0.05, 0.18);
  }
}

export const sounds = new SoundEngine();
