import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Leaf, Pause, Play } from "lucide-react";

/**
 * Conservation photo gallery for HERY Madagascar Local Guide.
 *
 * Put the owner's original JPEGs in public/images/conservation/.
 * The gallery discovers available files, so missing photos never produce
 * broken images. Until real photos are uploaded it preserves forest.jpeg.
 *
 * Real file names supplied by the owner:
 * conservation1, 2, 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15 (.jpeg)
 */
const PHOTO_IDS = [1, 2, 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15];

const EN = [
  ["Growing a Greener Madagascar", "Discover the people and places behind meaningful conservation."],
  ["Small Actions. Lasting Change.", "Every contribution matters for Madagascar's natural heritage."],
  ["Restoring Forests Together", "Caring for the land, one step at a time."],
  ["Plant Today. Protect Tomorrow.", "The future of biodiversity begins with collective action."],
  ["Every Tree Holds a Future", "Nature is worth protecting for generations to come."],
  ["Communities Make the Difference", "Local commitment is at the heart of lasting conservation."],
  ["Protect Madagascar's Biodiversity", "Explore a thoughtful approach to conservation and wildlife."],
  ["Sharing Knowledge, Building Hope", "Learning together helps nature and communities thrive."],
  ["Conservation Through Connection", "Discover the value of working side by side."],
  ["A Shared Commitment to Nature", "Real change grows through care, respect and participation."],
  ["Small Steps, Real Impact", "Positive actions can inspire a more sustainable tomorrow."],
  ["People at the Heart of Conservation", "The strongest conservation stories start with community."],
  ["Together for Tomorrow's Forests", "Discover Madagascar's natural beauty with respect and care."],
];

const FR = [
  ["Cultivons un Madagascar plus vert", "Découvrons les personnes et les lieux qui donnent vie à la conservation."],
  ["De petits gestes, un grand impact", "Chaque contribution compte pour le patrimoine naturel de Madagascar."],
  ["Restaurons les forêts ensemble", "Protéger les paysages, un geste à la fois."],
  ["Planter aujourd'hui, protéger demain", "L'avenir de la biodiversité commence par l'action collective."],
  ["Chaque arbre porte un avenir", "Une nature à préserver pour les générations futures."],
  ["Les communautés font la différence", "L'engagement local donne tout son sens à la conservation."],
  ["Protégeons la biodiversité malgache", "Une approche respectueuse de la nature et de la faune."],
  ["Partager les connaissances, cultiver l'espoir", "Apprendre ensemble aide la nature et les communautés."],
  ["La conservation nous rapproche", "Découvrons la valeur de l'action collective."],
  ["Un engagement partagé pour la nature", "Le changement grandit avec le respect et la participation."],
  ["De petits pas, un impact réel", "Chaque action positive peut inspirer un avenir durable."],
  ["L'humain au cœur de la conservation", "Les plus belles initiatives commencent avec les communautés."],
  ["Ensemble pour les forêts de demain", "Découvrons la nature malgache avec respect et attention."],
];

const MG = [
  ["Andao hamboly Madagasikara maitso", "Fantaro ireo olona sy toerana mandray anjara amin'ny fiarovana ny tontolo iainana."],
  ["Hetsika kely, vokatra maharitra", "Sarobidy ny fandraisana anjaran'ny tsirairay ho an'ny natiora."],
  ["Miara-mamerina ny ala", "Mikarakara ny tany sy ny ala, tsikelikely."],
  ["Mamboly androany, miaro ny ampitso", "Ny fiaraha-mientana no fototry ny hoavin'ny zavaboary."],
  ["Ny hazo tsirairay dia fanantenana", "Andao hiaro ny natiora ho an'ny taranaka."],
  ["Ny fiarahamonina no hery", "Ny fandraisana andraikitra eny ifotony no fototry ny fiarovana."],
  ["Arovy ny zavamananaina eto Madagasikara", "Hajao ny natiora sy ny biby dia."],
  ["Mizara fahalalana, manorina fanantenana", "Ny fianarana miaraka dia manampy ny fiarahamonina sy ny natiora."],
  ["Mampiray antsika ny fiarovana", "Fantaro ny lanjan'ny fiaraha-miasa."],
  ["Miara-miantoka ny natiora", "Mitombo ny fiovana amin'ny fifanajana sy fandraisana anjara."],
  ["Dingana kely, vokatra lehibe", "Ny asa tsara dia manentana ho amin'ny hoavy maharitra."],
  ["Ny olona no ivon'ny fiarovana", "Ny fiarahamonina no fototry ny asa maharitra."],
  ["Miara-miaro ny alan'ny ampitso", "Andao hankafy sy hanaja ny harena voajanaharin'i Madagasikara."],
];

const UI = {
  en: { category: "CONSERVATION IN ACTION", discover: "Discover our conservation approach", back: "Previous photo", next: "Next photo", pause: "Pause slideshow", play: "Play slideshow", goto: "Go to photo", fallbackTitle: "Conservation begins with care", fallbackText: "Explore HERY's commitment to biodiversity, forest restoration and local communities." },
  fr: { category: "LA CONSERVATION EN ACTION", discover: "Découvrir notre engagement", back: "Photo précédente", next: "Photo suivante", pause: "Mettre en pause", play: "Reprendre le diaporama", goto: "Aller à la photo", fallbackTitle: "Protéger la nature commence par l'attention", fallbackText: "Découvrez l'engagement de HERY pour la biodiversité, la forêt et les communautés." },
  mg: { category: "FIAROVANA NY TONTOLO IAINANA", discover: "Fantaro ny asa fiarovana", back: "Sary teo aloha", next: "Sary manaraka", pause: "Ajanony aloha", play: "Alefaso indray", goto: "Hankany amin'ny sary", fallbackTitle: "Ny fikarakarana no fiandohan'ny fiarovana", fallbackText: "Fantaro ny ezaka ataon'i HERY ho an'ny ala sy ny zavamananaina." },
};

const INTERVAL = 4000;

export default function ConservationGallery({ lang = "en", fallback = "/images/forest.jpeg" }) {
  const galleryRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [loaded, setLoaded] = useState({});

  useEffect(() => {
    const node = galleryRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((item) => item.isIntersecting)),
      { rootMargin: "250px 0px", threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  // Discover only real uploaded JPEGs: do not display missing / broken sources.
  // HEAD also avoids downloading all 13 large photos on page load.
  useEffect(() => {
    if (!visible || ready) return;
    let canceled = false;
    async function discover() {
      const results = await Promise.all(
        PHOTO_IDS.map(async (id, index) => {
          const src = `/images/conservation/conservation${id}.jpeg`;
          try {
            const response = await fetch(src, { method: "HEAD" });
            const type = response.headers.get("content-type") || "";
            if (response.ok && type.toLowerCase().startsWith("image/")) {
              return { id, src, index };
            }
          } catch (_) {
            // Fall back safely to the original forest image when unavailable.
          }
          return null;
        })
      );
      if (!canceled) {
        setPhotos(results.filter(Boolean));
        setCurrent(0);
        setReady(true);
      }
    }
    discover();
    return () => { canceled = true; };
  }, [visible, ready]);

  const available = photos.length > 0
    ? photos
    : [{ id: "forest", src: fallback, index: 0 }];
  const item = available[Math.min(current, available.length - 1)] || available[0];
  const ui = UI[lang] || UI.en;
  const captions = lang === "fr" ? FR : lang === "mg" ? MG : EN;
  const caption = photos.length > 0
    ? captions[item.index]
    : [ui.fallbackTitle, ui.fallbackText];
  const shouldPlay = visible && pageVisible && !paused && !reduceMotion && available.length > 1 && ready;

  useEffect(() => {
    if (!shouldPlay) return;
    const handle = window.setInterval(() => {
      setCurrent((n) => (n + 1) % available.length);
    }, INTERVAL);
    return () => window.clearInterval(handle);
  }, [shouldPlay, available.length]);

  useEffect(() => {
    if (available.length < 2 || !visible) return;
    const next = available[(current + 1) % available.length];
    if (!next) return;
    const image = new Image();
    image.src = next.src;
  }, [current, available.length, ready, visible]);

  const previous = () => setCurrent((n) => (n - 1 + available.length) % available.length);
  const next = () => setCurrent((n) => (n + 1) % available.length);

  return (
    <div
      className="conservation-gallery"
      ref={galleryRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="HERY Madagascar conservation photo gallery"
    >
      <div className="conservation-gallery-stage">
        {available.map((photo, index) => (
          <img
            key={photo.src}
            className={`conservation-gallery-photo${index === current ? " is-current" : ""}`}
            src={photo.src}
            alt={photo.id === "forest" ? "Forest in Madagascar" : `Conservation and community activities in Madagascar — photo ${photo.id}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded((list) => ({ ...list, [photo.src]: true }))}
            onError={() => {
              if (photo.id !== "forest") {
                setPhotos((list) => list.filter((entry) => entry.src !== photo.src));
                setCurrent(0);
              }
            }}
            aria-hidden={index !== current}
          />
        ))}
        <div className="conservation-gallery-shade" aria-hidden="true" />
        <div className="conservation-gallery-caption" key={item.src + lang}>
          <span className="conservation-gallery-eyebrow"><Leaf size={15} /> {ui.category}</span>
          <h3>{caption[0]}</h3>
          <p>{caption[1]}</p>
          <a href="#contact" className="conservation-gallery-link">{ui.discover} <ArrowRight size={15} /></a>
        </div>
        {ready && available.length > 1 && (
          <span className="conservation-gallery-index" aria-label={`Photo ${current + 1} of ${available.length}`}>
            {String(current + 1).padStart(2, "0")} / {String(available.length).padStart(2, "0")}
          </span>
        )}
      </div>

      {ready && available.length > 1 && (
        <div className="conservation-gallery-toolbar">
          <div className="conservation-gallery-dots" aria-label="Choose photo">
            {available.map((photo, index) => (
              <button
                type="button"
                key={photo.src}
                onClick={() => setCurrent(index)}
                className={`conservation-gallery-dot${index === current ? " is-current" : ""}`}
                aria-label={`${ui.goto} ${index + 1}`}
                aria-current={index === current ? "true" : undefined}
              />
            ))}
          </div>
          <div className="conservation-gallery-actions">
            <button type="button" onClick={previous} aria-label={ui.back}><ArrowLeft size={17} /></button>
            <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? ui.play : ui.pause}>
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <button type="button" onClick={next} aria-label={ui.next}><ArrowRight size={17} /></button>
          </div>
        </div>
      )}
    </div>
  );
}
