export const sharedMeta = {
  location: "Sevilla, Spain",
  whatsappNumber: "34601585508",
  whatsappDisplay: "+34 601 585 508",
  instagramUrl: "https://www.instagram.com/martaorozco.quiro",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1sCalle+Esperanza+Elena+Caro+2,+41002+Sevilla,+Espa%C3%B1a",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=C.+Esperanza+Elena+Caro,+2,+41002+Sevilla",
};

export const sharedTreatments = [
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
