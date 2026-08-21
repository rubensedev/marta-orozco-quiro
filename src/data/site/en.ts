/** British English — faithful translation; glossary locked in design/state. */
export const en = {
  meta: {
    lang: "en" as const,
    title: "Marta Orozco | Massage Therapist",
    description:
      "Marta Orozco, professional massage therapist. Relaxing, detox, deep tissue massages and wellness rituals in Seville.",
    whatsappInquiry:
      "Hello Marta! I would like to book an appointment. Do you have availability?",
  },
  sectionIds: {
    home: "home",
    about: "about",
    massages: "massages",
    packages: "packages",
    reviews: "testimonials",
    contact: "contact",
  },
  navItems: [
    { href: "#about", label: "ABOUT" },
    { href: "#massages", label: "MASSAGES" },
    { href: "#packages", label: "PACKAGES" },
    { href: "#testimonials", label: "TESTIMONIALS" },
    { href: "#contact", label: "CONTACT" },
  ],
  hero: {
    title: "A space for calm, health and bodily balance",
    description:
      "Massage treatments designed to ease physical tension, activate your vital energy and restore peace to your everyday life.",
    primaryCta: "BOOK APPOINTMENT",
    secondaryCta: {
      label: "VIEW MASSAGES AND PRICES",
      href: "#massages",
    },
    backgroundImageAlt:
      "Rolled towel in a wellness space for massage treatments.",
    portraitAlt: "Portrait of Marta Orozco.",
  },
  aboutStats: [
    { label: "Years of experience" },
    { label: "Satisfied clients" },
  ],
  about: {
    heading: "About me",
    title: "Marta Orozco",
    subtitle: "Professional massage therapist",
    paragraphs: [
      "I have always been interested in manual techniques, considering them a very powerful catalyst that roots us directly in primordial energies, activating a state of awareness that is very useful in our everyday lives.",
      "That is why, as a massage therapist, I have found a very organic way of weaving those energies together with different massage techniques, offering you personalised sessions according to your needs.",
    ],
  },
  massages: {
    heading: "Massages",
    description:
      "Choose duration and purchase type to see your price. Compare the savings with 5- or 10-session packs.",
  },
  rituals: {
    heading: "Rituals and session packs",
    description:
      "Complete rituals for deep renewal, or multi-session packs with a special discount.",
    ctaLabel: "Book ritual",
  },
  reviewsContent: {
    heading: "Still unsure?",
    description:
      "Since 2021 I have supported more than 1,500 people on their path to wellbeing. These voices share how they felt after the session — in case it helps you take the next step.",
  },
  reviews: [
    {
      id: "review-01",
      name: "Laura M.",
      stars: 5 as const,
      quote:
        "I left feeling brand new. My body felt soft and my mind was quiet for the first time in weeks.",
      treatmentName: "Relaxing",
    },
    {
      id: "review-02",
      name: "Javier R.",
      stars: 5 as const,
      quote:
        "My back was in knots and I walked out light on my feet. Marta has magic hands.",
      treatmentName: "Deep tissue",
    },
    {
      id: "review-03",
      name: "Ana S.",
      stars: 5 as const,
      quote:
        "Light legs, a sense of freshness and a calm that stayed with me all day. Highly recommend.",
      treatmentName: "Detox",
    },
    {
      id: "review-04",
      name: "Patricia G.",
      stars: 5 as const,
      quote:
        "The tension in my jaw and neck melted away. I left with a relaxed face and an easy smile.",
      treatmentName: "Craniofacial",
    },
    {
      id: "review-05",
      name: "Pablo V.",
      stars: 5 as const,
      quote:
        "A real total disconnect. I closed my eyes and the world stayed outside. I will definitely be back.",
      treatmentName: "Total Disconnect Ritual",
    },
    {
      id: "review-06",
      name: "Lucía P.",
      stars: 5 as const,
      quote:
        "A warm atmosphere, a kind approach and a massage that left me floating. Exactly what I needed.",
      treatmentName: "Relaxing",
    },
    {
      id: "review-07",
      name: "Marta H.",
      stars: 5 as const,
      quote:
        "I felt light and gently energised, with no overwhelm. Ideal when the body needs a reset.",
      treatmentName: "Light Body Ritual",
    },
    {
      id: "review-08",
      name: "Andrés N.",
      stars: 5 as const,
      quote:
        "After hours at the computer, this massage gave me my neck back. Really pleased.",
      treatmentName: "Deep tissue",
    },
    {
      id: "review-09",
      name: "Irene C.",
      stars: 5 as const,
      quote:
        "Relaxed, renewed and keen to look after myself more. The session felt like a sigh of relief.",
      treatmentName: "Detox",
    },
  ],
  bonos: {
    heading: "Session packs",
    discountLabel: "Discount",
    examplesHeading: "Savings examples",
    ctaLabel: "Ask about session packs",
    sessionsLabel: (n: number) => `${n} sessions`,
  },
  contact: {
    heading: "Location and contact",
    hours: "Thursdays from 15:00 to 21:00",
    hoursNote:
      "*Appointments by prior booking only to ensure your personalised care.",
    addressLines: ["C. Esperanza Elena Caro, 2, 1°A4", "41002 Seville"],
    ctaLabel: "Book now",
    openInMapsLabel: "Open in Maps",
    mapHint: "Check the map for directions",
    imageAlt: "Space where the sessions take place.",
    mapTitle: "Map of Marta Orozco's location",
  },
  treatments: {
    relajante: {
      bookingValue: "Relaxing Massage",
      title: "Relaxing",
      description:
        "Ideal for reducing stress, improving rest and giving yourself a moment for you.",
      imageAlt: "Relaxing setting for a body massage.",
    },
    detox: {
      bookingValue: "Detox Massage",
      title: "Detox",
      description:
        "Supports circulation, eases the feeling of heavy legs and brings a deep sense of lightness.",
      imageAlt: "Detox treatment focused on wellness and circulation.",
    },
    descontracturante: {
      bookingValue: "Deep Tissue Massage",
      title: "Deep tissue",
      description:
        "Designed to ease muscle knots, muscular tension and discomfort from work or sport.",
      imageAlt: "Deep tissue massage focused on muscular relief.",
    },
    "craneo-facial": {
      bookingValue: "Craniofacial Massage",
      title: "Craniofacial",
      description:
        "Releases tension in the face, jaw and neck. Relaxes, rejuvenates and brings wellbeing.",
      imageAlt: "Craniofacial massage for face, jaw and neck.",
    },
  },
  ritualCopy: {
    "ritual-desconexion": {
      bookingValue: "Total Disconnect Ritual",
      title: "Total Disconnect Ritual",
      description:
        "Combines relaxing and/or deep tissue techniques with focused work on the shoulders, neck, face and scalp.",
    },
    "ritual-cuerpo-ligero": {
      bookingValue: "Light Body Ritual",
      title: "Light Body Ritual",
      description:
        "A treatment designed to ease heaviness and restore general wellbeing. It combines a relaxing and/or deep tissue massage with circulatory techniques.",
    },
  },
  bonoTiers: {
    single: { label: "Single session", shortLabel: "1 session" },
    bono5: { label: "5-session pack", shortLabel: "Pack of 5 (−10%)" },
    bono10: { label: "10-session pack", shortLabel: "Pack of 10 (−15%)" },
  },
  footer: {
    logoAlt: "Marta Orozco logo",
    copyright: (year: number) =>
      `© ${year} Marta Orozco Massage Therapist. All rights reserved.`,
    creditPrefix: "With much ❤️, by",
  },
  ui: {
    theme: {
      light: "Light",
      dark: "Dark",
      system: "System",
      ariaLabel: "Theme",
    },
    lang: {
      ariaLabel: "Language",
      es: "Español",
      en: "English",
    },
    nav: {
      primaryAria: "Primary navigation",
      mobileAria: "Mobile navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      homeAria: "Go to top",
    },
    reserveNow: "BOOK NOW",
    reserveAppointment: "BOOK APPOINTMENT",
    reserveTreatment: (title: string) => `Book ${title}`,
    fromPrice: (price: number) => `from ${price}€`,
    minutesSuffix: "minutes",
    perSession: "/ session",
    youSave: (amount: number) => `You save ${amount} €`,
    durationLabel: "Duration",
    purchaseTypeLabel: "Purchase type",
    massageTypesAria: "Massage types",
    prevMassage: "Previous massage",
    nextMassage: "Next massage",
    reviewsAria: "Client reviews",
    prevReview: "Previous review",
    nextReview: "Next review",
    reviewStarsSr: "5 out of 5",
    instagramAria: "Marta Orozco on Instagram",
    whatsappAria: "Marta Orozco on WhatsApp",
    modal: {
      eyebrow: "Direct booking",
      title: "Book a treatment",
      treatmentLabel: "Desired treatment",
      durationLabel: "Preferred duration",
      purchaseTypeLabel: "Purchase type",
      priceEstimateLabel: "Estimated price",
      nameLabel: "Your name",
      dateLabel: "Preferred date/time",
      datePlaceholder: "e.g. Thursday 17:00",
      dateHint: "Availability only on Thursdays from 15:00 to 21:00.",
      submit: "Open WhatsApp",
      closeAria: "Close booking modal",
    },
    whatsappBooking: {
      greeting: "Hello Marta! I would like to book an appointment.",
      treatment: "Treatment",
      duration: "Duration",
      purchaseType: "Purchase type",
      priceEstimate: "Estimated price",
      name: "Name",
      datePreference: "Preferred date/time",
      defaultSingle: "Single session",
      defaultDuration: "80 minutes",
    },
  },
};
