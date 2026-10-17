import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
const FILES = Array.from({length:15}, (_,i)=>"/images/baobabs/baobab"+(i+1)+".jpeg");
const COPY = {
en: {tag:"Golden hour · Morondava",prev:"Previous photo",next:"Next photo",pause:"Pause slideshow",play:"Resume slideshow"},
fr: {tag:"Lumière dorée · Morondava",prev:"Photo précédente",next:"Photo suivante",pause:"Mettre en pause",play:"Reprendre"},
mg: {tag:"Masoandro mody · Morondava",prev:"Sary teo aloha",next:"Sary manaraka",pause:"Ajanona",play:"Tohizana"}
};
const CSS = `
.dest-img .baobab-gallery{position:absolute;inset:0;overflow:hidden;isolation:isolate;background:#31251c}
.dest-img .baobab-gallery .baobab-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:none;filter:none;transition:opacity .85s ease;pointer-events:none}
.dest-img .baobab-gallery .baobab-slide.active{opacity:1}
.destination-card:hover .dest-img .baobab-gallery .baobab-slide{transform:none;filter:none}
.dest-img .baobab-badge{position:absolute;left:12px;bottom:51px;z-index:2;background:rgba(20,25,23,.52);backdrop-filter:blur(9px);border:1px solid rgba(255,255,255,.26);padding:6px 10px;border-radius:20px;color:#fff;font-size:10px;font-weight:700}
.dest-img .baobab-controls{position:absolute;left:11px;right:11px;bottom:12px;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:5px}
.dest-img .baobab-counter{padding:7px 9px;border-radius:20px;background:rgba(0,0,0,.48);color:white;font-size:11px;font-weight:700}
.dest-img .baobab-buttons{display:flex;gap:5px}
.dest-img .baobab-buttons button{display:grid;place-items:center;width:31px;height:31px;border-radius:50%;background:rgba(19,26,26,.7);border:1px solid rgba(255,255,255,.48);color:white;cursor:pointer;padding:0;backdrop-filter:blur(7px)}
.dest-img .baobab-buttons button:hover{background:#9e7241}
@media(prefers-reduced-motion:reduce){.dest-img .baobab-gallery .baobab-slide{transition:none}}
`;
export default function BaobabGallery({ lang = "en" }) {
  const [images,setImages]=useState(FILES);
  const [index,setIndex]=useState(0);
  const [paused,setPaused]=useState(false);
  const t=COPY[lang]||COPY.en;
  useEffect(()=>{
    if(paused||images.length<2)return;
    const timer=setTimeout(()=>setIndex(i=>(i+1)%images.length),4000);
    return()=>clearTimeout(timer);
  },[index,paused,images.length]);
  const move=step=>setIndex(i=>(i+step+images.length)%images.length);
  const onError=src=>{
    if(src==="/images/Baobabs.jpg")return;
    setImages(prev=>{const list=prev.filter(s=>s!==src);return list.length?list:["/images/Baobabs.jpg"]});
    setIndex(0);
  };
  return <div className="baobab-gallery" role="region" aria-roledescription="carousel" aria-label="Avenue of Baobabs slideshow">
    <style>{CSS}</style>
    {images.map((src,i)=><img key={src} src={src} alt={i===index?"Avenue of Baobabs, Morondava, Madagascar":""} aria-hidden={i!==index} decoding="async" loading={i===0?"eager":"lazy"} className={`baobab-slide${i===index?" active":""}`} onError={()=>onError(src)} />)}
    <span className="baobab-badge">{t.tag}</span>
    <div className="baobab-controls">
      <span className="baobab-counter">{String(index+1).padStart(2,"0")} / {String(images.length).padStart(2,"0")}</span>
      <div className="baobab-buttons">
        <button type="button" aria-label={t.prev} onClick={()=>move(-1)}><ArrowLeft size={15}/></button>
        <button type="button" aria-label={paused?t.play:t.pause} onClick={()=>setPaused(p=>!p)}>{paused?<Play size={15}/>:<Pause size={15}/>}</button>
        <button type="button" aria-label={t.next} onClick={()=>move(1)}><ArrowRight size={15}/></button>
      </div>
    </div>
  </div>;
}