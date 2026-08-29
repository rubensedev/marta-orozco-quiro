/** Spanish copy — moved verbatim from the previous Spanish-only site.ts. Do not alter wording. */
export const es = {
  meta: {
    lang: "es" as const,
    title: "Marta Orozco | Quiromasajista en Sevilla",
    description:
      "Quiromasajista profesional en el centro deSevilla. Masajes descontracturantes, relajantes, detox y rituales de bienestar. Reserva cita por WhatsApp.",
    ogLocale: "es_ES",
    ogLocaleAlternate: "en_GB",
    whatsappInquiry: "Hola Marta! Me gustaría reservar una cita. ¿Tienes disponibilidad?",
    whatsappBonosInquiry:
      "Hola Marta! Quiero más información sobre los bonos de masajes",
  },
  sectionIds: {
    home: "inicio",
    about: "sobre-mi",
    massages: "masajes",
    packages: "bonos",
    faq: "preguntas-frecuentes",
    reviews: "testimonios",
    contact: "contacto",
  },
  navItems: [
    { href: "#sobre-mi", label: "SOBRE MÍ" },
    { href: "#masajes", label: "MASAJES" },
    { href: "#bonos", label: "BONOS" },
    { href: "#testimonios", label: "TESTIMONIOS" },
    { href: "#contacto", label: "CONTACTO" },
  ],
  hero: {
    title: "Espacio de calma, salud y equilibrio corporal",
    subtitle: "Quiromasajista profesional en Sevilla",
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
  },
  aboutStats: [{ label: "Años de experiencia" }, { label: "Clientes satisfechos" }],
  about: {
    heading: "Sobre mí",
    title: "Marta Orozco",
    subtitle: "Quiromasajista Profesional",
    paragraphs: [
      "Siempre me han interesado las técnicas manuales, considerándolas un catalizador muy potente que nos enraíza directamente con energías primigenias, activando un estado de conciencia muy útil en nuestro día a día.",
      "Es por eso que, como quiromasajista, he encontrado una fórmula muy orgánica de entretejer esas energías con diferentes técnicas de masaje, ofreciéndote sesiones personalizadas en función de tus necesidades.",
      "Llevo más de cinco años acompañando a clientes con masajes personalizados, desde tratamientos descontracturantes hasta sesiones relajantes y rituales de bienestar en mi espacio del centro de Sevilla.",
    ],
  },
  massages: {
    heading: "Masajes en Sevilla",
    description:
      "Elige duración y tipo de compra para ver tu precio. Compara el ahorro con bonos de 5 o 10 sesiones.",
  },
  rituals: {
    heading: "Rituales y bonos",
    description:
      "Rituales completos para una renovación profunda o paquetes de bonos con descuento especial.",
    ctaLabel: "Reservar Ritual",
  },
  reviewsContent: {
    heading: "¿Tienes dudas?",
    description:
      "Desde 2021 he acompañado a más de 1.500 personas en su camino hacia el bienestar. Estas voces cuentan cómo se sintieron después de la sesión — por si te ayuda a dar el paso.",
    googleCta: "Ver todas las reseñas en Google",
  },
  faq: {
    heading: "Preguntas frecuentes",
    description:
      "Respuestas rápidas sobre reservas, sesiones y tratamientos de quiromasaje en Sevilla.",
    items: [
      {
        question: "¿Cómo reservo una cita?",
        answer: [
          "Puedes reservar por WhatsApp o desde el botón «",
          { label: "Reservar ahora", action: "booking" as const },
          "» de esta web. Indica el tratamiento, duración y tu preferencia de horario. Los masajes son siempre bajo reserva previa.",
        ],
      },
      {
        question: "¿Cuál es el horario de atención?",
        answer: [
          "Atiendo los jueves de 15:00 a 21:00 en mi espacio del centro de Sevilla. Te confirmo la disponibilidad exacta al reservar.",
        ],
      },
      {
        question: "¿Qué debo llevar o preparar para la sesión?",
        answer: [
          "No necesitas traer material. Llega unos minutos antes y, si tienes alguna molestia concreta (espalda, cuello, piernas), coméntamelo al reservar para adaptar el masaje.",
        ],
      },
      {
        question: "¿Qué masaje me conviene: relajante, descontracturante o detox?",
        answer: [
          "El relajante reduce estrés y mejora el descanso. El descontracturante alivia tensiones musculares y contracturas. El detox favorece la circulación y la sensación de ligereza. Si tienes dudas, te oriento al reservar.",
        ],
      },
      {
        question: "¿Ofrecéis bonos o paquetes de sesiones?",
        answer: [
          "Sí. Hay bonos de 5 sesiones con un 10 % de descuento y de 10 sesiones con un 15 % de descuento. Consulta la ",
          { label: "sección de bonos", action: "packages" as const },
          " o ",
          { label: "escríbeme por WhatsApp", action: "whatsapp" as const },
          ".",
        ],
      },
      {
        question: "¿Dónde está el espacio en Sevilla?",
        answer: [
          "En ",
          {
            label: "C. Esperanza Elena Caro, 2, 1°A4, 41002 Sevilla",
            action: "maps" as const,
          },
          ". Puedes ver la ubicación exacta y abrir indicaciones en Google Maps haciendo click en la dirección o desde la ",
          { label: "sección de contacto", action: "contact" as const },
          ".",
        ],
      },
    ],
  },
  reviews: [
    {
      id: "review-01",
      name: "Laura M.",
      stars: 5 as const,
      quote:
        "Salí como nueva. Noté el cuerpo blandito y la cabeza en silencio por primera vez en semanas.",
      treatmentName: "Relajante",
    },
    {
      id: "review-02",
      name: "Javier R.",
      stars: 5 as const,
      quote:
        "Tenía la espalda hecha un nudo y me fui caminando ligero. Marta tiene unas manos mágicas.",
      treatmentName: "Descontracturante",
    },
    {
      id: "review-03",
      name: "Ana S.",
      stars: 5 as const,
      quote:
        "Piernas ligeras, sensación de frescura y una calma que me acompañó todo el día. Recomendadísimo.",
      treatmentName: "Detox",
    },
    {
      id: "review-04",
      name: "Patricia G.",
      stars: 5 as const,
      quote:
        "Se me disolvió la tensión de mandíbula y cuello. Salí con la cara relajada y una sonrisa fácil.",
      treatmentName: "Cráneo Facial",
    },
    {
      id: "review-05",
      name: "Pablo V.",
      stars: 5 as const,
      quote:
        "Una desconexión total de verdad. Cerré los ojos y el mundo se quedó fuera. Volveré seguro.",
      treatmentName: "Ritual Desconexión Total",
    },
    {
      id: "review-06",
      name: "Lucía P.",
      stars: 5 as const,
      quote:
        "Ambiente cálido, trato cercano y un masaje que me dejó flotando. Justo lo que necesitaba.",
      treatmentName: "Relajante",
    },
    {
      id: "review-07",
      name: "Marta H.",
      stars: 5 as const,
      quote: "Me sentí liviana y con energía suave, sin agobio. Ideal cuando el cuerpo pide reset.",
      treatmentName: "Ritual Cuerpo Ligero",
    },
    {
      id: "review-08",
      name: "Andrés N.",
      stars: 5 as const,
      quote:
        "Después de horas frente al ordenador, este masaje me devolvió el cuello. Super contento.",
      treatmentName: "Descontracturante",
    },
    {
      id: "review-09",
      name: "Irene C.",
      stars: 5 as const,
      quote: "Relajada, renovada y con ganas de cuidarme más. La sesión se me hizo un suspiro.",
      treatmentName: "Detox",
    },
  ],
  bonos: {
    heading: "Bonos",
    discountLabel: "Descuento",
    examplesHeading: "Ejemplos de ahorro",
    ctaLabel: "Preguntar por Bonos",
    sessionsLabel: (n: number) => `${n} sesiones`,
    bestValueLabel: "Máximo ahorro",
  },
  contact: {
    heading: "Ubicación y contacto",
    hours: "Jueves de 15:00 a 21:00",
    hoursNote: "*Citas bajo reserva previa para garantizar tu atención personalizada.",
    addressLines: ["C. Esperanza Elena Caro, 2, 1°A4", "41002 Sevilla"],
    ctaLabel: "Reservar Ahora",
    openInMapsLabel: "Abrir en Maps",
    mapHint: "Consulta el mapa para indicaciones de llegada",
    imageAlt: "Espacio donde se realizan las sesiones.",
    mapTitle: "Mapa de ubicación de Marta Orozco",
  },
  treatments: {
    relajante: {
      bookingValue: "Masaje Relajante",
      title: "Relajante",
      description:
        "Ideal para reducir el estrés, mejorar el descanso y regalarte un momento para ti.",
      imageAlt: "Ambiente relajante para masaje corporal.",
    },
    detox: {
      bookingValue: "Masaje Detox",
      title: "Detox",
      description:
        "Favorece la circulación, alivia la sensación de piernas pesadas y aporta una profunda ligereza.",
      imageAlt: "Tratamiento detox orientado al bienestar y la circulación.",
    },
    descontracturante: {
      bookingValue: "Masaje Descontracturante",
      title: "Descontracturante",
      description:
        "Pensado para aliviar contracturas, tensión muscular y molestias derivadas del trabajo o el deporte.",
      imageAlt: "Masaje descontracturante orientado al alivio muscular.",
    },
    "craneo-facial": {
      bookingValue: "Masaje Cráneo Facial",
      title: "Cráneo Facial",
      description:
        "Libera la tensión del rostro, mandíbula y cuello. Relaja, rejuvenece y aporta bienestar.",
      imageAlt: "Masaje cráneo facial para rostro, mandíbula y cuello.",
    },
  },
  ritualCopy: {
    "ritual-desconexion": {
      bookingValue: "Ritual Desconexión Total",
      title: "Ritual Desconexión Total",
      description:
        "Combina técnicas relajantes y/o descontracturantes con un trabajo específico en hombros, cuello, rostro y cráneo.",
    },
    "ritual-cuerpo-ligero": {
      bookingValue: "Ritual Cuerpo Ligero",
      title: "Ritual Cuerpo Ligero",
      description:
        "Tratamiento diseñado para aliviar la pesadez y recuperar el bienestar general. Se combina un masaje relajante y/o descontracturante con técnicas circulatorias.",
    },
  },
  bonoTiers: {
    single: { label: "Sesión suelta", shortLabel: "1 sesión" },
    bono5: { label: "Bono 5 sesiones", shortLabel: "Bono 5 (-10%)" },
    bono10: { label: "Bono 10 sesiones", shortLabel: "Bono 10 (-15%)" },
  },
  footer: {
    logoAlt: "Logo Marta Orozco",
    navHeading: "Enlaces",
    navLinks: [
      { href: "#sobre-mi", label: "Sobre mí" },
      { href: "#masajes", label: "Masajes" },
      { href: "#bonos", label: "Bonos" },
      { href: "#preguntas-frecuentes", label: "Preguntas frecuentes" },
      { href: "#testimonios", label: "Testimonios" },
      { href: "#contacto", label: "Contacto" },
    ],
    copyright: (year: number) =>
      `© ${year} Marta Orozco Quiromasajista. Todos los derechos reservados.`,
    creditPrefix: "Con mucho ❤️, de",
  },
  ui: {
    theme: {
      light: "Claro",
      dark: "Oscuro",
      system: "Dispositivo",
      ariaLabel: "Tema",
    },
    lang: {
      ariaLabel: "Idioma",
      es: "Español",
      en: "English",
    },
    nav: {
      primaryAria: "Navegación principal",
      mobileAria: "Navegación móvil",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      homeAria: "Ir al inicio",
    },
    reserveNow: "RESERVAR AHORA",
    reserveAppointment: "RESERVAR CITA",
    reserveTreatment: (title: string) => `Reservar ${title}`,
    fromPrice: (price: number) => `desde ${price}€`,
    minutesSuffix: "minutos",
    perSession: "/ sesión",
    youSave: (amount: number) => `Ahorras ${amount} €`,
    durationLabel: "Duración",
    purchaseTypeLabel: "Tipo de compra",
    massageTypesAria: "Tipos de masaje",
    prevMassage: "Masaje anterior",
    nextMassage: "Masaje siguiente",
    reviewsAria: "Opiniones de clientes",
    prevReview: "Opinión anterior",
    nextReview: "Opinión siguiente",
    reviewStarsSr: "5 de 5",
    instagramAria: "Instagram de Marta Orozco",
    whatsappAria: "WhatsApp de Marta Orozco",
    modal: {
      title: "Reservar tratamiento",
      intro:
        "Selecciona tu tratamiento y completa el mensaje de WhatsApp. Todos los campos visibles son obligatorios.",
      treatmentLabel: "Tratamiento Deseado",
      durationLabel: "Duración Preferida",
      purchaseTypeLabel: "Tipo de Compra",
      priceEstimateLabel: "Precio estimado",
      nameLabel: "Tu Nombre",
      namePlaceholder: "Ej. María García",
      emailLabel: "Tu Email",
      emailPlaceholder: "Ej. maria@email.com",
      dateLabel: "Preferencia de Fecha/Hora",
      datePlaceholder: "Ej. Jueves 17:00",
      dateHint: "Disponibilidad solo jueves de 15:00 a 21:00.",
      submit: "Confirmar reserva por WhatsApp",
      closeAria: "Cerrar modal de reserva",
    },
    whatsappBooking: {
      greeting: "Hola Marta! Me gustaría reservar una cita.",
      treatment: "Tratamiento",
      duration: "Duración",
      purchaseType: "Tipo de compra",
      priceEstimate: "Precio estimado",
      name: "Nombre",
      email: "Email",
      datePreference: "Preferencia de Fecha/Hora",
      defaultSingle: "Sesión suelta",
      defaultDuration: "80 minutos",
    },
  },
};
