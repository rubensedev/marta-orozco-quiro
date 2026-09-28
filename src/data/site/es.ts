/**
 * Spanish copy for the site.
 * Entity name, NAP, and Maps identity live in shared.ts — keep those aligned.
 * Marketing strings here may be revised when a change updates local-discovery copy;
 * do not treat this file as frozen wording.
 */
export const es = {
  meta: {
    lang: "es" as const,
    title: "Marta Orozco Quiromasaje | Masajes en Sevilla",
    description:
      "Quiromasajista profesional en el centro de Sevilla. Masajes descontracturantes, relajantes, detox y rituales de bienestar. Reserva cita desde la web con TidyCal.",
    ogLocale: "es_ES",
    ogLocaleAlternate: "en_GB",
    whatsappInquiry: "Hola Marta! Tengo una consulta. ¿Me puedes ayudar?",
    whatsappBonosInquiry: "Hola Marta! Quiero más información sobre los bonos de masajes",
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
    title: "Tu lugar para la quietud, el bienestar y alcanzar la armonía corporal",
    subtitle: "Quiromasaje profesional en el centro de Sevilla",
    description:
      "Tratamientos de masaje exclusivos y adaptados a tus necesidades para desbloquear tensiones y despertar tu energía vital. Todos los aceites que usamos son 100% naturales y están artesanalmente creados para cada tipo de masaje.",
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
      "Llevo más de cinco años acompañando a clientes con masajes personalizados, desde tratamientos descontracturantes hasta sesiones relajantes y rituales de bienestar, siempre acompañadas de aceites 100% naturales cuidadosamente diseñados para cada tipo de tratamiento.",
    ],
    techniquesHeading: "Técnicas",
    techniques: [
      "Masaje Sueco",
      "Deportivo",
      "Tejido Profundo",
      "Lomi Lomi",
      "Linfático",
      "Drenaje Brasileño",
      "Piedras Calientes",
      "Reflexología Podal",
      "Reiki",
      "Aromaterapia",
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
          "Reserva desde el botón «",
          { label: "Reservar ahora", action: "booking" as const },
          "» de esta web: elige tratamiento y duración, y confirma para abrir el calendario de TidyCal. Si tienes dudas, ",
          { label: "escríbeme por WhatsApp", action: "whatsapp" as const },
          ". Los masajes son siempre bajo reserva previa.",
        ],
      },
      {
        question: "¿Con cuánta antelación puedo cancelar la cita?",
        answer: ["Puedes cancelar o cambiar tu cita avisando con al menos 24 horas de antelación."],
      },
      {
        question: "¿Cuál es el horario de atención?",
        answer: [
          "Atiendo los jueves de 15:00 a 21:00 en C. Esperanza Elena Caro, 2, 1°A4, Casco Antiguo de Sevilla (41002), solo con cita previa. Te confirmo la disponibilidad exacta al reservar.",
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
          { label: "escríbeme por WhatsApp", action: "whatsappPackages" as const },
          ".",
        ],
      },
      {
        question: "¿Cuál es la caducidad de los bonos?",
        answer: [
          "El bono de 5 sesiones caduca a los 6 meses desde la compra; el de 10 sesiones, a los 12 meses.",
        ],
      },
      {
        question: "¿Puedo compartir un bono?",
        answer: ["Sí. Los bonos no son nominales: puedes compartirlos con quien quieras."],
      },
      {
        question: "¿Dónde está el espacio en Sevilla?",
        answer: [
          "En el Casco Antiguo de Sevilla, en ",
          {
            label: "C. Esperanza Elena Caro, 2, 1°A4, 41002 Sevilla",
            action: "maps" as const,
          },
          ". Puedes ver la ubicación exacta y abrir indicaciones en Google Maps haciendo click en la dirección o desde la ",
          { label: "sección de contacto", action: "contact" as const },
          ".",
        ],
      },
      {
        question: "¿Cómo es una sesión contigo, paso a paso?",
        answer: [
          "Reservamos con antelación y, al llegar, me cuentas dónde notas la tensión o qué buscas hoy. Durante el masaje ajusto la presión contigo; al terminar te doy pautas sencillas de cuidados si encajan con tu caso. Todo es uno a uno y siempre con cita previa.",
        ],
      },
    ],
  },
  reviews: [
    {
      id: "gbp-01",
      name: "Paula Szilagyi",
      stars: 5 as const,
      quote:
        "Marta fue una persona muy amable y me encantó el ritual de masaje, me encantó la combinación de diferentes estilos, exactamente lo que necesitaba: relajación, algo de descontracturante y drenaje. Sin duda volvería.",
      treatmentName: "Ritual",
    },
    {
      id: "gbp-02",
      name: "Alicia",
      stars: 5 as const,
      quote:
        "Ya conocía a Marta de otro centro de masajes y vuelvo a repetir con ella sin duda! Muchas gracias por tu amabilidad y el amor que le pones a tu trabajo. Volveré con mi bono de masajes :)",
      treatmentName: "Bonos",
    },
    {
      id: "gbp-03",
      name: "Valeria Delquiten",
      stars: 5 as const,
      quote:
        "Cogí un bono descontracturante, llevo un par de sesiones y estoy muy contenta.",
      treatmentName: "Descontracturante",
    },
    {
      id: "gbp-04",
      name: "Julia Morey",
      stars: 5 as const,
      quote:
        "Marta simplemente es la mejor! Un espacio de mucho cuidado y amabilidad. Deseando el próximo masaje pronto! Gracias Marta ❤️",
      treatmentName: "Quiromasaje",
    },
    {
      id: "gbp-05",
      name: "Amaia Cilla",
      stars: 5 as const,
      quote:
        "Marta ha sido un descubrimiento. Su delicadeza y buen trato hicieron que fuera un masaje increíble. Buscaba relajarme, y lo consiguió con creces. ¡Sin duda repetiré!",
      treatmentName: "Relajante",
    },
    {
      id: "gbp-06",
      name: "Rubén",
      stars: 5 as const,
      quote:
        "Hacia tiempo que no me daba un masaje tan relajante. El masaje empieza desde la puerta, con lo amable que es Marta ya empiezas a entrar en modo relax. Gracias!! Repetiré con el bono de masaje!!",
      treatmentName: "Relajante",
    },
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
      id: "review-08",
      name: "Andrés N.",
      stars: 5 as const,
      quote:
        "Después de horas frente al ordenador, este masaje me devolvió el cuello. Super contento.",
      treatmentName: "Descontracturante",
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
    addressLines: ["C. Esperanza Elena Caro, 2, 1°A4", "Casco Antiguo, 41002 Sevilla"],
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
      `© ${year} Marta Orozco Quiromasaje. Todos los derechos reservados.`,
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
    reserveAppointment: "CONSULTAS",
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
    thankYou: {
      title: "Gracias por cuidar de ti",
      message:
        "Hemos abierto el calendario en otra pestaña. Elige ahí tu momento, y abraza este camino para recuperar tu energía y tu paz.",
      homeLabel: "Volver al inicio",
      whatsappLabel: "Escribir por WhatsApp",
      metaTitle: "Gracias | Marta Orozco Quiromasaje en Sevilla",
      metaDescription:
        "Gracias por cuidar de ti. Completa tu reserva en el calendario y recupera energía y paz.",
    },
    notFound: {
      statusMark: "404",
      title: "¿Buscabas un masaje?",
      message: "No te pierdas en la inmensidad, encuentra el que mejor te va haciendo click abajo.",
      massagesLabel: "Ver masajes",
      whatsappLabel: "Escribir por WhatsApp",
      metaTitle: "Página no encontrada | Marta Orozco Quiromasaje en Sevilla",
      metaDescription:
        "Esta página no existe. Explora los masajes de Marta Orozco o escribe por WhatsApp.",
    },
    modal: {
      title: "Reservar tratamiento",
      intro:
        "Selecciona tu tratamiento y duración. Confirma para abrir el calendario y reservar tu sesión.",
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
      submit: "Confirmar reserva",
      closeAria: "Cerrar modal de reserva",
    },
  },
};
