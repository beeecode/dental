import Arrow from "../components/Arrow"
import { clinicImage, portraitImage } from "../data"

export default function AboutSection() {
  return (
    <section className="section intro" id="about">
      <div className="shell intro-grid">
        <div className="section-copy">
          <p className="eyebrow">Welcome to Luxuriate</p>
          <h2>
            Your comfort.
            <br />
            Your confidence.
            <br />
            <em>Our commitment.</em>
          </h2>
          <p>
            At Luxuriate Dental Solutions, every smile deserves thoughtful
            attention. Explore professional dental services in a welcoming
            environment where your concerns and treatment goals matter.
          </p>
          <a href="#story" className="text-link">
            Our story <Arrow />
          </a>
        </div>
        <div className="editorial-images">
          <img
            className="clinic-main"
            src={clinicImage}
            alt="Illustrative modern dental treatment room"
          />
          <img
            className="clinic-detail"
            src={portraitImage}
            alt="Smiling woman, illustrative photography"
          />
          <span className="vertical-label">Care, made personal</span>
        </div>
      </div>
    </section>
  )
}
