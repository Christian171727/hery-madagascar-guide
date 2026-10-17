import React,{useEffect,useState} from "react";
import {ArrowLeft,ArrowRight,Pause,Play} from "lucide-react";
const files=Array.from({length:15},(_,i)=>"/images/baobabs/baobab"+(i+1)+".jpeg");
const words={
en:[["Discover the magic of the Avenue of Baobabs","Iconic landscapes, timeless trees and unforgettable moments."],["Chase the golden hour","Experience warm sunset light in Madagascar's famous avenue."],["Make every moment a memory","Explore Morondava with a passionate local guide."],["See Madagascar differently","Nature, culture and breathtaking photographic scenery."],["Your adventure starts here","Discover western Madagascar with HERY."]],
fr:[["Découvrez la magie de l'Allée des Baobabs","Des paysages mythiques et des souvenirs inoubliables."],["Vivez la lumière dorée","Admirez un coucher de soleil spectaculaire parmi les baobabs."],["Chaque instant devient un souvenir","Explorez Morondava avec un guide local passionné."],["Voyez Madagascar autrement","Nature, culture et paysages photographiques exceptionnels."],["Votre aventure commence ici","Découvrez l'ouest de Madagascar avec HERY."]],
mg:[["Fantaro ny hakanton'ny lalan'ny reniala","Toerana miavaka sy fahatsiarovana tsy hay hadinoina."],["Ankafizo ny masoandro mody","Jereo ny loko volamena eo anivon'ireo reniala."],["Fahatsiarovana tsy hay hadinoina","Tsidiho miaraka amin'ny mpitari-dalana eto Morondava."],["Hahita an'i Madagasikara amin'ny fomba vaovao","Natiora, kolontsaina ary toerana mahafinaritra."],["Eto no manomboka ny dianao","Fantaro ny hakanton'i Menabe miaraka amin'i HERY."]]};
export default function BaobabGallery({lang="en"}) {
const [images,setImages]=useState(["/images/Baobabs.jpg"]),[index,setIndex]=useState(0),[paused,setPaused]=useState(false);
useEffect(()=>{let active=true;Promise.all(files.map(async src=>{try{const r=await fetch(src,{method:"HEAD"});return r.ok&&(r.headers.get("content-type")||"").startsWith("image/")?src:null}catch{return null}})).then(a=>{if(active){const found=a.filter(Boolean);setImages(found.length?found:["/images/Baobabs.jpg"]);setIndex(0)}});return()=>{active=false}},[]);
useEffect(()=>{if(paused||images.length<2)return;const t=setTimeout(()=>setIndex(i=>(i+1)%images.length),4000);return()=>clearTimeout(t)},[paused,index,images.length]);
const move=n=>setIndex(i=>(i+n+images.length)%images.length),w=(words[lang]||words.en)[index%5];
const btn={width:30,height:30,border:"1px solid #ffffff80",borderRadius:"50%",background:"#1b201cb0",color:"#fff",cursor:"pointer",display:"grid",placeItems:"center"};
return <div aria-label="Avenue of Baobabs slideshow" role="region" style={{position:"absolute",inset:0,overflow:"hidden",color:"white",background:"#332419"}}>
{images.map((src,i)=><img key={src} src={src} alt={i===index?"Avenue of Baobabs, Morondava":""} aria-hidden={i!==index} onError={()=>{if(images.length>1){setImages(a=>a.filter(x=>x!==src));setIndex(0)}}} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:i===index?1:0,transition:"opacity 1s ease",pointerEvents:"none"}}/>)}
<div style={{position:"absolute",inset:0,background:"linear-gradient(0deg,#111b18e8,transparent 85%)",pointerEvents:"none"}}/>
<div key={index+"-"+lang} style={{position:"absolute",left:14,right:14,bottom:47,textAlign:"left",pointerEvents:"none",textShadow:"0 2px 8px #0009"}}>
<span style={{fontSize:9,letterSpacing:1.1,fontWeight:800,color:"#ffe2a2"}}>{lang==="fr"?"ALLÉE DES BAOBABS":lang==="mg"?"LALAN'NY RENIALA":"AVENUE OF THE BAOBABS"} · MORONDAVA</span>
<strong style={{display:"block",fontSize:16,lineHeight:1.2,margin:"5px 0"}}>{w[0]}</strong><span style={{display:"block",fontSize:11,lineHeight:1.4}}>{w[1]}</span></div>
<div style={{position:"absolute",bottom:9,left:12,right:12,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<span style={{fontSize:11,fontWeight:700}}>{index+1} / {images.length}</span><div style={{display:"flex",gap:5}}>
<button type="button" aria-label="Previous photo" onClick={e=>{e.stopPropagation();move(-1)}} style={btn}><ArrowLeft size={14}/></button>
<button type="button" aria-label={paused?"Play slideshow":"Pause slideshow"} onClick={e=>{e.stopPropagation();setPaused(p=>!p)}} style={btn}>{paused?<Play size={14}/>:<Pause size={14}/>}</button>
<button type="button" aria-label="Next photo" onClick={e=>{e.stopPropagation();move(1)}} style={btn}><ArrowRight size={14}/></button></div></div></div>
}