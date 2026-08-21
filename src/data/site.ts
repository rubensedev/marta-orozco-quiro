export type Treatment = {
  id: string;
  bookingValue: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: "start" | "end";
  durations: { min: number; price: number }[];
};

export type Ritual = {
  id: string;
  bookingValue: string;
  title: string;
  description: string;
  iconClass: string;
  duration: number;
  price: number;
};

export type Review = {
  id: string;
  name: string;
  stars: 5;
  quote: string;
  treatmentName: string;
};

export const siteMeta = {
  lang: "es",
  title: "Marta Orozco | Quiromasajista",
  description:
    "Marta Orozco, quiromasajista profesional. Masajes relajantes, detox, descontracturantes y rituales de bienestar en Sevilla.",
  location: "Sevilla, Spain",
  whatsappNumber: "34601585508",
  whatsappDisplay: "+34 601 585 508",
  whatsappInquiry: "Hola Marta! Me gustaría reservar una cita. ¿Tienes disponibilidad?",
  instagramUrl: "https://www.instagram.com/martaorozco.quiro",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1sCalle+Esperanza+Elena+Caro+2,+41002+Sevilla,+Espa%C3%B1a",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=C.+Esperanza+Elena+Caro,+2,+41002+Sevilla",
};

export const navItems = [
  { href: "#sobre-mi", label: "SOBRE MÍ" },
  { href: "#masajes", label: "MASAJES" },
  { href: "#bonos", label: "BONOS" },
  { href: "#testimonios", label: "TESTIMONIOS" },
  { href: "#contacto", label: "CONTACTO" },
];

export const heroContent = {
  title: "Espacio de calma, salud y equilibrio corporal",
  description:
    "Tratamientos de quiromasaje diseñados para aliviar tensiones físicas, activar tu energía vital y restablecer la paz en tu día a día.",
  primaryCta: "RESERVAR CITA",
  secondaryCta: {
    label: "VER MASAJES Y PRECIOS",
    href: "#masajes",
  },
  backgroundImageAlt:
    "Toalla enrollada en un espacio de bienestar para tratamientos de quiromasaje.",
  portraitAlt: "Retrato de Marta Orozco.",
};

export const aboutStats = [
  { value: "+5", label: "Años de experiencia" },
  { value: "+1500", label: "Personas satisfechas" },
];

export const aboutContent = {
  heading: "Sobre mí",
  title: "Marta Orozco",
  subtitle: "Quiromasajista Profesional",
  paragraphs: [
    "Siempre me han interesado las técnicas manuales, considerándolas un catalizador muy potente que nos enraíza directamente con energías primigenias, activando un estado de conciencia muy útil en nuestro día a día.",
    "Es por eso que, como quiromasajista, he encontrado una fórmula muy orgánica de entretejer esas energías con diferentes técnicas de masaje, ofreciéndote sesiones personalizadas en función de tus necesidades.",
  ],
};

export const massagesContent = {
  heading: "Masajes",
  description:
    "Elige duración y tipo de compra para ver tu precio. Compara el ahorro con bonos de 5 o 10 sesiones.",
};

export const ritualsContent = {
  heading: "Rituales y bonos",
  description:
    "Rituales completos para una renovación profunda o paquetes de bonos con descuento especial.",
  ctaLabel: "Reservar Ritual",
};

export const reviewsContent = {
  heading: "¿Tienes dudas?",
  description:
    "Desde 2021 he acompañado a más de 1.500 personas en su camino hacia el bienestar. Estas voces cuentan cómo se sintieron después de la sesión — por si te ayuda a dar el paso.",
};

export const bonosContent = {
  heading: "Bonos",
  discountLabel: "Descuento",
  examplesHeading: "Ejemplos de ahorro",
  ctaLabel: "Preguntar por Bonos",
};

export const contactContent = {
  heading: "Ubicación y contacto",
  hours: "Jueves de 15:00 a 21:00",
  hoursNote: "*Citas bajo reserva previa para garantizar tu atención personalizada.",
  addressLines: ["C. Esperanza Elena Caro, 2, 1°A4", "41002 Sevilla"],
  ctaLabel: "Reservar Ahora",
  openInMapsLabel: "Abrir en Maps",
  mapHint: "Consulta el mapa para indicaciones de llegada",
  imageAlt: "Espacio donde se realizan las sesiones.",
  mapTitle: "Mapa de ubicación de Marta Orozco",
};

export const treatments: Treatment[] = [
  {
    id: "relajante",
    bookingValue: "Masaje Relajante",
    title: "Relajante",
    description:
      "Ideal para reducir el estrés, mejorar el descanso y regalarte un momento para ti.",
    image: "/assets/images/relajante.webp",
    imageAlt: "Ambiente relajante para masaje corporal.",
    imagePosition: "start",
    durations: [
      { min: 30, price: 20 },
      { min: 50, price: 30 },
      { min: 80, price: 45 },
    ],
  },
  {
    id: "detox",
    bookingValue: "Masaje Detox",
    title: "Detox",
    description:
      "Favorece la circulación, alivia la sensación de piernas pesadas y aporta una profunda ligereza.",
    image: "/assets/images/detox.webp",
    imageAlt: "Tratamiento detox orientado al bienestar y la circulación.",
    imagePosition: "end",
    durations: [
      { min: 50, price: 40 },
      { min: 80, price: 55 },
    ],
  },
  {
    id: "descontracturante",
    bookingValue: "Masaje Descontracturante",
    title: "Descontracturante",
    description:
      "Pensado para aliviar contracturas, tensión muscular y molestias derivadas del trabajo o el deporte.",
    image: "/assets/images/descontracturante.webp",
    imageAlt: "Masaje descontracturante orientado al alivio muscular.",
    imagePosition: "start",
    durations: [
      { min: 30, price: 25 },
      { min: 50, price: 35 },
      { min: 80, price: 50 },
    ],
  },
  {
    id: "craneo-facial",
    bookingValue: "Masaje Cráneo Facial",
    title: "Cráneo Facial",
    description:
      "Libera la tensión del rostro, mandíbula y cuello. Relaja, rejuvenece y aporta bienestar.",
    image: "/assets/images/craneofacial.webp",
    imageAlt: "Masaje cráneo facial para rostro, mandíbula y cuello.",
    imagePosition: "end",
    durations: [{ min: 30, price: 20 }],
  },
];

export const rituals: Ritual[] = [
  {
    id: "ritual-desconexion",
    bookingValue: "Ritual Desconexión Total",
    title: "Ritual Desconexión Total",
    description:
      "Combina técnicas relajantes y/o descontracturantes con un trabajo específico en hombros, cuello, rostro y cráneo.",
    iconClass: "fa-solid fa-spa",
    duration: 80,
    price: 55,
  },
  {
    id: "ritual-cuerpo-ligero",
    bookingValue: "Ritual Cuerpo Ligero",
    title: "Ritual Cuerpo Ligero",
    description:
      "Tratamiento diseñado para aliviar la pesadez y recuperar el bienestar general. Se combina un masaje relajante y/o descontracturante con técnicas circulatorias.",
    iconClass: "fa-solid fa-feather-pointed",
    duration: 80,
    price: 60,
  },
];

export const reviews: Review[] = [
  {
    id: "review-01",
    name: "Laura M.",
    stars: 5,
    quote:
      "Salí como nueva. Noté el cuerpo blandito y la cabeza en silencio por primera vez en semanas.",
    treatmentName: "Relajante",
  },
  {
    id: "review-02",
    name: "Javier R.",
    stars: 5,
    quote:
      "Tenía la espalda hecha un nudo y me fui caminando ligero. Marta tiene unas manos mágicas.",
    treatmentName: "Descontracturante",
  },
  {
    id: "review-03",
    name: "Ana S.",
    stars: 5,
    quote:
      "Piernas ligeras, sensación de frescura y una calma que me acompañó todo el día. Recomendadísimo.",
    treatmentName: "Detox",
  },
  {
    id: "review-04",
    name: "Patricia G.",
    stars: 5,
    quote:
      "Se me disolvió la tensión de mandíbula y cuello. Salí con la cara relajada y una sonrisa fácil.",
    treatmentName: "Cráneo Facial",
  },
  {
    id: "review-05",
    name: "Pablo V.",
    stars: 5,
    quote:
      "Una desconexión total de verdad. Cerré los ojos y el mundo se quedó fuera. Volveré seguro.",
    treatmentName: "Ritual Desconexión Total",
  },
  {
    id: "review-06",
    name: "Lucía P.",
    stars: 5,
    quote:
      "Ambiente cálido, trato cercano y un masaje que me dejó flotando. Justo lo que necesitaba.",
    treatmentName: "Relajante",
  },
  {
    id: "review-07",
    name: "Marta H.",
    stars: 5,
    quote: "Me sentí liviana y con energía suave, sin agobio. Ideal cuando el cuerpo pide reset.",
    treatmentName: "Ritual Cuerpo Ligero",
  },
  {
    id: "review-08",
    name: "Andrés N.",
    stars: 5,
    quote:
      "Después de horas frente al ordenador, este masaje me devolvió el cuello. Super contento.",
    treatmentName: "Descontracturante",
  },
  {
    id: "review-09",
    name: "Irene C.",
    stars: 5,
    quote: "Relajada, renovada y con ganas de cuidarme más. La sesión se me hizo un suspiro.",
    treatmentName: "Detox",
  },
];

export const bonoTiers = [
  {
    id: "single",
    sessions: 1,
    discount: 0,
    label: "Sesión suelta",
    shortLabel: "1 sesión",
  },
  {
    id: "bono5",
    sessions: 5,
    discount: 0.1,
    label: "Bono 5 sesiones",
    shortLabel: "Bono 5 (-10%)",
  },
  {
    id: "bono10",
    sessions: 10,
    discount: 0.15,
    label: "Bono 10 sesiones",
    shortLabel: "Bono 10 (-15%)",
  },
] as const;

export const bonoExamples = [
  { treatmentId: "relajante", durationMin: 50, bonoId: "bono5" },
  { treatmentId: "descontracturante", durationMin: 50, bonoId: "bono10" },
];

export const bookingOptions = [
  ...treatments.map((treatment) => treatment.bookingValue),
  ...rituals.map(
    (ritual) => `${ritual.bookingValue} (${ritual.duration} min - ${ritual.price}EUR)`,
  ),
];
