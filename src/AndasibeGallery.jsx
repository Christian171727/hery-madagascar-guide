import React, { useEffect, useState } from "react";
import { gallerySceneFor } from "./destinationGalleryLocales.js";
import { andasibeNewPhotoScenes } from "./andasibeNewPhotoScenes.js";
import { ArrowLeft, ArrowRight, Pause, Play, Leaf } from "lucide-react";

// Original photographs supplied for this update. Old Andasibe carousel assets are not used.
const ORIGINAL_PHOTOS = Array.from({ length: 18 }, (_, index) => ({
  src: `/images/andasibe-new/andasibe-${String(index + 1).padStart(2, "0")}.avif`,
}));
// Remove old scene 11 (PALMARIUM sign) and insert all eight owner-uploaded
// photos from andasibe(2).zip in their original ZIP order.
const ZIP_PHOTOS = Array.from({ length: 8 }, (_, index) => ({
  src: `/images/andasibe-added/andasibe-extra-${String(index + 1).padStart(2, "0")}.webp`,
}));
const PHOTOS = [
  ...ORIGINAL_PHOTOS.slice(0, 10),
  ...ZIP_PHOTOS,
  ...ORIGINAL_PHOTOS.slice(11),
].map((photo, index) => ({ ...photo, id: index + 1 }));
const FALLBACK = "/images/Andasibe.jpg";
const DELAY = 4000;

// Each story is matched to its corresponding original photo. Some supplied photos
// show experiences beyond Andasibe, so descriptions do not assert an exact location.
const SCENES = [
  {
    en: ["FACE TO FACE", "A curious forest gaze", "Meet the expressive eyes of a lemur and feel the magic of Madagascar's living forests."],
    fr: ["FACE À FACE", "Un regard qui raconte la forêt", "Croisez le regard expressif d'un lémurien et ressentez la magie des forêts malgaches."],
    mg: ["MASO MIFANKAHITA", "Fijery mahafinaritra ao anaty ala", "Jereo akaiky ny mason'ny gidro ary ankafizo ny hakanton'ny ala velona eto Madagasikara."],
  },
  {
    en: ["FOREST CANOPY", "High above the forest floor", "A black-and-white lemur rests among the branches: every glance upward reveals a new wonder."],
    fr: ["CANOPÉE", "Au-dessus du sol de la forêt", "Un lémurien noir et blanc se repose dans les branches : levez les yeux, la surprise vous attend."],
    mg: ["ENY AMBONIN'NY HAZO", "Fiainana eny amin'ny rantsankazo", "Gidro mainty sy fotsy mipetraka eny ambony hazo: misy zava-mahavariana miandry rehefa miandrandra."],
  },
  {
    en: ["WILDLIFE MOMENTS", "Life on the slender branches", "Follow the quiet movements of a lemur in the trees and discover nature's graceful rhythm."],
    fr: ["INSTANTS SAUVAGES", "La vie sur les branches", "Suivez les gestes délicats d'un lémurien dans les arbres et découvrez le rythme de la nature."],
    mg: ["FIAINAN'NY BIBY", "Fihetsika manja eny anaty hazo", "Araho ny fihetsiky ny gidro eo amin'ny rantsankazo ary fantaro ny gadon'ny natiora."],
  },
  {
    en: ["LEMUR ENCOUNTERS", "Together among the trees", "Two lemurs share a quiet moment on the trunk: a precious scene worth slowing down for."],
    fr: ["RENCONTRE AVEC LES LÉMURIENS", "Ensemble dans les arbres", "Deux lémuriens partagent un instant sur un tronc : une scène qui invite à prendre son temps."],
    mg: ["FIHAONANA AMIN'NY GIDRO", "Miaraka eny amin'ny hazo", "Gidro roa miaraka eny amin'ny vatan-kazo: fotoana sarobidy mendrika hodinihina."],
  },
  {
    en: ["FOREST WILDLIFE", "The forest is never still", "Look closely among the pale trunks and discover how wildlife moves through its leafy home."],
    fr: ["FAUNE FORESTIÈRE", "La forêt ne dort jamais", "Regardez entre les troncs : la faune évolue discrètement dans ce monde de verdure."],
    mg: ["BIBY ANATY ALA", "Feno fiainana ny ala", "Diniho eny anelanelan'ny hazo: miaina am-pahanginana ny biby ao amin'ity tontolo maitso ity."],
  },
  {
    en: ["NATURE CLOSE-UP", "A warm-coloured visitor", "A reddish-brown lemur pauses on a branch, revealing the wonderful diversity of Madagascar's wildlife."],
    fr: ["PORTRAIT SAUVAGE", "Une rencontre aux tons roux", "Un lémurien au pelage brun-roux s'arrête sur une branche et dévoile la diversité de Madagascar."],
    mg: ["AKAIKIN'NY NATIORA", "Gidro volontany mahafinaritra", "Gidro manana volo volontany mijanona eny amin'ny rantsankazo, mampiseho ny harenan'ny zavaboary."],
  },
  {
    en: ["IN THE GREEN", "A quiet encounter on the trunk", "Notice the lemur clinging to the tree, perfectly at home among the forest's textures."],
    fr: ["AU CŒUR DU VERT", "Une rencontre sur le tronc", "Observez le lémurien accroché à l'arbre, chez lui parmi les textures de la forêt."],
    mg: ["ANATY MAITSO", "Gidro eny amin'ny vatan-kazo", "Tsidiho ny tontolony: gidro mifikitra amin'ny hazo sy miaina ao anaty natiora."],
  },
  {
    en: ["FIELD DISCOVERY", "The small details matter", "An explorer bends down to examine the forest floor: the best stories are often hidden nearby."],
    fr: ["DÉCOUVERTE SUR LE TERRAIN", "Les petits détails comptent", "Une exploratrice observe le sol de la forêt : les plus belles découvertes sont parfois à nos pieds."],
    mg: ["FIKAROHANA ENY AN-TOERANA", "Zava-dehibe ny antsipiriany", "Mpitsidika mandinika ny tany ao anaty ala: indraindray eo akaikintsika ny zava-mahavariana."],
  },
  {
    en: ["LOCAL EXPLORATION", "Every step reveals a story", "With a guide and a keen eye, the green trails become a journey of discovery."],
    fr: ["EXPLORATION ACCOMPAGNÉE", "Chaque pas raconte une histoire", "Accompagné et curieux, transformez les sentiers verts en voyage de découverte."],
    mg: ["DIA MIARAKA AMIN'NY MPITARI-DALANA", "Misy tantara ny dingana tsirairay", "Miaraka amin'ny mpitari-dalana dia lasa dia feno fahalalana ny lalana anaty ala."],
  },
  {
    en: ["HIDDEN LIFE", "A surprise among the roots", "Look between tree trunks and tangled branches for the remarkable animals that call the forest home."],
    fr: ["VIE DISCRÈTE", "Une surprise entre les racines", "Entre les troncs et les branches, guettez les animaux extraordinaires qui vivent ici."],
    mg: ["ZAVABOARY MIAFINA", "Fahitana tsy ampoizina", "Diniho ny elanelan'ny hazo sy ny sampany: feno biby mahagaga ao anaty ala."],
  },
  {
    en: ["TRAVEL MEMORIES", "The journey starts at the forest gate", "A traveller pauses at a forest reserve entrance — the beginning of another memorable adventure."],
    fr: ["SOUVENIRS DE VOYAGE", "L'aventure commence à l'entrée", "Une voyageuse devant l'entrée d'une réserve : le début d'une nouvelle aventure à partager."],
    mg: ["FAHATSIAROVANA AMIN'NY DIA", "Manomboka eto ny fitsangatsanganana", "Mpitsidika eo am-bavahadin'ny toerana arovana: fiandohan'ny dia feno fahatsiarovana."],
  },
  {
    en: ["RAINFOREST IMMERSION", "Into the green heart of Madagascar", "Towering trees, tangled vines and filtered sunlight invite you deeper into the living forest."],
    fr: ["IMMERSION EN FORÊT", "Au cœur vert de Madagascar", "Grands arbres, lianes et rayons de lumière vous invitent à explorer la forêt vivante."],
    mg: ["FANDEHANANA ANATY ALA", "Ao am-pon'ny ala maitso", "Hazo avo, vahy ary tara-masoandro mandalo no manasa anao hiditra lalina kokoa anaty ala."],
  },
  {
    en: ["ON THE TRAIL", "Adventure crosses every stream", "A simple wooden crossing turns a rainforest walk into a story you'll remember."],
    fr: ["SUR LES SENTIERS", "Traverser pour mieux découvrir", "Un petit passage en bois transforme une promenade en forêt en aventure mémorable."],
    mg: ["ENY AN-DALAN'ALA", "Miampita mba hahita zava-baovao", "Fiampitana hazo eo ambonin'ny rano no mampiavaka ny dia sy mamela fahatsiarovana mamy."],
  },
  {
    en: ["GUIDED EXPLORATION", "Follow the forest's quiet paths", "Walk among tall stems and lush undergrowth: a guide helps reveal what others might miss."],
    fr: ["EXPLORATION GUIDÉE", "Suivez les sentiers discrets", "Entre les tiges et les feuillages, un guide révèle les détails qu'on ne voit pas toujours."],
    mg: ["FITARIHANA ANATY ALA", "Araho ny lalana maitso", "Eo anelanelan'ny hazo sy ravina dia manampy anao hahita zava-miafina ny mpitari-dalana."],
  },
  {
    en: ["WILD LANDSCAPES", "A wider world to explore", "Every change of scenery brings a new perspective on Madagascar's extraordinary natural world."],
    fr: ["PAYSAGES SAUVAGES", "Toujours plus de paysages à découvrir", "Chaque nouveau décor offre un regard différent sur la nature exceptionnelle de Madagascar."],
    mg: ["TONTOLO MIAVAKA", "Maro ny toerana azo tsidihina", "Isaky ny miova ny tontolo dia misy hakanton'ny natiora hafa miandry anao."],
  },
  {
    en: ["SMALL WONDERS", "A splash of colour on the forest floor", "A brightly coloured frog shows why the forest's smallest creatures deserve our attention."],
    fr: ["PETITES MERVEILLES", "Une touche de couleur au sol", "Une grenouille aux couleurs vives rappelle que les petites créatures sont fascinantes."],
    mg: ["ZAVABOARY MADINIKA", "Loko mahafinaritra eny an-tany", "Sahona miloko mamirapiratra mampiseho fa mendrika hojerena koa ny biby madinika."],
  },
  {
    en: ["SHARED EXPERIENCES", "The best stories are shared", "Smiles after a day of exploring the forest: memories made together last the longest."],
    fr: ["RENCONTRES HUMAINES", "Les plus beaux souvenirs se partagent", "Des sourires après une découverte en forêt : ensemble, l'aventure devient inoubliable."],
    mg: ["FIFALIANA MIARAKA", "Mamy kokoa ny dia iarahana", "Tsiky sy hafaliana taorian'ny fitsidihana an'ala: fahatsiarovana mbola hitoetra ela."],
  },
  {
    en: ["PHOTO MOMENTS", "Capture the wonder of the forest", "A photographer pauses along a green trail — because every forest moment is worth remembering."],
    fr: ["INSTANTS PHOTO", "Immortalisez la magie de la forêt", "Un photographe s'arrête sur le sentier : chaque instant en forêt mérite d'être gardé."],
    mg: ["FOTOANA FAKANA SARY", "Raketo ny hakanton'ny ala", "Mpaka sary mijanona eny amin'ny lalan'ala: fotoana tsara raketina ho fahatsiarovana."],
  },
];

const LABELS = {
  en: {prev: "Previous photo", next: "Next photo", pause: "Pause slideshow", play: "Play slideshow", tag: "FOREST JOURNAL"},
  fr: {prev: "Photo précédente", next: "Photo suivante", pause: "Mettre en pause", play: "Reprendre le diaporama", tag: "CARNET DE FORÊT"},
  mg: {prev: "Sary teo aloha", next: "Sary manaraka", pause: "Ajanona aloha", play: "Tohizana", tag: "DIARY ANATY ALA"},
};

const CSS = `
.dest-img .andasibe-gallery{position:absolute;inset:0;z-index:1;overflow:hidden;isolation:isolate;background:#17382c;color:#fff}
.dest-img .andasibe-gallery .andasibe-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;filter:none!important;transform:scale(1.07)!important;transition:opacity .85s ease,transform 4s linear;pointer-events:none}
.dest-img .andasibe-gallery .andasibe-slide.is-active{opacity:1;transform:scale(1)!important}
.destination-card:hover .dest-img .andasibe-gallery .andasibe-slide{filter:none!important}
.andasibe-soft-gradient{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,rgba(3,24,17,.08),transparent 52%,rgba(4,26,18,.39) 100%)}
.andasibe-badge{position:absolute;left:14px;top:16px;z-index:4;display:inline-flex;align-items:center;gap:7px;padding:8px 10px;border:1px solid rgba(255,255,255,.44);border-radius:100px;background:rgba(8,47,34,.62);color:#f8e6b2;font-size:9px;font-weight:900;letter-spacing:.13em;backdrop-filter:blur(8px)}
.andasibe-controls{position:absolute;bottom:15px;left:13px;right:13px;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:6px}
.andasibe-count{padding:8px 11px;border-radius:100px;color:white;background:rgba(5,34,26,.76);font-size:11px;letter-spacing:.08em;font-weight:900;font-variant-numeric:tabular-nums;backdrop-filter:blur(7px)}
.andasibe-actions{display:flex;gap:6px}
.andasibe-actions button{width:34px;height:34px;display:grid;place-items:center;border-radius:100px;border:1px solid rgba(255,255,255,.68);background:rgba(5,34,26,.75);color:white;padding:0;cursor:pointer;backdrop-filter:blur(7px);transition:background .2s,transform .2s}
.andasibe-actions button:hover,.andasibe-actions button:focus-visible{background:#376b46;transform:translateY(-2px)}
.andasibe-progress{position:absolute;left:0;right:0;bottom:0;z-index:5;height:4px;background:rgba(255,255,255,.23)}
.andasibe-progress span{display:block;height:100%;width:100%;transform-origin:left;background:linear-gradient(90deg,#d3ad5e,#e6d28f);animation:andasibe-progress 4s linear both}
.destination-card .dest-body .andasibe-story{min-height:126px;margin:16px 0 10px;padding:0 0 0 12px;border-left:3px solid #b9a064;animation:andasibe-story-enter .65s cubic-bezier(.2,.7,.2,1) both}
.destination-card .dest-body .andasibe-story small{display:block;margin:0 0 6px;font-size:9px;font-weight:900;letter-spacing:.13em;line-height:1.4;text-transform:uppercase;color:var(--gold-600,#ae813a)}
.destination-card .dest-body .andasibe-story strong{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(21px,1.8vw,25px);line-height:1.15;color:var(--ink,#213e31);font-weight:800}
.destination-card .dest-body .andasibe-story p{margin:8px 0 0;color:var(--muted,#536a5e);font-size:11px;line-height:1.6;max-width:34ch}
@keyframes andasibe-story-enter{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes andasibe-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@media(max-width:650px){.destination-card .dest-body .andasibe-story{min-height:120px}.destination-card .dest-body .andasibe-story strong{font-size:22px}}
@media(prefers-reduced-motion:reduce){.dest-img .andasibe-gallery .andasibe-slide{transition:none!important;transform:none!important}.andasibe-story,.andasibe-progress span{animation:none!important}}
`;

export default function AndasibeGallery({lang="en",onSceneChange}) {
  const locale = LABELS[lang] || LABELS.en;
  const [images,setImages] = useState(PHOTOS);
  const [current,setCurrent] = useState(0);
  const [paused,setPaused] = useState(false);
  const active = images[Math.min(current,images.length-1)] || PHOTOS[0];
  const sceneIndex = (active.id || 1) - 1;
  const isZipPhoto = sceneIndex >= 10 && sceneIndex < 18;
  const originalIndex = sceneIndex >= 18 ? sceneIndex - 7 : sceneIndex;
  const sourceScene = SCENES[originalIndex] || SCENES[0];
  const [kicker, title, description] = isZipPhoto
    ? (andasibeNewPhotoScenes[lang]?.[sceneIndex - 10] || andasibeNewPhotoScenes.en[sceneIndex - 10])
    : (["en", "fr", "mg"].includes(lang)
        ? (sourceScene[lang] || sourceScene.en)
        : (() => {
            const [titleText, descText, label] = gallerySceneFor(
              "andasibe", lang, originalIndex,
              [sourceScene.en[1], sourceScene.en[2], sourceScene.en[0]]
            );
            return [label, titleText, descText];
          })());

  useEffect(() => {
    onSceneChange?.({id:active.id,kicker,title,description});
  },[active.id,lang,onSceneChange]);

  useEffect(() => {
    if (paused || images.length<2) return;
    const timeout = window.setTimeout(() => setCurrent(prev => (prev+1)%images.length),DELAY);
    return () => window.clearTimeout(timeout);
  },[current,paused,images.length]);

  useEffect(() => {
    if (images.length<2) return;
    const preload = new Image();
    preload.src = images[(current+1)%images.length].src;
  },[current,images]);

  const step = direction => setCurrent(prev => (prev+direction+images.length)%images.length);
  const failed = src => {
    if(src === FALLBACK) return;
    setImages(previous => {
      const valid = previous.filter(item=>item.src!==src);
      return valid.length?valid:[{id:1,src:FALLBACK}];
    });
    setCurrent(0);
  };
  const key=`${active.id}-${lang}`;

  return (
    <div className="andasibe-gallery" role="region" aria-roledescription="carousel" aria-label={{en:"Andasibe and Madagascar forest wildlife slideshow",fr:"Photos des forêts et de la faune malgache",mg:"Sarin’ny ala sy biby eto Madagasikara",ru:"Фотогалерея лесов и животных Мадагаскара",ja:"マダガスカルの森と野生動物の写真",de:"Fotogalerie der Wälder und Tiere Madagaskars",it:"Galleria delle foreste e della fauna del Madagascar",es:"Galería de bosques y fauna de Madagascar",zh:"马达加斯加森林与野生动物图片"}[lang] || "Andasibe forest slideshow"}>
      <style>{CSS}</style>
      {images.map((item,i)=>(
        <img key={item.src} src={item.src} alt={i===current?title:""}
          aria-hidden={i!==current} className={`andasibe-slide${i===current?" is-active":""}`}
          loading={i<2?"eager":"lazy"} decoding="async" onError={()=>failed(item.src)} />
      ))}
      <div className="andasibe-soft-gradient" aria-hidden="true" />
      <span className="andasibe-badge"><Leaf size={12}/>{locale.tag}</span>
      {images.length>1&&(
        <>
          <div className="andasibe-controls">
            <span className="andasibe-count">{String(current+1).padStart(2,"0")} / {String(images.length).padStart(2,"0")}</span>
            <div className="andasibe-actions">
              <button type="button" aria-label={locale.prev} onClick={()=>step(-1)}><ArrowLeft size={16}/></button>
              <button type="button" aria-label={paused?locale.play:locale.pause} onClick={()=>setPaused(p=>!p)}>{paused?<Play size={15}/>:<Pause size={15}/>}</button>
              <button type="button" aria-label={locale.next} onClick={()=>step(1)}><ArrowRight size={16}/></button>
            </div>
          </div>
          {!paused&&<div className="andasibe-progress" aria-hidden="true"><span key={key}/></div>}
        </>
      )}
    </div>
  );
}