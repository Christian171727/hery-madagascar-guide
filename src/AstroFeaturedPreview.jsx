import React, { useEffect, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";

// Automatic 4-second editorial captions. All nine website languages are supported.
const locales = {
  en: {
    read: "min read",
    scenes: [
      ["The sky becomes the story", "Stars, silhouettes and long exposures reveal the beauty of Madagascar after dark."],
      ["Baobabs beneath the Milky Way", "The night sky and the landscape come together to create extraordinary compositions."],
      ["A moment worth waiting for", "Careful framing, patience and natural darkness make each night photograph unique."]
    ]
  },
  fr: {
    read: "min de lecture",
    scenes: [
      ["Le ciel raconte une histoire", "Étoiles, silhouettes et poses longues révèlent la beauté de Madagascar après le coucher du soleil."],
      ["Les baobabs sous la Voie lactée", "Le ciel nocturne et le paysage s'unissent pour créer des compositions extraordinaires."],
      ["Un instant qui mérite l'attente", "Cadrage soigné, patience et obscurité naturelle rendent chaque photo nocturne unique."]
    ]
  },
  mg: {
    read: "min famakiana",
    scenes: [
      ["Mitantara ny lanitra feno kintana", "Ny kintana, ny aloka ary ny fakàna sary maharitra no mampiseho ny hakanton'i Madagasikara amin'ny alina."],
      ["Baobab eo ambanin'ny Voie lactée", "Mitambatra ho endrika mahatalanjona ny lanitra amin'ny alina sy ny tontolo manodidina."],
      ["Fotoana mendrika andrasana", "Ny fandrindrana sary, ny faharetana ary ny haizina voajanahary no mampiavaka ny sary tsirairay."]
    ]
  },
  ru: {
    read: "мин чтения",
    scenes: [
      ["Небо рассказывает историю", "Звёзды, силуэты и длинная выдержка раскрывают красоту Мадагаскара после заката."],
      ["Баобабы под Млечным Путём", "Ночное небо и пейзаж вместе создают необыкновенные композиции."],
      ["Мгновение, которого стоит ждать", "Точная композиция, терпение и естественная темнота делают каждый ночной снимок уникальным."]
    ]
  },
  ja: {
    read: "分で読めます",
    scenes: [
      ["星空が物語を語る", "星やシルエット、長時間露光が、日没後のマダガスカルの美しさを映し出します。"],
      ["天の川の下のバオバブ", "夜空と風景が重なり、印象的な一枚を生み出します。"],
      ["待つ価値のある瞬間", "丁寧な構図と忍耐、自然の暗さが、夜景写真を唯一無二のものにします。"]
    ]
  },
  de: {
    read: "Min. Lesezeit",
    scenes: [
      ["Der Himmel erzählt eine Geschichte", "Sterne, Silhouetten und Langzeitbelichtungen zeigen Madagaskars Schönheit nach Sonnenuntergang."],
      ["Baobabs unter der Milchstraße", "Nachthimmel und Landschaft vereinen sich zu außergewöhnlichen Bildkompositionen."],
      ["Ein Moment, auf den es sich zu warten lohnt", "Sorgfältiger Bildaufbau, Geduld und natürliche Dunkelheit machen jedes Nachtfoto einzigartig."]
    ]
  },
  it: {
    read: "min di lettura",
    scenes: [
      ["Il cielo racconta una storia", "Stelle, silhouette e lunghe esposizioni svelano la bellezza del Madagascar dopo il tramonto."],
      ["Baobab sotto la Via Lattea", "Il cielo notturno e il paesaggio si fondono in composizioni straordinarie."],
      ["Un momento che vale l'attesa", "Inquadratura attenta, pazienza e buio naturale rendono unica ogni fotografia notturna."]
    ]
  },
  es: {
    read: "min de lectura",
    scenes: [
      ["El cielo cuenta una historia", "Estrellas, siluetas y largas exposiciones muestran la belleza de Madagascar tras el atardecer."],
      ["Baobabs bajo la Vía Láctea", "El cielo nocturno y el paisaje se unen para crear composiciones extraordinarias."],
      ["Un instante que merece la espera", "Un buen encuadre, paciencia y oscuridad natural hacen única cada foto nocturna."]
    ]
  },
  zh: {
    read: "分钟阅读",
    scenes: [
      ["天空讲述着故事", "繁星、剪影与长曝光，展现马达加斯加日落后的独特之美。"],
      ["银河下的猴面包树", "夜空与大地相映成趣，构成令人难忘的画面。"],
      ["值得等待的瞬间", "细致构图、耐心与自然夜色，让每张夜景照片都独一无二。"]
    ]
  }
};

export default function AstroFeaturedPreview({ post, readLabel, lang = "en" }) {
  const copy = locales[lang] || locales.en;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % copy.scenes.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [lang, copy.scenes.length]);

  const scene = copy.scenes[index];

  return (
    <>
      <div className="post-image astro-feature-stage" role="img" aria-label={post.title}>
        <img src={post.image} alt="" loading="lazy" decoding="async" />
        <span className="post-category">{post.category}</span>
      </div>

      <div className="post-body astro-feature-content">
        <span className="post-meta"><Clock size={15} />{post.duration.replace(/\\s*min$/i, "")} {copy.read}</span>
        <h3>{post.title}</h3>
        <div className="astro-feature-text-viewport" aria-live="off">
          <div key={lang + "-" + index} className="astro-feature-text-slide">
            <strong>{scene[0]}</strong>
            <p>{scene[1]}</p>
          </div>
        </div>
        <span className="post-read">{readLabel}<ArrowRight size={16} /></span>
      </div>
    </>
  );
}
