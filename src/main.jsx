import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";

import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  ChevronDown,
  MessageCircle,
  Send,
  MapPin,
  Camera,
  Star,
  ShieldCheck,
  Leaf,
  Mail,
  Phone,
  Globe2,
  Compass,
  Heart,
  Users,
  Search,
  Play,
  Clock,
  Mountain,
  TreePine,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import "./style.css";

/* =========================================================
   CONFIGURATION
========================================================= */

const API =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID;

const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


/* =========================================================
   IMAGES  ← URLs locales modifiées uniquement
========================================================= */

const imgs = {
  // Images locales fournies dans public/images
  hero: "/images/hero.jpg",
  profile: "/images/HERY.jpg",

  // Destinations — une image différente pour chaque destination
  morondava: "/images/Morondava.jpg",
  kirindy: "/images/Kirindy.jpeg",
  baobabs: "/images/Baobabs.jpg",
  tsingy: "/images/Bemaraha.jpeg",
  manambolo: "/images/Manambolo.jpg",
  palmarium: "/images/Palmarium.jpg",
  andasibe: "/images/Andasibe.jpg",
  ankarafantsika: "/images/Ankarafantsika.jpg",
  miandrivazo: "/images/Miandrivazo.jpg",
  nosybe: "/images/NosyBe.jpg",
  sainteMarie: "/images/SainteMarie.jpg",
  rn7: "/images/RN7.jpg",

  // Images utilisées dans les autres sections
  wildlife: "/images/Kirindy1.jpeg",
  baobab: "/images/Baobabs.jpg",
  forest: "/images/forest.jpeg",
  mountain: "/images/Tsingy.jpg",
  night: "/images/night.jpeg",
  river: "/images/Manambolo.jpg",
  coast: "/images/NosyBe.jpg",
  culture: "/images/culture.jpg",
};


/* =========================================================
   TRANSLATIONS
========================================================= */

const copy = {
  fr: {
    nav: [
      "Accueil",
      "À propos",
      "Expertise",
      "Destinations",
      "Photographie",
      "Astrophotographie",
      "Conservation",
      "Culture",
      "Services",
      "Blog",
      "FAQ",
      "Contact",
    ],

    heroKicker: "MADAGASCAR LOCAL GUIDE",

    heroTitle: (
      <>
        Discover Madagascar
        <br />
        <em>step by step.</em>
      </>
    ),

    heroSub:
      "Wildlife encounters. Night skies. Living landscapes.",

    heroText:
      "Une expérience de terrain mêlant guidage local, observation de la faune, photographie, astrophotographie et découverte de la biodiversité malgache.",

    explore: "Explorer Madagascar",
    photo: "Voir la photographie",

    aboutKicker: "QUI EST HERY Nomenjanahary Fanomezantsoa Malazamana?",

    aboutTitle:
      "Un guide local. Une véritable expérience de terrain.",

    aboutText:
      "HERY est un guide local basé à Morondava / Menabe, spécialisé dans la nature, la faune, la photographie, l’astrophotographie, la biodiversité et la conservation.",

    profile:
      "Guide local & accompagnateur terrain",

    destTitle:
      "Destinations à découvrir",

    destSub:
      "Des paysages vivants, une faune unique et des rencontres guidées avec une véritable approche locale.",

    viewAll:
      "Voir toutes les destinations",

    stories:
      "Carnet de terrain & guides",

    storiesSub:
      "Conseils, découvertes et histoires autour de Madagascar.",

    read:
      "Lire les articles",

    offer:
      "VOTRE PROCHAINE AVENTURE",

    offerTitle:
      "Discover Madagascar step by step.",

    offerText:
      "Une expérience personnalisée, flexible et respectueuse du terrain.",

    contact:
      "Parler avec HERY",

    stats: [
      "Expériences terrain",
      "Photographie",
      "Conservation",
      "Approche locale",
    ],

    servicesTitle:
      "Services & expériences",

    faqTitle:
      "Questions fréquentes",

    contactTitle:
      "Préparer votre expérience à Madagascar",

    contactSub:
      "Décrivez votre projet, vos envies et votre période. HERY vous répondra directement.",

    name:
      "Nom complet",

    email:
      "Email",

    message:
      "Votre message",

    send:
      "Envoyer le message",

    sending:
      "Envoi en cours...",

    sent:
      "Message envoyé avec succès.",

    error:
      "Impossible d’envoyer le message. Vérifiez la configuration EmailJS.",

    footer:
      "Wildlife encounters. Night skies. Living landscapes.",

    astroTitle:
      "Astrophotographie",

    astroText:
      "Découvrez les nuits malgaches à travers la Voie lactée, les étoiles, les paysages nocturnes et les longues expositions.",

    conservationTitle:
      "La nature n’est pas un décor. C’est l’histoire.",

    cultureTitle:
      "Découvrir Madagascar au-delà de la carte postale.",

    discover:
      "Découvrir",

    readArticle:
      "Lire l’article",

    searchPlaceholder:
      "Rechercher Morondava, Kirindy, Tsingy...",

    chatbotWelcome:
      "Bonjour 👋 Je suis HERY Nomenjanahary Fanomezantsoa Malazamana Assistant. Je peux vous renseigner sur les destinations, les expériences, la photographie, l’astrophotographie et votre projet de voyage à Madagascar.",

    chatbotPlaceholder:
      "Posez votre question...",

    chatbotTitle:
      "HERY Assistant",

    chatbotSub:
      "Guide local • Madagascar",

    quickQuestions: [
      "Qui est HERY ?",
      "Je veux visiter Morondava",
      "Je suis photographe",
      "Je veux faire de l'astrophotographie",
    ],
  },

  en: {
    nav: [
      "Home",
      "About",
      "Expertise",
      "Destinations",
      "Photography",
      "Astrophotography",
      "Conservation",
      "Culture",
      "Services",
      "Blog",
      "FAQ",
      "Contact",
    ],

    heroKicker: "MADAGASCAR LOCAL GUIDE",

    heroTitle: (
      <>
        Discover Madagascar
        <br />
        <em>step by step.</em>
      </>
    ),

    heroSub:
      "Wildlife encounters. Night skies. Living landscapes.",

    heroText:
      "A field-based experience combining local guiding, wildlife observation, photography, astrophotography and biodiversity discovery.",

    explore:
      "Explore Madagascar",

    photo:
      "View photography",

    aboutKicker:
      "WHO IS HERY?",

    aboutTitle:
      "A local guide. A true field-based experience.",

    aboutText:
      "HERY is a local guide based in Morondava / Menabe, specializing in nature, wildlife, photography, astrophotography, biodiversity and conservation.",

    profile:
      "Local guide & field companion",

    destTitle:
      "Destinations to discover",

    destSub:
      "Living landscapes, unique wildlife and guided encounters through a genuine local approach.",

    viewAll:
      "View all destinations",

    stories:
      "Field notes & guides",

    storiesSub:
      "Tips, discoveries and stories from Madagascar.",

    read:
      "Read articles",

    offer:
      "YOUR NEXT ADVENTURE",

    offerTitle:
      "Discover Madagascar step by step.",

    offerText:
      "A personalized, flexible and respectful field experience.",

    contact:
      "Talk to HERY",

    stats: [
      "Field experiences",
      "Photography",
      "Conservation",
      "Local approach",
    ],

    servicesTitle:
      "Services & experiences",

    faqTitle:
      "Frequently asked questions",

    contactTitle:
      "Plan your Madagascar experience",

    contactSub:
      "Tell us about your project, interests and travel period. HERY will reply directly.",

    name:
      "Full name",

    email:
      "Email",

    message:
      "Your message",

    send:
      "Send message",

    sending:
      "Sending...",

    sent:
      "Message sent successfully.",

    error:
      "Unable to send the message. Check your EmailJS configuration.",

    footer:
      "Wildlife encounters. Night skies. Living landscapes.",

    astroTitle:
      "Astrophotography",

    astroText:
      "Experience Madagascar's night skies through the Milky Way, stars, night landscapes and long exposures.",

    conservationTitle:
      "Nature is not a backdrop. It is the story.",

    cultureTitle:
      "Meet Madagascar beyond the postcard.",

    discover:
      "Discover",

    readArticle:
      "Read article",

    searchPlaceholder:
      "Search Morondava, Kirindy, Tsingy...",

    chatbotWelcome:
      "Hello 👋 I am HERY Assistant. I can help you with destinations, experiences, photography, astrophotography and your Madagascar travel project.",

    chatbotPlaceholder:
      "Ask your question...",

    chatbotTitle:
      "HERY Assistant",

    chatbotSub:
      "Local guide • Madagascar",

    quickQuestions: [
      "Who is HERY?",
      "I want to visit Morondava",
      "I am a photographer",
      "I want astrophotography",
    ],
  },

  mg: {
    nav: [
      "Fandraisana",
      "Momba an’i HERY",
      "Fahaizana",
      "Toerana",
      "Photographie",
      "Astrophotographie",
      "Fiarovana",
      "Kolontsaina",
      "Services",
      "Blog",
      "FAQ",
      "Contact",
    ],

    heroKicker:
      "MADAGASCAR LOCAL GUIDE",

    heroTitle: (
      <>
        Discover Madagascar
        <br />
        <em>step by step.</em>
      </>
    ),

    heroSub:
      "Wildlife encounters. Night skies. Living landscapes.",

    heroText:
      "Traikefa eny an-kianja mampifandray ny fitarihana, fijerena bibidia, photographie, astrophotographie ary fahafantarana ny biodiversité eto Madagascar.",

    explore:
      "Hijery an’i Madagascar",

    photo:
      "Hijery ny sary",

    aboutKicker:
      "IZA I HERY?",

    aboutTitle:
      "Guide local. Traikefa tena eny an-kianja.",

    aboutText:
      "HERY dia guide local monina ao Morondava / Menabe, mifantoka amin’ny natiora, bibidia, photographie, astrophotographie, biodiversité ary conservation.",

    profile:
      "Guide local & mpitari-dalana",

    destTitle:
      "Toerana azo tsidihina",

    destSub:
      "Tontolo velona, bibidia tsy manam-paharoa ary traikefa tarihin’olona mahalala tsara ny toerana.",

    viewAll:
      "Hijery ny toerana rehetra",

    stories:
      "Carnet de terrain & guides",

    storiesSub:
      "Torohevitra, zavatra hita ary tantara momba an’i Madagascar.",

    read:
      "Hamaky lahatsoratra",

    offer:
      "NY DIA MANARAKA",

    offerTitle:
      "Discover Madagascar step by step.",

    offerText:
      "Traikefa manokana, flexible ary manaja ny tontolo iainana.",

    contact:
      "Hifandray amin’i HERY",

    stats: [
      "Traikefa eny an-kianja",
      "Photographie",
      "Conservation",
      "Fomba local",
    ],

    servicesTitle:
      "Services & expériences",

    faqTitle:
      "Fanontaniana matetika",

    contactTitle:
      "Omano ny traikefanao eto Madagascar",

    contactSub:
      "Lazao ny tetikasanao, izay tianao ho hita ary ny fotoana. HERY no hamaly anao mivantana.",

    name:
      "Anarana feno",

    email:
      "Email",

    message:
      "Hafatra",

    send:
      "Alefa ny hafatra",

    sending:
      "Alefa...",

    sent:
      "Voaray soa aman-tsara ny hafatra.",

    error:
      "Tsy afaka nandefa hafatra. Hamarino ny EmailJS.",

    footer:
      "Wildlife encounters. Night skies. Living landscapes.",

    astroTitle:
      "Astrophotographie",

    astroText:
      "Jereo ny hakanton’ny lanitra malagasy, ny Voie lactée, ny kintana ary ny paysages amin’ny alina.",

    conservationTitle:
      "Tsy haingo fotsiny ny natiora. Izy no tantara.",

    cultureTitle:
      "Fantaro i Madagascar mihoatra noho ny carte postale.",

    discover:
      "Hijery",

    readArticle:
      "Hamaky",

    searchPlaceholder:
      "Mitadiava Morondava, Kirindy, Tsingy...",

    chatbotWelcome:
      "Salama 👋 Izaho no HERY Assistant. Afaka manampy anao momba ny toerana, excursions, photographie, astrophotographie ary ny dianao eto Madagascar aho.",

    chatbotPlaceholder:
      "Soraty eto ny fanontanianao...",

    chatbotTitle:
      "HERY Assistant",

    chatbotSub:
      "Guide local • Madagascar",

    quickQuestions: [
      "Iza i HERY?",
      "Te hitsidika an’i Morondava aho",
      "Photographe aho",
      "Te hanao astrophotographie aho",
    ],
  },

  zh: {
    nav: [
      "首页",
      "关于 HERY",
      "专业",
      "目的地",
      "摄影",
      "天文摄影",
      "保护",
      "文化",
      "服务",
      "博客",
      "FAQ",
      "联系",
    ],

    heroKicker:
      "MADAGASCAR LOCAL GUIDE",

    heroTitle: (
      <>
        Discover Madagascar
        <br />
        <em>step by step.</em>
      </>
    ),

    heroSub:
      "Wildlife encounters. Night skies. Living landscapes.",

    heroText:
      "结合当地向导、野生动物观察、摄影、天文摄影、生物多样性探索与自然保护的真实体验。",

    explore:
      "探索马达加斯加",

    photo:
      "查看摄影",

    aboutKicker:
      "关于 HERY",

    aboutTitle:
      "当地向导，真实的实地体验。",

    aboutText:
      "HERY 是一名位于 Morondava / Menabe 的当地向导，专注于自然、野生动物、摄影、天文摄影、生物多样性与保护。",

    profile:
      "当地向导与实地陪伴",

    destTitle:
      "探索目的地",

    destSub:
      "充满生命力的景观、独特的野生动物以及真正的当地体验。",

    viewAll:
      "查看全部目的地",

    stories:
      "实地笔记与指南",

    storiesSub:
      "关于马达加斯加的建议、发现与故事。",

    read:
      "阅读文章",

    offer:
      "下一次冒险",

    offerTitle:
      "Discover Madagascar step by step.",

    offerText:
      "个性化、灵活并尊重自然的旅行体验。",

    contact:
      "联系 HERY",

    stats: [
      "实地体验",
      "摄影",
      "自然保护",
      "当地方式",
    ],

    servicesTitle:
      "服务与体验",

    faqTitle:
      "常见问题",

    contactTitle:
      "规划您的马达加斯加体验",

    contactSub:
      "告诉我们您的计划、兴趣和时间，HERY 将直接回复您。",

    name:
      "姓名",

    email:
      "邮箱",

    message:
      "留言",

    send:
      "发送留言",

    sending:
      "发送中...",

    sent:
      "留言发送成功。",

    error:
      "无法发送留言，请检查 EmailJS 配置。",

    footer:
      "Wildlife encounters. Night skies. Living landscapes.",

    astroTitle:
      "天文摄影",

    astroText:
      "探索马达加斯加的夜空、银河、星星、夜景和长曝光摄影。",

    conservationTitle:
      "自然不是背景，而是故事本身。",

    cultureTitle:
      "超越明信片，真正认识马达加斯加。",

    discover:
      "探索",

    readArticle:
      "阅读文章",

    searchPlaceholder:
      "搜索 Morondava、Kirindy、Tsingy...",

    chatbotWelcome:
      "您好 👋 我是 HERY Assistant。我可以帮助您了解目的地、旅行体验、摄影、天文摄影以及马达加斯加旅行计划。",

    chatbotPlaceholder:
      "请输入您的问题...",

    chatbotTitle:
      "HERY Assistant",

    chatbotSub:
      "当地向导 • 马达加斯加",

    quickQuestions: [
      "HERY 是谁？",
      "我想参观 Morondava",
      "我是摄影师",
      "我想体验天文摄影",
    ],
  },

  ru: {
    nav: ["Главная","О HERY","Экспертиза","Направления","Фотография","Астрофотография","Сохранение природы","Культура","Услуги","Блог","FAQ","Контакты"],
    heroKicker: "МЕСТНЫЙ ГИД ПО МАДАГАСКАРУ",
    heroTitle: <>Откройте Мадагаскар<br/><em>шаг за шагом.</em></>,
    heroSub: "Встречи с дикой природой. Ночное небо. Живые ландшафты.",
    heroText: "Полевой опыт, объединяющий местного гида, наблюдение за дикой природой, фотографию, астрофотографию и знакомство с биоразнообразием Мадагаскара.",
    explore: "Открыть Мадагаскар", photo: "Смотреть фотографии", aboutKicker: "КТО ТАКОЙ HERY?", aboutTitle: "Местный гид. Настоящий опыт в поле.", aboutText: "HERY — местный гид из Morondava / Menabe, специализирующийся на природе, дикой природе, фотографии, астрофотографии, биоразнообразии и охране природы.", profile: "Местный гид и сопровождающий", destTitle: "Направления для открытия", destSub: "Живые ландшафты, уникальная фауна и экскурсии с настоящим местным подходом.", viewAll: "Все направления", stories: "Полевые заметки и гиды", storiesSub: "Советы, открытия и истории с Мадагаскара.", read: "Читать статьи", offer: "ВАШЕ СЛЕДУЮЩЕЕ ПРИКЛЮЧЕНИЕ", offerTitle: "Откройте Мадагаскар шаг за шагом.", offerText: "Персональный, гибкий и бережный опыт в полевых условиях.", contact: "Связаться с HERY", stats: ["Полевой опыт","Фотография","Охрана природы","Местный подход"], servicesTitle: "Услуги и впечатления", faqTitle: "Частые вопросы", contactTitle: "Спланируйте путешествие по Мадагаскару", contactSub: "Расскажите о своем проекте, интересах и периоде поездки. HERY ответит лично.", name: "Полное имя", email: "Email", message: "Ваше сообщение", send: "Отправить сообщение", sending: "Отправка...", sent: "Сообщение успешно отправлено.", error: "Не удалось отправить сообщение. Проверьте настройки EmailJS.", footer: "Встречи с дикой природой. Ночное небо. Живые ландшафты.", astroTitle: "Астрофотография", astroText: "Откройте ночное небо Мадагаскара: Млечный путь, звезды, ночные пейзажи и длинные выдержки.", conservationTitle: "Природа — не декорация. Это история.", cultureTitle: "Познакомьтесь с Мадагаскаром за пределами открытки.", discover: "Открыть", readArticle: "Читать статью", searchPlaceholder: "Поиск Morondava, Kirindy, Tsingy...", chatbotWelcome: "Здравствуйте 👋 Я HERY Assistant. Я могу помочь с направлениями, опытом, фотографией, астрофотографией и планированием поездки по Мадагаскару.", chatbotPlaceholder: "Задайте вопрос...", chatbotTitle: "HERY Assistant", chatbotSub: "Местный гид • Мадагаскар", quickQuestions: ["Кто такой HERY?","Хочу посетить Morondava","Я фотограф","Хочу заняться астрофотографией"]
  },

  ja: {
    nav: ["ホーム","HERYについて","専門分野","目的地","写真","天体写真","自然保護","文化","サービス","ブログ","FAQ","お問い合わせ"],
    heroKicker: "マダガスカル・ローカルガイド",
    heroTitle: <>マダガスカルを発見<br/><em>一歩ずつ。</em></>,
    heroSub: "野生動物との出会い。夜空。生きた風景。",
    heroText: "現地ガイド、野生動物観察、写真、天体写真、マダガスカルの生物多様性を組み合わせたフィールド体験です。",
    explore: "マダガスカルを探す", photo: "写真を見る", aboutKicker: "HERYとは？", aboutTitle: "ローカルガイド。本物のフィールド体験。", aboutText: "HERYはMorondava / Menabeを拠点とするローカルガイドで、自然、野生動物、写真、天体写真、生物多様性、自然保護を専門としています。", profile: "ローカルガイド＆フィールド同行", destTitle: "訪れたい目的地", destSub: "生命にあふれる風景、固有の野生動物、そして本物のローカル体験。", viewAll: "すべての目的地", stories: "フィールドノート＆ガイド", storiesSub: "マダガスカルのヒント、発見、ストーリー。", read: "記事を読む", offer: "次の冒険へ", offerTitle: "マダガスカルを一歩ずつ発見。", offerText: "個別対応で柔軟、自然と現地を尊重する体験。", contact: "HERYに相談", stats: ["フィールド体験","写真","自然保護","ローカルな視点"], servicesTitle: "サービス＆体験", faqTitle: "よくある質問", contactTitle: "マダガスカル旅行を計画する", contactSub: "ご希望、興味、旅行時期をお知らせください。HERYが直接返信します。", name: "氏名", email: "メール", message: "メッセージ", send: "送信", sending: "送信中...", sent: "メッセージを送信しました。", error: "送信できませんでした。EmailJS設定を確認してください。", footer: "野生動物との出会い。夜空。生きた風景。", astroTitle: "天体写真", astroText: "天の川、星、夜の風景、長時間露光を通してマダガスカルの夜空を楽しみます。", conservationTitle: "自然は背景ではありません。物語そのものです。", cultureTitle: "絵葉書の向こう側にあるマダガスカルへ。", discover: "見る", readArticle: "記事を読む", searchPlaceholder: "Morondava、Kirindy、Tsingyを検索...", chatbotWelcome: "こんにちは 👋 HERY Assistantです。目的地、体験、写真、天体写真、マダガスカル旅行についてお手伝いします。", chatbotPlaceholder: "質問を入力してください...", chatbotTitle: "HERY Assistant", chatbotSub: "ローカルガイド • マダガスカル", quickQuestions: ["HERYとは？","Morondavaへ行きたい","写真家です","天体写真をしたい"]
  },

  de: {
    nav: ["Startseite","Über HERY","Expertise","Reiseziele","Fotografie","Astrofotografie","Naturschutz","Kultur","Services","Blog","FAQ","Kontakt"],
    heroKicker: "LOKALER GUIDE FÜR MADAGASKAR", heroTitle: <>Madagaskar entdecken<br/><em>Schritt für Schritt.</em></>, heroSub: "Begegnungen mit Wildtieren. Nachthimmel. Lebendige Landschaften.", heroText: "Eine echte Felderfahrung mit lokalem Guiding, Wildtierbeobachtung, Fotografie, Astrofotografie und Biodiversität.", explore: "Madagaskar entdecken", photo: "Fotografie ansehen", aboutKicker: "WER IST HERY?", aboutTitle: "Ein lokaler Guide. Echte Felderfahrung.", aboutText: "HERY ist ein lokaler Guide aus Morondava / Menabe mit Schwerpunkt auf Natur, Wildtieren, Fotografie, Astrofotografie, Biodiversität und Naturschutz.", profile: "Lokaler Guide & Begleitung", destTitle: "Reiseziele entdecken", destSub: "Lebendige Landschaften, einzigartige Tierwelt und echte lokale Begegnungen.", viewAll: "Alle Reiseziele", stories: "Feldnotizen & Guides", storiesSub: "Tipps, Entdeckungen und Geschichten aus Madagaskar.", read: "Artikel lesen", offer: "IHR NÄCHSTES ABENTEUER", offerTitle: "Madagaskar Schritt für Schritt entdecken.", offerText: "Eine persönliche, flexible und respektvolle Felderfahrung.", contact: "HERY kontaktieren", stats: ["Felderfahrung","Fotografie","Naturschutz","Lokaler Ansatz"], servicesTitle: "Services & Erlebnisse", faqTitle: "Häufige Fragen", contactTitle: "Ihre Madagaskar-Reise planen", contactSub: "Beschreiben Sie Ihr Projekt, Ihre Interessen und Ihren Reisezeitraum. HERY antwortet direkt.", name: "Vollständiger Name", email: "E-Mail", message: "Ihre Nachricht", send: "Nachricht senden", sending: "Wird gesendet...", sent: "Nachricht erfolgreich gesendet.", error: "Nachricht konnte nicht gesendet werden. Prüfen Sie EmailJS.", footer: "Begegnungen mit Wildtieren. Nachthimmel. Lebendige Landschaften.", astroTitle: "Astrofotografie", astroText: "Erleben Sie den Nachthimmel Madagaskars mit Milchstraße, Sternen, Nachtlandschaften und Langzeitbelichtungen.", conservationTitle: "Die Natur ist keine Kulisse. Sie ist die Geschichte.", cultureTitle: "Madagaskar jenseits der Postkarte erleben.", discover: "Entdecken", readArticle: "Artikel lesen", searchPlaceholder: "Morondava, Kirindy, Tsingy suchen...", chatbotWelcome: "Hallo 👋 Ich bin HERY Assistant. Ich helfe bei Reisezielen, Erlebnissen, Fotografie, Astrofotografie und Ihrer Madagaskar-Reise.", chatbotPlaceholder: "Stellen Sie Ihre Frage...", chatbotTitle: "HERY Assistant", chatbotSub: "Lokaler Guide • Madagaskar", quickQuestions: ["Wer ist HERY?","Ich möchte Morondava besuchen","Ich bin Fotograf","Ich möchte Astrofotografie"]
  },

  it: {
    nav: ["Home","Chi è HERY","Competenze","Destinazioni","Fotografia","Astrofotografia","Conservazione","Cultura","Servizi","Blog","FAQ","Contatti"],
    heroKicker: "GUIDA LOCALE DEL MADAGASCAR", heroTitle: <>Scopri il Madagascar<br/><em>passo dopo passo.</em></>, heroSub: "Incontri con la fauna. Cieli notturni. Paesaggi vivi.", heroText: "Un'esperienza sul campo che unisce guida locale, osservazione della fauna, fotografia, astrofotografia e biodiversità.", explore: "Esplora il Madagascar", photo: "Vedi la fotografia", aboutKicker: "CHI È HERY?", aboutTitle: "Una guida locale. Una vera esperienza sul campo.", aboutText: "HERY è una guida locale con base a Morondava / Menabe, specializzata in natura, fauna, fotografia, astrofotografia, biodiversità e conservazione.", profile: "Guida locale e accompagnamento", destTitle: "Destinazioni da scoprire", destSub: "Paesaggi vivi, fauna unica e incontri guidati con un autentico approccio locale.", viewAll: "Tutte le destinazioni", stories: "Diario di campo e guide", storiesSub: "Consigli, scoperte e storie dal Madagascar.", read: "Leggi gli articoli", offer: "LA TUA PROSSIMA AVVENTURA", offerTitle: "Scopri il Madagascar passo dopo passo.", offerText: "Un'esperienza personalizzata, flessibile e rispettosa del territorio.", contact: "Parla con HERY", stats: ["Esperienze sul campo","Fotografia","Conservazione","Approccio locale"], servicesTitle: "Servizi ed esperienze", faqTitle: "Domande frequenti", contactTitle: "Organizza la tua esperienza in Madagascar", contactSub: "Raccontaci il tuo progetto, i tuoi interessi e il periodo del viaggio. HERY risponderà direttamente.", name: "Nome completo", email: "Email", message: "Il tuo messaggio", send: "Invia messaggio", sending: "Invio...", sent: "Messaggio inviato con successo.", error: "Impossibile inviare il messaggio. Controlla EmailJS.", footer: "Incontri con la fauna. Cieli notturni. Paesaggi vivi.", astroTitle: "Astrofotografia", astroText: "Scopri il cielo notturno del Madagascar attraverso Via Lattea, stelle, paesaggi notturni e lunghe esposizioni.", conservationTitle: "La natura non è uno sfondo. È la storia.", cultureTitle: "Scopri il Madagascar oltre la cartolina.", discover: "Scopri", readArticle: "Leggi l'articolo", searchPlaceholder: "Cerca Morondava, Kirindy, Tsingy...", chatbotWelcome: "Ciao 👋 Sono HERY Assistant. Posso aiutarti con destinazioni, esperienze, fotografia, astrofotografia e viaggi in Madagascar.", chatbotPlaceholder: "Fai la tua domanda...", chatbotTitle: "HERY Assistant", chatbotSub: "Guida locale • Madagascar", quickQuestions: ["Chi è HERY?","Voglio visitare Morondava","Sono un fotografo","Voglio fare astrofotografia"]
  },

  es: {
    nav: ["Inicio","Sobre HERY","Especialidad","Destinos","Fotografía","Astrofotografía","Conservación","Cultura","Servicios","Blog","FAQ","Contacto"],
    heroKicker: "GUÍA LOCAL DE MADAGASCAR", heroTitle: <>Descubre Madagascar<br/><em>paso a paso.</em></>, heroSub: "Encuentros con la fauna. Cielos nocturnos. Paisajes vivos.", heroText: "Una experiencia de campo que combina guía local, observación de fauna, fotografía, astrofotografía y biodiversidad.", explore: "Explorar Madagascar", photo: "Ver fotografía", aboutKicker: "¿QUIÉN ES HERY?", aboutTitle: "Un guía local. Una verdadera experiencia de campo.", aboutText: "HERY es un guía local basado en Morondava / Menabe, especializado en naturaleza, fauna, fotografía, astrofotografía, biodiversidad y conservación.", profile: "Guía local y acompañamiento", destTitle: "Destinos por descubrir", destSub: "Paisajes vivos, fauna única y encuentros guiados con un auténtico enfoque local.", viewAll: "Ver todos los destinos", stories: "Notas de campo y guías", storiesSub: "Consejos, descubrimientos e historias de Madagascar.", read: "Leer artículos", offer: "TU PRÓXIMA AVENTURA", offerTitle: "Descubre Madagascar paso a paso.", offerText: "Una experiencia personalizada, flexible y respetuosa con el entorno.", contact: "Hablar con HERY", stats: ["Experiencias de campo","Fotografía","Conservación","Enfoque local"], servicesTitle: "Servicios y experiencias", faqTitle: "Preguntas frecuentes", contactTitle: "Planifica tu experiencia en Madagascar", contactSub: "Cuéntanos tu proyecto, intereses y fechas. HERY responderá directamente.", name: "Nombre completo", email: "Email", message: "Tu mensaje", send: "Enviar mensaje", sending: "Enviando...", sent: "Mensaje enviado correctamente.", error: "No se pudo enviar el mensaje. Revisa EmailJS.", footer: "Encuentros con la fauna. Cielos nocturnos. Paisajes vivos.", astroTitle: "Astrofotografía", astroText: "Descubre los cielos nocturnos de Madagascar: Vía Láctea, estrellas, paisajes nocturnos y largas exposiciones.", conservationTitle: "La naturaleza no es un decorado. Es la historia.", cultureTitle: "Conoce Madagascar más allá de la postal.", discover: "Descubrir", readArticle: "Leer artículo", searchPlaceholder: "Buscar Morondava, Kirindy, Tsingy...", chatbotWelcome: "Hola 👋 Soy HERY Assistant. Puedo ayudarte con destinos, experiencias, fotografía, astrofotografía y tu viaje a Madagascar.", chatbotPlaceholder: "Haz tu pregunta...", chatbotTitle: "HERY Assistant", chatbotSub: "Guía local • Madagascar", quickQuestions: ["¿Quién es HERY?","Quiero visitar Morondava","Soy fotógrafo","Quiero hacer astrofotografía"]
  },

};

/* =========================================================
   DESTINATIONS
========================================================= */

const destinations = [
  [
    "Morondava & Menabe",
    "Baobabs, culture, coast & western Madagascar",
    imgs.morondava,
    "01",
  ],
  [
    "Kirindy Forest",
    "Wildlife, forest and nocturnal experiences",
    imgs.kirindy,
    "02",
  ],
  [
    "Avenue of Baobabs",
    "Iconic landscapes and unforgettable golden hours",
    imgs.baobabs,
    "03",
  ],
  [
    "Tsingy de Bemaraha",
    "Geology, forest, adventure and wildlife",
    imgs.tsingy,
    "04",
  ],
  [
    "Manambolo River & Gorge",
    "River landscapes, pirogue and local life",
    imgs.manambolo,
    "05",
  ],
  [
    "Palmarium / Ankan'ny Nofy",
    "Eastern biodiversity and wildlife",
    imgs.palmarium,
    "06",
  ],
  [
    "Andasibe & Eastern Madagascar",
    "Rainforest, lemurs and biodiversity",
    imgs.andasibe,
    "07",
  ],
  [
    "Ankarafantsika",
    "Dry forest and wildlife",
    imgs.ankarafantsika,
    "08",
  ],
  [
    "Miandrivazo",
    "River journeys and landscapes",
    imgs.miandrivazo,
    "09",
  ],
  [
    "Nosy Be",
    "Island life and coastal discovery",
    imgs.nosybe,
    "10",
  ],
  [
    "Sainte Marie",
    "Coast, culture and nature",
    imgs.sainteMarie,
    "11",
  ],
  [
    "RN7",
    "Landscapes, villages and southern route",
    imgs.rn7,
    "12",
  ],
];


/* =========================================================
   SERVICES
========================================================= */

const services = [
  [
    "Private guiding",
    "Accompagnement personnalisé sur le terrain.",
    Compass,
  ],
  [
    "Wildlife trips",
    "Observation de la faune et découverte des habitats.",
    Leaf,
  ],
  [
    "Photography trips",
    "Sorties adaptées aux photographes et aux meilleurs moments de lumière.",
    Camera,
  ],
  [
    "Western Madagascar circuits",
    "Morondava, Menabe et grands paysages de l’Ouest.",
    Mountain,
  ],
  [
    "Local logistics",
    "Accompagnement et orientation pour les réalités du terrain.",
    MapPin,
  ],
  [
    "Custom experiences",
    "Une expérience construite selon vos envies.",
    Heart,
  ],
];


/* =========================================================
   BLOG
========================================================= */

const posts = [
  {
    id: "wildlife-kirindy",
    title: "Wildlife in Kirindy: observing without disturbing",
    image: imgs.wildlife,
    category: "Wildlife",
    duration: "4 min",
    intro:
      "Kirindy is one of the great natural areas of western Madagascar. A successful discovery begins with respectful observation of wildlife and its environment.",
    sections: [
      {
        title: "Observe before getting closer",
        text:
          "Wildlife observation requires time, patience and above all respect. The goal is not to disturb the animal, but to take the time to understand its behavior in its natural environment.",
      },
      {
        title: "A field-based experience",
        text:
          "In Kirindy, encounters with wildlife can become a true field experience. Every observation depends on the moment, the light, the season and the behavior of the animals.",
      },
      {
        title: "Photograph without disturbing",
        text:
          "Photography should always remain secondary to respect for the animal. Keeping a reasonable distance, avoiding sudden movements and allowing wildlife to behave naturally are essential.",
      },
      {
        title: "A responsible approach",
        text:
          "Discovering Kirindy also means understanding the importance of protecting natural habitats and respecting the places where Madagascar's species live.",
      },
    ],
  },

  {
    id: "photographier-baobabs",
    title: "Photographing the baobabs at golden hour",
    image: imgs.baobab,
    category: "Photography",
    duration: "5 min",
    intro:
      "Baobabs are among the most iconic landscapes of Madagascar. Golden-hour light reveals their silhouettes and the unique atmosphere of western Madagascar.",
    sections: [
      {
        title: "Choose the right moment",
        text:
          "Golden hour provides softer and warmer light. It helps create images with greater depth and dimension around the baobabs.",
      },
      {
        title: "Work with the landscape",
        text:
          "Photography is not only about photographing a tree. The sky, road, silhouettes, travelers and surrounding environment can also become part of the composition.",
      },
      {
        title: "Compose the image",
        text:
          "A strong composition gives scale to the landscape. Road lines and baobab silhouettes can naturally guide the viewer's eye toward the main subject.",
      },
      {
        title: "Take your time",
        text:
          "The best images can appear within a few minutes as the light changes. Staying on location and observing the evolution of the landscape can therefore be very rewarding.",
      },
    ],
  },

  {
    id: "astrophotographie-madagascar",
    title: "Astrophotography in Madagascar: nights and landscapes",
    image: imgs.night,
    category: "Astrophotography",
    duration: "6 min",
    intro:
      "Madagascar's nights offer another way to discover its landscapes. Astrophotography combines the starry sky with the shapes and silhouettes of the landscape.",
    sections: [
      {
        title: "Discover the night sky",
        text:
          "Away from strongly illuminated areas, the night sky can become a major part of the experience. Stars and the Milky Way completely transform the perception of the landscape.",
      },
      {
        title: "Landscape and sky",
        text:
          "Successful night photography often looks for a balance between the foreground and the sky. A baobab, a forest or a mountain can become a strong silhouette beneath the stars.",
      },
      {
        title: "Patience is essential",
        text:
          "Astrophotography takes time. You need to wait for the right moment, check the composition and adapt the camera settings to the available light.",
      },
      {
        title: "Another way to experience Madagascar",
        text:
          "Observing the sky during a journey allows you to discover Madagascar from another perspective. Night landscapes, silence, stars and long exposures create an experience different from a classic journey.",
      },
    ],
  },

  {
    id: "conservation-terrain",
    title: "Understanding conservation in the field",
    image: imgs.forest,
    category: "Conservation",
    duration: "7 min",
    intro:
      "Conservation is not limited to protecting a space on a map. It also involves communities, habitats, biodiversity and the way we discover natural environments.",
    sections: [
      {
        title: "Conservation in the field",
        text:
          "Understanding conservation requires observing local realities. Forests, species and communities are connected within the same environment.",
      },
      {
        title: "Biodiversity and habitats",
        text:
          "Protecting biodiversity includes preserving natural habitats. Every forest has its own characteristics and shelters species adapted to that environment.",
      },
      {
        title: "A respectful approach",
        text:
          "During an exploration, responsible behavior helps reduce our impact on natural areas. Respecting places and wildlife is an essential part of the experience.",
      },
      {
        title: "Discover and raise awareness",
        text:
          "A field experience can also help people better understand conservation challenges and develop a more conscious relationship with Madagascar's landscapes and biodiversity.",
      },
    ],
  },
];



/* =========================================================
   FAQ
========================================================= */

const faqs = [
  [
    "Qui est HERY ?",
    "HERY est un guide local basé à Morondava / Menabe, avec une approche terrain centrée sur la nature, la photographie, la biodiversité et la conservation.",
  ],
  [
    "Quelles expériences sont disponibles ?",
    "Guidage privé, wildlife trips, photographie, circuits dans l’Ouest, logistique locale et expériences personnalisées.",
  ],
  [
    "Les photographes peuvent-ils participer ?",
    "Oui. L’approche comprend des sorties orientées photographie, golden hours, vie nocturne et accompagnement des photographes.",
  ],
  [
    "Puis-je demander un voyage personnalisé ?",
    "Oui. Vous pouvez décrire votre projet via le formulaire de contact et HERY pourra étudier une expérience personnalisée.",
  ],
  [
    "Quelle est l’approche de HERY concernant la conservation ?",
    "Le projet met en avant la conservation communautaire, la sensibilisation, la restauration forestière et une approche respectueuse de la faune.",
  ],
];


/* =========================================================
   REVEAL ANIMATION
========================================================= */

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}


/* =========================================================
   APP
========================================================= */

function App() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [lang, setLang] = useState(
    localStorage.getItem("heryLang") || "en"
  );

  const [menu, setMenu] = useState(false);
  const [chat, setChat] = useState(false);
  const [search, setSearch] = useState("");

  const t = copy[lang] || copy.en;

  useReveal();

  useEffect(() => {
    document.documentElement.dataset.theme = dark
      ? "dark"
      : "light";

    localStorage.setItem(
      "theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("heryLang", lang);
    document.documentElement.lang =
      lang === "zh" ? "zh-CN" : lang === "ja" ? "ja" : lang;

    document.documentElement.classList.toggle(
      "dark-mode",
      dark
    );
  }, [lang, dark]);

  const go = (id) => {
    setMenu(false);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return destinations;

    return destinations.filter((destination) =>
      destination[0]
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  return (
    <div className="app">
      <Header
        t={t}
        lang={lang}
        setLang={setLang}
        dark={dark}
        setDark={setDark}
        menu={menu}
        setMenu={setMenu}
        go={go}
      />

      <main>
        <Hero t={t} go={go} />

        <TrustStrip t={t} />

        <About
          t={t}
          go={go}
        />

        <Expertise />

        {/* DESTINATIONS */}
        <section
          id="destinations"
          className="section section-soft"
        >
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">
                EXPLORE MADAGASCAR
              </span>

              <h2>{t.destTitle}</h2>

              <p>{t.destSub}</p>
            </div>

            <button
              className="text-btn"
              onClick={() => {
                setSearch("");
              }}
            >
              {t.viewAll}

              <ArrowRight size={16} />
            </button>
          </div>

          <div className="search-row reveal">
            <div className="searchbox">
              <Search size={18} />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder={t.searchPlaceholder}
              />

              {search && (
                <button
                  className="search-clear"
                  onClick={() => setSearch("")}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="destination-grid">
            {filtered.length > 0 ? (
              filtered.map((destination, index) => (
                <Destination
                  key={destination[0]}
                  d={destination}
                  i={index}
                  t={t}
                  go={go}
                />
              ))
            ) : (
              <div className="empty-search">
                <Search size={28} />

                <h3>
                  Aucune destination trouvée
                </h3>

                <p>
                  Essayez Morondava, Kirindy, Tsingy
                  ou Nosy Be.
                </p>
              </div>
            )}
          </div>
        </section>

        <PhotoSection
          t={t}
          go={go}
        />

        <AstroSection t={t} />

        <Conservation t={t} />

        <Culture t={t} />

        <Services
          t={t}
          go={go}
        />

        <Blog
          t={t}
        />

        <Offer
          t={t}
          go={go}
        />

        <FAQ
          t={t}
        />

        <References />

        <Contact
          t={t}
          lang={lang}
        />
      </main>

      <Footer
        t={t}
        go={go}
      />

      <Chat
        open={chat}
        setOpen={setChat}
        lang={lang}
        t={t}
      />
    </div>
  );
}


/* =========================================================
   HEADER
========================================================= */

function Header({
  t,
  lang,
  setLang,
  dark,
  setDark,
  menu,
  setMenu,
  go,
}) {
  const ids = [
    "home",
    "about",
    "expertise",
    "destinations",
    "photography",
    "astrophotography",
    "conservation",
    "culture",
    "services",
    "blog",
    "faq",
    "contact",
  ];

  return (
    <header className="header">
      <div className="nav-inner">
        <button
          className="brand"
          onClick={() => go("home")}
        >
          <span className="brand-mark">
            H
          </span>

          <span>
            <strong>HERY</strong>

            <small>
              MADAGASCAR LOCAL GUIDE
            </small>
          </span>
        </button>

        <nav
          className={
            menu
              ? "nav open"
              : "nav"
          }
        >
          {t.nav.map((label, index) => (
            <button
              key={label}
              onClick={() =>
                go(ids[index])
              }
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <select
            value={lang}
            onChange={(event) =>
              setLang(event.target.value)
            }
            aria-label="Language"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="mg">MG</option>
            <option value="ru">RU</option>
            <option value="ja">JA</option>
            <option value="de">DE</option>
            <option value="it">IT</option>
            <option value="es">ES</option>
            <option value="zh">中文</option>
          </select>

          <button
            className="icon-btn"
            onClick={() =>
              setDark(!dark)
            }
            aria-label="Changer le thème"
          >
            {dark ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          <button
            className="icon-btn menu-btn"
            onClick={() =>
              setMenu(!menu)
            }
            aria-label="Menu"
          >
            {menu ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>

          <button
            className="nav-contact"
            onClick={() =>
              go("contact")
            }
          >
            Contact

            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}


/* =========================================================
   HERO
========================================================= */

function Hero({ t, go }) {
  return (
    <section
      id="home"
      className="hero"
    >
      <div
        className="hero-bg"
        style={{
          backgroundImage:
            `url(${imgs.hero})`,
        }}
      />

      <div className="hero-overlay" />

      <div className="hero-gradient" />

      <div className="hero-decor">
        <Sparkles size={32} />
      </div>

      <div className="hero-content reveal">
        <span className="eyebrow light">
          {t.heroKicker}
        </span>

        <h1>
          {t.heroTitle}
        </h1>

        <h3>
          {t.heroSub}
        </h3>

        <p>
          {t.heroText}
        </p>

        <div className="hero-buttons">
          <button
            className="btn btn-gold"
            onClick={() =>
              go("destinations")
            }
          >
            {t.explore}

            <ArrowRight size={17} />
          </button>

          <button
            className="btn btn-outline"
            onClick={() =>
              go("photography")
            }
          >
            {t.photo}

            <Play size={15} />
          </button>
        </div>
      </div>

      <div className="scroll-cue">
        <span />
        Scroll
      </div>

      <div className="hero-card reveal">
        <div>
          <MapPin />

          <small>
            Where to?
          </small>

          <b>
            Morondava / Menabe
          </b>
        </div>

        <div>
          <Camera />

          <small>
            Experience
          </small>

          <b>
            Wildlife & Photo
          </b>
        </div>

        <div>
          <Moon />

          <small>
            Night
          </small>

          <b>
            Astrophotography
          </b>
        </div>

        <button
          onClick={() =>
            go("contact")
          }
        >
          Start

          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}


/* =========================================================
   TRUST STRIP
========================================================= */

function TrustStrip({ t }) {
  const icons = [
    Leaf,
    Camera,
    ShieldCheck,
    Heart,
  ];

  const subtitles = [
    "Curated experiences",
    "Photography friendly",
    "Respectful approach",
    "Local knowledge",
  ];

  return (
    <section className="trust">
      {t.stats.map((label, index) => {
        const Icon = icons[index];

        return (
          <div
            key={label}
          >
            <Icon />

            <b>
              {label}
            </b>

            <span>
              {subtitles[index]}
            </span>
          </div>
        );
      })}
    </section>
  );
}


/* =========================================================
   ABOUT
========================================================= */

function About({ t, go }) {
  return (
    <section
      id="about"
      className="section about"
    >
      <div className="about-photo reveal">
        <img
          src={imgs.profile}
          alt="HERY local guide"
        />

        <div className="profile-badge">
          <span className="brand-mark">
            H
          </span>

          <div>
            <strong>
              HERY
            </strong>

            <small>
              {t.profile}
            </small>
          </div>
        </div>
      </div>

      <div className="about-copy reveal">
        <span className="eyebrow">
          {t.aboutKicker}
        </span>

        <h2>
          {t.aboutTitle}
        </h2>

        <p>
          {t.aboutText}
        </p>

        <div className="mini-points">
          <span>
            <MapPin />
            Morondava / Menabe
          </span>

          <span>
            <Camera />
            Photography
          </span>

          <span>
            <Leaf />
            Biodiversity
          </span>
        </div>

        <button
          className="btn btn-dark"
          onClick={() =>
            go("expertise")
          }
        >
          Discover HERY

          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}


/* =========================================================
   EXPERTISE
========================================================= */

function Expertise() {
  const pillars = [
    [
      "Wildlife",
      "Wildlife observation, birds, nocturnal life and respectful encounters.",
      Leaf,
    ],
    [
      "Photography",
      "Golden hours, wildlife, birds and support for photographers.",
      Camera,
    ],
    [
      "Astrophotography",
      "Milky Way, stars, night landscapes and long exposures.",
      Moon,
    ],
    [
      "Conservation",
      "Community-based conservation, forest restoration and awareness.",
      ShieldCheck,
    ],
    [
      "Culture",
      "Sakalava heritage, coastal life, fady, respect and rural Madagascar.",
      Heart,
    ],
  ];

  return (
    <section
      id="expertise"
      className="section expertise"
    >
      <div className="section-head reveal">
        <div>
          <span className="eyebrow">
            FIELD-BASED EXPERTISE
          </span>

          <h2>
            Five pillars,
            <br />
            one local perspective.
          </h2>

          <p>
            Une approche centrée sur
            l’expérience réelle du terrain.
          </p>
        </div>
      </div>

      <div className="pillar-grid">
        {pillars.map(
          ([title, text, Icon], index) => (
            <motion.article
              className="pillar reveal"
              whileHover={{
                y: -10,
                scale: 1.015,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
              }}
              key={title}
            >
              <span className="num">
                0{index + 1}
              </span>

              <Icon />

              <h3>
                {title}
              </h3>

              <p>
                {text}
              </p>

              <div className="pillar-line" />
            </motion.article>
          )
        )}
      </div>
    </section>
  );
}


/* =========================================================
   DESTINATION CARD
========================================================= */

function Destination({
  d,
  i,
  t,
  go,
}) {
  return (
    <motion.article
      className="destination-card reveal"
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        delay: (i % 4) * 0.07,
      }}
      whileHover={{
        y: -8,
      }}
    >
      <div className="dest-img">
        <img
          src={d[2]}
          alt={d[0]}
          loading="lazy"
        />

        <div className="dest-overlay" />

        <span className="dest-num">
          {d[3]}
        </span>

        <span className="rating">
          <Star
            size={13}
            fill="currentColor"
          />
          4.9
        </span>

        <span className="dest-hover">
          {t.discover}
          <ArrowRight size={16} />
        </span>
      </div>

      <div className="dest-body">
        <span>
          Madagascar
        </span>

        <h3>
          {d[0]}
        </h3>

        <p>
          {d[1]}
        </p>

        <button
          onClick={() =>
            go("contact")
          }
        >
          {t.discover}

          <ArrowRight size={15} />
        </button>
      </div>
    </motion.article>
  );
}


/* =========================================================
   PHOTOGRAPHY
========================================================= */

function PhotoSection({ t }) {
  const photos = [
    {
      image: imgs.wildlife,
      title: "Wildlife Madagascar",
      label: "WILDLIFE",
      location: "Wildlife · Madagascar",
      description: "Discover Madagascar's unique wildlife through respectful observation in its natural environment. From lemurs to endemic species, every encounter is an opportunity to understand and protect biodiversity.",
      description: "Wildlife encounters and responsible observation in Madagascar.",
    },
    {
      image: imgs.baobab,
      title: "Baobabs Madagascar",
      label: "BAOBABS",
      location: "Golden hour · Western Madagascar",
      description: "Experience the iconic baobab landscapes of Madagascar, especially during golden hour when warm light reveals the extraordinary shapes and silhouettes of these ancient trees.",
      description: "Iconic landscapes, golden light and the Avenue of Baobabs.",
    },
    {
      image: imgs.forest,
      title: "Madagascar Forest",
      label: "FOREST",
      location: "Biodiversity · Eastern Madagascar",
      description: "Explore Madagascar's forests and discover remarkable biodiversity, endemic species and landscapes shaped by nature and local communities.",
      description: "Biodiversity, forests and immersive field experiences.",
    },
    {
      image: imgs.coast,
      title: "Madagascar Coast",
      label: "COAST",
      location: "Island life · Madagascar",
      description: "Discover Madagascar's tropical coastline, where beaches, turquoise waters, forests and local life create unforgettable landscapes and authentic experiences.",
      description: "Coastal landscapes, tropical atmosphere and island life.",
    },
  ];

  const [selected, setSelected] = useState(null);

  const openPhoto = (index) => {
    setSelected(index);
    document.body.style.overflow = "hidden";
  };

  const closePhoto = () => {
    setSelected(null);
    document.body.style.overflow = "";
  };

  const nextPhoto = () => {
    setSelected((current) =>
      current === null ? 0 : (current + 1) % photos.length
    );
  };

  const previousPhoto = () => {
    setSelected((current) =>
      current === null
        ? 0
        : (current - 1 + photos.length) % photos.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selected === null) return;

      if (event.key === "Escape") closePhoto();
      if (event.key === "ArrowRight") nextPhoto();
      if (event.key === "ArrowLeft") previousPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      <section id="photography" className="section gallery-section">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">PHOTOGRAPHY</span>

            <h2>
              {t.photoTitle || "Photography in the field"}
            </h2>

            <p>
              {t.photoText ||
                "Wildlife, birds, golden hours, night scenes and photography experiences in Madagascar."}
            </p>
          </div>

          <button
            type="button"
            className="text-btn photography-main-btn"
            onClick={() => openPhoto(0)}
          >
            {t.photo || "View photography"}
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="premium-photo-grid">
          {photos.map((photo, index) => (
            <motion.article
              key={photo.title}
              className="premium-photo-card reveal"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8 }}
              onClick={() => openPhoto(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openPhoto(index);
                }
              }}
            >
              <div className="premium-photo-image">
                <img
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                />

                <div className="premium-photo-gradient" />

                <div className="premium-photo-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="premium-photo-label">
                  {photo.label}
                </div>

                <div className="premium-photo-content">
                  <span className="premium-photo-kicker">
                    HERY · MADAGASCAR
                  </span>

                  <h3>{photo.title}</h3>

                  <span className="premium-photo-description">
                    {photo.description}
                  </span>

                  <button
                    type="button"
                    className="premium-photo-action"
                    onClick={(event) => {
                      event.stopPropagation();
                      openPhoto(index);
                    }}
                  >
                    {t.photo || "View photography"}
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {selected !== null && (
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photos[selected].title}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closePhoto();
            }
          }}
        >
          <div className="photo-lightbox-inner">
            <button
              type="button"
              className="photo-lightbox-close"
              onClick={closePhoto}
              aria-label="Close"
            >
              ×
            </button>

            <div className="photo-lightbox-image-wrap">
              <img
                src={photos[selected].image}
                alt={photos[selected].title}
                className="photo-lightbox-image"
              />
            </div>

            <div className="photo-lightbox-info">
              <div className="photo-lightbox-meta">
                <span className="photo-lightbox-label">
                  {photos[selected].label}
                </span>

                <span className="photo-lightbox-count">
                  {String(selected + 1).padStart(2, "0")} /{" "}
                  {String(photos.length).padStart(2, "0")}
                </span>
              </div>

              <h3>{photos[selected].title}</h3>

              <span className="photo-lightbox-location">
                {photos[selected].location}
              </span>

              <p>{photos[selected].description}</p>

              <span className="photo-lightbox-brand">
                HERY · MADAGASCAR LOCAL GUIDE
              </span>
            </div>

            <div className="photo-lightbox-controls">
              <button
                type="button"
                className="photo-lightbox-nav"
                onClick={previousPhoto}
                aria-label="Previous photo"
              >
                ← <span>Previous</span>
              </button>

              <button
                type="button"
                className="photo-lightbox-nav"
                onClick={nextPhoto}
                aria-label="Next photo"
              >
                <span>Next</span> →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AstroSection({ t }) {
  return (
    <section
      id="astrophotography"
      className="split dark-section"
    >
      <div
        className="split-image"
        style={{
          backgroundImage:
            `url(${imgs.night})`,
        }}
      >
        <div className="image-shine" />
      </div>

      <div className="split-copy reveal">
        <span className="eyebrow light">
          NIGHT SKIES
        </span>

        <h2>
          {t.astroTitle}
        </h2>

        <p>
          {t.astroText}
        </p>

        <div className="feature-list">
          <span>
            <Moon />
            Milky Way
          </span>

          <span>
            <Star />
            Long exposures
          </span>

          <span>
            <Camera />
            Night photography
          </span>

          <span>
            <Sparkles />
            Baobab nightscapes
          </span>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   CONSERVATION
========================================================= */

function Conservation({ t }) {
  return (
    <section
      id="conservation"
      className="section conservation"
    >
      <div className="conservation-copy reveal">
        <span className="eyebrow">
          CONSERVATION
        </span>

        <h2>
          {t.conservationTitle}
        </h2>

        <p>
          Approche orientée biodiversité
          et conservation communautaire,
          avec sensibilisation,
          restauration forestière et
          expérience de terrain.
        </p>

        <div className="conservation-card">
          <ShieldCheck />

          <div>
            <b>
              Vohibola Avotra
            </b>

            <span>
              Pilot aye-aye conservation
              & forest restoration
            </span>
          </div>
        </div>
      </div>

      <div className="conservation-image reveal">
        <img
          src={imgs.forest}
          alt="Madagascar forest"
          loading="lazy"
        />

        <div className="floating-stat">
          <TreePine />

          <strong>
            Respect
          </strong>

          <span>
            wildlife & communities
          </span>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   CULTURE
========================================================= */

function Culture({ t }) {
  return (
    <section
      id="culture"
      className="section culture"
    >
      <div className="culture-image reveal">
        <img
          src={imgs.culture}
          alt="Madagascar culture and landscape"
          loading="lazy"
        />
      </div>

      <div className="culture-copy reveal">
        <span className="eyebrow">
          CULTURE
        </span>

        <h2>
          {t.cultureTitle}
        </h2>

        <p>
          Patrimoine Sakalava, vie côtière,
          fady & respect, vie rurale et
          changements environnementaux.
        </p>

        <div className="quote">
          “Personal. Flexible. Field-based.
          Educational. Community-aware.”
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   SERVICES
========================================================= */

function Services({ t, go }) {
  return (
    <section
      id="services"
      className="section section-soft"
    >
      <div className="section-head reveal">
        <div>
          <span className="eyebrow">
            HERY EXPERIENCE
          </span>

          <h2>
            {t.servicesTitle}
          </h2>

          <p>
            Des expériences conçues autour
            du terrain et de vos centres
            d’intérêt.
          </p>
        </div>
      </div>

      <div className="service-grid">
        {services.map(
          ([title, text, Icon], index) => (
            <motion.article
              className="service-card reveal"
              whileHover={{
                y: -9,
              }}
              key={title}
            >
              <div className="service-number">
                0{index + 1}
              </div>

              <div className="service-icon">
                <Icon />
              </div>

              <h3>
                {title}
              </h3>

              <p>
                {text}
              </p>

              <button
                onClick={() =>
                  go("contact")
                }
              >
                {t.discover}

                <ArrowRight size={15} />
              </button>
            </motion.article>
          )
        )}
      </div>
    </section>
  );
}


/* =========================================================
   BLOG
========================================================= */

function Blog({ t }) {
  const [selectedPost, setSelectedPost] = useState(null);

  /* =======================================================
     OPEN ARTICLE
  ======================================================= */

  const openArticle = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = "hidden";
  };

  /* =======================================================
     CLOSE ARTICLE
  ======================================================= */

  const closeArticle = () => {
    setSelectedPost(null);
    document.body.style.overflow = "";
  };

  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeArticle();
      }
    };

    if (selectedPost) {
      window.addEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [selectedPost]);

  return (
    <>
      {/* ===================================================
          BLOG LIST
      =================================================== */}

      <section
        id="blog"
        className="section blog"
      >
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">
              FIELD NOTES
            </span>

            <h2>
              {t.stories}
            </h2>

            <p>
              {t.storiesSub}
            </p>
          </div>

          <button
            type="button"
            className="text-btn"
            onClick={() =>
              document
                .getElementById("blog")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            {t.read}

            <ArrowRight size={16} />
          </button>
        </div>

        <div className="blog-grid">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              className={
                index === 0
                  ? "post featured reveal"
                  : "post reveal"
              }
              whileHover={{
                y: -8,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              {/* CARD BUTTON */}

              <button
                type="button"
                className="post-click"
                onClick={() =>
                  openArticle(post)
                }
                aria-label={`Open article: ${post.title}`}
              >
                {/* IMAGE */}

                <div className="post-image">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                  />

                  <div className="post-image-shine" />

                  <span className="post-category">
                    {post.category}
                  </span>
                </div>

                {/* CONTENT */}

                <div className="post-body">
                  <span className="post-meta">
                    <Clock size={14} />

                    {post.duration} read
                  </span>

                  <h3>
                    {post.title}
                  </h3>

                  <span className="post-read">
                    {t.readArticle}

                    <ArrowRight size={14} />
                  </span>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </section>


      {/* ===================================================
          ARTICLE READER
      =================================================== */}

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="article-modal"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >

            {/* BACKDROP */}

            <motion.div
              className="article-backdrop"
              onClick={closeArticle}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            />


            {/* ARTICLE */}

            <motion.article
              className="article-reader"
              initial={{
                opacity: 0,
                y: 45,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 35,
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 23,
              }}
            >

              {/* =================================================
                  ARTICLE TOP BAR
              ================================================= */}

              <div className="article-topbar">

                <button
                  type="button"
                  className="article-back"
                  onClick={closeArticle}
                >
                  <ArrowRight
                    size={17}
                    className="back-arrow"
                  />

                  <span>
                    Back to articles
                  </span>
                </button>


                <button
                  type="button"
                  className="article-close"
                  onClick={closeArticle}
                  aria-label="Close article"
                >
                  <X size={20} />
                </button>

              </div>


              {/* =================================================
                  ARTICLE HERO
              ================================================= */}

              <div className="article-hero">

                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                />

                <div className="article-hero-overlay" />

                <div className="article-hero-content">

                  <span className="article-category">
                    {selectedPost.category}
                  </span>

                  <h1>
                    {selectedPost.title}
                  </h1>

                  <div className="article-meta">

                    <Clock size={15} />

                    <span>
                      {selectedPost.duration} read
                    </span>

                    <span className="article-dot">
                      •
                    </span>

                    <span>
                      HERY · Madagascar
                    </span>

                  </div>

                </div>

              </div>


              {/* =================================================
                  ARTICLE CONTENT
              ================================================= */}

              <div className="article-content">

                {/* INTRO */}

                <p className="article-intro">
                  {selectedPost.intro}
                </p>


                {/* SECTIONS */}

                {selectedPost.sections?.map(
                  (section, index) => (
                    <motion.section
                      key={section.title}
                      className="article-section"
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.15,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.05,
                      }}
                    >

                      <div className="article-section-number">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>


                      <div>

                        <h2>
                          {section.title}
                        </h2>

                        <p>
                          {section.text}
                        </p>

                      </div>

                    </motion.section>
                  )
                )}


                {/* =================================================
                    ARTICLE FOOTER
                ================================================= */}

                <div className="article-footer">

                  <div>

                    <span>
                      HERY · Madagascar Local Guide
                    </span>

                    <strong>
                      Wildlife • Photography •
                      Astrophotography • Conservation
                    </strong>

                  </div>


                  <button
                    type="button"
                    className="article-back-bottom"
                    onClick={closeArticle}
                  >

                    <ArrowRight
                      size={16}
                      className="back-arrow"
                    />

                    Back to articles

                  </button>

                </div>

              </div>

            </motion.article>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


/* =========================================================
   OFFER
========================================================= */

function Offer({ t, go }) {
  return (
    <section className="offer reveal">
      <div
        className="offer-image"
        style={{
          backgroundImage:
            `url(${imgs.baobab})`,
        }}
      />

      <div className="offer-overlay" />

      <div className="offer-copy">
        <span className="eyebrow light">
          {t.offer}
        </span>

        <h2>
          {t.offerTitle}
        </h2>

        <p>
          {t.offerText}
        </p>

        <button
          className="btn btn-gold"
          onClick={() =>
            go("contact")
          }
        >
          {t.contact}

          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}


/* =========================================================
   FAQ
========================================================= */

function FAQ({ t }) {
  const [open, setOpen] =
    useState(0);

  return (
    <section
      id="faq"
      className="section faq"
    >
      <div className="section-head reveal">
        <div>
          <span className="eyebrow">
            FAQ
          </span>

          <h2>
            {t.faqTitle}
          </h2>
        </div>
      </div>

      <div className="faq-list">
        {faqs.map(
          ([question, answer], index) => (
            <div
              className={
                open === index
                  ? "faq-item open"
                  : "faq-item"
              }
              key={question}
            >
              <button
                onClick={() =>
                  setOpen(
                    open === index
                      ? -1
                      : index
                  )
                }
              >
                <span>
                  {question}
                </span>

                <ChevronDown
                  size={19}
                />
              </button>

              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                  >
                    <p>
                      {answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        )}
      </div>
    </section>
  );
}


/* =========================================================
   REFERENCES
========================================================= */

function References() {
  return (
    <section
      id="references"
      className="section references"
    >
      <div className="reference-card reveal">
        <span className="eyebrow">
          REFERENCES
        </span>

        <h2>
          Built on field experience.
        </h2>

        <p>
          Références mentionnées dans
          le portfolio : TripAdvisor
          Madagascar Local Tours,
          TripAdvisor Driver/Guide in
          Morondava et Instagram
          @mdg_tour.
        </p>

        <div className="ref-links">
          <a
            href="https://www.tripadvisor.com/"
            target="_blank"
            rel="noreferrer"
          >
            TripAdvisor

            <ArrowRight size={15} />
          </a>

          <a
            href="https://www.instagram.com/mdg_tour/"
            target="_blank"
            rel="noreferrer"
          >
            <Globe2 size={16} />

            @mdg_tour

            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   CONTACT EMAILJS
========================================================= */

function Contact({ t, lang }) {
  const [form, setForm] =
    useState({
      name: "",
      email: "",
      message: "",
    });

  const [status, setStatus] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const whatsappLanguages = {
    en: {
      title: "Chat with HERY",
      description: "Let's plan your Madagascar experience.",
      message: "Hello HERY! I'd like to know more about your Madagascar experiences.",
    },
    fr: {
      title: "Discuter avec HERY",
      description: "Préparons ensemble votre voyage à Madagascar.",
      message: "Bonjour HERY ! Je souhaite en savoir plus sur vos expériences à Madagascar.",
    },
    mg: {
      title: "Miresaha amin'i HERY",
      description: "Andao hiara-handamina ny dianao eto Madagasikara.",
      message: "Salama HERY! Te hahalala bebe kokoa momba ny fitsangatsanganana eto Madagasikara aho.",
    },
    ru: {
      title: "Написать HERY",
      description: "Спланируем ваше путешествие по Мадагаскару.",
      message: "Здравствуйте, HERY! Я хотел(а) бы узнать больше о поездках по Мадагаскару.",
    },
    ja: {
      title: "HERYに相談する",
      description: "マダガスカル旅行を一緒に計画しましょう。",
      message: "こんにちは、HERY！マダガスカルでの体験について詳しく知りたいです。",
    },
    de: {
      title: "Mit HERY chatten",
      description: "Planen wir Ihre Madagaskar-Reise.",
      message: "Hallo HERY! Ich möchte mehr über Ihre Madagaskar-Erlebnisse erfahren.",
    },
    it: {
      title: "Scrivi a HERY",
      description: "Organizziamo il tuo viaggio in Madagascar.",
      message: "Ciao HERY! Vorrei saperne di più sulle esperienze in Madagascar.",
    },
    es: {
      title: "Habla con HERY",
      description: "Organicemos tu viaje a Madagascar.",
      message: "¡Hola HERY! Me gustaría saber más sobre las experiencias en Madagascar.",
    },
    zh: {
      title: "联系 HERY",
      description: "一起规划您的马达加斯加之旅。",
      message: "您好 HERY！我想了解更多马达加斯加旅行体验。",
    },
  };
  const whatsappText = whatsappLanguages[lang] || whatsappLanguages.en;

  async function submit(event) {
    event.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      if (
        !EMAILJS_SERVICE_ID ||
        !EMAILJS_TEMPLATE_ID ||
        !EMAILJS_PUBLIC_KEY ||
        EMAILJS_SERVICE_ID.includes("xxxxx")
      ) {
        throw new Error(
          t.error
        );
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus(
        t.sent
      );

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "EmailJS error:",
        error
      );

      setStatus(
        error?.text ||
          error?.message ||
          t.error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="section contact"
    >
      <div className="contact-info reveal">
        <span className="eyebrow">
          CONTACT
        </span>

        <h2>
          {t.contactTitle}
        </h2>

        <p>
          {t.contactSub}
        </p>

        <div className="contact-lines">
          <a
            href="https://wa.me/261345808504"
            target="_blank"
            rel="noreferrer"
          >
            <Phone />

            +261 34 58 085 04
          </a>

          <a
            href="mailto:rajaofetaheryhenintsoa@yahoo.fr"
          >
            <Mail />

            rajaofetaheryhenintsoa@yahoo.fr
          </a>

          <span>
            <MapPin />

            Morondava / Menabe,
            Madagascar
          </span>

          <a
            href="https://www.instagram.com/mdg_tour/"
            target="_blank"
            rel="noreferrer"
          >
            <Globe2 />

            @mdg_tour
          </a>
        </div>

        <div className="contact-direct">
          <a
            className="whatsapp-card"
            href={`https://wa.me/261345808504?text=${encodeURIComponent(whatsappText.message)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="whatsapp-card-icon" aria-hidden="true">
              <MessageCircle size={25} strokeWidth={2.1} />
            </span>
            <span className="whatsapp-card-copy">
              <span className="whatsapp-card-kicker">WHATSAPP · HERY</span>
              <strong>{whatsappText.title}</strong>
              <span className="whatsapp-card-description">
                {whatsappText.description}
              </span>
            </span>
            <span className="whatsapp-card-arrow" aria-hidden="true">
              <ArrowRight size={19} />
            </span>
          </a>
        </div>
      </div>

      <form
        className="contact-form reveal"
        onSubmit={submit}
      >
        <label>
          {t.name}

          <input
            required
            value={form.name}
            onChange={(event) =>
              setForm({
                ...form,
                name: event.target.value,
              })
            }
            placeholder="Votre nom"
          />
        </label>

        <label>
          {t.email}

          <input
            required
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm({
                ...form,
                email: event.target.value,
              })
            }
            placeholder="vous@email.com"
          />
        </label>

        <label>
          {t.message}

          <textarea
            required
            rows="6"
            value={form.message}
            onChange={(event) =>
              setForm({
                ...form,
                message:
                  event.target.value,
              })
            }
            placeholder="Parlez-nous de votre projet..."
          />
        </label>

        <button
          className="btn btn-dark"
          disabled={loading}
          type="submit"
        >
          {loading
            ? t.sending
            : t.send}

          <Send size={16} />
        </button>

        {status && (
          <div
            className={
              status === t.sent
                ? "form-status success"
                : "form-status"
            }
          >
            {status === t.sent && (
              <CheckCircle2
                size={17}
              />
            )}

            {status}
          </div>
        )}
      </form>
    </section>
  );
}


/* =========================================================
   FOOTER
========================================================= */

function Footer({ t, go }) {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <button
            className="brand footer-brand"
            onClick={() =>
              go("home")
            }
          >
            <span className="brand-mark">
              H
            </span>

            <span>
              <strong>
                HERY
              </strong>

              <small>
                MADAGASCAR LOCAL GUIDE
              </small>
            </span>
          </button>

          <p>
            {t.footer}
          </p>
        </div>

        <div>
          <b>
            Explore
          </b>

          <button
            onClick={() =>
              go("about")
            }
          >
            About
          </button>

          <button
            onClick={() =>
              go("destinations")
            }
          >
            Destinations
          </button>

          <button
            onClick={() =>
              go("photography")
            }
          >
            Photography
          </button>

          <button
            onClick={() =>
              go("blog")
            }
          >
            Blog
          </button>
        </div>

        <div>
          <b>
            Services
          </b>

          <button
            onClick={() =>
              go("services")
            }
          >
            Guiding
          </button>

          <button
            onClick={() =>
              go("services")
            }
          >
            Wildlife trips
          </button>

          <button
            onClick={() =>
              go("services")
            }
          >
            Photography
          </button>

          <button
            onClick={() =>
              go("contact")
            }
          >
            Contact
          </button>
        </div>

        <div>
          <b>
            Contact
          </b>

          <a
            href="https://wa.me/261345808504"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>

          <a href="mailto:rajaofetaheryhenintsoa@yahoo.fr">
            Email
          </a>

          <a
            href="https://www.instagram.com/mdg_tour/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © 2026 HERY.
          All rights reserved.
        </span>

        <span>
          Baobabs Footprints ·
          Morondava / Menabe
        </span>

        <span className="socials">
          <a
            href="https://www.instagram.com/mdg_tour/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <Globe2 size={16} />
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <Globe2 size={16} />
          </a>
        </span>
      </div>
    </footer>
  );
}


/* =========================================================
   SMART CHATBOT
========================================================= */

function Chat({
  open,
  setOpen,
  lang,
  t,
}) {
  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [typing, setTyping] =
    useState(false);

  const [visitorName, setVisitorName] =
    useState("");

  function detectName(text) {
    const patterns = [
      /je m['’]appelle\s+([a-zA-ZÀ-ÿ-]+)/i,
      /mon nom est\s+([a-zA-ZÀ-ÿ-]+)/i,
      /moi c['’]est\s+([a-zA-ZÀ-ÿ-]+)/i,
      /my name is\s+([a-zA-Z-]+)/i,
      /i am\s+([a-zA-Z-]+)/i,
      /izaho dia\s+([a-zA-ZÀ-ÿ-]+)/i,
      /ny anarako dia\s+([a-zA-ZÀ-ÿ-]+)/i,
    ];

    for (const pattern of patterns) {
      const match =
        text.match(pattern);

      if (match?.[1]) {
        return (
          match[1]
            .charAt(0)
            .toUpperCase() +
          match[1].slice(1)
        );
      }
    }

    return null;
  }


  function localAnswer(text) {
    const raw = text.trim();
    const q = raw
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const detected = detectName(raw);
    const questionLang = /[А-Яа-яЁё]/.test(raw)
      ? "ru"
      : /[ぁ-んァ-ン一-龯]/.test(raw)
      ? "ja"
      : /[一-龥]/.test(raw)
      ? "zh"
      : /\b(the|what|where|how|who|want|visit|price|travel)\b/.test(q)
      ? "en"
      : /\b(der|die|das|und|wie|wer|ich|möchte|preis|reise)\b/.test(q)
      ? "de"
      : /\b(il|la|lo|gli|come|chi|voglio|prezzo|viaggio)\b/.test(q)
      ? "it"
      : /\b(el|los|las|como|quien|quiero|precio|viaje)\b/.test(q)
      ? "es"
      : /\b(le|les|et|comment|qui|je|veux|prix|voyage|bonjour)\b/.test(q)
      ? "fr"
      : /\b(iza|aho|te|hitsidika|vidiny|aiza|misaotra|salama|bibidia|sary)\b/.test(q)
      ? "mg"
      : lang;

    if (detected) {
      setVisitorName(detected);
      const names = {
        en: `Nice to meet you, ${detected} 👋! What would you like to discover about Madagascar?`,
        fr: `Enchanté ${detected} 👋 ! Que souhaitez-vous découvrir à Madagascar ?`,
        mg: `Faly mahafantatra anao, ${detected} 👋! Inona no tianao ho fantatra momba an'i Madagascar?`,
        ru: `Рад познакомиться, ${detected} 👋! Что хотите узнать о Мадагаскаре?`,
        ja: `${detected}さん、はじめまして 👋！マダガスカルについて何を知りたいですか？`,
        de: `Schön, dich kennenzulernen, ${detected} 👋! Was möchtest du über Madagaskar wissen?`,
        it: `Piacere di conoscerti, ${detected} 👋! Cosa vuoi scoprire del Madagascar?`,
        es: `¡Encantado de conocerte, ${detected} 👋! ¿Qué quieres descubrir de Madagascar?`,
        zh: `很高兴认识您，${detected} 👋！您想了解马达加斯加的哪方面？`,
      };
      return names[questionLang] || names.en;
    }

    const greeting = /^(hello|hi|hey|bonjour|salut|bonsoir|salama|hola|ciao|hallo|привет|здравствуйте|こんにちは|你好)/i.test(raw);
    if (greeting) {
      const greetings = {
        en: `Hello ${visitorName || ""} 👋! I am HERY Assistant. I can help with destinations, wildlife, photography, astrophotography, conservation and travel planning in Madagascar.`,
        fr: `Bonjour ${visitorName || ""} 👋 ! Je suis HERY Assistant. Je peux vous aider sur les destinations, la faune, la photographie, l’astrophotographie et votre voyage à Madagascar.`,
        mg: `Salama ${visitorName || ""} 👋! Izaho no HERY Assistant. Afaka manampy anao amin'ny destination, wildlife, photographie, astrophotographie ary ny dia eto Madagascar aho.`,
        ru: `Здравствуйте ${visitorName || ""} 👋! Я HERY Assistant. Помогу с направлениями, дикой природой, фотографией, астрофотографией и поездкой по Мадагаскару.`,
        ja: `こんにちは ${visitorName || ""} 👋！HERY Assistantです。目的地、野生動物、写真、天体写真、自然保護、旅行についてお手伝いします。`,
        de: `Hallo ${visitorName || ""} 👋! Ich bin HERY Assistant. Ich helfe bei Reisezielen, Wildtieren, Fotografie, Astrofotografie und Reisen in Madagaskar.`,
        it: `Ciao ${visitorName || ""} 👋! Sono HERY Assistant. Posso aiutarti con destinazioni, fauna, fotografia, astrofotografia e viaggi in Madagascar.`,
        es: `¡Hola ${visitorName || ""} 👋! Soy HERY Assistant. Puedo ayudarte con destinos, fauna, fotografía, astrofotografía y viajes en Madagascar.`,
        zh: `您好 ${visitorName || ""} 👋！我是 HERY Assistant，可以帮助您了解目的地、野生动物、摄影、天文摄影和马达加斯加旅行。`,
      };
      return greetings[questionLang] || greetings.en;
    }

    const answers = {
      who: {
        en: "HERY is a local guide based in Morondava / Menabe, focused on nature, wildlife, photography, astrophotography, biodiversity and conservation.",
        fr: "HERY est un guide local basé à Morondava / Menabe, spécialisé dans la nature, la faune, la photographie, l’astrophotographie, la biodiversité et la conservation.",
        mg: "HERY dia guide local monina ao Morondava / Menabe, mifantoka amin'ny nature, wildlife, photographie, astrophotographie, biodiversité ary conservation.",
        ru: "HERY — местный гид из Morondava / Menabe, специализирующийся на природе, дикой природе, фотографии, астрофотографии, биоразнообразии и охране природы.",
        ja: "HERYはMorondava / Menabeを拠点とするローカルガイドで、自然、野生動物、写真、天体写真、生物多様性、自然保護を専門としています。",
        de: "HERY ist ein lokaler Guide aus Morondava / Menabe mit Schwerpunkt auf Natur, Wildtieren, Fotografie, Astrofotografie, Biodiversität und Naturschutz.",
        it: "HERY è una guida locale con base a Morondava / Menabe, specializzata in natura, fauna, fotografia, astrofotografia, biodiversità e conservazione.",
        es: "HERY es un guía local basado en Morondava / Menabe, especializado en naturaleza, fauna, fotografía, astrofotografía, biodiversidad y conservación.",
        zh: "HERY 是一名位于 Morondava / Menabe 的当地向导，专注于自然、野生动物、摄影、天文摄影、生物多样性和自然保护。",
      },
      morondava: {
        en: "Morondava and Menabe are key areas for HERY, especially the Avenue of Baobabs, Kirindy, local culture, western landscapes and wildlife.",
        fr: "Morondava et le Menabe sont au cœur de l’expérience HERY : Avenue des Baobabs, Kirindy, culture locale, paysages de l’Ouest et faune.",
        mg: "Morondava sy Menabe dia anisan'ny toerana lehibe amin'ny traikefan'i HERY: Avenue des Baobabs, Kirindy, culture locale, paysages de l'Ouest ary wildlife.",
        ru: "Morondava и Menabe особенно интересны для Avenue of Baobabs, Kirindy, местной культуры, западных ландшафтов и дикой природы.",
        ja: "MorondavaとMenabeでは、バオバブ街道、Kirindy、現地文化、西部の風景、野生動物を楽しめます。",
        de: "Morondava und Menabe bieten Avenue of Baobabs, Kirindy, lokale Kultur, westliche Landschaften und Wildtiere.",
        it: "Morondava e Menabe offrono Avenue of Baobabs, Kirindy, cultura locale, paesaggi occidentali e fauna.",
        es: "Morondava y Menabe ofrecen la Avenida de los Baobabs, Kirindy, cultura local, paisajes del oeste y fauna.",
        zh: "Morondava 和 Menabe 可以体验猴面包树大道、Kirindy、当地文化、西部景观和野生动物。",
      },
      wildlife: {
        en: "Kirindy is well suited to wildlife observation and nocturnal experiences. HERY emphasizes respectful observation.",
        fr: "Kirindy est particulièrement intéressant pour l’observation de la faune et les expériences nocturnes. HERY privilégie une observation respectueuse.",
        mg: "Kirindy dia tena mety amin'ny observation de la faune sy ny expérience nocturne. HERY dia manome lanja ny observation respectueuse.",
        ru: "Kirindy подходит для наблюдения за дикой природой и ночных впечатлений. HERY делает акцент на бережном наблюдении.",
        ja: "Kirindyは野生動物観察と夜の体験に適しています。HERYは自然に配慮した観察を重視します。",
        de: "Kirindy eignet sich für Wildtierbeobachtung und nächtliche Erlebnisse. HERY setzt auf respektvolle Beobachtung.",
        it: "Kirindy è ideale per l'osservazione della fauna e le esperienze notturne. HERY privilegia un approccio rispettoso.",
        es: "Kirindy es ideal para observar fauna y vivir experiencias nocturnas. HERY prioriza una observación respetuosa.",
        zh: "Kirindy 很适合野生动物观察和夜间体验。HERY 强调尊重自然的观察方式。",
      },
      photo: {
        en: "Yes. Photographers can join experiences focused on wildlife, golden hours, landscapes and night photography.",
        fr: "Oui. Les photographes peuvent participer à des sorties orientées wildlife, golden hours, paysages et photographie nocturne.",
        mg: "Eny. Misy expérience ho an'ny photographe: wildlife, golden hours, paysages ary photographie nocturne.",
        ru: "Да. Фотографы могут участвовать в опытах с дикой природой, золотым часом, пейзажами и ночной фотографией.",
        ja: "はい。野生動物、ゴールデンアワー、風景、夜間撮影など、写真家向けの体験があります。",
        de: "Ja. Es gibt Erfahrungen für Fotografen mit Wildtieren, Golden Hour, Landschaften und Nachtfotografie.",
        it: "Sì. Ci sono esperienze per fotografi dedicate a fauna, golden hour, paesaggi e fotografia notturna.",
        es: "Sí. Hay experiencias para fotógrafos centradas en fauna, golden hours, paisajes y fotografía nocturna.",
        zh: "可以。摄影体验包括野生动物、黄金时刻、风景和夜间摄影。",
      },
      astro: {
        en: "Astrophotography can include the Milky Way, stars, night landscapes, long exposures and baobab nightscapes.",
        fr: "L’astrophotographie peut inclure la Voie lactée, les étoiles, les paysages nocturnes, les longues expositions et les baobabs de nuit.",
        mg: "Ny astrophotographie dia mety ahitana Milky Way, kintana, paysages nocturnes, longues expositions ary baobabs amin'ny alina.",
        ru: "Астрофотография включает Млечный путь, звезды, ночные пейзажи, длинные выдержки и ночные баобабы.",
        ja: "天の川、星、夜の風景、長時間露光、夜のバオバブなどを撮影できます。",
        de: "Astrofotografie umfasst Milchstraße, Sterne, Nachtlandschaften, Langzeitbelichtungen und nächtliche Baobabs.",
        it: "L'astrofotografia può includere Via Lattea, stelle, paesaggi notturni, lunghe esposizioni e baobab notturni.",
        es: "La astrofotografía puede incluir Vía Láctea, estrellas, paisajes nocturnos, largas exposiciones y baobabs de noche.",
        zh: "天文摄影可以拍摄银河、星星、夜景、长曝光以及夜间猴面包树。",
      },
      destinations: {
        en: "Destinations include Morondava, Avenue of Baobabs, Kirindy, Tsingy de Bemaraha, Manambolo, Palmarium, Andasibe, Ankarafantsika, Miandrivazo, Nosy Be, Sainte Marie and RN7.",
        fr: "Les destinations comprennent Morondava, Avenue des Baobabs, Kirindy, Tsingy de Bemaraha, Manambolo, Palmarium, Andasibe, Ankarafantsika, Miandrivazo, Nosy Be, Sainte Marie et RN7.",
        mg: "Anisan'ny destinations: Morondava, Avenue des Baobabs, Kirindy, Tsingy de Bemaraha, Manambolo, Palmarium, Andasibe, Ankarafantsika, Miandrivazo, Nosy Be, Sainte Marie ary RN7.",
        ru: "Направления: Morondava, Avenue of Baobabs, Kirindy, Tsingy de Bemaraha, Manambolo, Palmarium, Andasibe, Ankarafantsika, Miandrivazo, Nosy Be, Sainte Marie и RN7.",
        ja: "目的地にはMorondava、バオバブ街道、Kirindy、Tsingy de Bemaraha、Manambolo、Palmarium、Andasibe、Ankarafantsika、Miandrivazo、Nosy Be、Sainte Marie、RN7があります。",
        de: "Zu den Reisezielen gehören Morondava, Avenue of Baobabs, Kirindy, Tsingy de Bemaraha, Manambolo, Palmarium, Andasibe, Ankarafantsika, Miandrivazo, Nosy Be, Sainte Marie und RN7.",
        it: "Le destinazioni includono Morondava, Avenue of Baobabs, Kirindy, Tsingy de Bemaraha, Manambolo, Palmarium, Andasibe, Ankarafantsika, Miandrivazo, Nosy Be, Sainte Marie e RN7.",
        es: "Los destinos incluyen Morondava, Avenida de los Baobabs, Kirindy, Tsingy de Bemaraha, Manambolo, Palmarium, Andasibe, Ankarafantsika, Miandrivazo, Nosy Be, Sainte Marie y RN7.",
        zh: "目的地包括 Morondava、猴面包树大道、Kirindy、Tsingy de Bemaraha、Manambolo、Palmarium、Andasibe、Ankarafantsika、Miandrivazo、Nosy Be、Sainte Marie 和 RN7。",
      },
      services: {
        en: "HERY offers private guiding, wildlife trips, photography trips, western Madagascar circuits, local logistics and custom experiences.",
        fr: "HERY propose du guidage privé, des wildlife trips, des sorties photo, des circuits dans l’Ouest, de la logistique locale et des expériences personnalisées.",
        mg: "HERY dia manolotra guidage privé, wildlife trips, sorties photo, circuits any amin'ny Ouest, logistique locale ary expériences personnalisées.",
        ru: "HERY предлагает частного гида, wildlife trips, фототуры, маршруты по западному Мадагаскару, местную логистику и индивидуальные программы.",
        ja: "プライベートガイド、野生動物ツアー、写真ツアー、西部ルート、現地ロジスティクス、カスタム体験を提供しています。",
        de: "HERY bietet private Guides, Wildlife-Trips, Fototouren, West-Madagaskar-Routen, lokale Logistik und individuelle Erlebnisse.",
        it: "HERY offre guida privata, wildlife trips, uscite fotografiche, itinerari nel Madagascar occidentale, logistica locale ed esperienze personalizzate.",
        es: "HERY ofrece guía privada, wildlife trips, salidas fotográficas, circuitos por el oeste, logística local y experiencias personalizadas.",
        zh: "HERY 提供私人向导、野生动物旅行、摄影体验、西部线路、当地物流和定制体验。",
      },
      price: {
        en: "Pricing depends on destination, duration, group size and experience. Contact HERY on WhatsApp or through the contact form for an accurate personalized quote.",
        fr: "Le tarif dépend de la destination, de la durée, du groupe et de l’expérience. Contactez HERY sur WhatsApp ou via le formulaire pour un devis personnalisé.",
        mg: "Miankina amin'ny destination, durée, isan'ny olona ary expérience ny tarif. Raha mila devis marina dia mifandraisa amin'i HERY amin'ny WhatsApp na formulaire.",
        ru: "Цена зависит от направления, длительности, группы и программы. Для точного предложения свяжитесь с HERY через WhatsApp или форму.",
        ja: "料金は目的地、期間、人数、内容によって異なります。正確な見積もりはWhatsAppまたはお問い合わせフォームからHERYへご連絡ください。",
        de: "Der Preis hängt von Ziel, Dauer, Gruppengröße und Erlebnis ab. Für ein genaues Angebot kontaktieren Sie HERY über WhatsApp oder das Formular.",
        it: "Il prezzo dipende da destinazione, durata, gruppo ed esperienza. Per un preventivo preciso contatta HERY su WhatsApp o tramite il modulo.",
        es: "El precio depende del destino, duración, grupo y experiencia. Para un presupuesto preciso, contacta con HERY por WhatsApp o el formulario.",
        zh: "价格取决于目的地、时间、人数和体验内容。请通过 WhatsApp 或联系表单获取准确报价。",
      },
      booking: {
        en: "You can request a trip through the contact form or WhatsApp. Share your destination, dates, group size and interests.",
        fr: "Vous pouvez envoyer une demande via le formulaire de contact ou WhatsApp. Indiquez la destination, les dates, le nombre de personnes et vos centres d’intérêt.",
        mg: "Afaka mandefa demande amin'ny formulaire Contact ianao na amin'ny WhatsApp. Lazao ny destination, daty, isan'ny olona ary izay mahaliana anao.",
        ru: "Отправьте запрос через форму или WhatsApp. Укажите направление, даты, количество людей и интересы.",
        ja: "お問い合わせフォームまたはWhatsAppから旅行リクエストを送れます。目的地、日程、人数、興味をお知らせください。",
        de: "Senden Sie eine Anfrage über das Kontaktformular oder WhatsApp. Nennen Sie Ziel, Termine, Personenzahl und Interessen.",
        it: "Puoi inviare una richiesta tramite il modulo di contatto o WhatsApp. Indica destinazione, date, numero di persone e interessi.",
        es: "Puedes enviar una solicitud mediante el formulario de contacto o WhatsApp. Indica destino, fechas, número de personas e intereses.",
        zh: "您可以通过联系表单或 WhatsApp 提交旅行请求，并提供目的地、日期、人数和兴趣。",
      },
      contact: {
        en: "You can contact HERY on WhatsApp at +261 34 58 085 04 or by email at rajaofetaheryhenintsoa@yahoo.fr.",
        fr: "Vous pouvez contacter HERY sur WhatsApp au +261 34 58 085 04 ou par email à rajaofetaheryhenintsoa@yahoo.fr.",
        mg: "Afaka mifandray amin'i HERY amin'ny WhatsApp +261 34 58 085 04 na email rajaofetaheryhenintsoa@yahoo.fr ianao.",
        ru: "WhatsApp: +261 34 58 085 04. Email: rajaofetaheryhenintsoa@yahoo.fr.",
        ja: "WhatsApp: +261 34 58 085 04。Email: rajaofetaheryhenintsoa@yahoo.fr。",
        de: "WhatsApp: +261 34 58 085 04. E-Mail: rajaofetaheryhenintsoa@yahoo.fr.",
        it: "WhatsApp: +261 34 58 085 04. Email: rajaofetaheryhenintsoa@yahoo.fr.",
        es: "WhatsApp: +261 34 58 085 04. Email: rajaofetaheryhenintsoa@yahoo.fr.",
        zh: "WhatsApp：+261 34 58 085 04。邮箱：rajaofetaheryhenintsoa@yahoo.fr。",
      },
      conservation: {
        en: "Conservation is a core part of HERY's approach: biodiversity awareness, respectful wildlife encounters, forest restoration and community awareness.",
        fr: "La conservation est au cœur de l’approche HERY : biodiversité, observation respectueuse, restauration forestière et sensibilisation des communautés.",
        mg: "Ny conservation dia anisan'ny fototry ny HERY: biodiversité, observation respectueuse, restauration forestière ary sensibilisation.",
        ru: "Охрана природы — важная часть подхода HERY: биоразнообразие, бережное наблюдение, восстановление лесов и работа с сообществами.",
        ja: "自然保護はHERYの重要な柱です。生物多様性、自然に配慮した観察、森林再生、地域との協力を重視します。",
        de: "Naturschutz ist ein Kernbereich von HERY: Biodiversität, respektvolle Tierbeobachtung, Waldrestauration und Bewusstsein in Gemeinden.",
        it: "La conservazione è un pilastro di HERY: biodiversità, osservazione rispettosa, ripristino forestale e sensibilizzazione delle comunità.",
        es: "La conservación es un pilar de HERY: biodiversidad, observación respetuosa, restauración forestal y sensibilización comunitaria.",
        zh: "自然保护是 HERY 的重要方向，包括生物多样性、尊重野生动物、森林恢复和社区意识。",
      },
      culture: {
        en: "HERY highlights Sakalava heritage, coastal life, local customs, fady, rural life and respectful relationships with communities.",
        fr: "HERY met en avant le patrimoine Sakalava, la vie côtière, les coutumes locales, le fady, la vie rurale et le respect des communautés.",
        mg: "HERY dia manasongadina ny patrimoine Sakalava, fiainana amorontsiraka, fomba amam-panao, fady, fiainana ambanivohitra ary fanajana ny communauté.",
        ru: "HERY показывает наследие Sakalava, прибрежную жизнь, местные традиции, fady, сельскую жизнь и уважение к сообществам.",
        ja: "Sakalavaの文化、沿岸の暮らし、地域の習慣、fady、農村生活、地域社会への敬意を紹介します。",
        de: "HERY zeigt Sakalava-Erbe, Küstenleben, lokale Bräuche, fady, ländliches Leben und Respekt für Gemeinden.",
        it: "HERY valorizza il patrimonio Sakalava, la vita costiera, le tradizioni locali, il fady, la vita rurale e il rispetto delle comunità.",
        es: "HERY destaca el patrimonio Sakalava, la vida costera, las costumbres locales, el fady, la vida rural y el respeto a las comunidades.",
        zh: "HERY 展示 Sakalava 文化、海岸生活、当地习俗、fady、乡村生活以及对社区的尊重。",
      },
      thanks: {
        en: "You're welcome 😊! Feel free to ask another question about Madagascar.",
        fr: "Avec plaisir 😊 ! N’hésitez pas à poser une autre question sur Madagascar.",
        mg: "Tsy misy fisaorana 😊! Anontanio fotsiny raha mbola misy zavatra tianao ho fantatra.",
        ru: "Пожалуйста 😊! Задавайте любые другие вопросы о Мадагаскаре.",
        ja: "どういたしまして 😊！マダガスカルについて他にも質問してください。",
        de: "Gern 😊! Stellen Sie gerne weitere Fragen über Madagaskar.",
        it: "Di nulla 😊! Puoi farmi altre domande sul Madagascar.",
        es: "¡De nada 😊! Puedes hacerme más preguntas sobre Madagascar.",
        zh: "不客气 😊！如果还有问题，可以继续问我。",
      },
    };

    if (/qui est hery|who is hery|wer ist hery|chi e hery|quien es hery|кто такой hery|heryとは|hery 是谁|iza i hery/.test(q) || q === "hery") return answers.who[questionLang] || answers.who.en;
    if (/morondava|menabe|baobab/.test(q)) return answers.morondava[questionLang] || answers.morondava.en;
    if (/kirindy|wildlife|faune|animal|lemur|lémur|bibidia|野生動物|野生动物/.test(q)) return answers.wildlife[questionLang] || answers.wildlife.en;
    if (/photo|photograph|fotograf|fotografia|fotografía|photographe|sary|写真|фото/.test(q)) return answers.photo[questionLang] || answers.photo.en;
    if (/astro|milky way|galax|etoile|étoile|star|night sky|kintana|天体|天の川|астро/.test(q)) return answers.astro[questionLang] || answers.astro.en;
    if (/prix|tarif|cout|coût|price|how much|preis|prezzo|precio|цена|料金|vidiny/.test(q)) return answers.price[questionLang] || answers.price.en;
    if (/reservation|réservation|reserver|réserver|book|booking|reserve|buchen|prenot|reserv|予約|брони/.test(q)) return answers.booking[questionLang] || answers.booking.en;
    if (/whatsapp|email|e-mail|contact|telephone|téléphone|phone|номер|メール/.test(q)) return answers.contact[questionLang] || answers.contact.en;
    if (/destination|where|where to|ou aller|où aller|travel|voyage|trip|reise|viaggio|viaje|куда|旅行|toerana|tsidika/.test(q)) return answers.destinations[questionLang] || answers.destinations.en;
    if (/service|guiding|guide|experience|excursion|tour|activité|activite|logistique|custom/.test(q)) return answers.services[questionLang] || answers.services.en;
    if (/conservation|nature|protection|forest|biodiversity|biodiversite|biodiversité|fiarovana|naturschutz|conservacion|conservazione|自然保護/.test(q)) return answers.conservation[questionLang] || answers.conservation.en;
    if (/culture|sakalava|fady|local life|communaut|community|kultur|cultura|文化/.test(q)) return answers.culture[questionLang] || answers.culture.en;
    if (/merci|thank|thanks|misaotra|gracias|grazie|danke|спасибо|ありがとう|谢谢/.test(q)) return answers.thanks[questionLang] || answers.thanks.en;

    const fallback = {
      en: "I can help with destinations, Morondava, Kirindy, wildlife, photography, astrophotography, services, conservation, prices and bookings. What would you like to know?",
      fr: "Je peux vous aider sur Morondava, Kirindy, la faune, la photographie, l’astrophotographie, les services, la conservation, les tarifs et les réservations. Que souhaitez-vous savoir ?",
      mg: "Afaka manampy anao amin'ny Morondava, Kirindy, wildlife, photographie, astrophotographie, services, conservation, tarif ary réservation aho. Inona no tianao ho fantatra?",
      ru: "Я могу помочь с Morondava, Kirindy, дикой природой, фотографией, астрофотографией, услугами, ценами и бронированием. Что вас интересует?",
      ja: "Morondava、Kirindy、野生動物、写真、天体写真、サービス、料金、予約についてお答えできます。何を知りたいですか？",
      de: "Ich kann bei Morondava, Kirindy, Wildtieren, Fotografie, Astrofotografie, Services, Preisen und Buchungen helfen. Was möchten Sie wissen?",
      it: "Posso aiutarti con Morondava, Kirindy, fauna, fotografia, astrofotografia, servizi, prezzi e prenotazioni. Cosa vuoi sapere?",
      es: "Puedo ayudarte con Morondava, Kirindy, fauna, fotografía, astrofotografía, servicios, precios y reservas. ¿Qué quieres saber?",
      zh: "我可以帮助您了解 Morondava、Kirindy、野生动物、摄影、天文摄影、服务、价格和预订。您想了解什么？",
    };
    return fallback[questionLang] || fallback.en;
  }


  async function sendMessage(textFromQuick = null) {
    const text = (textFromQuick ?? message).trim();
    if (!text || typing) return;

    setMessages((current) => [
      ...current,
      { role: "user", text },
    ]);

    setMessage("");
    setTyping(true);

    const detected = detectName(text);
    if (detected) setVisitorName(detected);

    // Local intent matching first: the assistant remains useful even if the API is offline.
    const local = localAnswer(text);
    if (local) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      setMessages((current) => [
        ...current,
        { role: "bot", text: local },
      ]);
      setTyping(false);
      return;
    }

    // API fallback for future/open-ended answers.
    try {
      const response = await fetch(`${API}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          language: lang,
          name: detected || visitorName || "",
        }),
      });

      if (!response.ok) throw new Error("API chatbot unavailable");

      const data = await response.json();
      const apiAnswer = data?.answer?.trim();

      if (apiAnswer) {
        setMessages((current) => [
          ...current,
          { role: "bot", text: apiAnswer },
        ]);
        return;
      }

      throw new Error("Empty chatbot response");
    } catch {
      const fallback = {
        en: "I can help with destinations, wildlife, photography, astrophotography, conservation, services, prices and bookings in Madagascar.",
        fr: "Je peux vous aider sur les destinations, la faune, la photographie, l’astrophotographie, la conservation, les services, les tarifs et les réservations à Madagascar.",
        mg: "Afaka manampy anao amin'ny destinations, wildlife, photographie, astrophotographie, conservation, services, tarif ary réservation eto Madagascar aho.",
        ru: "Я могу помочь с направлениями, дикой природой, фотографией, астрофотографией, охраной природы, услугами и бронированием на Мадагаскаре.",
        ja: "マダガスカルの目的地、野生動物、写真、天体写真、自然保護、サービス、料金、予約についてお手伝いできます。",
        de: "Ich kann bei Reisezielen, Wildtieren, Fotografie, Astrofotografie, Naturschutz, Services und Buchungen in Madagaskar helfen.",
        it: "Posso aiutarti con destinazioni, fauna, fotografia, astrofotografia, conservazione, servizi e prenotazioni in Madagascar.",
        es: "Puedo ayudarte con destinos, fauna, fotografía, astrofotografía, conservación, servicios y reservas en Madagascar.",
        zh: "我可以帮助您了解马达加斯加的目的地、野生动物、摄影、天文摄影、自然保护、服务、价格和预订。",
      };

      setMessages((current) => [
        ...current,
        { role: "bot", text: fallback[lang] || fallback.en },
      ]);
    } finally {
      setTyping(false);
    }
  }


  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 25,
              scale: 0.95,
            }}
            className="chat"
          >
            <div className="chat-head">
              <div className="chat-avatar">
                H
              </div>

              <div>
                <b>
                  {t.chatbotTitle}
                </b>

                <span>
                  {t.chatbotSub}
                </span>
              </div>

              <button
                onClick={() =>
                  setOpen(false)
                }
                aria-label="Fermer"
              >
                <X />
              </button>
            </div>

            <div className="chat-body">
              {!messages.length && (
                <div className="chat-welcome">
                  {t.chatbotWelcome}
                </div>
              )}

              {messages.map(
                (item, index) => (
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className={
                      item.role === "user"
                        ? "user"
                        : "bot"
                    }
                    key={index}
                  >
                    {item.text}
                  </motion.p>
                )
              )}

              {typing && (
                <div className="chat-typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>

            {!messages.length && (
              <div className="chat-quick">
                {t.quickQuestions.map(
                  (question) => (
                    <button
                      key={question}
                      onClick={() =>
                        sendMessage(
                          question
                        )
                      }
                    >
                      {question}
                    </button>
                  )
                )}
              </div>
            )}

            <div className="chat-input">
              <input
                value={message}
                onChange={(event) =>
                  setMessage(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (
                    event.key ===
                    "Enter"
                  ) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={
                  t.chatbotPlaceholder
                }
              />

              <button
                onClick={() =>
                  sendMessage()
                }
                disabled={
                  !message.trim() ||
                  typing
                }
              >
                <Send size={16} />
              </button>
            </div>

            <div className="chat-direct">
              <a
                href="https://wa.me/261345808504?text=Bonjour%20HERY%2C%20je%20viens%20du%20site%20et%20je%20souhaite%20avoir%20des%20informations."
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle
                  size={15}
                />

                WhatsApp HERY
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={
          open
            ? "chat-bubble active"
            : "chat-bubble"
        }
        onClick={() =>
          setOpen(!open)
        }
        aria-label="HERY Assistant"
      >
        {open ? (
          <X />
        ) : (
          <MessageCircle />
        )}

        {!open && (
          <span className="chat-pulse" />
        )}
      </button>
    </>
  );
}


/* =========================================================
   START APPLICATION
========================================================= */

createRoot(
  document.getElementById("root")
).render(
  <App />
);








