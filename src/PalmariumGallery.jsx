import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

const PHOTOS = Array.from({ length: 10 }, (_, i) => "/images/palmarium/palmarium" + (i + 1) + ".jpeg");
const FALLBACK = "/images/Palmarium.jpg";
const COPY = {
  en: {
    previous: "Previous photo", next: "Next photo", pause: "Pause slideshow", play: "Resume slideshow",
    slides: [
      ["A world beyond the ordinary", "Meet the lemurs of Madagascar's green eastern forests.", "PALMARIUM · ANKAN'NY NOFY"],
      ["Eyes full of curiosity", "Every forest encounter has a story to tell.", "WILDLIFE ENCOUNTERS"],
      ["A moment to remember", "Get closer to Madagascar's fascinating natural world.", "LEMUR DISCOVERY"],
      ["Life among the branches", "Discover the playful spirit of the treetops.", "NATURE & WILDLIFE"],
      ["Nature brings us together", "Create special memories surrounded by forest life.", "FOREST EXPERIENCES"],
      ["Discover their wild side", "Unforgettable wildlife moments await your camera.", "MADAGASCAR WILDLIFE"],
      ["Into the green canopy", "Slow down, look up and enjoy the forest.", "EASTERN MADAGASCAR"],
      ["An enchanting encounter", "Be amazed by the expressions of Madagascar's lemurs.", "LEMUR DISCOVERY"],
      ["Every glance is a memory", "Let the magic of wildlife surprise you.", "NATURE CLOSE-UP"],
      ["Your next story starts here", "Explore an unforgettable escape with HERY as your guide.", "DISCOVER WITH HERY"]
    ]
  },
  fr: {
    previous: "Photo précédente", next: "Photo suivante", pause: "Mettre en pause", play: "Reprendre le diaporama",
    slides: [
      ["Un monde à part", "Rencontrez les lémuriens des forêts verdoyantes de l'Est.", "PALMARIUM · ANKAN'NY NOFY"],
      ["Des regards curieux", "Chaque rencontre en forêt raconte une histoire.", "RENCONTRES SAUVAGES"],
      ["Un instant inoubliable", "Approchez la nature fascinante de Madagascar.", "DÉCOUVERTE DES LÉMURIENS"],
      ["La vie dans les branches", "Découvrez l'énergie des habitants de la canopée.", "NATURE & FAUNE"],
      ["La nature nous rassemble", "Créez des souvenirs uniques au cœur de la forêt.", "EXPÉRIENCE EN FORÊT"],
      ["Découvrez leur côté sauvage", "Vivez des instants qui méritent une photo.", "FAUNE DE MADAGASCAR"],
      ["Au cœur de la canopée", "Prenez le temps de contempler la forêt tropicale.", "EST DE MADAGASCAR"],
      ["Une rencontre magique", "Laissez-vous émerveiller par ces lémuriens expressifs.", "RENCONTRES AVEC LES LÉMURIENS"],
      ["Un regard, un souvenir", "La vie sauvage vous réserve de belles surprises.", "NATURE EN GROS PLAN"],
      ["Votre aventure commence ici", "Explorez autrement avec HERY, votre guide local.", "DÉCOUVREZ AVEC HERY"]
    ]
  },
  mg: {
    previous: "Sary teo aloha", next: "Sary manaraka", pause: "Ajanona", play: "Tohizana",
    slides: [
      ["Tontolo hafa mihitsy", "Hihaona amin'ireo gidro mahavariana any Atsinanana.", "PALMARIUM · ANKAN'NY NOFY"],
      ["Maso feno fahalianana", "Samy manana ny tantarany ny fihaonana anaty ala.", "ZAVABOARY"],
      ["Fotoana tsy hay hadinoina", "Fantaro akaiky ny natiora mampiavaka an'i Madagasikara.", "FANTARO NY GIDRO"],
      ["Fiainana eny an-tampon-kazo", "Ankafizo ireo fihetsika mahafinaritra eny an'ala.", "NATIORA SY BIBY"],
      ["Mampiray antsika ny natiora", "Mamoròna fahatsiarovana miavaka anaty ala.", "FITSIKIHANA NY ALA"],
      ["Hakitroky ny fiainana", "Misy fotoana mahafinaritra mendrika horaketina an-tsary.", "BIBY ETO MADAGASIKARA"],
      ["Mitsangàna, jereo ny ala", "Ankafizo am-pilaminana ny hakanton'ny natiora.", "ATSINANAN'I MADAGASIKARA"],
      ["Fihaonana mahavariana", "Jereo akaiky ireo endrika mampiavaka ny gidro.", "FANTARO NY GIDRO"],
      ["Fijery iray, fahatsiarovana", "Mahagaga foana ny fiainan'ny biby anaty ala.", "NATIORA AKAiKY"],
      ["Eto no manomboka ny dianao", "HERY no hitarika anao hahita zava-baovao.", "MIARAKA AMIN'I HERY"]
    ]
  }
};
const CSS = [
  ".dest-img .palmarium-gallery{position:absolute;inset:0;overflow:hidden;isolation:isolate;background:#132c24;color:#fff}",
  ".dest-img .palmarium-gallery .palmarium-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1);filter:none;transition:opacity .95s ease;pointer-events:none}",
  ".dest-img .palmarium-gallery .palmarium-slide.active{opacity:1;animation:palmarium-zoom 4s ease-out both}",
  ".destination-card:hover .dest-img .palmarium-gallery .palmarium-slide{filter:none}",
  "@keyframes palmarium-zoom{from{transform:scale(1)}to{transform:scale(1.07)}}",
  ".dest-img .palmarium-gradient{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,transparent 27%,rgba(7,18,12,.08) 45%,rgba(5,18,15,.85) 100%);pointer-events:none}",
  ".dest-img .palmarium-caption{position:absolute;left:14px;right:14px;bottom:55px;z-index:3;text-shadow:0 2px 10px rgba(0,0,0,.55);pointer-events:none;animation:palmarium-rise .55s ease both}",
  ".dest-img .palmarium-caption small{display:block;color:#f0dba2;font-size:9px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;margin:0 0 5px}",
  ".dest-img .palmarium-caption strong{display:block;font-size:16px;line-height:1.22;font-weight:800;max-width:265px}",
  ".dest-img .palmarium-caption p{font-size:11px;line-height:1.4;margin:5px 0 0;color:#fff;max-width:275px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}",
  "@keyframes palmarium-rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}",
  ".dest-img .palmarium-controls{position:absolute;bottom:13px;left:12px;right:12px;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:6px}",
  ".dest-img .palmarium-counter{padding:7px 10px;border-radius:999px;background:rgba(7,18,15,.65);font-size:11px;color:#fff;font-weight:800;backdrop-filter:blur(8px)}",
  ".dest-img .palmarium-buttons{display:flex;gap:5px}",
  ".dest-img .palmarium-buttons button{display:grid;place-items:center;width:31px;height:31px;border:1px solid rgba(255,255,255,.5);border-radius:50%;background:rgba(12,27,21,.69);color:#fff;cursor:pointer;padding:0;backdrop-filter:blur(6px)}",
  ".dest-img .palmarium-buttons button:hover,.dest-img .palmarium-buttons button:focus-visible{background:#627e55}",
  ".dest-img .palmarium-timer{position:absolute;bottom:0;left:0;right:0;height:3px;z-index:5;background:rgba(255,255,255,.25)}",
  ".dest-img .palmarium-timer>span{display:block;width:100%;height:100%;background:#d9bb7d;transform-origin:left;animation:palmarium-fill 4s linear both}",
  "@keyframes palmarium-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}",
  "@media(prefers-reduced-motion:reduce){.dest-img .palmarium-gallery .palmarium-slide.active,.dest-img .palmarium-caption{animation:none}.dest-img .palmarium-gallery .palmarium-slide{transition:none}}"
].join("\n");

export default function PalmariumGallery({ lang = "en" }) {
  const [images, setImages] = useState(PHOTOS);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const locale = COPY[lang] || COPY.en;
  const number = Number((images[current] || "").match(/palmarium(\d+)\.jpeg/)?.[1] || 1);
  const info = locale.slides[number - 1] || locale.slides[0];

  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setTimeout(() => setCurrent(i => (i + 1) % images.length), 4000);
    return () => window.clearTimeout(timer);
  }, [current, paused, images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const preload = new Image();
    preload.src = images[(current + 1) % images.length];
  }, [current, images]);

  const step = (direction) => setCurrent(i => (i + direction + images.length) % images.length);
  const handleError = (src) => {
    if (src === FALLBACK) return;
    setImages(old => {
      const remaining = old.filter(item => item !== src);
      return remaining.length ? remaining : [FALLBACK];
    });
    setCurrent(0);
  };

  return <div className="palmarium-gallery" role="region" aria-roledescription="carousel" aria-label="Palmarium Ankan'ny Nofy wildlife photo carousel">
    <style>{CSS}</style>
    {images.map((src, index) =>
      <img key={src} src={src} alt={index === current ? info[0] + " — Madagascar" : ""}
        aria-hidden={index !== current} decoding="async" loading={index < 2 ? "eager" : "lazy"}
        className={"palmarium-slide" + (index === current ? " active" : "")}
        onError={() => handleError(src)} />
    )}
    <div className="palmarium-gradient" aria-hidden="true" />
    <div className="palmarium-caption" key={current + "-" + lang}>
      <small>{info[2]}</small><strong>{info[0]}</strong><p>{info[1]}</p>
    </div>
    <div className="palmarium-controls">
      <span className="palmarium-counter">{String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
      <div className="palmarium-buttons">
        <button type="button" onClick={() => step(-1)} aria-label={locale.previous}><ArrowLeft size={15} /></button>
        <button type="button" onClick={() => setPaused(p => !p)} aria-label={paused ? locale.play : locale.pause}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
        <button type="button" onClick={() => step(1)} aria-label={locale.next}><ArrowRight size={15} /></button>
      </div>
    </div>
    <div className="palmarium-timer" aria-hidden="true">
      {!paused && <span key={current + "-" + paused} />}
    </div>
  </div>;
}
