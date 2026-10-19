import React, { useEffect, useState } from "react";
import { gallerySceneFor } from "./destinationGalleryLocales.js";
import { ArrowLeft, ArrowRight, Pause, Play, Leaf } from "lucide-react";

// Five original wildlife photographs provided for the Tsingy destination.
const PHOTOS = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  src: `/images/tsingy-gallery/tsingy${index + 1}.avif`,
}));
const FALLBACK = "/images/Bemaraha.jpeg";
const INTERVAL = 4000;
const CONTENT = {
  en: {
    alt: "Wildlife discovery in the Tsingy de Bemaraha landscape",
    previous: "Previous wildlife photo",
    next: "Next wildlife photo",
    pause: "Pause slideshow",
    play: "Resume slideshow",
    tag: "WILDLIFE FIELD NOTES",
    scenes: [
      ["Life hidden among the rocks", "Look closer: even the rugged limestone world holds extraordinary details waiting to be discovered.", "THE ART OF EXPLORATION"],
      ["Nature's masters of camouflage", "In the forest, the smallest movements can reveal a surprising world of wildlife.", "HIDDEN WONDERS"],
      ["An encounter to remember", "Slow down, lift your eyes and experience the magic of observing wildlife among the trees.", "WILDLIFE DISCOVERY"],
      ["Curiosity in the canopy", "Every watchful gaze is a reminder that the forest is full of life and untold stories.", "FOREST ENCOUNTERS"],
      ["Every branch tells a story", "Listen, look and be amazed by the subtle beauty of Madagascar's remarkable natural world.", "NATURE'S DETAILS"],
    ],
  },
  fr: {
    alt: "Découverte de la faune dans la région des Tsingy de Bemaraha",
    previous: "Photo précédente",
    next: "Photo suivante",
    pause: "Mettre en pause",
    play: "Reprendre le diaporama",
    tag: "CARNET DE FAUNE SAUVAGE",
    scenes: [
      ["Une vie cachée dans les rochers", "Regardez de plus près : même le monde minéral des tsingy recèle des trésors inattendus.", "L'ART D'EXPLORER"],
      ["Les maîtres du camouflage", "En forêt, le moindre mouvement peut révéler un monde sauvage surprenant.", "MERVEILLES DISCRÈTES"],
      ["Une rencontre inoubliable", "Ralentissez, levez les yeux et savourez la magie d'observer la faune dans les arbres.", "DÉCOUVERTE DE LA FAUNE"],
      ["La curiosité dans les arbres", "Chaque regard attentif rappelle que la forêt abrite une vie riche en histoires.", "RENCONTRES EN FORÊT"],
      ["Chaque branche a son histoire", "Écoutez, observez et laissez-vous émerveiller par les détails de la nature malgache.", "DÉTAILS DE LA NATURE"],
    ],
  },
  mg: {
    alt: "Fahitana biby sy natiora ao amin'ny faritr'i Tsingy de Bemaraha",
    previous: "Sary teo aloha",
    next: "Sary manaraka",
    pause: "Ajanona aloha",
    play: "Tohizana ny sary",
    tag: "BIBY SY NATIORA",
    scenes: [
      ["Fiainana miafina eny anaty vato", "Diniho akaiky: na dia ny vatolampy aza dia misy zava-mahatalanjona tokony ho fantarina.", "FITADIAVANA ZAVA-BAOVAO"],
      ["Mahay miafina ao anaty natiora", "Fihetsika kely eny an'ala dia mety hampiseho biby sy zava-mahavariana tsy ampoizina.", "ZAVA-MIAFIN'NY ALA"],
      ["Fihaonana tsy hay hadinoina", "Mijanòna kely, miandrèna ary ankafizo ny fahitana biby miaina eny amin'ny hazo.", "FANTARO NY BIBY"],
      ["Maso feno fahalianana eny ambony hazo", "Ny fijery iray dia mampahatsiahy fa feno fiainana sy tantara ny ala.", "FIHAONANA ANATY ALA"],
      ["Samy manana tantara ny sampan-kazo", "Mihainoa, mandiniha ary gaga amin'ireo antsipirian'ny natiora eto Madagasikara.", "HAKANTON'NY NATIORA"],
    ],
  },
};

const CSS = `
.dest-img .tsingy-gallery{position:absolute;inset:0;z-index:1;overflow:hidden;isolation:isolate;background:#26392c;color:#fff}
.dest-img .tsingy-gallery .tsingy-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 48%;opacity:0;filter:none!important;transform:scale(1.055)!important;transition:opacity .95s ease,transform 4s linear;pointer-events:none}
.dest-img .tsingy-gallery .tsingy-slide.is-active{opacity:1;transform:scale(1)!important}
.destination-card:hover .dest-img .tsingy-gallery .tsingy-slide{filter:none!important}
.tsingy-shade{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,transparent 61%,rgba(8,22,18,.28) 100%);pointer-events:none}
.tsingy-photo-tag{position:absolute;left:14px;bottom:62px;z-index:2;display:inline-flex;align-items:center;gap:6px;padding:6px 9px;border:1px solid rgba(255,255,255,.25);border-radius:8px;background:rgba(9,28,22,.59);backdrop-filter:blur(6px);color:#f9ecc8;font-size:9px;letter-spacing:.08em;font-weight:800;text-shadow:0 1px 8px rgba(0,0,0,.4)}
.tsingy-toolbar{position:absolute;left:13px;right:13px;bottom:15px;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:7px}
.tsingy-count{padding:7px 10px;border-radius:8px;background:rgba(8,27,22,.76);backdrop-filter:blur(6px);font-size:11px;font-weight:800;color:#fff;letter-spacing:.11em;font-variant-numeric:tabular-nums}
.tsingy-actions{display:flex;gap:6px}
.tsingy-actions button{display:grid;place-items:center;width:33px;height:33px;padding:0;color:#fff;background:rgba(8,27,22,.74);border:1px solid rgba(255,255,255,.66);border-radius:10px;backdrop-filter:blur(6px);cursor:pointer;transition:background .2s,border-color .2s}
.tsingy-actions button:hover,.tsingy-actions button:focus-visible{background:#936f38;border-color:#ffe3a5}
.tsingy-progress{position:absolute;left:0;right:0;bottom:0;z-index:5;height:4px;background:rgba(255,255,255,.24)}
.tsingy-progress span{display:block;width:100%;height:100%;background:#e9c16c;transform-origin:left;animation:tsingy-progress-animation 4s linear both}
.destination-card .dest-body .tsingy-detail{min-height:132px;padding-left:13px;margin:15px 0 10px;border-left:3px solid #c29a4e;animation:tsingy-caption-in .7s cubic-bezier(.18,.65,.22,1) both}
.destination-card .dest-body .tsingy-detail small{display:block;margin:0 0 7px;color:var(--gold-600,#b38137);font-size:9px;letter-spacing:.11em;line-height:1.4;font-weight:900}
.destination-card .dest-body .tsingy-detail strong{display:block;color:var(--ink,#1a342c);font:800 clamp(19px,1.8vw,24px)/1.12 'Cormorant Garamond',serif}
.destination-card .dest-body .tsingy-detail p{margin:8px 0 0;color:var(--muted,#526455);font-size:11px;line-height:1.6}
@keyframes tsingy-caption-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes tsingy-progress-animation{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@media(max-width:650px){.destination-card .dest-body .tsingy-detail{min-height:126px}.destination-card .dest-body .tsingy-detail strong{font-size:22px}}
@media(prefers-reduced-motion:reduce){.dest-img .tsingy-gallery .tsingy-slide{transition:none!important;transform:none!important}.tsingy-detail,.tsingy-progress span{animation:none!important}}
`;

export default function TsingyGallery({ lang = "en", onSceneChange }) {
  const t = CONTENT[lang] || CONTENT.en;
  const [images, setImages] = useState(PHOTOS);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = Math.min(index, images.length - 1);
  const photo = images[current];
  const sceneIndex = (photo?.id || 1) - 1;
  const scene = gallerySceneFor("tsingy", lang, sceneIndex, t.scenes[sceneIndex] || t.scenes[0]);

  useEffect(() => {
    onSceneChange?.({ id: photo?.id || 1, kicker: scene[2], title: scene[0], description: scene[1] });
  }, [photo?.id, lang, onSceneChange]);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setTimeout(() => setIndex(i => (i + 1) % images.length), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [index, paused, images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const preload = new Image();
    preload.src = images[(current + 1) % images.length].src;
  }, [current, images]);

  function handleError(src) {
    if (src === FALLBACK) return;
    setImages(previous => {
      const available = previous.filter(image => image.src !== src);
      return available.length > 0 ? available : [{ id: 1, src: FALLBACK }];
    });
    setIndex(0);
  }

  const move = direction => setIndex(i => (i + direction + images.length) % images.length);
  return (
    <div className="tsingy-gallery" role="region" aria-roledescription="carousel" aria-label={t.alt}>
      <style>{CSS}</style>
      {images.map((item, i) => (
        <img key={item.src} src={item.src}
          className={`tsingy-slide${i === current ? " is-active" : ""}`}
          alt={i === current ? scene[0] : ""} aria-hidden={i !== current}
          loading={i < 2 ? "eager" : "lazy"} decoding="async" onError={() => handleError(item.src)} />
      ))}
      <div className="tsingy-shade" aria-hidden="true" />
      <span className="tsingy-photo-tag"><Leaf size={12}/>{t.tag}</span>
      {images.length > 1 && <>
        <div className="tsingy-toolbar">
          <span className="tsingy-count">{String(current + 1).padStart(2,"0")} / {String(images.length).padStart(2,"0")}</span>
          <div className="tsingy-actions">
            <button type="button" onClick={() => move(-1)} aria-label={t.previous}><ArrowLeft size={16}/></button>
            <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? t.play : t.pause} aria-pressed={paused}>{paused ? <Play size={15}/> : <Pause size={15}/>}</button>
            <button type="button" onClick={() => move(1)} aria-label={t.next}><ArrowRight size={16}/></button>
          </div>
        </div>
        {!paused && <div className="tsingy-progress" aria-hidden="true"><span key={`${photo?.src}-${lang}`} /></div>}
      </>}
    </div>
  );
}