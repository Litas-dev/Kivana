function setupMobileNav() {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");

  if (!header || !nav || !toggle) return;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("isOpen", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  nav.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.matches("a")) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  const mq = window.matchMedia("(max-width: 920px)");
  mq.addEventListener("change", () => {
    if (!mq.matches) setOpen(false);
  });
}

function setupDisabledLinks() {
  document.querySelectorAll("[data-disabled-link]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });
}

function setYear() {
  const y = document.querySelector("[data-year]");
  if (!y) return;
  y.textContent = String(new Date().getFullYear());
}

function setupBillingToggle() {
  const buttons = Array.from(
    document.querySelectorAll("[data-billing-toggle]"),
  );
  if (buttons.length === 0) return;

  function setBilling(mode) {
    document.body.setAttribute("data-billing", mode);
    buttons.forEach((b) => {
      const isActive = b.getAttribute("data-billing-toggle") === mode;
      b.classList.toggle("isActive", isActive);
      b.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  buttons.forEach((b) => {
    b.addEventListener("click", () => {
      const mode = b.getAttribute("data-billing-toggle");
      if (mode === "monthly" || mode === "annual") setBilling(mode);
    });
  });

  setBilling(
    document.body.getAttribute("data-billing") === "monthly"
      ? "monthly"
      : "annual",
  );
}

function setupModals() {
  const modals = Array.from(document.querySelectorAll("[data-modal]"));
  if (modals.length === 0) return;

  let lastFocus = null;

  function closeAll() {
    modals.forEach((m) => {
      m.hidden = true;
    });
    document.body.style.overflow = "";
    if (lastFocus && lastFocus instanceof HTMLElement) lastFocus.focus();
    lastFocus = null;
  }

  function open(name) {
    const m = document.querySelector(`[data-modal="${name}"]`);
    if (!(m instanceof HTMLElement)) return;
    lastFocus = document.activeElement;
    m.hidden = false;
    document.body.style.overflow = "hidden";
    const first = m.querySelector('button, a, [tabindex]:not([tabindex="-1"])');
    if (first instanceof HTMLElement) first.focus();
  }

  document.querySelectorAll("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-open-modal");
      if (name) open(name);
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", () => closeAll());
  });

  modals.forEach((m) => {
    m.addEventListener("mousedown", (e) => {
      if (e.target === m) closeAll();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
}

const translations = {
  en: {
    "lang.label": "Language",
    "nav.open": "Open menu",
    "nav.how": "How it works",
    "nav.features": "Features",
    "nav.ai": "AI Assistant",
    "nav.pricing": "Pricing",
    "nav.roadmap": "Roadmap",
    "nav.privacy": "Privacy",
    "nav.faq": "FAQ",
    "nav.download": "Download",
    "nav.accountants": "Accountants",
    "hero.eyebrow": "Local-first personal finance desktop app",
    "hero.title":
      "Track bills, accounts, and transactions — privately, on your desktop.",
    "hero.subtitle":
      "Import bank CSV, organize invoices and attachments, and generate reports you can drill into. Optional AI assistance can run locally (Ollama) or via an API key.",
    "hero.ctaPrimary": "Download latest",
    "hero.ctaSecondary": "See features",
    "hero.stat1.title": "Local-first",
    "hero.stat1.desc": "Data saved on your machine",
    "hero.stat2.title": "Fast",
    "hero.stat2.desc": "Built for large transaction lists",
    "hero.stat3.title": "Portable",
    "hero.stat3.desc": "Backup + restore with attachments",
    "hero.ai.title": "AI assistant",
    "hero.ai.tag": "Local or API",
    "hero.ai.ex1.user":
      "“Summarize last month by category and highlight anomalies.”",
    "hero.ai.ex1.ai":
      "Summary ready. Largest changes: Bills (+12%), Transport (‑8%).",
    "hero.ai.ex2.user": "“Prepare a tax‑year report starting April.”",
    "hero.ai.ex2.ai":
      "Prepared. Select a year to export a month‑by‑month summary.",
    "hero.ai.placeholder": "Type a command…",
    "hero.note": "Illustration preview of key workflows.",
    "how.title": "How it works",
    "how.subtitle": "Install, import, and get clear reporting in minutes.",
    "how.step1.title": "Download & install",
    "how.step1.desc": "macOS (.dmg) and Windows (.msi). No account required.",
    "how.step2.title": "Import your bank CSV",
    "how.step2.desc": "Sort and filter transactions, then review categories.",
    "how.step3.title": "Report & export",
    "how.step3.desc":
      "Drill into any month and export summaries for tax or your accountant.",
    "why.li1.title": "Local-first",
    "why.li1.desc": "Your data stays on your device by default.",
    "why.li2.title": "Accountant-ready",
    "why.li2.desc": "Exports, attachments, and tax-year reporting.",
    "why.li3.title": "Optional AI",
    "why.li3.desc": "Use local AI with Ollama or plug in an API key.",
    "features.title": "Built for real accounting workflows",
    "features.subtitle":
      "Keep your records clean, your documents organized, and your exports ready.",
    "example.title": "Example output",
    "example.subtitle": "A typical month after importing your bank CSV.",
    "example.tag": "Illustration",
    "example.kpi1.label": "Net cash flow",
    "example.kpi2.label": "Income",
    "example.kpi3.label": "Expenses",
    "example.kpi4.label": "Bills",
    "example.box1.title": "Top categories",
    "example.cat1": "Bills",
    "example.cat2": "Groceries",
    "example.cat3": "Transport",
    "example.box2.title": "Drill-down",
    "example.box2.desc":
      "Click any month to filter the breakdown and the detailed list instantly.",
    "example.box2.hint": "Month → categories → items",
    "example.note": "Example data for illustration.",
    "features.card1.title": "Transactions + categories",
    "features.card1.desc":
      "Import, filter, and sort. Review selections and export summaries when needed.",
    "features.card2.title": "AI Command Bar (optional)",
    "features.card2.desc":
      "Ask for summaries, find patterns, and draft accountant-ready notes.",
    "features.card3.title": "Accounts, bills, income",
    "features.card3.desc":
      "Track your money sources and obligations with a clean desktop workflow.",
    "features.card4.title": "Reports that drill down",
    "features.card4.desc":
      "Click a month to instantly filter breakdowns and detail lists.",
    "features.card5.title": "Invoices + attachments",
    "features.card5.desc":
      "Store invoices and supporting files alongside your local data.",
    "features.card6.title": "Goals + debts",
    "features.card6.desc":
      "Track targets and balances so you can plan ahead with confidence.",
    "features.card7.title": "Backup & restore",
    "features.card7.desc":
      "Export a portable backup bundle, including your saved attachments.",
    "ai.title": "AI assistance for faster bookkeeping",
    "ai.subtitle":
      "Use the AI Command Bar to search, summarize, and organize your records. It’s optional and can run with local AI.",
    "ai.point1.title": "Local-first AI",
    "ai.point1.desc":
      "Run locally with Ollama, or use an external API key if you prefer.",
    "ai.point2.title": "Professional summaries",
    "ai.point2.desc":
      "Generate monthly summaries, category breakdowns, and variance explanations.",
    "ai.point3.title": "Accountant-ready exports",
    "ai.point3.desc":
      "Draft clear notes and supporting summaries for year-end or tax reporting.",
    "ai.ctaSecondary": "See plans",
    "ai.ctaPrimary": "Try it",
    "ai.demo.title": "AI Command Bar",
    "ai.demo.prompt": "“Identify subscriptions and produce a monthly total.”",
    "ai.demo.line1": "Subscriptions found",
    "ai.demo.line2": "Monthly total",
    "ai.demo.line3": "Most expensive",
    "ai.demo.chip1": "“Explain cash flow variance”",
    "ai.demo.chip2": "“Prepare a tax‑year summary”",
    "ai.demo.chip3": "“Flag unusual expenses”",
    "ai.demo.note":
      "Standard includes basic AI. Pro adds advanced controls for accountant workflows.",
    "pricing.title": "Plans",
    "pricing.subtitle":
      "Choose a plan that matches your workflow — from personal to professional.",
    "pricing.toggle.annual": "Annual",
    "pricing.toggle.save": "(1 month free)",
    "pricing.toggle.monthly": "Monthly",
    "pricing.basic.name": "Basic",
    "pricing.basic.hint": "Basic tools to keep things organized.",
    "pricing.basic.li1": "Basic bill handling",
    "pricing.basic.li2": "Store invoices + bank statements",
    "pricing.basic.li3": "Export a clean package for your accountant",
    "pricing.basic.li4": "Local storage",
    "pricing.basic.cta": "Get Basic",
    "pricing.badge.popular": "Most popular",
    "pricing.standard.name": "Standard",
    "pricing.standard.metaAnnual": "Save 1 month with annual billing.",
    "pricing.standard.metaMonthly": "{price} / year (1 month free).",
    "pricing.standard.hint": "More features with basic AI support.",
    "pricing.standard.li1": "Everything in Basic",
    "pricing.standard.li2": "Advanced filters + sorting",
    "pricing.standard.li3": "Goals + debts",
    "pricing.standard.li4": "Backup + restore bundle",
    "pricing.standard.li5": "Expanded reporting tools",
    "pricing.standard.li6": "AI assistant (basic)",
    "pricing.standard.cta": "Get Standard",
    "pricing.pro.name": "Pro",
    "pricing.pro.metaAnnual": "Save 1 month with annual billing.",
    "pricing.pro.metaMonthly": "{price} / year (1 month free).",
    "pricing.pro.hint": "For accountants and advanced tax workflows.",
    "pricing.pro.li1": "Everything in Standard",
    "pricing.pro.li2": "Invoice attachments workflow",
    "pricing.pro.li3": "AI-assisted categorization + summaries",
    "pricing.pro.li4": "Client-ready export packs and reporting",
    "pricing.pro.li5": "Tax-year reporting support",
    "pricing.pro.li6": "Priority support",
    "pricing.pro.cta": "Get Pro",
    "pricing.lifetime.title": "Lifetime license (Pro)",
    "pricing.lifetime.desc":
      "For firms that prefer a one‑time purchase instead of subscription billing.",
    "pricing.unit.mo": "/mo",
    "pricing.unit.yr": "/yr",
    "pricing.lifetime.unit": "one-time",
    "pricing.note": "Prices are placeholders. Change them any time.",
    "accountants.title": "Rent an accountant",
    "accountants.subtitle": "Choose what you need done, and request an introduction.",
    "accountants.badge.remote": "Remote",
    "accountants.card1.title": "Bookkeeping & VAT",
    "accountants.card1.li1": "Categorization review and clean-up",
    "accountants.card1.li2": "VAT-ready exports and supporting notes",
    "accountants.card1.li3": "Attachments organized (invoices/statements)",
    "accountants.card2.title": "Self‑employed & tax year",
    "accountants.card2.li1": "Month-by-month summary for your tax year",
    "accountants.card2.li2": "Expense breakdown and anomaly checks",
    "accountants.card2.li3": "Export pack for filing or your adviser",
    "accountants.card3.title": "Small business support",
    "accountants.card3.li1": "Ongoing bookkeeping and reconciliation",
    "accountants.card3.li2": "Document handling and invoice organization",
    "accountants.card3.li3": "Regular reporting and export support",
    "accountants.request": "Request an introduction",
    "accountants.note":
      "This is a request form. Availability depends on region and capacity.",
    "accountants.modalTitle": "Request an accountant",
    "accountants.form.region": "Region",
    "accountants.form.type": "Business type",
    "accountants.form.email": "Your email",
    "accountants.form.notes": "What do you need help with?",
    "accountants.form.submit": "Send request",
    "accountants.form.note": "This will open your email app with a pre-filled request.",
    "roadmap.title": "Availability & roadmap",
    "roadmap.subtitle": "Desktop first. Mobile is planned.",
    "roadmap.desktop.title": "Desktop",
    "roadmap.desktop.status": "Released",
    "roadmap.desktop.leaf1": "macOS",
    "roadmap.desktop.leaf2": "Windows",
    "roadmap.desktop.note": "Download links coming soon.",
    "roadmap.mobile.title": "Mobile",
    "roadmap.mobile.status": "On the roadmap",
    "roadmap.mobile.leaf1": "Android",
    "roadmap.mobile.leaf2": "iOS",
    "roadmap.next.title": "Next",
    "roadmap.next.status": "Planned",
    "roadmap.next.leaf1": "AI accounting actions",
    "roadmap.next.leaf2": "Client export packs (Pro)",
    "roadmap.next.leaf3": "Document organization",
    "privacy.title": "Private by design",
    "privacy.subtitle":
      "Your financial data is stored locally on your device. You control backups, exports, and what you share.",
    "privacy.li1": "No automatic upload of your finance data",
    "privacy.li2": "Local attachments folder for bills and invoices",
    "privacy.li3": "Portable backups for accountants or migration",
    "privacy.callout.title": "Works offline",
    "privacy.callout.desc":
      "Use it on a laptop without worrying about sync, accounts, or downtime.",
    "privacy.tag1": "Local JSON",
    "privacy.tag2": "Attachments",
    "privacy.tag3": "Backup bundle",
    "faq.title": "FAQ",
    "faq.subtitle": "Quick answers to common questions.",
    "faq.q1": "Is this a web app?",
    "faq.a1": "Kivana is a desktop app. This page is the marketing website.",
    "faq.q2": "Do I have to use the AI assistant?",
    "faq.a2":
      "No. The AI assistant is optional. You can run it locally (Ollama) or use no AI at all.",
    "faq.q3": "Can I attach invoice images?",
    "faq.a3":
      "Yes. Invoices can store image attachments locally so you can keep proof and share it later if needed.",
    "faq.q4": "Can I export my data?",
    "faq.a4":
      "Yes. You can export a backup bundle for migration and restore it later (including saved attachments).",
    "download.title": "Ready to try Kivana?",
    "download.subtitle":
      "Add your accounts, import transactions, and keep invoices together in one workflow.",
    "download.fact1": "macOS (.dmg) and Windows (.msi) installers",
    "download.fact2": "Local-first data storage (no required account)",
    "download.fact3": "In-app updater supported for new versions",
    "download.ctaPrimary": "Download from GitHub Releases",
    "download.ctaSecondary": "Back to top",
    "download.note": "Downloads are hosted on GitHub Releases.",
    "footer.features": "Features",
    "footer.privacy": "Privacy",
    "footer.faq": "FAQ",
    "footer.copyrightPrefix": "©",
    "footer.rights": "All rights reserved.",
    "privacy.open": "Read full privacy policy",
    "privacy.modalTitle": "Privacy Policy (EU)",
    "privacy.modalNote":
      "This policy is provided for transparency and is not legal advice.",
    "faq.open": "Open FAQ",
    "faq.modalTitle": "FAQ",
    "faq.pill1": "Local-first",
    "faq.pill2": "AI optional",
    "faq.pill3": "Export-ready",
    "modal.close": "Close",
  },
  de: {
    "lang.label": "Sprache",
    "nav.open": "Menü öffnen",
    "nav.how": "So funktioniert’s",
    "nav.features": "Funktionen",
    "nav.ai": "KI‑Assistent",
    "nav.pricing": "Preise",
    "nav.roadmap": "Roadmap",
    "nav.privacy": "Datenschutz",
    "nav.faq": "FAQ",
    "nav.download": "Download",
    "hero.eyebrow": "Lokale Personal-Finance-Desktop-App",
    "hero.title":
      "Rechnungen, Konten und Transaktionen privat auf dem Desktop verwalten.",
    "hero.subtitle":
      "Bank-CSV importieren, Rechnungen und Anhänge organisieren und Berichte mit Drill-down erstellen. Optionale KI läuft lokal (Ollama) oder per API‑Key.",
    "hero.ctaPrimary": "Neueste Version laden",
    "hero.ctaSecondary": "Funktionen ansehen",
    "hero.stat1.title": "Lokal",
    "hero.stat1.desc": "Daten bleiben auf Ihrem Gerät",
    "hero.stat2.title": "Schnell",
    "hero.stat2.desc": "Für große Transaktionslisten gebaut",
    "hero.stat3.title": "Portabel",
    "hero.stat3.desc": "Backup + Restore inkl. Anhänge",
    "hero.ai.title": "KI‑Assistent",
    "hero.ai.tag": "Lokal oder API",
    "hero.ai.ex1.user":
      "„Letzten Monat nach Kategorien zusammenfassen und Auffälligkeiten markieren.“",
    "hero.ai.ex1.ai":
      "Zusammenfassung bereit. Größte Änderungen: Fixkosten (+12%), Transport (‑8%).",
    "hero.ai.ex2.user": "„Steuerjahr‑Report ab April erstellen.“",
    "hero.ai.ex2.ai":
      "Vorbereitet. Jahr auswählen, um eine Monatsübersicht zu exportieren.",
    "hero.ai.placeholder": "Befehl eingeben…",
    "hero.note": "Illustration der wichtigsten Workflows.",
    "features.title": "Für echte Buchhaltungs‑Workflows gebaut",
    "features.subtitle":
      "Saubere Daten, geordnete Belege, exportfertige Auswertungen.",
    "features.card1.title": "Transaktionen + Kategorien",
    "features.card1.desc":
      "Importieren, filtern und sortieren. Auswahlen prüfen und bei Bedarf exportieren.",
    "features.card2.title": "KI‑Command Bar (optional)",
    "features.card2.desc":
      "Zusammenfassungen erstellen, Muster finden und Notizen für den Steuerberater vorbereiten.",
    "features.card3.title": "Konten, Fixkosten, Einnahmen",
    "features.card3.desc":
      "Übersicht über Quellen und Verpflichtungen in einem klaren Desktop‑Workflow.",
    "features.card4.title": "Berichte mit Drill‑down",
    "features.card4.desc":
      "Monat anklicken und sofort Details und Aufschlüsselungen filtern.",
    "features.card5.title": "Rechnungen + Anhänge",
    "features.card5.desc":
      "Belege und Dokumente zusammen mit Ihren lokalen Daten speichern.",
    "features.card6.title": "Ziele + Schulden",
    "features.card6.desc": "Ziele und Salden verfolgen, um besser zu planen.",
    "features.card7.title": "Backup & Restore",
    "features.card7.desc":
      "Portables Backup‑Bundle exportieren, inklusive Anhängen.",
    "ai.title": "KI‑Unterstützung für schnellere Buchführung",
    "ai.subtitle":
      "Mit der KI‑Command Bar suchen, zusammenfassen und organisieren. Optional – auch mit lokaler KI.",
    "ai.point1.title": "Lokale KI",
    "ai.point1.desc": "Lokal mit Ollama oder alternativ per API‑Key.",
    "ai.point2.title": "Professionelle Zusammenfassungen",
    "ai.point2.desc":
      "Monatsübersichten, Kategorien und Abweichungen erstellen.",
    "ai.point3.title": "Export‑bereit",
    "ai.point3.desc":
      "Klare Notizen und Zusammenfassungen für Jahresabschluss oder Steuer vorbereiten.",
    "ai.ctaSecondary": "Pläne ansehen",
    "ai.ctaPrimary": "Ausprobieren",
    "ai.demo.title": "KI‑Command Bar",
    "ai.demo.prompt": "„Abos erkennen und monatliche Summe erstellen.“",
    "ai.demo.line1": "Abos gefunden",
    "ai.demo.line2": "Monatssumme",
    "ai.demo.line3": "Teuerstes",
    "ai.demo.chip1": "„Cashflow‑Abweichung erklären“",
    "ai.demo.chip2": "„Steuerjahr‑Zusammenfassung“",
    "ai.demo.chip3": "„Ungewöhnliche Ausgaben markieren“",
    "ai.demo.note":
      "Standard enthält Basis‑KI. Pro bietet erweiterte Steuerberater‑Workflows.",
    "pricing.title": "Pläne",
    "pricing.subtitle": "Wählen Sie den Plan, der zu Ihrem Workflow passt.",
    "pricing.toggle.annual": "Jährlich",
    "pricing.toggle.save": "(1 Monat gratis)",
    "pricing.toggle.monthly": "Monatlich",
    "pricing.basic.name": "Basic",
    "pricing.basic.hint": "Grundfunktionen für Ordnung und Übersicht.",
    "pricing.basic.li1": "Einfache Fixkosten‑Verwaltung",
    "pricing.basic.li2": "Belege + Kontoauszüge speichern",
    "pricing.basic.li3": "Sauberes Paket für den Steuerberater exportieren",
    "pricing.basic.li4": "Lokale Speicherung",
    "pricing.basic.cta": "Basic wählen",
    "pricing.badge.popular": "Beliebt",
    "pricing.standard.name": "Standard",
    "pricing.standard.metaAnnual": "1 Monat sparen mit jährlicher Zahlung.",
    "pricing.standard.metaMonthly": "{price} / Jahr (1 Monat gratis).",
    "pricing.standard.hint": "Mehr Funktionen mit Basis‑KI.",
    "pricing.standard.li1": "Alles aus Basic",
    "pricing.standard.li2": "Erweiterte Filter + Sortierung",
    "pricing.standard.li3": "Ziele + Schulden",
    "pricing.standard.li4": "Backup + Restore",
    "pricing.standard.li5": "Erweiterte Reports",
    "pricing.standard.li6": "KI‑Assistent (Basis)",
    "pricing.standard.cta": "Standard wählen",
    "pricing.pro.name": "Pro",
    "pricing.pro.metaAnnual": "1 Monat sparen mit jährlicher Zahlung.",
    "pricing.pro.metaMonthly": "{price} / Jahr (1 Monat gratis).",
    "pricing.pro.hint": "Für Kanzleien und anspruchsvolle Steuer‑Workflows.",
    "pricing.pro.li1": "Alles aus Standard",
    "pricing.pro.li2": "Beleg‑Workflow",
    "pricing.pro.li3": "KI‑gestützte Kategorisierung + Zusammenfassungen",
    "pricing.pro.li4": "Mandanten‑Exportpakete + Reporting",
    "pricing.pro.li5": "Unterstützung für Steuerjahre",
    "pricing.pro.li6": "Priorisierter Support",
    "pricing.pro.cta": "Pro wählen",
    "pricing.lifetime.title": "Lifetime‑Lizenz (Pro)",
    "pricing.lifetime.desc":
      "Für Firmen, die lieber einmalig kaufen statt abonnieren.",
    "pricing.unit.mo": "/mo",
    "pricing.unit.yr": "/yr",
    "pricing.lifetime.unit": "einmalig",
    "pricing.note": "Preise sind Platzhalter und können sich ändern.",
    "roadmap.title": "Verfügbarkeit & Roadmap",
    "roadmap.subtitle": "Desktop zuerst, Mobile ist geplant.",
    "roadmap.desktop.title": "Desktop",
    "roadmap.desktop.status": "Veröffentlicht",
    "roadmap.desktop.leaf1": "macOS",
    "roadmap.desktop.leaf2": "Windows",
    "roadmap.desktop.note": "Download‑Links folgen.",
    "roadmap.mobile.title": "Mobile",
    "roadmap.mobile.status": "Geplant",
    "roadmap.mobile.leaf1": "Android",
    "roadmap.mobile.leaf2": "iOS",
    "roadmap.next.title": "Als Nächstes",
    "roadmap.next.status": "Geplant",
    "roadmap.next.leaf1": "Mehr KI‑Aktionen",
    "roadmap.next.leaf2": "Mandanten‑Exportpakete (Pro)",
    "roadmap.next.leaf3": "Bessere Dokument‑Organisation",
    "privacy.title": "Datenschutz by design",
    "privacy.subtitle":
      "Ihre Finanzdaten werden lokal gespeichert. Sie kontrollieren Backups, Exporte und Freigaben.",
    "privacy.li1": "Keine automatische Datenübertragung",
    "privacy.li2": "Lokale Anhänge für Belege",
    "privacy.li3": "Portables Backup für Migration oder Steuerberater",
    "privacy.callout.title": "Offline nutzbar",
    "privacy.callout.desc": "Auch ohne Sync, Accounts oder Ausfälle nutzbar.",
    "privacy.tag1": "Lokales JSON",
    "privacy.tag2": "Anhänge",
    "privacy.tag3": "Backup‑Bundle",
    "faq.title": "FAQ",
    "faq.subtitle": "Kurze Antworten auf häufige Fragen.",
    "faq.q1": "Ist das eine Web‑App?",
    "faq.a1":
      "Kivana ist eine Desktop‑App. Diese Seite ist die Marketing‑Website.",
    "faq.q2": "Muss ich die KI nutzen?",
    "faq.a2":
      "Nein. Die KI ist optional. Sie können sie lokal (Ollama) oder gar nicht verwenden.",
    "faq.q3": "Kann ich Rechnungsbilder anhängen?",
    "faq.a3":
      "Ja. Rechnungen können lokal gespeichert werden, um Belege später bereitzustellen.",
    "faq.q4": "Kann ich meine Daten exportieren?",
    "faq.a4":
      "Ja. Sie können ein Backup‑Bundle exportieren und später wiederherstellen (inkl. Anhänge).",
    "download.title": "Bereit für Kivana?",
    "download.subtitle":
      "Konten anlegen, Transaktionen importieren und Belege zentral verwalten.",
    "download.ctaPrimary": "Über GitHub Releases herunterladen",
    "download.ctaSecondary": "Nach oben",
    "download.note":
      "Downloads werden über GitHub Releases bereitgestellt.",
    "footer.features": "Funktionen",
    "footer.privacy": "Datenschutz",
    "footer.faq": "FAQ",
    "footer.copyrightPrefix": "©",
    "footer.rights": "Alle Rechte vorbehalten.",
    "privacy.open": "Datenschutzerklärung lesen",
    "privacy.modalTitle": "Datenschutzerklärung (EU)",
    "privacy.modalNote":
      "Diese Information dient der Transparenz und ist keine Rechtsberatung.",
    "faq.open": "FAQ öffnen",
    "faq.modalTitle": "FAQ",
    "faq.pill1": "Lokal",
    "faq.pill2": "KI optional",
    "faq.pill3": "Exportbereit",
    "modal.close": "Schließen",
  },
  fr: {
    "lang.label": "Langue",
    "nav.open": "Ouvrir le menu",
    "nav.how": "Comment ça marche",
    "nav.features": "Fonctionnalités",
    "nav.ai": "Assistant IA",
    "nav.pricing": "Tarifs",
    "nav.roadmap": "Feuille de route",
    "nav.privacy": "Confidentialité",
    "nav.faq": "FAQ",
    "nav.download": "Télécharger",
    "hero.eyebrow": "Application desktop de finances personnelles, en local",
    "hero.title":
      "Suivez factures, comptes et transactions — en privé, sur votre bureau.",
    "hero.subtitle":
      "Importez des CSV bancaires, organisez factures et pièces jointes, et générez des rapports détaillables. IA optionnelle en local (Ollama) ou via clé API.",
    "hero.ctaPrimary": "Télécharger la dernière version",
    "hero.ctaSecondary": "Voir les fonctionnalités",
    "hero.stat1.title": "Local",
    "hero.stat1.desc": "Données stockées sur votre machine",
    "hero.stat2.title": "Rapide",
    "hero.stat2.desc": "Conçu pour de grandes listes",
    "hero.stat3.title": "Portable",
    "hero.stat3.desc": "Sauvegarde + restauration avec pièces jointes",
    "hero.ai.title": "Assistant IA",
    "hero.ai.tag": "Local ou API",
    "hero.ai.ex1.user":
      "« Résumez le mois dernier par catégorie et signalez les anomalies. »",
    "hero.ai.ex1.ai":
      "Résumé prêt. Plus fortes variations : Charges (+12%), Transport (‑8%).",
    "hero.ai.ex2.user":
      "« Préparez un rapport d’année fiscale à partir d’avril. »",
    "hero.ai.ex2.ai":
      "Prêt. Choisissez une année pour exporter un résumé mensuel.",
    "hero.ai.placeholder": "Saisir une commande…",
    "hero.note": "Illustration des principaux flux.",
    "features.title": "Pensé pour la vraie comptabilité",
    "features.subtitle": "Données propres, documents classés, exports prêts.",
    "features.card1.title": "Transactions + catégories",
    "features.card1.desc":
      "Importer, filtrer, trier. Vérifier et exporter des synthèses.",
    "features.card2.title": "Barre de commandes IA (optionnelle)",
    "features.card2.desc":
      "Créer des synthèses, repérer des tendances et préparer des notes pro.",
    "features.card3.title": "Comptes, charges, revenus",
    "features.card3.desc":
      "Suivez vos sources et obligations dans un flux desktop clair.",
    "features.card4.title": "Rapports avec détail",
    "features.card4.desc": "Cliquez sur un mois pour filtrer instantanément.",
    "features.card5.title": "Factures + pièces jointes",
    "features.card5.desc": "Conservez les documents avec vos données locales.",
    "features.card6.title": "Objectifs + dettes",
    "features.card6.desc": "Suivez objectifs et soldes pour planifier.",
    "features.card7.title": "Sauvegarde & restauration",
    "features.card7.desc":
      "Exportez un bundle portable, pièces jointes incluses.",
    "ai.title": "IA pour accélérer la tenue des comptes",
    "ai.subtitle":
      "Rechercher, résumer et organiser via la barre de commandes IA. Optionnelle, possible en local.",
    "ai.point1.title": "IA en local",
    "ai.point1.desc": "En local via Ollama, ou avec une clé API.",
    "ai.point2.title": "Synthèses professionnelles",
    "ai.point2.desc": "Synthèses mensuelles, catégories et écarts.",
    "ai.point3.title": "Exports prêts",
    "ai.point3.desc": "Rédigez des notes claires pour clôture ou fiscalité.",
    "ai.ctaSecondary": "Voir les offres",
    "ai.ctaPrimary": "Essayer",
    "ai.demo.title": "Barre de commandes IA",
    "ai.demo.prompt":
      "« Identifier les abonnements et calculer le total mensuel. »",
    "ai.demo.line1": "Abonnements trouvés",
    "ai.demo.line2": "Total mensuel",
    "ai.demo.line3": "Le plus cher",
    "ai.demo.chip1": "« Expliquer l’écart de cash flow »",
    "ai.demo.chip2": "« Préparer un résumé fiscal »",
    "ai.demo.chip3": "« Signaler des dépenses inhabituelles »",
    "ai.demo.note":
      "Standard inclut une IA basique. Pro ajoute des contrôles avancés pour cabinets.",
    "pricing.title": "Offres",
    "pricing.subtitle": "Choisissez l’offre adaptée à votre workflow.",
    "pricing.toggle.annual": "Annuel",
    "pricing.toggle.save": "(1 mois offert)",
    "pricing.toggle.monthly": "Mensuel",
    "pricing.basic.name": "Basic",
    "pricing.basic.hint": "Essentiel pour rester organisé.",
    "pricing.basic.li1": "Gestion simple des charges",
    "pricing.basic.li2": "Stocker factures + relevés",
    "pricing.basic.li3": "Exporter un pack propre pour votre comptable",
    "pricing.basic.li4": "Stockage local",
    "pricing.basic.cta": "Choisir Basic",
    "pricing.badge.popular": "Populaire",
    "pricing.standard.name": "Standard",
    "pricing.standard.metaAnnual": "1 mois offert en annuel.",
    "pricing.standard.metaMonthly": "{price} / an (1 mois offert).",
    "pricing.standard.hint": "Plus de fonctions avec IA basique.",
    "pricing.standard.li1": "Tout Basic",
    "pricing.standard.li2": "Filtres + tri avancés",
    "pricing.standard.li3": "Objectifs + dettes",
    "pricing.standard.li4": "Sauvegarde + restauration",
    "pricing.standard.li5": "Rapports avancés",
    "pricing.standard.li6": "Assistant IA (basique)",
    "pricing.standard.cta": "Choisir Standard",
    "pricing.pro.name": "Pro",
    "pricing.pro.metaAnnual": "1 mois offert en annuel.",
    "pricing.pro.metaMonthly": "{price} / an (1 mois offert).",
    "pricing.pro.hint": "Pour cabinets et workflows fiscaux avancés.",
    "pricing.pro.li1": "Tout Standard",
    "pricing.pro.li2": "Flux pièces jointes",
    "pricing.pro.li3": "Catégorisation + synthèses assistées",
    "pricing.pro.li4": "Packs export client + reporting",
    "pricing.pro.li5": "Support année fiscale",
    "pricing.pro.li6": "Support prioritaire",
    "pricing.pro.cta": "Choisir Pro",
    "pricing.lifetime.title": "Licence à vie (Pro)",
    "pricing.lifetime.desc":
      "Pour les structures qui préfèrent un achat unique.",
    "pricing.unit.mo": "/mo",
    "pricing.unit.yr": "/yr",
    "pricing.lifetime.unit": "une fois",
    "pricing.note": "Tarifs indicatifs, modifiables.",
    "roadmap.title": "Disponibilité & feuille de route",
    "roadmap.subtitle": "Desktop d’abord. Mobile ensuite.",
    "roadmap.desktop.title": "Desktop",
    "roadmap.desktop.status": "Publié",
    "roadmap.desktop.leaf1": "macOS",
    "roadmap.desktop.leaf2": "Windows",
    "roadmap.desktop.note": "Liens de téléchargement bientôt.",
    "roadmap.mobile.title": "Mobile",
    "roadmap.mobile.status": "Sur la feuille de route",
    "roadmap.mobile.leaf1": "Android",
    "roadmap.mobile.leaf2": "iOS",
    "roadmap.next.title": "Ensuite",
    "roadmap.next.status": "Planifié",
    "roadmap.next.leaf1": "Actions IA comptables",
    "roadmap.next.leaf2": "Packs export clients (Pro)",
    "roadmap.next.leaf3": "Organisation documentaire",
    "privacy.title": "Confidentialité par conception",
    "privacy.subtitle":
      "Vos données restent sur votre appareil. Vous contrôlez sauvegardes, exports et partages.",
    "privacy.li1": "Aucun envoi automatique",
    "privacy.li2": "Pièces jointes locales",
    "privacy.li3": "Sauvegardes portables pour cabinet ou migration",
    "privacy.callout.title": "Fonctionne hors ligne",
    "privacy.callout.desc": "Utilisable sans sync ni compte.",
    "privacy.tag1": "JSON local",
    "privacy.tag2": "Pièces jointes",
    "privacy.tag3": "Bundle de sauvegarde",
    "faq.title": "FAQ",
    "faq.subtitle": "Réponses rapides.",
    "faq.q1": "Est-ce une web app ?",
    "faq.a1":
      "Kivana est une application desktop. Cette page est le site marketing.",
    "faq.q2": "Dois-je utiliser l’IA ?",
    "faq.a2": "Non. L’IA est optionnelle (local via Ollama) ou désactivée.",
    "faq.q3": "Puis-je joindre des factures ?",
    "faq.a3":
      "Oui. Les factures peuvent être stockées localement pour conserver les justificatifs.",
    "faq.q4": "Puis-je exporter mes données ?",
    "faq.a4":
      "Oui. Exportez un bundle de sauvegarde et restaurez-le plus tard (pièces jointes incluses).",
    "download.title": "Prêt à essayer Kivana ?",
    "download.subtitle":
      "Ajoutez des comptes, importez des transactions et centralisez vos justificatifs.",
    "download.ctaPrimary": "Télécharger via GitHub Releases",
    "download.ctaSecondary": "Haut de page",
    "download.note": "Les téléchargements sont hébergés sur GitHub Releases.",
    "footer.features": "Fonctionnalités",
    "footer.privacy": "Confidentialité",
    "footer.faq": "FAQ",
    "footer.copyrightPrefix": "©",
    "footer.rights": "Tous droits réservés.",
    "privacy.open": "Lire la politique de confidentialité",
    "privacy.modalTitle": "Politique de confidentialité (UE)",
    "privacy.modalNote":
      "Document fourni à titre informatif et non comme conseil juridique.",
    "faq.open": "Ouvrir la FAQ",
    "faq.modalTitle": "FAQ",
    "faq.pill1": "Local",
    "faq.pill2": "IA optionnelle",
    "faq.pill3": "Prêt à exporter",
    "modal.close": "Fermer",
  },
  es: {
    "lang.label": "Idioma",
    "nav.open": "Abrir menú",
    "nav.how": "Cómo funciona",
    "nav.features": "Funciones",
    "nav.ai": "Asistente IA",
    "nav.pricing": "Precios",
    "nav.roadmap": "Hoja de ruta",
    "nav.privacy": "Privacidad",
    "nav.faq": "FAQ",
    "nav.download": "Descargar",
    "hero.eyebrow": "App de finanzas personales de escritorio (local)",
    "hero.title":
      "Controla facturas, cuentas y transacciones — en privado, en tu escritorio.",
    "hero.subtitle":
      "Importa CSV bancarios, organiza facturas y adjuntos, y genera informes con detalle. IA opcional en local (Ollama) o con clave API.",
    "hero.ctaPrimary": "Descargar la última versión",
    "hero.ctaSecondary": "Ver funciones",
    "hero.stat1.title": "Local",
    "hero.stat1.desc": "Datos guardados en tu equipo",
    "hero.stat2.title": "Rápido",
    "hero.stat2.desc": "Hecho para listas grandes",
    "hero.stat3.title": "Portátil",
    "hero.stat3.desc": "Copia + restauración con adjuntos",
    "hero.ai.title": "Asistente IA",
    "hero.ai.tag": "Local o API",
    "hero.ai.ex1.user":
      "“Resume el mes pasado por categoría y marca anomalías.”",
    "hero.ai.ex1.ai":
      "Resumen listo. Cambios mayores: Facturas (+12%), Transporte (‑8%).",
    "hero.ai.ex2.user": "“Prepara un informe fiscal desde abril.”",
    "hero.ai.ex2.ai":
      "Preparado. Elige un año para exportar un resumen mensual.",
    "hero.ai.placeholder": "Escribe un comando…",
    "hero.note": "Ilustración de los flujos principales.",
    "features.title": "Diseñado para contabilidad real",
    "features.subtitle":
      "Registros limpios, documentos organizados, exportaciones listas.",
    "features.card1.title": "Transacciones + categorías",
    "features.card1.desc":
      "Importa, filtra y ordena. Revisa y exporta resúmenes.",
    "features.card2.title": "Barra de comandos IA (opcional)",
    "features.card2.desc":
      "Resúmenes, patrones y notas profesionales para el contable.",
    "features.card3.title": "Cuentas, facturas, ingresos",
    "features.card3.desc":
      "Controla fuentes y obligaciones con un flujo de escritorio claro.",
    "features.card4.title": "Informes con detalle",
    "features.card4.desc": "Haz clic en un mes y filtra al instante.",
    "features.card5.title": "Facturas + adjuntos",
    "features.card5.desc": "Guarda documentos junto a tus datos locales.",
    "features.card6.title": "Objetivos + deudas",
    "features.card6.desc": "Sigue objetivos y saldos para planificar.",
    "features.card7.title": "Copia y restauración",
    "features.card7.desc": "Exporta un paquete portátil con adjuntos.",
    "ai.title": "IA para acelerar la gestión",
    "ai.subtitle":
      "Busca, resume y organiza con la Barra de Comandos IA. Es opcional y puede funcionar en local.",
    "ai.point1.title": "IA local",
    "ai.point1.desc": "En local con Ollama o mediante clave API.",
    "ai.point2.title": "Resúmenes profesionales",
    "ai.point2.desc": "Resúmenes mensuales, categorías y variaciones.",
    "ai.point3.title": "Exportaciones listas",
    "ai.point3.desc": "Notas claras para cierre anual o impuestos.",
    "ai.ctaSecondary": "Ver planes",
    "ai.ctaPrimary": "Probar",
    "ai.demo.title": "Barra de comandos IA",
    "ai.demo.prompt": "“Identifica suscripciones y calcula el total mensual.”",
    "ai.demo.line1": "Suscripciones encontradas",
    "ai.demo.line2": "Total mensual",
    "ai.demo.line3": "Más caro",
    "ai.demo.chip1": "“Explica la variación de cash flow”",
    "ai.demo.chip2": "“Prepara un resumen fiscal”",
    "ai.demo.chip3": "“Detecta gastos inusuales”",
    "ai.demo.note":
      "Standard incluye IA básica. Pro añade controles avanzados para contables.",
    "pricing.title": "Planes",
    "pricing.subtitle": "Elige el plan que encaje con tu trabajo.",
    "pricing.toggle.annual": "Anual",
    "pricing.toggle.save": "(1 mes gratis)",
    "pricing.toggle.monthly": "Mensual",
    "pricing.basic.name": "Basic",
    "pricing.basic.hint": "Lo esencial para organizarte.",
    "pricing.basic.li1": "Gestión básica de facturas",
    "pricing.basic.li2": "Guardar facturas + extractos",
    "pricing.basic.li3": "Exportar un paquete limpio para el contable",
    "pricing.basic.li4": "Almacenamiento local",
    "pricing.basic.cta": "Elegir Basic",
    "pricing.badge.popular": "Más popular",
    "pricing.standard.name": "Standard",
    "pricing.standard.metaAnnual": "Ahorra 1 mes con pago anual.",
    "pricing.standard.metaMonthly": "{price} / año (1 mes gratis).",
    "pricing.standard.hint": "Más funciones con IA básica.",
    "pricing.standard.li1": "Todo en Basic",
    "pricing.standard.li2": "Filtros + orden avanzado",
    "pricing.standard.li3": "Objetivos + deudas",
    "pricing.standard.li4": "Copia + restauración",
    "pricing.standard.li5": "Informes ampliados",
    "pricing.standard.li6": "Asistente IA (básico)",
    "pricing.standard.cta": "Elegir Standard",
    "pricing.pro.name": "Pro",
    "pricing.pro.metaAnnual": "Ahorra 1 mes con pago anual.",
    "pricing.pro.metaMonthly": "{price} / año (1 mes gratis).",
    "pricing.pro.hint": "Para contables y flujos fiscales avanzados.",
    "pricing.pro.li1": "Todo en Standard",
    "pricing.pro.li2": "Flujo de adjuntos",
    "pricing.pro.li3": "Categorización + resúmenes asistidos",
    "pricing.pro.li4": "Paquetes de exportación para clientes",
    "pricing.pro.li5": "Soporte de año fiscal",
    "pricing.pro.li6": "Soporte prioritario",
    "pricing.pro.cta": "Elegir Pro",
    "pricing.lifetime.title": "Licencia de por vida (Pro)",
    "pricing.lifetime.desc": "Para empresas que prefieren compra única.",
    "pricing.unit.mo": "/mo",
    "pricing.unit.yr": "/yr",
    "pricing.lifetime.unit": "pago único",
    "pricing.note": "Precios orientativos, pueden cambiar.",
    "roadmap.title": "Disponibilidad y hoja de ruta",
    "roadmap.subtitle": "Primero escritorio. Móvil después.",
    "roadmap.desktop.title": "Escritorio",
    "roadmap.desktop.status": "Publicado",
    "roadmap.desktop.leaf1": "macOS",
    "roadmap.desktop.leaf2": "Windows",
    "roadmap.desktop.note": "Enlaces de descarga próximamente.",
    "roadmap.mobile.title": "Móvil",
    "roadmap.mobile.status": "En la hoja de ruta",
    "roadmap.mobile.leaf1": "Android",
    "roadmap.mobile.leaf2": "iOS",
    "roadmap.next.title": "Siguiente",
    "roadmap.next.status": "Planificado",
    "roadmap.next.leaf1": "Acciones IA contables",
    "roadmap.next.leaf2": "Paquetes de exportación (Pro)",
    "roadmap.next.leaf3": "Organización de documentos",
    "privacy.title": "Privacidad por diseño",
    "privacy.subtitle":
      "Tus datos se guardan localmente. Tú controlas copias, exportaciones y lo que compartes.",
    "privacy.li1": "Sin subida automática",
    "privacy.li2": "Adjuntos locales",
    "privacy.li3": "Copias portátiles para contables o migración",
    "privacy.callout.title": "Funciona sin conexión",
    "privacy.callout.desc": "Úsalo sin sincronización ni cuentas.",
    "privacy.tag1": "JSON local",
    "privacy.tag2": "Adjuntos",
    "privacy.tag3": "Paquete de copia",
    "faq.title": "FAQ",
    "faq.subtitle": "Respuestas rápidas.",
    "faq.q1": "¿Es una web app?",
    "faq.a1":
      "Kivana es una app de escritorio. Esta página es el sitio marketing.",
    "faq.q2": "¿Tengo que usar la IA?",
    "faq.a2":
      "No. La IA es opcional. Puedes usarla en local (Ollama) o no usar IA.",
    "faq.q3": "¿Puedo adjuntar imágenes de facturas?",
    "faq.a3": "Sí. Puedes guardar facturas localmente como justificantes.",
    "faq.q4": "¿Puedo exportar mis datos?",
    "faq.a4":
      "Sí. Exporta un paquete de copia y restáuralo después (incluye adjuntos).",
    "download.title": "¿Listo para probar Kivana?",
    "download.subtitle":
      "Añade cuentas, importa transacciones y organiza documentos.",
    "download.ctaPrimary": "Descargar desde GitHub Releases",
    "download.ctaSecondary": "Volver arriba",
    "download.note": "Las descargas están alojadas en GitHub Releases.",
    "footer.features": "Funciones",
    "footer.privacy": "Privacidad",
    "footer.faq": "FAQ",
    "footer.copyrightPrefix": "©",
    "footer.rights": "Todos los derechos reservados.",
    "privacy.open": "Leer política de privacidad",
    "privacy.modalTitle": "Política de privacidad (UE)",
    "privacy.modalNote": "Documento informativo; no es asesoramiento legal.",
    "faq.open": "Abrir FAQ",
    "faq.modalTitle": "FAQ",
    "faq.pill1": "Local",
    "faq.pill2": "IA opcional",
    "faq.pill3": "Listo para exportar",
    "modal.close": "Cerrar",
  },
  it: {
    "lang.label": "Lingua",
    "nav.open": "Apri menu",
    "nav.how": "Come funziona",
    "nav.features": "Funzionalità",
    "nav.ai": "Assistente IA",
    "nav.pricing": "Prezzi",
    "nav.roadmap": "Roadmap",
    "nav.privacy": "Privacy",
    "nav.faq": "FAQ",
    "nav.download": "Download",
    "hero.eyebrow": "App desktop di finanza personale (in locale)",
    "hero.title":
      "Gestisci bollette, conti e transazioni — in privato, sul desktop.",
    "hero.subtitle":
      "Importa CSV bancari, organizza fatture e allegati e crea report con dettaglio. IA opzionale in locale (Ollama) o via chiave API.",
    "hero.ctaPrimary": "Scarica l’ultima versione",
    "hero.ctaSecondary": "Vedi funzionalità",
    "hero.stat1.title": "Locale",
    "hero.stat1.desc": "Dati salvati sul tuo computer",
    "hero.stat2.title": "Veloce",
    "hero.stat2.desc": "Pensato per liste grandi",
    "hero.stat3.title": "Portatile",
    "hero.stat3.desc": "Backup + ripristino con allegati",
    "hero.ai.title": "Assistente IA",
    "hero.ai.tag": "Locale o API",
    "hero.ai.ex1.user":
      "“Riepiloga il mese scorso per categoria e segnala anomalie.”",
    "hero.ai.ex1.ai":
      "Riepilogo pronto. Variazioni: Bollette (+12%), Trasporti (‑8%).",
    "hero.ai.ex2.user": "“Prepara un report per anno fiscale da aprile.”",
    "hero.ai.ex2.ai":
      "Pronto. Seleziona un anno per esportare il riepilogo mensile.",
    "hero.ai.placeholder": "Scrivi un comando…",
    "hero.note": "Anteprima illustrata dei flussi principali.",
    "features.title": "Costruito per workflow reali",
    "features.subtitle": "Dati puliti, documenti ordinati, export pronti.",
    "features.card1.title": "Transazioni + categorie",
    "features.card1.desc":
      "Importa, filtra e ordina. Verifica ed esporta riepiloghi.",
    "features.card2.title": "Barra comandi IA (opzionale)",
    "features.card2.desc":
      "Riepiloghi, pattern e note pronte per il commercialista.",
    "features.card3.title": "Conti, bollette, entrate",
    "features.card3.desc":
      "Gestisci fonti e obblighi con un flusso desktop chiaro.",
    "features.card4.title": "Report con dettaglio",
    "features.card4.desc": "Clicca un mese per filtrare subito.",
    "features.card5.title": "Fatture + allegati",
    "features.card5.desc": "Conserva documenti insieme ai dati locali.",
    "features.card6.title": "Obiettivi + debiti",
    "features.card6.desc": "Traccia obiettivi e saldi per pianificare.",
    "features.card7.title": "Backup e ripristino",
    "features.card7.desc": "Esporta un bundle portatile con allegati.",
    "ai.title": "IA per velocizzare la contabilità",
    "ai.subtitle":
      "Cerca, riassumi e organizza con la Barra Comandi IA. Opzionale, anche in locale.",
    "ai.point1.title": "IA in locale",
    "ai.point1.desc": "In locale con Ollama o con chiave API.",
    "ai.point2.title": "Riepiloghi professionali",
    "ai.point2.desc": "Riepiloghi mensili, categorie e variazioni.",
    "ai.point3.title": "Export pronto",
    "ai.point3.desc": "Note chiare per chiusura o tasse.",
    "ai.ctaSecondary": "Vedi piani",
    "ai.ctaPrimary": "Prova",
    "ai.demo.title": "Barra Comandi IA",
    "ai.demo.prompt": "“Identifica abbonamenti e calcola il totale mensile.”",
    "ai.demo.line1": "Abbonamenti trovati",
    "ai.demo.line2": "Totale mensile",
    "ai.demo.line3": "Più costoso",
    "ai.demo.chip1": "“Spiega la variazione del cash flow”",
    "ai.demo.chip2": "“Riepilogo anno fiscale”",
    "ai.demo.chip3": "“Segnala spese anomale”",
    "ai.demo.note":
      "Standard include IA base. Pro aggiunge controlli avanzati per studi.",
    "pricing.title": "Piani",
    "pricing.subtitle": "Scegli il piano adatto al tuo workflow.",
    "pricing.toggle.annual": "Annuale",
    "pricing.toggle.save": "(1 mese gratis)",
    "pricing.toggle.monthly": "Mensile",
    "pricing.basic.name": "Basic",
    "pricing.basic.hint": "Essenziale per restare organizzati.",
    "pricing.basic.li1": "Gestione base bollette",
    "pricing.basic.li2": "Salva fatture + estratti conto",
    "pricing.basic.li3": "Esporta un pacchetto pulito per il commercialista",
    "pricing.basic.li4": "Archiviazione locale",
    "pricing.basic.cta": "Scegli Basic",
    "pricing.badge.popular": "Più scelto",
    "pricing.standard.name": "Standard",
    "pricing.standard.metaAnnual": "Risparmia 1 mese con annuale.",
    "pricing.standard.metaMonthly": "{price} / anno (1 mese gratis).",
    "pricing.standard.hint": "Più funzioni con IA base.",
    "pricing.standard.li1": "Tutto in Basic",
    "pricing.standard.li2": "Filtri + ordinamento avanzati",
    "pricing.standard.li3": "Obiettivi + debiti",
    "pricing.standard.li4": "Backup + ripristino",
    "pricing.standard.li5": "Report estesi",
    "pricing.standard.li6": "Assistente IA (base)",
    "pricing.standard.cta": "Scegli Standard",
    "pricing.pro.name": "Pro",
    "pricing.pro.metaAnnual": "Risparmia 1 mese con annuale.",
    "pricing.pro.metaMonthly": "{price} / anno (1 mese gratis).",
    "pricing.pro.hint": "Per studi e flussi fiscali avanzati.",
    "pricing.pro.li1": "Tutto in Standard",
    "pricing.pro.li2": "Workflow allegati",
    "pricing.pro.li3": "Categorie + riepiloghi assistiti",
    "pricing.pro.li4": "Pacchetti export per clienti",
    "pricing.pro.li5": "Supporto anno fiscale",
    "pricing.pro.li6": "Supporto prioritario",
    "pricing.pro.cta": "Scegli Pro",
    "pricing.lifetime.title": "Licenza a vita (Pro)",
    "pricing.lifetime.desc": "Per chi preferisce un acquisto unico.",
    "pricing.unit.mo": "/mo",
    "pricing.unit.yr": "/yr",
    "pricing.lifetime.unit": "una tantum",
    "pricing.note": "Prezzi indicativi, modificabili.",
    "roadmap.title": "Disponibilità e roadmap",
    "roadmap.subtitle": "Desktop prima. Mobile in programma.",
    "roadmap.desktop.title": "Desktop",
    "roadmap.desktop.status": "Rilasciato",
    "roadmap.desktop.leaf1": "macOS",
    "roadmap.desktop.leaf2": "Windows",
    "roadmap.desktop.note": "Link di download a breve.",
    "roadmap.mobile.title": "Mobile",
    "roadmap.mobile.status": "In roadmap",
    "roadmap.mobile.leaf1": "Android",
    "roadmap.mobile.leaf2": "iOS",
    "roadmap.next.title": "Prossimi passi",
    "roadmap.next.status": "Pianificato",
    "roadmap.next.leaf1": "Azioni contabili IA",
    "roadmap.next.leaf2": "Pacchetti export clienti (Pro)",
    "roadmap.next.leaf3": "Organizzazione documenti",
    "privacy.title": "Privacy by design",
    "privacy.subtitle":
      "I tuoi dati restano sul dispositivo. Controlli backup, export e condivisioni.",
    "privacy.li1": "Nessun upload automatico",
    "privacy.li2": "Allegati locali",
    "privacy.li3": "Backup portatili per migrazione o commercialista",
    "privacy.callout.title": "Funziona offline",
    "privacy.callout.desc": "Usalo senza sync o account.",
    "privacy.tag1": "JSON locale",
    "privacy.tag2": "Allegati",
    "privacy.tag3": "Bundle backup",
    "faq.title": "FAQ",
    "faq.subtitle": "Risposte rapide.",
    "faq.q1": "È una web app?",
    "faq.a1": "Kivana è un’app desktop. Questa pagina è il sito marketing.",
    "faq.q2": "Devo usare l’IA?",
    "faq.a2":
      "No. L’IA è opzionale. Puoi usarla in locale (Ollama) o senza IA.",
    "faq.q3": "Posso allegare immagini di fatture?",
    "faq.a3": "Sì. Le fatture possono essere salvate localmente come prove.",
    "faq.q4": "Posso esportare i dati?",
    "faq.a4":
      "Sì. Esporta un bundle e ripristinalo più tardi (allegati inclusi).",
    "download.title": "Pronto a provare Kivana?",
    "download.subtitle":
      "Aggiungi conti, importa transazioni e organizza documenti.",
    "download.ctaPrimary": "Scarica da GitHub Releases",
    "download.ctaSecondary": "Torna su",
    "download.note": "I download sono ospitati su GitHub Releases.",
    "footer.features": "Funzionalità",
    "footer.privacy": "Privacy",
    "footer.faq": "FAQ",
    "footer.copyrightPrefix": "©",
    "footer.rights": "Tutti i diritti riservati.",
    "privacy.open": "Leggi informativa privacy",
    "privacy.modalTitle": "Informativa privacy (UE)",
    "privacy.modalNote": "Testo informativo; non è consulenza legale.",
    "faq.open": "Apri FAQ",
    "faq.modalTitle": "FAQ",
    "faq.pill1": "Locale",
    "faq.pill2": "IA opzionale",
    "faq.pill3": "Pronto all’export",
    "modal.close": "Chiudi",
  },
  pt: {
    "lang.label": "Idioma",
    "nav.open": "Abrir menu",
    "nav.how": "Como funciona",
    "nav.features": "Recursos",
    "nav.ai": "Assistente de IA",
    "nav.pricing": "Preços",
    "nav.roadmap": "Roadmap",
    "nav.privacy": "Privacidade",
    "nav.faq": "FAQ",
    "nav.download": "Download",
    "hero.eyebrow": "App desktop de finanças pessoais (local)",
    "hero.title":
      "Acompanhe contas, contas bancárias e transações — em privado, no desktop.",
    "hero.subtitle":
      "Importe CSV do banco, organize faturas e anexos e gere relatórios com detalhamento. IA opcional pode rodar localmente (Ollama) ou via chave de API.",
    "hero.ctaPrimary": "Baixar a versão mais recente",
    "hero.ctaSecondary": "Ver recursos",
    "hero.stat1.title": "Local",
    "hero.stat1.desc": "Dados no seu computador",
    "hero.stat2.title": "Rápido",
    "hero.stat2.desc": "Feito para listas grandes",
    "hero.stat3.title": "Portátil",
    "hero.stat3.desc": "Backup + restauração com anexos",
    "hero.ai.title": "Assistente de IA",
    "hero.ai.tag": "Local ou API",
    "hero.ai.ex1.user":
      "“Resuma o mês passado por categoria e destaque anomalias.”",
    "hero.ai.ex1.ai":
      "Resumo pronto. Maiores mudanças: Contas (+12%), Transporte (‑8%).",
    "hero.ai.ex2.user":
      "“Prepare um relatório do ano fiscal a partir de abril.”",
    "hero.ai.ex2.ai": "Pronto. Selecione o ano para exportar um resumo mensal.",
    "hero.ai.placeholder": "Digite um comando…",
    "hero.note": "Ilustração dos principais fluxos.",
    "features.title": "Feito para contabilidade de verdade",
    "features.subtitle":
      "Registros limpos, documentos organizados, exportações prontas.",
    "features.card1.title": "Transações + categorias",
    "features.card1.desc":
      "Importe, filtre e ordene. Revise e exporte resumos.",
    "features.card2.title": "Barra de Comandos de IA (opcional)",
    "features.card2.desc": "Resumos, padrões e notas prontas para o contador.",
    "features.card3.title": "Contas, boletos, renda",
    "features.card3.desc": "Acompanhe fontes e obrigações com um fluxo claro.",
    "features.card4.title": "Relatórios detalhados",
    "features.card4.desc": "Clique no mês para filtrar instantaneamente.",
    "features.card5.title": "Faturas + anexos",
    "features.card5.desc": "Guarde documentos junto aos dados locais.",
    "features.card6.title": "Metas + dívidas",
    "features.card6.desc": "Acompanhe metas e saldos para planejar.",
    "features.card7.title": "Backup e restauração",
    "features.card7.desc": "Exporte um pacote portátil com anexos.",
    "ai.title": "IA para acelerar a escrituração",
    "ai.subtitle":
      "Pesquise, resuma e organize com a Barra de Comandos de IA. Opcional e pode rodar localmente.",
    "ai.point1.title": "IA local",
    "ai.point1.desc": "Rode localmente com Ollama ou use chave de API.",
    "ai.point2.title": "Resumos profissionais",
    "ai.point2.desc": "Resumos mensais, categorias e variações.",
    "ai.point3.title": "Export pronto",
    "ai.point3.desc": "Notas claras para fechamento e impostos.",
    "ai.ctaSecondary": "Ver planos",
    "ai.ctaPrimary": "Testar",
    "ai.demo.title": "Barra de Comandos de IA",
    "ai.demo.prompt": "“Identifique assinaturas e some o total mensal.”",
    "ai.demo.line1": "Assinaturas encontradas",
    "ai.demo.line2": "Total mensal",
    "ai.demo.line3": "Mais caro",
    "ai.demo.chip1": "“Explicar variação do cash flow”",
    "ai.demo.chip2": "“Resumo do ano fiscal”",
    "ai.demo.chip3": "“Sinalizar gastos incomuns”",
    "ai.demo.note":
      "Standard inclui IA básica. Pro adiciona controles avançados para contadores.",
    "pricing.title": "Planos",
    "pricing.subtitle": "Escolha o plano que combina com seu fluxo.",
    "pricing.toggle.annual": "Anual",
    "pricing.toggle.save": "(1 mês grátis)",
    "pricing.toggle.monthly": "Mensal",
    "pricing.basic.name": "Basic",
    "pricing.basic.hint": "O essencial para organizar.",
    "pricing.basic.li1": "Gestão básica de contas",
    "pricing.basic.li2": "Guardar faturas + extratos",
    "pricing.basic.li3": "Exportar pacote para o contador",
    "pricing.basic.li4": "Armazenamento local",
    "pricing.basic.cta": "Escolher Basic",
    "pricing.badge.popular": "Mais popular",
    "pricing.standard.name": "Standard",
    "pricing.standard.metaAnnual": "Economize 1 mês no anual.",
    "pricing.standard.metaMonthly": "{price} / ano (1 mês grátis).",
    "pricing.standard.hint": "Mais recursos com IA básica.",
    "pricing.standard.li1": "Tudo do Basic",
    "pricing.standard.li2": "Filtros + ordenação avançados",
    "pricing.standard.li3": "Metas + dívidas",
    "pricing.standard.li4": "Backup + restauração",
    "pricing.standard.li5": "Relatórios ampliados",
    "pricing.standard.li6": "Assistente de IA (básico)",
    "pricing.standard.cta": "Escolher Standard",
    "pricing.pro.name": "Pro",
    "pricing.pro.metaAnnual": "Economize 1 mês no anual.",
    "pricing.pro.metaMonthly": "{price} / ano (1 mês grátis).",
    "pricing.pro.hint": "Para contadores e fluxos fiscais avançados.",
    "pricing.pro.li1": "Tudo do Standard",
    "pricing.pro.li2": "Fluxo de anexos",
    "pricing.pro.li3": "Categorização + resumos assistidos",
    "pricing.pro.li4": "Pacotes de exportação para clientes",
    "pricing.pro.li5": "Suporte a ano fiscal",
    "pricing.pro.li6": "Suporte prioritário",
    "pricing.pro.cta": "Escolher Pro",
    "pricing.lifetime.title": "Licença vitalícia (Pro)",
    "pricing.lifetime.desc": "Para empresas que preferem compra única.",
    "pricing.unit.mo": "/mo",
    "pricing.unit.yr": "/yr",
    "pricing.lifetime.unit": "pagamento único",
    "pricing.note": "Preços são indicativos e podem mudar.",
    "roadmap.title": "Disponibilidade e roadmap",
    "roadmap.subtitle": "Desktop primeiro. Mobile planejado.",
    "roadmap.desktop.title": "Desktop",
    "roadmap.desktop.status": "Lançado",
    "roadmap.desktop.leaf1": "macOS",
    "roadmap.desktop.leaf2": "Windows",
    "roadmap.desktop.note": "Links de download em breve.",
    "roadmap.mobile.title": "Mobile",
    "roadmap.mobile.status": "No roadmap",
    "roadmap.mobile.leaf1": "Android",
    "roadmap.mobile.leaf2": "iOS",
    "roadmap.next.title": "Próximo",
    "roadmap.next.status": "Planejado",
    "roadmap.next.leaf1": "Ações contábeis de IA",
    "roadmap.next.leaf2": "Pacotes para clientes (Pro)",
    "roadmap.next.leaf3": "Organização de documentos",
    "privacy.title": "Privacidade por design",
    "privacy.subtitle":
      "Seus dados ficam localmente. Você controla backups, exportações e compartilhamento.",
    "privacy.li1": "Sem upload automático",
    "privacy.li2": "Anexos locais",
    "privacy.li3": "Backups portáteis para migração ou contador",
    "privacy.callout.title": "Funciona offline",
    "privacy.callout.desc": "Use sem sync ou contas.",
    "privacy.tag1": "JSON local",
    "privacy.tag2": "Anexos",
    "privacy.tag3": "Pacote de backup",
    "faq.title": "FAQ",
    "faq.subtitle": "Respostas rápidas.",
    "faq.q1": "É um app web?",
    "faq.a1": "Kivana é um app desktop. Esta página é o site marketing.",
    "faq.q2": "Preciso usar IA?",
    "faq.a2": "Não. IA é opcional. Pode rodar localmente (Ollama) ou sem IA.",
    "faq.q3": "Posso anexar imagens de faturas?",
    "faq.a3":
      "Sim. As faturas podem ser armazenadas localmente como comprovantes.",
    "faq.q4": "Posso exportar meus dados?",
    "faq.a4": "Sim. Exporte um pacote e restaure depois (anexos inclusos).",
    "download.title": "Pronto para testar o Kivana?",
    "download.subtitle":
      "Adicione contas, importe transações e organize documentos.",
    "download.ctaPrimary": "Baixar via GitHub Releases",
    "download.ctaSecondary": "Voltar ao topo",
    "download.note": "Os downloads ficam hospedados no GitHub Releases.",
    "footer.features": "Recursos",
    "footer.privacy": "Privacidade",
    "footer.faq": "FAQ",
    "footer.copyrightPrefix": "©",
    "footer.rights": "Todos os direitos reservados.",
    "privacy.open": "Ler política de privacidade",
    "privacy.modalTitle": "Política de privacidade (UE)",
    "privacy.modalNote": "Texto informativo; não é aconselhamento jurídico.",
    "faq.open": "Abrir FAQ",
    "faq.modalTitle": "FAQ",
    "faq.pill1": "Local",
    "faq.pill2": "IA opcional",
    "faq.pill3": "Pronto para exportar",
    "modal.close": "Fechar",
  },
  nl: {
    "lang.label": "Taal",
    "nav.open": "Menu openen",
    "nav.how": "Hoe het werkt",
    "nav.features": "Functies",
    "nav.ai": "AI‑assistent",
    "nav.pricing": "Prijzen",
    "nav.roadmap": "Roadmap",
    "nav.privacy": "Privacy",
    "nav.faq": "FAQ",
    "nav.download": "Download",
    "hero.eyebrow": "Lokale desktop-app voor persoonlijke financiën",
    "hero.title":
      "Beheer rekeningen, accounts en transacties — privé, op je desktop.",
    "hero.subtitle":
      "Importeer bank-CSV, organiseer facturen en bijlagen en maak rapporten met drill-down. Optionele AI kan lokaal (Ollama) of via een API-sleutel draaien.",
    "hero.ctaPrimary": "Download nieuwste versie",
    "hero.ctaSecondary": "Bekijk functies",
    "hero.stat1.title": "Lokaal",
    "hero.stat1.desc": "Data op je computer",
    "hero.stat2.title": "Snel",
    "hero.stat2.desc": "Voor grote lijsten gebouwd",
    "hero.stat3.title": "Draagbaar",
    "hero.stat3.desc": "Back-up + herstel met bijlagen",
    "hero.ai.title": "AI‑assistent",
    "hero.ai.tag": "Lokaal of API",
    "hero.ai.ex1.user":
      "“Vat vorige maand per categorie samen en markeer afwijkingen.”",
    "hero.ai.ex1.ai":
      "Samenvatting klaar. Grootste wijzigingen: Kosten (+12%), Transport (‑8%).",
    "hero.ai.ex2.user": "“Maak een belastingjaar‑rapport vanaf april.”",
    "hero.ai.ex2.ai":
      "Klaar. Kies een jaar om een maand‑overzicht te exporteren.",
    "hero.ai.placeholder": "Typ een opdracht…",
    "hero.note": "Illustratie van de belangrijkste workflows.",
    "features.title": "Voor echte boekhoud‑workflows",
    "features.subtitle": "Schone data, geordende documenten en export‑klaar.",
    "features.card1.title": "Transacties + categorieën",
    "features.card1.desc":
      "Importeer, filter en sorteer. Controleer en exporteer samenvattingen.",
    "features.card2.title": "AI‑Command Bar (optioneel)",
    "features.card2.desc":
      "Samenvattingen, patronen en accountant‑klare notities.",
    "features.card3.title": "Rekeningen, vaste lasten, inkomsten",
    "features.card3.desc":
      "Volg bronnen en verplichtingen met een duidelijke desktop‑workflow.",
    "features.card4.title": "Rapporten met drill‑down",
    "features.card4.desc": "Klik op een maand om direct te filteren.",
    "features.card5.title": "Facturen + bijlagen",
    "features.card5.desc": "Bewaar documenten samen met je lokale data.",
    "features.card6.title": "Doelen + schulden",
    "features.card6.desc": "Volg doelen en saldi om vooruit te plannen.",
    "features.card7.title": "Back-up & herstel",
    "features.card7.desc":
      "Exporteer een draagbare back-up inclusief bijlagen.",
    "ai.title": "AI voor snellere boekhouding",
    "ai.subtitle":
      "Zoek, vat samen en organiseer met de AI Command Bar. Optioneel, ook lokaal.",
    "ai.point1.title": "Lokale AI",
    "ai.point1.desc": "Lokaal met Ollama of via een API‑sleutel.",
    "ai.point2.title": "Professionele samenvattingen",
    "ai.point2.desc": "Maand‑overzichten, categorieën en afwijkingen.",
    "ai.point3.title": "Export‑klaar",
    "ai.point3.desc": "Heldere notities voor jaarafsluiting of belasting.",
    "ai.ctaSecondary": "Bekijk plannen",
    "ai.ctaPrimary": "Probeer",
    "ai.demo.title": "AI Command Bar",
    "ai.demo.prompt": "“Herken abonnementen en bereken het maandtotaal.”",
    "ai.demo.line1": "Abonnementen gevonden",
    "ai.demo.line2": "Maandtotaal",
    "ai.demo.line3": "Duurste",
    "ai.demo.chip1": "“Cashflow‑verschil verklaren”",
    "ai.demo.chip2": "“Belastingjaar‑samenvatting”",
    "ai.demo.chip3": "“Ongewone uitgaven markeren”",
    "ai.demo.note":
      "Standard bevat basis‑AI. Pro biedt geavanceerde accountant‑workflows.",
    "pricing.title": "Plannen",
    "pricing.subtitle": "Kies een plan dat bij je workflow past.",
    "pricing.toggle.annual": "Jaarlijks",
    "pricing.toggle.save": "(1 maand gratis)",
    "pricing.toggle.monthly": "Maandelijks",
    "pricing.basic.name": "Basic",
    "pricing.basic.hint": "Basis om georganiseerd te blijven.",
    "pricing.basic.li1": "Basis factuurbeheer",
    "pricing.basic.li2": "Facturen + bankafschriften opslaan",
    "pricing.basic.li3": "Net export‑pakket voor je accountant",
    "pricing.basic.li4": "Lokale opslag",
    "pricing.basic.cta": "Kies Basic",
    "pricing.badge.popular": "Meest gekozen",
    "pricing.standard.name": "Standard",
    "pricing.standard.metaAnnual": "Bespaar 1 maand met jaarlijks.",
    "pricing.standard.metaMonthly": "{price} / jaar (1 maand gratis).",
    "pricing.standard.hint": "Meer functies met basis‑AI.",
    "pricing.standard.li1": "Alles uit Basic",
    "pricing.standard.li2": "Geavanceerde filters + sorteren",
    "pricing.standard.li3": "Doelen + schulden",
    "pricing.standard.li4": "Back-up + herstel",
    "pricing.standard.li5": "Uitgebreide rapporten",
    "pricing.standard.li6": "AI‑assistent (basis)",
    "pricing.standard.cta": "Kies Standard",
    "pricing.pro.name": "Pro",
    "pricing.pro.metaAnnual": "Bespaar 1 maand met jaarlijks.",
    "pricing.pro.metaMonthly": "{price} / jaar (1 maand gratis).",
    "pricing.pro.hint": "Voor accountants en geavanceerde fiscale workflows.",
    "pricing.pro.li1": "Alles uit Standard",
    "pricing.pro.li2": "Bijlagen‑workflow",
    "pricing.pro.li3": "AI‑categorisatie + samenvattingen",
    "pricing.pro.li4": "Klant‑exportpakketten + reporting",
    "pricing.pro.li5": "Ondersteuning voor belastingjaar",
    "pricing.pro.li6": "Prioritaire support",
    "pricing.pro.cta": "Kies Pro",
    "pricing.lifetime.title": "Levenslange licentie (Pro)",
    "pricing.lifetime.desc": "Voor bedrijven die liever éénmalig kopen.",
    "pricing.unit.mo": "/mo",
    "pricing.unit.yr": "/yr",
    "pricing.lifetime.unit": "eenmalig",
    "pricing.note": "Prijzen zijn placeholders.",
    "roadmap.title": "Beschikbaarheid & roadmap",
    "roadmap.subtitle": "Eerst desktop, mobiel gepland.",
    "roadmap.desktop.title": "Desktop",
    "roadmap.desktop.status": "Uitgebracht",
    "roadmap.desktop.leaf1": "macOS",
    "roadmap.desktop.leaf2": "Windows",
    "roadmap.desktop.note": "Downloadlinks volgen.",
    "roadmap.mobile.title": "Mobiel",
    "roadmap.mobile.status": "Op de roadmap",
    "roadmap.mobile.leaf1": "Android",
    "roadmap.mobile.leaf2": "iOS",
    "roadmap.next.title": "Volgende",
    "roadmap.next.status": "Gepland",
    "roadmap.next.leaf1": "AI‑boekhoudacties",
    "roadmap.next.leaf2": "Klant‑exportpakketten (Pro)",
    "roadmap.next.leaf3": "Documentorganisatie",
    "privacy.title": "Privacy by design",
    "privacy.subtitle":
      "Je data staat lokaal. Jij bepaalt back-ups, exports en delen.",
    "privacy.li1": "Geen automatische upload",
    "privacy.li2": "Lokale bijlagen",
    "privacy.li3": "Draagbare back-ups voor accountant of migratie",
    "privacy.callout.title": "Werkt offline",
    "privacy.callout.desc": "Gebruik zonder sync of accounts.",
    "privacy.tag1": "Lokale JSON",
    "privacy.tag2": "Bijlagen",
    "privacy.tag3": "Back-up bundle",
    "faq.title": "FAQ",
    "faq.subtitle": "Snelle antwoorden.",
    "faq.q1": "Is dit een webapp?",
    "faq.a1": "Kivana is een desktopapp. Dit is de marketingwebsite.",
    "faq.q2": "Moet ik AI gebruiken?",
    "faq.a2": "Nee. AI is optioneel. Lokaal (Ollama) of geen AI.",
    "faq.q3": "Kan ik factuurafbeeldingen toevoegen?",
    "faq.a3": "Ja. Facturen kunnen lokaal worden opgeslagen als bewijs.",
    "faq.q4": "Kan ik mijn data exporteren?",
    "faq.a4": "Ja. Exporteer een back-up en herstel later (incl. bijlagen).",
    "download.title": "Klaar om Kivana te proberen?",
    "download.subtitle":
      "Voeg rekeningen toe, importeer transacties en organiseer documenten.",
    "download.ctaPrimary": "Download via GitHub Releases",
    "download.ctaSecondary": "Naar boven",
    "download.note": "Downloads worden gehost op GitHub Releases.",
    "footer.features": "Functies",
    "footer.privacy": "Privacy",
    "footer.faq": "FAQ",
    "footer.copyrightPrefix": "©",
    "footer.rights": "Alle rechten voorbehouden.",
    "privacy.open": "Privacybeleid lezen",
    "privacy.modalTitle": "Privacybeleid (EU)",
    "privacy.modalNote": "Dit is ter informatie en geen juridisch advies.",
    "faq.open": "FAQ openen",
    "faq.modalTitle": "FAQ",
    "faq.pill1": "Lokaal",
    "faq.pill2": "AI optioneel",
    "faq.pill3": "Export‑klaar",
    "modal.close": "Sluiten",
  },
  pl: {
    "lang.label": "Język",
    "nav.open": "Otwórz menu",
    "nav.how": "Jak to działa",
    "nav.features": "Funkcje",
    "nav.ai": "Asystent AI",
    "nav.pricing": "Cennik",
    "nav.roadmap": "Mapa drogowa",
    "nav.privacy": "Prywatność",
    "nav.faq": "FAQ",
    "nav.download": "Pobierz",
    "hero.eyebrow": "Lokalna aplikacja desktop do finansów osobistych",
    "hero.title":
      "Śledź rachunki, konta i transakcje — prywatnie, na komputerze.",
    "hero.subtitle":
      "Importuj bankowe CSV, organizuj faktury i załączniki oraz twórz raporty z możliwością podglądu szczegółów. Opcjonalne AI może działać lokalnie (Ollama) lub przez klucz API.",
    "hero.ctaPrimary": "Pobierz najnowszą wersję",
    "hero.ctaSecondary": "Zobacz funkcje",
    "hero.stat1.title": "Lokalnie",
    "hero.stat1.desc": "Dane na Twoim komputerze",
    "hero.stat2.title": "Szybko",
    "hero.stat2.desc": "Dla dużych list transakcji",
    "hero.stat3.title": "Przenośnie",
    "hero.stat3.desc": "Backup + przywracanie z załącznikami",
    "hero.ai.title": "Asystent AI",
    "hero.ai.tag": "Lokalnie lub API",
    "hero.ai.ex1.user":
      "„Podsumuj poprzedni miesiąc wg kategorii i zaznacz anomalie.”",
    "hero.ai.ex1.ai":
      "Podsumowanie gotowe. Największe zmiany: Rachunki (+12%), Transport (‑8%).",
    "hero.ai.ex2.user": "„Przygotuj raport roku podatkowego od kwietnia.”",
    "hero.ai.ex2.ai":
      "Gotowe. Wybierz rok, aby wyeksportować podsumowanie miesięczne.",
    "hero.ai.placeholder": "Wpisz polecenie…",
    "hero.note": "Ilustracja kluczowych funkcji.",
    "features.title": "Dla realnych procesów księgowych",
    "features.subtitle":
      "Czyste dane, uporządkowane dokumenty i gotowe eksporty.",
    "features.card1.title": "Transakcje + kategorie",
    "features.card1.desc":
      "Importuj, filtruj i sortuj. Weryfikuj i eksportuj podsumowania.",
    "features.card2.title": "Pasek poleceń AI (opcjonalny)",
    "features.card2.desc":
      "Podsumowania, wzorce i notatki gotowe dla księgowego.",
    "features.card3.title": "Konta, rachunki, dochody",
    "features.card3.desc":
      "Kontroluj źródła i zobowiązania w przejrzystym workflow.",
    "features.card4.title": "Raporty z drill‑down",
    "features.card4.desc": "Kliknij miesiąc, aby natychmiast filtrować.",
    "features.card5.title": "Faktury + załączniki",
    "features.card5.desc": "Przechowuj dokumenty razem z lokalnymi danymi.",
    "features.card6.title": "Cele + długi",
    "features.card6.desc": "Śledź cele i salda, aby planować.",
    "features.card7.title": "Backup i przywracanie",
    "features.card7.desc": "Eksportuj przenośny pakiet z załącznikami.",
    "ai.title": "AI dla szybszej księgowości",
    "ai.subtitle":
      "Szukaj, podsumowuj i porządkuj przez pasek AI. Opcjonalnie, również lokalnie.",
    "ai.point1.title": "AI lokalnie",
    "ai.point1.desc": "Uruchom lokalnie przez Ollama lub użyj klucza API.",
    "ai.point2.title": "Profesjonalne podsumowania",
    "ai.point2.desc": "Podsumowania miesięczne, kategorie i różnice.",
    "ai.point3.title": "Eksport dla księgowego",
    "ai.point3.desc": "Jasne notatki na koniec roku lub podatki.",
    "ai.ctaSecondary": "Zobacz plany",
    "ai.ctaPrimary": "Wypróbuj",
    "ai.demo.title": "Pasek poleceń AI",
    "ai.demo.prompt": "„Wykryj subskrypcje i policz miesięczną sumę.”",
    "ai.demo.line1": "Subskrypcje znalezione",
    "ai.demo.line2": "Suma miesięczna",
    "ai.demo.line3": "Najdroższa",
    "ai.demo.chip1": "„Wyjaśnij odchylenie cash flow”",
    "ai.demo.chip2": "„Podsumowanie roku podatkowego”",
    "ai.demo.chip3": "„Wykryj nietypowe wydatki”",
    "ai.demo.note":
      "Standard ma podstawowe AI. Pro dodaje zaawansowane funkcje dla księgowych.",
    "pricing.title": "Plany",
    "pricing.subtitle": "Wybierz plan dopasowany do workflow.",
    "pricing.toggle.annual": "Rocznie",
    "pricing.toggle.save": "(1 miesiąc gratis)",
    "pricing.toggle.monthly": "Miesięcznie",
    "pricing.basic.name": "Basic",
    "pricing.basic.hint": "Podstawy, żeby mieć porządek.",
    "pricing.basic.li1": "Podstawowa obsługa rachunków",
    "pricing.basic.li2": "Faktury + wyciągi bankowe",
    "pricing.basic.li3": "Eksport pakietu dla księgowego",
    "pricing.basic.li4": "Dane lokalnie",
    "pricing.basic.cta": "Wybierz Basic",
    "pricing.badge.popular": "Najpopularniejszy",
    "pricing.standard.name": "Standard",
    "pricing.standard.metaAnnual":
      "Oszczędzasz 1 miesiąc przy płatności rocznej.",
    "pricing.standard.metaMonthly": "{price} / rok (1 miesiąc gratis).",
    "pricing.standard.hint": "Więcej funkcji + podstawowe AI.",
    "pricing.standard.li1": "Wszystko z Basic",
    "pricing.standard.li2": "Zaawansowane filtry + sortowanie",
    "pricing.standard.li3": "Cele + długi",
    "pricing.standard.li4": "Backup + przywracanie",
    "pricing.standard.li5": "Rozszerzone raporty",
    "pricing.standard.li6": "Asystent AI (podstawowy)",
    "pricing.standard.cta": "Wybierz Standard",
    "pricing.pro.name": "Pro",
    "pricing.pro.metaAnnual": "Oszczędzasz 1 miesiąc przy płatności rocznej.",
    "pricing.pro.metaMonthly": "{price} / rok (1 miesiąc gratis).",
    "pricing.pro.hint": "Dla księgowych i zaawansowanych procesów podatkowych.",
    "pricing.pro.li1": "Wszystko z Standard",
    "pricing.pro.li2": "Workflow załączników",
    "pricing.pro.li3": "Kategoryzacja + podsumowania z AI",
    "pricing.pro.li4": "Pakiety eksportowe dla klientów",
    "pricing.pro.li5": "Wsparcie roku podatkowego",
    "pricing.pro.li6": "Priorytetowe wsparcie",
    "pricing.pro.cta": "Wybierz Pro",
    "pricing.lifetime.title": "Licencja dożywotnia (Pro)",
    "pricing.lifetime.desc": "Dla firm preferujących jednorazowy zakup.",
    "pricing.unit.mo": "/mo",
    "pricing.unit.yr": "/yr",
    "pricing.lifetime.unit": "jednorazowo",
    "pricing.note": "Ceny przykładowe.",
    "roadmap.title": "Dostępność i mapa drogowa",
    "roadmap.subtitle": "Najpierw desktop, potem mobile.",
    "roadmap.desktop.title": "Desktop",
    "roadmap.desktop.status": "Wydane",
    "roadmap.desktop.leaf1": "macOS",
    "roadmap.desktop.leaf2": "Windows",
    "roadmap.desktop.note": "Linki do pobrania wkrótce.",
    "roadmap.mobile.title": "Mobile",
    "roadmap.mobile.status": "W planach",
    "roadmap.mobile.leaf1": "Android",
    "roadmap.mobile.leaf2": "iOS",
    "roadmap.next.title": "Dalej",
    "roadmap.next.status": "Planowane",
    "roadmap.next.leaf1": "Akcje księgowe AI",
    "roadmap.next.leaf2": "Pakiety eksportowe (Pro)",
    "roadmap.next.leaf3": "Organizacja dokumentów",
    "privacy.title": "Prywatność z założenia",
    "privacy.subtitle":
      "Dane są lokalnie. Ty kontrolujesz kopie, eksporty i udostępnianie.",
    "privacy.li1": "Brak automatycznego wysyłania",
    "privacy.li2": "Lokalne załączniki",
    "privacy.li3": "Przenośne backupy dla księgowego lub migracji",
    "privacy.callout.title": "Działa offline",
    "privacy.callout.desc": "Bez synchronizacji i kont.",
    "privacy.tag1": "Lokalny JSON",
    "privacy.tag2": "Załączniki",
    "privacy.tag3": "Pakiet backup",
    "faq.title": "FAQ",
    "faq.subtitle": "Szybkie odpowiedzi.",
    "faq.q1": "Czy to aplikacja webowa?",
    "faq.a1": "Kivana to aplikacja desktop. Ta strona to marketing.",
    "faq.q2": "Czy muszę używać AI?",
    "faq.a2":
      "Nie. AI jest opcjonalne (lokalnie Ollama) lub można je wyłączyć.",
    "faq.q3": "Czy mogę dodać zdjęcia faktur?",
    "faq.a3": "Tak. Faktury można przechowywać lokalnie jako dowód.",
    "faq.q4": "Czy mogę eksportować dane?",
    "faq.a4":
      "Tak. Eksportuj pakiet backup i przywróć później (z załącznikami).",
    "download.title": "Chcesz wypróbować Kivana?",
    "download.subtitle":
      "Dodaj konta, importuj transakcje i porządkuj dokumenty.",
    "download.ctaPrimary": "Pobierz z GitHub Releases",
    "download.ctaSecondary": "Do góry",
    "download.note": "Pliki do pobrania są hostowane na GitHub Releases.",
    "footer.features": "Funkcje",
    "footer.privacy": "Prywatność",
    "footer.faq": "FAQ",
    "footer.copyrightPrefix": "©",
    "footer.rights": "Wszelkie prawa zastrzeżone.",
    "privacy.open": "Polityka prywatności",
    "privacy.modalTitle": "Polityka prywatności (UE)",
    "privacy.modalNote": "Tekst informacyjny; nie stanowi porady prawnej.",
    "faq.open": "Otwórz FAQ",
    "faq.modalTitle": "FAQ",
    "faq.pill1": "Lokalnie",
    "faq.pill2": "AI opcjonalne",
    "faq.pill3": "Gotowe do eksportu",
    "modal.close": "Zamknij",
  },
  nb: {
    "lang.label": "Språk",
    "nav.open": "Åpne meny",
    "nav.how": "Slik fungerer det",
    "nav.features": "Funksjoner",
    "nav.ai": "AI-assistent",
    "nav.pricing": "Priser",
    "nav.accountants": "Regnskapsfører",
    "nav.roadmap": "Veikart",
    "nav.privacy": "Personvern",
    "nav.faq": "FAQ",
    "nav.download": "Last ned",
    "hero.eyebrow": "Lokal skrivebordsapp for privatøkonomi",
    "hero.title":
      "Følg regninger, kontoer og transaksjoner — privat, på skrivebordet.",
    "hero.subtitle":
      "Importer bank‑CSV, organiser fakturaer og vedlegg, og lag rapporter du kan bore ned i. Valgfri AI kan kjøre lokalt (Ollama) eller via en API‑nøkkel.",
    "hero.ctaPrimary": "Last ned siste versjon",
    "hero.ctaSecondary": "Se funksjoner",
    "hero.stat1.title": "Lokal‑først",
    "hero.stat1.desc": "Data lagres på din maskin",
    "hero.stat2.title": "Rask",
    "hero.stat2.desc": "Bygget for store transaksjonslister",
    "hero.stat3.title": "Portabel",
    "hero.stat3.desc": "Sikkerhetskopi + gjenoppretting med vedlegg",
    "hero.ai.title": "AI-assistent",
    "hero.ai.tag": "Lokalt eller API",
    "hero.ai.ex1.user":
      "“Oppsummer forrige måned per kategori og marker avvik.”",
    "hero.ai.ex1.ai":
      "Oppsummering klar. Største endringer: Regninger (+12 %), Transport (‑8 %).",
    "hero.ai.ex2.user": "“Lag en skatteårsrapport som starter i april.”",
    "hero.ai.ex2.ai":
      "Klar. Velg et år for å eksportere en måned‑for‑måned‑oversikt.",
    "hero.ai.placeholder": "Skriv en kommando…",
    "hero.note": "Illustrasjon av nøkkelarbeidsflyter.",
    "how.title": "Slik fungerer det",
    "how.subtitle": "Installer, importer og få tydelige rapporter på minutter.",
    "how.step1.title": "Last ned og installer",
    "how.step1.desc": "macOS (.dmg) og Windows (.msi). Ingen konto kreves.",
    "how.step2.title": "Importer bank‑CSV",
    "how.step2.desc": "Sorter og filtrer transaksjoner, og sjekk kategorier.",
    "how.step3.title": "Rapporter og eksporter",
    "how.step3.desc":
      "Bore ned i en måned og eksporter oppsummeringer til skatt eller regnskapsfører.",
    "why.li1.title": "Lokal‑først",
    "why.li1.desc": "Dataene dine blir på enheten som standard.",
    "why.li2.title": "Klar for regnskapsfører",
    "why.li2.desc": "Eksport, vedlegg og skatteårsrapportering.",
    "why.li3.title": "Valgfri AI",
    "why.li3.desc": "Bruk lokal AI med Ollama eller legg til API‑nøkkel.",
    "features.title": "Bygget for ekte regnskapsarbeid",
    "features.subtitle":
      "Hold postene ryddige, dokumentene organiserte og eksportene klare.",
    "example.title": "Eksempelresultat",
    "example.subtitle": "En typisk måned etter CSV‑import.",
    "example.tag": "Illustrasjon",
    "example.kpi1.label": "Netto cash flow",
    "example.kpi2.label": "Inntekt",
    "example.kpi3.label": "Utgifter",
    "example.kpi4.label": "Regninger",
    "example.box1.title": "Toppkategorier",
    "example.cat1": "Regninger",
    "example.cat2": "Mat",
    "example.cat3": "Transport",
    "example.box2.title": "Drill‑down",
    "example.box2.desc":
      "Klikk på en måned for å filtrere fordeling og detaljliste med én gang.",
    "example.box2.hint": "Måned → kategorier → poster",
    "example.note": "Eksempeldato for illustrasjon.",
    "features.card1.title": "Transaksjoner + kategorier",
    "features.card1.desc":
      "Importer, filtrer og sorter. Kontroller utvalg og eksporter oppsummeringer ved behov.",
    "features.card2.title": "AI Command Bar (valgfritt)",
    "features.card2.desc":
      "Be om oppsummeringer, finn mønstre og lag notater klare for regnskapsfører.",
    "features.card3.title": "Kontoer, regninger, inntekt",
    "features.card3.desc":
      "Følg pengestrømmer og forpliktelser i en ren skrivebordsflyt.",
    "features.card4.title": "Rapporter med drill‑down",
    "features.card4.desc":
      "Klikk på en måned for å filtrere oversikter og detaljlister umiddelbart.",
    "features.card5.title": "Fakturaer + vedlegg",
    "features.card5.desc":
      "Lagre fakturaer og dokumentasjon sammen med lokale data.",
    "features.card6.title": "Mål + gjeld",
    "features.card6.desc":
      "Følg mål og saldoer for å planlegge med trygghet.",
    "features.card7.title": "Sikkerhetskopi og gjenoppretting",
    "features.card7.desc":
      "Eksporter en portabel sikkerhetskopipakke, inkludert vedlegg.",
    "ai.title": "AI-hjelp for raskere bokføring",
    "ai.subtitle":
      "Bruk AI Command Bar for å søke, oppsummere og organisere. Valgfritt, og kan kjøres med lokal AI.",
    "ai.point1.title": "Lokal AI",
    "ai.point1.desc":
      "Kjør lokalt med Ollama, eller bruk en ekstern API-nøkkel om du vil.",
    "ai.point2.title": "Profesjonelle oppsummeringer",
    "ai.point2.desc":
      "Lag månedlige oppsummeringer, kategorifordelinger og forklaringer på avvik.",
    "ai.point3.title": "Eksportklart for regnskapsfører",
    "ai.point3.desc":
      "Lag tydelige notater og oppsummeringer til årsoppgjør eller skatt.",
    "ai.ctaSecondary": "Se planer",
    "ai.ctaPrimary": "Prøv det",
    "ai.demo.title": "AI Command Bar",
    "ai.demo.prompt": "“Identifiser abonnementer og beregn månedssum.”",
    "ai.demo.line1": "Abonnementer funnet",
    "ai.demo.line2": "Månedssum",
    "ai.demo.line3": "Dyreste",
    "ai.demo.chip1": "“Forklar cash flow‑avvik”",
    "ai.demo.chip2": "“Lag skatteårsoppsummering”",
    "ai.demo.chip3": "“Marker uvanlige utgifter”",
    "ai.demo.note":
      "Standard inkluderer grunnleggende AI. Pro legger til avanserte kontroller for regnskapsflyter.",
    "pricing.title": "Planer",
    "pricing.subtitle":
      "Velg en plan som passer arbeidsflyten din — fra personlig til profesjonell.",
    "pricing.toggle.annual": "Årlig",
    "pricing.toggle.save": "(1 måned gratis)",
    "pricing.toggle.monthly": "Månedlig",
    "pricing.basic.name": "Basic",
    "pricing.basic.hint": "Grunnleggende verktøy for å holde orden.",
    "pricing.basic.li1": "Enkel regningshåndtering",
    "pricing.basic.li2": "Lagre fakturaer + kontoutskrifter",
    "pricing.basic.li3": "Eksporter en ryddig pakke til regnskapsfører",
    "pricing.basic.li4": "Lokal lagring",
    "pricing.basic.cta": "Velg Basic",
    "pricing.badge.popular": "Mest populær",
    "pricing.standard.name": "Standard",
    "pricing.standard.metaAnnual": "Spar 1 måned med årlig betaling.",
    "pricing.standard.metaMonthly": "{price} / år (1 måned gratis).",
    "pricing.standard.hint": "Flere funksjoner med grunnleggende AI-støtte.",
    "pricing.standard.li1": "Alt i Basic",
    "pricing.standard.li2": "Avanserte filtre + sortering",
    "pricing.standard.li3": "Mål + gjeld",
    "pricing.standard.li4": "Sikkerhetskopi + gjenoppretting",
    "pricing.standard.li5": "Utvidede rapportverktøy",
    "pricing.standard.li6": "AI-assistent (grunnleggende)",
    "pricing.standard.cta": "Velg Standard",
    "pricing.pro.name": "Pro",
    "pricing.pro.metaAnnual": "Spar 1 måned med årlig betaling.",
    "pricing.pro.metaMonthly": "{price} / år (1 måned gratis).",
    "pricing.pro.hint": "For regnskapsførere og avanserte skatteflyter.",
    "pricing.pro.li1": "Alt i Standard",
    "pricing.pro.li2": "Arbeidsflyt for fakturavedlegg",
    "pricing.pro.li3": "AI‑assistert kategorisering + oppsummeringer",
    "pricing.pro.li4": "Klientklare eksportpakker og rapportering",
    "pricing.pro.li5": "Støtte for skatteår",
    "pricing.pro.li6": "Prioritert support",
    "pricing.pro.cta": "Velg Pro",
    "pricing.lifetime.title": "Livstidslisens (Pro)",
    "pricing.lifetime.desc": "For firmaer som foretrekker engangskjøp.",
    "pricing.unit.mo": "/mnd",
    "pricing.unit.yr": "/år",
    "pricing.lifetime.unit": "engangskjøp",
    "pricing.note": "Prisene er plassholdere. Endre dem når som helst.",
    "accountants.title": "Lei en regnskapsfører",
    "accountants.subtitle": "Velg hva du trenger hjelp med, og be om en introduksjon.",
    "accountants.badge.remote": "Remote",
    "accountants.card1.title": "Bokføring og MVA",
    "accountants.card1.li1": "Kategorisering: gjennomgang og opprydding",
    "accountants.card1.li2": "Eksport klar for MVA med forklarende notater",
    "accountants.card1.li3": "Vedlegg organisert (faktura/utskrifter)",
    "accountants.card2.title": "Selvstendig næringsdrivende og skatteår",
    "accountants.card2.li1": "Måned-for-måned oppsummering for skatteåret",
    "accountants.card2.li2": "Utgiftsfordeling og avvikssjekk",
    "accountants.card2.li3": "Eksportpakke for innsending eller rådgiver",
    "accountants.card3.title": "Småbedrift støtte",
    "accountants.card3.li1": "Løpende bokføring og avstemming",
    "accountants.card3.li2": "Dokumenthåndtering og fakturaorganisering",
    "accountants.card3.li3": "Regelmessig rapportering og eksportstøtte",
    "accountants.request": "Be om introduksjon",
    "accountants.note": "Dette er et forespørselsskjema. Tilgjengelighet avhenger av region og kapasitet.",
    "accountants.modalTitle": "Be om regnskapsfører",
    "accountants.form.region": "Region",
    "accountants.form.type": "Type",
    "accountants.form.email": "Din e-post",
    "accountants.form.notes": "Hva trenger du hjelp med?",
    "accountants.form.submit": "Send forespørsel",
    "accountants.form.note": "Dette åpner e-postappen din med en ferdig utfylt forespørsel.",
    "roadmap.title": "Tilgjengelighet og veikart",
    "roadmap.subtitle": "Skrivebord først. Mobil er planlagt.",
    "roadmap.desktop.title": "Skrivebord",
    "roadmap.desktop.status": "Lansert",
    "roadmap.desktop.leaf1": "macOS",
    "roadmap.desktop.leaf2": "Windows",
    "roadmap.desktop.note": "Nedlastingslenker kommer snart.",
    "roadmap.mobile.title": "Mobil",
    "roadmap.mobile.status": "På veikartet",
    "roadmap.mobile.leaf1": "Android",
    "roadmap.mobile.leaf2": "iOS",
    "roadmap.next.title": "Neste",
    "roadmap.next.status": "Planlagt",
    "roadmap.next.leaf1": "AI‑regnskapshandlinger",
    "roadmap.next.leaf2": "Klient‑eksportpakker (Pro)",
    "roadmap.next.leaf3": "Dokumentorganisering",
    "privacy.title": "Personvern by design",
    "privacy.subtitle":
      "Finansdata lagres lokalt på enheten din. Du styrer sikkerhetskopier, eksport og hva du deler.",
    "privacy.li1": "Ingen automatisk opplasting av finansdata",
    "privacy.li2": "Lokal vedleggsmappe for regninger og fakturaer",
    "privacy.li3": "Portabel sikkerhetskopi for regnskapsfører eller migrering",
    "privacy.callout.title": "Fungerer offline",
    "privacy.callout.desc":
      "Bruk det uten å bekymre deg for synk, kontoer eller nedetid.",
    "privacy.tag1": "Lokalt JSON",
    "privacy.tag2": "Vedlegg",
    "privacy.tag3": "Sikkerhetskopipakke",
    "faq.title": "FAQ",
    "faq.subtitle": "Korte svar på vanlige spørsmål.",
    "download.title": "Klar til å prøve Kivana?",
    "download.subtitle":
      "Legg til kontoer, importer transaksjoner og hold fakturaer samlet i én flyt.",
    "download.fact1": "Installer for macOS (.dmg) og Windows (.msi)",
    "download.fact2": "Lokal lagring (ingen konto kreves)",
    "download.fact3": "Innebygd oppdatering for nye versjoner",
    "download.ctaPrimary": "Last ned fra GitHub Releases",
    "download.ctaSecondary": "Til toppen",
    "download.note":
      "Nedlastinger ligger på GitHub Releases.",
    "footer.features": "Funksjoner",
    "footer.privacy": "Personvern",
    "footer.faq": "FAQ",
    "footer.copyrightPrefix": "©",
    "footer.rights": "Alle rettigheter forbeholdt.",
    "privacy.open": "Les full personvernerklæring",
    "privacy.modalTitle": "Personvernerklæring (EU)",
    "privacy.modalNote":
      "Denne teksten er for transparens og er ikke juridisk rådgivning.",
    "faq.open": "Åpne FAQ",
    "faq.modalTitle": "FAQ",
    "faq.pill1": "Lokal‑først",
    "faq.pill2": "AI valgfritt",
    "faq.pill3": "Eksportklar",
    "modal.close": "Lukk",
  },
};

const currencyMap = {
  en: { code: "GBP", locale: "en-GB" },
  de: { code: "EUR", locale: "de-DE" },
  fr: { code: "EUR", locale: "fr-FR" },
  es: { code: "EUR", locale: "es-ES" },
  it: { code: "EUR", locale: "it-IT" },
  pt: { code: "EUR", locale: "pt-PT" },
  nl: { code: "EUR", locale: "nl-NL" },
  nb: { code: "NOK", locale: "nb-NO" },
  pl: { code: "PLN", locale: "pl-PL" },
};

const basePrices = {
  basic: 0,
  "standard-monthly": 15,
  "standard-annual": 165,
  "pro-monthly": 49,
  "pro-annual": 539,
  lifetime: 1599,
};

const exampleAmounts = {
  net: 1240,
  income: 3920,
  expenses: 2680,
  bills: 980,
  cat1: 420,
  cat2: 243,
  cat3: 86,
};

const exchangeRates = {
  GBP: 1,
  EUR: 1.17,
  NOK: 13.6,
  PLN: 5.05,
};

function formatPriceValue(gbpAmount, lang) {
  const map = currencyMap[lang] || currencyMap.en;
  const rate = exchangeRates[map.code];
  let amount = gbpAmount * rate;
  if (gbpAmount === 0) amount = 0;
  else amount = Math.round(amount);
  return new Intl.NumberFormat(map.locale, {
    style: "currency",
    currency: map.code,
    maximumFractionDigits: 0,
  }).format(amount);
}

function setupLanguage() {
  const select = document.querySelector("[data-lang-select]");
  if (!(select instanceof HTMLSelectElement)) return;

  const stored = localStorage.getItem("kivana_site_lang");
  const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  const initial = translations[stored]
    ? stored
    : translations[browser]
      ? browser
      : "en";

  function apply(lang) {
    const dict = translations[lang] || translations.en;
    document.documentElement.lang = lang;

    document
      .querySelectorAll("[data-price-basic]")
      .forEach(
        (el) => (el.textContent = formatPriceValue(basePrices["basic"], lang)),
      );
    document
      .querySelectorAll("[data-price-standard-monthly]")
      .forEach(
        (el) =>
          (el.textContent = formatPriceValue(
            basePrices["standard-monthly"],
            lang,
          )),
      );
    document
      .querySelectorAll("[data-price-standard-annual]")
      .forEach(
        (el) =>
          (el.textContent = formatPriceValue(
            basePrices["standard-annual"],
            lang,
          )),
      );
    document
      .querySelectorAll("[data-price-pro-monthly]")
      .forEach(
        (el) =>
          (el.textContent = formatPriceValue(basePrices["pro-monthly"], lang)),
      );
    document
      .querySelectorAll("[data-price-pro-annual]")
      .forEach(
        (el) =>
          (el.textContent = formatPriceValue(basePrices["pro-annual"], lang)),
      );
    document
      .querySelectorAll("[data-price-lifetime]")
      .forEach(
        (el) =>
          (el.textContent = formatPriceValue(basePrices["lifetime"], lang)),
      );

    document.querySelectorAll("[data-example-price]").forEach((el) => {
      const k = el.getAttribute("data-example-price");
      if (!k) return;
      const amount = exampleAmounts[k];
      if (typeof amount !== "number") return;
      el.textContent = formatPriceValue(amount, lang);
    });

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      let v = dict[key];
      if (typeof v === "string") {
        if (v.includes("{price}")) {
          if (key === "pricing.standard.metaMonthly")
            v = v.replace(
              "{price}",
              formatPriceValue(basePrices["standard-annual"], lang),
            );
          else if (key === "pricing.pro.metaMonthly")
            v = v.replace(
              "{price}",
              formatPriceValue(basePrices["pro-annual"], lang),
            );
        }
        el.textContent = v;
      }
    });
    localStorage.setItem("kivana_site_lang", lang);
  }

  select.value = initial;
  select.addEventListener("change", () => {
    apply(select.value);
  });
  apply(initial);
}

function setupAccountants() {
  const form = document.querySelector("[data-accountant-form]");
  const modal = document.querySelector('[data-modal="accountant"]');
  const service = document.querySelector("[data-accountant-service]");
  if (!(form instanceof HTMLFormElement)) return;

  document.querySelectorAll("[data-accountant-pick]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const picked = btn.getAttribute("data-accountant-pick") || "";
      if (service instanceof HTMLInputElement) service.value = picked;
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const to = "support@kivana.app";
    const picked = String(fd.get("service") || "");
    const region = String(fd.get("region") || "");
    const type = String(fd.get("type") || "");
    const email = String(fd.get("email") || "");
    const notes = String(fd.get("notes") || "");
    const subject = `Kivana accountant request — ${picked || "General"}`;
    const body = [
      `Service: ${picked || "General"}`,
      `Region: ${region}`,
      `Business type: ${type}`,
      `Email: ${email}`,
      "",
      notes,
    ].join("\n");
    const href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    if (modal instanceof HTMLElement) {
      modal.hidden = true;
      document.body.style.overflow = "";
    }
    window.location.href = href;
  });
}

setupMobileNav();
setupDisabledLinks();
setYear();
setupBillingToggle();
setupLanguage();
setupModals();
setupAccountants();
