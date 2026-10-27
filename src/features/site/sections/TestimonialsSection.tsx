import { useState } from "react"
import type { Testimonial } from "../data"

export default function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  const [current, setCurrent] = useState(0)
  const total = testimonials.length
  const item = testimonials[current]

  return (
    <section className="section testimonials">
      <div className="shell testimonial-grid">
        <div>
          <p className="eyebrow">Patient experiences</p>
          <h2>
            Words that
            <br />
            <em>make us smile.</em>
          </h2>
        </div>
        <div className="quote">
          <span className="quote-mark">“</span>
          <blockquote aria-live="polite">{item.quote}</blockquote>
          <div className="quote-footer">
            <span>
              {item.author}
              {item.source && ` · ${item.source}`}
              {total > 1 && ` · ${current + 1}/${total}`}
            </span>
            {total > 1 && (
              <div>
                <button
                  onClick={() => setCurrent((current + total - 1) % total)}
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrent((current + 1) % total)}
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
