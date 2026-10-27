import { useState } from "react"
import { heroImage, portraitImage } from "../data"

const categories = ["All stories", "Whitening", "Veneers", "Restorative care"]

export default function GallerySection() {
  const [comparison, setComparison] = useState(52)
  const [category, setCategory] = useState(categories[0])

  return (
    <section className="section gallery" id="gallery">
      <div className="shell">
        <div className="section-heading light">
          <div>
            <p className="eyebrow">Smile gallery</p>
            <h2>
              Real smiles.
              <br />
              <em>Real stories.</em>
            </h2>
          </div>
          <p>
            Drag the slider to compare. Patient before-and-after photos will be
            shared here only with their consent.
          </p>
        </div>
        <div className="gallery-tabs" role="group" aria-label="Filter stories">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="comparison">
          <img src={heroImage} alt="Illustrative portrait comparison base" />
          <div className="comparison-after" style={{ width: `${comparison}%` }}>
            <img
              src={portraitImage}
              alt="Illustrative portrait comparison overlay"
            />
          </div>
          <input
            aria-label="Comparison position"
            type="range"
            min="5"
            max="95"
            value={comparison}
            onChange={(e) => setComparison(Number(e.target.value))}
          />
          <span className="compare-line" style={{ left: `${comparison}%` }}>
            <i>↔</i>
          </span>
          <span className="demo-badge" aria-live="polite">
            {category === categories[0]
              ? "Illustrative images — not a treatment result"
              : `${category} cases coming soon — illustrative images shown`}
          </span>
        </div>
      </div>
    </section>
  )
}
