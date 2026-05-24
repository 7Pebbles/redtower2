export interface UITranslation {
  subterraneanStructure: string;
  manuscriptReader: string;
  curiosityLaboratory: string;
  activeFocalLayer: string;
  sourceRecord: string;
  foundManuscript: string;
  manuscriptFocus: string;
  coordinates: string;
  hue: string;
  vitalsCoupled: string;
  inspectionLab: string;
  resonance: string;
  noSymmetryQuote: string;
  levelTitle: string;
  depth: string;
  features: string;
  activeResonance: string;
  shapingTheVessels: string;
  interactBtn: string;
  laboratoryFilters: string;
  novelType: string;
  organismType: string;
  allType: string;
  footerQuote: string;
}

export const uiTranslations: Record<'en' | 'de' | 'la' | 'ur', UITranslation> = {
  en: {
    subterraneanStructure: "Subterranean Structure",
    manuscriptReader: "Manuscript Reader",
    curiosityLaboratory: "Curiosity Laboratory",
    activeFocalLayer: "Active Focal Layer",
    sourceRecord: "SOURCE RECORD",
    foundManuscript: "FOUND MANUSCRIPT",
    manuscriptFocus: "Manuscript Focus",
    coordinates: "COORDINATES",
    hue: "HUE",
    vitalsCoupled: "VITALS COUPLED",
    inspectionLab: "Inspection Laboratory",
    resonance: "Resonance",
    noSymmetryQuote: "A pale density rising in the grayness, embossed upon it in a most tasteful and harmonious design.",
    levelTitle: "CRAFTED SERIES",
    depth: "Depth",
    features: "Observed Indicators",
    activeResonance: "Active Resonance",
    shapingTheVessels: "Click on any tier below to descend into the corresponding depths, updating the reader environment and setting focal resonance.",
    interactBtn: "GENERATE RESONANCE",
    laboratoryFilters: "Laboratory Filters",
    novelType: "Novel",
    organismType: "Organism",
    allType: "All",
    footerQuote: "I must remain quiet for a terrifying moment"
  },
  de: {
    subterraneanStructure: "Unterirdische Struktur",
    manuscriptReader: "Manuskript-Reader",
    curiosityLaboratory: "Kuriositäten-Labor",
    activeFocalLayer: "Aktive Fokusebene",
    sourceRecord: "QUELLEN-DOKUMENT",
    foundManuscript: "GEFUNDENES MANUSKRIPT",
    manuscriptFocus: "Manuskript-Fokus",
    coordinates: "KOORDINATEN",
    hue: "FARBTON",
    vitalsCoupled: "VITALSIGNALE GEKOPPELT",
    inspectionLab: "Inspektions-Laboratorium",
    resonance: "Resonanz",
    noSymmetryQuote: "Eine blasse Dichte, die sich in der Grauerhebung erhebt, geprägt in einem äußerst geschmackvollen und harmonischen Design.",
    levelTitle: "HANDWERKLICHE SERIE",
    depth: "Tiefe",
    features: "Beobachtete Indikatoren",
    activeResonance: "Aktive Resonanz",
    shapingTheVessels: "Klicken Sie auf eine Ebene unten, um in die entsprechenden Tiefen herabzusteigen, die Leseumgebung zu aktualisieren und die Fokusresonanz einzustellen.",
    interactBtn: "RESONANZ ERZEUGEN",
    laboratoryFilters: "Laborfilter",
    novelType: "Neuheit",
    organismType: "Organismus",
    allType: "Alle",
    footerQuote: "Ich muss für einen schrecklichen Moment still bleiben"
  },
  la: {
    subterraneanStructure: "Structura Subterranea",
    manuscriptReader: "Lector Manuscripti",
    curiosityLaboratory: "Laboratorium Curiositatis",
    activeFocalLayer: "Stratum Focale Activum",
    sourceRecord: "DOCUMENTUM ORIGINIS",
    foundManuscript: "MANUSCRIPTUM REPERTUM",
    manuscriptFocus: "Focus Manuscripti",
    coordinates: "COORDINATAE",
    hue: "COLORIS",
    vitalsCoupled: "VITALS COPULATA",
    inspectionLab: "Laboratorium Inspectionis",
    resonance: "Resonantia",
    noSymmetryQuote: "Densitas pallida in canitie surgens, in ea elegantissimo et harmonico consilio caelata.",
    levelTitle: "SERIES FABREFACTA",
    depth: "Altitudinis",
    features: "Indicatores Observati",
    activeResonance: "Resonantia Activa",
    shapingTheVessels: "Preme in quemvis gradum infra ut ad profunditates respondentes descendas, librum renovans et resonantiam focalem constituens.",
    interactBtn: "RESONANTIAM GENERARE",
    laboratoryFilters: "Filtra Laboratorii",
    novelType: "Novitas",
    organismType: "Organismus",
    allType: "Omnia",
    footerQuote: "Silendus mihi est per momentum terrificum"
  },
  ur: {
    subterraneanStructure: "زیرِ زمین ڈھانچہ",
    manuscriptReader: "مسودہ قاری",
    curiosityLaboratory: "عجائب خانہ کارگاہ",
    activeFocalLayer: "فعال مرکزی طبقہ",
    sourceRecord: "اصل ریکارڈ",
    foundManuscript: "دستیاب مسودہ",
    manuscriptFocus: "مسودہ کی توجہ",
    coordinates: "محددات (COORDINATES)",
    hue: "رنگت (HUE)",
    vitalsCoupled: "علاماتِ حیات مربوط",
    inspectionLab: "معائنہ کارگاہ",
    resonance: "ارتعاش",
    noSymmetryQuote: "دھندلے پن میں ابھرتی ہوئی ایک زرد کثافت، جو انتہائی نفیس اور ہم آہنگ انداز میں اس پر تراشی گئی ہے۔",
    levelTitle: "تخلیقی سلسلہ",
    depth: "گہرائی",
    features: "مشاہدہ شدہ مظاہر",
    activeResonance: "فعال ارتعاش",
    shapingTheVessels: "مخصوص گہرائیوں میں اترنے کے لیے ذیل کے کسی بھی طبقے پر کلک کریں، جو قاری کے ماحول کو تبدیل کرے گا اور گونج متعین کرے گا۔",
    interactBtn: "ارتعاش پیدا کریں",
    laboratoryFilters: "کارگاہ کے فلٹرز",
    novelType: "انوکھی چیزیں",
    organismType: "نامیاتی وجود",
    allType: "تمام",
    footerQuote: "مجھے ایک ہولناک لمحے کے لیے بالکل پرسکون رہنا ہوگا"
  }
};

export interface TranslatedChapter {
  id: number;
  title: string;
  paragraphs: string[];
}

export const chapterTranslations: Record<'en' | 'de' | 'la' | 'ur', Record<number, { title: string; summary?: string }>> = {
  en: {
    1: { title: "I. The Tower on the Horizon" },
    2: { title: "II. The Subterranean Mine" },
    3: { title: "III. The Novelty Goods" },
    4: { title: "IV. The Subterranean Distribution Tunnels" },
    5: { title: "V. The Subterranean Graveyard" },
    6: { title: "VI. The Enigmatic Betrayal" },
    7: { title: "VII. The Incubation of Hyper-Organisms" },
    8: { title: "VIII. The Shadowy Workshop" }
  },
  de: {
    1: { title: "I. Der Turm am Horizont" },
    2: { title: "II. Das unterirdische Bergwerk" },
    3: { title: "III. Die Kuriositätswaren" },
    4: { title: "IV. Die unterirdischen Verteilerstollen" },
    5: { title: "V. Der unterirdische Friedhof" },
    6: { title: "VI. Der rätselhafte Verrat" },
    7: { title: "VII. Die Bebrütung von Hyperorganismen" },
    8: { title: "VIII. Die schattenhafte Werkstatt" }
  },
  la: {
    1: { title: "I. Turris in Horizonte" },
    2: { title: "II. Fodina Subterranea" },
    3: { title: "III. Res Novae" },
    4: { title: "IV. Cuniculi Subterranei Carts" },
    5: { title: "V. Coemeterium Subterraneum" },
    6: { title: "VI. Proditio Enigmatica" },
    7: { title: "VII. Incubatio Hyper-Organismorum" },
    8: { title: "VIII. Officina Umbrosa" }
  },
  ur: {
    1: { title: "I. افق پر سرخ مینار" },
    2: { title: "II. زیرِ زمین کان" },
    3: { title: "III. انوکھی مصنوعات" },
    4: { title: "IV. تقسیم کی زیرِ زمین سرنگیں" },
    5: { title: "V. زیرِ زمین قبرستان" },
    6: { title: "VI. پراسرار خیانت" },
    7: { title: "VII. اعلیٰ نامیاتی اجسام کی پرورش" },
    8: { title: "VIII. پُراسرار کارگاہ" }
  }
};

export const levelTranslations: Record<'en' | 'de' | 'la' | 'ur', Record<number, { name: string; subtitle: string; depth: string; description: string; features: string[] }>> = {
  en: {
    0: {
      name: "The Three Stories",
      subtitle: "Ruin, Dust, and Ephemeral Clanking",
      depth: "Above Ground (3 Stories)",
      description: "Solid red-brick structure on all sides with no windows on the ground floor. It stood enclosed from the grey desolation. Once home to dense, clanging machinery which completely evaporated soon after operations ceased, leaving behind spectral gears visible only at twilight.",
      features: [
        "No doors or ground-level entryways",
        "Evaporated machinery outlines",
        "Twilight-visible spectral belts and gears",
        "Three levels of vacant dust and silence"
      ]
    },
    1: {
      name: "Level I: Subterranean Nexus",
      subtitle: "The Mine Shaft and Tunnels",
      depth: "Depth: -40 meters",
      description: "A wide, roughly excavated rocky chamber held up by a criss-crossing maze of wooden pillars, metal supports, concrete, bone, and a fibrous, sinewy webbing. This level serves as the nexus for a system of narrow distribution tunnels radiating underneath the desolate grey landscape.",
      features: [
        "Corroded wire-mesh elevator cage",
        "Bone and sinewy web support pillars",
        "Tunnels reaching near and far obscurities",
        "Distribution by simple carts and wagons"
      ]
    },
    2: {
      name: "Level II: The Subterranean Graveyard",
      subtitle: "The Birthing Yard of Flesh",
      depth: "Depth: -120 meters",
      description: "An intimate, secluded yard hemmed in by crooked wooden pickets and rusty wire. Nameless, blank headstones with abstract patterns are packed tightly together, glowing with a defective gray-green haze emitted by wall rocks coated in phosphorescent paint. These are graves not for burial, but for incubation.",
      features: [
        "Blank headstones without names or dates",
        "Greenish-gray phosphorescent paint glow",
        "Incubators of hyper-organisms",
        "Barren earth yielding larvae of flesh"
      ]
    },
    3: {
      name: "Level III: The Shadowy Workshop",
      subtitle: "Perfect Defects and Corruption",
      depth: "Depth: -300 meters",
      description: "A rumored third level extending even deeper, aligning symmetrically with the three stories above. It is here, safe from the second wave of ruination, that the factory carries out its most ambitious schedules of production, crafting putrid creations reaching toward perfect defect.",
      features: [
        "Symmetrical deep third basement",
        "Total silence of the abyssal workshop",
        "Production of perfect defects and disorders",
        "Vaporous rumors of corrupt manufacturing"
      ]
    }
  },
  de: {
    0: {
      name: "Die drei Stockwerke",
      subtitle: "Ruinen, Staub und flüchtiges Klirren",
      depth: "Über der Erde (3 Etagen)",
      description: "Ein massiver roter Backsteinbau auf allen Seiten ohne Fenster im Erdgeschoss. Es stand abgeschlossen von der grauen Trostlosigkeit da. Einst war es die Heimat dichter, klappernder Maschinen, die bald nach der Betriebseinstellung vollständig verdampften und spektrale Zahnräder hinterließen, die nur im Zwielicht zu sehen waren.",
      features: [
        "Keine Türen oder ebenerdigen Eingänge",
        "Spuren der verdampften Maschinen",
        "Im Zwielicht sichtbare Riemen und Räder",
        "Drei Ebenen unbewohnter Stille und Staub"
      ]
    },
    1: {
      name: "Ebene I: Unterirdischer Knoten",
      subtitle: "Der Minenschacht und die Stollen",
      depth: "Tiefe: -40 Meter",
      description: "Eine breite, grob ausgegrabene Felsenkammer, gestützt von einem kreuz und quer verlaufenden Labyrinth aus Holzbohlen, Metallträgern, Beton, Knochen und feinem sehnigen Gewebe. Diese Ebene dient als Verteilerknotenpunkt für schmale Tunnel, die sich unter der grauen und öden Landschaft ausbreiten.",
      features: [
        "Korrodierte Gitter-Fahrstuhlkabine",
        "Knochen und sehniges Stützgewebe",
        "Tunnel, die weiteste Winkel erreichen",
        "Verteilung durch einfache Handkarren"
      ]
    },
    2: {
      name: "Ebene II: Der unterirdische Friedhof",
      subtitle: "Das Geburtsfeld des Fleisches",
      depth: "Tiefe: -120 Meter",
      description: "Ein intimer, abgeschiedener Hof, umgeben von schiefen Lattenzäunen und rostigem Draht. Namenlose, leere Grabsteine mit abstrakten Mustern stehen dicht gedrängt und leuchten in einem aschigen, grünlich-grauen Dunst, der von phosphoreszierenden Steinwänden ausgeht. Grabstätten nicht zur Bestattung, sondern zur Brutpflege.",
      features: [
        "Namenlose Runen-Grabsteine ohne Daten",
        "Grünlich-graues Phosphorwandleuchten",
        "Inkubationsbetten für Hyperorganismen",
        "Fruchtbarer Schlamm gebiert Fleischlarven"
      ]
    },
    3: {
      name: "Ebene III: Die schattenhafte Werkstatt",
      subtitle: "Vollkommener Makel und Zerrüttung",
      depth: "Tiefe: -300 Meter",
      description: "Gerüchten zufolge erstreckt sich diese dritte Basement-Ebene noch tiefer und spiegelt symmetrisch die drei Stockwerke über der Erde. Hier, geschützt vor der Zerstörungswelle, betreibt die Fabrik stillschweigend ihr ehrgeiziges Vorhaben: die Produktion vollkommener Makel.",
      features: [
        "Symmetrisch tiefes drittes Untergeschoss",
        "Abgründiges Schweigen der Schattenwerkstatt",
        "Herstellung von makellosen Missbildungen",
        "Geheimnisvolles Rauschen der Fabrik"
      ]
    }
  },
  la: {
    0: {
      name: "Tria Tabulata",
      subtitle: "Ruina, Pulvis, et Clangor Ephemerus",
      depth: "Super terram (3 Tabulata)",
      description: "Structura solida ex rubris lateribus facta, sine fenestris in tabulato infimo, a canitie desolata circumclusa. Olim machinis strepentibus referta, quae mox post finem operis evanuerunt, reliquias tantum spectrales sub crepusculo visibiles relinquentes.",
      features: [
        "Nullae ianuae vel aditus in solo",
        "Líneamenta evanescentia machinarum",
        "Rotae spectrales in crepusculo visibiles",
        "Tria spatia silentii et pulveris plena"
      ]
    },
    1: {
      name: "Gradus I: Nexus Subterraneus",
      subtitle: "Puteus Fodinae et Cuniculi",
      depth: "Altitudinis: -40 m",
      description: "Amplum cubiculum in saxo excavatum, lignis, metallis, cementis, ossibus et texturis fibrosis sustentatum. Hic nexus constat cuniculorum ad distribuenda res novas sub sterili terra.",
      features: [
        "Pegma elevatoris ex filis ferreis corrosum",
        "Columnae sustentantes ex osse et textis",
        "Cuniculi ad ultima loca penetrantes",
        "Distributio carris parvis et vehiculis"
      ]
    },
    2: {
      name: "Gradus II: Coemeterium Subterraneum",
      subtitle: "Area Incubationis Carnis",
      depth: "Altitudinis: -120 m",
      description: "Hortus parvus ac secretus, sudibus curvis et filis ferrugineis saeptus. Cippi inscriptione vacui, consilio rudi ornati, coarctantur inter se in lumine pallido quod e muris phosphorescentibus effunditur. Non ad sepulturam, sed ad originem.",
      features: [
        "Cippi sine nominibus vel diebus",
        "Lumen pallidum virescentium murorum",
        "Incubatoria hyper-organismorum",
        "Terra sterilis larvas carnis gignens"
      ]
    },
    3: {
      name: "Gradus III: Officina Umbrosa",
      subtitle: "Vitia Perfecta et Proditio",
      depth: "Altitudinis: -300 m",
      description: "Tertius gradus profundior dicitur sub coemeterio patere, tribus superioribus aedibus symmetria respondens. Ibi officina caeca, a ruina servata, ad extremum vitiorum ordinem perducere pergit.",
      features: [
        "Tertium cubiculum profundum symmetricum",
        "Silentium profundum officinae umbrosa",
        "Fabricatio disordinis perfectique defectus",
        "Famae dubiae de operibus subterraneis"
      ]
    }
  },
  ur: {
    0: {
      name: "تین منزلیں",
      subtitle: "کھنڈرات، دھول اور مدہم گونج",
      depth: "زمین کے اوپر (3 منزلیں)",
      description: "ہر طرف سے سرخ اینٹوں کی ٹھوس ساخت، جس کے گراؤنڈ فلور پر کوئی کھڑکی نہیں ہے۔ یہ سرمئی ویرانی سے بالکل کٹی ہوئی کھڑی تھی۔ کسی زمانے میں یہ شور مچاتی مشینوں کا مرکز تھی جو آپریشن بند ہونے کے فوراً بعد غائب ہو گئیں، اور اپنے پیچھے صرف دھندلے سائے چھوڑ گئیں جو صرف شام کے وقت دیکھے جا سکتے ہیں۔",
      features: [
        "زمین پر کوئی دروازہ یا داخلہ راستہ نہیں",
        "غائب ہونے والی مشینری کے خاکے",
        "شام کے وقت دکھائی دینے والی گراریاں",
        "تین منزلوں پر پھیلی دھول اور بھیانک خاموشی"
      ]
    },
    1: {
      name: "طبقہ I: زیرِ زمین گٹھ جوڑ",
      subtitle: "کان کے راستے اور سرنگیں",
      depth: "گہرائی: -40 میٹر",
      description: "پتھریلی مٹی سے کھودا گیا ایک وسیع کمرہ، جسے لکڑی کے ستونوں، دھاتی شہتیروں، کنکریٹ، ہڈیوں اور باریک ریشے دار جھلیوں نے سنبھال رکھا ہے۔ یہ طبقہ سرخ ٹاور کے ارد گرد پھیلی ویران اور سرمئی بنجر زمین کے نیچے موجود سرنگوں کے نظام کا مرکز ہے۔",
      features: [
        "لوہے کی زنگ آلود جالی دار لفٹ کا پنجرہ",
        "ہڈیوں اور ریشے دار جھلیوں سے بنے ستون",
        "دور دراز مقامات تک پھیلی تاریک سرنگیں",
        "چھوٹی ہینڈ کارٹس کے ذریعے مصنوعات کی تقسیم"
      ]
    },
    2: {
      name: "طبقہ II: زیرِ زمین قبرستان",
      subtitle: "گوشت اور نامیاتی ڈھانچوں کا مرکز",
      depth: "گہرائی: -120 میٹر",
      description: "ایک چھوٹا اور الگ تھلگ صحن، جو لکڑی کے ٹوٹے پھوٹے باڑ اور زنگ آلود جالی سے گھرا ہوا ہے۔ بغیر نام اور تاریخ کے خالی کتبے ایک دوسرے سے بالکل جڑے کھڑے ہیں، جو چٹانی دیواروں پر لگے فاسفورس کے مدہم پینٹ سے روشن ہیں اور ایک سرمئی دھند بکھیرتے ہیں۔ یہ قبریں دفنانے کے لیے نہیں، بلکہ پرورش کے لیے ہیں۔",
      features: [
        "بغیر نام اور تاریخ کے بالکل خالی کتبے",
        "فاسفورسی چٹانوں کی سبز رنگ کی مدہم روشنی",
        "اعلیٰ نامیاتی اجسام کی پرورش کے بستر",
        "بنجر مٹی سے پیدا ہونے والے زندہ کیڑے"
      ]
    },
    3: {
      name: "طبقہ III: پُراسرار کارگاہ",
      subtitle: "کامل نقائص اور پراسراریت",
      depth: "گہرائی: -300 میٹر",
      description: "کہا جاتا ہے کہ ایک تیسرا طبقہ اس سے بھی زیادہ گہرائی میں واقع ہے، جو زمین کے اوپر کی تینوں منزلوں کے بالکل متناسب ہے۔ یہیں پر، تباہی کی دوسری لہر سے محفوظ، فیکٹری اپنا سب سے اہم پیداواری کام خاموشی سے انجام دیتی ہے، انتہائی غلیظ اور کامل نقائص والی مصنوعات تیار کرتی ہے۔",
      features: [
        "انتہائی گہرائی میں واقع متوازی تیسرا تہہ خانہ",
        "تاریک کارگاہ کا ابدی اور بھیانک سکوت",
        "انتہائی ناقص اور معذور مصنوعات کی تیاری",
        "پراسرار اور خفیہ پیداوار کی دبی دبی افواہیں"
      ]
    }
  }
};
