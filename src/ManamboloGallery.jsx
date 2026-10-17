import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

const PHOTOS = Array.from({ length: 10 }, (_, i) => `/images/manambolo/manambolo${i + 1}.jpeg`);
const FALLBACK = "/images/Manambolo.jpg";

const COPY = {
  en: {
    previous: "Previous photo",
    next: "Next photo",
    pause: "Pause slideshow",
    play: "Resume slideshow",
    slides: [
      ["A river carved by time", "Discover the dramatic beauty of the Manambolo Gorge.", "MANAMBOLO GORGE"],
      ["The gorge opens up", "Find breathtaking river views framed by ancient rock.", "PIROGUE EXPERIENCE"],
      ["A river of possibilities", "Let the forest-lined waterway set the pace of your adventure.", "WILD LANDSCAPES"],
      ["Crossing into adventure", "See how everyday journeys unfold along the river.", "DISCOVER THE GORGE"],
      ["The river connects us", "Discover the people and crossings that bring the region together.", "AUTHENTIC MADAGASCAR"],
      ["Life on the water", "Travel, community and magnificent scenery in a single frame.", "NATURE ESCAPE"],
      ["A quieter route", "Follow the calm waters between towering gorge walls.", "PHOTO SPOT"],
      ["The way through the gorge", "Traditional canoes invite you to explore the scenery.", "RIVER ADVENTURE"],
      ["Meet the riverside community", "Discover the human stories behind every crossing.", "LOCAL LIFE"],
      ["Nature in flight", "Watch river birds transform the landscape into a living postcard.", "TRAVEL WITH HERY"],
    ],
  },
  fr: {
    previous: "Photo précédente",
    next: "Photo suivante",
    pause: "Mettre en pause",
    play: "Reprendre le diaporama",
    slides: [
      ["Une rivière sculptée par le temps", "Découvrez la beauté spectaculaire des gorges du Manambolo.", "GORGES DU MANAMBOLO"],
      ["Les gorges s’ouvrent à vous", "Admirez la rivière encadrée par d’anciennes falaises.", "EXPÉRIENCE EN PIROGUE"],
      ["Une rivière de découvertes", "Laissez les paysages forestiers rythmer votre aventure.", "PAYSAGES SAUVAGES"],
      ["Une traversée authentique", "Découvrez le quotidien des voyageurs sur le fleuve.", "DÉCOUVERTE DES GORGES"],
      ["La rivière relie les hommes", "Rencontrez la vie des communautés au fil de l’eau.", "MADAGASCAR AUTHENTIQUE"],
      ["La vie sur le fleuve", "Voyages, rencontres et panoramas sur l’eau.", "ÉVASION NATURE"],
      ["Au fil des eaux paisibles", "Glissez entre les parois rocheuses spectaculaires.", "SPOT PHOTO"],
      ["Le passage des gorges", "Admirez les pirogues traditionnelles dans un décor magique.", "AVENTURE FLUVIALE"],
      ["Rencontrez la vie riveraine", "Découvrez l’histoire humaine derrière chaque traversée.", "VIE LOCALE"],
      ["La nature prend son envol", "Admirez les oiseaux du fleuve au cœur du paysage.", "VOYAGER AVEC HERY"],
    ],
  },
  mg: {
    previous: "Sary teo aloha",
    next: "Sary manaraka",
    pause: "Ajanona",
    play: "Tohizana",
    slides: [
      ["Renirano nosokirin'ny fotoana", "Fantaro ny hakanton'ny lohasahan'i Manambolo.", "LOHASAHAN'I MANAMBOLO"],
      ["Misokatra ny lohasaha", "Ankafizo ny renirano eo anelanelan’ny harambato.", "DIA ANATY PIROGUE"],
      ["Renirano feno zava-baovao", "Ankafizo ny rano sy ny alan’ny faritra andrefana.", "TOERANA VOAJANAHARY"],
      ["Fiampitana miavaka", "Fantaro ny fiainan’ny olona eny amoron-drano.", "FITSIDIHANA NY LOHASAHA"],
      ["Mampifandray olona ny renirano", "Jereo ny dia sy ny fihaonan’ny olona eny an-drano.", "MADAGASIKARA TENA IZY"],
      ["Fiainana anaty rano", "Fiampitana sy tontolo mahavariana miaraka.", "FIALAN-TSASATRA ANATY NATIORA"],
      ["Lalan-drano tony", "Mandehana eo anelanelan’ny harambato manaitra.", "TOERANA TSARA ALAINA SARY"],
      ["Famakivakiana ny lohasaha", "Jereo ireo lakana nentim-paharazana sy ny hatsaran’ny renirano.", "DIA ANATY RANO"],
      ["Fiainan’ny olona eny amoron-drano", "Fantaro ny tantara ao ambadiky ny fiampitana.", "FIAINANA AMORON-DRANO"],
      ["Mamela soritra ny natiora", "Jereo ireo vorona manidina eo ambonin’ny renirano.", "MIARAKA AMIN'I HERY"],
    ],
  },
};

const CSS = [
  ".dest-img .manambolo-gallery{position:absolute;inset:0;overflow:hidden;isolation:isolate;background:#173027;color:#fff}",
  ".dest-img .manambolo-gallery .manambolo-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1);transition:opacity .95s ease;pointer-events:none}",
  ".dest-img .manambolo-gallery .manambolo-slide.active{opacity:1;animation:manambolo-zoom 4s ease-out both}",
  "@keyframes manambolo-zoom{from{transform:scale(1)}to{transform:scale(1.07)}}",
  ".dest-img .manambolo-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,transparent 28%,rgba(10,18,16,.16) 48%,rgba(8,16,14,.88) 100%);pointer-events:none}",
  ".dest-img .manambolo-caption{position:absolute;left:14px;right:14px;bottom:55px;z-index:3;text-shadow:0 2px 10px rgba(0,0,0,.55);pointer-events:none;animation:manambolo-rise .55s ease both}",
  ".dest-img .manambolo-caption small{display:block;color:#f0d89f;font-size:9px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;margin:0 0 5px}",
  ".dest-img .manambolo-caption strong{display:block;font-size:16px;line-height:1.22;font-weight:800;max-width:270px}",
  ".dest-img .manambolo-caption p{font-size:11px;line-height:1.38;margin:5px 0 0;color:#fff;max-width:280px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}",
  "@keyframes manambolo-rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}",
  ".dest-img .manambolo-controls{position:absolute;bottom:13px;left:12px;right:12px;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:6px}",
  ".dest-img .manambolo-counter{padding:7px 10px;border-radius:999px;background:rgba(7,18,15,.65);font-size:11px;color:#fff;font-weight:800;backdrop-filter:blur(8px)}",
  ".dest-img .manambolo-buttons{display:flex;gap:5px}",
  ".dest-img .manambolo-buttons button{display:grid;place-items:center;width:31px;height:31px;border:1px solid rgba(255,255,255,.5);border-radius:50%;background:rgba(12,27,21,.69);color:#fff;cursor:pointer;padding:0;backdrop-filter:blur(6px)}",
  ".dest-img .manambolo-buttons button:hover,.dest-img .manambolo-buttons button:focus-visible{background:#7b6a44}",
  ".dest-img .manambolo-timer{position:absolute;bottom:0;left:0;right:0;height:3px;z-index:5;background:rgba(255,255,255,.25)}",
  ".dest-img .manambolo-timer>span{display:block;width:100%;height:100%;background:#d2b471;transform-origin:left;animation:manambolo-fill 4s linear both}",
  "@keyframes manambolo-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}",
  "@media(prefers-reduced-motion:reduce){.dest-img .manambolo-gallery .manambolo-slide.active,.dest-img .manambolo-caption{animation:none}.dest-img .manambolo-gallery .manambolo-slide{transition:none}}",
].join("\n");

export default function ManamboloGallery({ lang = "en" }) {
  const [images, setImages] = useState(PHOTOS);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const locale = COPY[lang] || COPY.en;
  const number = Number((images[current] || "").match(/manambolo(\d+)\.jpeg/)?.[1] || 1);
  const info = locale.slides[number - 1] || locale.slides[0];

  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setTimeout(() => setCurrent((i) => (i + 1) % images.length), 4000);
    return () => window.clearTimeout(timer);
  }, [current, paused, images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const preload = new Image();
    preload.src = images[(current + 1) % images.length];
  }, [current, images]);

  const step = (direction) => setCurrent((i) => (i + direction + images.length) % images.length);

  const handleError = (src) => {
    if (src === FALLBACK) return;
    setImages((old) => {
      const remaining = old.filter((item) => item !== src);
      return remaining.length ? remaining : [FALLBACK];
    });
    setCurrent(0);
  };

  return (
    <div className="manambolo-gallery" role="region" aria-roledescription="carousel" aria-label="Manambolo River and Gorge photo carousel">
      <style>{CSS}</style>
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={index === current ? `${info[0]} — Manambolo River` : ""}
          aria-hidden={index !== current}
          decoding="async"
          loading={index < 2 ? "eager" : "lazy"}
          className={"manambolo-slide" + (index === current ? " active" : "")}
          onError={() => handleError(src)}
        />
      ))}
      <div className="manambolo-overlay" aria-hidden="true" />
      <div className="manambolo-caption" key={`${current}-${lang}`}>
        <small>{info[2]}</small>
        <strong>{info[0]}</strong>
        <p>{info[1]}</p>
      </div>
      <div className="manambolo-controls">
        <span className="manambolo-counter">{String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
        <div className="manambolo-buttons">
          <button type="button" onClick={() => step(-1)} aria-label={locale.previous}><ArrowLeft size={15} /></button>
          <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? locale.play : locale.pause}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
          <button type="button" onClick={() => step(1)} aria-label={locale.next}><ArrowRight size={15} /></button>
        </div>
      </div>
      <div className="manambolo-timer" aria-hidden="true">{!paused && <span key={`${current}-${paused}`} />}</div>
    </div>
  );
}
