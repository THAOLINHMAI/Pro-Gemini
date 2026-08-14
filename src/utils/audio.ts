// Sound engine for KHTN 8 App using Web Audio API and Web Speech API

class SoundEffects {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Grand celebratory fanfare for correct answers
  playGrandVictorySound() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // Fanfare chords (Major triad arpeggio: C5 -> E5 -> G5 -> C6 -> E6 -> G6 with brass harmonics)
      const notes = [
        { freq: 523.25, time: 0, duration: 0.12 },     // C5
        { freq: 659.25, time: 0.1, duration: 0.12 },   // E5
        { freq: 783.99, time: 0.2, duration: 0.15 },   // G5
        { freq: 1046.50, time: 0.32, duration: 0.45 }, // C6 (long)
        { freq: 880.00, time: 0.45, duration: 0.15 },  // A5
        { freq: 1046.50, time: 0.58, duration: 0.18 }, // C6
        { freq: 1318.51, time: 0.72, duration: 0.7 }   // E6 (grand finale chord)
      ];

      notes.forEach(({ freq, time, duration }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + time);

        // Layer with bright harmonic
        const harmonicOsc = this.ctx.createOscillator();
        const harmGain = this.ctx.createGain();
        harmonicOsc.type = 'sine';
        harmonicOsc.frequency.setValueAtTime(freq * 2, now + time);

        gain.gain.setValueAtTime(0, now + time);
        gain.gain.linearRampToValueAtTime(0.3, now + time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + duration);

        harmGain.gain.setValueAtTime(0, now + time);
        harmGain.gain.linearRampToValueAtTime(0.15, now + time + 0.03);
        harmGain.gain.exponentialRampToValueAtTime(0.001, now + time + duration);

        osc.connect(gain);
        harmonicOsc.connect(harmGain);
        gain.connect(this.ctx.destination);
        harmGain.connect(this.ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + duration + 0.05);
        harmonicOsc.start(now + time);
        harmonicOsc.stop(now + time + duration + 0.05);
      });

      // Cheering / chime sparkle layer
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          if (!this.ctx) return;
          const chime = this.ctx.createOscillator();
          const chimeGain = this.ctx.createGain();
          const cNow = this.ctx.currentTime;
          chime.type = 'sine';
          chime.frequency.setValueAtTime(1500 + i * 400, cNow);
          chimeGain.gain.setValueAtTime(0.15, cNow);
          chimeGain.gain.exponentialRampToValueAtTime(0.001, cNow + 0.3);
          chime.connect(chimeGain);
          chimeGain.connect(this.ctx.destination);
          chime.start(cNow);
          chime.stop(cNow + 0.35);
        }, 300 + i * 80);
      }
    } catch (e) {
      console.error('Audio play error', e);
    }
  }

  // Humorous "Ố Ồ" vocal sound + descending sad slide
  playWrongSound() {
    try {
      this.initCtx();

      // 1. Synthesize expressive "Ố ồ" audio tone
      if (this.ctx) {
        const now = this.ctx.currentTime;
        
        // "Ố" pitch (higher)
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(360, now);
        osc1.frequency.exponentialRampToValueAtTime(320, now + 0.22);
        gain1.gain.setValueAtTime(0.25, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc1.connect(gain1);
        gain1.connect(this.ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.25);

        // "Ồ" pitch (lower drop)
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(220, now + 0.28);
        osc2.frequency.exponentialRampToValueAtTime(140, now + 0.65);
        gain2.gain.setValueAtTime(0.3, now + 0.28);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);
        osc2.start(now + 0.28);
        osc2.stop(now + 0.7);
      }

      // 2. Speech synthesis saying "Ố Ồ!" in Vietnamese
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance('Ố ồ!');
        utterance.lang = 'vi-VN';
        utterance.pitch = 1.3;
        utterance.rate = 1.1;
        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.error('Audio play error', e);
    }
  }
}

export const soundManager = new SoundEffects();
