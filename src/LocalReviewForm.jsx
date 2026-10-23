import React, { useEffect, useState } from "react";
import { Star, Send, ShieldCheck } from "lucide-react";
import "./localReviewForm.css";
const words = {
en: ["Share your HERY experience","Leave an honest customer review","Your name","Your experience (at least 20 characters)","Submit review","Your review has been received and awaits approval.","I agree that my name, rating and comment may be published after moderation.","Published customer stories","No reviews have been published yet.","Service temporarily unavailable. Please try again.","Reviews submitted here are separate from Google Reviews.","Choose your rating"],
fr: ["Partagez votre expérience avec HERY","Laissez un avis sincère","Votre nom","Votre expérience (20 caractères minimum)","Envoyer mon avis","Avis reçu, en attente de validation.","J’accepte que mon nom, ma note et mon commentaire soient publiés après modération.","Témoignages publiés","Aucun avis publié pour le moment.","Service momentanément indisponible. Réessayez plus tard.","Les avis de ce site sont distincts des avis Google.","Choisissez votre note"],
mg: ["Zarao ny traikefanao niaraka tamin’i HERY","Soraty ny hevitrao marina","Anaranao","Ny zavatra niainanao (tarehintsoratra 20 farafahakeliny)","Alefaso ny avis","Voaray ny avis, miandry fanamarinana.","Manaiky ny hamoahana ny anarako, ny kintanako ary ny hevitro aho rehefa voamarina.","Hevitry ny mpanjifa navoaka","Tsy mbola misy avis navoaka.","Tsy afaka mandefa amin’izao. Andramo indray.","Tsy mitovy amin’ny avis Google ny avis eto amin’ny site.","Safidio ny isan-kintana"],
ru: ["Поделитесь впечатлениями о HERY","Оставьте честный отзыв","Ваше имя","Ваш опыт (не менее 20 символов)","Отправить отзыв","Отзыв получен и ожидает проверки.","Я согласен(-на) на публикацию имени, оценки и отзыва после проверки.","Отзывы клиентов","Пока нет опубликованных отзывов.","Сервис временно недоступен.","Отзывы на сайте не связаны с отзывами Google.","Выберите оценку"],
ja: ["HERYでの体験を共有","率直な口コミをお寄せください","お名前","ご感想（20文字以上）","口コミを送信","口コミを受け付けました。承認待ちです。","審査後に氏名・評価・コメントが公開されることに同意します。","公開された口コミ","まだ公開された口コミはありません。","現在送信できません。","サイト内の口コミはGoogleの口コミとは別です。","評価を選択"],
de: ["Teilen Sie Ihre Erfahrung mit HERY","Ihre ehrliche Bewertung","Ihr Name","Ihr Erlebnis (mindestens 20 Zeichen)","Bewertung senden","Bewertung erhalten und wartet auf Freigabe.","Ich stimme der Veröffentlichung von Name, Bewertung und Kommentar nach Prüfung zu.","Veröffentlichte Erfahrungen","Noch keine Bewertungen veröffentlicht.","Dienst vorübergehend nicht verfügbar.","Bewertungen dieser Website sind unabhängig von Google.","Bewertung auswählen"],
it: ["Condividi la tua esperienza con HERY","Lascia una recensione sincera","Il tuo nome","La tua esperienza (almeno 20 caratteri)","Invia recensione","Recensione ricevuta, in attesa di approvazione.","Acconsento alla pubblicazione di nome, voto e commento dopo la moderazione.","Esperienze pubblicate","Ancora nessuna recensione pubblicata.","Servizio temporaneamente non disponibile.","Le recensioni sul sito sono separate da quelle Google.","Scegli il voto"],
es: ["Comparte tu experiencia con HERY","Deja una reseña sincera","Tu nombre","Tu experiencia (mínimo 20 caracteres)","Enviar reseña","Reseña recibida, pendiente de aprobación.","Acepto la publicación de mi nombre, puntuación y comentario tras la moderación.","Opiniones publicadas","Todavía no hay opiniones publicadas.","Servicio temporalmente no disponible.","Las reseñas del sitio son distintas de las de Google.","Selecciona tu valoración"],
zh: ["分享您与HERY的体验","留下真实评价","您的姓名","旅行体验（至少20个字符）","提交评价","评价已收到，等待审核。","我同意经审核后公开姓名、评分和评论。","已发布的客户评价","暂无公开评价。","服务暂时不可用，请稍后再试。","本站评价与谷歌评价相互独立。","选择评分"]
};
export default function LocalReviewForm({lang="en"}) {
  const t = words[lang] || words.en;
  const [name,setName]=useState("");
  const [comment,setComment]=useState("");
  const [stars,setStars]=useState(0);
  const [consent,setConsent]=useState(false);
  const [website,setWebsite]=useState("");
  const [status,setStatus]=useState("");
  const [sending,setSending]=useState(false);
  const [reviews,setReviews]=useState([]);
  const [loadingError,setLoadingError]=useState(false);
  useEffect(()=>{
    let cancelled=false;
    fetch("/api/reviews",{cache:"no-store"})
      .then(r=>{if(!r.ok) throw Error("unavailable");return r.json()})
      .then(data=>{if(!cancelled){setReviews(data.reviews||[]);setLoadingError(false)}})
      .catch(()=>{if(!cancelled)setLoadingError(true)});
    return ()=>{cancelled=true};
  },[]);
  async function submit(e) {
    e.preventDefault();setSending(true);setStatus("");
    try {
      const response=await fetch("/api/reviews",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,comment,stars,consent,website})
      });
      if(!response.ok) throw Error("submit");
      setStatus(t[5]);setName("");setComment("");setStars(0);setConsent(false);setWebsite("");
    }catch{setStatus(t[9])}finally{setSending(false)}
  }
  return <section id="local-reviews" className="section hery-local-reviews">
    <div className="hery-local-reviews-inner">
      <header className="hery-review-header"><span className="eyebrow">HERY MADAGASCAR LOCAL GUIDE</span><h2>{t[0]}</h2><p>{t[10]}</p></header>
      <div className="hery-local-reviews-grid">
        <form onSubmit={submit}>
          <h3>{t[1]}</h3>
          <label>{t[2]}<input required minLength={2} maxLength={80} value={name} onChange={e=>setName(e.target.value)} autoComplete="name"/></label>
          <div role="group" aria-label={t[11]} className="hery-rating">
            {[1,2,3,4,5].map(i=><button key={i} type="button" aria-label={i+" / 5"} aria-pressed={stars===i} onClick={()=>setStars(i)}><Star size={28} fill={i<=stars?"currentColor":"none"}/></button>)}
          </div>
          <label>{t[3]}<textarea required minLength={20} maxLength={1200} rows={5} value={comment} onChange={e=>setComment(e.target.value)}/></label>
          <div className="hery-review-hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)}/></label></div>
          <label className="hery-consent"><input required type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/>{t[6]}</label>
          <button className="hery-submit" type="submit" disabled={sending||stars===0||!consent}><Send size={17}/>{t[4]}</button>
          <p role="status" aria-live="polite">{status}</p>
        </form>
        <div className="hery-review-results"><h3>{t[7]}</h3>
          {loadingError?<p>{t[9]}</p>:reviews.length===0?<p>{t[8]}</p>:reviews.map(r=><article key={r.id}><strong>{r.name}</strong><div aria-label={r.stars+" / 5"}>{"★".repeat(r.stars)}{"☆".repeat(5-r.stars)}</div><p>{r.comment}</p></article>)}
          <p className="hery-moderation"><ShieldCheck size={16}/>{t[10]}</p>
        </div>
      </div>
    </div>
  </section>;
}
