// Authentic user-supplied wildlife photographs from widlife(1).zip.
// Matching nine-language captions: birds, protection signs, lemurs, reptiles, Mantadia and waterways.
export const wildlifePhotoFiles = Array.from({length:9}, (_,i)=>`/images/photography/wildlife-new-${String(i+1).padStart(2,"0")}.avif`);
export const wildlifePhotoLocales = {
  "en": {
    "scenes": [
      [
        "A flash of feathers",
        "A striking bird rests quietly on a branch. Its rich colors reveal the extraordinary beauty of Madagascar’s birdlife."
      ],
      [
        "A landscape worth protecting",
        "A sign welcomes travelers to a protected natural area, reminding us why conservation matters on every journey."
      ],
      [
        "Lemurs in the treetops",
        "A black-and-white lemur moves through the leafy branches, offering a memorable glimpse of the island’s wild heart."
      ],
      [
        "Nature’s perfect camouflage",
        "Look closely at the branch: a small reptile blends into the bark, showing how cleverly Madagascar’s wildlife can hide."
      ],
      [
        "The gateway to Mantadia",
        "The entrance to Mantadia National Park invites visitors to discover tropical forests, native species and responsible exploration."
      ],
      [
        "A little island of green",
        "Dense vegetation rises above calm water, a peaceful reminder of the variety of habitats that make Madagascar special."
      ],
      [
        "A message to care for nature",
        "A simple conservation sign encourages every visitor to respect the forest and leave its living treasures undisturbed."
      ],
      [
        "Life along the tree trunk",
        "A black-and-white lemur clings to a tree in the forest, giving us a closer look at its remarkable climbing skills."
      ],
      [
        "A moment among the branches",
        "A lemur pauses high in the greenery, inviting you to slow down and observe wildlife with patience and respect."
      ]
    ],
    "buttons": [
      "Previous wildlife photograph",
      "Next wildlife photograph",
      "Pause wildlife slideshow",
      "Resume wildlife slideshow"
    ]
  },
  "fr": {
    "scenes": [
      [
        "Un éclat de plumes",
        "Un oiseau aux couleurs remarquables se repose sur une branche : un aperçu précieux de la diversité des oiseaux de Madagascar."
      ],
      [
        "Un paysage à protéger",
        "Un panneau accueille les visiteurs dans une aire naturelle protégée et rappelle l’importance de la conservation."
      ],
      [
        "Les lémuriens dans les arbres",
        "Un lémurien noir et blanc évolue dans les branches : une rencontre marquante avec la vie sauvage de l’île."
      ],
      [
        "Le camouflage de la nature",
        "Regardez bien cette branche : un petit reptile se confond avec l’écorce et révèle l’art de la discrétion."
      ],
      [
        "Bienvenue à Mantadia",
        "L’entrée du parc national de Mantadia invite à découvrir les forêts tropicales et leur biodiversité dans le respect de la nature."
      ],
      [
        "Un îlot de verdure",
        "Une végétation dense émerge des eaux calmes, témoignage de la richesse des milieux naturels de Madagascar."
      ],
      [
        "Un message pour la nature",
        "Un panneau rappelle à chaque visiteur de respecter la forêt et de préserver les êtres vivants qui l’habitent."
      ],
      [
        "La vie sur les troncs",
        "Un lémurien noir et blanc grimpe à un arbre et dévoile son étonnante agilité."
      ],
      [
        "Un instant dans les branches",
        "Un lémurien fait une pause dans la verdure : une invitation à observer patiemment et sans déranger."
      ]
    ],
    "buttons": [
      "Photo précédente",
      "Photo suivante",
      "Mettre en pause",
      "Reprendre le diaporama"
    ]
  },
  "mg": {
    "scenes": [
      [
        "Vorona miloko mahafinaritra",
        "Vorona tsara loko mipetraka eny amin’ny sampan-kazo no mampiseho ny hatsaran’ny vorona miavaka eto Madagasikara."
      ],
      [
        "Tontolo mila arovana",
        "Takelaka eo amin’ny faritra arovana no mampahatsiahy ny maha-zava-dehibe ny fiarovana ny natiora."
      ],
      [
        "Gidro eny an-tampon-kazo",
        "Gidro mainty sy fotsy eny amin’ny rantsan-kazo no mampiseho ny harena velona ao amin’ny alantsika."
      ],
      [
        "Bibikely sy biby mahay miafina",
        "Jereo tsara ilay sampana: biby mandady kely mifangaro amin’ny hoditry ny hazo no mampiseho ny fahaizan’ny natiora."
      ],
      [
        "Tongasoa eto Mantadia",
        "Ny vavahadin’ny Valan-javaboary Mantadia dia manasa antsika hahita ala tropikaly sy harena voajanahary amim-panajana."
      ],
      [
        "Nosikely maitso anaty rano",
        "Zavamaniry matevina eo ambonin’ny rano milamina no mampiseho ny fahasamihafan’ny tontolo eto Madagasikara."
      ],
      [
        "Hafatra ho fiarovana ny ala",
        "Takelaka mampirisika ny olona hanaja ny ala sy tsy hanakorontana ny biby ary ny zavamaniry ao aminy."
      ],
      [
        "Fiainana eny amin’ny vatan-kazo",
        "Gidro mainty sy fotsy mifikitra amin’ny hazo no mampiseho ny fahaizany miakatra."
      ],
      [
        "Fotoana mangina eny amin’ny hazo",
        "Gidro mipetraka eny amin’ny rantsana: maka fotoana kely hijerena ny biby amim-panajana."
      ]
    ],
    "buttons": [
      "Sary teo aloha",
      "Sary manaraka",
      "Ajanona aloha",
      "Tohizana ny sary"
    ]
  },
  "ru": {
    "scenes": [
      [
        "Яркие краски перьев",
        "Необычная птица отдыхает на ветке: яркое напоминание о богатстве пернатого мира Мадагаскара."
      ],
      [
        "Природа нуждается в защите",
        "Знак при входе в охраняемую природную зону напоминает о важности сохранения местных экосистем."
      ],
      [
        "Лемуры среди листвы",
        "Чёрно-белый лемур среди ветвей дарит незабываемую встречу с живой природой острова."
      ],
      [
        "Мастера маскировки",
        "Присмотритесь к ветке: маленькая рептилия почти сливается с корой дерева."
      ],
      [
        "Добро пожаловать в Мантажия",
        "Вход в национальный парк Мантажия приглашает бережно исследовать тропические леса."
      ],
      [
        "Зелёный островок",
        "Густая растительность поднимается над спокойной водой, напоминая о разнообразии природных мест обитания."
      ],
      [
        "Послание об охране леса",
        "Природоохранный знак призывает посетителей беречь лес и не тревожить животных."
      ],
      [
        "Жизнь на стволе дерева",
        "Чёрно-белый лемур цепляется за ствол и показывает удивительную ловкость."
      ],
      [
        "Мгновение среди ветвей",
        "Лемур отдыхает среди зелени. Лучшее наблюдение за природой — спокойное и уважительное."
      ]
    ],
    "buttons": [
      "Предыдущее фото",
      "Следующее фото",
      "Пауза",
      "Продолжить показ"
    ]
  },
  "ja": {
    "scenes": [
      [
        "羽が奏でる鮮やかな色",
        "美しい色合いの鳥が枝で静かに休んでいます。マダガスカルの鳥たちの豊かさを感じる瞬間です。"
      ],
      [
        "守るべき自然",
        "保護地域の入口に立つ案内板が、自然を大切にする旅の重要性を伝えています。"
      ],
      [
        "木々に暮らすキツネザル",
        "白黒のキツネザルが枝の間を進み、島の野生の命を身近に感じさせてくれます。"
      ],
      [
        "自然のかくれんぼ",
        "枝をよく見ると、小さな爬虫類が樹皮に溶け込んでいます。"
      ],
      [
        "マンタディアへの入口",
        "マンタディア国立公園の入口から、豊かな熱帯林とその生き物たちへの旅が始まります。"
      ],
      [
        "水辺の小さな緑の島",
        "静かな水に囲まれた緑豊かな場所が、マダガスカルの多様な生息地を物語ります。"
      ],
      [
        "森を守るメッセージ",
        "案内板が、森の生き物を邪魔せず自然を尊重するよう呼びかけています。"
      ],
      [
        "木の幹を登る命",
        "白黒のキツネザルが木の幹につかまり、見事な木登りの能力を見せます。"
      ],
      [
        "枝の上の静かな時間",
        "緑の中でキツネザルが休んでいます。静かに見守ることが何より大切です。"
      ]
    ],
    "buttons": [
      "前の写真",
      "次の写真",
      "一時停止",
      "再開"
    ]
  },
  "de": {
    "scenes": [
      [
        "Ein Feuerwerk aus Federn",
        "Ein auffällig gefärbter Vogel ruht auf einem Ast und zeigt die beeindruckende Vogelwelt Madagaskars."
      ],
      [
        "Natur, die Schutz verdient",
        "Ein Schild am Schutzgebiet erinnert daran, wie wichtig der verantwortungsvolle Umgang mit der Natur ist."
      ],
      [
        "Lemuren in den Baumkronen",
        "Ein schwarz-weißer Lemur bewegt sich zwischen den Ästen – ein besonderer Einblick in die Tierwelt."
      ],
      [
        "Perfekt getarnt",
        "Schauen Sie auf den Ast: Ein kleines Reptil verschmilzt fast vollständig mit der Baumrinde."
      ],
      [
        "Willkommen in Mantadia",
        "Der Eingang zum Mantadia-Nationalpark lädt ein, tropische Wälder und ihre Artenvielfalt zu entdecken."
      ],
      [
        "Eine kleine grüne Insel",
        "Dichter Pflanzenwuchs über ruhigem Wasser zeigt die Vielfalt der Lebensräume auf Madagaskar."
      ],
      [
        "Eine Botschaft für den Wald",
        "Ein Schild fordert dazu auf, den Wald und alle Lebewesen darin zu respektieren."
      ],
      [
        "Leben am Baumstamm",
        "Ein schwarz-weißer Lemur klettert an einem Stamm und zeigt seine außergewöhnliche Geschicklichkeit."
      ],
      [
        "Ein stiller Moment im Geäst",
        "Ein Lemur verweilt zwischen grünen Blättern – beobachten Sie ihn ruhig und respektvoll."
      ]
    ],
    "buttons": [
      "Vorheriges Foto",
      "Nächstes Foto",
      "Diashow pausieren",
      "Diashow fortsetzen"
    ]
  },
  "it": {
    "scenes": [
      [
        "Un lampo di piume colorate",
        "Un uccello dai colori intensi riposa su un ramo e racconta la straordinaria avifauna malgascia."
      ],
      [
        "Una natura da proteggere",
        "Un cartello all’ingresso di un’area protetta ricorda il valore della conservazione."
      ],
      [
        "Lemuri tra le foglie",
        "Un lemure bianco e nero tra i rami regala un incontro speciale con la fauna dell’isola."
      ],
      [
        "Il perfetto mimetismo",
        "Osserva il ramo: un piccolo rettile si confonde quasi del tutto con la corteccia."
      ],
      [
        "Benvenuti a Mantadia",
        "L’ingresso al Parco nazionale di Mantadia invita a esplorare le foreste tropicali con rispetto."
      ],
      [
        "Un isolotto verde",
        "La vegetazione rigogliosa circondata da acque tranquille mostra la varietà degli habitat malgasci."
      ],
      [
        "Un messaggio per la foresta",
        "Un cartello invita i visitatori a rispettare il bosco e a non disturbare i suoi abitanti."
      ],
      [
        "La vita sul tronco",
        "Un lemure bianco e nero si aggrappa a un albero mostrando la sua straordinaria agilità."
      ],
      [
        "Una pausa fra i rami",
        "Un lemure riposa tra le foglie: un momento da osservare con pazienza e rispetto."
      ]
    ],
    "buttons": [
      "Foto precedente",
      "Foto successiva",
      "Metti in pausa",
      "Riprendi"
    ]
  },
  "es": {
    "scenes": [
      [
        "Un destello de plumas",
        "Un ave de colores intensos descansa en una rama y muestra la extraordinaria avifauna de Madagascar."
      ],
      [
        "Un entorno que proteger",
        "Un cartel en una zona natural protegida recuerda la importancia de conservar la naturaleza."
      ],
      [
        "Lémures entre las hojas",
        "Un lémur blanco y negro se mueve entre las ramas y ofrece un encuentro inolvidable."
      ],
      [
        "El camuflaje perfecto",
        "Mira con atención la rama: un pequeño reptil se confunde con la corteza del árbol."
      ],
      [
        "Bienvenidos a Mantadia",
        "La entrada del Parque Nacional de Mantadia invita a explorar sus bosques tropicales con respeto."
      ],
      [
        "Un pequeño islote verde",
        "La vegetación crece sobre aguas tranquilas y revela la diversidad de hábitats malgaches."
      ],
      [
        "Un mensaje para cuidar el bosque",
        "Un cartel recuerda a los visitantes que deben respetar el bosque y no perturbar su fauna."
      ],
      [
        "Vida sobre el tronco",
        "Un lémur blanco y negro se aferra al árbol y muestra su extraordinaria destreza."
      ],
      [
        "Un momento entre las ramas",
        "Un lémur descansa entre el follaje. Observar con calma y respeto es parte de la experiencia."
      ]
    ],
    "buttons": [
      "Foto anterior",
      "Foto siguiente",
      "Pausar presentación",
      "Reanudar presentación"
    ]
  },
  "zh": {
    "scenes": [
      [
        "羽毛间的绚丽色彩",
        "一只色彩鲜艳的鸟停在树枝上，展现马达加斯加丰富多样的鸟类世界。"
      ],
      [
        "值得守护的自然",
        "自然保护区入口的标志提醒我们，珍惜环境是每一段旅程的重要部分。"
      ],
      [
        "树梢上的狐猴",
        "黑白相间的狐猴穿行于树枝间，带来与岛屿野生生命难忘的相遇。"
      ],
      [
        "完美的自然伪装",
        "仔细观察树枝，一只小爬行动物几乎与树皮融为一体。"
      ],
      [
        "走进曼塔迪亚",
        "曼塔迪亚国家公园入口邀请游客以尊重自然的方式探索热带森林。"
      ],
      [
        "水边的绿色小岛",
        "平静水面上的茂密植被，展现马达加斯加栖息环境的丰富多样。"
      ],
      [
        "守护森林的提醒",
        "一块告示牌呼吁游客尊重森林，不要干扰其中的野生动物。"
      ],
      [
        "树干上的生命",
        "黑白相间的狐猴紧贴树干，展示出色的攀爬能力。"
      ],
      [
        "树枝间的宁静时刻",
        "狐猴在绿叶间停留，耐心而安静地观察才是最好的相遇。"
      ]
    ],
    "buttons": [
      "上一张照片",
      "下一张照片",
      "暂停播放",
      "继续播放"
    ]
  }
};
