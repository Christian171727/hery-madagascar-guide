import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";

import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  MessageCircle,
  MessageCircleMore,
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
  Pause,
  Clock,
  Mountain,
  TreePine,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import "./style.css";
import { activateExtraTranslations } from "./siteTranslationExtras.js";
import { expandedLocaleContent } from "./expandedLocaleContent.js";
import { localizedBlogSections } from "./localizedBlogSections.js";
import PartnersStrip from "./PartnersStrip.jsx";
import { getHeryChatReply, getHeryVisitorName } from "./heryChat.js";
import ConservationGallery from "./ConservationGallery.jsx";
import BaobabGallery from "./BaobabGallery.jsx";
import SainteMarieGallery from "./SainteMarieGallery.jsx";
import RN7Gallery from "./RN7Gallery.jsx";
import TsingyGallery from "./TsingyGallery.jsx";
import MenabeGallery from "./MenabeGallery.jsx";
import KirindyGallery from "./KirindyGallery.jsx";
import AndasibeGallery from "./AndasibeGallery.jsx";
import PalmariumGallery from "./PalmariumGallery.jsx";
import HiddenMomentsExperience from "./HiddenMomentsExperience.jsx";
import FieldJourneyVideo from "./FieldJourneyVideo.jsx";
import NorthernMadagascarGallery from "./NorthernMadagascarGallery.jsx";
import ManamboloGallery from "./ManamboloGallery.jsx";
import CultureShowcase from "./CultureShowcase.jsx";
import WildlifeArticleGallery from "./WildlifeArticleGallery.jsx";
import WildlifeFeaturedPreview from "./WildlifeFeaturedPreview.jsx";
import { ConservationFeaturedPreview, ConservationArticleGallery } from "./ConservationBlogGallery.jsx";
import { PhotographyFeaturedPreview, PhotographyArticleHero, PhotographyArticleScenes } from "./PhotographyBlogGallery.jsx";
import {
  WhatsAppIcon,
  InstagramIcon,
  TelephoneIcon,
  EmailIcon,
  LocationIcon,
  AssistantIcon,
} from "./ContactIcons.jsx";


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
  profile: "/images/about-wildlife-lemurs.webp",

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
        Découvrez Madagascar
        <br />
        <em>pas à pas.</em>
      </>
    ),

    heroSub:
      "Rencontres avec la faune. Ciels étoilés. Paysages vivants.",

    heroText:
      "Une expérience de terrain mêlant guidage local, observation de la faune, photographie, astrophotographie et découverte de la biodiversité malgache.",

    explore: "Explorer Madagascar",
    photo: "Voir la photographie",

    aboutKicker: "QUI EST HERY ?",

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
      "Découvrez Madagascar pas à pas.",

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
      "Rencontres avec la faune. Ciels étoilés. Paysages vivants.",

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
      "Fakàna sary",
      "Sary amin’ny alina",
      "Fiarovana",
      "Kolontsaina",
      "Serivisy",
      "Lahatsoratra",
      "FAQ",
      "Hifandray",
    ],

    heroKicker:
      "MPITARI-DALANA ETO MADAGASIKARA",

    heroTitle: (
      <>
        Fantaro i Madagasikara
        <br />
        <em>tsikelikely.</em>
      </>
    ),

    heroSub:
      "Bibidia miavaka. Lanitra feno kintana. Tontolo velona.",

    heroText:
      "Traikefa eny ifotony mampiray ny fitarihan-dalana, ny fijerena bibidia, ny fakàna sary, ny lanitra amin’ny alina ary ny fahafantarana ny harena voajanahary eto Madagasikara.",

    explore:
      "Hijery an’i Madagascar",

    photo:
      "Hijery ny sary",

    aboutKicker:
      "IZA I HERY?",

    aboutTitle:
      "Mpitari-dalana eto an-toerana. Traikefa tena izy eny ifotony.",

    aboutText:
      "HERY dia mpitari-dalana monina ao Morondava / Menabe, manampahaizana amin’ny natiora, bibidia, fakàna sary, lanitra amin’ny alina, harena voajanahary ary fiarovana ny tontolo iainana.",

    profile:
      "Mpitari-dalana sy mpiara-dia eny ifotony",

    destTitle:
      "Toerana azo tsidihina",

    destSub:
      "Tontolo velona, bibidia tsy manam-paharoa ary traikefa tarihin’olona mahalala tsara ny toerana.",

    viewAll:
      "Hijery ny toerana rehetra",

    stories:
      "Tantara sy torohevitra eny ifotony",

    storiesSub:
      "Torohevitra, zavatra hita ary tantara momba an’i Madagascar.",

    read:
      "Hamaky lahatsoratra",

    offer:
      "NY DIA MANARAKA",

    offerTitle:
      "Fantaro i Madagasikara tsikelikely.",

    offerText:
      "Traikefa mifanaraka amin’ny fanirianao ary manaja ny tontolo iainana.",

    contact:
      "Hifandray amin’i HERY",

    stats: [
      "Traikefa eny an-kianja",
      "Fakàna sary",
      "Fiarovana ny natiora",
      "Fomba local",
    ],

    servicesTitle:
      "Tolotra sy traikefa",

    faqTitle:
      "Fanontaniana mahazatra",

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
      "Nalefa soa aman-tsara ny hafatra.",

    error:
      "Tsy afaka nandefa hafatra. Hamarino ny EmailJS.",

    footer:
      "Bibidia miavaka. Lanitra feno kintana. Tontolo velona.",

    photoTitle: "Fakàna sary eny ifotony",
    photoText: "Bibidia, vorona, hazavan’ny maraina sy hariva ary lanitry ny alina: traikefa miavaka amin’ny fakàna sary eto Madagasikara.",

    astroTitle:
      "Sary amin’ny alina",

    astroText:
      "Ankafizo ny lanitry ny alina eto Madagasikara: ny Vahindanitra, ny kintana, ny tontolo amin’ny alina ary ny fakàna sary amin’ny fotoana lava.",

    conservationTitle:
      "Tsy haingo fotsiny ny natiora. Izy no tantara.",

    cultureTitle:
      "Fantaro i Madagasikara mihoatra noho izay hita amin’ny sary fotsiny.",

    discover:
      "Hijery",

    readArticle:
      "Hamaky",

    searchPlaceholder:
      "Mitadiava Morondava, Kirindy, Tsingy...",

    chatbotWelcome:
      "Salama 👋 Izaho no mpanampy HERY. Afaka manampy anao hahalala ireo toerana tsidihina, fitsangatsanganana, fakàna sary ary ny dianao eto Madagasikara aho.",

    chatbotPlaceholder:
      "Soraty eto ny fanontanianao...",

    chatbotTitle:
      "HERY Assistant",

    chatbotSub:
      "Mpitari-dalana • Madagasikara",

    quickQuestions: [
      "Iza i HERY?",
      "Te hitsidika an’i Morondava aho",
      "Mpaka sary aho",
      "Te haka sary amin’ny alina aho",
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
        探索马达加斯加
        <br />
        <em>一步一个脚印。</em>
      </>
    ),

    heroSub:
      "邂逅野生动物。仰望星空。探索鲜活景观。",

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
      "一步一步探索马达加斯加。",

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
      "邂逅野生动物。仰望星空。探索鲜活景观。",

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
  [
    "Northern Madagascar",
    "Discover the chameleons, forests and hidden wildlife of northern Madagascar",
    "/images/northern-madagascar/north-1.avif",
    "13",
  ],
];



/* SEO landing pages — original tours, destinations and private guiding */
const seoTourPages = [
  {
    "slug": "madagascar-tours",
    "title": "Madagascar Tours",
    "desc": "Private guiding and custom nature experiences across Madagascar.",
    "image": "/images/tours/madagascar-tours.webp"
  },
  {
    "slug": "local-tour-guide-madagascar",
    "title": "Local Tour Guide Madagascar",
    "desc": "Get to know HERY and plan your adventure with local insight.",
    "image": "/images/tours/local-tour-guide-madagascar.webp"
  },
  {
    "slug": "morondava-tours",
    "title": "Morondava Tours",
    "desc": "Discover unforgettable Morondava sunsets, majestic baobabs and the magic of western Madagascar.",
    "image": "/images/tours/morondava-sunset.webp"
  },
  {
    "slug": "avenue-of-baobabs-tour",
    "title": "Avenue of the Baobabs",
    "desc": "Discover the iconic baobab landscapes near Morondava.",
    "image": "/images/Baobabs.jpg"
  },
  {
    "slug": "kirindy-forest-tour",
    "title": "Kirindy Forest Tour",
    "desc": "Wildlife observation and biodiversity in western Madagascar.",
    "image": "/images/Kirindy.jpeg"
  },
  {
    "slug": "tsingy-bemaraha-tours",
    "title": "Tsingy de Bemaraha Tours",
    "desc": "Remarkable limestone landscapes and western Madagascar travel.",
    "image": "/images/Bemaraha.jpeg"
  }
];

/* =========================================================
   SERVICES
========================================================= */

const services = [
  [
    "Private guiding",
    "Personalized guidance and support in the field.",
    Compass,
  ],
  [
    "Wildlife trips",
    "Wildlife observation and discovery of natural habitats.",
    Leaf,
  ],
  [
    "Photography trips",
    "Photography outings timed for the best natural light.",
    Camera,
  ],
  [
    "Western Madagascar circuits",
    "Morondava, Menabe and western Madagascar's remarkable landscapes.",
    Mountain,
  ],
  [
    "Local logistics",
    "Practical local guidance and on-the-ground coordination.",
    MapPin,
  ],
  [
    "Custom experiences",
    "A tailor-made experience shaped around your interests.",
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
    duration: "8 min",
    intro:
      "Kirindy Forest in western Madagascar is a place to slow down and observe. Between sunlit paths, dry forest, quiet branches and unexpected animal encounters, every detail tells a story. But the finest wildlife memory is not the closest photograph: it is the moment an animal carries on naturally because our presence has remained calm and respectful. This field guide explores how to discover Kirindy with patience, photograph responsibly, understand the living forest and turn curiosity into a meaningful travel experience.",
    sections: [
      {
        title: "Observe before getting closer",
        text:
          "A rewarding wildlife encounter often begins with stillness. Stop, look at the branches, watch the ground and listen to the sounds around you. Let your eyes adjust to the forest rather than moving quickly from one sighting to the next. Birds, small reptiles, lemurs and other forest creatures may remain hidden even when they are nearby. Avoid approaching an animal just to obtain a dramatic picture: keep a comfortable distance, do not block its route, and never chase it into the open. Your guide can help you recognize signs of wildlife and decide when to move on. The best observation is one in which the animal continues feeding, resting or moving without changing its behavior because of you.",
      },
      {
        title: "A field-based experience in Kirindy",
        text:
          "No two forest walks are identical. Time of day, weather, season and simple chance shape what visitors may see. A morning walk can reveal changing light and activity along the paths, while an appropriately organized evening visit offers a different atmosphere. Nothing in a wild forest is guaranteed, and that uncertainty is part of the beauty of the experience. Walk in a small group where possible, follow authorized trails and listen carefully to local guidance. Ask questions about the vegetation, habitats and relationships between species; those details transform a quick sighting into real understanding. Rather than racing to collect photographs, allow space for surprise, silence and the pleasure of discovering the forest at its own pace.",
      },
      {
        title: "Photography without disturbing wildlife",
        text:
          "Good wildlife photography is built on patience, not pressure. Use a suitable zoom or longer lens if you have one, and never touch, move or feed an animal for a photograph. Avoid flash when it may disturb wildlife, particularly during low-light encounters, and keep voices and movements soft. Choose compositions that include the habitat: a branch, textured bark, the floor of the dry forest or a shaft of natural light can tell as much of the story as a close-up. Take several moments to observe before lifting the camera; sometimes the most memorable picture appears after you have stopped trying to force it. If an animal shows signs of agitation or retreat, give it more space immediately.",
      },
      {
        title: "Why the forest deserves respect",
        text:
          "Kirindy is more than a beautiful stop on a Madagascar itinerary. Forest habitats support complex relationships among trees, insects, reptiles, birds and mammals, and they also exist within landscapes shaped by nearby communities. A responsible visitor stays on designated routes, avoids leaving litter, refrains from collecting plants or animals, and respects local rules. Small choices matter: a quiet approach, an honest question, care around fragile places and a willingness to support local guides all contribute to a more thoughtful experience. Conservation is not only a distant idea or a sign at an entrance. It is reflected in the choices travelers make whenever they enter a living landscape.",
      },
      {
        title: "The remarkable details of Madagascar's biodiversity",
        text:
          "Wildlife discovery is not limited to the largest or most famous animals. A chameleon blending into leaves, a gecko clinging to tree bark, a snake resting on a branch or a small insect appearing after dark can be equally fascinating. These creatures remind us that healthy ecosystems depend on many kinds of life, including species people often overlook. The additional photographs in this article illustrate Madagascar's wider wildlife diversity; their precise photography locations have not all been verified as Kirindy. Take a moment to notice their colors, patterns and adaptations. Instead of approaching too closely, let the environment become part of the image and the story.",
      },
      {
        title: "Daylight, dusk and the art of waiting",
        text:
          "Light changes the way we perceive a forest. Soft morning light can reveal details in leaves and bark; toward the end of the day, deeper shadows create more atmosphere and demand extra care from photographers. Keep expectations flexible and ask your guide what routes or times are appropriate and permitted. For low-light photography, a steady stance and patient observation may be more helpful than adding artificial light. If an authorized night walk is part of your program, respect the guide's instructions and avoid dazzling animals with bright beams. The goal is not to turn the forest into a studio; it is to learn to see what is already there.",
      },
      {
        title: "People, place and responsible travel",
        text:
          "Meaningful travel includes the people who know a place best. Local guides bring knowledge of paths, animal behavior, weather and the everyday realities surrounding protected habitats. Listen to their stories and ask how to visit in ways that respect both the environment and nearby communities. Take time to appreciate ordinary moments, not only famous sightings: the sound of birds, textures of a tree, a discussion during a quiet walk or a simple view that changes in the afternoon sun. Planning with realistic expectations also matters. Wildlife is not a performance, and responsible tourism should never promise a close encounter that nature cannot guarantee.",
      },
      {
        title: "Make your Kirindy journey memorable",
        text:
          "Come with comfortable walking shoes, water, curiosity and a willingness to slow down. Plan enough time for the forest rather than treating it as a quick photo stop. Tell HERY whether you are most interested in photography, biodiversity, learning about conservation or simply exploring the landscapes of western Madagascar. A local guide can help shape a visit around your interests and the conditions on the day, always with respect for access rules and wildlife. You may leave without the exact photograph you imagined, but with something more lasting: a deeper connection to the forest and a story you experienced rather than staged.",
      },
    ],
  },

  {
    id: "photographier-baobabs",
    title: "Photographing the baobabs at golden hour",
    image: "/images/photography/photographe.avif",
    category: "Photography",
    duration: "5 min",
    intro:
      "Imagine standing beneath Madagascar's extraordinary baobabs as the sky turns golden. Every silhouette, cloud and shifting ray of light tells a different story. Discover how to capture more than a photograph — and take home the feeling of being there.",
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
    image: "/images/conservation-blog/understanding-hero.jpeg",
    category: "Conservation",
    duration: "12 min",
    intro: "Conservation is more than protecting a place on a map. It connects local knowledge, habitats, field observations and the everyday decisions that shape our relationship with nature. These photographs illustrate practical learning, outdoor discovery and respectful exploration in Madagascar; the precise locations and organizations shown have not all been independently verified. Explore ten moments that invite deeper curiosity, patient observation and a more thoughtful approach to responsible travel.",
    sections: [
      {
            "title": "Start with observation, not assumptions",
            "text": "Before trying to protect a place, learn what is actually there. Look at the vegetation, shade, soil and signs of water, then ask local people what they have noticed over time. One visit cannot reveal the full ecological history of a forest. It can, however, help you ask better questions: how are paths used, what plants are growing, what pressures exist and who helps care for the landscape? Keep observations separate from assumptions. When you do not know a species name or the cause of a change, say so. Careful listening and accurate notes are the first steps toward meaningful conservation."
      },
      {
            "title": "Conservation is a shared effort",
            "text": "The strongest conservation experiences are not simply about one visitor completing an activity. They are about people exchanging knowledge, understanding local priorities and working with care. Pay attention to how field teams discuss a task and how responsibilities are divided. Community expertise matters because residents live with the long-term effects of decisions made about the environment. Ask who maintains an initiative after an event is over, how success is measured and whether local concerns are being heard. The goal should be lasting understanding and respectful collaboration, not a photograph suggesting that one afternoon solved a complex challenge."
      },
      {
            "title": "Planting is only the beginning",
            "text": "Young plants can symbolize hope, but meaningful restoration requires much more than putting a seedling in the ground. The right species must suit the habitat, and plants need follow-up care and protection from damage. Survival over time matters more than the number planted in a single session. When observing field work, notice how people handle the soil and vegetation and ask what happens afterward. Avoid claiming that a site has recovered solely because new plants are visible. True restoration depends on evidence, patience and a longer relationship with the landscape. These lessons make a short field experience more valuable than a simple photo opportunity."
      },
      {
            "title": "Explore forests with a lighter footprint",
            "text": "A forest path invites discovery, yet visitors also have an impact. Use permitted routes, stay away from vulnerable plants, carry waste out with you and avoid taking natural objects as souvenirs. Do not approach wildlife simply to capture a close-up image. Slow walking helps you notice the fine detail of habitats while reducing disturbance and giving your guide time to explain what you see. Small actions, such as waiting for others on a narrow path or avoiding shortcuts through vegetation, matter. Responsible travel is part of the experience itself: every decision offers an opportunity to show respect for the place being visited."
      },
      {
            "title": "Photography can support field learning",
            "text": "Photographs are useful for remembering details, starting conversations and documenting what was visible during a visit. A picture of a path, branch, plant or human activity can prompt questions worth exploring later. Yet one photo cannot prove that a habitat is improving or declining without verified context. Record the date and place when possible and distinguish what you observed from what you inferred. Respect people's privacy when photographing field activities and ask permission where appropriate. Never move plants or disturb animals to improve a composition. Thoughtful photography lets the environment remain as it was, rather than becoming a stage for the camera."
      },
      {
            "title": "The small details help tell the story",
            "text": "A field notebook does not need to focus only on famous animals or dramatic landscapes. The texture of bark, the cover of young vegetation, signs of erosion and changes in moisture can all draw attention to how a place functions. Try noticing connections: where does sunlight reach the ground, how does the vegetation change, and where do visitors walk? It is normal not to understand every detail immediately. Write honest observations and questions that could be checked through research or with local experts. This approach replaces quick conclusions with deeper curiosity and teaches visitors to appreciate the complexity of living ecosystems."
      },
      {
            "title": "Look beyond a single scenic viewpoint",
            "text": "Nature is connected, and a landscape often changes just a few steps beyond the most beautiful viewpoint. A well-trodden path, a shady stream crossing and an area of dense vegetation may each tell a different part of the story. When you explore, ask how the pieces fit together rather than treating every photograph as a separate scene. Conservation is influenced by environmental conditions and by the practical realities of nearby communities. Avoid oversimplifying these relationships. A responsible visitor recognizes that the health of an ecosystem is not something that can be judged by the color green in one picture."
      },
      {
            "title": "Learn with local guidance",
            "text": "A guided field visit is an opportunity to listen, exchange questions and connect first impressions with local knowledge. A good guide can explain access rules, highlight subtle changes in habitats and show why responsible visitor behavior matters. Walk at a pace that allows the group to observe and discuss rather than rushing through a checklist. Respect any requests to stay on a path or avoid certain areas. The most memorable moment may be a conversation, an unexpected plant or a quiet pause to take in the forest. Learning with humility is more valuable than arriving with the expectation of having every answer."
      },
      {
            "title": "Move carefully around paths and waterways",
            "text": "Natural trails and stream crossings require attention both for personal safety and for habitat protection. Conditions can change after rain, and a route that looked simple may become slippery or unsafe. Follow local instructions, use permitted crossings and avoid damaging vegetation or riverbanks to take photographs. Make room for other walkers and do not overload a fragile structure. If the conditions are uncertain, it is better to reconsider the route than to force a crossing. Responsible access protects visitors and the places that make exploration possible. Care on a trail is an everyday expression of respect for the landscape."
      },
      {
            "title": "Turn inspiration into lasting respect",
            "text": "A meaningful conservation-focused visit continues after the final photograph. Think about what you learned, what remains uncertain and how you can share the experience without exaggerating its results. Credit local knowledge, describe places accurately and avoid presenting a single activity as proof of long-term success. Travelers can support responsible local guiding and make choices that respect communities and habitats. With HERY, conservation can be approached through patient observation, education and thoughtful exploration of Madagascar. The most valuable souvenir is not a staged encounter or a dramatic claim, but a deeper appreciation of the people and living environments that deserve ongoing care."
      }
]
  },
];



/* =========================================================
   FAQ
========================================================= */

const faqs = [
  ["Who is HERY?", "HERY is a local guide based in Morondava / Menabe, Madagascar. His field-based approach focuses on nature, photography, biodiversity and conservation."],
  ["What experiences are available?", "HERY offers private guiding, wildlife trips, photography outings, western Madagascar circuits, local logistics and tailor-made experiences."],
  ["Can photographers join the trips?", "Yes. Photography-focused experiences can include golden-hour landscapes, wildlife and night photography, with guidance suited to photographers."],
  ["Can I request a custom trip?", "Yes. Describe your plans, interests and travel dates using the contact form. HERY can discuss a trip tailored to your needs."],
  ["How does HERY approach conservation?", "HERY emphasizes community conservation, awareness, forest restoration and respectful wildlife encounters."],
];

const faqsFr = [
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


/* Separate French page translations; English remains the default. */
const frExtras = {
  trust: ["Expériences sélectionnées", "Adapté aux photographes", "Approche respectueuse", "Connaissance locale"],
  hero: { scroll: "Défiler", where: "Où aller ?", experience: "Expérience", wildlifePhoto: "Faune et photographie", night: "Nuit", astro: "Astrophotographie", start: "Commencer" },
  about: { photo: "Photographie", biodiversity: "Biodiversité", discover: "Découvrir HERY" },
  expertise: {
    kicker: "EXPERTISE DE TERRAIN",
    head1: "Cinq domaines,",
    head2: "une perspective locale.",
    intro: "Une approche fondée sur l'expérience et la connaissance du terrain.",
    pillars: [
      ["Faune sauvage", "Observation de la faune, des oiseaux et de la vie nocturne dans le respect de la nature."],
      ["Photographie", "Lumières dorées, faune, oiseaux et accompagnement des photographes."],
      ["Astrophotographie", "Voie lactée, étoiles, paysages nocturnes et poses longues."],
      ["Conservation", "Conservation communautaire, restauration forestière et sensibilisation."],
      ["Culture", "Patrimoine Sakalava, vie côtière, fady, respect et Madagascar rural."],
    ],
  },
  destinations: [
    "Baobabs, culture, côte et ouest de Madagascar",
    "Faune sauvage, forêt et expériences nocturnes",
    "Paysages emblématiques et lumières dorées inoubliables",
    "Formations géologiques, forêt, aventure et faune",
    "Paysages fluviaux, pirogues et vie locale",
    "Biodiversité et faune de l'est",
    "Forêt tropicale, lémuriens et biodiversité",
    "Forêt sèche et faune sauvage",
    "Voyages fluviaux et paysages",
    "Vie insulaire et découverte de la côte",
    "Côte, culture et nature",
    "Paysages, villages et route du sud",
  ],
  astro: { kicker: "CIELS NOCTURNES", features: ["Voie lactée", "Poses longues", "Photographie de nuit", "Baobabs sous les étoiles"] },
  conservation: {
    kicker: "CONSERVATION",
    text: "Une approche centrée sur la biodiversité et la conservation communautaire, avec sensibilisation, restauration forestière et expériences de terrain.",
    project: "Projet pilote de conservation de l'aye-aye et de restauration forestière",
    respect: "Respect", sub: "de la faune et des communautés",
  },
  culture: {
    kicker: "CULTURE",
    text: "Patrimoine Sakalava, vie côtière, fady et respect, vie rurale et évolutions environnementales.",
    quote: "« Personnel. Flexible. Sur le terrain. Éducatif. Respectueux des communautés. »",
  },
  services: {
    kicker: "EXPÉRIENCES HERY",
    intro: "Des expériences conçues autour du terrain et de vos centres d'intérêt.",
    cards: [
      ["Guidage privé", "Accompagnement personnalisé sur le terrain."],
      ["Observation de la faune", "Observation de la faune et découverte des habitats."],
      ["Sorties photo", "Sorties adaptées aux photographes et aux meilleurs moments de lumière."],
      ["Circuits dans l'ouest de Madagascar", "Morondava, Menabe et grands paysages de l'Ouest."],
      ["Logistique locale", "Accompagnement et orientation selon les réalités du terrain."],
      ["Expériences sur mesure", "Une expérience construite selon vos envies."],
    ],
  },
  faq: faqsFr,
  references: {
    kicker: "RÉFÉRENCES",
    title: "Une expérience ancrée sur le terrain.",
    text: "Références citées dans le portfolio : TripAdvisor Madagascar Local Tours, TripAdvisor Driver/Guide in Morondava et Instagram @mdg_tour.",
  },
  footer: {
    explore: "Explorer", about: "À propos", destinations: "Destinations",
    photography: "Photographie", blog: "Blog", services: "Services",
    guiding: "Guidage", wildlife: "Sorties faune", contact: "Contact",
    rights: "Tous droits réservés.",
  },
  blog: { kicker: "CARNET DE TERRAIN", back: "Retour aux articles", time: "de lecture" },
  contact: { name: "Votre nom", email: "vous@exemple.com", message: "Parlez-nous de votre projet..." },
};

/* =========================================================
   ADDITIONAL MALAGASY TEXT — KEEP DEFAULT ENGLISH INTACT
========================================================= */

const mgUI = {
  hero: { scroll: "Midina", where: "Ho aiza?", experience: "Traikefa", wildlifePhoto: "Bibidia sy sary", night: "Alina", astro: "Sary amin’ny alina", start: "Hanomboka" },
  trust: ["Traikefa voakarakara", "Mety ho an’ny mpaka sary", "Manaja ny natiora", "Fahalalana ny toerana"],
  about: { photo: "Fakàna sary", biodiversity: "Harena voajanahary", discover: "Fantaro i HERY" },
  expertise: {
    kicker: "FAHALALANA ENY IFOTONY",
    head1: "Andry dimy,",
    head2: "fomba fijery iray.",
    intro: "Traikefa tena izy, mifototra amin’ny fahalalana sy ny fiainana eny ifotony.",
    pillars: [
      ["Bibidia", "Fijerena bibidia sy vorona, fiainana amin’ny alina ary fitsidihana manaja ny natiora."],
      ["Fakàna sary", "Hazavan’ny maraina sy hariva, bibidia ary fanampiana ny mpaka sary."],
      ["Sary amin’ny alina", "Vahindanitra, kintana, tontolo amin’ny alina ary fakàna sary maharitra."],
      ["Fiarovana ny natiora", "Fiarovana iarahan’ny mponina, famerenana ala ary fanentanana."],
      ["Kolontsaina", "Lova Sakalava, fiainana amorontsiraka, fady ary fanajana ny fiarahamonina."],
    ],
  },
  destinations: [
    "Baobaba, kolontsaina, morontsiraka ary ny faritra andrefan’i Madagasikara",
    "Bibidia, ala ary fitsidihana amin’ny alina",
    "Tontolo miavaka sy hazavan’ny masoandro milentika tsy hay hadinoina",
    "Vatolampy tsy manam-paharoa, ala, fitsangatsanganana ary bibidia",
    "Renirano, lakana ary fiainan’ny mponina",
    "Harena voajanahary sy bibidia any atsinanana",
    "Ala mando, gidro ary karazan-javamananaina maro",
    "Ala maina sy bibidia miavaka",
    "Dia an-drenirano sy tontolo mahafinaritra",
    "Fiainana an-nosy sy fitsidihana amorontsiraka",
    "Morontsiraka, kolontsaina ary natiora",
    "Tontolo, vohitra ary lalana mankany atsimon’i Madagasikara",
  ],
  photos: [
    ["Bibidia eto Madagasikara", "BIBIDIA", "Bibidia · Madagasikara", "Fantaro ireo bibidia tsy fahita firy amin’ny fitsidihana manaja ny fonenany."],
    ["Baobaba eto Madagasikara", "BAOBABA", "Mangiran-dratsy feno zavona · Andrefan’i Madagasikara", "Ankafizo ny hakanton’ireo baobaba rehefa vao mangiran-dratsy: zavona malefaka sy lanitra mavokely ary aloky ny hazo tranainy mamorona tontolo mahavariana."],
    ["Alan’i Madagasikara", "ALA", "Tanalahy · Madagasikara", "Jereo akaiky ilay tanalahy maitso mipetraka eny amin'ny rantsankazo, iray amin'ireo zava-mahagaga sy lokon'ny zavaboary eto Madagasikara."],
    ["Morontsirak’i Madagasikara", "MORONTSIRAKA", "Fiainana an-nosy · Madagasikara", "Fantaro ny tora-pasika, ranomasina manga ary ny fiainan’ny mponina amorontsiraka."],
  ],
  astro: { kicker: "LANITRY NY ALINA", features: ["Vahindanitra", "Fakàna sary maharitra", "Fakàna sary amin’ny alina", "Baobaba sy lanitra feno kintana"] },
  conservation: { kicker: "FIAROVANA NY NATIORA", text: "Mifantoka amin’ny harena voajanahary sy ny fiarovana iarahan’ny mponina ny fomba fiasan’i HERY, miaraka amin’ny fanentanana sy famerenana ala.", project: "Fiarovana ny aye-aye sy famerenana amin’ny laoniny ny ala", respect: "Fanajana", sub: "ny bibidia sy ny mponina" },
  culture: { kicker: "KOLONTSAINA", text: "Lova Sakalava, fiainana amorontsiraka, fady sy fanajana ny fomba amam-panao, ny fiainana ambanivohitra ary ny fiovan’ny tontolo iainana.", quote: "“Ho anao manokana. Mora amboarina. Eny ifotony. Mampianatra. Manaja ny fiarahamonina.”" },
  services: {
    kicker: "TRAIKEFA HERY",
    intro: "Tolotra sy traikefa mifanaraka amin’ny zavatra mahaliana anao sy ny zava-misy eny ifotony.",
    cards: [
      ["Fitarihan-dalana manokana", "Fiarahana amin’ny mpitari-dalana araka ny filànao."],
      ["Fitsidihana bibidia", "Fijerena bibidia sy fahafantarana ny fonenany voajanahary."],
      ["Fitsangatsanganana haka sary", "Fitsidihana ho an’ny mpaka sary amin’ny fotoana tsara indrindra."],
      ["Dia any andrefan’i Madagasikara", "Morondava, Menabe ary ireo toerana mahafinaritra any andrefana."],
      ["Fanampiana eny an-toerana", "Fanomanana sy fandrindrana ny zavatra ilaina mandritra ny dia."],
      ["Traikefa namboarina ho anao", "Fitsangatsanganana mifanaraka amin’ny zavatra tianao ho hita."],
    ],
  },
  faq: [
    ["Iza i HERY?", "HERY dia mpitari-dalana monina ao Morondava / Menabe. Mifantoka amin’ny natiora, fakàna sary, harena voajanahary ary fiarovana ny tontolo iainana izy."],
    ["Inona avy ny traikefa azo atao?", "Fitarihan-dalana manokana, fitsidihana bibidia, fakàna sary, dia any andrefana, fanampiana eny an-toerana ary fitsangatsanganana araka ny safidinao."],
    ["Afaka mandray anjara ve ny mpaka sary?", "Eny. Misy fitsangatsanganana manokana amin’ny fakàna sary, amin’ny maraina sy hariva ary amin’ny alina."],
    ["Afaka mangataka dia mifanaraka amin’ny safidiko ve aho?", "Eny. Lazao amin’ny formulaire ny toerana, daty ary zavatra tianao ho hita, dia hiara-handamina izany aminao i HERY."],
    ["Ahoana no andraisan’i HERY anjara amin’ny fiarovana ny natiora?", "Manome lanja ny fiarovana ny ala sy bibidia, ny fanentanana ny mponina ary ny fitsidihana tsy manimba ny tontolo iainana izy."],
  ],
  references: { kicker: "LOHARANOM-PANAZAVANA", title: "Traikefa tena izy eny ifotony.", text: "Pejy ahitana fanazavana momba an’i HERY: TripAdvisor Madagascar Local Tours, TripAdvisor Driver/Guide in Morondava ary Instagram @mdg_tour." },
  footer: { explore: "Tsidiho", about: "Momba an’i HERY", destinations: "Toerana", photography: "Fakàna sary", blog: "Lahatsoratra", services: "Serivisy", guiding: "Fitarihan-dalana", wildlife: "Fitsidihana bibidia", contact: "Hifandray", rights: "Zo rehetra voatokana." },
  blog: { kicker: "TANTARA ENY IFOTONY", back: "Hiverina amin’ny lahatsoratra", time: "famakiana" },
  contact: { name: "Ny anaranao", email: "you@example.com", message: "Lazao eto ny dianao na ny fanontanianao..." },
};


const mgArticleTitles = [
  ["Bibidia ao Kirindy: mijery nefa tsy manelingelina", "Bibidia"],
  ["Fakàna sary ny baobaba amin’ny hazavana volamena", "Fakàna sary"],
  ["Fakàna sary amin’ny alina eto Madagasikara", "Sary amin’ny alina"],
  ["Fahafantarana ny fiarovana ny natiora eny ifotony", "Fiarovana ny natiora"],
];
const mgArticleIntros = [
  "Ao Kirindy dia zava-dehibe ny fijerena bibidia sady manaja ny fonenany voajanahary.",
  "Mampisongadina ny endriky ny baobaba ny hazavan’ny maraina sy hariva any andrefan’i Madagasikara.",
  "Mampiray ny lanitra feno kintana sy ny hakanton’ny tontolo ny fakàna sary amin’ny alina.",
  "Mifamatotra ny fiarovana ny ala, bibidia, mponina ary tontolo iainana.",
];
const mgArticleSections = [
  [
    ["Mandinika alohan’ny hanatonana", "Mila faharetana sy fanajana ny fijerena bibidia. Aza manelingelina ny biby fa diniho ao amin’ny fonenany."],
    ["Traikefa eny ifotony", "Miankina amin’ny fotoana, vanim-potoana sy fihetsiky ny biby ny zava-miseho ao Kirindy."],
    ["Maka sary tsy manelingelina", "Tandremo ny elanelana ary ialao ny fihetsika tampoka rehefa maka sary bibidia."],
    ["Fitsidihana tompon’andraikitra", "Manampy hahafantatra ny maha-zava-dehibe ny fiarovana ny ala sy ny bibidia ny fitsidihana."],
  ],
  [
    ["Fidio ny fotoana mety", "Ny maraina sy hariva no manome hazavana malefaka ho an’ny sary."],
    ["Ampidiro ny tontolo manodidina", "Azo ampidirina amin’ny sary ny lalana, lanitra ary olona manodidina ny baobaba."],
    ["Alamino ny endriky ny sary", "Mampisongadina ny haben’ny baobaba sy ny tontolo ny fandaminana tsara ny sary."],
    ["Omeo fotoana ny hazavana", "Miova haingana ny hazavana, koa tsara ny miandry sy mandinika."],
  ],
  [
    ["Fantaro ny lanitra amin’ny alina", "Lavitra ny hazavana be no ahitana tsara kokoa ny kintana sy Vahindanitra."],
    ["Ny lanitra sy ny tontolo", "Mampiaraka baobaba, ala na tendrombohitra ary lanitra ny sary amin’ny alina."],
    ["Ilaina ny faharetana", "Mila fiandrasana, fandrindrana ary réglage sahaza ny fakàna sary amin’ny alina."],
    ["Traikefa hafa eto Madagasikara", "Manana hatsarana manokana ny fahanginana sy ny lanitra feno kintana amin’ny alina."],
  ],
  [
    ["Fiarovana eny ifotony", "Mifamatotra ny ala, bibidia ary ny fiainan’ny mponina."],
    ["Harena voajanahary sy fonenana", "Manampy hiaro ny zavamananaina ny fitandrovana ny fonenany."],
    ["Fitsidihana manaja ny tontolo", "Mampihena ny fiantraikantsika amin’ny natiora ny fihetsika tompon’andraikitra."],
    ["Mahalala sy manentana", "Ny fahafantarana ny zava-misy eny ifotony dia manampy amin’ny fiarovana ny natiora."],
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
  const isMG = lang === "mg";
  const isFR = lang === "fr";

  // Supplement the nine native locales in carousels and sections.
  useEffect(() => activateExtraTranslations(lang), [lang]);

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
        <Hero t={t} go={go} isMG={isMG} isFR={isFR} />

        <TrustStrip t={t} isMG={isMG} isFR={isFR} />

        <About
          t={t}
          go={go}
          isMG={isMG}
          isFR={isFR}
        />

        <Expertise isMG={isMG} isFR={isFR} />

        {/* DESTINATIONS */}
        <section
          id="destinations"
          className="section section-soft"
        >
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">
                {isMG ? "TSIDIHO I MADAGASIKARA" : "EXPLORE MADAGASCAR"}
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
                  isMG={isMG}
                  isFR={isFR}
                />
              ))
            ) : (
              <div className="empty-search">
                <Search size={28} />

                <h3>
                  {isMG ? "Tsy nahitana toerana" : isFR ? "Aucune destination trouvée" : "No destinations found"}
                </h3>

                <p>
                  {isMG ? "Andramo Morondava, Kirindy, Tsingy na Nosy Be." : isFR ? "Essayez Morondava, Kirindy, Tsingy ou Nosy Be." : "Try Morondava, Kirindy, Tsingy or Nosy Be."}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Discoverable editorial pages with real URLs for Google and visitors */}
        <section id="guided-tours" className="section seo-tours" aria-labelledby="seo-tours-title">
          <div className="seo-tours-head">
            <span className="eyebrow">{isMG ? "DIA SY MPITARI-DALANA" : isFR ? "CIRCUITS ET GUIDES LOCAUX" : "TOURS & LOCAL GUIDING"}</span>
            <h2 id="seo-tours-title">{isMG ? "Jereo ny dianao eto Madagasikara" : isFR ? "Découvrez nos circuits à Madagascar" : "Explore Madagascar with HERY"}</h2>
            <p>{isMG ? "Fantaro ny toerana sy ny traikefa azo atao miaraka amin'ny mpitari-dalana ao Morondava." : isFR ? "Découvrez nos guides dédiés aux circuits privés, à Morondava, aux baobabs, à Kirindy et aux Tsingy." : "Plan private guided tours, encounter extraordinary wildlife and explore the remarkable landscapes of western Madagascar."}</p>
          </div>
          <div className="seo-tour-grid">
            {seoTourPages.map((tour) => (
              <a className="seo-tour-card" key={tour.slug} href={`/${tour.slug}`}>
                <span className="seo-tour-image">
                  <img src={tour.image} alt={tour.title} loading="lazy" decoding="async" />
                </span>
                <span className="seo-tour-copy">
                  <span className="seo-tour-kicker">HERY MADAGASCAR LOCAL GUIDE</span>
                  <strong>{tour.title}</strong>
                  <span className="seo-tour-description">{tour.desc}</span>
                  <span className="seo-tour-action">{isMG ? "Hijery ny antsipiriany" : isFR ? "Découvrir le circuit" : "Explore this experience"} <ArrowRight size={16} /></span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <PhotoSection
          t={t}
          go={go}
          isMG={isMG}
          isFR={isFR}
        />

        <AstroSection t={t} isMG={isMG} isFR={isFR} />

        <Conservation t={t} isMG={isMG} isFR={isFR} />

        <Culture t={t} isMG={isMG} isFR={isFR} />

        <Services
          t={t}
          go={go}
          isMG={isMG}
          isFR={isFR}
        />

        <HiddenMomentsExperience
          lang={lang}
          onContact={() => go("contact")}
        />

        <FieldJourneyVideo
          lang={lang}
          onContact={() => go("contact")}
        />

        <Blog
          t={t}
          lang={lang}
          isMG={isMG}
          isFR={isFR}
        />

        <Offer
          t={t}
          go={go}
        />

        <FAQ
          t={t}
          lang={lang}
          isMG={isMG}
          isFR={isFR}
        />

        <References isMG={isMG} isFR={isFR} />

        <Contact
          t={t}
          lang={lang}
          isMG={isMG}
          isFR={isFR}
        />
      </main>

      <PartnersStrip lang={lang} />

      <Footer
        t={t}
        go={go}
        isMG={isMG}
        isFR={isFR}
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
          className="brand brand-with-logo"
          onClick={() => go("home")}
          aria-label="HERY Madagascar Local Guide — Home"
        >
          <span className="brand-emblem">
            <img src="/images/hery-emblem.svg" alt="" width="56" height="56" decoding="async" />
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
            className="language-select"
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

const HERY_REAL_HERO_PHOTOS = [
  "/images/hero-couverture/cover-1.avif",
  "/images/hero-couverture/cover-2.avif",
  "/images/hero-couverture/cover-3.avif",
  "/images/hero-couverture/cover-4.avif",
  "/images/hero-couverture/cover-5.avif",
];
const HERY_HERO_DELAY = 4000;

function Hero({ t, go, isMG, isFR }) {
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    const timer = window.setTimeout(
      () => setHeroIndex(i => (i + 1) % HERY_REAL_HERO_PHOTOS.length),
      HERY_HERO_DELAY
    );
    return () => window.clearTimeout(timer);
  }, [heroIndex]);
  useEffect(() => {
    const photo = new Image();
    photo.src = HERY_REAL_HERO_PHOTOS[(heroIndex + 1) % HERY_REAL_HERO_PHOTOS.length];
  }, [heroIndex]);

  const step = direction => setHeroIndex(i =>
    (i + direction + HERY_REAL_HERO_PHOTOS.length) % HERY_REAL_HERO_PHOTOS.length
  );
  const labels = isMG
    ? {previous: "Sary teo aloha", next: "Sary manaraka", photo: "Sarin'ny Accueil"}
    : isFR
      ? {previous: "Photo précédente", next: "Photo suivante", photo: "Photos d'accueil"}
      : {previous: "Previous photo", next: "Next photo", photo: "Homepage photographs"};

  return (
    <section id="home" className="hero">
      <div className="hery-hero-slideshow" role="region" aria-roledescription="carousel" aria-label={labels.photo}>
        {HERY_REAL_HERO_PHOTOS.map((src, index) => (
          <img key={src} src={src} alt="" aria-hidden="true"
            className={`hery-hero-photo${heroIndex === index ? " is-active" : ""}`}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            onError={event => {
              if (!event.currentTarget.src.endsWith("/images/hero.jpg")) {
                event.currentTarget.src = "/images/hero.jpg";
              }
            }}
          />
        ))}
      </div>

      <div className="hero-overlay" />

      <div className="hery-hero-controls">
        <button type="button" aria-label={labels.previous} onClick={() => step(-1)}>
          <ArrowLeft size={18} />
        </button>
        <button type="button" aria-label={labels.next} onClick={() => step(1)}>
          <ArrowRight size={18} />
        </button>
      </div>
      <div className="hery-hero-dots" role="group" aria-label={labels.photo}>
        {HERY_REAL_HERO_PHOTOS.map((src, index) => (
          <button key={src} type="button"
            className={heroIndex === index ? "is-active" : ""}
            aria-label={`${labels.photo} ${index + 1}`}
            aria-current={heroIndex === index ? "true" : undefined}
            onClick={() => setHeroIndex(index)}
          />
        ))}
      </div>

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
        {isMG ? mgUI.hero.scroll : isFR ? frExtras.hero.scroll : "Scroll"}
      </div>

      <div className="hero-card reveal">
        <div>
          <MapPin />

          <small>
            {isMG ? mgUI.hero.where : isFR ? frExtras.hero.where : "Where to?"}
          </small>

          <b>
            Morondava / Menabe
          </b>
        </div>

        <div>
          <Camera />

          <small>
            {isMG ? mgUI.hero.experience : isFR ? frExtras.hero.experience : "Experience"}
          </small>

          <b>
            {isMG ? mgUI.hero.wildlifePhoto : isFR ? frExtras.hero.wildlifePhoto : "Wildlife & Photo"}
          </b>
        </div>

        <div>
          <Moon />

          <small>
            {isMG ? mgUI.hero.night : isFR ? frExtras.hero.night : "Night"}
          </small>

          <b>
            {isMG ? mgUI.hero.astro : isFR ? frExtras.hero.astro : "Astrophotography"}
          </b>
        </div>

        <button
          onClick={() =>
            go("contact")
          }
        >
          {isMG ? mgUI.hero.start : isFR ? frExtras.hero.start : "Start"}

          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}


/* =========================================================
   TRUST STRIP
========================================================= */

function TrustStrip({ t, isMG, isFR }) {
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
              {isMG ? mgUI.trust[index] : isFR ? frExtras.trust[index] : subtitles[index]}
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

function About({ t, go, isMG, isFR }) {
  return (
    <section
      id="about"
      className="section about"
    >
      <div className="about-photo reveal">
        <img
          src={imgs.profile}
          alt="Ring-tailed lemurs resting together against a Madagascar landscape"
          loading="lazy"
          decoding="async"
          style={{ objectPosition: "66% center" }}
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
            {isMG ? mgUI.about.photo : isFR ? frExtras.about.photo : "Photography"}
          </span>

          <span>
            <Leaf />
            {isMG ? mgUI.about.biodiversity : isFR ? frExtras.about.biodiversity : "Biodiversity"}
          </span>
        </div>

        <button
          className="btn btn-dark"
          onClick={() =>
            go("expertise")
          }
        >
          {isMG ? mgUI.about.discover : isFR ? frExtras.about.discover : "Discover HERY"}

          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}


/* =========================================================
   EXPERTISE
========================================================= */

function Expertise({ isMG, isFR }) {
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
            {isMG ? mgUI.expertise.kicker : isFR ? frExtras.expertise.kicker : "FIELD-BASED EXPERTISE"}
          </span>

          <h2>
            {isMG ? mgUI.expertise.head1 : isFR ? frExtras.expertise.head1 : "Five pillars,"}
            <br />
            {isMG ? mgUI.expertise.head2 : isFR ? frExtras.expertise.head2 : "one local perspective."}
          </h2>

          <p>
            {isMG ? mgUI.expertise.intro : isFR ? frExtras.expertise.intro : "A field-based approach rooted in real-world experience and local knowledge."}
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
              key={isMG ? mgUI.expertise.pillars[index][0] : title}
            >
              <span className="num">
                0{index + 1}
              </span>

              <Icon />

              <h3>
                {isMG ? mgUI.expertise.pillars[index][0] : isFR ? frExtras.expertise.pillars[index][0] : title}
              </h3>

              <p>
                {isMG ? mgUI.expertise.pillars[index][1] : isFR ? frExtras.expertise.pillars[index][1] : text}
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
  isMG,
  isFR,
}) {
  const [sainteMarieScene, setSainteMarieScene] = useState(null);
  const [rn7Scene, setRn7Scene] = useState(null);
  const [tsingyScene, setTsingyScene] = useState(null);
  const [menabeScene, setMenabeScene] = useState(null);
  const [andasibeScene, setAndasibeScene] = useState(null);
  const [palmariumScene, setPalmariumScene] = useState(null);
  const [northScene, setNorthScene] = useState(null);
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
        {d[0] === "Morondava & Menabe" ? (
          <MenabeGallery lang={isMG ? "mg" : isFR ? "fr" : "en"} onSceneChange={setMenabeScene} />
        ) : d[0] === "Avenue of Baobabs" ? (
          <BaobabGallery lang={isMG ? "mg" : isFR ? "fr" : "en"} compact />
        ) : d[0] === "Sainte Marie" ? (
          <SainteMarieGallery lang={isMG ? "mg" : isFR ? "fr" : "en"} onSceneChange={setSainteMarieScene} />
        ) : d[0] === "RN7" ? (
          <RN7Gallery lang={isMG ? "mg" : isFR ? "fr" : "en"} onSceneChange={setRn7Scene} />
        ) : d[0] === "Tsingy de Bemaraha" ? (
          <TsingyGallery lang={isMG ? "mg" : isFR ? "fr" : "en"} onSceneChange={setTsingyScene} />
        ) : d[0] === "Kirindy Forest" ? (
          <KirindyGallery lang={isMG ? "mg" : isFR ? "fr" : "en"} />
        ) : d[0] === "Andasibe & Eastern Madagascar" ? (
          <AndasibeGallery lang={isMG ? "mg" : isFR ? "fr" : "en"} onSceneChange={setAndasibeScene} />
        ) : d[0] === "Palmarium / Ankan'ny Nofy" ? (
          <PalmariumGallery lang={isMG ? "mg" : isFR ? "fr" : "en"} onSceneChange={setPalmariumScene} />
        ) : d[0] === "Northern Madagascar" ? (
          <NorthernMadagascarGallery lang={isMG ? "mg" : isFR ? "fr" : "en"} onSceneChange={setNorthScene} />
        ) : d[0] === "Manambolo River & Gorge" ? (
          <ManamboloGallery lang={isMG ? "mg" : isFR ? "fr" : "en"} />
        ) : (
          <img src={d[2]} alt={d[0]} loading="lazy" />
        )}

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

        {d[0] === "Northern Madagascar" ? (
          <div className="north-story"
            key={"north-" + (northScene?.id || 1) + "-" + (isMG ? "mg" : isFR ? "fr" : "en")}
            aria-live="off">
            <small>{northScene?.kicker || (isMG ? "BIBY MAHAY MIAFINA" : isFR ? "CACHÉ À LA VUE DE TOUS" : "HIDDEN IN PLAIN SIGHT")}</small>
            <strong>{northScene?.title || (isMG ? "Mahay miafina amin'ny hodi-kazo" : isFR ? "Un petit maître du camouflage" : "A tiny master of disguise")}</strong>
            <p>{northScene?.description || (isMG ? "Diniho tsara ny hazo: saika tsy hita mihitsy ity biby mandady kely ity noho ny lokony." : isFR ? "Regardez l'écorce de près : ce petit reptile se fond presque parfaitement dans son environnement." : "Look closely at the tree bark: this little reptile almost disappears into its natural surroundings.")}</p>
          </div>
        ) : d[0] === "Palmarium / Ankan'ny Nofy" ? (
          <div
            className="palmarium-detail"
            key={"palmarium-" + (palmariumScene?.id || 1) + "-" + (isMG ? "mg" : isFR ? "fr" : "en")}
            aria-live="off"
          >
            <small>{palmariumScene?.kicker || (isMG ? "HAKANTON'NY BIBY" : isFR ? "PORTRAIT SAUVAGE" : "A PORTRAIT OF THE WILD")}</small>
            <strong>{palmariumScene?.title || (isMG ? "Maso mampitolagaga" : isFR ? "Un regard inoubliable" : "Eyes full of wonder")}</strong>
            <p>{palmariumScene?.description || (isMG ? "Maso mivolombolamena sy volo mena no mampiavaka ity gidro ity. Fantaro akaiky ireo biby miavaka ao anaty ala." : isFR ? "Ses yeux dorés et sa fourrure rousse rendent ce portrait de lémurien fascinant." : "Golden eyes and a russet ruff make this lemur portrait impossible to forget.")}</p>
          </div>
        ) : d[0] === "Andasibe & Eastern Madagascar" ? (
          <div
            className="andasibe-story"
            key={"andasibe-" + (andasibeScene?.id || 1) + "-" + (isMG ? "mg" : isFR ? "fr" : "en")}
            aria-live="off"
          >
            <small>{andasibeScene?.kicker || (isMG ? "MASO MIFANKAHITA" : isFR ? "FACE À FACE" : "FACE TO FACE")}</small>
            <strong>{andasibeScene?.title || (isMG ? "Fijery mahafinaritra ao anaty ala" : isFR ? "Un regard qui raconte la forêt" : "A curious forest gaze")}</strong>
            <p>{andasibeScene?.description || (isMG ? "Jereo akaiky ny mason'ny gidro ary ankafizo ny hakanton'ny ala velona eto Madagasikara." : isFR ? "Croisez le regard expressif d'un lémurien et ressentez la magie des forêts malgaches." : "Meet the expressive eyes of a lemur and feel the magic of Madagascar's living forests.")}</p>
          </div>
        ) : d[0] === "Morondava & Menabe" ? (
          <div className="menabe-detail"
            key={"menabe-" + (menabeScene?.id || 1) + "-" + (isMG ? "mg" : isFR ? "fr" : "en")} aria-live="off">
            <small>{menabeScene?.kicker || (isMG ? "DIA FENO ZAVA-BAOVAO" : isFR ? "ESPRIT D'AVENTURE" : "A SENSE OF ADVENTURE")}</small>
            <strong>{menabeScene?.title || (isMG ? "Dia miavaka tsy hay hadinoina" : isFR ? "Une aventure hors du commun" : "A journey beyond the ordinary")}</strong>
            <p>{menabeScene?.description || (isMG ? "Fantaro ny lafiny hafa amin'i Madagasikara, ny tontolo mahavariana ary ny fotoana tena izy." : isFR ? "Découvrez une autre facette de Madagascar : des paysages remarquables et des instants à vivre pleinement." : "Discover another side of Madagascar: remarkable landscapes and real moments worth experiencing.")}</p>
          </div>
        ) : d[0] === "Tsingy de Bemaraha" ? (
          <div
            className="tsingy-detail"
            key={"tsingy-" + (tsingyScene?.id || 1) + "-" + (isMG ? "mg" : isFR ? "fr" : "en")}
            aria-live="off"
          >
            <small>{tsingyScene?.kicker || (isMG ? "FITADIAVANA ZAVA-BAOVAO" : isFR ? "L'ART D'EXPLORER" : "THE ART OF EXPLORATION")}</small>
            <strong>{tsingyScene?.title || (isMG ? "Fiainana miafina eny anaty vato" : isFR ? "Une vie cachée dans les rochers" : "Life hidden among the rocks")}</strong>
            <p>{tsingyScene?.description || (isMG ? "Diniho akaiky: na dia ny vatolampy aza dia misy zava-mahatalanjona tokony ho fantarina." : isFR ? "Regardez de plus près : même le monde minéral des tsingy recèle des trésors inattendus." : "Look closer: even the rugged limestone world holds extraordinary details waiting to be discovered.")}</p>
          </div>
        ) : d[0] === "Sainte Marie" ? (
          <div
            className="sainte-marie-detail"
            key={`${sainteMarieScene?.id || 1}-${isMG ? "mg" : isFR ? "fr" : "en"}`}
            aria-live="off"
          >
            <small>{sainteMarieScene?.kicker || (isMG ? "FITSAHARAM-PANAHY" : isFR ? "ÉVASION INSULAIRE" : "ISLAND ESCAPE")}</small>
            <strong>{sainteMarieScene?.title || (isMG ? "Toerana ifanenan'ny lanitra sy ny ranomasina" : isFR ? "Là où le ciel rejoint la mer" : "Where the sky meets the sea")}</strong>
            <p>{sainteMarieScene?.description || (isMG ? "Masoandro mody mamirapiratra, lakana ary fotoana tsy hay hadinoina." : isFR ? "Couchers de soleil dorés, bateaux de pêche et instants inoubliables." : "Golden sunsets, fishing boats and moments you'll wish could last forever.")}</p>
          </div>
        ) : d[0] === "RN7" ? (
          <div
            className="rn7-detail"
            key={`${rn7Scene?.id || 1}-${isMG ? "mg" : isFR ? "fr" : "en"}`}
            aria-live="off"
          >
            <small>{rn7Scene?.kicker || (isMG ? "FIHAONANA AMIN'NY MAKI" : isFR ? "RENCONTRE AVEC LES LÉMURIENS" : "LEMUR ENCOUNTERS")}</small>
            <strong>{rn7Scene?.title || (isMG ? "Hihaona amin'ireo maki mahavariana" : isFR ? "Rencontrez les makis de Madagascar" : "Meet Madagascar's ring-tailed lemurs")}</strong>
            <p>{rn7Scene?.description || (isMG ? "Jereo akaiky ny maki manana rambony misy tsipika mainty sy fotsy. Ny fihetsiny sy ny fijeriny dia mamela fahatsiarovana mamy." : isFR ? "Un groupe de lémuriens à queue annelée vous invite à l'observation. Leurs regards et leurs queues rayées rendent la rencontre inoubliable." : "A family of iconic makis greets the curious traveller. Their striped tails and expressive faces make each encounter special.")}</p>
          </div>
        ) : (
        <p>
          {d[0] === "Manambolo River & Gorge"
            ? (isMG
              ? "Lohasaha mahavariana, fiampitana renirano ary dia tsy hay hadinoina."
              : isFR
                ? "Gorges spectaculaires, traversées fluviales et rencontres authentiques."
                : "Spectacular river gorges, scenic crossings and unforgettable local encounters.")
            : isMG ? mgUI.destinations[i] || d[1] : isFR ? frExtras.destinations[i] || d[1] : d[1]}
        </p>
        )}

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

function PhotoSection({ t, isMG, isFR }) {
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
      image: "/images/photography/baobabs-misty-dawn.webp",
      title: "Baobabs Madagascar",
      label: "BAOBABS",
      location: "Misty dawn · Western Madagascar",
      description: "Discover the quiet magic of Madagascar's baobabs at first light: soft morning mist, pale rose skies and ancient silhouettes create an unforgettable scene before the day begins.",
    },
    {
      image: "/images/photography/madagascar-forest-chameleon.webp",
      title: "Madagascar Forest",
      label: "FOREST",
      location: "Chameleon · Madagascar",
      description: "Look closer at the hidden life of Madagascar's forests: a beautiful green chameleon resting among the branches reveals the extraordinary colors of island wildlife.",
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

  const displayPhotos = isMG
    ? photos.map((photo, index) => ({
        ...photo,
        title: mgUI.photos[index][0],
        label: mgUI.photos[index][1],
        location: mgUI.photos[index][2],
        description: mgUI.photos[index][3],
      }))
    : isFR
      ? photos.map((photo, index) => index === 1 ? ({
          ...photo,
          location: "Aube brumeuse · Ouest de Madagascar",
          description: "Découvrez la magie des baobabs aux premières lueurs du jour : une brume délicate, un ciel rosé et des silhouettes majestueuses créent un paysage inoubliable."
        }) : photo)
      : photos;

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
            <span className="eyebrow">{isMG ? "FAKÀNA SARY" : "PHOTOGRAPHY"}</span>

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
          {displayPhotos.map((photo, index) => (
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
              <div className={index === 2 ? "premium-photo-image premium-photo-image--forest" : "premium-photo-image"}>
                {index === 2 && (
                  <div
                    className="premium-photo-backdrop"
                    style={{ backgroundImage: `url(${photo.image})` }}
                    aria-hidden="true"
                  />
                )}
                <img
                  src={photo.image}
                  alt={index === 2 ? "Green chameleon on a branch in Madagascar's forest" : photo.title}
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
          aria-label={displayPhotos[selected].title}
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
              aria-label={isMG ? "Hikatona" : "Close"}
            >
              ×
            </button>

            <div className="photo-lightbox-image-wrap">
              <img
                src={displayPhotos[selected].image}
                alt={selected === 2 ? "Green chameleon on a branch in Madagascar's forest" : displayPhotos[selected].title}
                className="photo-lightbox-image"
              />
            </div>

            <div className="photo-lightbox-info">
              <div className="photo-lightbox-meta">
                <span className="photo-lightbox-label">
                  {displayPhotos[selected].label}
                </span>

                <span className="photo-lightbox-count">
                  {String(selected + 1).padStart(2, "0")} /{" "}
                  {String(photos.length).padStart(2, "0")}
                </span>
              </div>

              <h3>{displayPhotos[selected].title}</h3>

              <span className="photo-lightbox-location">
                {displayPhotos[selected].location}
              </span>

              <p>{displayPhotos[selected].description}</p>

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
                ← <span>{isMG ? "Teo aloha" : "Previous"}</span>
              </button>

              <button
                type="button"
                className="photo-lightbox-nav"
                onClick={nextPhoto}
                aria-label="Next photo"
              >
                <span>{isMG ? "Manaraka" : "Next"}</span> →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AstroSection({ t, isMG, isFR }) {
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
          {isMG ? mgUI.astro.kicker : isFR ? frExtras.astro.kicker : "NIGHT SKIES"}
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
            {isMG ? mgUI.astro.features[0] : isFR ? frExtras.astro.features[0] : "Milky Way"}
          </span>

          <span>
            <Star />
            {isMG ? mgUI.astro.features[1] : isFR ? frExtras.astro.features[1] : "Long exposures"}
          </span>

          <span>
            <Camera />
            {isMG ? mgUI.astro.features[2] : isFR ? frExtras.astro.features[2] : "Night photography"}
          </span>

          <span>
            <Sparkles />
            {isMG ? mgUI.astro.features[3] : isFR ? frExtras.astro.features[3] : "Baobab nightscapes"}
          </span>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   CONSERVATION
========================================================= */

function Conservation({ t, isMG, isFR }) {
  return (
    <section
      id="conservation"
      className="section conservation"
    >
      <div className="conservation-copy reveal">
        <span className="eyebrow">
          {isMG ? mgUI.conservation.kicker : isFR ? frExtras.conservation.kicker : "CONSERVATION"}
        </span>

        <h2>
          {t.conservationTitle}
        </h2>

        <p>
          {isMG ? mgUI.conservation.text : isFR ? frExtras.conservation.text : "A field-based approach to biodiversity and community conservation, including awareness, forest restoration and wildlife protection."}
        </p>

        <div className="conservation-card">
          <ShieldCheck />

          <div>
            <b>
              Vohibola Avotra
            </b>

            <span>
              {isMG ? mgUI.conservation.project : isFR ? frExtras.conservation.project : "Pilot aye-aye conservation & forest restoration"}
            </span>
          </div>
        </div>
      </div>

      <div className="conservation-image conservation-slider-host reveal">
        <ConservationGallery
          lang={isMG ? "mg" : isFR ? "fr" : "en"}
          fallback={imgs.forest}
        />

        <div className="floating-stat">
          <TreePine />

          <strong>
            {isMG ? mgUI.conservation.respect : isFR ? frExtras.conservation.respect : "Respect"}
          </strong>

          <span>
            {isMG ? mgUI.conservation.sub : isFR ? frExtras.conservation.sub : "wildlife & communities"}
          </span>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   CULTURE
========================================================= */

function Culture({ t, isMG, isFR }) {
  return (
    <section id="culture" className="section culture-showcase-section">
      <CultureShowcase lang={isMG ? "mg" : isFR ? "fr" : "en"} />
    </section>
  );
}


/* =========================================================
   SERVICES
========================================================= */

function Services({ t, go, isMG, isFR }) {
  return (
    <section
      id="services"
      className="section section-soft"
    >
      <div className="section-head reveal">
        <div>
          <span className="eyebrow">
            {isMG ? mgUI.services.kicker : isFR ? frExtras.services.kicker : "HERY EXPERIENCE"}
          </span>

          <h2>
            {t.servicesTitle}
          </h2>

          <p>
            {isMG ? mgUI.services.intro : isFR ? frExtras.services.intro : "Field-based experiences designed around your interests and travel plans."}
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
                {isMG ? mgUI.services.cards[index][0] : isFR ? frExtras.services.cards[index][0] : title}
              </h3>

              <p>
                {isMG ? mgUI.services.cards[index][1] : isFR ? frExtras.services.cards[index][1] : text}
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

      <div className="hm-service-invite">
        <span>{isMG ? "Te hiaina fotoana miavaka eo ambanin'ny baobab ve ianao?" : isFR ? "Envie d'un moment privilégié parmi les baobabs ?" : "Looking for something more personal than an ordinary tour?"}</span>
        <button type="button" onClick={() => go("hidden-moments")}>
          {isMG ? "Fantaro ny fotoana manokana" : isFR ? "Découvrir nos instants privilégiés" : "Explore our hidden moments"}
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}


/* =========================================================
   BLOG
========================================================= */

function Blog({ t, lang, isMG, isFR }) {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const readerRef = useRef(null);
  const [autoReading, setAutoReading] = useState(false);

  // Always derive the opened article from the selected language.
  // Switching languages while the reader is open refreshes its heading and intro.
  const localizedPosts = useMemo(() => {
    const translated = expandedLocaleContent[lang]?.articles;
    const sectionTranslations = localizedBlogSections[lang];
    return posts.map((post, i) => {
      if (lang === "en") return post;
      const metadata = isMG
        ? [mgArticleTitles[i][0], mgArticleTitles[i][1], mgArticleIntros[i]]
        : (translated?.[i] || [post.title, post.category, post.intro]);
      const sections = post.sections.map((section, j) => {
        const translation = sectionTranslations?.[i]?.[j];
        return translation
          ? { ...section, title: translation[0], text: translation[1] }
          : section;
      });
      return {
        ...post,
        title: metadata[0],
        category: metadata[1],
        intro: metadata[2],
        sections,
      };
    });
  }, [lang, isMG]);
  const selectedPost = useMemo(
    () => localizedPosts.find(post => post.id === selectedPostId) || null,
    [localizedPosts, selectedPostId]
  );

  // Photography: scroll the entire article (hero, image stories and descriptions)
  // instead of only the inner text pane. The image carousel remains on its own
  // independent 4-second timer.
  useEffect(() => {
    if (selectedPost?.id !== "photographier-baobabs" || !autoReading) return;
    const reader = readerRef.current;
    if (!reader || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let startDelay = 0;
    let previousTime = 0;
    const scrollWithStory = (timestamp) => {
      const elapsed = previousTime ? Math.min(timestamp - previousTime, 50) : 0;
      previousTime = timestamp;
      const end = Math.max(0, reader.scrollHeight - reader.clientHeight);
      if (reader.scrollTop >= end - 1) {
        setAutoReading(false);
        return;
      }
      reader.scrollTop = Math.min(end, reader.scrollTop + elapsed * 0.065);
      frame = window.requestAnimationFrame(scrollWithStory);
    };
    startDelay = window.setTimeout(() => {
      frame = window.requestAnimationFrame(scrollWithStory);
    }, 1100);
    return () => {
      window.clearTimeout(startDelay);
      window.cancelAnimationFrame(frame);
    };
  }, [selectedPost?.id, autoReading]);

  useEffect(() => {
    if (!selectedPost || !(["wildlife-kirindy","conservation-terrain"].includes(selectedPost.id)) || !autoReading) return;
    const reader = readerRef.current;
    if (!reader || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let delay = 0;
    let lastTime = 0;
    const animateReading = (now) => {
      const elapsed = lastTime ? Math.min(now - lastTime, 50) : 0;
      lastTime = now;
      const maxScroll = Math.max(0, reader.scrollHeight - reader.clientHeight);
      if (reader.scrollTop < maxScroll - 1) {
        reader.scrollTop = Math.min(maxScroll, reader.scrollTop + elapsed * 0.038);
        frame = window.requestAnimationFrame(animateReading);
      }
    };
    delay = window.setTimeout(() => {
      frame = window.requestAnimationFrame(animateReading);
    }, 1200);
    return () => {
      window.clearTimeout(delay);
      window.cancelAnimationFrame(frame);
    };
  }, [selectedPost?.id, autoReading]);

  /* =======================================================
     OPEN ARTICLE
  ======================================================= */

  const openArticle = (post) => {
    setSelectedPostId(post.id);
    setAutoReading(["wildlife-kirindy","conservation-terrain","photographier-baobabs"].includes(post.id));
    document.body.style.overflow = "hidden";
  };

  /* =======================================================
     CLOSE ARTICLE
  ======================================================= */

  const closeArticle = () => {
    setSelectedPostId(null);
    setAutoReading(false);
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
              {isMG ? mgUI.blog.kicker : "FIELD NOTES"}
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
          {localizedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className={
                index === 0 || post.id === "conservation-terrain"
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
                {post.id === "wildlife-kirindy" ? (
                  <WildlifeFeaturedPreview post={post} readLabel={t.readArticle} isMG={isMG} isFR={isFR} />
                ) : post.id === "conservation-terrain" ? (
                  <ConservationFeaturedPreview post={post} readLabel={t.readArticle} isMG={isMG} isFR={isFR} />
                ) : post.id === "photographier-baobabs" ? (
                  <PhotographyFeaturedPreview post={post} readLabel={t.readArticle} isMG={isMG} isFR={isFR} />
                ) : (
                  <>
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

                    {post.duration} {isMG ? mgUI.blog.time : "read"}
                  </span>

                  <h3>
                    {post.title}
                  </h3>

                  <span className="post-read">
                    {t.readArticle}

                    <ArrowRight size={14} />
                  </span>
                </div>
                  </>
                )}
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
              className={"article-reader" + (["wildlife-kirindy","conservation-terrain"].includes(selectedPost.id) ? " kirindy-auto-reader" : selectedPost.id === "photographier-baobabs" ? " photography-auto-reader" : "")}
              ref={readerRef}
              onWheel={selectedPost.id === "photographier-baobabs" ? () => setAutoReading(false) : undefined}
              onTouchStart={selectedPost.id === "photographier-baobabs" ? () => setAutoReading(false) : undefined}
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
                    {isMG ? mgUI.blog.back : "Back to articles"}
                  </span>
                </button>


                {["wildlife-kirindy","conservation-terrain","photographier-baobabs"].includes(selectedPost.id) && (
                  <button
                    type="button"
                    className="article-autoread-toggle"
                    aria-pressed={autoReading}
                    onClick={() => setAutoReading(v => !v)}
                  >
                    {autoReading ? <Pause size={15} /> : <Play size={15} />}
                    <span>{autoReading ? (isMG ? "Ajanona ny fiakarana" : isFR ? "Pause du défilement" : "Pause auto-scroll") : (isMG ? "Tohizo ny fiakarana" : isFR ? "Reprendre le défilement" : "Resume auto-scroll")}</span>
                  </button>
                )}

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

              {selectedPost.id === "photographier-baobabs" ? (
                <PhotographyArticleHero post={selectedPost} isMG={isMG} isFR={isFR} />
              ) : (
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
                      {selectedPost.duration} {isMG ? mgUI.blog.time : "read"}
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
              )}


              {/* =================================================
                  ARTICLE CONTENT
              ================================================= */}

              <div className="article-content">

                {/* INTRO */}

                <p className="article-intro">
                  {selectedPost.intro}
                </p>


                {selectedPost.id === "wildlife-kirindy" && (
                  <WildlifeArticleGallery lang={isMG ? "mg" : "en"} sections={selectedPost.sections || []} />
                )}
                {selectedPost.id === "conservation-terrain" && (
                  <ConservationArticleGallery lang={isMG ? "mg" : isFR ? "fr" : "en"} sections={selectedPost.sections || []} />
                )}
                {selectedPost.id === "photographier-baobabs" && (
                  <PhotographyArticleScenes lang={isMG ? "mg" : isFR ? "fr" : "en"} />
                )}

                {/* SECTIONS */}

                {!["wildlife-kirindy","conservation-terrain"].includes(selectedPost.id) && selectedPost.sections?.map(
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

                    {isMG ? mgUI.blog.back : "Back to articles"}

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

function FAQ({ t, lang, isMG, isFR }) {
  const [open, setOpen] =
    useState(0);

  const visibleFaqs = expandedLocaleContent[lang]?.faq || (isMG ? mgUI.faq : isFR ? frExtras.faq : faqs);

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
        {visibleFaqs.map(
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

function References({ isMG, isFR }) {
  return (
    <section
      id="references"
      className="section references"
    >
      <div className="reference-card reveal">
        <span className="eyebrow">
          {isMG ? mgUI.references.kicker : isFR ? frExtras.references.kicker : "REFERENCES"}
        </span>

        <h2>
          {isMG ? mgUI.references.title : isFR ? frExtras.references.title : "Built on field experience."}
        </h2>

        <p>
          {isMG ? mgUI.references.text : isFR ? frExtras.references.text : "References featured in the portfolio: TripAdvisor Madagascar Local Tours, TripAdvisor Driver/Guide in Morondava and Instagram @mdg_tour."}
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
            <InstagramIcon size={18} />

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

function Contact({ t, lang, isMG, isFR }) {
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

      // Match the variables used in the EmailJS dashboard template.
      // Keep legacy aliases for existing templates during migration.
      const senderName = form.name.trim();
      const senderEmail = form.email.trim();
      const senderMessage = form.message.trim();

      if (!senderName || !senderEmail || !senderMessage) {
        throw new Error(t.error);
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: senderName,
          email: senderEmail,
          message: senderMessage,
          from_name: senderName,
          from_email: senderEmail,
          reply_to: senderEmail,
          time: new Date().toLocaleString(),
          site_name: "HERY — Madagascar Local Guide",
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
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
            <TelephoneIcon />

            +261 34 58 085 04
          </a>

          <a
            href="mailto:rajaofetaheryhenintsoa@yahoo.fr"
          >
            <EmailIcon />

            rajaofetaheryhenintsoa@yahoo.fr
          </a>

          <span>
            <LocationIcon />

            Morondava / Menabe,
            Madagascar
          </span>

          <a
            href="https://www.instagram.com/mdg_tour/"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon />

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
              <WhatsAppIcon size={36} />
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
            placeholder={isMG ? mgUI.contact.name : isFR ? frExtras.contact.name : "Your name"}
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
            placeholder={isMG ? mgUI.contact.email : isFR ? frExtras.contact.email : "you@example.com"}
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
            placeholder={isMG ? mgUI.contact.message : isFR ? frExtras.contact.message : "Tell us about your trip or project..."}
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

function Footer({ t, go, isMG, isFR }) {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <button
            className="brand footer-brand brand-with-logo"
            onClick={() =>
              go("home")
            }
          >
            <span className="brand-emblem">
              <img src="/images/hery-emblem.svg" alt="" width="56" height="56" loading="lazy" decoding="async" />
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
            {isMG ? mgUI.footer.explore : isFR ? frExtras.footer.explore : "Explore"}
          </b>

          <button
            onClick={() =>
              go("about")
            }
          >
            {isMG ? mgUI.footer.about : isFR ? frExtras.footer.about : "About"}
          </button>

          <button
            onClick={() =>
              go("destinations")
            }
          >
            {isMG ? mgUI.footer.destinations : isFR ? frExtras.footer.destinations : "Destinations"}
          </button>

          <button
            onClick={() =>
              go("photography")
            }
          >
            {isMG ? mgUI.footer.photography : isFR ? frExtras.footer.photography : "Photography"}
          </button>

          <button
            onClick={() =>
              go("blog")
            }
          >
            {isMG ? mgUI.footer.blog : isFR ? frExtras.footer.blog : "Blog"}
          </button>
          <button
            onClick={() => go("partners")}
          >
            {isMG ? "Mpiara-miombon'antoka" : isFR ? "Partenaires" : "Partners"}
          </button>
        </div>

        <div>
          <b>
            {isMG ? mgUI.footer.services : isFR ? frExtras.footer.services : "Services"}
          </b>

          <button
            onClick={() =>
              go("services")
            }
          >
            {isMG ? mgUI.footer.guiding : isFR ? frExtras.footer.guiding : "Guiding"}
          </button>

          <button
            onClick={() =>
              go("services")
            }
          >
            {isMG ? mgUI.footer.wildlife : isFR ? frExtras.footer.wildlife : "Wildlife trips"}
          </button>

          <button
            onClick={() =>
              go("services")
            }
          >
            {isMG ? mgUI.footer.photography : isFR ? frExtras.footer.photography : "Photography"}
          </button>

          <button
            onClick={() =>
              go("contact")
            }
          >
            {isMG ? mgUI.footer.contact : isFR ? frExtras.footer.contact : "Contact"}
          </button>
        </div>

        <div>
          <b>
            {isMG ? mgUI.footer.contact : isFR ? frExtras.footer.contact : "Contact"}
          </b>

          <a
            href="https://wa.me/261345808504"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon size={18} />
            WhatsApp
          </a>

          <a href="mailto:rajaofetaheryhenintsoa@yahoo.fr">
            <EmailIcon size={18} />
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
          {isMG ? mgUI.footer.rights : isFR ? frExtras.footer.rights : "All rights reserved."}
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
            <InstagramIcon size={20} />
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
   SMART CHATBOT — HERY ASSISTANT
========================================================= */

function Chat({ open, setOpen, lang, t }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = React.useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [open, messages, typing]);

  useEffect(() => {
    if (!open) return;
    const keyHandler = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [open, setOpen]);

  async function sendMessage(fromSuggestion) {
    const text = String(fromSuggestion ?? message).trim();
    if (!text || typing) return;
    const userName = getHeryVisitorName(text);
    if (userName) setVisitorName(userName);
    setMessages(current => [...current, { role: "user", text }]);
    setMessage("");
    setShowSuggestions(false);
    setTyping(true);
    try {
      // Website-grounded multilingual answers. Never invent live bookings or prices.
      const response = getHeryChatReply(text, lang);
      await new Promise(resolve => setTimeout(resolve, 180));
      setMessages(current => [...current, { role: "bot", text: response.text }]);
    } finally {
      setTyping(false);
    }
  }

  const localizedLabels = {
    en: ["Start with a question", "Direct contact", "Close assistant"],
    fr: ["Choisissez une question", "Contact direct", "Fermer l'assistant"],
    mg: ["Misafidiana fanontaniana", "Hifandray mivantana", "Hikatona"],
    ru: ["Выберите вопрос", "Прямой контакт", "Закрыть"],
    ja: ["質問を選んでください", "直接連絡", "閉じる"],
    de: ["Wählen Sie eine Frage", "Direkter Kontakt", "Schließen"],
    it: ["Scegli una domanda", "Contatto diretto", "Chiudi"],
    es: ["Elige una pregunta", "Contacto directo", "Cerrar"],
    zh: ["选择一个问题", "直接联系", "关闭"],
  };
  const labels = localizedLabels[lang] || localizedLabels.en;
  const whatsappText = {
    en: "Hello HERY! I have a question about visiting Madagascar.",
    fr: "Bonjour HERY ! J'ai une question sur un voyage à Madagascar.",
    mg: "Salama HERY! Misy fanontaniana momba ny dia eto Madagasikara aho.",
    ru: "Здравствуйте HERY! У меня вопрос о путешествии по Мадагаскару.",
    ja: "こんにちは HERY！マダガスカル旅行について質問があります。",
    de: "Hallo HERY! Ich habe eine Frage zu einer Madagaskar-Reise.",
    it: "Ciao HERY! Ho una domanda su un viaggio in Madagascar.",
    es: "¡Hola HERY! Tengo una pregunta sobre viajar a Madagascar.",
    zh: "您好 HERY！我想咨询马达加斯加旅行。",
  };
  const directLink = `https://wa.me/261345808504?text=${encodeURIComponent(whatsappText[lang] || whatsappText.en)}`;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            key="hery-chat-panel"
            className="chat hery-chat"
            role="dialog"
            aria-label={t.chatbotTitle || "HERY Assistant"}
            aria-modal="false"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.27, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="chat-head hery-chat-head">
              <span className="hery-chat-brand-logo" aria-hidden="true">
                <img src="/images/hery-emblem.svg" alt="" width="52" height="52" />
              </span>
              <div className="hery-chat-brand-text">
                <b>{t.chatbotTitle || "HERY Assistant"}</b>
                <span>{t.chatbotSub || "Local guide · Madagascar"}</span>
              </div>
              <button
                className="hery-chat-close"
                type="button"
                onClick={() => setOpen(false)}
                aria-label={labels[2]}
              >
                <X size={19} />
              </button>
            </div>

            <div className="chat-body hery-chat-body" aria-live="polite">
              {messages.length === 0 && (
                <div className="chat-welcome hery-chat-welcome">
                  {t.chatbotWelcome}
                </div>
              )}
              {messages.map((item, index) => (
                <motion.p
                  className={item.role === "user" ? "u" : "b"}
                  key={index}
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.text}
                </motion.p>
              ))}
              {typing && (
                <div className="chat-typing" aria-label="Typing">
                  <span /><span /><span />
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {showSuggestions && messages.length === 0 && (
              <div className="chat-quick hery-chat-suggestions">
                <span className="hery-chat-suggestions-title">{labels[0]}</span>
                <div className="hery-chat-suggestion-list">
                  {t.quickQuestions.map(question => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => sendMessage(question)}
                      disabled={typing}
                    >
                      {question}
                      <ArrowRight size={13} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form className="chat-input hery-chat-input" onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}>
              <input
                value={message}
                onChange={event => setMessage(event.target.value)}
                placeholder={t.chatbotPlaceholder}
                aria-label={t.chatbotPlaceholder || "Ask HERY"}
                maxLength={700}
              />
              <button type="submit" disabled={!message.trim() || typing} aria-label={t.send || "Send"}>
                <Send size={17} />
              </button>
            </form>

            <div className="chat-direct hery-chat-direct">
              <a href={directLink} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} />
                <span>{labels[1]} · WhatsApp HERY</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        className={open ? "chat-bubble active" : "chat-bubble"}
        onClick={() => setOpen(!open)}
        aria-label={open ? labels[2] : t.chatbotTitle || "HERY Assistant"}
        aria-expanded={open}
        type="button"
      >
        {open ? <X size={23} strokeWidth={2.15} /> : <AssistantIcon size={32} />}
        {!open && <span className="chat-pulse" />}
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








