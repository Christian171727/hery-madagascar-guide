import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Leaf } from "lucide-react";

// Four real photographs supplied in north.zip, depicting chameleons and
// other small tree-dwelling reptiles in northern Madagascar.
const PHOTOS = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  src: `/images/northern-madagascar/north-${i + 1}.avif`,
}));
const FALLBACK = "/images/forest.jpeg";
const DELAY = 4000;

const TRANSLATIONS = {
  en: {
    tag: "NORTHERN MADAGASCAR · WILDLIFE",
    previous: "Previous photo", next: "Next photo",
    pause: "Pause slideshow", play: "Play slideshow",
    scenes: [
      ["A tiny master of disguise", "Look closely at the tree bark: this little reptile almost disappears into its natural surroundings.", "HIDDEN IN PLAIN SIGHT"],
      ["A splash of green in the forest", "A bright green climber rests on a bamboo stem — one of nature's beautiful little surprises.", "FOREST COLORS"],
      ["The art of moving slowly", "A chameleon balances on a slender branch, revealing the extraordinary details of its textured skin.", "CHAMELEON ENCOUNTER"],
      ["A secret life on the trees", "A colorful tree-dwelling reptile shows why the smallest discoveries can become unforgettable travel memories.", "NATURE UP CLOSE"],
    ],
  },
  fr: {
    tag: "NORD DE MADAGASCAR · FAUNE",
    previous: "Photo précédente", next: "Photo suivante",
    pause: "Mettre en pause", play: "Reprendre le diaporama",
    scenes: [
      ["Un petit maître du camouflage", "Regardez l'écorce de près : ce petit reptile se fond presque parfaitement dans son environnement.", "CACHE À LA VUE DE TOUS"],
      ["Une touche de vert dans la forêt", "Un petit grimpeur vert se repose sur une tige de bambou : une jolie surprise de la nature.", "COULEURS DE LA FORÊT"],
      ["L'art de prendre son temps", "Un caméléon avance sur une fine branche, dévoilant les détails fascinants de sa peau.", "RENCONTRE AVEC UN CAMÉLÉON"],
      ["La vie secrète des arbres", "Un reptile arboricole coloré nous rappelle que les plus petites découvertes créent de grands souvenirs.", "LA NATURE DE PRÈS"],
    ],
  },
  mg: {
    tag: "AVARATR'I MADAGASIKARA · BIBY",
    previous: "Sary teo aloha", next: "Sary manaraka",
    pause: "Ajanona aloha", play: "Tohizana ny sary",
    scenes: [
      ["Mahay miafina amin'ny hodi-kazo", "Diniho tsara ny hazo: saika tsy hita mihitsy ity biby mandady kely ity noho ny lokony.", "BIBY MAHAY MIAFINA"],
      ["Loko maitso mampitolagaga", "Misy biby maitso kely mifikitra amin'ny volotsangana: harena miafin'ny natiora izany.", "LOKON'NY ALA"],
      ["Mandeha miadana, mahavariana", "Mifikitra amin'ny rantsankazo ny tanalahy, mampiseho ny endrika sy ny hodiny miavaka.", "FANTARO NY TANALAHY"],
      ["Fiainana miafina eny ambony hazo", "Ny biby kely miloko eny amin'ny hazo dia mampahatsiahy fa mendrika ho fantarina ny antsipirian'ny natiora.", "NATIORA AKAiKY"],
    ],
  },
};

const CSS = `
.dest-img .north-gallery{position:absolute;inset:0;z-index:1;overflow:hidden;isolation:isolate;background:#213329;color:#fff}
.dest-img .north-gallery .north-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0;filter:none!important;transform:scale(1.07)!important;transition:opacity .95s ease,transform 4s ease-out;pointer-events:none}
.dest-img .north-gallery .north-photo.active{opacity:1;transform:scale(1)!important}
.destination-card:hover .dest-img .north-gallery .north-photo{filter:none!important}
.north-shade{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,transparent 66%,rgba(7,24,18,.55) 100%);pointer-events:none}
.north-photo-label{position:absolute;left:12px;bottom:61px;z-index:3;display:flex;align-items:center;gap:7px;background:rgba(12,37,26,.68);color:#e5f2cb;border:1px solid rgba(213,236,184,.45);border-radius:999px;backdrop-filter:blur(6px);padding:7px 11px;font-size:9px;font-weight:800;letter-spacing:.065em;text-shadow:0 1px 5px rgba(0,0,0,.4)}
.north-photo-label svg{color:#bfda8b}
.north-tools{position:absolute;left:12px;right:12px;bottom:14px;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:8px}
.north-index{border:1px solid rgba(255,255,255,.4);background:rgba(10,30,22,.74);padding:9px 11px;border-radius:10px;font-size:11px;font-weight:800;letter-spacing:.1em;font-variant-numeric:tabular-nums;backdrop-filter:blur(7px)}
.north-buttons{display:flex;gap:5px}
.north-buttons button{display:grid;place-items:center;width:33px;height:33px;padding:0;color:#fff;border:1px solid rgba(255,255,255,.66);border-radius:9px;background:rgba(10,30,22,.74);backdrop-filter:blur(7px);cursor:pointer;transition:background .2s,transform .2s}
.north-buttons button:hover,.north-buttons button:focus-visible{background:#42734b;transform:translateY(-2px)}
.north-progress{position:absolute;left:0;right:0;bottom:0;height:3px;z-index:5;background:rgba(255,255,255,.25)}
.north-progress span{display:block;width:100%;height:100%;background:#c4db8e;transform-origin:left;animation:north-fill 4s linear forwards}
.destination-card .dest-body .north-story{margin:15px 0 12px;min-height:136px;padding:2px 0 1px 12px;border-left:3px solid #83a66a;animation:north-reveal .7s cubic-bezier(.18,.7,.26,1) both}
.destination-card .dest-body .north-story small{display:block;color:var(--gold-600,#a67b3a);letter-spacing:.1em;font-size:9px;font-weight:900;margin-bottom:7px;text-transform:uppercase}
.destination-card .dest-body .north-story strong{display:block;color:var(--ink,#1d3b35);font-family:'Cormorant Garamond',serif;font-size:clamp(20px,1.8vw,25px);font-weight:800;line-height:1.12}
.destination-card .dest-body .north-story p{margin:9px 0 0;color:var(--muted,#566b71);font-size:11px;line-height:1.6}
@keyframes north-reveal{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}
@keyframes north-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@media(max-width:620px){.destination-card .dest-body .north-story{min-height:128px}.destination-card .dest-body .north-story strong{font-size:22px}}
@media(prefers-reduced-motion:reduce){.dest-img .north-gallery .north-photo{transition:none!important;transform:none!important}.north-story,.north-progress span{animation:none!important}}
`;

export default function NorthernMadagascarGallery({ lang = "en", onSceneChange }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [images, setImages] = useState(PHOTOS);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeIndex = Math.min(index, images.length - 1);
  const photo = images[activeIndex];
  const scene = t.scenes[(photo?.id || 1) - 1] || t.scenes[0];

  useEffect(() => {
    onSceneChange?.({ id: photo?.id || 1, title: scene[0], description: scene[1], kicker: scene[2] });
  }, [photo?.id, lang, onSceneChange]);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setTimeout(() => setIndex(i => (i + 1) % images.length), DELAY);
    return () => window.clearTimeout(timer);
  }, [paused, index, images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const next = new Image();
    next.src = images[(activeIndex + 1) % images.length].src;
  }, [activeIndex, images]);

  function onImageError(src) {
    if (src === FALLBACK) return;
    setImages(old => {
      const remaining = old.filter(item => item.src !== src);
      return remaining.length ? remaining : [{ id: 1, src: FALLBACK }];
    });
    setIndex(0);
  }

  const move = step => setIndex(i => (i + step + images.length) % images.length);
  return (
    <div className="north-gallery" role="region" aria-roledescription="carousel" aria-label={t.tag}>
      <style>{CSS}</style>
      {images.map((item, i) => (
        <img key={item.src} src={item.src} className={`north-photo${i === activeIndex ? " active" : ""}`}
          alt={i === activeIndex ? scene[0] : ""} aria-hidden={i !== activeIndex}
          loading={i < 2 ? "eager" : "lazy"} decoding="async" onError={() => onImageError(item.src)} />
      ))}
      <div className="north-shade" aria-hidden="true" />
      <span className="north-photo-label"><Leaf size={13} /> {t.tag}</span>
      {images.length > 1 && <>
        <div className="north-tools">
          <span className="north-index">{String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
          <div className="north-buttons">
            <button type="button" onClick={() => move(-1)} aria-label={t.previous}><ArrowLeft size={16} /></button>
            <button type="button" onClick={() => setPaused(p => !p)} aria-label={paused ? t.play : t.pause}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
            <button type="button" onClick={() => move(1)} aria-label={t.next}><ArrowRight size={16} /></button>
          </div>
        </div>
        {!paused && <div className="north-progress" aria-hidden="true"><span key={itemKey(photo)} /></div>}
      </>}
    </div>
  );
}

function itemKey(photo) { return photo?.src || "fallback"; }