import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Camera, Heart, Pause, Play, Sun, Compass } from "lucide-react";
import "./HiddenMomentsExperience.css";
import { translateSiteRecord } from "./siteTranslationExtras.js";
import { hiddenMomentsOtherScenes } from "./hiddenMomentsOtherScenes.js";

const DELAY = 4000;
const IMAGES = Array.from({ length: 7 }, (_, index) =>
  `/images/hidden-moments/moment-${String(index + 1).padStart(2, "0")}.avif`
);

const STORIES = {
  en: {
    eyebrow: "A SIGNATURE HERY EXPERIENCE · MORONDAVA / MENABE",
    title: "Hidden moments.",
    titleAccent: "Memories that stay forever.",
    lead: "Some of the most beautiful journeys are not about how far you go. They are about the people you meet, the places you feel and the little moments you never want to end.",
    paragraphs: [
      "Imagine leaving the ordinary behind for a slower, more personal escape into the landscapes of Menabe. The road opens onto warm red earth, the unmistakable silhouettes of Madagascar's baobabs rise against a wide sky, and each stop becomes an opportunity to truly experience the place. Instead of rushing from one photograph to another, you have time to look around, listen to the quiet, ask your local guide questions and enjoy the simple pleasure of being present.",
      "These photographs capture the spirit of that experience: a 4x4 waiting among the baobabs, a relaxed outdoor setup, travelers sharing smiles and stories, and a sky gradually changing color as evening approaches. A small pause in the landscape can become the highlight of an entire holiday. It is a chance to connect, celebrate a special occasion, take meaningful photographs or simply enjoy a peaceful moment far from the busy rhythm of everyday life.",
      "With HERY Madagascar Local Guide, the aim is to shape your visit around what matters to you — the golden light, the photography, the atmosphere, the discovery of local landscapes and the people you travel with. Ask about arranging a private stop or a personalized outing; timing, route, refreshments and other details can be discussed according to your preferences and what is practical locally. Come for the baobabs. Leave with a story that feels entirely your own."
    ],
    miniTitle: "A little more than a photograph",
    miniText: "Authentic landscapes, thoughtful pauses and your very own Madagascar story.",
    features: ["Private, personal atmosphere", "Baobab golden-hour photography", "Slow travel & meaningful connections"],
    cta: "Plan my special moment",
    ctaSecondary: "Discover the photos",
    previous: "Previous photo", next: "Next photo", pause: "Pause slideshow", play: "Resume slideshow",
    photoLabel: "REAL MOMENTS · MENABE",
    scenes: [
      ["The road to something unforgettable", "Your adventure begins where the red earth meets the iconic baobabs."],
      ["The people make the journey", "A shared smile in a remarkable landscape becomes a memory worth keeping."],
      ["A pause made just for you", "Enjoy the calm of an outdoor moment with extraordinary scenery all around."],
      ["Stories beneath the baobabs", "Slow down, share a conversation and watch the afternoon light soften."],
      ["Simple pleasures, beautiful places", "An unhurried stop can be the most meaningful part of a great journey."],
      ["Chasing the last golden light", "The road, the baobabs and the setting sun create a scene you will remember."],
      ["When the landscape becomes a memory", "Let the evening sky write the final chapter of your Madagascar day."]
    ]
  },
  fr: {
    eyebrow: "UNE EXPÉRIENCE SIGNATURE HERY · MORONDAVA / MENABE",
    title: "Des instants cachés.",
    titleAccent: "Des souvenirs pour toujours.",
    lead: "Les plus beaux voyages ne se mesurent pas seulement en kilomètres. Ils se reconnaissent aux rencontres, aux émotions et à ces moments précieux que l'on voudrait prolonger.",
    paragraphs: [
      "Imaginez quitter le rythme habituel des excursions pour vivre une parenthèse plus intime au cœur des paysages du Menabe. La piste traverse la terre rouge, les silhouettes majestueuses des baobabs se découpent sur l'horizon et chaque arrêt devient une occasion de ressentir pleinement Madagascar. Ici, pas besoin de courir d'un point de vue à l'autre : prenez le temps de contempler, d'échanger avec votre guide local, de respirer et de laisser le paysage vous surprendre.",
      "Ces images racontent l'esprit de cette évasion : un 4x4 au milieu des baobabs, une halte aménagée en pleine nature, des voyageurs qui partagent un sourire ou une conversation, et la lumière du soir qui transforme doucement le décor. Parfois, une pause toute simple devient le plus beau souvenir d'un séjour. Que vous souhaitiez célébrer un moment particulier, réaliser de belles photographies ou profiter du calme avec vos proches, chaque détail contribue à créer une expérience sincère.",
      "Avec HERY Madagascar Local Guide, l'idée est d'imaginer une sortie qui vous ressemble : l'ambiance, la découverte, la lumière dorée et le plaisir de partager quelque chose d'authentique. Contactez HERY pour discuter d'une halte privée ou d'une sortie personnalisée ; l'itinéraire, les horaires, les rafraîchissements éventuels et les modalités sont à définir selon vos envies et les possibilités sur place. Venez pour les baobabs, repartez avec une histoire que vous aurez réellement vécue."
    ],
    miniTitle: "Bien plus qu'une belle photo",
    miniText: "Des paysages authentiques, de vrais échanges et votre propre histoire à Madagascar.",
    features: ["Ambiance intime et personnalisée", "Photographie des baobabs à l'heure dorée", "Voyage lent et rencontres authentiques"],
    cta: "Organiser mon moment privilégié",
    ctaSecondary: "Découvrir les photos",
    previous: "Photo précédente", next: "Photo suivante", pause: "Mettre en pause", play: "Reprendre le diaporama",
    photoLabel: "VRAIS INSTANTS · MENABE",
    scenes: [
      ["Sur la route de l'inoubliable", "L'aventure commence entre terre rouge et baobabs emblématiques."],
      ["Les rencontres donnent vie au voyage", "Un sourire partagé dans un décor exceptionnel devient un souvenir précieux."],
      ["Une parenthèse rien que pour vous", "Savourez le calme d'une halte en plein air au milieu d'un paysage grandiose."],
      ["Des histoires sous les baobabs", "Prenez le temps d'échanger et d'admirer la douceur de la lumière."],
      ["Le bonheur des choses simples", "Un arrêt sans précipitation peut devenir le plus beau moment du voyage."],
      ["À la rencontre de la lumière dorée", "La piste, les baobabs et le soleil couchant composent un tableau mémorable."],
      ["Quand le paysage devient souvenir", "Laissez le ciel du soir écrire la dernière page de cette journée malgache."]
    ]
  },
  mg: {
    eyebrow: "TRAIKEFA MANOKANA HERY · MORONDAVA / MENABE",
    title: "Fotoana miafina sy miavaka.",
    titleAccent: "Fahatsiarovana tsy mety levona.",
    lead: "Tsy ny halaviran-dalana ihany no maha-tsara ny dia, fa ireo olona miara-mandeha, ireo toerana tsapanao ary ireo fotoana mahafinaritra tsy tianao hifarana.",
    paragraphs: [
      "Alaivo sary an-tsaina ny fitsangatsanganana milamina sy manokana eo anivon'ny faritr'i Menabe. Lalana mena, baobab mijoalajoala, lanitra midadasika ary rivotra mangina no mandray anao. Tsy mila mihazakazaka maka sary fotsiny ianao, fa afaka mijanona, mijery tsara ny manodidina, manontany ny mpitari-dalana eo an-toerana ary mankafy ny hakanton'i Madagasikara amin'ny tena izy. Eto no manomboka ireo tantara sarobidy tsy voatery ho hita amin'ny toerana be mpizaha tany.",
      "Mampiseho izany indrindra ireo sary ireo: fiara 4x4 eo akaikin'ny baobab, fijanonana kely voalamina eny an-kalamanjana, vahiny mifampiresaka sy mifaly, ary masoandro mody manova tsikelikely ny lokon'ny lanitra. Indraindray dia ny fotoana tsotra indrindra no lasa fahatsiarovana lehibe indrindra. Mety ho fotoana hankalazana zavatra manokana izany, haka sary tsara tarehy, hifampizarana hafaliana amin'ny namana na hankafizana fahanginana kely lavitra ny tabataba andavanandro.",
      "Miaraka amin'ny HERY Madagascar Local Guide dia azo resahina sy amboarina araka ny fanirianao ny traikefa: ny toerana, ny fotoana hahitana hazavana tsara, ny fakàna sary ary ny fomba hankafizana ny fitsidihana. Mifandraisa amin'i HERY raha maniry fijanonana manokana na dia natao ho anao; ny fandaharam-potoana, ny lalana, ny zava-pisotro raha ilaina ary ny fandaminana hafa dia hifanarahana amin'ny zava-misy eny an-toerana. Tongava hijery ny baobab, ary miverena miaraka amin'ny tantara tsy hay hadinoina."
    ],
    miniTitle: "Mihoatra noho ny sary tsara tarehy",
    miniText: "Tontolo tena izy, fotoana iarahana ary tantara manokana eto Madagasikara.",
    features: ["Fotoana manokana sy milamina", "Fakàna sary baobab amin'ny hazavan'ny hariva", "Dia miadana sy fihaonana tena izy"],
    cta: "Handamina fotoana manokana",
    ctaSecondary: "Hijery ny sary",
    previous: "Sary teo aloha", next: "Sary manaraka", pause: "Ajanona ny sary", play: "Tohizana ny sary",
    photoLabel: "FOTOANA TENA IZY · MENABE",
    scenes: [
      ["Lalana mankany amin'ny fahatsiarovana", "Manomboka eo anivon'ny tany mena sy baobab ny dianao miavaka."],
      ["Ny olona no maha-tsara ny dia", "Tsiky ifampizarana sy toerana mahafinaritra no mahatonga ny fotoana ho sarobidy."],
      ["Fijanonana natao ho anao", "Ankafizo ny fitsaharana milamina eny an-kalamanjana sy ny tontolo miavaka."],
      ["Tantara eo ambanin'ny baobab", "Mifampiresaha, miala sasatra ary ankafizo ny hazavan'ny hariva."],
      ["Ny fahatsoran'ny fotoana mahafinaritra", "Indraindray ny fijanonana tsotra no mahafinaritra indrindra amin'ny dia."],
      ["Manaraka ny hazavana volamena", "Ny lalana sy ny baobab ary ny masoandro mody dia mamorona sary tsy hay hadinoina."],
      ["Rehefa lasa fahatsiarovana ny tontolo", "Avelao ny lokon'ny lanitra amin'ny hariva hamarana ny dianao." ]
    ]
  }
};

export default function HiddenMomentsExperience({ lang = "en", onContact }) {
  const t = STORIES[lang] || { ...translateSiteRecord(STORIES.en, lang), scenes: hiddenMomentsOtherScenes[lang] || STORIES.en.scenes };
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => setIndex(value => (value + 1) % IMAGES.length), DELAY);
    return () => window.clearTimeout(timer);
  }, [index, paused]);

  useEffect(() => {
    const preload = new Image();
    preload.src = IMAGES[(index + 1) % IMAGES.length];
  }, [index]);

  const move = direction => setIndex(value => (value + direction + IMAGES.length) % IMAGES.length);
  const scene = t.scenes[index];

  return (
    <section id="hidden-moments" className="hm-section" aria-labelledby="hidden-moments-heading">
      <div className="hm-heading">
        <span className="hm-eyebrow"><Sun size={16} /> {t.eyebrow}</span>
        <h2 id="hidden-moments-heading">{t.title} <em>{t.titleAccent}</em></h2>
        <p>{t.lead}</p>
      </div>

      <div className="hm-layout">
        <div className="hm-gallery" role="region" aria-roledescription="carousel" aria-label="Real baobab excursion photographs">
          <div className="hm-gallery-frame">
            {IMAGES.map((url, i) => (
              <img key={url} className={`hm-slide${i === index ? " is-current" : ""}`} src={url}
                alt={i === index ? scene[0] : ""} aria-hidden={i !== index}
                loading={i === 0 ? "eager" : "lazy"} decoding="async" />
            ))}
            <div className="hm-image-shade" aria-hidden="true" />
            <span className="hm-photo-label"><Camera size={13} />{t.photoLabel}</span>
            <div className="hm-gallery-caption" key={`caption-${lang}-${index}`} aria-live="off">
              <strong>{scene[0]}</strong>
              <p>{scene[1]}</p>
            </div>
            <div className="hm-gallery-toolbar">
              <span className="hm-counter">{String(index + 1).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}</span>
              <div className="hm-action-group">
                <button type="button" onClick={() => move(-1)} aria-label={t.previous}><ArrowLeft size={18} /></button>
                <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? t.play : t.pause}>
                  {paused ? <Play size={17} /> : <Pause size={17} />}
                </button>
                <button type="button" onClick={() => move(1)} aria-label={t.next}><ArrowRight size={18} /></button>
              </div>
            </div>
            {!paused && <div className="hm-progress"><span key={`timer-${index}`} /></div>}
          </div>
          <div className="hm-thumbnails" aria-label={t.ctaSecondary}>
            {IMAGES.map((url, i) => (
              <button key={url} type="button" onClick={() => setIndex(i)} aria-current={i === index ? "true" : undefined}
                aria-label={`${t.ctaSecondary} ${i + 1}`} className={i === index ? "is-selected" : ""}>
                <img src={url} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>

        <div className="hm-story">
          <div className="hm-quote"><Heart size={20} /><span>{t.miniTitle}</span></div>
          <p className="hm-story-intro">{t.miniText}</p>
          {t.paragraphs.map((paragraph, i) => <p className="hm-story-paragraph" key={i}>{paragraph}</p>)}
          <div className="hm-features">
            {t.features.map((feature, i) => (
              <div key={feature} className="hm-feature">
                {i === 0 ? <Compass size={18} /> : i === 1 ? <Camera size={18} /> : <Heart size={18} />}
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <button type="button" className="hm-contact" onClick={onContact}>{t.cta}<ArrowRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
