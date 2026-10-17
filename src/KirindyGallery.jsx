import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

const IMAGES = Array.from({ length: 4 }, (_, i) => "/images/kirindy/kirindy" + (i + 1) + ".jpeg");
const TEXT = {
  en: { tag: "Kirindy · Wild nature", previous: "Previous photo", next: "Next photo", pause: "Pause slideshow", play: "Resume slideshow" },
  fr: { tag: "Kirindy · Nature sauvage", previous: "Photo précédente", next: "Photo suivante", pause: "Mettre en pause", play: "Reprendre le diaporama" },
  mg: { tag: "Kirindy · Zavaboary", previous: "Sary teo aloha", next: "Sary manaraka", pause: "Ajanona", play: "Tohizana" },
};
const STYLES = [
  ".dest-img .kirindy-gallery { position:absolute; inset:0; overflow:hidden; isolation:isolate; background:#1c3025; }",
  ".dest-img .kirindy-gallery .kirindy-slide { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; transform:none; filter:none; transition:opacity .9s ease; pointer-events:none; }",
  ".dest-img .kirindy-gallery .kirindy-slide.active { opacity:1; }",
  ".destination-card:hover .dest-img .kirindy-gallery .kirindy-slide { transform:none; filter:none; }",
  ".dest-img .kirindy-tag { position:absolute; left:12px; bottom:51px; z-index:3; padding:6px 10px; border:1px solid rgba(255,255,255,.25); border-radius:20px; background:rgba(18,28,21,.65); color:#fff; backdrop-filter:blur(8px); font-size:10px; font-weight:700; }",
  ".dest-img .kirindy-controls { position:absolute; bottom:12px; left:11px; right:11px; display:flex; justify-content:space-between; align-items:center; gap:6px; z-index:4; }",
  ".dest-img .kirindy-count { border-radius:20px; padding:7px 9px; background:rgba(0,0,0,.51); color:#fff; font-weight:700; font-size:11px; }",
  ".dest-img .kirindy-actions { display:flex; gap:5px; }",
  ".dest-img .kirindy-actions button { display:grid; place-items:center; width:31px; height:31px; padding:0; background:rgba(19,29,24,.72); color:#fff; border:1px solid rgba(255,255,255,.48); border-radius:50%; backdrop-filter:blur(7px); cursor:pointer; transition:background .2s ease; }",
  ".dest-img .kirindy-actions button:hover, .dest-img .kirindy-actions button:focus-visible { background:#657e50; }",
  "@media (prefers-reduced-motion:reduce) { .dest-img .kirindy-gallery .kirindy-slide { transition:none; } }"
].join("\n");

export default function KirindyGallery({ lang = "en" }) {
  const [images, setImages] = useState(IMAGES);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = TEXT[lang] || TEXT.en;
  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [index, paused, images.length]);

  const move = (step) => setIndex((i) => (i + step + images.length) % images.length);
  const onImageError = (path) => {
    if (path === "/images/Kirindy.jpeg") return;
    setImages((old) => {
      const filtered = old.filter((item) => item !== path);
      return filtered.length ? filtered : ["/images/Kirindy.jpeg"];
    });
    setIndex(0);
  };
  return (
    <div className="kirindy-gallery" role="region" aria-label="Kirindy Forest photo carousel" aria-roledescription="carousel">
      <style>{STYLES}</style>
      {images.map((src, i) => (
        <img key={src} src={src}
          alt={i === index ? "Kirindy Forest, Madagascar" : ""}
          aria-hidden={i !== index}
          className={"kirindy-slide" + (i === index ? " active" : "")}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          onError={() => onImageError(src)}
        />
      ))}
      <span className="kirindy-tag">{t.tag}</span>
      <div className="kirindy-controls">
        <span className="kirindy-count" aria-live="off">{String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
        <div className="kirindy-actions">
          <button type="button" aria-label={t.previous} onClick={() => move(-1)}><ArrowLeft size={15} /></button>
          <button type="button" aria-label={paused ? t.play : t.pause} onClick={() => setPaused((p) => !p)}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
          <button type="button" aria-label={t.next} onClick={() => move(1)}><ArrowRight size={15} /></button>
        </div>
      </div>
    </div>
  );
}
