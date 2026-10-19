import React, { useEffect, useState } from "react";

const SLIDES = [
  {
    image: "/images/culture/culture1.jpeg",
    en: {
      kicker: "CULTURE",
      title: "Meet Madagascar beyond the postcard.",
      body: "Discover daily life, joyful encounters, local pride and the human warmth that makes every journey more meaningful.",
      quote: "Personal. Flexible. Field-based. Educational. Community-aware.",
    },
    fr: {
      kicker: "CULTURE",
      title: "Rencontrez Madagascar au-delà de la carte postale.",
      body: "Découvrez la vie quotidienne, les rencontres sincères, la fierté locale et la chaleur humaine qui rendent chaque voyage plus vivant.",
      quote: "Personnel. Flexible. Terrain. Éducatif. Proche des communautés.",
    },
    mg: {
      kicker: "KOLONTSAINA",
      title: "Fantaro i Madagasikara mihoatra noho ny carte postale.",
      body: "Hiaina fihaonana tena izy, fiainam-bahoaka ary hafanam-po avy amin'ny mponina ianao mandritra ny dianao.",
      quote: "Manokana. Miovaova. Mifototra amin'ny tena zava-misy. Fampianarana. Manaja fiarahamonina.",
    },
  },
  {
    image: "/images/culture/culture2.jpeg",
    en: {
      kicker: "LIVING TRADITIONS",
      title: "Travel through moments of sharing.",
      body: "Village celebrations, traditional rhythms and spontaneous smiles open a more authentic door into Madagascar.",
      quote: "Real encounters create the memories travelers keep forever.",
    },
    fr: {
      kicker: "TRADITIONS VIVANTES",
      title: "Voyagez au rythme du partage.",
      body: "Fêtes de village, rythmes traditionnels et sourires spontanés révèlent un Madagascar plus authentique.",
      quote: "Les vraies rencontres sont celles qu'on n'oublie jamais.",
    },
    mg: {
      kicker: "FOMBA AMAM-PANAO VELONA",
      title: "Mandehana ao anatin'ny fotoana ifampizarana.",
      body: "Fety eny an-tanàna, gadona nentin-drazana ary tsiky tsotra no mampiseho an'i Madagasikara tena izy.",
      quote: "Ny fihaonana tena izy no mamorona fahatsiarovana maharitra.",
    },
  },
  {
    image: "/images/culture/culture3.jpeg",
    en: {
      kicker: "LOCAL CONNECTION",
      title: "Every encounter tells a story.",
      body: "Meet communities with respect, curiosity and time to understand the values that shape their everyday life.",
      quote: "Culture is not only seen — it is felt, heard and shared.",
    },
    fr: {
      kicker: "LIEN LOCAL",
      title: "Chaque rencontre raconte une histoire.",
      body: "Rencontrez les communautés avec respect, curiosité et le temps de comprendre ce qui fait leur quotidien.",
      quote: "La culture ne se regarde pas seulement — elle se vit, s'écoute et se partage.",
    },
    mg: {
      kicker: "FIFANDRAISANA EO AN-TOERANA",
      title: "Misy tantara ny fihaonana tsirairay.",
      body: "Mihaona amin'ny mponina amim-panajana sy fahalianana, ary alao fotoana hahafantarana ny lanjan'ny fiainany andavanandro.",
      quote: "Tsy jerena fotsiny ny kolontsaina — iainana, henoina ary ifampizarana izy.",
    },
  },
  {
    image: "/images/culture/culture4.jpeg",
    en: {
      kicker: "COMMUNITY LIFE",
      title: "See heritage in motion.",
      body: "From ceremonies to public gatherings, discover traditions that still live strongly in today's communities.",
      quote: "A meaningful trip begins with respect for people and place.",
    },
    fr: {
      kicker: "VIE COMMUNAUTAIRE",
      title: "Découvrez un héritage vivant.",
      body: "Des cérémonies aux rassemblements populaires, découvrez des traditions toujours présentes dans la vie actuelle.",
      quote: "Un beau voyage commence par le respect des personnes et des lieux.",
    },
    mg: {
      kicker: "FIAINANA IFAMPIZARANA",
      title: "Jereo ny lova velona eo amin'ny fiainana.",
      body: "Manomboka amin'ny lanonana ka hatramin'ny fivoriam-bahoaka, mbola velona ao amin'ny fiaraha-monina ankehitriny ny fomban-drazana.",
      quote: "Ny dia mendrika dia manomboka amin'ny fanajana ny olona sy ny toerana.",
    },
  },
];

const CSS = `
.culture-rotator{display:grid;grid-template-columns:1.02fr 1fr;gap:2.2rem;align-items:center}
.culture-visual{position:relative;min-height:520px;border-radius:32px;overflow:hidden;background:#d8dfdf}
.culture-frame{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1);transition:opacity .9s ease}
.culture-frame.active{opacity:1;animation:cultureZoom 4s ease-out both}
@keyframes cultureZoom{from{transform:scale(1)}to{transform:scale(1.05)}}
.culture-panel{display:flex;flex-direction:column;gap:1.6rem}
.culture-kicker{display:inline-flex;align-items:center;gap:.8rem;color:#b68a3b;font-size:.76rem;font-weight:800;letter-spacing:.22em;text-transform:uppercase}
.culture-kicker::before{content:"";display:inline-block;width:32px;height:2px;background:#c89b47;border-radius:999px}
.culture-copy{animation:cultureRise .55s ease both}
@keyframes cultureRise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.culture-title{margin:0;color:#163153;font-size:clamp(2.4rem,4vw,4.25rem);line-height:.98;font-weight:500;max-width:11ch}
.culture-body{margin:0;color:#4c6480;font-size:1.05rem;line-height:1.7;max-width:38rem}
.culture-quote{margin:0;padding:1.35rem 1.5rem;border-left:3px solid #d8a24a;border-radius:18px;background:rgba(244,240,233,.72);color:#ba8a41;font-size:clamp(1.15rem,2vw,1.55rem);font-style:italic;line-height:1.45}
.culture-nav{display:flex;align-items:center;justify-content:space-between;gap:1rem}
.culture-counter{display:inline-flex;align-items:center;gap:.55rem;color:#163153;font-size:.95rem;font-weight:700}
.culture-dots{display:flex;gap:.45rem;flex-wrap:wrap}
.culture-dot{width:10px;height:10px;border-radius:999px;border:none;background:#cfd8e3;cursor:pointer;padding:0}
.culture-dot.active{background:#c89b47;transform:scale(1.1)}
.culture-actions{display:flex;gap:.55rem}
.culture-btn{min-width:40px;height:40px;border-radius:999px;border:1px solid rgba(22,49,83,.18);background:#fff;color:#163153;font-weight:700;cursor:pointer;box-shadow:0 12px 30px rgba(12,31,52,.06)}
.culture-progress{height:4px;border-radius:999px;background:#e8edf2;overflow:hidden}
.culture-progress>span{display:block;height:100%;width:100%;background:#d1a24d;transform-origin:left;animation:cultureFill 4s linear both}
@keyframes cultureFill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@media (max-width: 980px){.culture-rotator{grid-template-columns:1fr}.culture-visual{min-height:360px}.culture-title{max-width:none}}
@media (prefers-reduced-motion: reduce){.culture-frame{transition:none}.culture-frame.active,.culture-copy,.culture-progress>span{animation:none}}
`;

export default function CultureShowcase({ lang = "en" }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const locale = lang === "mg" ? "mg" : lang === "fr" ? "fr" : "en";
  const slide = SLIDES[index][locale];

  useEffect(() => {
    if (paused || SLIDES.length < 2) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), 4000);
    return () => window.clearTimeout(timer);
  }, [index, paused]);

  useEffect(() => {
    const next = new Image();
    next.src = SLIDES[(index + 1) % SLIDES.length].image;
  }, [index]);

  const go = (step) => setIndex((i) => (i + step + SLIDES.length) % SLIDES.length);

  return (
    <div className="culture-rotator">
      <style>{CSS}</style>
      <div className="culture-visual" aria-label="Madagascar culture photo slideshow">
        {SLIDES.map((item, i) => (
          <img
            key={item.image}
            src={item.image}
            alt={i === index ? slide.title : ""}
            className={"culture-frame" + (i === index ? " active" : "")}
            loading={i < 2 ? "eager" : "lazy"}
            decoding="async"
            aria-hidden={i !== index}
          />
        ))}
      </div>

      <div className="culture-panel">
        <div className="culture-copy" key={`${locale}-${index}`}>
          <span className="culture-kicker">{slide.kicker}</span>
          <h2 className="culture-title">{slide.title}</h2>
        </div>

        <p className="culture-body" key={`body-${locale}-${index}`}>{slide.body}</p>

        <blockquote className="culture-quote" key={`quote-${locale}-${index}`}>
          “{slide.quote}”
        </blockquote>

        <div className="culture-nav">
          <div className="culture-counter">{String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}</div>
          <div className="culture-dots" aria-label="Culture slides">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={"culture-dot" + (i === index ? " active" : "")}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="culture-actions">
            <button type="button" className="culture-btn" onClick={() => go(-1)} aria-label="Previous slide">←</button>
            <button type="button" className="culture-btn" onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play slideshow" : "Pause slideshow"}>{paused ? "▶" : "❚❚"}</button>
            <button type="button" className="culture-btn" onClick={() => go(1)} aria-label="Next slide">→</button>
          </div>
        </div>

        <div className="culture-progress" aria-hidden="true">{!paused && <span key={index} />}</div>
      </div>
    </div>
  );
}
