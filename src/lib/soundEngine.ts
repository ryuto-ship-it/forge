/**
 * Prime.fun Sound Engine
 * Web Audio API 기반 사운드 시스템 — 외부 파일 없이 코드로 생성
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  // Resume if suspended (browser autoplay policy)
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function playTone(
  freq: number,
  endFreq: number,
  duration: number,
  gainStart: number,
  gainEnd: number,
  type: OscillatorType = "sine",
  delay = 0
) {
  const c = getCtx();
  if (!c) return;
  const osc  = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = type;
  const t = c.currentTime + delay;
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(endFreq, t + duration);
  gain.gain.setValueAtTime(gainStart, t);
  gain.gain.exponentialRampToValueAtTime(gainEnd, t + duration);
  osc.start(t);
  osc.stop(t + duration + 0.01);
}

/** 매수 사운드 — 밝고 상승하는 틱 */
export function playBuySound() {
  playTone(600, 1100, 0.12, 0.08, 0.001, "triangle");
  playTone(800, 1400, 0.08, 0.04, 0.001, "sine", 0.06);
}

/** 매도 사운드 — 낮고 하강하는 틱 */
export function playSellSound() {
  playTone(700, 350, 0.15, 0.07, 0.001, "triangle");
}

/** 고래 거래 사운드 — 임팩트 있는 저음 + 상승 */
export function playWhaleSound() {
  // Low thud
  playTone(80, 40, 0.3, 0.18, 0.001, "sawtooth");
  // High sparkle
  playTone(1200, 2400, 0.25, 0.06, 0.001, "sine", 0.1);
  playTone(1600, 3000, 0.2,  0.04, 0.001, "sine", 0.18);
}

/** 신규 토큰 발행 사운드 — 팡! 팝 */
export function playNewTokenSound() {
  playTone(300, 900,  0.06, 0.12, 0.001, "square");
  playTone(600, 1800, 0.12, 0.07, 0.001, "triangle", 0.04);
  playTone(900, 2400, 0.1,  0.04, 0.001, "sine", 0.1);
}

/** 기부 달성 사운드 — 특별한 알림음 */
export function playDonationSound() {
  const notes = [523, 659, 784, 1047]; // C, E, G, C (major chord arpeggio)
  notes.forEach((freq, i) => {
    playTone(freq, freq * 1.02, 0.3, 0.07, 0.001, "sine", i * 0.08);
  });
}

/** 마일스톤 달성 사운드 — 웅장한 팡파르 */
export function playMilestoneSound() {
  const fanfare = [
    { f: 523, d: 0.15, delay: 0 },
    { f: 659, d: 0.15, delay: 0.12 },
    { f: 784, d: 0.15, delay: 0.24 },
    { f: 1047, d: 0.5, delay: 0.36 },
  ];
  fanfare.forEach(({ f, d, delay }) => {
    playTone(f, f, d, 0.1, 0.001, "sine", delay);
    playTone(f * 2, f * 2, d, 0.04, 0.001, "triangle", delay);
  });
}
