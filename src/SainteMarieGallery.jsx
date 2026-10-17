import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

// Six owner-provided Sainte Marie photographs, compressed for faster loading.
const PHOTOS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  src: `/images/sainte-marie/saintmarie${i + 1}.avif`,
}));
const FALLBACK = "/images/SainteMarie.jpg";
const DELAY = 4000;

const COPY = {
  en: {
    previous: "Previous photo", next: "Next photo",
    pause: "Pause slideshow", play: "Resume slideshow",
    scenes: [
      ["Where the sky meets the sea", "Golden sunsets, fishing boats and moments you'll wish could last forever.", "ISLAND ESCAPE"],
      ["Follow the rhythm of the ocean", "Step away from the ordinary and discover the magic of the Malagasy coast.", "COASTAL MAGIC"],
      ["Your next seaside story", "Bright horizons and welcoming coastal life invite you to explore.", "SEA & DISCOVERY"],
      ["Beauty in every simple moment", "Discover local traditions, warm encounters and life by the water.", "CULTURE & COAST"],
      ["Slow down. Feel the moment.", "Some of Madagascar's most beautiful memories begin with a quiet view.", "NATURE & SERENITY"],
      ["Every wave tells a story", "Feel the freedom of the shore and take home memories that stay with you.", "UNFORGETTABLE MOMENTS"],
    ],
  },
  fr: {
    previous: "Photo précédente", next: "Photo suivante",
    pause: "Mettre en pause", play: "Reprendre le diaporama",
    scenes: [
      ["Là où le ciel rejoint la mer", "Couchers de soleil dorés, bateaux de pêche et instants inoubliables.", "ÉVASION INSULAIRE"],
      ["Au rythme de l'océan", "Laissez le quotidien derrière vous et savourez la magie des côtes malgaches.", "MAGIE DU LITTORAL"],
      ["Votre prochaine aventure en bord de mer", "Un horizon lumineux et une vie côtière authentique à découvrir.", "MER & DÉCOUVERTE"],
      ["La beauté des instants simples", "Traditions locales, rencontres chaleureuses et vie au bord de l'eau.", "CULTURE & LITTORAL"],
      ["Ralentissez. Profitez de l'instant.", "Les plus beaux souvenirs commencent parfois par un paysage paisible.", "NATURE & SÉRÉNITÉ"],
      ["Chaque vague raconte une histoire", "Ressentez la liberté de la côte et repartez avec des souvenirs précieux.", "MOMENTS INOUBLIABLES"],
    ],
  },
  mg: {
    previous: "Sary teo aloha", next: "Sary manaraka",
    pause: "Ajanona aloha", play: "Tohizana ny sary",
    scenes: [
      ["Toerana ifanenan'ny lanitra sy ny ranomasina", "Masoandro mody mamirapiratra, lakana ary fotoana tsy hay hadinoina.", "FITSAHARAM-PANAHY"],
      ["Araho ny gadon'ny ranomasina", "Avelao ny fahazarana isan'andro, ankafizo ny hakanton'ny morontsiraka.", "HAKANTON'NY MORONTSIRAKA"],
      ["Eto no manomboka ny dianao", "Lanitra manga sy fiainan'ny mponina amoron-dranomasina no miandry anao.", "RANOMASINA & FITSIDIHANA"],
      ["Ny hakanton'ny fiainana tsotra", "Fantaro ny kolontsaina sy ny fiainana eny amoron-drano.", "KOLONTSAINA & NATIORA"],
      ["Mijanòna kely, ankafizo ny fotoana", "Indraindray dia ny fahanginana sy ny tontolo no mamela fahatsiarovana mamy.", "FIADANANA & HAKANTONY"],
      ["Samy manana tantara ny onja", "Ankafizo ny morontsiraka ary ento mody ny fahatsiarovana tsara indrindra.", "FOTOANA TSY HAY HADINOINA"],
    ],
  },
};

const CSS = `
.dest-img .sainte-marie-gallery{position:absolute;inset:0;z-index:1;overflow:hidden;isolation:isolate;background:#183345;color:#fff}
.dest-img .sainte-marie-gallery .sainte-marie-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1)!important;filter:none!important;transition:opacity .8s ease;pointer-events:none}
.dest-img .sainte-marie-gallery .sainte-marie-slide.is-active{opacity:1}
.destination-card:hover .dest-img .sainte-marie-gallery .sainte-marie-slide{filter:none!important;transform:scale(1)!important}
.sainte-marie-shade{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(3,20,30,.03) 0%,rgba(3,20,30,0) 40%,rgba(3,20,30,.20) 61%,rgba(3,20,30,.81) 100%);pointer-events:none}
.sainte-marie-caption{position:absolute;left:15px;right:15px;bottom:58px;z-index:2;color:white;text-shadow:0 2px 14px rgba(0,0,0,.5);pointer-events:none;animation:sainte-marie-rise .65s ease both}
.sainte-marie-caption small{display:block;margin:0 0 6px;color:#ffe4a9;font-size:9px;letter-spacing:.13em;font-weight:900}
.sainte-marie-caption strong{display:block;font-family:'Cormorant Garamond',serif;font-size:clamp(20px,2.3vw,26px);line-height:1.08;font-weight:800;max-width:300px}
.sainte-marie-caption p{margin:8px 0 0;font-size:11px;line-height:1.5;color:rgba(255,255,255,.96);max-width:300px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
@keyframes sainte-marie-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.sainte-marie-toolbar{position:absolute;left:12px;right:12px;bottom:15px;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:8px}
.sainte-marie-counter{display:inline-flex;align-items:center;padding:7px 10px;border-radius:999px;background:rgba(2,17,25,.66);color:#fff;font-size:11px;font-weight:800;letter-spacing:.07em;backdrop-filter:blur(7px)}
.sainte-marie-actions{display:flex;gap:5px}
.sainte-marie-actions button{display:grid;place-items:center;width:33px;height:33px;padding:0;color:#fff;border:1px solid rgba(255,255,255,.6);border-radius:50%;background:rgba(2,17,25,.66);backdrop-filter:blur(7px);cursor:pointer;transition:background .2s ease}
.sainte-marie-actions button:hover,.sainte-marie-actions button:focus-visible{background:#a87832}
.sainte-marie-progress{position:absolute;bottom:0;left:0;right:0;height:3px;z-index:4;background:rgba(255,255,255,.25)}
.sainte-marie-progress span{display:block;height:100%;width:100%;background:#e7bd7a;transform-origin:left;animation:sainte-marie-fill 4s linear forwards}
@keyframes sainte-marie-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@media(max-width:600px){.sainte-marie-caption{bottom:57px;left:12px;right:12px}.sainte-marie-caption strong{font-size:21px}.sainte-marie-caption p{font-size:10px;line-height:1.45}}
@media(prefers-reduced-motion:reduce){.sainte-marie-slide{transition:none!important}.sainte-marie-caption,.sainte-marie-progress span{animation:none!important}}
`;

export default function SainteMarieGallery({ lang = "en" }) {
  const locale = COPY[lang] || COPY.en;
  const [images, setImages] = useState(PHOTOS);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const photo = images[Math.min(current, images.length - 1)];
  const scene = locale.scenes[(photo?.id || 1) - 1] || locale.scenes[0];

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
      <div className="sainte-marie-caption" key={marker} aria-live="off">
        <small>{scene[2]}</small>
        <strong>{scene[0]}</strong>
        <p>{scene[1]}</p>
      </div>
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