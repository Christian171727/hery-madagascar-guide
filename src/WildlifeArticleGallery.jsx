import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

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
  ".wildlife-extra{width:min(820px,calc(100% - 48px));margin:14px auto 40px;position:relative}",
  ".wildlife-extra h3{font-family:'Cormorant Garamond',serif;font-size:clamp(1.7rem,3vw,2.35rem);color:var(--ink);margin:0 0 12px}",
  ".wildlife-extra-note{font-size:13px;line-height:1.75;color:var(--text);margin:0 0 18px}",
  ".wildlife-frame{height:clamp(270px,45vw,420px);position:relative;overflow:hidden;border-radius:22px;background:#10291f;isolation:isolate}",
  ".wildlife-extra-img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;opacity:0;transition:opacity .9s ease;pointer-events:none}",
  ".wildlife-extra-img.active{opacity:1}",
  ".wildlife-frame::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(4,18,14,.92));pointer-events:none;z-index:1}",
  ".wildlife-frame-copy{position:absolute;left:19px;right:19px;bottom:61px;color:white;z-index:2;animation:wildlife-up .5s ease both;pointer-events:none}",
  ".wildlife-frame-copy strong{font-size:18px;display:block;line-height:1.2}",
  ".wildlife-frame-copy p{margin:6px 0 0;font-size:12px;line-height:1.45;max-width:550px;color:rgba(255,255,255,.95)}",
  ".wildlife-gallery-tools{position:absolute;z-index:3;bottom:13px;left:15px;right:15px;display:flex;align-items:center;justify-content:space-between;gap:8px}",
  ".wildlife-count{font-size:12px;color:#fff;font-weight:800;border-radius:999px;background:rgba(0,0,0,.45);padding:8px 13px}",
  ".wildlife-gallery-buttons{display:flex;gap:7px}",
  ".wildlife-gallery-buttons button{display:grid;place-items:center;width:34px;height:34px;background:rgba(13,31,25,.78);border:1px solid rgba(255,255,255,.5);border-radius:50%;color:#fff;cursor:pointer}",
  ".wildlife-gallery-buttons button:hover{background:#ba9253}",
  ".wildlife-gallery-tag{display:block;letter-spacing:.15em;color:var(--gold-strong);font-weight:800;font-size:10px;margin:0 0 7px}",
  "@keyframes wildlife-up{from{transform:translateY(8px);opacity:0}to{transform:translateY(0);opacity:1}}",
  "@media(prefers-reduced-motion:reduce){.wildlife-extra-img{transition:none}.wildlife-frame-copy{animation:none}}",
].join("\n");

export default function WildlifeArticleGallery({ lang = "en" }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = CAPTIONS[lang] || CAPTIONS.en;
  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => setCurrent((x) => (x + 1) % PICTURES.length), 4000);
    return () => window.clearTimeout(timer);
  }, [current, paused]);
  useEffect(() => {
    const img = new Image();
    img.src = PICTURES[(current + 1) % PICTURES.length];
  }, [current]);
  const go = (delta) => setCurrent((i) => (i + delta + PICTURES.length) % PICTURES.length);
  return (
    <section className="wildlife-extra" aria-label={t.label}>
      <style>{STYLES}</style>
      <span className="wildlife-gallery-tag">{t.label}</span>
      <h3>{lang === "fr" ? "D'autres merveilles de la faune malgache" : lang === "mg" ? "Ireo zavaboary hafa eto Madagasikara" : "More wonders of Madagascar's wildlife"}</h3>
      <p className="wildlife-extra-note">{t.note}</p>
      <div className="wildlife-frame" role="region" aria-roledescription="carousel" aria-label={t.label}>
        {PICTURES.map((photo, i) => (
          <img key={photo} src={photo}
            className={"wildlife-extra-img" + (i === current ? " active" : "")}
            alt={i === current ? t.slides[i][0] : ""}
            aria-hidden={i !== current} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
        ))}
        <div className="wildlife-frame-copy" key={lang + current}>
          <strong>{t.slides[current][0]}</strong><p>{t.slides[current][1]}</p>
        </div>
        <div className="wildlife-gallery-tools">
          <span className="wildlife-count">{String(current + 1).padStart(2, "0")} / 10</span>
          <div className="wildlife-gallery-buttons">
            <button type="button" onClick={() => go(-1)} aria-label={t.previous}><ArrowLeft size={17}/></button>
            <button type="button" onClick={() => setPaused(v => !v)} aria-label={paused ? t.resume : t.pause}>{paused ? <Play size={17}/> : <Pause size={17}/>}</button>
            <button type="button" onClick={() => go(1)} aria-label={t.next}><ArrowRight size={17}/></button>
          </div>
        </div>
      </div>
    </section>
  );
}
