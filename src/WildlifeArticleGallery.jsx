import React from "react";

const PICTURES = Array.from({ length: 10 }, (_, i) => "/images/wildlife/wildlife" + (i + 1) + ".jpeg");
const CAPTIONS = {
  en: {
    label: "MADAGASCAR BIODIVERSITY",
    note: "Additional wildlife images from Madagascar — not all are verified as photographed in Kirindy.",
    pause: "Pause images", resume: "Resume images", previous: "Previous wildlife photo", next: "Next wildlife photo",
    slides: [
      ["Masters of camouflage", "A chameleon becomes part of the green world around it."],
      ["Patience on a branch", "Look carefully: there is life in every corner of the forest."],
      ["Patterns of the wild", "Even a quiet branch can reveal a remarkable reptile."],
      ["Hidden against the bark", "Disguise is an extraordinary survival skill."],
      ["Details in the forest", "Nature rewards travelers who slow down and observe."],
      ["A watchful chameleon", "A small encounter can become a memorable discovery."],
      ["A flash of green", "Madagascar's reptiles bring color to the trees."],
      ["Eyes on the canopy", "Every species has its own place in the ecosystem."],
      ["Life after dark", "Small nocturnal creatures deserve just as much care."],
      ["A world worth protecting", "Discover and photograph wildlife without disturbing it."],
    ],
  },
  fr: {
    label: "BIODIVERSITÉ DE MADAGASCAR",
    note: "Photos complémentaires de la faune malgache — leur prise de vue à Kirindy n'est pas confirmée.",
    pause: "Mettre les images en pause", resume: "Reprendre les images", previous: "Photo précédente", next: "Photo suivante",
    slides: [
      ["Maîtres du camouflage", "Un caméléon se fond dans la végétation qui l'entoure."],
      ["Patience sur une branche", "Regardez bien : chaque recoin de la forêt est vivant."],
      ["Motifs de la nature", "Même une branche immobile réserve des surprises."],
      ["Invisible sur l'écorce", "Le mimétisme est un formidable moyen de survie."],
      ["Les détails de la forêt", "Prendre son temps permet d'observer l'essentiel."],
      ["Un caméléon à l'affût", "Une rencontre discrète devient un beau souvenir."],
      ["Une touche de vert", "Les reptiles malgaches colorent la végétation."],
      ["Un regard vers la canopée", "Chaque espèce trouve sa place dans l'écosystème."],
      ["La vie après la nuit tombée", "Les petites espèces nocturnes méritent notre respect."],
      ["Un monde à préserver", "Observer et photographier sans déranger."],
    ],
  },
  mg: {
    label: "HARENA VOAJANAHARIN'I MADAGASIKARA",
    note: "Sary biby hafa eto Madagasikara — tsy voamarina fa tao Kirindy no nalaina avokoa.",
    pause: "Ajanona ny sary", resume: "Tohizana ny sary", previous: "Sary teo aloha", next: "Sary manaraka",
    slides: [
      ["Mahafehy ny fierena", "Mifangaro amin'ny loko maitso manodidina azy ny tanalahy."],
      ["Miandry eny amin'ny rantsana", "Jereo tsara fa feno fiainana ny ala."],
      ["Endrika manaitra", "Na eo amin'ny hazo mangina aza dia misy zavaboary."],
      ["Miafina amin'ny hoditry ny hazo", "Manampy ny biby hiaina ny fahaizany miafina."],
      ["Hakitroky ny antsipiriany", "Izay mandinika tsara no mahita zavatra miavaka."],
      ["Tanalahy mailo", "Ny fihaonana kely dia fahatsiarovana lehibe."],
      ["Loko maitso mamirapiratra", "Manome loko ny ala ny biby mandady."],
      ["Fiainana eny amin'ny rantsana", "Samy manana ny toerany ny zavamananaina."],
      ["Fiainana amin'ny alina", "Tokony hajaina koa ireo biby madinika amin'ny alina."],
      ["Tontolo mendrika harovana", "Diniho sy alao sary ny biby nefa aza manelingelina."],
    ],
  },
};
const STYLES = [
  ".wildlife-story{width:min(820px,calc(100% - 48px));margin:20px auto 46px;color:var(--text)}",
  ".wildlife-story-kicker{display:block;color:var(--gold-strong);font-size:11px;font-weight:800;letter-spacing:.14em;margin:0 0 10px}",
  ".wildlife-story>h3{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,2.65rem);color:var(--ink);line-height:1.1;margin:0 0 14px}",
  ".wildlife-story-note{font-size:13px;line-height:1.8;color:var(--text);margin:0 0 32px}",
  ".wildlife-story-figure{margin:32px 0 26px;overflow:hidden;border:1px solid var(--line);background:var(--surface);border-radius:20px;box-shadow:0 12px 35px rgba(14,31,25,.07)}",
  ".wildlife-story-photo{height:clamp(280px,48vw,470px);position:relative;background:#12271e;overflow:hidden}",
  ".wildlife-story-photo img{display:block;width:100%;height:100%;object-fit:contain}",
  ".wildlife-story-photo:after{content:'';position:absolute;inset:55% 0 0;background:linear-gradient(transparent,rgba(0,0,0,.35));pointer-events:none}",
  ".wildlife-story-index{position:absolute;bottom:16px;left:18px;z-index:2;padding:8px 12px;border-radius:999px;background:rgba(15,25,20,.65);color:#fff;font-size:12px;font-weight:800;letter-spacing:.06em}",
  ".wildlife-story-caption{padding:22px 25px 25px}",
  ".wildlife-story-caption h4{font-family:'Cormorant Garamond',serif;color:var(--ink);font-size:clamp(1.55rem,3vw,2rem);line-height:1.1;margin:0 0 8px}",
  ".wildlife-story-caption p{font-size:14px;line-height:1.85;margin:0;color:var(--text)}",
  ".wildlife-story>.article-section{width:100%;padding:30px 0 39px}",
  ".wildlife-story>.article-section p{font-size:14px;line-height:1.95}",
  ".wildlife-story-end{margin:28px 0 0;padding:20px 24px;border-left:3px solid var(--gold-500);background:rgba(205,164,84,.06);border-radius:0 16px 16px 0;font-size:14px;line-height:1.85}",
  "@media(max-width:600px){.wildlife-story{width:calc(100% - 30px)}.wildlife-story-photo{height:320px}.wildlife-story-caption{padding:18px}.wildlife-story>.article-section{grid-template-columns:40px minmax(0,1fr);gap:10px}.wildlife-story>.article-section p{font-size:13px}}",
].join("\n");

export default function WildlifeArticleGallery({ lang = "en", sections = [] }) {
  const t = CAPTIONS[lang] || CAPTIONS.en;
  return (
    <div className="wildlife-story" aria-label={t.label}>
      <style>{STYLES}</style>
      <span className="wildlife-story-kicker">{t.label}</span>
      <h3>{lang === "fr" ? "Dix regards sur la faune de Madagascar" : lang === "mg" ? "Sary folo momba ny biby eto Madagasikara" : "Ten encounters with Madagascar's wildlife"}</h3>
      <p className="wildlife-story-note">{t.note}</p>
      {PICTURES.map((photo, index) => (
        <React.Fragment key={photo}>
          <figure className="wildlife-story-figure">
            <div className="wildlife-story-photo">
              <img src={photo} alt={t.slides[index][0]} decoding="async" loading={index < 2 ? "eager" : "lazy"} />
              <span className="wildlife-story-index">{String(index + 1).padStart(2, "0")} / {String(PICTURES.length).padStart(2, "0")}</span>
            </div>
            <figcaption className="wildlife-story-caption">
              <h4>{t.slides[index][0]}</h4>
              <p>{t.slides[index][1]}</p>
            </figcaption>
          </figure>
          {sections[index] && (
            <section className="article-section">
              <div className="article-section-number">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h2>{sections[index].title}</h2>
                <p>{sections[index].text}</p>
              </div>
            </section>
          )}
        </React.Fragment>
      ))}
      <p className="wildlife-story-end">
        {lang === "mg"
          ? "Aza manelingelina ny biby rehefa mitsidika ala sy maka sary. Ny fanajana ny natiora no fahatsiarovana tsara indrindra."
          : lang === "fr"
            ? "Pour observer la faune, laissez de l'espace aux animaux et respectez leur habitat. La plus belle expérience est une rencontre naturelle."
            : "Give animals space, respect their habitat and let each encounter happen naturally. The best wildlife memory is one that leaves nature undisturbed."}
      </p>
    </div>
  );
}
