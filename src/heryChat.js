// HERY Local Guide — multilingual, transparent FAQ assistant.
// This is an intent-based guide, not an AI model or a real-time booking service.

const knowledge = {
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


// Facts are intentionally limited to destinations/services shown on the HERY website.
// Do not claim live reservations, exact tour prices, travel times or weather.
const extraKnowledge = {
  tsingy: {
    en: "Tsingy de Bemaraha is one of HERY's listed destinations, known for its striking limestone landscapes, forests and adventure. Ask HERY about suitable routes, dates and access before planning.",
    fr: "Les Tsingy de Bemaraha figurent parmi les destinations proposées par HERY : paysages calcaires spectaculaires, forêts et aventure. Contactez HERY pour les itinéraires, les dates et l'accès.",
    mg: "Anisan'ny toerana azo tsidihina miaraka amin'i HERY ny Tsingy de Bemaraha, ahitana vatolampy miavaka sy ala. Mifandraisa amin'i HERY raha mila fanazavana momba ny lalana, daty ary fidirana.",
    ru: "Tsingy de Bemaraha — одно из направлений HERY, известное известняковыми ландшафтами и лесами. Уточняйте маршруты и доступность у HERY.",
    ja: "Tsingy de Bemarahaは、独特な石灰岩の景観や森林で知られるHERYの紹介先です。行程やアクセスはHERYにご確認ください。",
    de: "Tsingy de Bemaraha zählt zu HERYs Reisezielen mit eindrucksvollen Kalksteinlandschaften und Wäldern. Routen und Zugang bitte bei HERY erfragen.",
    it: "Tsingy de Bemaraha è tra le destinazioni di HERY, con paesaggi calcarei e foreste. Chiedi a HERY itinerari, date e accessibilità.",
    es: "Tsingy de Bemaraha está entre los destinos de HERY, con paisajes de piedra caliza y bosques. Consulta rutas y accesos directamente con HERY.",
    zh: "Tsingy de Bemaraha 是 HERY 介绍的目的地之一，以独特的石灰岩地貌和森林闻名。路线、日期及交通请向 HERY 确认。",
  },
  andasibe: {
    en: "Andasibe and eastern Madagascar feature rainforest, lemurs and remarkable biodiversity. HERY lists this region among its destinations; ask for a trip suited to your interests.",
    fr: "Andasibe et l'est de Madagascar offrent forêt tropicale, lémuriens et biodiversité. HERY présente cette région parmi ses destinations ; demandez un parcours adapté.",
    mg: "Any Andasibe sy atsinanan'i Madagasikara dia misy ala mando, gidro ary harena voajanahary miavaka. Anisan'ny toerana asehon'i HERY izy io; anontanio ny dia mety aminao.",
    ru: "Andasibe и восточный Мадагаскар известны тропическими лесами, лемурами и разнообразием природы. Маршрут уточняйте у HERY.",
    ja: "Andasibeとマダガスカル東部には熱帯雨林、キツネザル、豊かな生物多様性があります。旅程はHERYにご相談ください。",
    de: "Andasibe und Ostmadagaskar bieten Regenwald, Lemuren und Biodiversität. Fragen Sie HERY nach einer passenden Route.",
    it: "Andasibe e il Madagascar orientale offrono foreste pluviali, lemuri e biodiversità. Contatta HERY per un itinerario.",
    es: "Andasibe y el este de Madagascar ofrecen selva tropical, lémures y biodiversidad. Consulta a HERY para una ruta personalizada.",
    zh: "Andasibe 和马达加斯加东部以雨林、狐猴和生物多样性著称。可向 HERY 询问合适行程。",
  },
  islands: {
    en: "HERY lists Nosy Be and Sainte Marie among its destinations for island life, coast, culture and nature. Tell HERY which island interests you and your preferred dates.",
    fr: "HERY présente Nosy Be et Sainte Marie parmi ses destinations, pour la vie insulaire, le littoral, la culture et la nature. Précisez l'île et les dates souhaitées.",
    mg: "Ao amin'ny lisitry ny toeran'i HERY i Nosy Be sy Sainte Marie, ahitana morontsiraka, kolontsaina ary natiora. Lazao izay nosy tianao sy ny daty.",
    ru: "HERY упоминает Nosy Be и Sainte Marie как островные направления с природой и культурой. Уточните остров и даты.",
    ja: "Nosy BeとSainte MarieはHERYの掲載先で、島の暮らし、海岸、文化、自然を楽しめます。希望の島と日程をお伝えください。",
    de: "Nosy Be und Sainte Marie gehören zu HERYs Inselzielen mit Küste, Kultur und Natur. Teilen Sie Insel und Reisedaten mit.",
    it: "Nosy Be e Sainte Marie sono destinazioni insulari di HERY, tra costa, cultura e natura. Indica isola e date.",
    es: "Nosy Be y Sainte Marie figuran entre los destinos de HERY, con costas, cultura y naturaleza. Indica isla y fechas.",
    zh: "Nosy Be 和 Sainte Marie 均在 HERY 的目的地列表中，包含海岸、文化和自然体验。请告知想去的岛屿和日期。",
  },
  logistics: {
    en: "HERY can help discuss local logistics and custom circuits. Exact transfer arrangements, availability and transport costs need to be confirmed directly.",
    fr: "HERY peut étudier la logistique locale et les circuits personnalisés. Transferts, disponibilités et coûts de transport sont à confirmer directement.",
    mg: "Afaka manampy amin'ny fandaminana eny an-toerana sy ny dia mifanaraka amin'ny safidinao i HERY. Mila hamarinina mivantana ny fiara, fandaharam-potoana ary sarany.",
    ru: "HERY помогает обсудить местную логистику и индивидуальные маршруты. Трансферы, доступность и цены уточняйте напрямую.",
    ja: "HERYは現地の移動手配やカスタムルートの相談ができます。交通手段、空き状況、料金は直接ご確認ください。",
    de: "HERY unterstützt bei lokaler Logistik und individuellen Routen. Transfers, Verfügbarkeit und Kosten bitte direkt bestätigen lassen.",
    it: "HERY può discutere logistica locale e itinerari personalizzati. Trasferimenti, disponibilità e costi vanno confermati.",
    es: "HERY puede ayudar con logística local y rutas personalizadas. Confirma traslados, disponibilidad y costes directamente.",
    zh: "HERY 可协助讨论当地交通安排及定制线路。具体交通、可用性和费用需要直接确认。",
  },
};

const fallback = {
  en: "I don't have confirmed details about that. I can help with HERY's destinations, wildlife, photography, astrophotography, local guiding and conservation. For anything specific, please ask HERY via WhatsApp or the contact form. What would you like to know?",
  fr: "Je n'ai pas d'information confirmée sur ce point. Je peux renseigner sur les destinations, la faune, la photographie, l'astrophotographie et les services HERY. Pour un détail précis, contactez HERY. Quelle est votre question ?",
  mg: "Tsy manana fanazavana voamarina momba izany aho. Afaka manampy amin'ny toerana tsidihina, bibidia, fakàna sary, lanitra amin'ny alina ary tolotra HERY. Raha mila antsipiriany dia mifandraisa mivantana amin'i HERY. Inona no tianao ho fantatra?",
  ru: "У меня нет подтверждённых сведений по этому вопросу. Могу рассказать о направлениях, природе и услугах HERY. Для точных деталей обратитесь к HERY напрямую.",
  ja: "その件について確認済みの情報はありません。HERYの目的地、野生動物、写真、天体写真、サービスについてご案内できます。詳しくはHERYへ直接お問い合わせください。",
  de: "Dazu habe ich keine bestätigten Informationen. Ich kann HERYs Reiseziele, Wildtiere, Fotoangebote und Services erklären. Für genaue Details kontaktieren Sie HERY.",
  it: "Non ho dettagli verificati su questo punto. Posso aiutarti con destinazioni, fauna, fotografia e servizi HERY. Per informazioni precise, contatta direttamente HERY.",
  es: "No tengo datos confirmados sobre eso. Puedo ayudarte con destinos, fauna, fotografía y servicios de HERY. Para detalles concretos, contacta con HERY.",
  zh: "我没有关于此问题的已确认信息。可以介绍 HERY 的目的地、野生动物、摄影和服务。具体安排请直接联系 HERY。",
};

const hello = {
  en: "Hello! 👋 Welcome to HERY Madagascar Local Guide. What would you like to explore: destinations, wildlife, photography, or planning a trip?",
  fr: "Bonjour ! 👋 Bienvenue chez HERY Madagascar Local Guide. Souhaitez-vous parler des destinations, de la faune, de la photographie ou d'un projet de voyage ?",
  mg: "Salama! 👋 Tongasoa eto amin'i HERY. Te hahafantatra toerana tsidihina, bibidia, fakàna sary sa handamina dia ve ianao?",
  ru: "Здравствуйте! 👋 Добро пожаловать к HERY. Интересуют направления, животные, фотография или планирование поездки?",
  ja: "こんにちは！👋 HERYへようこそ。目的地、野生動物、写真、旅行計画について何を知りたいですか？",
  de: "Hallo! 👋 Willkommen bei HERY. Interessieren Sie sich für Reiseziele, Wildtiere, Fotografie oder Reiseplanung?",
  it: "Ciao! 👋 Benvenuto da HERY. Vuoi conoscere destinazioni, fauna, fotografia o organizzare un viaggio?",
  es: "¡Hola! 👋 Bienvenido a HERY. ¿Te interesan destinos, fauna, fotografía o planificar un viaje?",
  zh: "您好！👋 欢迎咨询 HERY。想了解目的地、野生动物、摄影还是旅行规划？",
};

const personalWelcome = {
  en: name => `Nice to meet you, ${name}! 👋 Which Madagascar experience interests you?`,
  fr: name => `Enchanté, ${name} ! 👋 Quelle expérience à Madagascar vous intéresse ?`,
  mg: name => `Faly mahafantatra anao, ${name}! 👋 Inona no traikefa tianao hatao eto Madagasikara?`,
  ru: name => `Приятно познакомиться, ${name}! 👋 Что вас интересует на Мадагаскаре?`,
  ja: name => `${name}さん、はじめまして！👋 どの体験に興味がありますか？`,
  de: name => `Schön, Sie kennenzulernen, ${name}! 👋 Was interessiert Sie?`,
  it: name => `Piacere, ${name}! 👋 Quale esperienza ti interessa?`,
  es: name => `¡Mucho gusto, ${name}! 👋 ¿Qué experiencia te interesa?`,
  zh: name => `很高兴认识您，${name}！👋 您对哪种体验感兴趣？`,
};

// Keep phrase boundaries so "photo" doesn't accidentally match "astrophotography",
// and "I am a photographer" is never interpreted as somebody's name.
const clean = value => String(value || "").toLowerCase().normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^\p{L}\p{N}]+/gu, " ")
  .trim();

function matches(text, options) {
  const padded = ` ${clean(text)} `;
  return options.some(term => padded.includes(` ${clean(term)} `));
}

export function getHeryVisitorName(text) {
  const input = String(text || "").trim();
  const patterns = [
    /(?:^|\s)my name is\s+([\p{L}][\p{L}'’-]{1,34}(?:\s+[\p{L}][\p{L}'’-]{1,34})?)/iu,
    /(?:^|\s)je m['’]appelle\s+([\p{L}][\p{L}'’-]{1,34}(?:\s+[\p{L}][\p{L}'’-]{1,34})?)/iu,
    /(?:^|\s)mon nom est\s+([\p{L}][\p{L}'’-]{1,34}(?:\s+[\p{L}][\p{L}'’-]{1,34})?)/iu,
    /(?:^|\s)ny anarako dia\s+([\p{L}][\p{L}'’-]{1,34}(?:\s+[\p{L}][\p{L}'’-]{1,34})?)/iu,
    /(?:^|\s)izaho no\s+([\p{L}][\p{L}'’-]{1,34})(?=\s*$|[.,!?])/iu,
  ];
  const result = patterns.map(p => input.match(p)).find(Boolean);
  return result ? result[1].trim() : null;
}

export function getHeryChatReply(message, language = "en") {
  const lang = Object.hasOwn(fallback, language) ? language : "en";
  const q = clean(message);
  const reply = (key, source = knowledge) => ({
    intent: key,
    text: source[key]?.[lang] || source[key]?.en || fallback[lang],
  });

  if (!q) return { intent: "empty", text: fallback[lang] };

  // A greeting/thank-you only wins when it is the WHOLE message.
  // "Hello, how much is ...?" should be answered as a price enquiry.
  if (["hello", "hi", "hey", "bonjour", "bonsoir", "salut", "salama", "manao ahoana", "hallo", "hola", "ciao", "привет", "здравствуйте", "こんにちは", "你好"].some(term => clean(term) === q)) {
    return { intent: "greeting", text: hello[lang] };
  }
  // Recognise natural courtesy phrases, not just the single word "misaotra".
  // Check complete expressions only: "Thanks, how much does it cost?" must
  // still be classified as a pricing question.
  const gratitudePhrases = [
    "misaotra", "misaotra betsaka", "misaotra indrindra",
    "tena misaotra", "tena misaotra betsaka", "misaotra tompoko",
    "mankasitraka", "mankasitraka indrindra", "misaotra tamin'ny fanampiana",
    "misaotra betsaka tamin'ny fanampiana",
    "merci", "merci beaucoup", "merci infiniment", "un grand merci",
    "thank you", "thank you very much", "thank you so much",
    "thanks", "thanks a lot", "many thanks", "thank you for your help",
    "gracias", "muchas gracias", "mil gracias",
    "grazie", "grazie mille", "molte grazie",
    "danke", "vielen dank", "danke schön", "danke schoen",
    "спасибо", "большое спасибо", "спасибо большое",
    "ありがとう", "ありがとうございます", "どうもありがとう",
    "谢谢", "非常感谢", "谢谢你", "谢谢您",
  ];
  if (gratitudePhrases.some(phrase => clean(phrase) === q)) {
    return reply("thanks");
  }

  const name = getHeryVisitorName(message);
  if (name) {
    return { intent: "name", name, text: personalWelcome[lang](name) };
  }

  // Prioritise the action requested over any place mentioned in the message.
  // Example: "How much for astrophotography in Morondava?" -> pricing, not Morondava.
  if (matches(q, ["price", "pricing", "cost", "how much", "rate", "tarif", "prix", "devis", "cout", "combien", "vidiny", "sarany", "taham bidy", "preis", "kosten", "prezzo", "costo", "precio", "cuanto cuesta", "цена", "стоимость", "料金", "价格", "多少钱"])) return reply("price");
  if (matches(q, ["book", "booking", "book a", "reserve", "reservation", "reservations", "reserver", "reservez", "réservation", "réserver", "buchen", "buchung", "prenotazione", "prenotare", "reserva", "reservar", "mamandrika", "famandrihana", "заказать", "забронировать", "予約", "预订"])) return reply("booking");
  if (matches(q, ["whatsapp", "email", "e mail", "contact", "contactez", "contactar", "contacter", "telephone", "phone", "tel", "numero", "nomerao", "antso", "contatto", "контакт", "联系方式", "联系", "メール"])) return reply("contact");
  if (matches(q, ["who is hery", "who are you", "qui est hery", "c est qui hery", "iza i hery", "wer ist hery", "chi e hery", "quien es hery", "кто такой hery", "hery とは", "hery 是谁"])) return reply("who");
  if (q === "hery") return reply("who");

  if (matches(q, ["astrophotography", "astrophotographie", "astrophotografie", "astrofotografia", "astrofotografía", "astro", "milky way", "voie lactee", "starry sky", "night sky", "night photography", "kintana", "lanitra amin ny alina", "vahindanitra", "天体写真", "天文摄影", "星空", "银河", "астрофотография"])) return reply("astro");
  if (matches(q, ["photography", "photographer", "photographers", "photograph", "photos", "photo", "photographe", "photographie", "photographier", "fotografia", "fotografía", "fotograf", "fotografo", "sary", "mpaka sary", "写真", "摄影", "фотография", "фото"])) return reply("photo");

  if (matches(q, ["tsingy", "bemaraha"])) return reply("tsingy", extraKnowledge);
  if (matches(q, ["andasibe"])) return reply("andasibe", extraKnowledge);
  if (matches(q, ["nosy be", "nosybe", "sainte marie", "sainte-marie", "saint marie", "圣玛丽"])) return reply("islands", extraKnowledge);
  if (matches(q, ["kirindy", "wildlife", "wild animals", "wild animal", "lemur", "lemurs", "lémur", "faune", "bibidia", "gidro", "animals", "animaux", "animali", "wildtiere", "野生动物", "野生動物", "лемур"])) return reply("wildlife");
  if (matches(q, ["morondava", "menabe", "baobab", "baobabs", "baobaba", "猴面包树", "バオバブ"])) return reply("morondava");
  if (matches(q, ["transport", "transfert", "transfer", "logistics", "logistique", "airport", "aeroport", "aéroport", "taxi", "driver", "fiara", "chauffeur", "trasporto", "transporte", "交通", "送迎"])) return reply("logistics", extraKnowledge);

  if (matches(q, ["conservation", "forest restoration", "deforestation", "biodiversity", "biodiversite", "fiarovana", "nature conservation", "naturschutz", "conservacion", "conservazione", "森林保护", "自然保護"])) return reply("conservation");
  if (matches(q, ["culture", "sakalava", "fady", "heritage", "patrimoine", "kolontsaina", "kultur", "cultura", "文化"])) return reply("culture");
  if (matches(q, ["destinations", "destination", "where to", "where can i go", "what places", "toerana", "aiza no", "où aller", "ou aller", "reiseziel", "destinazioni", "destinos", "目的地", "направления"])) return reply("destinations");
  if (matches(q, ["services", "service", "experiences", "experience", "expérience", "excursions", "excursion", "tour guide", "local guide", "private guide", "guiding", "guide", "mpitari dalana", "tolotra", "angebote", "servicios", "servizi", "услуги", "服务"])) return reply("services");

  return { intent: "unknown", text: fallback[lang] };
}
