import Arrow from "../components/Arrow"
import { type Service, services } from "../data"

export default function ServicesSection({
  onSelect,
}: {
  onSelect: (service: Service) => void
}) {
  return (
    <section className="section services" id="services">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Explore our care</p>
            <h2>
              Everything your
              <br />
              <em>smile deserves.</em>
            </h2>
          </div>
          <p>
            Explore dental services tailored to your needs and discover the
            right next step for your oral health.
          </p>
        </div>
        <div className="service-grid">
          {services.map((item, index) => (
            <button
              className={`service-card service-${index + 1}`}
              key={item.title}
              onClick={() => onSelect(item)}
            >
              <img src={item.image} alt="" />
              <span className="service-overlay" />
              <span className="service-number">{item.number}</span>
              <span className="service-content">
                <strong>{item.title}</strong>
                <small>{item.text}</small>
              </span>
              <span className="service-arrow">
                <Arrow />
              </span>
            </button>
          ))}
        </div>
        <p className="fine-print">
          Service availability is subject to clinic confirmation. No treatment
          outcome is guaranteed.
        </p>
      </div>
    </section>
  )
}
