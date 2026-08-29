export const sharedMeta = {
  location: "Sevilla, Spain",
  whatsappNumber: "34601585508",
  whatsappDisplay: "+34 601 585 508",
  instagramUrl: "https://www.instagram.com/martaorozco.quiro",
  googleReviewsUrl: "https://maps.app.goo.gl/94fTHacXPXbomvKB8",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1sCalle+Esperanza+Elena+Caro+2,+41002+Sevilla,+Espa%C3%B1a",
  mapsUrl: "https://maps.app.goo.gl/94fTHacXPXbomvKB8",
  ogImage: "/og-image.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  themeColor: "#2c3e2d",
};

export const businessInfo = {
  name: {
    es: "Marta Orozco Quiromasajista",
    en: "Marta Orozco Massage Therapist",
  },
  streetAddress: "C. Esperanza Elena Caro, 2, 1°A4",
  postalCode: "41002",
  addressLocality: { es: "Sevilla", en: "Seville" },
  addressRegion: "Andalucía",
  addressCountry: "ES",
  geo: { latitude: 37.3953758, longitude: -5.9947417 },
  priceRange: "€€",
  openingHours: {
    dayOfWeek: "Thursday",
    opens: "15:00",
    closes: "21:00",
  },
} as const;

export const sharedTreatments = [
  {
    id: "descontracturante",
    image: "/assets/images/descontracturante.webp",
    imagePosition: "start" as const,
    durations: [
      { min: 30, price: 25 },
      { min: 50, price: 35 },
      { min: 80, price: 50 },
    ],
  },
  {
    id: "relajante",
    image: "/assets/images/relajante.webp",
    imagePosition: "start" as const,
    durations: [
      { min: 30, price: 20 },
      { min: 50, price: 30 },
      { min: 80, price: 45 },
    ],
  },
  {
    id: "detox",
    image: "/assets/images/detox.webp",
    imagePosition: "end" as const,
    durations: [
      { min: 50, price: 40 },
      { min: 80, price: 55 },
    ],
  },
  {
    id: "craneo-facial",
    image: "/assets/images/craneofacial.webp",
    imagePosition: "end" as const,
    durations: [{ min: 30, price: 20 }],
  },
] as const;

export const sharedRituals = [
  {
    id: "ritual-desconexion",
    iconClass: "fa-solid fa-spa",
    duration: 80,
    price: 55,
  },
  {
    id: "ritual-cuerpo-ligero",
    iconClass: "fa-solid fa-feather-pointed",
    duration: 80,
    price: 60,
  },
] as const;

export const sharedBonoTiers = [
  { id: "single", sessions: 1, discount: 0 },
  { id: "bono5", sessions: 5, discount: 0.1 },
  { id: "bono10", sessions: 10, discount: 0.15 },
] as const;

export const bonoExamples = [
  { treatmentId: "relajante", durationMin: 50, bonoId: "bono5" },
  { treatmentId: "descontracturante", durationMin: 50, bonoId: "bono10" },
] as const;

export const aboutStatValues = [{ value: "+5" }, { value: "+1500" }] as const;
