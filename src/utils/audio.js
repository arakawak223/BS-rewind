let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

/**
 * Play warning beep using Web Audio API.
 * @param {number} durationMs - Duration of each beep in ms (default 120)
 * @param {number} count - Number of beeps (default 3)
 */
export function playWarningBeep(durationMs = 120, count = 3) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const gap = 0.15; // gap between beeps in seconds

    for (let i = 0; i < count; i++) {
      const startTime = now + i * (durationMs / 1000 + gap);
      const endTime = startTime + durationMs / 1000;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.value = 880;
      gain.gain.value = 0.08;

      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, endTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(endTime + 0.01);
    }
  } catch {
    // Silently fail on browsers that block audio
  }
}
