import { en } from "./en";
import { es } from "./es";
import {
  aboutStatValues,
  bonoExamples,
  sharedBonoTiers,
  sharedMeta,
  sharedRituals,
  sharedTreatments,
} from "./shared";

export type { FaqAnswerPart, FaqItem } from "./faq";
export { faqAnswerText } from "./faq";

export type Locale = "es" | "en";
export const LOCALE_KEY = "marta-orozco-locale";

export type Treatment = {
  id: string;
  bookingValue: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: "start" | "end";
  durations: { min: number; price: number; tidycalUrl: string }[];
};

export type Ritual = {
  id: string;
  bookingValue: string;
  title: string;
  description: string;
  iconClass: string;
  duration: number;
  price: number;
  tidycalUrl: string;
};

export type Review = {
  id: string;
  name: string;
  stars: 5;
  quote: string;
  treatmentName: string;
};

export type BonoTier = {
  id: string;
  sessions: number;
  discount: number;
  label: string;
  shortLabel: string;
};

type LocaleDict = typeof es | typeof en;

function buildTreatments(dict: LocaleDict): Treatment[] {
  return sharedTreatments.map((shared) => {
    const copy = dict.treatments[shared.id as keyof typeof dict.treatments];
    return {
      id: shared.id,
      image: shared.image,
      imagePosition: shared.imagePosition,
      durations: [...shared.durations],
      ...copy,
    };
  });
}

function buildRituals(dict: LocaleDict): Ritual[] {
  return sharedRituals.map((shared) => {
    const copy = dict.ritualCopy[shared.id as keyof typeof dict.ritualCopy];
    return {
      id: shared.id,
      iconClass: shared.iconClass,
      duration: shared.duration,
      price: shared.price,
      tidycalUrl: shared.tidycalUrl,
      ...copy,
    };
  });
}

function buildBonoTiers(dict: LocaleDict): BonoTier[] {
  return sharedBonoTiers.map((shared) => {
    const copy = dict.bonoTiers[shared.id as keyof typeof dict.bonoTiers];
    return {
      id: shared.id,
      sessions: shared.sessions,
      discount: shared.discount,
      ...copy,
    };
  });
}

export function getSite(locale: Locale) {
  const dict = locale === "en" ? en : es;
  const treatments = buildTreatments(dict);
  const rituals = buildRituals(dict);
  const bonoTiers = buildBonoTiers(dict);

  const bookingOptions = [
    ...treatments.map((treatment) => ({
      id: treatment.id,
      label: treatment.bookingValue,
    })),
    ...rituals.map((ritual) => ({
      id: ritual.id,
      label: `${ritual.bookingValue} (${ritual.duration} min - ${ritual.price}EUR)`,
    })),
  ];

  return {
    locale,
    meta: {
      ...dict.meta,
      ...sharedMeta,
    },
    sectionIds: dict.sectionIds,
    navItems: dict.navItems,
    hero: dict.hero,
    about: dict.about,
    aboutStats: aboutStatValues.map((stat, i) => ({
      value: stat.value,
      label: dict.aboutStats[i].label,
    })),
    massages: dict.massages,
    ritualsContent: dict.rituals,
    reviewsContent: dict.reviewsContent,
    reviews: dict.reviews,
    faq: dict.faq,
    bonos: dict.bonos,
    contact: dict.contact,
    treatments,
    rituals,
    bonoTiers,
    bonoExamples: [...bonoExamples],
    bookingOptions,
    footer: dict.footer,
    ui: dict.ui,
  };
}

export type SiteBundle = ReturnType<typeof getSite>;

/** Default Spanish exports for backward-compatible re-exports from `site.ts`. */
const defaultSite = getSite("es");

export const siteMeta = defaultSite.meta;
export const navItems = defaultSite.navItems;
export const heroContent = defaultSite.hero;
export const aboutStats = defaultSite.aboutStats;
export const aboutContent = defaultSite.about;
export const massagesContent = defaultSite.massages;
export const ritualsContent = defaultSite.ritualsContent;
export const reviewsContent = defaultSite.reviewsContent;
export const reviews = defaultSite.reviews;
export const bonosContent = defaultSite.bonos;
export const contactContent = defaultSite.contact;
export const treatments = defaultSite.treatments;
export const rituals = defaultSite.rituals;
export const bonoTiers = defaultSite.bonoTiers;
export { bonoExamples };
export const bookingOptions = defaultSite.bookingOptions.map((o) => o.label);

export {
  HASH_EN_TO_ES,
  HASH_ES_TO_EN,
  mapHashForLocale,
  mappedHashHref,
} from "./hashes";
