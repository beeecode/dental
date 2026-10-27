import Arrow from "../components/Arrow"
import { journeySteps, portraitImage } from "../data"

export default function JourneySection({ onBook }: { onBook: () => void }) {
  return (
    <section className="section journey" id="story">
      <div className="shell journey-grid">
        <div className="journey-image">
          <img
            src={portraitImage}
            alt="Smiling Black woman, illustrative campaign photography"
          />
          <div className="image-word">confidence</div>
        </div>
        <div className="journey-copy">
          <p className="eyebrow">The confidence to smile</p>
          <h2>
            Small steps.
            <br />
            <em>Meaningful confidence.</em>
          </h2>
          <div className="steps">
            {journeySteps.map(([title, text], index) => (
              <div className="step" key={title}>
                <span>0{index + 1}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="button button-primary" onClick={onBook}>
            Start your smile journey <Arrow />
          </button>
        </div>
      </div>
    </section>
  )
}
