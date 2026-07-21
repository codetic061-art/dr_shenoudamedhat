export default {
  nav: {
    services: "Services",
    about: "About",
    work: "Work",
    reviews: "Reviews",
    faq: "FAQ",
    book: "Book Appointment",
  },

  hero: {
    badge: "⭐ Trusted by 500+ Happy Patients",
    h1: "Modern Dentistry with Comfort You Deserve",
    sub: "Experience expert cosmetic dental care with a gentle touch. State-of-the-art technology tailored for a healthier, brighter, and more confident smile.",
    cta1: "Book Appointment",
    cta2: "Watch Our Work",
    imgAlt: "Happy patient at Dr. Shenouda cosmetic dental clinic",
    reviewsCount: "(520+ Reviews)",
    stats: {
      years: "Years Exp.",
      patients: "Happy Patients",
      rating: "Google Rating",
      satisfaction: "Satisfaction Rate",
    }
  },

  about: {
    h2: "About Dr. Shenouda",
    sub: "Dentist & Oral Health Specialist | Alexandria, Egypt",
    imgAlt: "Dr. Shenouda, cosmetic dentist",
    badges: {
      experience: "2+ Years Exp.",
      patients: "500+ Patients",
      certified: "Int. Certified",
    }
  },

  philosophy: {
    quote: "“Dentistry for me is not merely a practice of treatment, but a synthesis of scientific precision and cosmetic artistry to restore confidence and smiles for every patient.”",
    name: "Dr. Shenouda",
    specialty: "Oral & Dental Surgeon | Alexandria University Graduate with Honors",
    imgAlt: "Dr. Shenouda — specialist cosmetic dentist",
  },

  services: {
    h2: "Cosmetic Dentistry Services",
    sub: "We offer comprehensive dental care tailored to your exact cosmetic and clinical needs",
    items: [
      {
        title: "Cosmetic Veneers",
        benefit: "Design the perfect Hollywood smile custom-fitted for you with advanced, stain-resistant porcelain shells."
      },
      {
        title: "Teeth Whitening",
        benefit: "Get bright, white teeth in a single safe and highly effective professional clinic whitening session."
      },
      {
        title: "Cosmetic Fillings",
        benefit: "Restore decayed or broken teeth with natural-looking composite fillings that blend seamlessly."
      },
      {
        title: "Root Canal Treatment",
        benefit: "Relieve dental pain and save your natural teeth with precise, gentle, and pain-free endodontic therapy."
      },
      {
        title: "Oral Surgery & Extractions",
        benefit: "Safe, comfortable, and highly hygienic dental extractions conducted with utmost care and guidance."
      }
    ]
  },

  beforeafter: {
    h2: "Real Transformations",
    sub: "Drag the center bar to compare the teeth conditions before and after treatment",
    chips: ["All", "Cosmetic Filling", "Bridge", "Complete Denture"],
    labels: {
      before: "Before",
      after: "After",
    },
    cases: [
      {
        beforeAlt: "Teeth before cosmetic filling treatment — patient case at Dr. Shenouda",
        afterAlt: "Teeth after cosmetic filling treatment — stunning result at Dr. Shenouda"
      },
      {
        beforeAlt: "Teeth before dental bridge treatment — patient case at Dr. Shenouda",
        afterAlt: "Teeth after dental bridge treatment — stunning result at Dr. Shenouda"
      },
      {
        beforeAlt: "Teeth before complete denture treatment — patient case at Dr. Shenouda",
        afterAlt: "Teeth after complete denture treatment — stunning result at Dr. Shenouda"
      }
    ]
  },

  reviews: {
    h2: "What Our Patients Say",
    items: [
      {
        text: "Incredible clinical experience! Dr. Shenouda is extremely patient, kind, and explains every treatment step clearly. The clinic is pristine, and my veneer results exceeded expectations.",
        name: "Ahmed Mahmoud",
        date: "2 weeks ago"
      },
      {
        text: "I used to have extreme dentist anxiety, but Dr. Shenouda made the entire process completely pain-free. The cosmetic fillings he did look exactly like my natural teeth!",
        name: "Sara Abdelrahman",
        date: "1 month ago"
      },
      {
        text: "I did a teeth whitening session and the results are fast and absolutely brilliant. Very professional doctor, high sterilization, and great care. Highly recommended!",
        name: "Mohamed Ali",
        date: "2 months ago"
      }
    ]
  },

  cta: {
    h2: "Book Your Free Consultation Today",
    sub: "Do not hesitate to reach out. Schedule your appointment or chat with us directly to formulate your custom dental care treatment plan.",
    btn1: "Book Appointment",
    btn2: "Contact on WhatsApp",
  },

  booking: {
    h2: "Schedule Your Appointment",
    days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    times: [
      "09:00 AM", "10:30 AM", "12:00 PM", "01:30 PM",
      "03:00 PM", "04:30 PM", "06:00 PM", "07:30 PM"
    ],
    fields: {
      name: "Full Name",
      phone: "Phone Number (Egypt)",
      email: "Email Address (Optional)",
      note: "Additional notes or dynamic concerns...",
      lang: "Preferred Language for Contact",
    },
    submit: "Confirm Pre-Booking",
    confirm: "* We will finalize and confirm your appointment time with you directly via WhatsApp after receiving the request.",
    success: "✅ Your booking request was received! We will contact you shortly to confirm.",
    errors: {
      name: "Please enter your full name (at least 2 characters).",
      phone: "Please enter a valid Egyptian phone number (e.g., 01012345678).",
    },
    // Booking page (/book) — see specs/002-appointment-booking/contracts/ui-contracts.md
    pageTitle: "Book an Appointment",
    metaDescription: "Schedule your appointment with Dr. Shenouda Dental Clinic on Saturdays or Wednesdays at 4:00 PM.",
    backToHome: "Back to Home",
    selectSlotLabel: "Select an appointment time",
    saturday: "Saturday",
    wednesday: "Wednesday",
    booked: "Booked",
    available: "Available",
    nameLabel: "Full Name",
    namePlaceholder: "Enter your name",
    nameError: "Name must be at least 2 characters",
    phoneLabel: "Phone Number",
    phonePlaceholder: "01XXXXXXXXX",
    phoneError: "Please enter a valid phone number",
    emailLabel: "Email Address",
    emailPlaceholder: "you@example.com",
    emailError: "Please enter a valid email address",
    submitButton: "Book Appointment",
    submittingButton: "Booking…",
    confirmationTitle: "Appointment Confirmed!",
    errorTitle: "Booking Failed",
    slotTakenError: "This slot is no longer available. Please pick a different time.",
    storageError: "Unable to save your booking — browser storage is full or disabled.",
    bookAnother: "Book Another Appointment",
    tryAgain: "Try Again",
    cancellationNote: "To cancel or modify your appointment, message us on WhatsApp.",
    noSlotsAvailable: "No appointments are currently available. Please check back soon.",
    localTimeNote: "Times shown are based on your device clock.",
    selectedSlot: "Selected slot",
    date: "Date",
    time: "Time",
    name: "Name",
    phone: "Phone",
    email: "Email",
  },

  faq: {
    h2: "Frequently Asked Questions",
    items: [
      {
        q: "How often should I visit the dentist?",
        a: "We recommend visiting the dentist at least twice a year for routine checkups and professional cleanings to maintain optimal oral health."
      },
      {
        q: "Do you offer pain-free treatments?",
        a: "Yes, we utilize the latest dental technology and advanced local anesthesia to ensure a completely comfortable and pain-free experience for our patients."
      },
      {
        q: "What is teeth whitening and is it safe?",
        a: "Teeth whitening is a highly safe and effective cosmetic procedure when performed under professional supervision. We use certified materials to protect your gums and enamel while delivering brilliant results."
      },
      {
        q: "Do cosmetic fillings look natural?",
        a: "Absolutely. Cosmetic composite fillings are color-matched precisely to your natural teeth, rendering them virtually invisible and blending seamlessly with your smile."
      },
      {
        q: "How can I book an appointment at the clinic?",
        a: "You can easily book your appointment using our online booking form on the website, or by clicking the floating WhatsApp button to chat with us directly."
      }
    ]
  },

  footer: {
    tagline: "Precision in Every Smile",
    description: "Delivering specialized, comprehensive dental treatments using cutting-edge digital clinic equipment and global sterilization materials, guaranteeing healthy teeth and beautiful smiles.",
    links: ["Services", "About Dr.", "Our Cases", "FAQ"],
    contact: {
      whatsapp: "Message on WhatsApp",
      address: "Alexandria, Egypt",
    },
    copyright: "© 2026 Dr. Shenouda Dental Clinic. Precision and quality fitting your smile.",
  },

  whatsapp: {
    tooltip: "Chat directly with the Doctor",
    message: "Hello Dr. Shenouda, I would like to inquire about your clinic services and schedule a consultation appointment.",
  }
};
