import { useState } from "react"
import DecemberReservation from "@/features/december/DecemberReservation"
import { useReveal } from "@/hooks/useReveal"
import Arrow from "./components/Arrow"
import BookingModal from "./components/BookingModal"
import ServiceModal from "./components/ServiceModal"
import SiteFooter from "./components/SiteFooter"
import SiteHeader from "./components/SiteHeader"
import {
  DECEMBER_FAQ_ID,
  faqs,
  heroImage,
  type Service,
  testimonials,
} from "./data"
import useBookingFlow from "./hooks/useBookingFlow"
import AboutSection from "./sections/AboutSection"
import CampaignSection from "./sections/CampaignSection"
import ContactSection from "./sections/ContactSection"
import FaqSection from "./sections/FaqSection"
import FinalCta from "./sections/FinalCta"
import GallerySection from "./sections/GallerySection"
import HeroSection from "./sections/HeroSection"
import JourneySection from "./sections/JourneySection"
import ServicesSection from "./sections/ServicesSection"
import TestimonialsSection from "./sections/TestimonialsSection"
import TrustStrip from "./sections/TrustStrip"

export default function HomePage() {
  useReveal()
  const [menuOpen, setMenuOpen] = useState(false)
  const [service, setService] = useState<Service | null>(null)
  const [reservationOpen, setReservationOpen] = useState(false)
  const booking = useBookingFlow()
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0].id)

  const openBooking = () => {
    setMenuOpen(false)
    booking.start()
  }

  // Escape handling, focus and scroll locking live in each overlay (useDialog).

  const openReservation = () => setReservationOpen(true)

  return (
    <div className="app">
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onBook={openBooking}
      />

      <main>
        <HeroSection onBook={openBooking} onReserve={openReservation} />
        <AboutSection />
        <TrustStrip />
        <ServicesSection onSelect={setService} />
        <JourneySection onBook={openBooking} />
        <GallerySection />
        <CampaignSection
          onReserve={openReservation}
          onBook={openBooking}
          onOpenFaq={() => setOpenFaq(DECEMBER_FAQ_ID)}
        />
        {testimonials.length > 0 && (
          <TestimonialsSection testimonials={testimonials} />
        )}
        <FaqSection openId={openFaq} onToggle={setOpenFaq} />
        <ContactSection onBook={openBooking} />
        <FinalCta onBook={openBooking} />
      </main>

      <SiteFooter onBook={openBooking} />

      <button className="mobile-book" onClick={openBooking}>
        Book a visit <Arrow />
      </button>

      {service && (
        <ServiceModal
          service={service}
          onClose={() => setService(null)}
          onRequestConsultation={(selected) => {
            setService(null)
            setMenuOpen(false)
            booking.start(selected.bookingReason)
          }}
        />
      )}
      {booking.open && <BookingModal booking={booking} />}
      {reservationOpen && (
        <DecemberReservation
          image={heroImage}
          onClose={() => setReservationOpen(false)}
        />
      )}
    </div>
  )
}
