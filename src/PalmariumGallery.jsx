import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Leaf } from "lucide-react";

// Seven owner-provided photographs. The words beneath the card follow the active photo.
const PHOTOS = Array.from({ length: 7 }, (_, index) => ({
  id: index + 1,
  src: `/images/palmarium-new/palmarium-${String(index + 1).padStart(2, "0")}.avif`,
}));
const FALLBACK = "/images/Palmarium.jpg";
const DELAY_MS = 4000;

const STORIES = {
  en: {
    previous: "Previous photo", next: "Next photo", pause: "Pause slideshow", play: "Resume slideshow",
    alt: "Lemurs and rainforest life at Palmarium / Ankan'ny Nofy",
    scenes: [
      ["Eyes full of wonder", "Golden eyes and a russet ruff make this lemur portrait impossible to forget. Meet Madagascar's forest personalities up close.", "A PORTRAIT OF THE WILD"],
      ["The art of climbing", "With a sure grip on the trunk, a dark-furred lemur reveals the effortless agility of life among the trees.", "TREE-TOP EXPLORER"],
      ["A forest with secrets", "Sunlight filters between slender trunks. Look carefully: movement in the canopy can turn a quiet walk into a discovery.", "INTO THE GREEN"],
      ["A curious pause", "A dark lemur clings to a tree and takes in its surroundings. Sometimes the most unforgettable moment is the stillest one.", "CLOSE TO NATURE"],
      ["Black, white and unforgettable", "A striking black-and-white lemur rests among fresh green leaves — a beautiful glimpse into Madagascar's biodiversity.", "LEMUR ENCOUNTERS"],
      ["Follow the forest canopy", "Look beyond the leaves and up into the branches: the rainforest is a living world waiting to be explored.", "RAINFOREST STORIES"],
      ["A little surprise in the trees", "A long-tailed forest visitor pauses among the trunks. Slow down and notice the tiny details that make the wild so special.", "HIDDEN FOREST LIFE"],
    ],
  },
  fr: {
    previous: "Photo précédente", next: "Photo suivante", pause: "Mettre en pause", play: "Reprendre le diaporama",
    alt: "Lémuriens et forêt tropicale au Palmarium / Ankan'ny Nofy",
    scenes: [
      ["Un regard inoubliable", "Ses yeux dorés et sa fourrure rousse rendent ce portrait de lémurien fascinant. Approchez la personnalité des habitants de la forêt.", "PORTRAIT SAUVAGE"],
      ["L'art de grimper", "Agrippé au tronc, ce lémurien au pelage sombre révèle toute l'agilité de la vie dans les arbres.", "EXPLORATEUR DES ARBRES"],
      ["Une forêt pleine de secrets", "La lumière traverse les arbres élancés. Observez bien : un mouvement dans la canopée peut transformer la promenade en découverte.", "AU CŒUR DU VERT"],
      ["Une pause curieuse", "Un lémurien sombre s'accroche à un arbre et observe son environnement. Les instants les plus calmes sont parfois les plus mémorables.", "AU PLUS PRÈS DE LA NATURE"],
      ["Noir, blanc et remarquable", "Un lémurien noir et blanc se repose parmi les feuilles : un superbe aperçu de la biodiversité malgache.", "RENCONTRE AVEC LES LÉMURIENS"],
      ["Levez les yeux vers la canopée", "Au-delà des feuilles et des branches, la forêt tropicale cache un monde vivant qui ne demande qu'à être découvert.", "HISTOIRES DE FORÊT"],
      ["Une surprise parmi les arbres", "Un discret visiteur à longue queue s'arrête sur les troncs. Prenez le temps d'admirer les détails de la vie sauvage.", "VIE SECRÈTE DE LA FORÊT"],
    ],
  },
  mg: {
    previous: "Sary teo aloha", next: "Sary manaraka", pause: "Ajanona aloha", play: "Tohizana ny sary",
    alt: "Gidro sy zavamananaina anaty ala ao Palmarium / Ankan'ny Nofy",
    scenes: [
      ["Maso mampitolagaga", "Maso mivolombolamena sy volo mena no mampiavaka ity gidro ity. Fantaro akaiky ireo biby miavaka ao anaty ala.", "HAKANTON'NY BIBY"],
      ["Mahay miakatra hazo", "Mifikitra mafy amin'ny vatan-kazo ny gidro mainty, mampiseho ny fahaizany miaina sy mihetsika eny ambony hazo.", "MPITETY HAZO"],
      ["Ala feno zava-miafina", "Mamirapiratra eo anelanelan'ny hazo ny tara-masoandro. Diniho tsara fa mety hahita zavamananaina eny amin'ny rantsana ianao.", "FANTARO NY ALA"],
      ["Fotoana mangina mahavariana", "Mijanona eo amin'ny vatan-kazo ilay gidro ary mandinika ny manodidina. Na fotoana fohy aza dia mety tsy hay hadinoina.", "AKAIKIN'NY NATIORA"],
      ["Mainty sy fotsy, tena miavaka", "Gidro mainty sy fotsy mipetraka eny amin'ny rantsana maitso: iray amin'ireo hakanton'ny zavaboary eto Madagasikara.", "FIHAONANA AMIN'NY GIDRO"],
      ["Jereo eny ambony ravinkazo", "Any ambadiky ny ravina sy ny rantsana no misy tontolo velona, feno zavatra mahavariana azo fantarina.", "TANTARAN'NY ALA"],
      ["Zavaboary miafina eny amin'ny hazo", "Zavamananaina manana rambony lava no hita eo amin'ny hazo. Mijanòna kely hijery ireo antsipirian'ny fiainana anaty ala.", "ZAVA-MIAFIN'NY ALA"],
    ],
  },
};

const CSS = `
.dest-img .palmarium-gallery{position:absolute;inset:0;z-index:1;overflow:hidden;isolation:isolate;background:#193323;color:#fff}
.dest-img .palmarium-gallery .palmarium-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 38%;opacity:0;transform:scale(1.045)!important;filter:none!important;transition:opacity .9s ease,transform 4s linear;pointer-events:none}
.dest-img .palmarium-gallery .palmarium-slide.is-active{opacity:1;transform:scale(1)!important}
.destination-card:hover .dest-img .palmarium-gallery .palmarium-slide{filter:none!important}
.palmarium-shade{position:absolute;inset:0;z-index:2;background:linear-gradient(180deg,transparent 73%,rgba(10,28,20,.44));pointer-events:none}
.palmarium-top-tag{position:absolute;left:14px;bottom:63px;z-index:4;display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(255,255,255,.32);background:rgba(9,39,25,.65);backdrop-filter:blur(7px);padding:7px 11px;border-radius:999px;font-size:9px;letter-spacing:.1em;font-weight:800;color:#f1df9f}
.palmarium-toolbar{position:absolute;bottom:15px;left:13px;right:13px;z-index:6;display:flex;align-items:center;justify-content:space-between;gap:8px}
.palmarium-count{display:inline-block;background:rgba(9,34,23,.76);backdrop-filter:blur(8px);border-radius:999px;padding:8px 12px;color:#fff;font-size:11px;font-weight:800;letter-spacing:.07em;font-variant-numeric:tabular-nums}
.palmarium-actions{display:flex;gap:6px}
.palmarium-actions button{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:rgba(8,32,22,.74);border:1px solid rgba(255,255,255,.64);backdrop-filter:blur(7px);color:#fff;padding:0;cursor:pointer;transition:background .2s,transform .2s}
.palmarium-actions button:hover,.palmarium-actions button:focus-visible{background:#9a743d;transform:translateY(-2px)}
.palmarium-progress{position:absolute;bottom:0;left:0;right:0;z-index:7;height:4px;background:rgba(255,255,255,.27)}
.palmarium-progress span{display:block;width:100%;height:100%;background:linear-gradient(90deg,#d6aa54,#f2dfb1);transform-origin:left;animation:palmarium-fill 4s linear both}
.destination-card .dest-body .palmarium-detail{margin:15px 0 12px;padding:11px 0 11px 14px;border-left:3px solid #bc974f;min-height:156px;animation:palmarium-rise .72s cubic-bezier(.18,.72,.2,1) both}
.destination-card .dest-body .palmarium-detail small{display:block;font-size:9px;letter-spacing:.12em;line-height:1.5;color:var(--gold-600,#ad823a);font-weight:900;margin-bottom:7px}
.destination-card .dest-body .palmarium-detail strong{display:block;font-family:'Cormorant Garamond',serif;font-weight:800;font-size:clamp(21px,1.8vw,26px);line-height:1.08;color:var(--ink,#1c352a)}
.destination-card .dest-body .palmarium-detail p{margin:8px 0 0;font-size:11px;line-height:1.65;color:var(--muted,#50645a)}
@keyframes palmarium-rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes palmarium-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@media(max-width:650px){.destination-card .dest-body .palmarium-detail{min-height:168px}.destination-card .dest-body .palmarium-detail strong{font-size:23px}}
@media(prefers-reduced-motion:reduce){.dest-img .palmarium-gallery .palmarium-slide{transition:none!important;transform:none!important}.palmarium-detail,.palmarium-progress span{animation:none!important}}
`;

export default function PalmariumGallery({ lang = "en", onSceneChange }) {
  const locale = STORIES[lang] || STORIES.en;
  const [images, setImages] = useState(PHOTOS);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = Math.min(index, images.length - 1);
  const photo = images[current];
  const scene = locale.scenes[(photo?.id || 1) - 1] || locale.scenes[0];

  useEffect(() => {
    onSceneChange?.({ id: photo?.id || 1, kicker: scene[2], title: scene[0], description: scene[1] });
  }, [photo?.id, lang, onSceneChange]);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setTimeout(() => setIndex(i => (i + 1) % images.length), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const upcoming = new Image();
    upcoming.src = images[(current + 1) % images.length].src;
  }, [current, images]);

  function handleError(src) {
    if (src === FALLBACK) return;
    setImages(existing => {
      const available = existing.filter(item => item.src !== src);
      return available.length ? available : [{ id: 1, src: FALLBACK }];
    });
    setIndex(0);
  }

  const move = offset => setIndex(i => (i + offset + images.length) % images.length);
  return (
    <div className="palmarium-gallery" role="region" aria-roledescription="carousel" aria-label={locale.alt}>
      <style>{CSS}</style>
      {images.map((item, i) => (
        <img key={item.src} src={item.src}
          alt={i === current ? scene[0] : ""} aria-hidden={i !== current}
          className={`palmarium-slide${i === current ? " is-active" : ""}`}
          decoding="async" loading={i < 2 ? "eager" : "lazy"}
          onError={() => handleError(item.src)} />
      ))}
      <div className="palmarium-shade" aria-hidden="true" />
      <span className="palmarium-top-tag"><Leaf size={12} /> PALMARIUM · WILDLIFE</span>
      {images.length > 1 && (
        <>
          <div className="palmarium-toolbar">
            <span className="palmarium-count">{String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
            <div className="palmarium-actions">
              <button type="button" onClick={() => move(-1)} aria-label={locale.previous}><ArrowLeft size={16} /></button>
              <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? locale.play : locale.pause}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
              <button type="button" onClick={() => move(1)} aria-label={locale.next}><ArrowRight size={16} /></button>
            </div>
          </div>
          {!paused && <div className="palmarium-progress" aria-hidden="true"><span key={photo?.src || "fallback"} /></div>}
        </>
      )}
    </div>
  );
}