export const heroImage =
  "https://images.unsplash.com/photo-1783013950485-7d616f440e83?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=86&w=1400"
export const portraitImage =
  "https://images.unsplash.com/photo-1739511833049-20e302074388?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=84&w=1200"
export const clinicImage =
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=1400"
export const clinicImageTwo =
  "https://images.unsplash.com/photo-1629909615184-74f495363b67?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=1200"

export type Service = {
  number: string
  title: string
  text: string
  image: string
  /** Matching "reason for visit" option in the booking flow. */
  bookingReason: string
}

export const navLinks = [
  { id: "about", label: "About us" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Smile gallery" },
  { id: "december", label: "December offer" },
  { id: "contact", label: "Contact" },
]

export const services: Service[] = [
  {
    number: "01",
    title: "Teeth Whitening",
    text: "Explore professional whitening options with guidance tailored to your smile.",
    image: heroImage,
    bookingReason: "Teeth Whitening",
  },
  {
    number: "02",
    title: "Scaling & Polishing",
    text: "Refresh your smile through professional dental cleaning and preventive care.",
    image: clinicImage,
    bookingReason: "Scaling & Polishing",
  },
  {
    number: "03",
    title: "Dental Veneers",
    text: "Discover cosmetic options designed to address selected smile concerns.",
    image: portraitImage,
    bookingReason: "Veneers Consultation",
  },
  {
    number: "04",
    title: "Dental Crowns",
    text: "Learn about restorative options that may help protect and strengthen a tooth.",
    image: clinicImageTwo,
    bookingReason: "Dental Crown Consultation",
  },
  {
    number: "05",
    title: "Teeth Replacement",
    text: "Discuss suitable approaches to restoring function, comfort, and confidence.",
    image: heroImage,
    bookingReason: "Teeth Replacement",
  },
  {
    number: "06",
    title: "General Consultation",
    text: "Begin with a thoughtful conversation about your dental needs and next steps.",
    image: clinicImage,
    bookingReason: "General Consultation",
  },
]

export const trustItems = [
  "Patient-centered care",
  "Personalized consultations",
  "A welcoming environment",
  "Dental & cosmetic services",
]

export const journeySteps = [
  ["Discover", "Tell us about your concerns and what you hope to achieve."],
  ["Consult", "Discuss suitable treatment options with a dental professional."],
  ["Begin", "Choose your next step with a personalized care plan."],
]

export type Testimonial = {
  quote: string
  author: string
  source?: string
}

// Add approved, attributed patient feedback here. The section stays hidden
// while this list is empty — never publish invented reviews.
export const testimonials: Testimonial[] = []

export const DECEMBER_FAQ_ID = "december"

export const faqs = [
  {
    id: "booking",
    question: "How do I request an appointment?",
    answer:
      "Choose “Book appointment”, pick a reason for your visit and a preferred date and time, then send the request to the clinic on WhatsApp. The clinic will reply to confirm your appointment.",
  },
  {
    id: "services",
    question: "What dental services are available?",
    answer:
      "General consultations, scaling & polishing, teeth whitening, veneers, crowns, and teeth replacement. Ask the clinic about anything not listed.",
  },
  {
    id: "location",
    question: "Where is the clinic located?",
    answer:
      "We're in Osogbo, Osun State, Nigeria. Message us on WhatsApp for directions before your visit.",
  },
  {
    id: "pricing",
    question: "How can I learn about treatment pricing?",
    answer:
      "Treatment needs vary. Request a consultation so the clinic can give you relevant, current pricing after discussing your needs.",
  },
  {
    id: DECEMBER_FAQ_ID,
    question: "What is the December Smile Special?",
    answer:
      "During December 2026, Scaling & Polishing is offered at ₦10,000 on selected dates. Reserve your preferred date and the clinic will confirm availability and final terms.",
  },
]

export const bookingServices = [
  "General Consultation",
  "Teeth Whitening",
  "Scaling & Polishing",
  "Veneers Consultation",
  "Dental Crown Consultation",
  "Teeth Replacement",
  "Other Dental Concern",
]
