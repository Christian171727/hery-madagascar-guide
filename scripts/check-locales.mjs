import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { andasibeNewPhotoScenes } from "../src/andasibeNewPhotoScenes.js";
import { expandedLocaleContent } from "../src/expandedLocaleContent.js";
import { localizedBlogSections } from "../src/localizedBlogSections.js";
import { extraTranslationCount } from "../src/siteTranslationExtras.js";
import { destinationGalleryLocales } from "../src/destinationGalleryLocales.js";
import { tsingyNewPhotoLocales } from "../src/tsingyNewPhotoLocales.js";
import { photographyOtherLocales } from "../src/photographyOtherLocales.js";
import { conservationOtherLocales } from "../src/conservationOtherLocales.js";
import { conservationSliderCopy } from "../src/conservationSliderLocales.js";
import { photographyCardLocales } from "../src/photographyCardLocales.js";
import { siteMetaLocales } from "../src/siteMetaLocales.js";
import { hiddenMomentsOtherScenes } from "../src/hiddenMomentsOtherScenes.js";
import { wildlifeOtherLocales } from "../src/wildlifeOtherLocales.js";
import { wildlifePhotoLocales, wildlifePhotoFiles } from "../src/wildlifePhotoLocales.js";
import { palmariumAddedPhotoLocales } from "../src/palmariumAddedPhotoLocales.js";

const locales = ["en", "fr", "mg", "ru", "ja", "de", "it", "es", "zh"];
const tsingySource = readFileSync(new URL("../src/TsingyGallery.jsx", import.meta.url), "utf8");
assert.ok(tsingySource.includes("length: 4") && !tsingySource.includes("length: 5"), "Tsingy slideshow must contain only four owner-provided limestone photos (01-04)");
assert.ok(!tsingySource.includes("tsingy${index + 1}.avif"), "Previously displayed wildlife photos 05-09 must remain excluded");
for (const code of locales) {
  assert.equal(tsingyNewPhotoLocales[code]?.scenes?.length, 4, `New Tsingy scenes missing: ${code}`);
  assert.ok(tsingyNewPhotoLocales[code].scenes.every(row => row.length === 3 && row.every(x => x.trim().length > 2)));
}

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
// Andasibe gallery: the ten former first photos plus the former #11
// PALMARIUM photo are excluded. 8 ZIP images + old #12-#18 = 15 slides.
const andasibeSource = readFileSync(new URL("../src/AndasibeGallery.jsx", import.meta.url), "utf8");
assert.ok(!andasibeSource.includes("ORIGINAL_PHOTOS.slice(0, 10)"), "Old Andasibe photos 01-10 must be removed");
assert.ok(andasibeSource.includes("const PHOTOS = [...ZIP_PHOTOS, ...REMAINING_PHOTOS]"), "Only ZIP and retained photos should appear");
assert.ok(andasibeSource.includes("length: 7") && andasibeSource.includes("index + 12"), "Retain original Andasibe photos 12-18 only");
assert.ok(andasibeSource.includes("sceneIndex < ZIP_PHOTOS.length"), "First eight photos must use new translations");
assert.ok(andasibeSource.includes("sceneIndex - ZIP_PHOTOS.length + 11"), "Retained photos must use matching original translations");
assert.ok(andasibeSource.includes("andasibeNewPhotoScenes"), "New photo captions not connected");
for (const lang of locales) {
  const captions = andasibeNewPhotoScenes[lang];
  assert.equal(captions?.length, 8, `Andasibe ZIP captions incomplete for ${lang}`);
  assert.ok(captions.every(row => row.length === 3 && row.every(value => value.trim().length >= (lang === 'ja' || lang === 'zh' ? 2 : 4))), `Invalid Andasibe caption in ${lang}`);
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

assert.equal(wildlifePhotoFiles.length, 9, "Wildlife photography must use all nine supplied photographs");
for (const lang of locales) {
  const locale = wildlifePhotoLocales[lang];
  assert.equal(locale?.scenes?.length, 9, `Wildlife Photography scene count incorrect: ${lang}`);
  assert.equal(locale?.buttons?.length, 4, `Wildlife Photography control labels missing: ${lang}`);
  for (const row of locale.scenes) {
    assert.equal(row.length, 2, `Wildlife Photography captions must have title and description: ${lang}`);
    assert.ok(row.every(part => typeof part === "string" && part.trim().length >= 4),
      `Empty Wildlife Photography caption: ${lang}`);
  }
}
assert.ok(main.includes("wildlifePhotoFiles[wildlifeIndex]"), "Wildlife carousel image not wired");
assert.ok(main.includes("wildlifeScene[1]"), "Wildlife image descriptions not displayed");
for (const [index, src] of wildlifePhotoFiles.entries()) {
  const path = new URL(`../public${src}`, import.meta.url);
  assert.ok(existsSync(path), `Wildlife Photography image missing: ${index + 1}`);
  const image = readFileSync(path);
  assert.ok(image.length > 1000, `Wildlife Photography image too small: ${index + 1}`);
  assert.equal(image.toString("ascii", 4, 8), "ftyp", `Invalid AVIF image: ${index + 1}`);
}
// Palmarium: keep the seven previous slides and append seven new real photographs.
const palmariumGallerySource = readFileSync(new URL("../src/PalmariumGallery.jsx", import.meta.url), "utf8");
assert.ok(palmariumGallerySource.includes("const PHOTOS = [...ORIGINAL_PHOTOS, ...ADDED_PHOTOS]"), "Palmarium carousel must show both old and new photos");
assert.ok(palmariumGallerySource.includes("sceneIndex - ORIGINAL_PHOTOS.length"), "Palmarium new slide captions must follow the right photograph");
for (const lang of locales) {
  const bundle = palmariumAddedPhotoLocales[lang];
  assert.equal(bundle?.scenes?.length, 7, `Palmarium ZIP captions missing for ${lang}`);
  assert.ok(bundle.tag?.length > 5 && bundle.previous && bundle.next && bundle.pause && bundle.play, `Palmarium controls not translated for ${lang}`);
  for (const row of bundle.scenes) {
    assert.equal(row.length, 3, `Palmarium subtitle missing in ${lang}`);
    assert.ok(row.every(value => value?.trim().length >= 2), `Blank Palmarium caption in ${lang}`);
  }
}
for (let number = 1; number <= 7; number++) {
  const id = String(number).padStart(2, "0");
  const file = new URL(`../public/images/palmarium-added/palmarium-added-${id}.webp`, import.meta.url);
  assert.ok(existsSync(file), `Palmarium missing supplied image ${id}`);
  const bytes = readFileSync(file);
  assert.ok(bytes.length > 20000, `Palmarium image ${id} is unexpectedly small`);
  assert.equal(bytes.toString("ascii", 0, 4), "RIFF", `Palmarium image ${id} has invalid WebP header`);
  assert.equal(bytes.toString("ascii", 8, 12), "WEBP", `Palmarium image ${id} is not WebP`);
}
console.log("HERY locale checks passed: nine selectors, translated FAQs, blog entries and article sections, responsive breakpoints and photo captions, browser metadata and live gallery translations and all Andasibe photo assets.");
