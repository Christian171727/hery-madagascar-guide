import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

const IMAGES = Array.from({ length: 10 }, (_, i) => "/images/andasibe/andasibe" + (i + 1) + ".jpeg");

const TEXT = {
  en: {
    previous: "Previous photo", next: "Next photo", pause: "Pause slideshow", play: "Resume slideshow",
    slides: [
      ["An unforgettable encounter", "Meet Madagascar's curious forest lemurs.", "ANDASIBE RAINFOREST"],
      ["Life in the treetops", "Discover the world above the rainforest trails.", "ANDASIBE RAINFOREST"],
      ["A family in the forest", "Experience magical wildlife moments in the canopy.", "ANDASIBE RAINFOREST"],
      ["A little wild wonder", "See the tender side of the eastern forest.", "ANDASIBE RAINFOREST"],
      ["Every trail tells a story", "Discover incredible wildlife with a local guide.", "ANDASIBE RAINFOREST"],
      ["Madagascar's iconic lemurs", "Explore the island's wider wildlife diversity.", "MADAGASCAR WILDLIFE"],
      ["Wild moments in motion", "Discover the energy of ring-tailed lemurs.", "MADAGASCAR WILDLIFE"],
      ["Nature worth remembering", "From wild encounters to wonderful photographs.", "MADAGASCAR WILDLIFE"],
      ["Together in the sunshine", "Enjoy a glimpse into the lives of these lemurs.", "MADAGASCAR WILDLIFE"],
      ["Your wildlife adventure awaits", "Let HERY help shape a journey made for you.", "MADAGASCAR WILDLIFE"]
    ]
  },
  fr: {
    previous: "Photo précédente", next: "Photo suivante", pause: "Mettre en pause", play: "Reprendre le diaporama",
    slides: [
      ["Une rencontre inoubliable", "Admirez les lémuriens curieux de Madagascar.", "FORÊT D'ANDASIBE"],
      ["La vie dans la canopée", "Découvrez les secrets de la forêt tropicale.", "FORÊT D'ANDASIBE"],
      ["Une famille dans les arbres", "Vivez des instants magiques au cœur de la nature.", "FORÊT D'ANDASIBE"],
      ["Un instant de tendresse", "Observez la beauté de la faune de l'Est.", "FORÊT D'ANDASIBE"],
      ["Chaque sentier a son histoire", "Explorez la biodiversité avec un guide local.", "FORÊT D'ANDASIBE"],
      ["Les lémuriens emblématiques", "Découvrez aussi la richesse naturelle de toute l'île.", "FAUNE DE MADAGASCAR"],
      ["La nature en mouvement", "Suivez les lémuriens à queue annelée.", "FAUNE DE MADAGASCAR"],
      ["Des souvenirs à photographier", "Immortalisez les rencontres avec la vie sauvage.", "FAUNE DE MADAGASCAR"],
      ["Ensemble sous le soleil", "Partagez un moment fascinant avec les lémuriens.", "FAUNE DE MADAGASCAR"],
      ["Votre aventure sur mesure", "HERY vous accompagne vers des souvenirs uniques.", "FAUNE DE MADAGASCAR"]
    ]
  },
  mg: {
    previous: "Sary teo aloha", next: "Sary manaraka", pause: "Ajanona", play: "Tohizana",
    slides: [
      ["Fihaonana tsy hay hadinoina", "Fantaro ireo gidro mahavariana eto Madagasikara.", "ALA ANDASIBE"],
      ["Fiainana eny an-tampon-kazo", "Tsidiho ny hakanton'ny ala mando.", "ALA ANDASIBE"],
      ["Fianakaviana anaty ala", "Ankafizo ireo fotoana miavaka eny anivon'ny natiora.", "ALA ANDASIBE"],
      ["Hafaliana kely eny an'ala", "Jereo ny hakanton'ny biby any amin'ny faritra atsinanana.", "ALA ANDASIBE"],
      ["Misy tantara ny lalana rehetra", "Fantaro ny harena voajanahary miaraka amin'ny guide.", "ALA ANDASIBE"],
      ["Ireo gidro malaza eto Madagasikara", "Maro ny zavaboary mahavariana manerana ny Nosy.", "BIBY ETO MADAGASIKARA"],
      ["Natiora feno fihetsiketsehana", "Jereo ireo maki milalao sy mitsambikina.", "BIBY ETO MADAGASIKARA"],
      ["Fahatsiarovana anaty sary", "Ankafizo sy raketo ireo fotoana miavaka.", "BIBY ETO MADAGASIKARA"],
      ["Miaraka eo ambanin'ny masoandro", "Fantaro akaiky kokoa ny fiainan'ny maki.", "BIBY ETO MADAGASIKARA"],
      ["Andao hanao dia miavaka", "HERY no hanampy anao handamina fitsidihana manokana.", "BIBY ETO MADAGASIKARA"]
    ]
  }
};
const CSS = [
  ".dest-img .andasibe-gallery{position:absolute;inset:0;overflow:hidden;isolation:isolate;background:#122a20;color:#fff}",
  ".dest-img .andasibe-gallery .andasibe-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;filter:none;transform:scale(1);transition:opacity .9s ease;pointer-events:none}",
  ".dest-img .andasibe-gallery .andasibe-slide.active{opacity:1;animation:andasibe-zoom 4s linear both}",
  ".destination-card:hover .dest-img .andasibe-gallery .andasibe-slide{filter:none}",
  "@keyframes andasibe-zoom{0%{transform:scale(1)}100%{transform:scale(1.075)}}",
  ".dest-img .andasibe-shade{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,transparent 27%,rgba(8,20,13,.12) 48%,rgba(4,17,12,.88) 100%)}",
  ".dest-img .andasibe-caption{position:absolute;left:13px;right:12px;bottom:51px;z-index:3;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none;animation:andasibe-enter .6s ease both}",
  ".dest-img .andasibe-kicker{display:block;color:#f6d68e;letter-spacing:.075em;font-size:9px;font-weight:800;text-transform:uppercase;margin-bottom:5px}",
  ".dest-img .andasibe-caption strong{display:block;font-size:16px;line-height:1.2;font-weight:800;max-width:260px}",
  ".dest-img .andasibe-caption p{margin:4px 0 0;font-size:11px;line-height:1.35;color:#fff;max-width:260px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}",
  "@keyframes andasibe-enter{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}",
  ".dest-img .andasibe-controls{position:absolute;bottom:12px;left:11px;right:11px;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:5px}",
  ".dest-img .andasibe-count{padding:7px 9px;border-radius:20px;background:rgba(0,0,0,.53);font-size:11px;font-weight:800;color:white;backdrop-filter:blur(7px)}",
  ".dest-img .andasibe-actions{display:flex;gap:5px}",
  ".dest-img .andasibe-actions button{display:grid;place-items:center;width:31px;height:31px;border-radius:50%;background:rgba(13,30,23,.73);border:1px solid rgba(255,255,255,.5);padding:0;color:white;cursor:pointer;backdrop-filter:blur(7px)}",
  ".dest-img .andasibe-actions button:hover,.dest-img .andasibe-actions button:focus-visible{background:#56744f}",
  ".dest-img .andasibe-progress{position:absolute;bottom:0;left:0;right:0;height:3px;background:rgba(255,255,255,.25);z-index:5}",
  ".dest-img .andasibe-progress-inner{display:block;height:100%;width:100%;background:#d3b66b;transform-origin:left;animation:andasibe-progress 4s linear both}",
  "@keyframes andasibe-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}",
  "@media(prefers-reduced-motion:reduce){.dest-img .andasibe-gallery .andasibe-slide.active,.dest-img .andasibe-caption{animation:none}.dest-img .andasibe-gallery .andasibe-slide{transition:none}}"
].join("\n");

export default function AndasibeGallery({ lang = "en" }) {
  const [images, setImages] = useState(IMAGES);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const locale = TEXT[lang] || TEXT.en;
  const info = locale.slides[Number((images[current] || "").match(/andasibe(\d+)\.jpeg/)?.[1] || 1) - 1] || locale.slides[0];

  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setTimeout(() => setCurrent(i => (i + 1) % images.length), 4000);
    return () => window.clearTimeout(timer);
  }, [paused, current, images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const img = new Image();
    img.src = images[(current + 1) % images.length];
  }, [current, images]);

  const go = (step) => setCurrent(i => (i + step + images.length) % images.length);
  const onError = (src) => {
    if (src === "/images/Andasibe.jpg") return;
    setImages(old => {
      const next = old.filter(p => p !== src);
      return next.length ? next : ["/images/Andasibe.jpg"];
    });
    setCurrent(0);
  };

  return <div className="andasibe-gallery" role="region" aria-roledescription="carousel" aria-label="Andasibe and Madagascar wildlife photo slideshow">
    <style>{CSS}</style>
    {images.map((src, i) =>
      <img key={src} src={src} alt={i === current ? info[0] : ""} aria-hidden={i !== current}
        loading={i < 2 ? "eager" : "lazy"} decoding="async"
        className={"andasibe-slide" + (i === current ? " active" : "")} onError={() => onError(src)} />
    )}
    <div className="andasibe-shade" aria-hidden="true" />
    <div className="andasibe-caption" key={current + "-" + lang}>
      <span className="andasibe-kicker">{info[2]}</span>
      <strong>{info[0]}</strong>
      <p>{info[1]}</p>
    </div>
    <div className="andasibe-controls">
      <span className="andasibe-count">{String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
      <div className="andasibe-actions">
        <button type="button" onClick={() => go(-1)} aria-label={locale.previous}><ArrowLeft size={15} /></button>
        <button type="button" onClick={() => setPaused(v => !v)} aria-label={paused ? locale.play : locale.pause}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
        <button type="button" onClick={() => go(1)} aria-label={locale.next}><ArrowRight size={15} /></button>
      </div>
    </div>
    <div className="andasibe-progress" aria-hidden="true">
      <span className="andasibe-progress-inner" key={"progress-" + current} style={{ animationPlayState: paused ? "paused" : "running" }} />
    </div>
  </div>;
}
