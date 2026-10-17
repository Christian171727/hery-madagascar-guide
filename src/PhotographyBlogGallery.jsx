import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Clock, Pause, Play } from "lucide-react";

// The two field photographs supplied for the Photography blog story.
// Optimized AVIFs are in public/images/photography/; the original JPEGs
// are retained in the downloadable source bundle.
const PHOTOS = [
  "/images/photography/photographe.avif",
  "/images/photography/photographe1.avif",
];
const FALLBACK = "/images/Baobabs.jpg";
const INTERVAL = 4000;

const copy = {
  en: {
    kicker: "PHOTOGRAPHY · WESTERN MADAGASCAR",
    prev: "Previous photograph", next: "Next photograph",
    pause: "Pause slideshow", play: "Resume slideshow", read: "read",
    scenes: [
      {
        title: "Framing a majestic baobab",
        description: "A photographer pauses beneath an ancient baobab, using the tree's sculptural branches and the changing sky to create a memorable composition.",
        alt: "Photographer photographing a towering baobab beneath a cloudy sky",
      },
      {
        title: "The magic behind the photograph",
        description: "With a camera on a tripod, photographers wait among the baobabs for softer evening light and dramatic cloud textures. Every moment offers a new perspective.",
        alt: "Photographers with tripod among baobabs under a dramatic sky",
      },
    ],
    notes: "Two behind-the-scenes moments of photography among Madagascar's baobabs",
  },
  fr: {
    kicker: "PHOTOGRAPHIE · OUEST DE MADAGASCAR",
    prev: "Photo précédente", next: "Photo suivante",
    pause: "Mettre en pause", play: "Reprendre le diaporama", read: "de lecture",
    scenes: [
      {
        title: "Cadrer un baobab majestueux",
        description: "Un photographe prend le temps d'observer un baobab ancien. Ses branches sculpturales et le ciel changeant donnent toute sa force à la composition.",
        alt: "Photographe face à un grand baobab sous un ciel nuageux",
      },
      {
        title: "La magie derrière la photo",
        description: "Avec l'appareil sur trépied, les photographes attendent une lumière plus douce et les nuances du ciel. Chaque instant révèle une nouvelle perspective.",
        alt: "Photographes et trépied parmi les baobabs sous un ciel spectaculaire",
      },
    ],
    notes: "Deux instants de photographie sur le terrain parmi les baobabs de Madagascar",
  },
  mg: {
    kicker: "FAKANA SARY · ANDREFAN'I MADAGASIKARA",
    prev: "Sary teo aloha", next: "Sary manaraka",
    pause: "Ajanona aloha", play: "Alefa indray", read: "vakina",
    scenes: [
      {
        title: "Maka sary baobab mijoalajoala",
        description: "Mandinika sy misafidy zoro tsara ilay mpaka sary eo anoloan'ny baobab, ka ny sampany sy ny rahona no mampiavaka ny sary.",
        alt: "Mpaka sary sy hazo baobab lehibe eny an-kianja",
      },
      {
        title: "Ny tantara ao ambadiky ny sary",
        description: "Mampiasa trépied ireo mpaka sary ary miandry ny hazavana malefaka sy ny endriky ny rahona. Miova hatrany ny hakanton'ny toerana.",
        alt: "Mpaka sary sy trépied eo anivon'ny baobab",
      },
    ],
    notes: "Fotoana roa nandritra ny fakana sary baobab teto Madagasikara",
  },
};

const styles = `
.photography-feature-stage{position:relative;overflow:hidden;isolation:isolate;background:#1f251e}
.photography-feature-stage .photography-feature-photo{position:absolute!important;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .85s ease;transform:none!important;filter:none!important}
.photography-feature-stage .photography-feature-photo.is-active{opacity:1}
.photography-feature-shade{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(3,10,9,.12) 0%,rgba(3,10,9,.07) 30%,rgba(3,10,9,.88) 100%);pointer-events:none}
.photography-feature-stage .post-category{z-index:3}
.photography-feature-caption{position:absolute;left:20px;right:20px;bottom:28px;z-index:3;color:white;pointer-events:none;animation:photography-caption-rise .7s ease both}
.photography-feature-caption small{display:block;color:#e6ca89;font-size:9px;font-weight:900;letter-spacing:.1em;margin-bottom:7px}
.photography-feature-caption strong{display:block;font-size:clamp(16px,2vw,21px);line-height:1.13;font-family:'Cormorant Garamond',serif}
.photography-feature-count{position:absolute;top:16px;right:15px;z-index:3;padding:5px 9px;border-radius:999px;background:rgba(0,0,0,.52);color:#fff;font-size:10px;letter-spacing:.08em}
.photography-feature-content{min-height:230px}
.photography-feature-detail{animation:photography-caption-rise .7s ease both}
.photography-feature-detail strong{display:block;margin-top:10px;font-weight:800;font-size:12px;color:var(--ink)}
.photography-feature-detail p{font-size:12px;line-height:1.65;color:var(--text);margin:5px 0 9px}
.photography-feature-progress{position:absolute;left:0;bottom:0;z-index:5;width:100%;height:3px;background:rgba(255,255,255,.25)}
.photography-feature-progress span{display:block;height:100%;width:100%;background:#ddbd79;transform-origin:left;animation:photography-progress 4s linear forwards}
.photography-article-hero{min-height:clamp(420px,63vh,610px)!important;flex:0 0 clamp(420px,63vh,610px)!important;overflow:hidden;background:#1b2420;isolation:isolate}
.photography-article-background{position:absolute;inset:-16px;width:calc(100% + 32px);height:calc(100% + 32px);object-fit:cover;filter:blur(22px) brightness(.48);transform:scale(1.06);opacity:0;transition:opacity .85s ease}
.photography-article-background.is-active{opacity:1}
.photography-article-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:center center;opacity:0;transition:opacity .85s ease;z-index:1}
.photography-article-photo.is-active{opacity:1}
.photography-article-hero img{animation:none!important}
.photography-article-hero .article-hero-overlay{z-index:2;background:linear-gradient(180deg,rgba(4,13,10,.48) 0%,rgba(4,13,10,.08) 28%,rgba(4,13,10,.93) 95%)}
.photography-article-hero .article-hero-content{z-index:3;bottom:62px;left:clamp(22px,5vw,60px);right:clamp(22px,5vw,60px);max-width:min(760px,calc(100% - 44px));color:white}
.photography-article-hero .article-category{color:#fff}
.photography-article-hero .article-hero-content h1{font-size:clamp(2.0rem,4.3vw,4rem);line-height:1.01;color:white!important;margin:0 0 9px}
.photography-article-dynamic{animation:photography-caption-rise .75s cubic-bezier(.2,.7,.25,1) both;max-width:690px}
.photography-article-dynamic strong{display:block;color:#f6dfaa;font-size:clamp(15px,1.9vw,20px);font-weight:800;line-height:1.25}
.photography-article-dynamic p{margin:7px 0 0;line-height:1.5;color:rgba(255,255,255,.95);font-size:clamp(12px,1.2vw,14px);max-width:630px}
.photography-article-hero .article-meta{margin-top:10px}
.photography-hero-controls{position:absolute;bottom:12px;left:clamp(22px,5vw,60px);right:clamp(22px,5vw,60px);z-index:5;display:flex;align-items:center;justify-content:space-between;gap:10px;color:#fff}
.photography-hero-actions{display:flex;gap:7px}
.photography-hero-actions button{display:grid;place-items:center;border-radius:50%;border:1px solid rgba(255,255,255,.55);background:rgba(4,17,12,.68);backdrop-filter:blur(8px);width:36px;height:36px;padding:0;color:#fff;cursor:pointer;transition:background .2s}
.photography-hero-actions button:hover,.photography-hero-actions button:focus-visible{background:#a97839}
.photography-hero-count{font-size:11px;font-weight:800;letter-spacing:.12em;background:rgba(5,12,9,.52);padding:9px 12px;border-radius:999px}
.photography-article-progress{position:absolute;bottom:0;left:0;right:0;height:3px;background:rgba(255,255,255,.25);z-index:5}
.photography-article-progress span{display:block;width:100%;height:100%;background:#dfbc76;transform-origin:left;animation:photography-progress 4s linear both}
.photography-story{width:min(820px,calc(100% - 48px));margin:12px auto 42px}
.photography-story h3{color:var(--ink);font-family:'Cormorant Garamond',serif;font-size:clamp(1.7rem,3vw,2.3rem);margin:0 0 15px}
.photography-story-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.photography-story-figure{margin:0;background:var(--surface);border:1px solid var(--line);border-radius:15px;overflow:hidden}
.photography-story-figure img{display:block;width:100%;height:310px;object-fit:contain;background:#1c2822}
.photography-story-figure figcaption{padding:16px}
.photography-story-figure figcaption strong{display:block;font-size:14px;color:var(--ink);margin-bottom:7px}
.photography-story-figure figcaption p{margin:0;font-size:12px;line-height:1.75;color:var(--text)}
@keyframes photography-caption-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes photography-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@media(max-width:700px){.photography-story-grid{grid-template-columns:1fr}.photography-article-hero{min-height:490px!important;flex-basis:490px!important}.photography-article-hero .article-hero-content{bottom:65px}.photography-story-figure img{height:340px}.photography-feature-content{min-height:250px}}
@media(max-width:420px){.photography-article-hero{min-height:520px!important;flex-basis:520px!important}.photography-article-hero .article-hero-content h1{font-size:2rem}.photography-article-dynamic p{font-size:12px;line-height:1.4}.photography-article-hero .article-meta{font-size:9px}.photography-article-hero .article-hero-content{bottom:65px}.photography-feature-caption{bottom:18px;left:13px;right:13px}.photography-story{width:calc(100% - 32px)}}
@media(prefers-reduced-motion:reduce){.photography-feature-photo,.photography-article-photo,.photography-article-background{transition:none!important}.photography-article-dynamic,.photography-feature-caption,.photography-feature-detail,.photography-feature-progress span,.photography-article-progress span{animation:none!important}}
`;

function usePhotoSlides() {
  const [images, setImages] = useState(PHOTOS);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = Math.min(index, images.length - 1);
  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setTimeout(() => setIndex(i => (i + 1) % images.length), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [current, paused, images.length]);
  useEffect(() => {
    if (images.length < 2) return;
    const next = new Image();
    next.src = images[(current + 1) % images.length];
  }, [current, images.length]);
  const onError = (src) => {
    if (src === FALLBACK) return;
    setImages(old => {
      const next = old.filter(image => image !== src);
      return next.length ? next : [FALLBACK];
    });
    setIndex(0);
  };
  const move = (step) => setIndex(i => (i + step + images.length) % images.length);
  return { images, index: current, paused, setPaused, move, onError };
}

export function PhotographyFeaturedPreview({ post, readLabel, isMG = false, isFR = false }) {
  const lang = isMG ? "mg" : isFR ? "fr" : "en";
  const t = copy[lang];
  const { images, index, onError } = usePhotoSlides();
  const caption = t.scenes[Math.min(index, t.scenes.length - 1)];
  return <>
    <style>{styles}</style>
    <div className="post-image photography-feature-stage" role="group" aria-label="Baobab photography slideshow">
      {images.map((src, i) => <img key={src} src={src} alt={i === index ? caption.alt : ""}
        className={`photography-feature-photo${i === index ? " is-active" : ""}`}
        aria-hidden={i !== index} onError={() => onError(src)}
        loading={i === 0 ? "eager" : "lazy"} decoding="async" />)}
      <div className="photography-feature-shade" aria-hidden="true" />
      <span className="post-category">{post.category}</span>
      <span className="photography-feature-count">{String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
      <div className="photography-feature-caption" key={lang + index} aria-live="off">
        <small>{t.kicker}</small><strong>{caption.title}</strong>
      </div>
      {images.length > 1 && <div className="photography-feature-progress" aria-hidden="true"><span key={index}/></div>}
    </div>
    <div className="post-body photography-feature-content">
      <span className="post-meta"><Clock size={14}/>{post.duration} {t.read}</span>
      <h3>{post.title}</h3>
      <div className="photography-feature-detail" key={lang + "-detail-" + index} aria-live="off">
        <strong>{caption.title}</strong><p>{caption.description}</p>
      </div>
      <span className="post-read">{readLabel}<ArrowRight size={14}/></span>
    </div>
  </>;
}

export function PhotographyArticleHero({ post, isMG = false, isFR = false }) {
  const lang = isMG ? "mg" : isFR ? "fr" : "en";
  const t = copy[lang];
  const { images, index, paused, setPaused, move, onError } = usePhotoSlides();
  const caption = t.scenes[Math.min(index, t.scenes.length - 1)];
  return <div className="article-hero photography-article-hero" role="region" aria-roledescription="carousel" aria-label={post.title}>
    <style>{styles}</style>
    {images.map((src, i) => <React.Fragment key={src}>
      <img src={src} alt="" aria-hidden="true" className={`photography-article-background${i === index ? " is-active" : ""}`}
        onError={() => onError(src)}/>
      <img src={src} alt={i === index ? caption.alt : ""} aria-hidden={i !== index}
        className={`photography-article-photo${i === index ? " is-active" : ""}`}
        onError={() => onError(src)} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
    </React.Fragment>)}
    <div className="article-hero-overlay" />
    <div className="article-hero-content">
      <span className="article-category">{post.category}</span>
      <h1>{post.title}</h1>
      <div className="photography-article-dynamic" key={lang + "-hero-" + index} aria-live="off">
        <strong>{caption.title}</strong><p>{caption.description}</p>
      </div>
      <div className="article-meta"><Clock size={15}/><span>{post.duration} {t.read}</span><span className="article-dot">•</span><span>HERY · Madagascar</span></div>
    </div>
    {images.length > 1 && <>
      <div className="photography-hero-controls">
        <span className="photography-hero-count">{String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
        <div className="photography-hero-actions">
          <button type="button" aria-label={t.prev} onClick={() => move(-1)}><ArrowLeft size={18}/></button>
          <button type="button" aria-label={paused ? t.play : t.pause} onClick={() => setPaused(x => !x)}>{paused ? <Play size={17}/> : <Pause size={17}/>}</button>
          <button type="button" aria-label={t.next} onClick={() => move(1)}><ArrowRight size={18}/></button>
        </div>
      </div>
      {!paused && <div className="photography-article-progress" aria-hidden="true"><span key={index}/></div>}
    </>}
  </div>;
}

export function PhotographyArticleScenes({ lang = "en" }) {
  const t = copy[lang] || copy.en;
  return <section className="photography-story" aria-label={t.notes}>
    <style>{styles}</style>
    <h3>{t.notes}</h3>
    <div className="photography-story-grid">
      {PHOTOS.map((src,i) => <figure className="photography-story-figure" key={src}>
        <img src={src} alt={t.scenes[i].alt} loading="lazy" decoding="async" onError={e => { if (!e.currentTarget.src.endsWith(FALLBACK)) e.currentTarget.src = FALLBACK; }} />
        <figcaption><strong>{t.scenes[i].title}</strong><p>{t.scenes[i].description}</p></figcaption>
      </figure>)}
    </div>
  </section>;
}