// Abstrakte Platzhalter-Bilder (Licht-Glows in Rot/Orange auf Dunkel), bis echte Bilder da sind.
const glows = [
  'radial-gradient(40% 70% at 70% 60%, rgba(232,67,68,.9), transparent 70%), radial-gradient(30% 50% at 85% 30%, rgba(166,22,18,.8), transparent 70%)',
  'radial-gradient(60% 40% at 30% 70%, rgba(166,22,18,.95), transparent 70%), radial-gradient(35% 35% at 55% 40%, rgba(232,67,68,.6), transparent 70%)',
  'radial-gradient(70% 25% at 50% 50%, rgba(245,95,90,.7), transparent 70%), radial-gradient(40% 60% at 20% 40%, rgba(232,67,68,.6), transparent 70%)',
  'radial-gradient(45% 80% at 80% 80%, rgba(232,67,68,.8), transparent 70%), radial-gradient(30% 30% at 25% 25%, rgba(255,185,180,.2), transparent 70%)',
];
export const placeholderBg = (i: number) => `${glows[((i % glows.length) + glows.length) % glows.length]}, #0f0f15`;
