import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Compass } from "lucide-react";

// Six authentic photos supplied in menabe.zip; optimized AVIF for the website.
const PHOTOS = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  src: "/images/menabe/menabe" + (index + 1) + ".avif",
}));
const FALLBACK = "/images/Morondava.jpg";
const INTERVAL = 4000;

const COPY = {
  en: {
    previous: "Previous photo", next: "Next photo",
    pause: "Pause slideshow", play: "Resume slideshow",
    label: "MORONDAVA • MENABE",
    scenes: [
      ["A journey beyond the ordinary", "Discover another side of Madagascar: remarkable landscapes and real moments worth experiencing.", "A SENSE OF ADVENTURE"],
      ["Walk among the baobab giants", "Follow the dusty avenue where ancient trees turn every step into a memory.", "BAOBAB AVENUE"],
      ["A landscape made for discovery", "Between towering baobabs and wide open skies, let the beauty of Menabe surprise you.", "THE GREAT OUTDOORS"],
      ["When the morning mist rises", "Watch Madagascar's iconic trees emerge slowly from a peaceful, dreamlike dawn.", "MORNING MAGIC"],
      ["The avenue after sunset", "A changing sky, quiet silhouettes and local life make the evening unforgettable.", "EVENING ATMOSPHERE"],
      ["The magic of the night", "A moment of stillness beneath the baobabs reveals a different side of the journey.", "NIGHTFALL IN MENABE"],
    ],
  },
  fr: {
    previous: "Photo précédente", next: "Photo suivante",
    pause: "Mettre en pause", play: "Reprendre le diaporama",
    label: "MORONDAVA • MENABE",
    scenes: [
      ["Une aventure hors du commun", "Découvrez une autre facette de Madagascar : des paysages remarquables et des instants à vivre pleinement.", "ESPRIT D'AVENTURE"],
      ["Marchez parmi les baobabs géants", "Suivez l'allée où ces arbres ancestraux transforment chaque pas en souvenir.", "ALLÉE DES BAOBABS"],
      ["Des paysages à découvrir", "Entre baobabs majestueux et vastes horizons, laissez-vous surprendre par le Menabe.", "GRANDS ESPACES"],
      ["Quand la brume se lève", "Regardez les baobabs emblématiques émerger doucement d'une aube paisible.", "MAGIE DU MATIN"],
      ["L'allée après le coucher du soleil", "Un ciel changeant, des silhouettes paisibles et la vie locale rendent le soir inoubliable.", "AMBIANCE DU SOIR"],
      ["La magie de la nuit", "Au pied des baobabs, le calme révèle une autre facette de ce voyage.", "NUIT EN MENABE"],
    ],
  },
  mg: {
    previous: "Sary teo aloha", next: "Sary manaraka",
    pause: "Ajanona aloha", play: "Tohizana ny sary",
    label: "MORONDAVA • MENABE",
    scenes: [
      ["Dia miavaka tsy hay hadinoina", "Fantaro ny lafiny hafa amin'i Madagasikara, ny tontolo mahavariana ary ny fotoana tena izy.", "DIA FENO ZAVA-BAOVAO"],
      ["Mandehana eo anivon'ny baobab", "Araho ny lalana misy ireo hazo tranainy goavambe, ka ataovy fahatsiarovana ny dingana tsirairay.", "LALAN'NY BAOBAB"],
      ["Tontolo mendrika ho fantarina", "Baobab mijoalajoala sy lanitra midadasika no mampitolagaga ny faritr'i Menabe.", "HAKANTON'NY NATIORA"],
      ["Rehefa misava ny zavona maraina", "Jereo ireo baobab miseho tsikelikely eo ambanin'ny hazavan'ny maraina milamina.", "HATSARAN'NY MARAINA"],
      ["Ny lalana rehefa milentika ny masoandro", "Lanitra miova loko, aloka sy fiainan'ny mponina no mahatonga ny hariva ho miavaka.", "HAKANTON'NY HARIVA"],
      ["Ny hakanton'ny alina", "Ny fahanginana eo ambanin'ny baobab dia mampiseho lafiny hafa amin'ny dia.", "ALINA AO MENABE"],
    ],
  },
};

const CSS = [
  ".dest-img .menabe-gallery{position:absolute;inset:0;z-index:1;isolation:isolate;overflow:hidden;background:#302a23;color:white}",
  ".dest-img .menabe-gallery .menabe-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0;transform:scale(1.06)!important;filter:none!important;transition:opacity .95s ease,transform 4s ease;pointer-events:none}",
  ".dest-img .menabe-gallery .menabe-photo.active{opacity:1;transform:scale(1)!important}",
  ".destination-card:hover .dest-img .menabe-gallery .menabe-photo{filter:none!important}",
  ".menabe-shade{position:absolute;inset:0;z-index:1;background:linear-gradient(to bottom,transparent 55%,rgba(17,18,17,.10) 80%,rgba(14,18,15,.56) 100%);pointer-events:none}",
  ".menabe-location{position:absolute;z-index:3;left:14px;bottom:66px;display:flex;align-items:center;gap:7px;color:#ffead0;font-weight:800;font-size:9px;letter-spacing:.08em;text-shadow:0 2px 7px rgba(0,0,0,.75)}",
  ".menabe-location svg{color:#ffe1a1}",
  ".menabe-controls{position:absolute;bottom:15px;left:12px;right:12px;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:8px}",
  ".menabe-count{color:#fff;background:rgba(25,30,26,.66);border:1px solid rgba(255,255,255,.4);font:800 10px/1 sans-serif;letter-spacing:.08em;padding:11px 12px;border-radius:12px;backdrop-filter:blur(8px);font-variant-numeric:tabular-nums}",
  ".menabe-actions{display:flex;gap:5px}",
  ".menabe-actions button{display:grid;place-items:center;width:34px;height:34px;padding:0;border-radius:12px;color:white;cursor:pointer;background:rgba(25,30,26,.68);border:1px solid rgba(255,255,255,.6);backdrop-filter:blur(8px);transition:background .2s ease,transform .2s ease}",
  ".menabe-actions button:hover,.menabe-actions button:focus-visible{background:#ad793b;transform:translateY(-2px)}",
  ".menabe-progress{position:absolute;right:0;top:0;bottom:0;z-index:5;width:4px;background:rgba(255,255,255,.21)}",
  ".menabe-progress span{display:block;width:100%;height:100%;background:#f7c77d;transform-origin:top;animation:menabe-filling 4s linear forwards}",
  ".destination-card .dest-body .menabe-detail{min-height:136px;margin:15px 0 10px;padding:1px 0 0 14px;border-left:2px solid #d1a054;animation:menabe-caption-enter .65s cubic-bezier(.18,.75,.26,1) both}",
  ".destination-card .dest-body .menabe-detail small{display:block;color:var(--gold-600,#b17b36);font-size:9px;font-weight:900;letter-spacing:.11em;margin-bottom:7px}",
  ".destination-card .dest-body .menabe-detail strong{display:block;font-family:'Cormorant Garamond',serif;font-size:clamp(20px,1.8vw,25px);line-height:1.13;color:var(--ink,#203b35);font-weight:800}",
  ".destination-card .dest-body .menabe-detail p{color:var(--muted,#536978);margin:9px 0 0;font-size:11px;line-height:1.6}",
  "@keyframes menabe-caption-enter{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}",
  "@keyframes menabe-filling{from{transform:scaleY(0)}to{transform:scaleY(1)}}",
  "@media(max-width:620px){.destination-card .dest-body .menabe-detail{min-height:125px}.destination-card .dest-body .menabe-detail strong{font-size:22px}}",
  "@media(prefers-reduced-motion:reduce){.dest-img .menabe-gallery .menabe-photo{transition:none!important;transform:none!important}.menabe-detail,.menabe-progress span{animation:none!important}}",
].join("\n");

export default function MenabeGallery({ lang = "en", onSceneChange }) {
  const t = COPY[lang] || COPY.en;
  const [images, setImages] = useState(PHOTOS);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = Math.min(index, images.length - 1);
  const photo = images[current];
  const scene = t.scenes[(photo?.id || 1) - 1] || t.scenes[0];

  useEffect(() => {
    onSceneChange?.({ id: photo?.id || 1, kicker: scene[2], title: scene[0], description: scene[1] });
  }, [photo?.id, lang, onSceneChange]);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const timeout = window.setTimeout(() => setIndex(i => (i + 1) % images.length), INTERVAL);
    return () => window.clearTimeout(timeout);
  }, [index, paused, images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const next = new Image();
    next.src = images[(current + 1) % images.length].src;
  }, [current, images]);

  const onError = (src) => {
    if (src === FALLBACK) return;
    setImages(old => {
      const valid = old.filter(img => img.src !== src);
      return valid.length ? valid : [{ id: 1, src: FALLBACK }];
    });
    setIndex(0);
  };

  const move = step => setIndex(i => (i + step + images.length) % images.length);
  return (
    <div className="menabe-gallery" role="region" aria-roledescription="carousel" aria-label={t.label + " photographs"}>
      <style>{CSS}</style>
      {images.map((item, i) => (
        <img key={item.src} src={item.src}
          className={"menabe-photo" + (i === current ? " active" : "")}
          alt={i === current ? scene[0] : ""} aria-hidden={i !== current}
          loading={i < 2 ? "eager" : "lazy"} decoding="async" onError={() => onError(item.src)}
        />
      ))}
      <div className="menabe-shade" aria-hidden="true" />
      <span className="menabe-location"><Compass size={13} />{t.label}</span>
      {images.length > 1 && (
        <>
          <div className="menabe-controls">
            <span className="menabe-count">{String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
            <div className="menabe-actions">
              <button type="button" aria-label={t.previous} onClick={() => move(-1)}><ArrowLeft size={16}/></button>
              <button type="button" aria-label={paused ? t.play : t.pause} aria-pressed={paused}
                onClick={() => setPaused(value => !value)}>{paused ? <Play size={16}/> : <Pause size={16}/>}</button>
              <button type="button" aria-label={t.next} onClick={() => move(1)}><ArrowRight size={16}/></button>
            </div>
          </div>
          {!paused && <div className="menabe-progress" aria-hidden="true"><span key={itemKey(photo, lang)} /></div>}
        </>
      )}
    </div>
  );
}
function itemKey(photo, lang) {
  return (photo?.src || FALLBACK) + ":" + lang;
}
