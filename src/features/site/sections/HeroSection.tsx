import DecemberCountdown from "@/features/december/DecemberCountdown"
import Arrow from "../components/Arrow"
import { heroImage } from "../data"

type HeroSectionProps = {
  onBook: () => void
  onReserve: () => void
}

export default function HeroSection({ onBook, onReserve }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero-orb" />
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow reveal">Personalized dental care in Osogbo</p>
          <h1 className="hero-title reveal delay-1">
            A healthier smile.
            <br />A more <em>confident</em> you.
          </h1>
          <p className="hero-body reveal delay-2">
            Discover thoughtful dental care designed around your comfort,
            confidence, and individual needs.
          </p>
          <div className="hero-actions reveal delay-3">
            <button className="button button-primary" onClick={onBook}>
              Book your visit <Arrow />
            </button>
            <a className="text-link" href="#services">
              Explore our services <span>↓</span>
            </a>
          </div>
          <div className="hero-meta reveal delay-3">
            <span className="pulse" /> Osogbo, Osun State · Nigeria
          </div>
        </div>
        <div className="hero-visual reveal delay-2">
          <div className="hero-image">
            <img
              src={heroImage}
              alt="Smiling Black woman in warm natural light"
            />
          </div>
          <div className="hero-note">
            <span>✦</span>
            <p>
              Your smile journey
              <br />
              <strong>starts here.</strong>
            </p>
          </div>
          <div className="image-caption">Illustrative campaign photography</div>
          <DecemberCountdown onReserve={onReserve} />
        </div>
      </div>
      <a className="scroll-cue" href="#about">
        <span /> Scroll to discover
      </a>
    </section>
  )
}
