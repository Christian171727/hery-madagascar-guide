import React, { useEffect, useState } from "react";
import { Clock, ArrowRight } from "lucide-react";

const PHOTOS = [
  "/images/Kirindy1.jpeg",
  ...Array.from({ length: 10 }, (_, i) => "/images/wildlife/wildlife" + (i + 1) + ".jpeg")
];

const SLIDES = {
  en: [
    ["Discover the wildlife of Kirindy", "Begin with the curious fossa of Madagascar's western forest.", "KIRINDY FOREST"],
    ["The art of camouflage", "Discover the colors and secrets of Madagascar's chameleons.", "MADAGASCAR WILDLIFE"],
    ["Nature rewards patience", "Look closer — fascinating creatures live among the branches.", "WILDLIFE DISCOVERY"],
    ["Hidden wonders of the forest", "Patterns, textures and remarkable adaptations await.", "NATURE ENCOUNTERS"],
    ["Masters of disguise", "Every branch holds the promise of a surprising discovery.", "BIODIVERSITY"],
    ["Beauty in every detail", "Discover a world that reveals itself to careful observers.", "NATURE CLOSE-UP"],
    ["A watchful encounter", "Wildlife photography begins with quiet, respectful observation.", "RESPONSIBLE PHOTOGRAPHY"],
    ["A touch of wild color", "Meet Madagascar's remarkable reptiles and forest life.", "MADAGASCAR WILDLIFE"],
    ["Look up and be amazed", "Explore the fascinating life found in Madagascar's trees.", "FOREST DISCOVERY"],
    ["Nature after sunset", "Even the smallest creatures have a story worth telling.", "WILDLIFE STORIES"],
    ["Protect what inspires you", "Travel with care and leave wildlife undisturbed.", "TRAVEL RESPONSIBLY"]
  ],
  fr: [
    ["Découvrez la faune de Kirindy", "Commencez avec le fascinant fossa des forêts de l'Ouest.", "FORÊT DE KIRINDY"],
    ["L'art du camouflage", "Admirez les couleurs et les secrets des caméléons malgaches.", "FAUNE DE MADAGASCAR"],
    ["La nature récompense la patience", "Regardez de près : la vie se cache dans les branches.", "DÉCOUVERTE SAUVAGE"],
    ["Les merveilles cachées de la forêt", "Motifs, textures et adaptations extraordinaires.", "RENCONTRES NATURE"],
    ["Maîtres du mimétisme", "Chaque branche peut révéler une belle surprise.", "BIODIVERSITÉ"],
    ["La beauté des petits détails", "Découvrez un monde fascinant en prenant votre temps.", "NATURE EN DÉTAIL"],
    ["Une rencontre attentive", "Photographier commence par une observation respectueuse.", "PHOTOGRAPHIE RESPONSABLE"],
    ["Une touche de couleur sauvage", "Rencontrez les reptiles remarquables de Madagascar.", "FAUNE DE MADAGASCAR"],
    ["Levez les yeux et émerveillez-vous", "Découvrez la vie étonnante des arbres malgaches.", "FORÊT VIVANTE"],
    ["La nature après le coucher du soleil", "Les plus petites espèces ont de grandes histoires.", "RÉCITS SAUVAGES"],
    ["Protégeons ce qui nous émerveille", "Voyagez avec respect pour la faune et son habitat.", "TOURISME RESPONSABLE"]
  ],
  mg: [
    ["Fantaro ny biby ao Kirindy", "Atombohy amin'ny fossa, biby mampiavaka ny ala any Andrefana.", "ALA KIRINDY"],
    ["Hain'ny biby ny miafina", "Jereo ny loko sy ny mampiavaka ny tanalahy eto Madagasikara.", "BIBY ETO MADAGASIKARA"],
    ["Mila faharetana ny mijery natiora", "Diniho akaiky ny fiainana eny amin'ny rantsankazo.", "FANTARO NY BIBY"],
    ["Ireo zava-mahatalanjona miafina", "Endrika sy fomba fiaina miavaka no hita anaty ala.", "FIHAONANA AMIN'NY NATIORA"],
    ["Mahafehy ny fierena", "Misy zavatra mahavariana ao ambadiky ny rantsana tsirairay.", "HARENA VOAJANAHARY"],
    ["Kanto ny antsipiriany", "Miharihary ny hatsaran'ny natiora rehefa mandinika tsara.", "NATIORA AKAiKY"],
    ["Fihaonana amin-katoniana", "Maka sary sady manaja ny biby sy ny fonenany.", "SARY MANARA-PANAJANA"],
    ["Loko mamirapiratra", "Fantaro ireo biby mandady sy zavaboary manaitra.", "BIBY ETO MADAGASIKARA"],
    ["Jereo ny eny ambony hazo", "Betsaka ny fiainana mahavariana eny anaty ala.", "FANTARO NY ALA"],
    ["Miaina koa ny natiora amin'ny alina", "Manana tantara ny biby madinika tsirairay.", "TANTARAN'NY BIBY"],
    ["Arovy izay manaitra anao", "Hajao ny biby sy ny fonenany mandritra ny dia.", "FIZAHANTANY TOMPON'ANDRAIKITRA"]
  ]
};

export default function WildlifeFeaturedPreview({ post, readLabel, isMG = false, isFR = false }) {
  const [index, setIndex] = useState(0);
  const locale = isMG ? "mg" : isFR ? "fr" : "en";
  const [title, description, kicker] = SLIDES[locale][index];

  useEffect(() => {
    const timer = window.setTimeout(() => setIndex(i => (i + 1) % PHOTOS.length), 4000);
    return () => window.clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    const image = new Image();
    image.src = PHOTOS[(index + 1) % PHOTOS.length];
  }, [index]);

  return (
    <>
      <div className="post-image wildlife-feature-stage" role="group" aria-label="Madagascar wildlife photography slideshow">
        {PHOTOS.map((src, i) => (
          <img key={src} src={src}
            alt={i === index ? title : ""}
            aria-hidden={i !== index}
            className={"wildlife-feature-photo" + (index === i ? " active" : "")}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
        <div className="wildlife-feature-shade" aria-hidden="true" />
        <span className="post-category">{post.category}</span>
        <div className="wildlife-feature-image-caption" key={locale + index}>
          <span className="wildlife-feature-kicker">{kicker}</span>
          <strong>{title}</strong>
        </div>
        <span className="wildlife-feature-counter">{String(index + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}</span>
        <span className="wildlife-feature-progress" aria-hidden="true"><span key={index} /></span>
      </div>
      <div className="post-body wildlife-feature-content">
        <span className="post-meta"><Clock size={14} />{post.duration} {isMG ? "vakina" : isFR ? "de lecture" : "read"}</span>
        <h3>{post.title}</h3>
        <div className="wildlife-feature-dynamic" key={"copy-" + locale + index}>
          <strong>{title}</strong>
          <p>{description}</p>
        </div>
        <span className="post-read">{readLabel} <ArrowRight size={14} /></span>
      </div>
    </>
  );
}
