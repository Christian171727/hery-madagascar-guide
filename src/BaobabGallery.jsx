import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { BAOBAB_FILES, BAOBAB_STORIES, getBaobabStory } from "./baobabStoryLocales.js";

// Only the eight baobab photographs supplied in Baobabs(6).zip.
const INTERVAL = 4000;
const CSS = "\n.dest-img .baobab-gallery{position:absolute;inset:0;overflow:hidden;isolation:isolate;background:#251f1d}\n.dest-img .baobab-gallery .baobab-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 48%;opacity:0;transform:scale(1.055);filter:none;transition:opacity .9s ease,transform 4s linear;pointer-events:none}\n.dest-img .baobab-gallery .baobab-slide.active{opacity:1;transform:scale(1)}\n.destination-card:hover .dest-img .baobab-gallery .baobab-slide{filter:none!important}\n.dest-img .baobab-gallery:after{content:\"\";pointer-events:none;position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,23,19,.05) 38%,rgba(12,20,18,.38) 100%);z-index:1}\n.dest-img .baobab-badge{position:absolute;left:12px;right:12px;bottom:54px;z-index:3;display:inline-flex;width:max-content;max-width:calc(100% - 24px);overflow-wrap:anywhere;background:rgba(23,29,23,.66);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.29);padding:7px 11px;border-radius:18px;color:#fff9e8;font-size:10px;line-height:1.25;font-weight:800;letter-spacing:.02em}\n.dest-img .baobab-controls{position:absolute;left:12px;right:12px;bottom:13px;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:8px}\n.dest-img .baobab-counter{padding:7px 11px;border-radius:20px;background:rgba(18,27,22,.76);color:white;font-size:11px;font-weight:900;font-variant-numeric:tabular-nums}\n.dest-img .baobab-buttons{display:flex;gap:6px}\n.dest-img .baobab-buttons button{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:rgba(18,29,27,.76);border:1px solid rgba(255,255,255,.64);color:white;cursor:pointer;padding:0;backdrop-filter:blur(8px);transition:background .2s,transform .2s}\n.dest-img .baobab-buttons button:hover,.dest-img .baobab-buttons button:focus-visible{background:#a77a39;transform:translateY(-2px)}\n.destination-card .dest-body .baobab-story{min-height:139px;margin:16px 0 12px;padding:0 0 0 13px;border-left:3px solid #c6984b;animation:baobab-story-enter .65s cubic-bezier(.2,.7,.2,1) both}\n.destination-card .dest-body .baobab-story small{display:block;color:var(--gold-600,#ac7d36);font-size:10px;font-weight:900;letter-spacing:.13em;line-height:1.4;margin:0 0 7px;text-transform:uppercase}\n.destination-card .dest-body .baobab-story strong{display:block;color:var(--ink,#243c32);font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(23px,1.9vw,28px);line-height:1.13;font-weight:800;overflow-wrap:anywhere}\n.destination-card .dest-body .baobab-story p{margin:8px 0 0;color:var(--muted,#5b675f);font-size:12px;line-height:1.67}\n@keyframes baobab-story-enter{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}\n@media(max-width:650px){.destination-card .dest-body .baobab-story{min-height:130px}.destination-card .dest-body .baobab-story strong{font-size:24px}}\n@media(prefers-reduced-motion:reduce){.dest-img .baobab-gallery .baobab-slide{transition:none!important;transform:none!important}.destination-card .dest-body .baobab-story{animation:none!important}}\n";

export default function BaobabGallery({ lang = "en", onSceneChange }) {
  const [images, setImages] = useState(BAOBAB_FILES);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = Math.min(index, images.length - 1);
  const source = images[current] || BAOBAB_FILES[0];
  const sceneIndex = Math.max(0, BAOBAB_FILES.indexOf(source));
  const scene = getBaobabStory(lang, sceneIndex);
  const locale = BAOBAB_STORIES[lang] || BAOBAB_STORIES.en;
  const [prevLabel, nextLabel, pauseLabel, playLabel] = locale.controls;

  useEffect(() => {
    onSceneChange?.({ lang, id: sceneIndex + 1, ...getBaobabStory(lang, sceneIndex) });
  }, [sceneIndex, lang, onSceneChange]);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setTimeout(() => setIndex(value => (value + 1) % images.length), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [index, paused, images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const image = new window.Image();
    image.src = images[(current + 1) % images.length];
  }, [current, images]);

  const step = direction => setIndex(value => (value + direction + images.length) % images.length);
  const onError = src => {
    setImages(previous => previous.filter(path => path !== src));
    setIndex(0);
  };

  return (
    <div className="baobab-gallery" role="region" aria-roledescription="carousel" aria-label={scene.title}>
      <style>{CSS}</style>
      {images.map((src, i) => (
        <img key={src} src={src}
          alt={i === current ? scene.title : ""}
          aria-hidden={i !== current}
          decoding="async"
          loading={i < 2 ? "eager" : "lazy"}
          className={"baobab-slide" + (i === current ? " active" : "")}
          onError={() => onError(src)}
        />
      ))}
      {images.length > 0 && <span className="baobab-badge">{scene.tag}</span>}
      {images.length > 1 && <div className="baobab-controls">
        <span className="baobab-counter">{String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
        <div className="baobab-buttons">
          <button type="button" aria-label={prevLabel} onClick={() => step(-1)}><ArrowLeft size={16} /></button>
          <button type="button" aria-label={paused ? playLabel : pauseLabel} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
          <button type="button" aria-label={nextLabel} onClick={() => step(1)}><ArrowRight size={16} /></button>
        </div>
      </div>}
    </div>
  );
}
