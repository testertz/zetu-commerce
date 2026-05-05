import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "sw";

type Dict = Record<string, { en: string; sw: string }>;

export const dict: Dict = {
  "nav.shop": { en: "Shop", sw: "Duka" },
  "nav.how": { en: "How it works", sw: "Inavyofanya kazi" },
  "nav.trust": { en: "Why us", sw: "Kwanini sisi" },
  "nav.contact": { en: "Contact", sw: "Wasiliana" },
  "cta.order": { en: "Order via WhatsApp", sw: "Agiza kupitia WhatsApp" },
  "cta.browse": { en: "Browse products", sw: "Tazama bidhaa" },
  "cta.chat": { en: "Chat with us", sw: "Ongea nasi" },
  "cta.viewAll": { en: "View all", sw: "Tazama zote" },
  "hero.tag": { en: "Tanzania's WhatsApp-first electronics store", sw: "Duka la kwanza la WhatsApp Tanzania" },
  "hero.title1": { en: "Premium tech.", sw: "Teknolojia ya hali ya juu." },
  "hero.title2": { en: "Ordered by chat.", sw: "Inaagizwa kwa chat." },
  "hero.title3": { en: "Delivered today.", sw: "Inawasilishwa leo." },
  "hero.sub": {
    en: "Authentic phones, laptops, and audio gear. No accounts. No checkout pages. Just message us on WhatsApp and we deliver in Dar es Salaam.",
    sw: "Simu halisi, laptops, na vifaa vya sauti. Bila akaunti. Bila checkout. Tutumie WhatsApp tu na tutawasilisha Dar es Salaam.",
  },
  "ticker.delivered": { en: "1,000+ orders delivered", sw: "Maagizo 1,000+ yamewasilishwa" },
  "ticker.dar": { en: "Free delivery in Dar es Salaam", sw: "Usafirishaji bure Dar es Salaam" },
  "ticker.pod": { en: "Pay on delivery available", sw: "Lipa wakati wa kupokea" },
  "ticker.warranty": { en: "1 year warranty on most items", sw: "Dhamana ya mwaka 1 kwa bidhaa nyingi" },
  "ticker.sealed": { en: "100% sealed & authentic", sw: "100% halisi na zimefungwa" },
  "why.title": { en: "Why TechZetu", sw: "Kwanini TechZetu" },
  "why.sub": { en: "Built for how Tanzanians actually shop.", sw: "Imejengwa kwa namna Watanzania wanavyonunua." },
  "why.1.t": { en: "WhatsApp-first ordering", sw: "Agiza kwa WhatsApp" },
  "why.1.d": { en: "Skip the forms. One message and you're done.", sw: "Acha fomu. Ujumbe mmoja na umemaliza." },
  "why.2.t": { en: "Authentic & sealed", sw: "Halisi na zimefungwa" },
  "why.2.d": { en: "Inspect every item before you pay.", sw: "Kagua kila bidhaa kabla ya kulipa." },
  "why.3.t": { en: "Delivered today", sw: "Inawasilishwa leo" },
  "why.3.d": { en: "Same-day delivery within Dar es Salaam.", sw: "Usafirishaji wa siku hiyo hiyo Dar es Salaam." },
  "why.4.t": { en: "Best price promise", sw: "Ahadi ya bei nzuri" },
  "why.4.d": { en: "Find it cheaper? We'll match it.", sw: "Umeiona rahisi? Tutalingana nayo." },
  "products.title": { en: "Featured products", sw: "Bidhaa maalum" },
  "products.sub": { en: "Hand-picked from our most-loved tech.", sw: "Zilizochaguliwa kutoka bidhaa zinazopendwa." },
  "shop.title": { en: "Shop everything", sw: "Nunua kila kitu" },
  "shop.search": { en: "Search products…", sw: "Tafuta bidhaa…" },
  "shop.empty": { en: "No products match your search.", sw: "Hakuna bidhaa zinazolingana." },
  "how.title": { en: "How it works", sw: "Inavyofanya kazi" },
  "how.1.t": { en: "Browse", sw: "Tazama" },
  "how.1.d": { en: "Pick the product you want.", sw: "Chagua bidhaa unayotaka." },
  "how.2.t": { en: "WhatsApp us", sw: "Tutumie WhatsApp" },
  "how.2.d": { en: "Tap the button — your message is ready.", sw: "Bonyeza kitufe — ujumbe uko tayari." },
  "how.3.t": { en: "Delivered", sw: "Imewasilishwa" },
  "how.3.d": { en: "We confirm and deliver. Pay on arrival.", sw: "Tunathibitisha na kuwasilisha. Lipa unapopokea." },
  "footer.tag": { en: "Tanzania's WhatsApp-first electronics store.", sw: "Duka la kwanza la WhatsApp Tanzania." },
  "footer.rights": { en: "All rights reserved.", sw: "Haki zote zimehifadhiwa." },
  "product.specs": { en: "Specifications", sw: "Vipimo" },
  "product.delivery": { en: "Free delivery in Dar es Salaam · within 24 hrs", sw: "Usafirishaji bure Dar es Salaam · ndani ya saa 24" },
  "product.stock": { en: "In stock", sw: "Ipo dukani" },
  "product.lowStock": { en: "Only a few left", sw: "Zimebaki chache" },
  "product.back": { en: "Back to shop", sw: "Rudi dukani" },
  "product.notFound": { en: "Product not found.", sw: "Bidhaa haijapatikana." },
  "msg.product": { en: "Hi TechZetu, I want to order {name} for {price}. Is it available?", sw: "Habari TechZetu, ninataka kuagiza {name} kwa {price}. Ipo?" },
  "msg.general": { en: "Hi TechZetu, I'd like some help choosing a product.", sw: "Habari TechZetu, ningependa msaada kuchagua bidhaa." },
};

export const t = (key: string, lang: Lang, vars?: Record<string, string>) => {
  const entry = dict[key];
  let s = entry ? entry[lang] : key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replaceAll(`{${k}}`, v);
    }
  }
  return s;
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string>) => string;
  theme: "dark" | "light";
  toggleTheme: () => void;
};

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedLang = (localStorage.getItem("tz-lang") as Lang) || "en";
    const savedTheme = (localStorage.getItem("tz-theme") as "dark" | "light") || "dark";
    setLangState(savedLang);
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("tz-theme", theme);
  }, [theme]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("tz-lang", l);
  };

  return (
    <I18nCtx.Provider
      value={{
        lang,
        setLang,
        t: (key, vars) => t(key, lang, vars),
        theme,
        toggleTheme: () => setTheme((p) => (p === "dark" ? "light" : "dark")),
      }}
    >
      {children}
    </I18nCtx.Provider>
  );
}

export const useI18n = () => {
  const c = useContext(I18nCtx);
  if (!c) throw new Error("useI18n must be inside I18nProvider");
  return c;
};
