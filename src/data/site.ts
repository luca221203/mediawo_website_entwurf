// ─────────────────────────────────────────────────────────────
//  Zentrale Inhalte der Website. Texte hier ändern – nicht im Layout.
//  Alles mit "PLATZHALTER" muss noch ersetzt werden.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Mediawo',
  claim: 'Medienagentur aus Trier',
  city: 'Trier',
  email: 'hallo@media-wo.de', // PLATZHALTER – richtige Adresse prüfen
  // Ziel-URL für das Kontaktformular (z. B. Formspree, Web3Forms oder eigener Server).
  // Leer = Formular zeigt an, dass es noch nicht verbunden ist. Bei Hosting auf Netlify greift alternativ "Netlify Forms".
  formEndpoint: '',
  phone: '+49 000 000000', // PLATZHALTER
  address: ['Martin-Schunck-Straße 19', '54292 Trier'],
  socials: [
    { label: 'IG', name: 'Instagram', href: '#' },
    { label: 'LI', name: 'LinkedIn', href: '#' },
    { label: 'TT', name: 'TikTok', href: '#' },
    { label: 'YT', name: 'YouTube', href: '#' },
  ],
};

export const nav = [
  { label: 'Start', href: '/' },
  { label: 'Leistungen', href: '/#leistungen' },
  { label: 'Projekte', href: '/projekte' },
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Kontakt', href: '/kontakt' },
];

/** Auf der Startseite reine Sprungmarken (#…), auf Unterseiten /#… */
export const navHref = (href: string, pathname: string) =>
  pathname === '/' || pathname.endsWith('/index.html')
    ? href === '/' ? '#' : href.replace(/^\/(?=#)/, '')
    : href;

export const services = [
  {
    title: 'Video',
    text: 'Imagefilme, Social-Media-Clips, Event- und Produktvideos – von der Konzeption über den Dreh bis zur Postproduktion.',
    tags: ['Imagefilm', 'Reels', 'Drohne', 'Postproduktion'],
  },
  {
    title: 'Social Media',
    text: 'Strategie, Content-Produktion und Kanalbetreuung mit klaren Zielen und messbaren Ergebnissen.',
    tags: ['Strategie', 'Content', 'Ads', 'Reporting'],
  },
  {
    title: 'Recruiting',
    text: 'Employer Branding und Recruiting-Kampagnen, mit denen Sie passende Fachkräfte auf den Kanälen erreichen, die diese tatsächlich nutzen.',
    tags: ['Employer Branding', 'Kampagnen', 'Karriereseiten'],
  },
  {
    title: 'Branding',
    text: 'Markenstrategie, Logo und Corporate Design für einen klaren und wiedererkennbaren Auftritt.',
    tags: ['Logo', 'Corporate Design', 'Strategie'],
  },
  {
    title: 'Webdesign',
    text: 'Moderne, schnelle Websites, die überzeugen, gut gefunden werden und Anfragen generieren.',
    tags: ['UX/UI', 'Entwicklung', 'SEO'],
  },
  {
    title: 'KI & Automati\u00ADsierung', // \u00AD = weiche Trennstelle für schmale Bildschirme
    text: 'Wir automatisieren wiederkehrende Abläufe mit KI und entwickeln maßgeschneiderte Tools, die Ihren Arbeitsalltag spürbar vereinfachen.',
    tags: ['Prozessautomatisierung', 'Individuelle Software', 'Dashboards'],
  },
];

// PLATZHALTER-Projekte – später durch echte Referenzen ersetzen.
// "image" leer lassen => farbiger Verlauf als Platzhalter.
// ─────────────────────────────────────────────────────────────
//  PROJEKTE – jedes Projekt bekommt automatisch eine eigene Seite unter /projekte/<slug>
//  Bilder später nach public/projekte/<slug>/ legen und die Pfade hier eintragen.
//  Leere Felder ("") werden als Platzhalter angezeigt.
// ─────────────────────────────────────────────────────────────
export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  image: string; // Vorschaubild für die Kachel
  cover?: string; // Titelbild auf der Projektseite (sonst wird image genutzt)
  video?: string; // optional: eigene Video-Datei (MP4) als Titelmedium, mit Play-Button
  videoEmbed?: string; // optional: YouTube- oder Vimeo-Link als Titelmedium
  logo?: string; // Kundenlogo (wird auf der Kachel weiß und mittig gezeigt)
  plainThumb?: boolean; // true = Vorschaubild unverändert zeigen (z. B. Mockups), ohne Abdunkeln
  scope?: string; // Umfang, z. B. "30 Reels · Karussell-Posts"
  highlights?: string[]; // kurze Eckpunkte für "Auf einen Blick"
  services: string[];
  intro: string;
  challenge: string;
  solution: string;
  result: string;
  gallery: string[]; // Bilder für die Galerie (leer = Platzhalter)
  showcase?: string; // großes Abschlussbild unter der Galerie (z. B. Website-Mockup)
  reels?: { src: string; poster?: string; title?: string }[]; // Hochformat-Videos nebeneinander (statt Galerie)
  instagramUrl?: string; // Button „Zum Instagram-Account“
  websiteUrl?: string; // Link zur Kunden-Website → Button „Website ansehen“
};

const lorem =
  'Platzhalter – hier kommt später der echte Text hin. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.';

const placeholderProject = (p: Pick<Project, 'slug' | 'title' | 'client' | 'category' | 'year' | 'services'>): Project => ({
  ...p,
  image: '',
  intro: `Kurze Einleitung zum Projekt: Wer ist der Kunde, worum ging es und was war das Ziel? ${lorem}`,
  challenge: lorem,
  solution: lorem,
  result: lorem,
  gallery: ['', '', '', ''],
});

export const projects: Project[] = [
  {
    slug: 'deforis-business-school',
    title: 'Instagram-Aufbau & Reel-Kampagne',
    client: 'DeFORIS Business School',
    category: 'Social Media & Ads',
    year: '', // TODO: Jahr ergänzen
    image: '/projekte/deforis-business-school/thumb.jpg',
    cover: '/projekte/deforis-business-school/cover.jpg',
    logo: '/projekte/deforis-business-school/logo-white.png',
    services: ['Social-Media-Strategie', 'Scripting', 'Videoproduktion', 'Ads'],
    scope: '30 Reels · Karussell-Posts',
    highlights: ['Neuer Instagram-Kanal', '10 Dozenten', '30 Reels', 'Dreistufiger Funnel'],
    intro:
      'Für die DeFORIS Business School haben wir einen neuen Instagram-Kanal aufgebaut und mit einer Social-Media- und Ad-Kampagne gestartet. Insgesamt sind 30 Reels und mehrere Karussell-Posts entstanden, strukturiert entlang eines dreistufigen Funnels.',
    challenge:
      'Zu Projektbeginn bestand kein Instagram-Account. Die Business School sollte dennoch in kurzer Zeit Reichweite und Aufmerksamkeit aufbauen. Gleichzeitig waren zehn Dozenten mit unterschiedlichen Fachthemen einzubinden – von der inhaltlichen Abstimmung über die Drehplanung bis zur Freigabe. Die Koordination war damit ein wesentlicher Teil des Projekts.',
    solution:
      'Gemeinsam mit jedem Dozenten haben wir die Inhalte seines Vortrags erarbeitet und daraus zwei Formate entwickelt: ein Vorstellungs-Reel, das Person und Fachgebiet vorstellt, und ein Creative-Reel, das ein Thema pointiert aufbereitet. Alle Reels wurden vorab geskriptet und im Wechsel veröffentlicht. Ergänzt durch Karussell-Posts und Anzeigen entstand ein Funnel mit Inhalten für Top, Middle und Bottom of Funnel – von der ersten Aufmerksamkeit bis zum konkreten Interesse am Angebot.',
    result:
      'Ein neu aufgebauter Instagram-Kanal mit 30 Reels, ergänzenden Karussell-Posts und einem eigenen Auftritt für jeden der zehn Dozenten.',
    gallery: [],
    // Reels: MP4s nach public/projekte/deforis-business-school/ legen (reel-1.mp4 …)
    reels: [
      { src: '/projekte/deforis-business-school/reel-1.mp4', poster: '/projekte/deforis-business-school/reel-1.jpg', title: 'Vorstellungs-Reel Frank Weigelt' },
      { src: '/projekte/deforis-business-school/reel-2.mp4', poster: '/projekte/deforis-business-school/reel-2.jpg', title: 'Reel Jenny Weber' },
      { src: '/projekte/deforis-business-school/reel-3.mp4', poster: '/projekte/deforis-business-school/reel-3.jpg', title: 'Reel Steven' },
    ],
    instagramUrl: 'https://www.instagram.com/deforisbusiness.school/',
  },
  {
    slug: 'tbz-mertert',
    title: 'Branding, Print & Website',
    client: 'Therapie- und Beratungszentrum Mertert',
    category: 'Branding · Print · Webdesign',
    year: '', // TODO: Jahr ergänzen
    image: '/projekte/tbz-mertert/thumb.jpg',
    cover: '/projekte/tbz-mertert/cover.jpg',
    logo: '/projekte/tbz-mertert/logo-white.png',
    services: ['Corporate Design', 'Logo', 'Printdesign', 'Webdesign'],
    scope: 'Logo · Farben · Typografie · Print · Website',
    highlights: ['Corporate Design', 'Logo, Farben & Bildsprache', 'Geschäftsausstattung & Praxisschild', 'Responsive Website'],
    intro:
      'Das Therapie- und Beratungszentrum Mertert in Luxemburg bietet Psychotherapie, Traumatherapie und Coaching für Kinder, Jugendliche und Erwachsene. Da sich die Praxis in der Gründungsphase befand, haben wir den gesamten visuellen Auftritt neu entwickelt – vom Corporate Design über die Geschäftsausstattung bis zur Website.',
    challenge:
      'Wer psychotherapeutische Unterstützung sucht, informiert sich in der Regel online, bevor er eine Praxis kontaktiert. Der erste Eindruck entsteht also lange vor dem ersten Gespräch. Gefragt war ein Auftritt, der Vertrauen, Professionalität und Ruhe vermittelt, einladend wirkt und an allen Berührungspunkten einheitlich wiedererkennbar ist.',
    solution:
      'Grundlage ist ein neues Corporate Design: ein Logo mit offenem, mehrfarbigem Ring, eine Farbpalette aus Deep Navy, Vibrant Pink und Warm Off-White, die Schriften Host Grotesk und Poppins sowie eine ruhige, warme Bildsprache. Darauf aufbauend haben wir die Geschäftsausstattung gestaltet – Visitenkarten, Terminkarten, Briefkopf, Stempel und Praxisschild. Abschließend entstand eine responsive Website, die Leistungen, Methoden und Team übersichtlich darstellt und die Kontaktaufnahme vereinfacht.',
    result:
      'Ein einheitlicher Markenauftritt über alle analogen und digitalen Kanäle – von der Visitenkarte bis zur Website.',
    gallery: [
      '/projekte/tbz-mertert/visitenkarten.jpg',
      '/projekte/tbz-mertert/terminkarte.jpg',
      '/projekte/tbz-mertert/stempel.jpg',
      '/projekte/tbz-mertert/praxisschild.jpg',
    ],
    showcase: '/projekte/tbz-mertert/website-laptop.jpg',
    websiteUrl: '', // TODO: Link eintragen, sobald die Website online ist
  },
  {
    slug: 'atelier-dentaire-arnoldy',
    title: 'Imagefilm',
    client: 'Atelier Dentaire Arnoldy',
    category: 'Video · Employer Branding',
    year: '', // TODO: Jahr ergänzen
    image: '/projekte/arnoldy/thumb.jpg',
    logo: '/projekte/arnoldy/logo-white.png',
    video: '/projekte/arnoldy/imagefilm.mp4',
    cover: '/projekte/arnoldy/thumb.jpg', // Vorschaubild des Players
    services: ['Konzeption', 'Dreh', 'Schnitt', 'Postproduktion'],
    scope: 'Imagefilm',
    highlights: ['Imagefilm', 'Zahntechnisches Labor in Luxemburg', 'Für Fachkräfte und Kunden', 'Konzeption bis Postproduktion'],
    intro:
      'Atelier Dentaire Arnoldy ist ein zahntechnisches Labor in Luxemburg. Für das Unternehmen haben wir einen Imagefilm produziert, der zeigt, wer hinter dem Labor steht, wie dort gearbeitet wird und was das Team ausmacht.',
    challenge:
      'Der Film sollte zwei Zielgruppen gleichzeitig ansprechen: potenzielle Mitarbeitende, für die Arbeitsumfeld und Team entscheidend sind, und neue Kunden, die einen verlässlichen Partner suchen. Gefragt war deshalb ein Bild des Unternehmens, das fachliche Kompetenz zeigt und zugleich die familiäre Atmosphäre vermittelt.',
    solution:
      'Im Mittelpunkt stehen die Menschen im Labor und ihre Arbeit. Wir haben den Film konzipiert, vor Ort gedreht und in der Postproduktion fertiggestellt. Echte Einblicke in Arbeitsabläufe und Team machen das Unternehmen nahbar und zeigen gleichzeitig die Sorgfalt und Präzision, die zahntechnische Arbeit erfordert.',
    result:
      'Ein Imagefilm, der Atelier Dentaire Arnoldy als attraktiven Arbeitgeber und kompetenten Partner präsentiert und vielseitig einsetzbar ist – auf Social Media, der Website und im Recruiting.',
    gallery: [],
  },
  {
    slug: 'vintage-concierge',
    title: 'Black-Week-Kampagne mit Reels',
    client: 'Vintage Concierge',
    category: 'Social Media · Video',
    year: '', // TODO: Jahr ergänzen
    image: '/projekte/vintage-concierge/thumb.jpg',
    cover: '/projekte/vintage-concierge/cover.jpg',
    logo: '/projekte/vintage-concierge/logo-white.png',
    services: ['Konzeption', 'Videoproduktion', 'Postproduktion', 'Social Media'],
    scope: '3 Reels · Black Week',
    highlights: ['Black-Week-Kampagne', '3 Reels', 'Inklusive 3D-VFX', 'Von der Planung bis zur Veröffentlichung'],
    intro:
      'Vintage Concierge ist ein Mode- und Vintage-Geschäft in Trier, das ausgewählte Markenbekleidung anbietet. Zur Black Week gibt es jedes Jahr besondere Angebote und Rabatte. Für diese Aktion haben wir eine Serie von Reels produziert, die auf das Angebot aufmerksam macht.',
    challenge:
      'Die Black Week ist ein Zeitraum, in dem nahezu jeder Händler mit Rabatten wirbt. Um sich davon abzuheben, brauchte es Inhalte, die im Feed auffallen und das Angebot trotzdem klar und direkt kommunizieren – innerhalb eines eng begrenzten Aktionszeitraums.',
    solution:
      'Wir haben die gesamte Produktion übernommen: von der inhaltlichen Planung über Dreh und Schnitt bis zur Veröffentlichung. Entstanden sind drei Reels in unterschiedlichen Formaten, die sich gegenseitig ergänzen. Ein Highlight ist ein 3D-VFX-Reel, das gezielt auf hohe Aufmerksamkeit und Teilbarkeit ausgelegt wurde.',
    result:
      'Eine kompakte Kampagne aus drei Reels, die das Black-Week-Angebot auffällig und klar in Szene setzt.',
    gallery: [],
    reels: [
      { src: '/projekte/vintage-concierge/reel-1.mp4', poster: '/projekte/vintage-concierge/reel-1.jpg', title: '3D-VFX-Reel Black Week' },
      { src: '/projekte/vintage-concierge/reel-2.mp4', poster: '/projekte/vintage-concierge/reel-2.jpg', title: 'Reel Wonderboxen' },
    ],
    instagramUrl: '', // TODO: Link zum Instagram-Account von Vintage Concierge
  },
];

// ─────────────────────────────────────────────────────────────
//  TEAM – genutzt auf der Startseite (rote Section) und auf /ueber-uns
//  Fotos später nach public/team/ legen, z. B. image: '/team/kai.jpg'
// ─────────────────────────────────────────────────────────────
export const team = [
  {
    name: 'Kai Olbrich',
    role: 'Creative Director',
    initials: 'KO',
    image: '',
    bio: 'Kai hat Mediendesign studiert und ist bei Mediawo für alles Kreative zuständig – von der Idee über Dreh und Schnitt bis zum fertigen Design. Sein Anspruch: Inhalte, die nicht nur gut aussehen, sondern zur Marke passen und bei der richtigen Zielgruppe ankommen.',
    facts: [
      { label: 'Studium', value: 'Mediendesign' },
      { label: 'Schwerpunkt', value: 'Konzeption, Video & Design' },
      { label: 'Bei Mediawo', value: 'Creative Director & Mitgründer' },
    ],
  },
  {
    name: 'Luca Wunderlich',
    role: 'Managing Director',
    initials: 'LW',
    image: '',
    bio: 'Luca hat Betriebswirtschaftslehre studiert und behält bei Mediawo Strategie, Planung und Zahlen im Blick. Er sorgt dafür, dass jedes Projekt ein klares Ziel verfolgt und reibungslos läuft – und ist für unsere Kunden der direkte Draht.',
    facts: [
      { label: 'Studium', value: 'Betriebswirtschaftslehre' },
      { label: 'Schwerpunkt', value: 'Strategie & Kundenbetreuung' },
      { label: 'Bei Mediawo', value: 'Managing Director & Mitgründer' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
//  FAQ – Startseite. Wird zusätzlich als FAQ-Schema (JSON-LD) ausgegeben,
//  damit Google und KI-Suchen die Antworten direkt verwenden können.
// ─────────────────────────────────────────────────────────────
export const faq = [
  {
    q: 'Welche Leistungen bietet Mediawo als Medienagentur in Trier an?',
    a: 'Mediawo ist eine Medienagentur aus Trier für Videoproduktion, Social-Media-Marketing, Recruiting und Employer Branding, Branding und Corporate Design, Webdesign sowie KI und Automatisierung. Wir produzieren Imagefilme, Reels und Social-Media-Content, entwickeln Logos und Markenauftritte, gestalten moderne Websites und automatisieren Geschäftsprozesse mit maßgeschneiderten KI-Tools – auf Wunsch alles aus einer Hand.',
  },
  {
    q: 'Für welche Regionen arbeitet Mediawo?',
    a: 'Unser Sitz ist in Trier. Wir betreuen Unternehmen in Trier und der Region, in Rheinland-Pfalz und im angrenzenden Luxemburg. Für Videodrehs kommen wir zu Ihnen vor Ort; Branding-, Social-Media- und Webdesign-Projekte setzen wir auch überregional um.',
  },
  {
    q: 'Was kostet ein Imagefilm, ein Social-Media-Paket oder eine Website?',
    a: 'Die Kosten hängen vom Umfang ab – etwa von Drehtagen, Anzahl der Videos, Laufzeit der Betreuung oder Seitenumfang der Website. Nach einem ersten Gespräch erhalten Sie ein transparentes Angebot, das genau auf Ihr Vorhaben und Ihr Budget zugeschnitten ist.',
  },
  {
    q: 'Wie läuft ein Projekt mit Mediawo ab?',
    a: 'Am Anfang steht ein Gespräch über Ziele, Zielgruppe und Rahmen. Darauf folgen Konzept und Planung, anschließend Produktion bzw. Gestaltung. Sie erhalten Zwischenstände zur Abstimmung, bevor wir das Ergebnis finalisieren und auf Wunsch auch veröffentlichen oder live schalten.',
  },
  {
    q: 'Unterstützt Mediawo auch bei Recruiting und Employer Branding?',
    a: 'Ja. Mit Recruiting-Videos, Social-Media-Kampagnen und Karriereseiten zeigen wir Ihr Unternehmen als attraktiven Arbeitgeber und erreichen Fachkräfte und Auszubildende dort, wo sie sich informieren – etwa auf Instagram, TikTok oder LinkedIn.',
  },
];
