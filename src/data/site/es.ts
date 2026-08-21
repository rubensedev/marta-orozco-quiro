/** Spanish copy — moved verbatim from the previous Spanish-only site.ts. Do not alter wording. */
export const es = {
  meta: {
    lang: "es" as const,
    title: "Marta Orozco | Quiromasajista",
    description:
      "Marta Orozco, quiromasajista profesional. Masajes relajantes, detox, descontracturantes y rituales de bienestar en Sevilla.",
    whatsappInquiry:
      "Hola Marta! Me gustaría reservar una cita. ¿Tienes disponibilidad?",
  },
  sectionIds: {
    home: "inicio",
    about: "sobre-mi",
    massages: "masajes",
    packages: "bonos",
    contact: "contacto",
  },
  navItems: [
    { href: "#sobre-mi", label: "SOBRE MÍ" },
    { href: "#masajes", label: "MASAJES" },
    { href: "#bonos", label: "BONOS" },
    { href: "#contacto", label: "CONTACTO" },
  ],
  hero: {
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
  },
  aboutStats: [
    { label: "Años de experiencia" },
    { label: "Clientes satisfechos" },
  ],
  about: {
    heading: "Sobre mí",
    title: "Marta Orozco",
    subtitle: "Quiromasajista Profesional",
    paragraphs: [
      "Siempre me han interesado las técnicas manuales, considerándolas un catalizador muy potente que nos enraíza directamente con energías primigenias, activando un estado de conciencia muy útil en nuestro día a día.",
      "Es por eso que, como quiromasajista, he encontrado una fórmula muy orgánica de entretejer esas energías con diferentes técnicas de masaje, ofreciéndote sesiones personalizadas en función de tus necesidades.",
    ],
  },
  massages: {
    heading: "Masajes",
    description:
      "Elige duración y tipo de compra para ver tu precio. Compara el ahorro con bonos de 5 o 10 sesiones.",
  },
  rituals: {
    heading: "Rituales y bonos",
    description:
      "Rituales completos para una renovación profunda o paquetes de bonos con descuento especial.",
    ctaLabel: "Reservar Ritual",
  },
  bonos: {
    heading: "Bonos",
    discountLabel: "Descuento",
    examplesHeading: "Ejemplos de ahorro",
    ctaLabel: "Preguntar por Bonos",
    sessionsLabel: (n: number) => `${n} sesiones`,
  },
  contact: {
    heading: "Ubicación y contacto",
    hours: "Jueves de 15:00 a 21:00",
    hoursNote:
      "*Citas bajo reserva previa para garantizar tu atención personalizada.",
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
    instagramAria: "Instagram de Marta Orozco",
    whatsappAria: "WhatsApp de Marta Orozco",
    modal: {
      eyebrow: "Cita Directa",
      title: "Reservar tratamiento",
      treatmentLabel: "Tratamiento Deseado",
      durationLabel: "Duración Preferida",
      purchaseTypeLabel: "Tipo de Compra",
      priceEstimateLabel: "Precio estimado",
      nameLabel: "Tu Nombre",
      dateLabel: "Preferencia de Fecha/Hora",
      datePlaceholder: "Ej. Jueves 17:00",
      dateHint: "Disponibilidad solo jueves de 15:00 a 21:00.",
      submit: "Abrir WhatsApp",
      closeAria: "Cerrar modal de reserva",
    },
    whatsappBooking: {
      greeting: "Hola Marta! Me gustaría reservar una cita.",
      treatment: "Tratamiento",
      duration: "Duración",
      purchaseType: "Tipo de compra",
      priceEstimate: "Precio estimado",
      name: "Nombre",
      datePreference: "Preferencia de Fecha/Hora",
      defaultSingle: "Sesión suelta",
      defaultDuration: "80 minutos",
    },
  },
};
