// ─────────────────────────────────────────────────────────────
//  Stufen-Übergang: Ein schwarzes Frame aus senkrechten Streifen
//  fährt von oben über den Bildschirm. Jeder Streifen startet etwas
//  später als sein linker Nachbar → treppenartige, versetzte Kante.
//  Danach fährt es nach unten wieder heraus.
//  Genutzt für Seitenwechsel, Anker-Sprünge und das Menü.
// ─────────────────────────────────────────────────────────────

const SPEED = 360; // ms pro Streifen
const STEP = 28; // ms Versatz zwischen zwei Streifen
const KEY = 'mw-transition';

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

let layer: HTMLDivElement | null = null;
let bars: HTMLElement[] = [];

function build() {
  const count = innerWidth < 700 ? 6 : 10;
  if (!layer) {
    layer = document.createElement('div');
    layer.className = 'stairs';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
  }
  if (bars.length !== count) {
    layer.replaceChildren();
    bars = Array.from({ length: count }, () => layer!.appendChild(document.createElement('i')));
  }
}

const total = () => SPEED + STEP * (bars.length - 1) + 30;

function set(state: 'top' | 'full' | 'bottom', animate: boolean) {
  bars.forEach((b, i) => {
    b.style.transition = animate ? `transform ${SPEED}ms cubic-bezier(0.76, 0, 0.24, 1) ${i * STEP}ms` : 'none';
    b.style.transformOrigin = state === 'bottom' ? 'bottom' : 'top';
    b.style.transform = state === 'full' ? 'scaleY(1)' : 'scaleY(0)';
  });
}

export async function cover() {
  if (reduced()) return;
  build();
  set('top', false);
  layer!.classList.add('is-on');
  layer!.offsetHeight; // Reflow, damit die Transition greift
  set('full', true);
  await wait(total());
}

export async function uncover() {
  if (reduced() || !layer) return;
  bars.forEach((b) => (b.style.transformOrigin = 'bottom'));
  layer.offsetHeight;
  set('bottom', true);
  await wait(total());
  layer.classList.remove('is-on');
}

/**
 * Neue Seite immer oben beginnen lassen (außer bei Sprungmarken wie #leistungen).
 * Verhindert, dass Browser oder eingebettete Vorschauen die alte Scrollposition übernehmen.
 * Beim Zurück-Button bleibt die gemerkte Position erhalten.
 */
function startAtTop() {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  if (nav?.type === 'back_forward' || nav?.type === 'reload') return;
  let userMoved = false;
  const mark = () => (userMoved = true);
  for (const ev of ['wheel', 'touchstart', 'keydown', 'pointerdown']) addEventListener(ev, mark, { once: true, passive: true });
  const toTop = () => {
    if (userMoved) return; // nie gegen den Besucher arbeiten
    if (location.hash.length > 1) {
      document.querySelector(location.hash)?.scrollIntoView();
      return;
    }
    const html = document.documentElement;
    html.style.scrollBehavior = 'auto';
    scrollTo(0, 0);
    html.style.scrollBehavior = '';
    // Läuft die Seite eingebettet (z. B. in einer Vorschau), auch das umgebende Fenster nach oben holen
    if (window.self !== window.top) document.body.scrollIntoView({ block: 'start' });
  };
  toTop();
  addEventListener('load', toTop, { once: true });
  setTimeout(toTop, 120); // falls eine Umgebung die Position nachträglich wiederherstellt
}

/** Beim Laden: falls wir per Übergang gekommen sind, wieder aufdecken. */
export function initPageEnter() {
  startAtTop();
  let came = false;
  try {
    came = sessionStorage.getItem(KEY) === '1';
    sessionStorage.removeItem(KEY);
  } catch {}
  if (!came || reduced()) return;
  build();
  layer!.classList.add('is-on');
  set('full', false);
  requestAnimationFrame(() => requestAnimationFrame(() => uncover()));
}

/** Interne Links abfangen und mit Übergang ausführen. */
export function initLinks(beforeJump?: () => void) {
  document.addEventListener('click', async (e) => {
    const a = (e.target as HTMLElement).closest('a');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || a.hasAttribute('download')) return;
    if (reduced()) { beforeJump?.(); return; }

    const samePage = url.pathname === location.pathname;
    e.preventDefault();
    await cover();
    beforeJump?.();

    if (samePage) {
      const target = url.hash.length > 1 ? document.querySelector(url.hash) : null;
      const html = document.documentElement;
      html.style.scrollBehavior = 'auto';
      target ? target.scrollIntoView() : scrollTo(0, 0);
      html.style.scrollBehavior = '';
      history.pushState(null, '', url.href);
      await uncover();
    } else {
      try { sessionStorage.setItem(KEY, '1'); } catch {}
      location.href = url.href;
    }
  });
}
