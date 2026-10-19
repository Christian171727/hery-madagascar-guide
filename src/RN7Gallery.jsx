import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { translateSiteRecord } from "./siteTranslationExtras.js";

const PHOTOS = [
  { id: 1, src: "/images/rn7-wildlife/wildlife1.avif", position: "center center" },
  { id: 2, src: "/images/rn7-wildlife/wildlife2.avif", position: "center center" },
  { id: 3, src: "/images/rn7-wildlife/wildlife3.avif", position: "28% center" },
  { id: 4, src: "/images/rn7-wildlife/wildlife4.avif", position: "center center" },
  { id: 5, src: "/images/rn7-wildlife/wildlife5.avif", position: "center center" },
  { id: 6, src: "/images/rn7-wildlife/wildlife6.avif", position: "center center" },
  { id: 7, src: "/images/rn7-wildlife/wildlife7.avif", position: "center center" },
  { id: 8, src: "/images/rn7-wildlife/wildlife8.avif", position: "center center" },
];
const FALLBACK = "/images/RN7.jpg";
const DELAY = 4000;

const COPY = {
  "en": {
    "previous": "Previous photo",
    "next": "Next photo",
    "pause": "Pause slideshow",
    "play": "Resume slideshow",
    "tag": "WILDLIFE ALONG RN7",
    "scenes": [
      [
        "Meet Madagascar's ring-tailed lemurs",
        "A family of iconic makis greets the curious traveller. Their striped tails and expressive faces make each encounter special.",
        "LEMUR ENCOUNTERS"
      ],
      [
        "A feathered treasure of the forest",
        "Discover a beautifully patterned forest bird. Patience and a quiet moment can reveal extraordinary details.",
        "RAINFOREST BIRDS"
      ],
      [
        "A master of camouflage",
        "Spot a chameleon resting among the branches. Madagascar's reptiles reward those who slow down and look closely.",
        "CHAMELEON DISCOVERY"
      ],
      [
        "Follow the forest's hidden paths",
        "Walk beneath Ranomafana's green canopy, where every turn promises fresh air, new sounds and unexpected discoveries.",
        "RANOMAFANA TRAILS"
      ],
      [
        "The beauty of a forest bird",
        "Look closer at the delicate patterns and jewel-like colours of a bird moving quietly along the forest floor.",
        "HIDDEN FOREST LIFE"
      ],
      [
        "Striped tails, unforgettable moments",
        "Meet the lively ring-tailed lemurs of Madagascar's southern landscapes, a remarkable highlight of the RN7 journey.",
        "MADAGASCAR MAKIS"
      ],
      [
        "Adventure beneath the rainforest canopy",
        "From shaded trails to wildlife calls, a guided forest walk invites you to connect with Madagascar's living nature.",
        "WALK INTO NATURE"
      ],
      [
        "Wild beauty, up close",
        "Even a brief pause can reveal a rare-looking moment: fine feathers, bright colours and the secrets of a forest bird.",
        "NATURE'S LITTLE WONDERS"
      ]
    ]
  },
  "fr": {
    "previous": "Photo précédente",
    "next": "Photo suivante",
    "pause": "Mettre en pause",
    "play": "Reprendre le diaporama",
    "tag": "FAUNE SUR LA RN7",
    "scenes": [
      [
        "Rencontrez les makis de Madagascar",
        "Un groupe de lémuriens à queue annelée vous invite à l'observation. Leurs regards et leurs queues rayées rendent la rencontre inoubliable.",
        "RENCONTRE AVEC LES LÉMURIENS"
      ],
      [
        "Un trésor à plumes dans la forêt",
        "Admirez un oiseau forestier au plumage fascinant. Le calme et la patience révèlent de petits trésors de la nature.",
        "OISEAUX DE LA FORÊT"
      ],
      [
        "Un maître du camouflage",
        "Repérez un caméléon parmi les branches. Les reptiles malgaches réservent de belles surprises aux regards attentifs.",
        "DÉCOUVERTE DU CAMÉLÉON"
      ],
      [
        "Sur les sentiers secrets de la forêt",
        "Marchez sous la canopée verdoyante de Ranomafana, entre chants d'oiseaux, air frais et découvertes inattendues.",
        "SENTIERS DE RANOMAFANA"
      ],
      [
        "La beauté d'un oiseau forestier",
        "Observez la finesse des motifs et les reflets des plumes d'un oiseau discret au sol de la forêt.",
        "VIE SECRÈTE DE LA FORÊT"
      ],
      [
        "Queues rayées, souvenirs précieux",
        "Les makis emblématiques des paysages du sud offrent un moment fort d'un voyage le long de la RN7.",
        "LES MAKIS DE MADAGASCAR"
      ],
      [
        "L'aventure sous la canopée",
        "Entre sentiers ombragés et sons de la faune, une balade guidée vous rapproche de la nature malgache.",
        "IMMERSION NATURE"
      ],
      [
        "La nature sauvage, tout près",
        "Un instant d'observation dévoile plumage délicat, belles couleurs et secrets d'un oiseau forestier.",
        "MERVEILLES DISCRÈTES"
      ]
    ]
  },
  "mg": {
    "previous": "Sary teo aloha",
    "next": "Sary manaraka",
    "pause": "Ajanona aloha",
    "play": "Tohizana ny sary",
    "tag": "BIBY SY NATIORA AMIN'NY RN7",
    "scenes": [
      [
        "Hihaona amin'ireo maki mahavariana",
        "Jereo akaiky ny maki manana rambony misy tsipika mainty sy fotsy. Ny fihetsiny sy ny fijeriny dia mamela fahatsiarovana mamy.",
        "FIHAONANA AMIN'NY MAKI"
      ],
      [
        "Vorona kanto miafina anaty ala",
        "Misy vorona mahafinaritra manana volo voaravaka tsara. Ny faharetana sy ny fandinihana no ahitana azy.",
        "VORONA ANATY ALA"
      ],
      [
        "Mahay miafina ny tanalahy",
        "Jereo ny tanalahy mitsambikina sy miala sasatra eny amin'ny sampan-kazo. Feno zava-mahagaga ny biby eto Madagasikara.",
        "FANTARO NY TANALAHY"
      ],
      [
        "Araho ny lalana miafina anaty ala",
        "Mitsangatsangàna eo ambanin'ny hazo maitso ao Ranomafana, mihaino ny feon'ny vorona ary mahita zava-baovao.",
        "LALAN'I RANOMAFANA"
      ],
      [
        "Hatsaran'ny vorona eny anaty ala",
        "Diniho ny endriky ny volo sy ny lokon'ilay vorona mandeha mangina eny amin'ny tany rakotra ravina.",
        "FIANAN'NY ALA"
      ],
      [
        "Rambo miloko, fotoana tsy hay hadinoina",
        "Ny maki malaza manana rambony misy tsipika dia anisan'ny fahitana mahafinaritra mandritra ny dia any atsimo.",
        "MAKI ETO MADAGASIKARA"
      ],
      [
        "Fizahantany eo ambanin'ny hazo avo",
        "Ny lalan'ala sy ny feon'ny biby dia mampahatsapa ny hakanton'ny natiora eto Madagasikara.",
        "TSIDIHO NY NATIORA"
      ],
      [
        "Zava-mahagaga hita akaiky",
        "Fotoana fohy hijanonana dia ampy hahitana ny volo miloko sy ny fiainana miafin'ny vorona anaty ala.",
        "HAKANTON'NY ZAVABOARY"
      ]
    ]
  }
};

const CSS = `
.dest-img .rn7-gallery{position:absolute;inset:0;z-index:1;overflow:hidden;isolation:isolate;background:#1d3c2d;color:#fff}
.dest-img .rn7-gallery .rn7-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.045)!important;filter:none!important;transition:opacity .9s ease,transform 4s ease;pointer-events:none}
.dest-img .rn7-gallery .rn7-slide.is-active{opacity:1;transform:scale(1)!important}
.destination-card:hover .dest-img .rn7-gallery .rn7-slide{filter:none!important;transform:scale(1)!important}
.rn7-shade{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,transparent 65%,rgba(6,26,20,.08) 78%,rgba(4,24,18,.49) 100%);pointer-events:none}
.rn7-forest-tag{position:absolute;bottom:64px;left:14px;z-index:4;border:1px solid rgba(252,230,170,.47);border-radius:8px;background:rgba(9,43,29,.65);backdrop-filter:blur(6px);color:#ffe5ad;padding:6px 9px;font-size:9px;letter-spacing:.1em;font-weight:900;max-width:calc(100% - 25px);pointer-events:none}
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
@media(prefers-reduced-motion:reduce){.rn7-slide{transition:none!important;transform:none!important}.rn7-detail,.rn7-progress span{animation:none!important}}
`;

export default function RN7Gallery({ lang = "en", onSceneChange }) {
  const locale = COPY[lang] || translateSiteRecord(COPY.en, lang);
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
          className={`rn7-slide${i === current ? " is-active" : ""}`} style={{ objectPosition: item.position || "center" }}
          alt={i === current ? `${scene[0]} — RN7, Madagascar` : ""}
          aria-hidden={i !== current}
          loading={i < 2 ? "eager" : "lazy"}
          decoding="async"
          onError={() => onError(item.src)}
        />
      ))}
      <div className="rn7-shade" aria-hidden="true" />
      <span className="rn7-forest-tag">{locale.tag}</span>
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