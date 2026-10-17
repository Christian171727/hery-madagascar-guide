import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

const PHOTOS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  src: `/images/rn7/rn7${i + 1}.avif`,
}));
const FALLBACK = "/images/RN7.jpg";
const DELAY = 4000;

const COPY = {
  en: {
    previous: "Previous photo", next: "Next photo", pause: "Pause slideshow", play: "Resume slideshow",
    scenes: [
      ["The south begins with discovery", "Slow down beneath the trees and enjoy the warm welcome of southern Madagascar.", "THE SOUTHERN ROUTE"],
      ["Beyond the road, turquoise shores", "Follow the southern journey to Mangily, where traditional boats rest beside blue waters.", "MANGILY COAST"],
      ["A breath of ocean freedom", "Sandy beaches and colorful pirogues invite you to take your time and explore.", "COASTAL DISCOVERY"],
      ["Where the journey meets the sea", "Palm-fringed shores and endless blue horizons turn each stop into a memory.", "SOUTHERN ESCAPE"],
      ["Nature's quieter side", "Discover the delicate beauty of mangroves and the wildlife around the water.", "MANGROVE LIFE"],
      ["Every detail holds a surprise", "From birds to forest textures, the south rewards those who look a little closer.", "WILDLIFE ENCOUNTERS"],
    ],
  },
  fr: {
    previous: "Photo précédente", next: "Photo suivante", pause: "Mettre en pause", play: "Reprendre le diaporama",
    scenes: [
      ["Le sud commence par la découverte", "Prenez votre temps à l'ombre des arbres et savourez l'accueil du sud de Madagascar.", "SUR LA ROUTE DU SUD"],
      ["Au-delà de la route, la mer turquoise", "Poursuivez votre voyage jusqu'à Mangily, où les pirogues bordent les eaux bleues.", "CÔTE DE MANGILY"],
      ["Une bouffée de liberté en bord de mer", "Plages de sable et pirogues colorées vous invitent à ralentir et à explorer.", "DÉCOUVERTE CÔTIÈRE"],
      ["Là où le voyage rejoint l'océan", "Les plages bordées de palmiers et les horizons bleus promettent de beaux souvenirs.", "ÉVASION AU SUD"],
      ["La nature dans toute sa douceur", "Découvrez la beauté fragile des mangroves et la vie sauvage près de l'eau.", "VIE DES MANGROVES"],
      ["Chaque détail est une surprise", "Des oiseaux aux secrets de la forêt, le sud récompense les regards curieux.", "RENCONTRES SAUVAGES"],
    ],
  },
  mg: {
    previous: "Sary teo aloha", next: "Sary manaraka", pause: "Ajanona aloha", play: "Tohizana ny sary",
    scenes: [
      ["Eto no manomboka ny fahitana ny atsimo", "Mijanòna eo ambanin'ny aloky ny hazo ary ankafizo ny hakanton'ny atsimon'i Madagasikara.", "DIA MANKANY ATSIMO"],
      ["Any ambadiky ny lalana ny ranomasina", "Tohizo ny dianao mankany Mangily, ahitana lakana sy ranomasina manga mahafinaritra.", "MORONTSIRAK'I MANGILY"],
      ["Hafaliana eny amoron-dranomasina", "Fasika sy lakana miloko no manasa anao hitsidika sy hankafy fotoana miavaka.", "FANTARO NY MORONTSIRAKA"],
      ["Mifanojo ny dia sy ny ranomasina", "Morontsiraka feno rofia sy lanitra manga no mamorona fahatsiarovana mamy.", "FITSAHARAM-PANAHY ATSIMO"],
      ["Ny hakanton'ny natiora mangina", "Fantaro ireo ala honko sy zavamananaina manodidina ny rano.", "ALA HONKO"],
      ["Mahagaga ny antsipiriany tsirairay", "Ny vorona sy ny zava-misy anaty ala dia mampiavaka ny fitsidihana atsimo.", "FANTARO NY ZAVABOARY"],
    ],
  },
};

const CSS = `
.dest-img .rn7-gallery{position:absolute;inset:0;z-index:1;overflow:hidden;isolation:isolate;background:#2b241f;color:#fff}
.dest-img .rn7-gallery .rn7-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1)!important;filter:none!important;transition:opacity .82s ease;pointer-events:none}
.dest-img .rn7-gallery .rn7-slide.is-active{opacity:1}
.destination-card:hover .dest-img .rn7-gallery .rn7-slide{filter:none!important;transform:scale(1)!important}
.rn7-shade{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,transparent 58%,rgba(33,24,18,.10) 81%,rgba(33,24,18,.37) 100%);pointer-events:none}
.rn7-toolbar{position:absolute;left:12px;right:12px;bottom:15px;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:8px}
.rn7-counter{display:inline-flex;align-items:center;padding:7px 10px;border-radius:999px;background:rgba(18,14,12,.66);color:#fff;font-size:11px;font-weight:800;letter-spacing:.07em;backdrop-filter:blur(7px)}
.rn7-actions{display:flex;gap:5px}
.rn7-actions button{display:grid;place-items:center;width:33px;height:33px;padding:0;color:#fff;border:1px solid rgba(255,255,255,.6);border-radius:50%;background:rgba(18,14,12,.66);backdrop-filter:blur(7px);cursor:pointer;transition:background .2s ease}
.rn7-actions button:hover,.rn7-actions button:focus-visible{background:#a87832}
.rn7-progress{position:absolute;bottom:0;left:0;right:0;height:3px;z-index:4;background:rgba(255,255,255,.25)}
.rn7-progress span{display:block;height:100%;width:100%;background:#e7bd7a;transform-origin:left;animation:rn7-fill 4s linear forwards}
.destination-card .dest-body .rn7-detail{min-height:128px;margin:14px 0 12px;animation:rn7-rise .65s cubic-bezier(.2,.7,.2,1) both}
.destination-card .dest-body .rn7-detail small{display:block;color:var(--gold-600,#b98235);font-size:9px;letter-spacing:.12em;font-weight:900;text-transform:uppercase;margin-bottom:6px}
.destination-card .dest-body .rn7-detail strong{display:block;font-family:'Cormorant Garamond',serif;font-size:clamp(20px,1.75vw,25px);line-height:1.13;color:var(--ink,#1e3953);font-weight:800}
.destination-card .dest-body .rn7-detail p{margin:8px 0 0;color:var(--muted,#576b80);font-size:11px;line-height:1.6;max-width:32ch}
@keyframes rn7-rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes rn7-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@media(max-width:600px){.destination-card .dest-body .rn7-detail{min-height:120px}.destination-card .dest-body .rn7-detail strong{font-size:22px}}
@media(prefers-reduced-motion:reduce){.rn7-slide{transition:none!important}.rn7-detail,.rn7-progress span{animation:none!important}}
`;

export default function RN7Gallery({ lang = "en", onSceneChange }) {
  const locale = COPY[lang] || COPY.en;
  const [images, setImages] = useState(PHOTOS);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const photo = images[Math.min(current, images.length - 1)];
  const scene = locale.scenes[(photo?.id || 1) - 1] || locale.scenes[0];

  useEffect(() => {
    onSceneChange?.({
      id: photo?.id || 1,
      title: scene[0],
      description: scene[1],
      kicker: scene[2],
    });
  }, [photo?.id, lang, onSceneChange]);

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

  const move = (delta) => setCurrent(i => (i + delta + images.length) % images.length);
  const marker = `${photo?.src || 'fallback'}-${lang}`;

  return (
    <div className="rn7-gallery" role="region" aria-roledescription="carousel" aria-label="RN7 Madagascar photo slideshow">
      <style>{CSS}</style>
      {images.map((item, i) => (
        <img
          key={item.src}
          src={item.src}
          className={`rn7-slide${i === current ? " is-active" : ""}`}
          alt={i === current ? scene[0] : ""}
          aria-hidden={i !== current}
          loading={i < 2 ? "eager" : "lazy"}
          decoding="async"
          onError={() => onError(item.src)}
        />
      ))}
      <div className="rn7-shade" aria-hidden="true" />
      {images.length > 1 && (
        <>
          <div className="rn7-toolbar">
            <span className="rn7-counter">
              {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <div className="rn7-actions">
              <button type="button" onClick={() => move(-1)} aria-label={locale.previous}><ArrowLeft size={16} /></button>
              <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? locale.play : locale.pause}>
                {paused ? <Play size={15} /> : <Pause size={15} />}
              </button>
              <button type="button" onClick={() => move(1)} aria-label={locale.next}><ArrowRight size={16} /></button>
            </div>
          </div>
          {!paused && <div className="rn7-progress" aria-hidden="true"><span key={marker} /></div>}
        </>
      )}
    </div>
  );
}