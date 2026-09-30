/** British English — faithful translation; glossary locked in design/state. Entity name is never translated. */
export const en = {
  meta: {
    lang: "en" as const,
    title: "Marta Orozco Quiromasaje | Massage Therapist in Seville",
    description:
      "Professional massage therapist in the centre of Seville. Deep tissue, relaxing, detox and wellness rituals. Book online via TidyCal.",
    ogLocale: "en_GB",
    ogLocaleAlternate: "es_ES",
    whatsappInquiry: "Hello Marta! I have a question. Can you help me?",
    whatsappBonosInquiry:
      "Hello Marta! I would like more information about the massage session packs",
  },
  sectionIds: {
    home: "home",
    about: "about",
    massages: "massages",
    rituals: "rituals",
    packages: "packages",
    faq: "faq",
    reviews: "testimonials",
    contact: "contact",
  },
  navItems: [
    { href: "#about", label: "ABOUT" },
    { href: "#massages", label: "MASSAGES" },
    { href: "#rituals", label: "RITUALS" },
    { href: "#packages", label: "PACKAGES" },
    { href: "#testimonials", label: "TESTIMONIALS" },
    { href: "#contact", label: "CONTACT" },
  ],
  hero: {
    title: "Your place for stillness, wellbeing and bodily harmony",
    subtitle: "Professional massage therapist in Seville",
    description:
      "Exclusive massage treatments tailored to your needs to release tension and awaken your vital energy. All the oils we use are 100% natural and handcrafted for each type of massage.",
    primaryCta: "BOOK APPOINTMENT",
    secondaryCta: {
      label: "VIEW MASSAGES AND PRICES",
      href: "#massages",
    },
    backgroundImageAlt: "Rolled towel in a wellness space for massage treatments.",
    portraitAlt: "Portrait of Marta Orozco.",
  },
  aboutStats: [{ label: "Years of experience" }, { label: "Satisfied clients" }],
  about: {
    heading: "About me",
    title: "Marta Orozco",
    subtitle: "Professional massage therapist",
    paragraphs: [
      "I have always been interested in manual techniques, considering them a very powerful catalyst that roots us directly in primordial energies, activating a state of awareness that is very useful in our everyday lives.",
      "That is why, as a massage therapist, I have found a very organic way of weaving those energies together with different massage techniques, offering you personalised sessions according to your needs.",
      "For over five years I have been supporting clients with personalised massage sessions, from deep tissue work to relaxing treatments and wellness rituals, always accompanied by 100% natural oils carefully designed for each type of treatment.",
    ],
    techniquesHeading: "Techniques",
    techniques: [
      "Swedish Massage",
      "Sports",
      "Deep Tissue",
      "Lomi Lomi",
      "Lymphatic",
      "Brazilian Drainage",
      "Hot Stones",
      "Foot Reflexology",
      "Reiki",
      "Aromatherapy",
    ],
  },
  massages: {
    heading: "Massages in Seville",
    description:
      "Choose duration and purchase type to see your price. Compare the savings with 5- or 10-session packs.",
  },
  rituals: {
    heading: "Rituals",
    description: "Complete rituals for deep renewal.",
    ctaLabel: "Book ritual",
  },
  reviewsContent: {
    heading: "Still unsure?",
    description:
      "Since 2021 I have supported more than 1,500 people on their path to wellbeing. These voices share how they felt after the session — in case it helps you take the next step.",
    googleCta: "See all reviews on Google",
  },
  faq: {
    heading: "Frequently asked questions",
    description: "Quick answers about bookings, sessions and massage treatments in Seville.",
    items: [
      {
        question: "How do I book an appointment?",
        answer: [
          "Book with the «",
          { label: "Book now", action: "booking" as const },
          "» button on this site: choose your treatment and duration, then confirm to open the TidyCal calendar. If you have questions, ",
          { label: "message me on WhatsApp", action: "whatsapp" as const },
          ". Massages are always by prior booking only.",
        ],
      },
      {
        question: "How far in advance can I cancel?",
        answer: ["You can cancel or reschedule with at least 24 hours’ notice."],
      },
      {
        question: "What are your opening hours?",
        answer: [
          "I see clients on Thursdays from 3:00 pm to 9:00 pm at C. Esperanza Elena Caro, 2, 1°A4, Casco Antiguo, Sevilla (41002), by appointment only. I confirm the exact slot when you book.",
        ],
      },
      {
        question: "What should I bring or prepare for a session?",
        answer: [
          "You do not need to bring anything. Arrive a few minutes early and, if you have a specific concern (back, neck, legs), mention it when booking so I can tailor the massage.",
        ],
      },
      {
        question: "Which massage suits me: relaxing, deep tissue or detox?",
        answer: [
          "Relaxing massage eases stress and supports rest. Deep tissue work targets muscle tension and knots. Detox massage supports circulation and a lighter feeling. If you are unsure, I can guide you when you book.",
        ],
      },
      {
        question: "Do you offer session packs?",
        answer: [
          "Yes. There are 5-session packs with a 10% discount and 10-session packs with a 15% discount. See the ",
          { label: "packs section", action: "packages" as const },
          " or ",
          { label: "message me on WhatsApp", action: "whatsappPackages" as const },
          ".",
        ],
      },
      {
        question: "Do session packs expire?",
        answer: [
          "5-session packs expire 6 months after purchase; 10-session packs expire 12 months after purchase.",
        ],
      },
      {
        question: "Can I share a pack?",
        answer: ["Yes. Packs are not nominal: you can share them with anyone you like."],
      },
      {
        question: "Where is the space in Seville?",
        answer: [
          "In Seville’s Casco Antiguo, at ",
          {
            label: "C. Esperanza Elena Caro, 2, 1°A4, 41002 Sevilla",
            action: "maps" as const,
          },
          ". You can view the exact location and open directions in Google Maps by clicking the address or from the ",
          { label: "contact section", action: "contact" as const },
          ".",
        ],
      },
      {
        question: "What is a session with you like, step by step?",
        answer: [
          "We book ahead and, when you arrive, you tell me where you feel tension or what you need today. During the massage I adjust the pressure with you; afterwards I share simple aftercare tips when they fit your case. Sessions are one-to-one and always by prior appointment.",
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
        "Marta was such a friendly person and loved the massage ritual, loved the combination of different styles, exactly what I needed, relaxation, some deep tissue and drainage. I would definitely go back.",
      treatmentName: "Ritual",
    },
    {
      id: "gbp-02",
      name: "Alicia",
      stars: 5 as const,
      quote:
        "I already knew Marta from another massage centre and I'm booking with her again without a doubt! Thank you so much for your kindness and the love you put into your work. I'll be back with my massage pack :)",
      treatmentName: "Session packs",
    },
    {
      id: "gbp-03",
      name: "Valeria Delquiten",
      stars: 5 as const,
      quote:
        "I got a deep-tissue pack, I've had a couple of sessions and I'm very happy.",
      treatmentName: "Deep tissue",
    },
    {
      id: "gbp-04",
      name: "Julia Morey",
      stars: 5 as const,
      quote:
        "Marta is simply the best! A space full of care and kindness. Looking forward to the next massage soon! Thank you Marta ❤️",
      treatmentName: "Massage",
    },
    {
      id: "gbp-05",
      name: "Amaia Cilla",
      stars: 5 as const,
      quote:
        "Marta has been a discovery. Her gentleness and warm manner made for an incredible massage. I was looking to relax, and she more than delivered. I'll definitely be back!",
      treatmentName: "Relaxing",
    },
    {
      id: "gbp-06",
      name: "Rubén",
      stars: 5 as const,
      quote:
        "It had been a while since I'd had such a relaxing massage. The massage starts at the door — Marta is so kind you already slip into relax mode. Thank you!! I'll be back with the massage pack!!",
      treatmentName: "Relaxing",
    },
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
      quote: "My back was in knots and I walked out light on my feet. Marta has magic hands.",
      treatmentName: "Deep tissue",
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
      id: "review-08",
      name: "Andrés N.",
      stars: 5 as const,
      quote: "After hours at the computer, this massage gave me my neck back. Really pleased.",
      treatmentName: "Deep tissue",
    },
  ],
  bonos: {
    heading: "Session packs",
    description: "Multi-session packs with a special discount.",
    discountLabel: "Discount",
    examplesHeading: "Savings examples",
    ctaLabel: "Ask about session packs",
    sessionsLabel: (n: number) => `${n} sessions`,
    bestValueLabel: "Best value",
  },
  contact: {
    heading: "Location and contact",
    hours: "Thursdays from 15:00 to 21:00",
    hoursNote: "*Appointments by prior booking only to ensure your personalised care.",
    addressLines: ["C. Esperanza Elena Caro, 2, 1°A4", "Casco Antiguo, 41002 Sevilla"],
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
        "Ideal for reducing stress, improving rest and giving yourself a moment just for you. One of the main goals of this massage is to relax the whole body through long, gliding strokes over the muscles.",
      imageAlt: "Relaxing setting for a body massage.",
    },
    detox: {
      bookingValue: "Detox Massage",
      title: "Detox",
      description:
        "It stimulates the lymphatic system, helping to clear excess fluid and toxins, thereby reducing swelling and improving circulation and tissue quality, leaving a deep sense of lightness.",
      imageAlt: "Detox treatment focused on wellness and circulation.",
    },
    descontracturante: {
      bookingValue: "Deep Tissue Massage",
      title: "Deep tissue",
      description:
        "Higher-pressure techniques are used to release muscular tension through slow, deep movements and firm pressure, easing knots and working beyond the superficial muscles.",
      imageAlt: "Deep tissue massage focused on muscular relief.",
    },
    "craneo-facial": {
      bookingValue: "Craniofacial Massage",
      title: "Craniofacial",
      description:
        "Releases tension in the face, jaw, neck and upper back, bringing a deeper state of relaxation and wellbeing. Ideal for easing stress and migraines and improving rest.",
      imageAlt: "Craniofacial massage for face, jaw and neck.",
    },
  },
  ritualCopy: {
    "ritual-desconexion": {
      bookingValue: "Total Disconnect Ritual",
      title: "Total Disconnect Ritual",
      description:
        "Let yourself sink into deep stillness with this ritual that combines relaxing and/or deep tissue techniques with focused finishing work on the neck, face and scalp. It uses neurosedative movements ideal for easing mental fatigue, stress and anxiety.",
    },
    "ritual-cuerpo-ligero": {
      bookingValue: "Light Body Ritual",
      title: "Light Body Ritual",
      description:
        "Step into lightness and deep calm with this treatment designed to ease heaviness and restore general wellbeing. It combines relaxing and/or deep tissue massage techniques with draining manoeuvres.",
    },
  },
  bonoTiers: {
    single: { label: "Single session", shortLabel: "1 session" },
    bono5: { label: "5-session pack", shortLabel: "Pack of 5 (−10%)" },
    bono10: { label: "10-session pack", shortLabel: "Pack of 10 (−15%)" },
  },
  footer: {
    logoAlt: "Marta Orozco logo",
    navHeading: "Links",
    navLinks: [
      { href: "#about", label: "About" },
      { href: "#massages", label: "Massages" },
      { href: "#rituals", label: "Rituals" },
      { href: "#packages", label: "Packs" },
      { href: "#faq", label: "FAQ" },
      { href: "#testimonials", label: "Testimonials" },
      { href: "#contact", label: "Contact" },
    ],
    copyright: (year: number) => `© ${year} Marta Orozco Quiromasaje. All rights reserved.`,
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
    reserveAppointment: "QUESTIONS",
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
    thankYou: {
      title: "Thank you for choosing yourself",
      message:
        "We've opened the calendar in another tab. Choose your time there—and embrace this path back to your energy and peace.",
      homeLabel: "Back to home",
      whatsappLabel: "Message on WhatsApp",
      metaTitle: "Thank you | Marta Orozco Quiromasaje in Seville",
      metaDescription:
        "Thank you for choosing yourself. Finish booking in the calendar and restore your energy and peace.",
    },
    notFound: {
      statusMark: "404",
      title: "Looking for a massage?",
      message: "Don't get lost in the vastness, find the perfect one for you by clicking below.",
      massagesLabel: "Explore massages",
      whatsappLabel: "Message on WhatsApp",
      metaTitle: "Page not found | Marta Orozco Quiromasaje in Seville",
      metaDescription:
        "This page does not exist. Explore Marta Orozco's massages or message on WhatsApp.",
    },
    modal: {
      title: "Book a treatment",
      intro:
        "Select your treatment and duration. Confirm to open the calendar and book your session.",
      treatmentLabel: "Desired treatment",
      durationLabel: "Preferred duration",
      purchaseTypeLabel: "Purchase type",
      priceEstimateLabel: "Estimated price",
      nameLabel: "Your name",
      namePlaceholder: "e.g. María García",
      emailLabel: "Your email",
      emailPlaceholder: "e.g. maria@email.com",
      dateLabel: "Preferred date/time",
      datePlaceholder: "e.g. Thursday 17:00",
      dateHint: "Availability only on Thursdays from 15:00 to 21:00.",
      submit: "Confirm booking",
      closeAria: "Close booking modal",
    },
  },
};
