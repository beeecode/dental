import PageHead from "../components/PageHead"
import { serviceData } from "../data"

const durations = [45, 30, 60, 75, 60, 90]

export default function ServicesPage() {
  return (
    <>
      <PageHead title="Services" action="Add service">
        Manage public service information, duration, visibility, and campaign
        eligibility.
      </PageHead>
      <div className="service-admin-grid">
        {serviceData.map(([name], i) => (
          <article key={name}>
            <div className="service-admin-art">
              <span>0{i + 1}</span>
              <i>◇</i>
            </div>
            <div>
              <span className="publish-dot">Published</span>
              <h3>{name}</h3>
              <p>{durations[i]} min · General & cosmetic care</p>
              <footer>
                <button>Preview</button>
                <button>Edit ↗</button>
              </footer>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
