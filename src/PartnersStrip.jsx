import React from "react";
import { ArrowUpRight, HeartHandshake, Sparkles } from "lucide-react";
import "./PartnersStrip.css";

// Add new partners to this array when their logo and official link are available.
// Do not place unverified partners here.
export const partners = [
  {
    name: "Aye-Aye Conservation Project",
    logo: "/images/partners/aye-aye-conservation-project.webp",
    url: "https://www.instagram.com/ayeaye_conservation_project?vrfl=aXF6bHZsYnh4b2N0",
  },
];

const translations = {
  en: {
    kicker: "PEOPLE & PURPOSE",
    title: "Our Partners",
    description: "Meaningful journeys are built through shared respect for Madagascar's wildlife, landscapes and communities. Discover the projects and people connected with our story.",
    future: "More connections and collaborations to come",
    visit: "Visit the partner's Instagram page",
  },
  fr: {
    kicker: "RENCONTRES & ENGAGEMENT",
    title: "Nos partenaires",
    description: "Les plus beaux voyages naissent du respect de la faune, des paysages et des communautés de Madagascar. Découvrez les projets et les personnes liés à notre aventure.",
    future: "De nouveaux échanges et partenariats à venir",
    visit: "Visiter la page Instagram du partenaire",
  },
  mg: {
    kicker: "FIARAHA-MIASA & FIKAJIANA",
    title: "Ireo mpiara-miombon'antoka",
    description: "Ny dia manan-danja dia miainga amin'ny fanajana ny biby, ny tontolo voajanahary ary ny fiarahamonina eto Madagasikara. Fantaro ireo tetikasa sy olona miara-mizotra aminay.",
    future: "Mbola hisy fiaraha-miasa vaovao ho avy",
    visit: "Hijery ny pejy Instagram an'ilay mpiara-miombon'antoka",
  },
};

function PartnersSet({ t, duplicate = false }) {
  return (
    <div className="hery-partners-set" aria-hidden={duplicate ? "true" : undefined}>
      {partners.map((partner) => (
        <a
          className="hery-partner-link"
          key={partner.url}
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={duplicate ? undefined : `${t.visit}: ${partner.name}`}
          title={partner.name}
          tabIndex={duplicate ? -1 : undefined}
        >
          <span className="hery-partner-logo-wrap">
            <img src={partner.logo} alt={duplicate ? "" : partner.name} width="88" height="88" loading="lazy" decoding="async" />
          </span>
          <span className="hery-partner-name">{partner.name}</span>
          <ArrowUpRight className="hery-partner-link-icon" size={18} aria-hidden="true" />
        </a>
      ))}
      <span className="hery-partner-next" aria-hidden="true">
        <Sparkles size={19} />
        {t.future}
      </span>
    </div>
  );
}

export default function PartnersStrip({ lang = "en" }) {
  const t = translations[lang] || translations.en;
  return (
    <section id="partners" className="hery-partners" aria-labelledby="hery-partners-title">
      <div className="hery-partners-heading">
        <div className="hery-partners-eyebrow"><HeartHandshake size={17} /> {t.kicker}</div>
        <h2 id="hery-partners-title">{t.title}</h2>
        <p>{t.description}</p>
      </div>
      <div className="hery-partners-window" aria-label={t.title}>
        <div className="hery-partners-track">
          <PartnersSet t={t} />
          <PartnersSet t={t} duplicate />
        </div>
      </div>
    </section>
  );
}