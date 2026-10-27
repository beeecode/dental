import { trustItems } from "../data"

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Our approach">
      <div className="shell trust-grid">
        {trustItems.map((item, index) => (
          <div className="trust-item" key={item}>
            <span>0{index + 1}</span>
            <strong>{item}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}
