import React, { useRef, useState } from "react";
import { ArrowRight, Play, Film, Compass, MapPin } from "lucide-react";
import "./FieldJourneyVideo.css";
import { translateSiteRecord } from "./siteTranslationExtras.js";

const VIDEO = "/videos/hery-field-memories.mp4";
const POSTER = "/images/hery-field-memories-poster.webp";

const CONTENT = {
  en: {
    eyebrow: "FROM THE FIELD · REAL MADAGASCAR",
    heading: "Beyond the road, the adventure begins.",
    lead: "Some of Madagascar's most memorable stories unfold far from the main roads. A simple river crossing, the sound of a vehicle rolling onto a local ferry, and the changing light on the water can become part of the journey you remember most.",
    more: "Step into a genuine moment of travel with HERY Madagascar Local Guide. This short film offers a glimpse of the practical adventures, scenic detours and everyday encounters that make exploring Madagascar so distinctive. Every journey has its own rhythm, and every crossing reminds us that getting there can be just as meaningful as arriving.",
    extra: "Discover Madagascar thoughtfully: travel with curiosity, respect local communities and embrace the unexpected details along the way. Share the places you dream of visiting, and let's shape an experience around your interests, time and travel style.",
    category: "FIELD VIDEO",
    title: "A river crossing on the journey",
    duration: "13-second travel moment",
    note: "Real footage · Vertical format · Tap play to watch",
    play: "Play the travel video",
    contact: "Plan my Madagascar journey",
    tag1: "Real local moments",
    tag2: "Roads & river crossings",
    tag3: "Travel with HERY",
  },
  fr: {
    eyebrow: "SUR LE TERRAIN · MADAGASCAR AUTHENTIQUE",
    heading: "Au-delà de la route, l'aventure commence.",
    lead: "À Madagascar, les souvenirs les plus marquants naissent parfois loin des grands axes. Une traversée de rivière, un véhicule qui embarque sur un bac local et la lumière changeante sur l'eau peuvent devenir des moments aussi précieux que la destination elle-même.",
    more: "Entrez dans les coulisses d'un véritable voyage avec HERY Madagascar Local Guide. Cette courte vidéo révèle une facette des aventures du terrain, des détours pittoresques et des rencontres du quotidien qui rendent l'exploration de Madagascar si particulière. Chaque itinéraire a son rythme, chaque traversée raconte une histoire.",
    extra: "Découvrez l'île avec curiosité et respect, au contact des habitants et de leurs paysages. Dites-nous les lieux que vous rêvez de découvrir : nous pourrons imaginer une expérience adaptée à vos envies, votre calendrier et votre façon de voyager.",
    category: "VIDÉO DE TERRAIN",
    title: "Une traversée de rivière en voyage",
    duration: "13 secondes d'aventure",
    note: "Vidéo réelle · Format vertical · Appuyez pour regarder",
    play: "Lire la vidéo de voyage",
    contact: "Préparer mon voyage à Madagascar",
    tag1: "Moments authentiques",
    tag2: "Routes & traversées",
    tag3: "Voyager avec HERY",
  },
  mg: {
    eyebrow: "TENY AN-DALANA · MADAGASIKARA TENA IZY",
    heading: "Rehefa tapitra ny lalana, manomboka ny traikefa.",
    lead: "Indraindray dia any lavitry ny arabe lehibe no ahitana ireo fahatsiarovana tsara indrindra eto Madagasikara. Ny fiampitana renirano, ny fiakarana fiara amin'ny lakana fitaterana ary ny hazavana eny ambonin'ny rano dia mety ho anisan'ny fotoana tsy hay hadinoina indrindra amin'ny dia.",
    more: "Ity horonantsary fohy ity dia mampiseho fotoana tena nitranga nandritra ny dia, miaraka amin'ny HERY Madagascar Local Guide. Ho hitanao ao ny fiampitana rano, ny làlana tsy mahazatra ary ny hakanton'ny fiainana eny ambanivohitra. Samy manana ny tantarany ny toerana sy ny dia tsirairay; tsy ny fahatongavana ihany no mahafinaritra fa ny lalana aleha koa.",
    extra: "Andao hizaha an'i Madagasikara amim-panajana sy fahalianana, sady manome lanja ny mponina sy ny tontolo iainana. Lazao izay toerana tianao hotsidihina, dia afaka mandamina dia mifanaraka amin'ny fotoana sy ny fanirianao isika.",
    category: "HORONANTSARY TENY AN-DALANA",
    title: "Fiampitana renirano nandritra ny dia",
    duration: "13 segondra amin'ny dia",
    note: "Horonantsary tena izy · Endrika mitsangana · Tsindrio Play",
    play: "Hijery ny horonantsary",
    contact: "Handamina ny diako eto Madagasikara",
    tag1: "Fotoana tena izy",
    tag2: "Lalana sy fiampitana",
    tag3: "Miaraka amin'i HERY",
  },
};

export default function FieldJourneyVideo({ lang = "en", onContact }) {
  const t = CONTENT[lang] || translateSiteRecord(CONTENT.en, lang);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const playVideo = async () => {
    try {
      await videoRef.current?.play();
    } catch {
      // Native video controls remain available if the browser blocks playback.
    }
  };

  return (
    <section id="field-video" className="field-video-section" aria-labelledby="field-video-title">
      <div className="field-video-inner">
        <div className="field-video-media">
          <div className="field-video-frame">
            <video
              ref={videoRef}
              src={VIDEO}
              poster={POSTER}
              controls
              playsInline
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              aria-label={t.title}
            >
              {t.title}
            </video>
            {!playing && (
              <button type="button" className="field-video-play" onClick={playVideo} aria-label={t.play}>
                <Play size={25} fill="currentColor" aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="field-video-media-caption">
            <span><Film size={15} /> {t.category}</span>
            <strong>{t.title}</strong>
            <small>{t.duration} · {t.note}</small>
          </div>
        </div>
        <div className="field-video-copy">
          <span className="field-video-eyebrow"><Compass size={17} /> {t.eyebrow}</span>
          <h2 id="field-video-title">{t.heading}</h2>
          <p className="field-video-lead">{t.lead}</p>
          <p>{t.more}</p>
          <p>{t.extra}</p>
          <div className="field-video-tags" aria-label={t.tag1}>
            <span><MapPin size={15}/>{t.tag1}</span>
            <span>{t.tag2}</span>
            <span>{t.tag3}</span>
          </div>
          <button type="button" className="field-video-contact" onClick={onContact}>
            {t.contact} <ArrowRight size={19} />
          </button>
        </div>
      </div>
    </section>
  );
}