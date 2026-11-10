# Mediawo Website

Website der Medienagentur Mediawo aus Trier – gebaut mit [Astro](https://astro.build).

## Lokal starten

```bash
npm install
npm run dev
```

Dann http://localhost:4321 öffnen.

## Wo ändere ich was?

| Was | Datei |
| --- | --- |
| Texte, Leistungen, Projekte, Kontaktdaten | `src/data/site.ts` |
| Farben, Schriften, Verläufe (Brand-Tokens) | `src/styles/global.css` (oberster Block) |
| Logo | `src/components/Logo.astro` |
| Startseiten-Abschnitte | `src/components/*.astro` |
| Impressum / Datenschutz | `src/pages/impressum.astro`, `src/pages/datenschutz.astro` |

Alles mit **PLATZHALTER** muss noch durch echte Inhalte ersetzt werden.

## Brand (aus Figma „MW_CI“)

- Farben: Rot `#E84344`, Bernstein `#E8AB43`, Lavendel `#868CFF`, Dunkelrot `#A61612`, Nachtblau `#0F1021`
- Verläufe: Rot → Bernstein, Rot → Lavendel → Bernstein (aktuell nicht im Einsatz)
- Logo: `src/components/Logo.astro` (Bildmarke + Schriftzug als SVG)
- Schrift: **Poppins** für alles (lokal eingebunden). Headlines in Bold/ExtraBold und Großbuchstaben.

Schriften werden lokal ausgeliefert (kein Google-Fonts-CDN) – DSGVO-freundlich.

## Vorschau als Einzeldatei

```bash
npx astro build --config astro.preview.config.mjs
```

Erzeugt `dist-preview/index.html` mit allen Styles, Schriften und Skripten eingebettet.
