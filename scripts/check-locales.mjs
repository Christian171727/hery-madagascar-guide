import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { andasibeNewPhotoScenes } from "../src/andasibeNewPhotoScenes.js";
import { expandedLocaleContent } from "../src/expandedLocaleContent.js";
import { localizedBlogSections } from "../src/localizedBlogSections.js";
import { extraTranslationCount } from "../src/siteTranslationExtras.js";
import { destinationGalleryLocales } from "../src/destinationGalleryLocales.js";
import { photographyOtherLocales } from "../src/photographyOtherLocales.js";
import { conservationOtherLocales } from "../src/conservationOtherLocales.js";
import { conservationSliderCopy } from "../src/conservationSliderLocales.js";
import { photographyCardLocales } from "../src/photographyCardLocales.js";
import { siteMetaLocales } from "../src/siteMetaLocales.js";
import { hiddenMomentsOtherScenes } from "../src/hiddenMomentsOtherScenes.js";
import { wildlifeOtherLocales } from "../src/wildlifeOtherLocales.js";

const locales = ["en", "fr", "mg", "ru", "ja", "de", "it", "es", "zh"];
const sectionCounts = [8, 4, 4, 10];
const main = readFileSync(new URL("../src/main.jsx", import.meta.url), "utf8");

for (const lang of locales) {
  assert.match(main, new RegExp('<option value="'+lang+'">'), `Missing language selector: ${lang}`);
  if (!["en", "fr", "mg"].includes(lang)) {
    assert.equal(expandedLocaleContent[lang]?.faq?.length, 5, `FAQ incomplete: ${lang}`);
    assert.equal(expandedLocaleContent[lang]?.articles?.length, 4, `Blog index incomplete: ${lang}`);
    for (const row of expandedLocaleContent[lang].faq) {
      assert.equal(row.length, 2);
      assert.ok(row.every((value) => typeof value === "string" && value.trim().length >= 5));
    }
  }
  if (lang !== "en") {
    const articles = localizedBlogSections[lang];
    assert.equal(articles?.length, 4, `Missing article sections: ${lang}`);
    for (let i = 0; i < sectionCounts.length; i++) {
      assert.equal(articles[i]?.length, sectionCounts[i], `Wrong number of sections: ${lang} article ${i}`);
      for (const [title, body] of articles[i]) {
        assert.ok(title?.trim().length >= 4, `Missing section title: ${lang}`);
        assert.ok(body?.trim().length >= (lang === "zh" || lang === "ja" ? 12 : 30), `Missing section body: ${lang}`);
      }
    }
  }
}
for (const [gallery, expected] of Object.entries({palmarium:7,northern:4,tsingy:5,andasibe:18})) {
  const group = destinationGalleryLocales[gallery];
  for (const lang of ["ru","ja","de","it","es","zh"]) {
    const scenes = group?.[lang];
    assert.equal(scenes?.length, expected, `Missing ${gallery} images in ${lang}`);
    assert.ok(scenes.every(scene => scene.length === 3 && scene.every(v => typeof v === "string" && v.trim().length >= 3)), `Invalid caption for ${gallery} / ${lang}`);
  }
}
assert.ok(extraTranslationCount >= 171, "The site-wide translation glossary is unexpectedly short");
assert.ok(main.includes('activateExtraTranslations(lang)'), "Site-wide translation observer missing");
assert.ok(main.includes('expandedLocaleContent[lang]?.faq'), "Translated FAQ not connected");
assert.ok(main.includes('localizedBlogSections[lang]'), "Translated article bodies not connected");
const style = readFileSync(new URL("../src/style.css", import.meta.url), "utf8");
assert.ok(style.includes("RESPONSIVE + MULTILINGUAL LAYOUT"), "Responsive styles missing");
for (const size of [1220, 950, 768, 600, 390]) {
  assert.ok(style.includes(`max-width: ${size}px`), `Missing responsive breakpoint ${size}`);
}
const otherLanguages = ["ru", "ja", "de", "it", "es", "zh"];
for (const lang of otherLanguages) {
  const photography = photographyOtherLocales[lang];
  assert.equal(photography?.scenes?.length, 2, `Photography not localized: ${lang}`);
  assert.equal(conservationOtherLocales[lang]?.scenes?.length, 10, `Conservation blog not localized: ${lang}`);
  assert.equal(conservationSliderCopy.captions[lang]?.length, 13, `Conservation slider not localized: ${lang}`);
  for (const scene of photography.scenes) {
    assert.ok(scene.title?.trim() && scene.description?.trim() && scene.alt?.trim());
  }
  for (const scene of conservationOtherLocales[lang].scenes) {
    assert.ok(scene.length === 3 && scene.every(part => part.trim().length > 2));
  }
}
assert.match(main, /aria-expanded=\{menu\}/, "Mobile menu must report open/closed state");
for (const lang of locales) {
  assert.ok(siteMetaLocales[lang]?.title?.trim().length > 12, `Missing browser title: ${lang}`);
  assert.ok(siteMetaLocales[lang]?.description?.trim().length > 40, `Missing SEO description: ${lang}`);
  if (lang !== "en") {
    assert.equal(photographyCardLocales[lang]?.length, 4, `Photography cards not translated: ${lang}`);
    assert.ok(photographyCardLocales[lang].every(card => card.length === 4 && card.every(field => field?.trim())));
  }
}
for (const lang of ["ru", "ja", "de", "it", "es", "zh"]) {
  assert.equal(hiddenMomentsOtherScenes[lang]?.length, 7, `Hidden Moments incomplete: ${lang}`);
  assert.equal(wildlifeOtherLocales[lang]?.slides?.length, 10, `Wildlife gallery incomplete: ${lang}`);
  assert.ok(wildlifeOtherLocales[lang]?.note?.length > 30, `Wildlife image provenance missing: ${lang}`);
}
assert.ok(main.includes('photographyCardLocales[lang]'), "Photography cards not wired to language");
assert.ok(main.includes('siteMetaLocales[lang]'), "Browser title not wired to language");
// Regression guards: the mobile/tablet header must expose both language and menu,
 // and unobserved animated content must never stay invisible.
assert.ok(main.includes('className="language-picker"'), "Language picker wrapper missing");
assert.ok(main.includes('id="hery-language-select"'), "Language select missing");
assert.ok(main.includes('id="hery-primary-navigation"'), "Primary mobile navigation missing");
assert.ok(main.includes('className="icon-btn menu-btn"'), "Mobile menu button missing");
assert.ok(main.includes('classList.add("reveal-ready")'), "Progressive reveal observer missing");
assert.ok(style.includes(".reveal.reveal-ready:not(.visible)"), "Visible-by-default reveal protection missing");
assert.ok(style.includes(".header .nav.open"), "Mobile opened menu CSS missing");
assert.ok(style.includes("overflow-y: visible;"), "Mobile vertical overflow must not hide navigation");
for (const breakpoint of [1220, 700, 360]) {
  assert.ok(style.includes(`max-width: ${breakpoint}px`), `Missing mobile navigation breakpoint ${breakpoint}`);
}
// Andasibe gallery: original scene 11 must be excluded, eight supplied
// WebP images inserted, and every active caption translated.
const andasibeSource = readFileSync(new URL("../src/AndasibeGallery.jsx", import.meta.url), "utf8");
assert.ok(andasibeSource.includes("ORIGINAL_PHOTOS.slice(0, 10)"), "Andasibe first ten photos missing");
assert.ok(andasibeSource.includes("ORIGINAL_PHOTOS.slice(11)"), "Old image eleven must be removed");
assert.ok(andasibeSource.includes("ZIP_PHOTOS"), "Owner photo ZIP not connected to the carousel");
assert.ok(andasibeSource.includes("andasibeNewPhotoScenes"), "New photo captions not connected");
for (const lang of locales) {
  const captions = andasibeNewPhotoScenes[lang];
  assert.equal(captions?.length, 8, `Andasibe ZIP captions incomplete for ${lang}`);
  assert.ok(captions.every(row => row.length === 3 && row.every(value => value.trim().length >= 4)), `Invalid Andasibe caption in ${lang}`);
}
for (let i = 1; i <= 8; i++) {
  const num = String(i).padStart(2, "0");
  const path = new URL(`../public/images/andasibe-added/andasibe-extra-${num}.webp`, import.meta.url);
  assert.ok(existsSync(path), `Missing ZIP image ${i}`);
  assert.ok(statSync(path).size > 18000, `ZIP image too small: ${i}`);
  const bytes = readFileSync(path);
  assert.equal(bytes.toString("ascii", 0, 4), "RIFF", `Invalid WebP file ${i}`);
  assert.equal(bytes.toString("ascii", 8, 12), "WEBP", `Invalid WebP file ${i}`);
}
console.log("HERY locale checks passed: nine selectors, translated FAQs, blog entries and article sections, responsive breakpoints and photo captions, browser metadata and live gallery translations and all Andasibe photo assets.");
