import React, { useEffect, useState } from "react";
import { Clock, ArrowRight } from "lucide-react";

// Keep the original blog image as the first slide and as the article hero.
export const conservationPhotos = Array.from(
  { length: 10 }, (_, i) => `/images/conservation-blog/understanding${i + 1}.jpeg`
);
const coverPhotos = ["/images/forest.jpeg", ...conservationPhotos];

const copy = {
  en: {
    label: "FIELD CONSERVATION · MADAGASCAR",
    intro: "These photographs illustrate field visits, environmental learning and practical care for nature. Their exact locations and project affiliations have not been independently verified.",
    galleryTitle: "Ten moments from conservation in the field",
    end: "Conservation begins with informed observation, careful decisions and respect for the communities and habitats that sustain life.",
    cover: ["Conservation begins on the ground", "Go beyond beautiful landscapes and discover the people and care behind nature protection.", "CONSERVATION IN ACTION"],
    scenes: [
      ["Learning through hands-on action", "Small field activities can open bigger conversations about caring for habitats.", "FIELD EXPERIENCE"],
      ["Working together outdoors", "Understanding the landscape starts with listening, sharing knowledge and observing.", "COLLECTIVE EFFORT"],
      ["Caring for young plants", "Every responsible action is a chance to learn about restoration and long-term care.", "RESTORATION & LEARNING"],
      ["Taking time to explore", "Walk slowly through green habitats and notice the relationships around you.", "FOREST EXPLORATION"],
      ["Documenting the forest", "Field photographs help record observations without disturbing the environment.", "NATURE PHOTOGRAPHY"],
      ["The details matter", "A closer look at vegetation can reveal the complexity of a living ecosystem.", "FIELD OBSERVATION"],
      ["Looking beyond the obvious", "Branches, paths and changing light all tell part of the forest's story.", "LANDSCAPE STUDY"],
      ["Walking with curiosity", "Shared discovery turns a visit into a more meaningful learning experience.", "GUIDED DISCOVERY"],
      ["Respecting the path", "Moving carefully through natural areas helps minimize our footprint.", "RESPONSIBLE EXPLORATION"],
      ["A journey worth protecting", "Leave with fresh questions, lasting memories and greater respect for nature.", "TRAVEL WITH PURPOSE"],
    ],
  },
  fr: {
    label: "CONSERVATION SUR LE TERRAIN · MADAGASCAR",
    intro: "Ces photos illustrent la découverte de terrain et le respect de la nature. Les lieux précis et les organismes associés ne sont pas vérifiés.",
    galleryTitle: "Dix instants pour comprendre la conservation",
    end: "La conservation repose sur l'observation, des actions réfléchies et le respect des communautés et des milieux naturels.",
    cover: ["La conservation commence sur le terrain", "Au-delà des paysages, découvrez l'attention portée à la nature et aux communautés.", "CONSERVATION EN ACTION"],
    scenes: [
      ["Apprendre en agissant", "Les gestes de terrain ouvrent la voie à une meilleure protection des habitats.", "EXPÉRIENCE DE TERRAIN"],
      ["Agir et apprendre ensemble", "Observer et échanger pour mieux comprendre le paysage et ses enjeux.", "EFFORT COLLECTIF"],
      ["Prendre soin des jeunes plants", "La restauration demande aussi du suivi, de la patience et de la connaissance.", "RESTAURATION"],
      ["Explorer avec attention", "Avancez doucement et découvrez la richesse des habitats forestiers.", "EXPLORATION FORESTIÈRE"],
      ["Documenter la forêt", "La photographie aide à observer sans perturber les milieux naturels.", "PHOTOGRAPHIE NATURE"],
      ["Chaque détail compte", "La végétation révèle les liens qui composent un écosystème vivant.", "OBSERVATION"],
      ["Regarder autrement", "Branches, sentiers et lumières racontent la vie de la forêt.", "ÉTUDE DES PAYSAGES"],
      ["Marcher avec curiosité", "Une découverte partagée rend chaque visite plus enrichissante.", "DÉCOUVERTE GUIDÉE"],
      ["Respecter les passages", "Avancer prudemment aide à limiter notre impact sur la nature.", "EXPLORATION RESPONSABLE"],
      ["Voyager pour mieux protéger", "Repartez avec de nouvelles connaissances et un respect renforcé.", "VOYAGE ENGAGÉ"],
    ],
  },
  mg: {
    label: "FIAROVANA NY NATIORA · MADAGASIKARA",
    intro: "Ireo sary ireo dia mampiseho fitsidihana eny an-kianja sy fianarana momba ny natiora. Tsy mbola voamarina ny toerana marina nalaina azy rehetra.",
    galleryTitle: "Fotoana folo hahafantarana ny fiarovana ny natiora",
    end: "Ny fiarovana ny natiora dia miainga amin'ny fandinihana, asa voahevitra tsara ary fanajana ny mponina sy ny tontolo iainana.",
    cover: ["Eny an-kianja no manomboka ny fiarovana", "Mihoatra noho ny hakanton'ny ala ny fitandroana ny natiora sy ny fiarahamonina.", "FIAROVANA NY NATIORA"],
    scenes: [
      ["Mianara amin'ny alalan'ny asa", "Ny asa kely eny an-kianja dia manampy amin'ny fahafantarana ny fiarovana ny ala.", "ASA ENY AN-KIANJA"],
      ["Miara-miasa sy mianatra", "Mandinika sy mifampizara fahalalana momba ny toerana tsidihina.", "FIARAHA-MIASA"],
      ["Mikarakara ireo zana-kazo", "Mila faharetana sy fikarakarana maharitra ny famerenana ny ala.", "FAMERENANA NY ALA"],
      ["Mitsidika amim-pitandremana", "Mandehana miadana mba hahafantarana ny tontolo maitso manodidina anao.", "FITSIDIHANA ALA"],
      ["Mandrakitra ny zava-misy anaty ala", "Ny sary dia manampy amin'ny fandinihana nefa tsy manelingelina ny natiora.", "SARY SY NATIORA"],
      ["Zava-dehibe ny antsipiriany", "Ny zavamaniry tsirairay dia manana anjara toerana amin'ny tontolo iainana.", "FANDINIHANA"],
      ["Mijery mihoatra ny hita maso", "Ny sampan-kazo sy ny lalana dia samy mitantara ny fiainan'ny ala.", "FAMANTARANA NY ALA"],
      ["Mandeha miaraka amin'ny fahalianana", "Ny fitsidihana iombonana dia manome fahalalana sy fahatsiarovana.", "FITSIDIHANA MIARAKA"],
      ["Manaja ny lalana voajanahary", "Ny fihetsika voahevitra dia mampihena ny fanelingelenana ny tontolo.", "FIZAHANTANY MANJA"],
      ["Dia mitondra fahatsiarovana", "Fantaro ny natiora ary hajao ny harena ho an'ny taranaka ho avy.", "DIA MISY TANJONA"],
    ],
  },
};

const galleryCSS = `
.conservation-story{width:min(820px,calc(100% - 48px));margin:20px auto 46px;color:var(--text)}
.conservation-story-kicker{display:block;color:var(--gold-strong);font-size:11px;font-weight:800;letter-spacing:.13em;margin-bottom:11px}
.conservation-story>h3{font-family:'Cormorant Garamond',serif;font-size:clamp(1.85rem,4vw,2.6rem);color:var(--ink);line-height:1.1;margin:0 0 15px}
.conservation-story-note{font-size:13px;line-height:1.85;margin:0 0 30px;color:var(--text)}
.conservation-story-figure{margin:28px 0 26px;overflow:hidden;border-radius:20px;border:1px solid var(--line);background:var(--surface);box-shadow:0 12px 35px rgba(14,31,25,.07)}
.conservation-story-photo{height:clamp(280px,48vw,470px);position:relative;background:#163027;overflow:hidden}
.conservation-story-photo img{display:block;width:100%;height:100%;object-fit:contain}
.conservation-story-count{position:absolute;left:18px;bottom:16px;padding:7px 12px;background:rgba(10,28,19,.75);border-radius:999px;color:#fff;font-size:12px;font-weight:800}
.conservation-story-caption{padding:22px 25px 24px}
.conservation-story-caption h4{font-family:'Cormorant Garamond',serif;font-size:clamp(1.55rem,3vw,2rem);color:var(--ink);margin:0 0 8px;line-height:1.1}
.conservation-story-caption p{font-size:14px;line-height:1.8;margin:0;color:var(--text)}
.conservation-story>.article-section{width:100%;padding:30px 0 38px}
.conservation-story>.article-section p{font-size:14px;line-height:1.95}
.conservation-story-end{margin:25px 0 0;border-left:3px solid #cda454;padding:20px 22px;background:rgba(205,164,84,.07);border-radius:0 14px 14px 0;font-size:14px;line-height:1.85}
@media(max-width:600px){.conservation-story{width:calc(100% - 30px)}.conservation-story-photo{height:320px}.conservation-story-caption{padding:18px}.conservation-story>.article-section{grid-template-columns:40px minmax(0,1fr);gap:10px}}
`;

export function ConservationArticleGallery({ lang = "en", sections = [] }) {
  const t = copy[lang] || copy.en;
  return (
    <div className="conservation-story" aria-label={t.label}>
      <style>{galleryCSS}</style>
      <span className="conservation-story-kicker">{t.label}</span>
      <h3>{t.galleryTitle}</h3>
      <p className="conservation-story-note">{t.intro}</p>
      {conservationPhotos.map((photo, index) => (
        <React.Fragment key={photo}>
          <figure className="conservation-story-figure">
            <div className="conservation-story-photo">
              <img src={photo} alt={t.scenes[index][0]} loading={index < 2 ? "eager" : "lazy"} decoding="async" />
              <span className="conservation-story-count">{String(index + 1).padStart(2, "0")} / 10</span>
            </div>
            <figcaption className="conservation-story-caption">
              <h4>{t.scenes[index][0]}</h4>
              <p>{t.scenes[index][1]}</p>
            </figcaption>
          </figure>
          {sections[index] && (
            <section className="article-section">
              <div className="article-section-number">{String(index + 1).padStart(2, "0")}</div>
              <div><h2>{sections[index].title}</h2><p>{sections[index].text}</p></div>
            </section>
          )}
        </React.Fragment>
      ))}
      <p className="conservation-story-end">{t.end}</p>
    </div>
  );
}

export function ConservationFeaturedPreview({ post, readLabel, isMG = false, isFR = false }) {
  const [index, setIndex] = useState(0);
  const lang = isMG ? "mg" : isFR ? "fr" : "en";
  const [title, description, kicker] = index === 0 ? copy[lang].cover : copy[lang].scenes[index - 1];

  useEffect(() => {
    const timer = window.setTimeout(() => setIndex(i => (i + 1) % coverPhotos.length), 4000);
    return () => window.clearTimeout(timer);
  }, [index]);
  useEffect(() => {
    const preload = new Image();
    preload.src = coverPhotos[(index + 1) % coverPhotos.length];
  }, [index]);

  return (
    <>
      <div className="post-image wildlife-feature-stage" role="group" aria-label="Conservation in the field slideshow">
        {coverPhotos.map((src, i) => (
          <img key={src} src={src} className={"wildlife-feature-photo" + (i === index ? " active" : "")}
            alt={i === index ? title : ""} aria-hidden={i !== index} loading={i < 2 ? "eager" : "lazy"} decoding="async" />
        ))}
        <div className="wildlife-feature-shade" aria-hidden="true" />
        <span className="post-category">{post.category}</span>
        <div className="wildlife-feature-image-caption" key={lang + index}>
          <span className="wildlife-feature-kicker">{kicker}</span>
          <strong>{title}</strong>
        </div>
        <span className="wildlife-feature-counter">{String(index + 1).padStart(2, "0")} / {String(coverPhotos.length).padStart(2, "0")}</span>
        <span className="wildlife-feature-progress" aria-hidden="true"><span key={index} /></span>
      </div>
      <div className="post-body wildlife-feature-content">
        <span className="post-meta"><Clock size={14}/>{post.duration} {isMG ? "vakina" : isFR ? "de lecture" : "read"}</span>
        <h3>{post.title}</h3>
        <div className="wildlife-feature-dynamic" key={"description-" + lang + index}>
          <strong>{title}</strong><p>{description}</p>
        </div>
        <span className="post-read">{readLabel} <ArrowRight size={14}/></span>
      </div>
    </>
  );
}
