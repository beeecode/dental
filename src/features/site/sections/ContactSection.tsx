import { whatsappLink } from "@/lib/whatsapp"
import Arrow from "../components/Arrow"

const mapsLink =
  "https://www.google.com/maps/search/?api=1&query=Luxuriate+Dental+Solutions+Osogbo"

export default function ContactSection({ onBook }: { onBook: () => void }) {
  return (
    <section className="section contact" id="contact">
      <div className="shell contact-card">
        <div>
          <p className="eyebrow">Visit Luxuriate</p>
          <h2>
            Your next smile
            <br />
            <em>starts here.</em>
          </h2>
          <p>
            Osogbo, Osun State, Nigeria
            <br />
            <span>
              Message us on WhatsApp for directions and opening hours.
            </span>
          </p>
          <div className="contact-actions">
            <button className="button button-primary" onClick={onBook}>
              Request an appointment <Arrow />
            </button>
            <a
              className="text-link"
              href={whatsappLink(
                "Hello Luxuriate Dental Solutions, I have a question.",
              )}
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp <Arrow />
            </a>
          </div>
        </div>
        <a
          className="map-placeholder"
          href={mapsLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Luxuriate Dental Solutions in Google Maps"
        >
          <span className="map-pin">L</span>
          <div className="map-road road-one" />
          <div className="map-road road-two" />
          <p>
            Osogbo
            <br />
            <small>Open in Google Maps ↗</small>
          </p>
        </a>
      </div>
    </section>
  )
}
