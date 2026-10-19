import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { expandedLocaleContent } from "../src/expandedLocaleContent.js";
import { localizedBlogSections } from "../src/localizedBlogSections.js";
import { extraTranslationCount } from "../src/siteTranslationExtras.js";
import { destinationGalleryLocales } from "../src/destinationGalleryLocales.js";
import { photographyOtherLocales } from "../src/photographyOtherLocales.js";
import { conservationOtherLocales } from "../src/conservationOtherLocales.js";
import { conservationSliderCopy } from "../src/conservationSliderLocales.js";

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
console.log("HERY locale checks passed: nine selectors, translated FAQs, blog entries and article sections, responsive breakpoints and photo captions.");
