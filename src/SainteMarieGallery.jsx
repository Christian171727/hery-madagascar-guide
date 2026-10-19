import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { translateSiteRecord } from "./siteTranslationExtras.js";

// Six owner-provided Sainte Marie photographs, compressed for faster loading.
const PHOTOS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  src: `/images/sainte-marie/saintmarie${i + 1}.avif?v=20261019b`,
}));
const FALLBACK = "/images/SainteMarie.jpg";
const DELAY = 4000;

const COPY = {
  en: {
    previous: "Previous photo", next: "Next photo",
    pause: "Pause slideshow", play: "Resume slideshow",
    scenes: [
      ["Blue horizons of Sainte Marie", "Crystal-clear water, island light and a peaceful horizon invite you to begin your coastal escape.", "ISLAND HORIZONS"],
      ["Crossing the lagoon together", "Shared boat journeys reveal the living rhythm of Sainte Marie and the beauty of travelling close to the sea.", "COASTAL JOURNEY"],
      ["Walk where coast and culture meet", "Follow simple paths, meet local life and discover the island beyond the postcard.", "CULTURE & COAST"],
      ["Beauty in every simple moment", "Along the shore, every stop becomes a quiet discovery shaped by nature, people and the ocean breeze.", "CULTURE & COAST"],
      ["Observe, listen and feel the place", "Meaningful travel begins with attention: mangroves, local stories and the gentle pace of island life.", "LIVING NATURE"],
      ["Gardens, palms and island atmosphere", "Tropical scenery, warm encounters and peaceful surroundings turn Sainte Marie into a memory that stays with you.", "ISLAND SERENITY"],
    ],
  },
  fr: {
    previous: "Photo précédente", next: "Photo suivante",
    pause: "Mettre en pause", play: "Reprendre le diaporama",
    scenes: [
      ["Les horizons bleus de Sainte-Marie", "Une eau limpide, la lumière de l’île et un horizon paisible vous invitent à commencer votre escapade côtière.", "HORIZONS INSULAIRES"],
      ["Traverser le lagon ensemble", "Les trajets en bateau révèlent le rythme vivant de Sainte-Marie et la beauté d’un voyage au plus près de la mer.", "VOYAGE CÔTIER"],
      ["Marchez là où la côte rencontre la culture", "Suivez des chemins simples, rencontrez la vie locale et découvrez l’île au-delà de la carte postale.", "CULTURE & LITTORAL"],
      ["La beauté dans chaque instant simple", "Le long du rivage, chaque arrêt devient une découverte paisible façonnée par la nature, les habitants et l’air marin.", "CULTURE & LITTORAL"],
      ["Observer, écouter et ressentir le lieu", "Un voyage authentique commence par l’attention : mangroves, récits locaux et douceur de la vie insulaire.", "NATURE VIVANTE"],
      ["Jardins, palmiers et ambiance insulaire", "Paysages tropicaux, rencontres chaleureuses et atmosphère paisible font de Sainte-Marie un souvenir durable.", "SÉRÉNITÉ INSULAIRE"],
    ],
  },
  mg: {
    previous: "Sary teo aloha", next: "Sary manaraka",
    pause: "Ajanona aloha", play: "Tohizana ny sary",
    scenes: [
      ["Ny faravodilanitra manga ao Sainte-Marie", "Rano mangamanga madio, hazavan’ny nosy ary faravodilanitra milamina no manasa anao hanomboka ny fitsidihanao.", "HAKANTON'NY NOSY"],
      ["Miampita lakandrano miaraka", "Ny dia an-tsambo no mampiseho ny gadon’ny fiainana ao Sainte-Marie sy ny hakanton’ny fitsangatsanganana akaikin’ny ranomasina.", "DIA AMORON-DRANOMASINA"],
      ["Mandehana eo anelanelan’ny morontsiraka sy ny kolontsaina", "Araho ireo lalana tsotra, mihaona amin’ny mponina ary fantaro ny nosy mihoatra noho ny sary mahazatra.", "KOLONTSAINA & MORONTSIRAKA"],
      ["Ny hakantony ao anatin’ny fotoana tsotra rehetra", "Eo amoron-dranomasina, ny fijanonana tsirairay dia lasa fahitana milamina, miaraka amin’ny natiora, ny olona ary ny rivotra an-dranomasina.", "KOLONTSAINA & MORONTSIRAKA"],
      ["Jereo, henoy ary tsapao ny toerana", "Ny dia tena misy heviny dia manomboka amin’ny fijerena akaiky: ala honko, tantara eo an-toerana ary fiainana milamina ao amin’ny nosy.", "NATIORA VELONA"],
      ["Zaridaina, rofia ary hakanton’ny nosy", "Tontolo tropikaly, fihaonana mahafinaritra ary filaminana no mahatonga an’i Sainte-Marie ho fahatsiarovana maharitra.", "FIADANANA AO AMIN'NY NOSY"],
    ],
  },
};

const CSS = `
.dest-img .sainte-marie-gallery{position:absolute;inset:0;z-index:1;overflow:hidden;isolation:isolate;background:#183345;color:#fff}
.dest-img .sainte-marie-gallery .sainte-marie-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1)!important;filter:none!important;transition:opacity .8s ease;pointer-events:none}
.dest-img .sainte-marie-gallery .sainte-marie-slide.is-active{opacity:1}
.destination-card:hover .dest-img .sainte-marie-gallery .sainte-marie-slide{filter:none!important;transform:scale(1)!important}
.sainte-marie-shade{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,transparent 58%,rgba(3,20,30,.10) 81%,rgba(3,20,30,.37) 100%);pointer-events:none}
.destination-card .dest-body .sainte-marie-detail{min-height:128px;margin:14px 0 12px;animation:sainte-marie-rise .65s cubic-bezier(.2,.7,.2,1) both}
.destination-card .dest-body .sainte-marie-detail small{display:block;color:var(--gold-600,#b98235);font-size:9px;letter-spacing:.12em;font-weight:900;text-transform:uppercase;margin-bottom:6px}
.destination-card .dest-body .sainte-marie-detail strong{display:block;font-family:'Cormorant Garamond',serif;font-size:clamp(20px,1.75vw,25px);line-height:1.13;color:var(--ink,#1e3953);font-weight:800}
.destination-card .dest-body .sainte-marie-detail p{margin:8px 0 0;color:var(--muted,#576b80);font-size:11px;line-height:1.6;max-width:32ch}
@keyframes sainte-marie-rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.sainte-marie-toolbar{position:absolute;left:12px;right:12px;bottom:15px;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:8px}
.sainte-marie-counter{display:inline-flex;align-items:center;padding:7px 10px;border-radius:999px;background:rgba(2,17,25,.66);color:#fff;font-size:11px;font-weight:800;letter-spacing:.07em;backdrop-filter:blur(7px)}
.sainte-marie-actions{display:flex;gap:5px}
.sainte-marie-actions button{display:grid;place-items:center;width:33px;height:33px;padding:0;color:#fff;border:1px solid rgba(255,255,255,.6);border-radius:50%;background:rgba(2,17,25,.66);backdrop-filter:blur(7px);cursor:pointer;transition:background .2s ease}
.sainte-marie-actions button:hover,.sainte-marie-actions button:focus-visible{background:#a87832}
.sainte-marie-progress{position:absolute;bottom:0;left:0;right:0;height:3px;z-index:4;background:rgba(255,255,255,.25)}
.sainte-marie-progress span{display:block;height:100%;width:100%;background:#e7bd7a;transform-origin:left;animation:sainte-marie-fill 4s linear forwards}
@keyframes sainte-marie-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@media(max-width:600px){.destination-card .dest-body .sainte-marie-detail{min-height:120px}.destination-card .dest-body .sainte-marie-detail strong{font-size:22px}}
@media(prefers-reduced-motion:reduce){.sainte-marie-slide{transition:none!important}.sainte-marie-detail,.sainte-marie-progress span{animation:none!important}}
`;

export default function SainteMarieGallery({ lang = "en", onSceneChange }) {
  const locale = COPY[lang] || translateSiteRecord(COPY.en, lang);
  const [images, setImages] = useState(PHOTOS);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const photo = images[Math.min(current, images.length - 1)];
  const scene = locale.scenes[(photo?.id || 1) - 1] || locale.scenes[0];

  // Keep the headline and description BELOW the Sainte Marie card title in sync
  // with its current image; changes to language and fallback images also sync.
  useEffect(() => {
    onSceneChange?.({
      id: photo?.id || 1,
      title: scene[0],
      description: scene[1],
      kicker: scene[2],
    });
  }, [photo?.id, lang, onSceneChange]);


  // The 4-second loop does not pause on hover, focus or previous/next clicks.
  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setTimeout(() => setCurrent(i => (i + 1) % images.length), DELAY);
    return () => window.clearTimeout(timer);
  }, [current, paused, images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const next = new Image();
    next.src = images[(current + 1) % images.length].src;
  }, [current, images]);

  const onError = (src) => {
    if (src === FALLBACK) return;
    setImages(list => {
      const remaining = list.filter(item => item.src !== src);
      return remaining.length ? remaining : [{ id: 1, src: FALLBACK }];
    });
    setCurrent(0);
  };
  const move = delta => setCurrent(i => (i + delta + images.length) % images.length);
  const marker = `${photo?.src || 'fallback'}-${lang}`;

  return (
    <div className="sainte-marie-gallery" role="region" aria-roledescription="carousel" aria-label="Sainte Marie Madagascar photo slideshow">
      <style>{CSS}</style>
      {images.map((item, i) => (
        <img
          key={item.src}
          src={item.src}
          className={`sainte-marie-slide${i === current ? " is-active" : ""}`}
          alt={i === current ? scene[0] : ""}
          aria-hidden={i !== current}
          loading={i < 2 ? "eager" : "lazy"}
          decoding="async"
          onError={() => onError(item.src)}
        />
      ))}
      <div className="sainte-marie-shade" aria-hidden="true" />
      {images.length > 1 && (
        <>
          <div className="sainte-marie-toolbar">
            <span className="sainte-marie-counter">
              {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <div className="sainte-marie-actions">
              <button type="button" onClick={() => move(-1)} aria-label={locale.previous}><ArrowLeft size={16}/></button>
              <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? locale.play : locale.pause}>
                {paused ? <Play size={15}/> : <Pause size={15}/>}
              </button>
              <button type="button" onClick={() => move(1)} aria-label={locale.next}><ArrowRight size={16}/></button>
            </div>
          </div>
          {!paused && <div className="sainte-marie-progress" aria-hidden="true"><span key={marker}/></div>}
        </>
      )}
    </div>
  );
}