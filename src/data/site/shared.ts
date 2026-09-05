export const sharedMeta = {
  location: "Sevilla, Spain",
  whatsappNumber: "34601585508",
  whatsappDisplay: "+34 601 585 508",
  instagramUrl: "https://www.instagram.com/martaorozco.quiro",
  googleReviewsUrl: "https://maps.app.goo.gl/HdZVpzvzBEGV6GAZ8",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d288.3802210536092!2d-5.994944333855233!3d37.39530728128045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126d6026a5b213%3A0x1d1171c85d46e49f!2sMarta%20Orozco%20Quiromasaje!5e0!3m2!1sen!2ses!4v1787998053536!5m2!1sen!2ses",
  mapsUrl: "https://maps.app.goo.gl/HdZVpzvzBEGV6GAZ8",
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
      {
        min: 30,
        price: 25,
        tidycalUrl: "https://tidycal.com/martaorozcoquiro/masaje-descontracturante-30",
      },
      {
        min: 50,
        price: 35,
        tidycalUrl: "https://tidycal.com/martaorozcoquiro/masaje-descontracturante-50",
      },
      {
        min: 80,
        price: 50,
        tidycalUrl: "https://tidycal.com/martaorozcoquiro/masaje-descontracturante-80",
      },
    ],
  },
  {
    id: "relajante",
    image: "/assets/images/relajante.webp",
    imagePosition: "start" as const,
    durations: [
      {
        min: 30,
        price: 20,
        tidycalUrl: "https://tidycal.com/martaorozcoquiro/masaje-relajante-30",
      },
      {
        min: 50,
        price: 30,
        tidycalUrl: "https://tidycal.com/martaorozcoquiro/masaje-relajante-50",
      },
      {
        min: 80,
        price: 45,
        tidycalUrl: "https://tidycal.com/martaorozcoquiro/masaje-relajante-80",
      },
    ],
  },
  {
    id: "detox",
    image: "/assets/images/detox.webp",
    imagePosition: "end" as const,
    durations: [
      {
        min: 50,
        price: 40,
        tidycalUrl: "https://tidycal.com/martaorozcoquiro/masaje-detox-50",
      },
      {
        min: 80,
        price: 55,
        tidycalUrl: "https://tidycal.com/martaorozcoquiro/masaje-detox-80",
      },
    ],
  },
  {
    id: "craneo-facial",
    image: "/assets/images/craneofacial.webp",
    imagePosition: "end" as const,
    durations: [
      {
        min: 30,
        price: 20,
        tidycalUrl: "https://tidycal.com/martaorozcoquiro/masaje-craneofacial-30",
      },
    ],
  },
] as const;

export const sharedRituals = [
  {
    id: "ritual-desconexion",
    iconClass: "fa-solid fa-spa",
    duration: 80,
    price: 55,
    tidycalUrl: "https://tidycal.com/martaorozcoquiro/ritualdesconexiontotal-80",
  },
  {
    id: "ritual-cuerpo-ligero",
    iconClass: "fa-solid fa-feather-pointed",
    duration: 80,
    price: 60,
    tidycalUrl: "https://tidycal.com/martaorozcoquiro/ritualcuerpoligero-80",
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
