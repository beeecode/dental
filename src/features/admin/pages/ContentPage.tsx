import PageHead from "../components/PageHead"
import type { ShowToast } from "../types"

export default function ContentPage({ setToast }: { setToast: ShowToast }) {
  return (
    <>
      <PageHead title="Website Content">
        Update selected public content without editing source code.
      </PageHead>
      <div className="content-layout">
        <aside>
          {[
            "Homepage",
            "Services",
            "Testimonials",
            "FAQ",
            "Contact details",
          ].map((x, i) => (
            <button className={i === 0 ? "active" : ""} key={x}>
              {x}
              <span>›</span>
            </button>
          ))}
        </aside>
        <section className="dashboard-card content-editor">
          <div className="card-head">
            <div>
              <h2>Homepage hero</h2>
              <p>Last published 12 Dec · Owner</p>
            </div>
            <span className="draft-pill">Draft changes</span>
          </div>
          <label>
            Eyebrow
            <input defaultValue="PERSONALIZED DENTAL CARE IN OSOGBO" />
          </label>
          <label>
            Headline
            <input defaultValue="A Healthier Smile. A More Confident You." />
          </label>
          <label>
            Supporting text
            <textarea defaultValue="Discover thoughtful dental care designed around your comfort, confidence, and individual needs." />
          </label>
          <div className="editor-actions">
            <button>Discard</button>
            <button>Live preview ↗</button>
            <button
              className="ad-primary"
              onClick={() => setToast("Demo mode — changes aren’t saved")}
            >
              Save draft
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
