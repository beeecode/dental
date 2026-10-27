import Arrow from "../components/Arrow"

export default function FinalCta({ onBook }: { onBook: () => void }) {
  return (
    <section className="final-cta">
      <div className="shell">
        <p className="eyebrow">A thoughtful first step</p>
        <h2>
          Your best smile deserves
          <br />
          <em>a first step.</em>
        </h2>
        <p>
          Explore your options and take the next step toward professional dental
          care.
        </p>
        <button className="button button-light" onClick={onBook}>
          Request an appointment <Arrow />
        </button>
      </div>
    </section>
  )
}
