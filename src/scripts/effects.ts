// ─────────────────────────────────────────────────────────────
//  Scroll- & Text-Effekte
//  [data-split]    Wörter gleiten zeilenweise von unten herein
//  [data-fill]     Text ist ausgegraut und füllt sich beim Scrollen Wort für Wort
//  [data-parallax] Kind-Element bewegt sich beim Scrollen leicht versetzt
//  .reveal         blendet beim Erreichen ein
// ─────────────────────────────────────────────────────────────

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Teilt Text in Wörter (<span class="w"><span class="wi">…</span></span>), behält <em> etc. */
function splitWords(root: HTMLElement) {
  const words: HTMLElement[] = [];
  const walk = (node: Node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent || '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        for (const part of parts) {
          if (!part) continue;
          if (/^\s+$/.test(part)) { frag.append(' '); continue; }
          const w = document.createElement('span');
          w.className = 'w';
          const inner = document.createElement('span');
          inner.className = 'wi';
          inner.textContent = part;
          w.append(inner);
          frag.append(w);
          words.push(w);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && !(child as HTMLElement).classList.contains('w')) {
        walk(child);
      }
    }
  };
  walk(root);
  return words;
}

// Einblenden beim Erreichen
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  },
  { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
);

document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
  const words = splitWords(el);
  words.forEach((w, i) => w.style.setProperty('--i', String(i)));
  io.observe(el);
});
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Wortweises Ausfüllen beim Scrollen
const fills = [...document.querySelectorAll<HTMLElement>('[data-fill]')].map((el) => ({ el, words: splitWords(el) }));

// Parallax
const parallax = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];

let ticking = false;
function update() {
  ticking = false;
  const vh = innerHeight;
  for (const { el, words } of fills) {
    const r = el.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.25)));
    const n = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle('on', i < n));
  }
  if (!reduced) {
    for (const el of parallax) {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      const offset = (r.top + r.height / 2 - vh / 2) / vh; // -1 … 1
      const amount = Number(el.dataset.parallax || 8);
      (el.firstElementChild as HTMLElement | null)?.style.setProperty('transform', `translate3d(0, ${(-offset * amount).toFixed(2)}%, 0) scale(1.12)`);
    }
  }
}
const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
update();

// ─────────────────────────────────────────────────────────────
//  Sticky-Footer-Reveal (nur wo eine Section data-sticky-reveal trägt – aktuell die Gründer-Section auf der Startseite)
//  Die Section bleibt stehen, der Footer schiebt sich darüber.
//  Währenddessen wird sie leicht kleiner und dunkler.
// ─────────────────────────────────────────────────────────────
const footerEl = document.querySelector<HTMLElement>('.footer');
const lastSection = document.querySelector<HTMLElement>('[data-sticky-reveal]') ?? undefined;

if (footerEl && lastSection) {
  lastSection.classList.add('sticky-reveal');
  // Transparente Sections bekommen den Seitenhintergrund, damit nichts durchscheint
  if (getComputedStyle(lastSection).backgroundColor === 'rgba(0, 0, 0, 0)') lastSection.style.backgroundColor = 'var(--c-bg)';

  // Unterkante der Section rastet am unteren Bildschirmrand ein – egal ob sie kürzer oder länger als der Bildschirm ist
  const setTop = () => { lastSection.style.top = `${innerHeight - lastSection.offsetHeight}px`; };
  let pending = false;
  const paint = () => {
    pending = false;
    const p = Math.min(1, Math.max(0, 1 - footerEl.getBoundingClientRect().top / innerHeight)); // 0 → 1 während der Footer hereinfährt
    if (!reduced) {
      lastSection.style.transform = p ? `scale(${1 - p * 0.05})` : '';
      lastSection.style.filter = p ? `brightness(${1 - p * 0.55})` : '';
    }
  };
  setTop();
  new ResizeObserver(() => { setTop(); paint(); }).observe(lastSection);
  addEventListener('resize', () => { setTop(); paint(); });
  addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(paint); } }, { passive: true });
  paint();
}
