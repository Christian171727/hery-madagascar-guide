import React from "react";
import { ArrowUpRight, MapPin, MessageSquareQuote, ShieldCheck } from "lucide-react";
import { googleReviewsLocales } from "./googleReviewsLocales.js";
import "./googleReviews.css";

// The Business Profile's verified direct "Ask for reviews" link may replace
// this Google Maps search link when HERY supplies it.
export const HERY_GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=HERY%20Madagascar%20Local%20Guide%20Morondava";

export default function GoogleReviewsSection({ lang = "en" }) {
  const t = googleReviewsLocales[lang] || googleReviewsLocales.en;
  return (
    <section id="reviews" className="section google-reviews-section" aria-labelledby="google-reviews-title">
      <div className="google-reviews-shell">
        <div className="google-reviews-heading">
          <span className="google-reviews-kicker"><MessageSquareQuote size={16} aria-hidden="true" /> {t.eyebrow}</span>
          <h2 id="google-reviews-title">{t.title}</h2>
          <p>{t.intro}</p>
        </div>
        <div className="google-reviews-layout">
          <div className="google-reviews-callout">
            <span className="google-reviews-platform"><MapPin size={16} aria-hidden="true" /> {t.platform}</span>
            <div className="google-reviews-quote" aria-hidden="true"><MessageSquareQuote size={40} /></div>
            <h3>{t.cardTitle}</h3>
            <p>{t.cardText}</p>
            <a className="google-reviews-button" href={HERY_GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
              {t.action} <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <span className="google-reviews-help">{t.help}</span>
          </div>
          <div className="google-reviews-steps">
            <h3>{t.stepsTitle}</h3>
            <ol>
              {t.steps.map(([heading, description], index) => (
                <li key={index}>
                  <span className="google-reviews-step-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="google-reviews-step-copy"><strong>{heading}</strong><span>{description}</span></span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="google-reviews-note"><ShieldCheck size={17} aria-hidden="true" /> {t.note}</p>
      </div>
    </section>
  );
}
