import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { expandedLocaleContent } from "../src/expandedLocaleContent.js";
import { localizedBlogSections } from "../src/localizedBlogSections.js";
import { extraTranslationCount } from "../src/siteTranslationExtras.js";

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
assert.ok(extraTranslationCount >= 171, "The site-wide translation glossary is unexpectedly short");
assert.ok(main.includes('activateExtraTranslations(lang)'), "Site-wide translation observer missing");
assert.ok(main.includes('expandedLocaleContent[lang]?.faq'), "Translated FAQ not connected");
assert.ok(main.includes('localizedBlogSections[lang]'), "Translated article bodies not connected");
console.log("HERY locale checks passed: nine selectors, translated FAQs, blog entries and article sections.");
