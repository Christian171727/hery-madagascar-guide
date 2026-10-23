import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, MapPin } from "lucide-react";
import { cityTourLocales } from "./cityTourLocales.js";

const PHOTOS = Array.from({length: 4}, (_, index) => ({
  id: index + 1,
  src: "/images/city-tours/city-" + String(index + 1).padStart(2,"0") + ".webp",
}));
const DELAY = 4000;
const CSS = "\n.dest-img .city-tours-gallery{position:absolute;inset:0;z-index:1;overflow:hidden;isolation:isolate;background:#253646;color:#fff}\n.dest-img .city-tours-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 42%;opacity:0;filter:none!important;transform:scale(1.045)!important;transition:opacity .85s ease,transform 4s linear;pointer-events:none}\n.dest-img .city-tours-slide.is-active{opacity:1;transform:scale(1)!important}\n.destination-card:hover .dest-img .city-tours-slide{filter:none!important}\n.city-tours-shade{position:absolute;inset:0;z-index:2;pointer-events:none;background:linear-gradient(180deg,transparent 65%,rgba(3,20,30,.56))}\n.city-tours-tag{position:absolute;z-index:4;left:13px;bottom:61px;border-radius:100px;border:1px solid rgba(255,255,255,.32);background:rgba(4,28,36,.74);padding:7px 11px;display:inline-flex;align-items:center;gap:6px;color:#ffdf9a;font-size:9px;font-weight:900;letter-spacing:.08em;backdrop-filter:blur(7px);max-width:calc(100% - 26px)}\n.city-tours-toolbar{position:absolute;bottom:14px;left:13px;right:13px;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:8px}\n.city-tours-count{padding:8px 11px;border-radius:999px;background:rgba(4,25,36,.84);color:white;font-size:11px;font-weight:900;letter-spacing:.06em;font-variant-numeric:tabular-nums}\n.city-tours-actions{display:flex;gap:6px}\n.city-tours-actions button{width:34px;height:34px;border-radius:50%;padding:0;border:1px solid rgba(255,255,255,.7);background:rgba(4,25,36,.8);color:#fff;display:grid;place-items:center;cursor:pointer;transition:background .2s,transform .2s}\n.city-tours-actions button:hover,.city-tours-actions button:focus-visible{background:#8c632e;transform:translateY(-2px)}\n.city-tours-progress{position:absolute;bottom:0;left:0;right:0;z-index:5;height:4px;background:rgba(255,255,255,.24)}\n.city-tours-progress span{display:block;width:100%;height:100%;transform-origin:left;background:#eccd82;animation:city-tours-fill 4s linear both}\n.destination-card .dest-body .city-tours-story{min-height:142px;margin:15px 0 10px;padding:8px 0 9px 13px;border-left:3px solid #c59d5d;animation:city-tours-reveal .5s ease both}\n.destination-card .dest-body .city-tours-story small{display:block;color:#b27f32;font-weight:900;font-size:9px;letter-spacing:.1em;line-height:1.4;margin-bottom:7px}\n.destination-card .dest-body .city-tours-story strong{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(21px,1.8vw,25px);line-height:1.16;color:var(--ink,#1c352a)}\n.destination-card .dest-body .city-tours-story p{margin:8px 0 0;color:var(--muted,#566b60);font-size:11px;line-height:1.6}\n@keyframes city-tours-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}\n@keyframes city-tours-reveal{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}\n@media(max-width:650px){.destination-card .dest-body .city-tours-story{min-height:155px}.destination-card .dest-body .city-tours-story strong{font-size:23px}}\n@media(prefers-reduced-motion:reduce){.dest-img .city-tours-slide{transition:none!important;transform:none!important}.city-tours-progress span,.city-tours-story{animation:none!important}}\n";

export default function CityToursGallery({lang = "en", onSceneChange}) {
  const locale = cityTourLocales[lang] || cityTourLocales.en;
  const [images, setImages] = useState(PHOTOS);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const selected = images[Math.min(current,images.length-1)] || PHOTOS[0];
  const scene = locale.scenes[selected.id - 1] || locale.scenes[0];

  useEffect(() => {
    onSceneChange?.({id:selected.id,lang,kicker:scene[0],title:scene[1],description:scene[2]});
  },[selected.id,lang,onSceneChange]);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setTimeout(() => setCurrent(prev => (prev + 1) % images.length), DELAY);
    return () => window.clearTimeout(timer);
  },[current,paused,images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const preload = new Image();
    preload.src = images[(current + 1) % images.length].src;
  },[current,images]);

  const move = direction => setCurrent(prev => (prev + direction + images.length) % images.length);
  const handleError = src => {
    setImages(previous => previous.filter(item => item.src !== src));
    setCurrent(0);
  };

  return (
    <div className="city-tours-gallery" role="region" aria-roledescription="carousel" aria-label={locale.alt}>
      <style>{CSS}</style>
      {images.map((photo,index) => (
        <img key={photo.src} src={photo.src}
          className={"city-tours-slide" + (index === current ? " is-active" : "")}
          alt={index === current ? scene[1] : ""}
          aria-hidden={index !== current}
          loading={index < 2 ? "eager" : "lazy"} decoding="async"
          onError={() => handleError(photo.src)} />
      ))}
      <div className="city-tours-shade" aria-hidden="true"/>
      <div className="city-tours-tag"><MapPin size={12}/>{locale.tag}</div>
      {images.length > 1 && (
        <>
          <div className="city-tours-toolbar">
            <span className="city-tours-count">{String(current + 1).padStart(2,"0")} / {String(images.length).padStart(2,"0")}</span>
            <div className="city-tours-actions">
              <button type="button" aria-label={locale.prev} onClick={() => move(-1)}><ArrowLeft size={16}/></button>
              <button type="button" aria-label={paused ? locale.play : locale.pause} onClick={() => setPaused(prev => !prev)}>{paused ? <Play size={16}/> : <Pause size={16}/>}</button>
              <button type="button" aria-label={locale.next} onClick={() => move(1)}><ArrowRight size={16}/></button>
            </div>
          </div>
          {!paused && <div className="city-tours-progress" aria-hidden="true"><span key={selected.src}/></div>}
        </>
      )}
    </div>
  );
}
