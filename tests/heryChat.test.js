import test from "node:test";
import assert from "node:assert/strict";
import { getHeryChatReply, getHeryVisitorName } from "../src/heryChat.js";

test("photographer is not mistaken for a visitor name", () => {
  assert.equal(getHeryVisitorName("I am a photographer"), null);
  assert.equal(getHeryChatReply("I am a photographer", "en").intent, "photo");
});

test("astrophotography outranks generic photography", () => {
  assert.equal(getHeryChatReply("I want astrophotography", "en").intent, "astro");
});

test("pricing request outranks location and activity mentions", () => {
  assert.equal(getHeryChatReply("Hello, how much for astrophotography in Morondava?", "en").intent, "price");
});

test("booking request outranks location names", () => {
  assert.equal(getHeryChatReply("Can I book a trip to Kirindy?", "en").intent, "booking");
});

test("explicit introduction recognises a name", () => {
  assert.equal(getHeryVisitorName("My name is Christian"), "Christian");
  assert.equal(getHeryChatReply("My name is Christian", "en").intent, "name");
});

test("who is HERY question gives accurate profile", () => {
  const reply = getHeryChatReply("Who is HERY?", "en");
  assert.equal(reply.intent, "who");
  assert.match(reply.text, /Morondava/);
});

test("specific destination takes precedence over generic list", () => {
  assert.equal(getHeryChatReply("Tell me about Tsingy de Bemaraha", "en").intent, "tsingy");
  assert.equal(getHeryChatReply("What about Nosy Be?", "en").intent, "islands");
});

test("language remains the selected interface language", () => {
  const reply = getHeryChatReply("I am a photographer", "mg");
  assert.equal(reply.intent, "photo");
  assert.match(reply.text, /Eny/);
});

test("unverified subjects are not guessed", () => {
  assert.equal(getHeryChatReply("What will the weather be tomorrow?", "en").intent, "unknown");
});

test("contact details are grounded", () => {
  assert.match(getHeryChatReply("WhatsApp", "fr").text, /261 34 58 085 04/);
});

test("Malagasy thanks and courtesy phrases receive an appropriate answer", () => {
  for (const text of ["misaotra betsaka", "Tena misaotra!", "misaotra indrindra", "Mankasitraka"]) {
    const reply = getHeryChatReply(text, "mg");
    assert.equal(reply.intent, "thanks", text);
    assert.match(reply.text, /Tsy misy fisaorana/);
  }
});

test("courtesy expressions work in other supported languages", () => {
  for (const [text, lang] of [
    ["Merci beaucoup", "fr"],
    ["Thank you very much", "en"],
    ["Muchas gracias", "es"],
    ["Grazie mille", "it"],
    ["Vielen Dank", "de"],
    ["Большое спасибо", "ru"],
    ["ありがとうございます", "ja"],
    ["非常感谢", "zh"],
  ]) {
    assert.equal(getHeryChatReply(text, lang).intent, "thanks", text);
  }
});

test("thanks followed by a real question is answered by topic", () => {
  assert.equal(getHeryChatReply("Misaotra betsaka, ohatrinona ny sarany?", "mg").intent, "price");
  assert.equal(getHeryChatReply("Thank you, how much for Kirindy?", "en").intent, "price");
  assert.equal(getHeryChatReply("Merci beaucoup, je veux réserver", "fr").intent, "booking");
});
