import { faqs } from "../data"

export default function FaqSection({
  openId,
  onToggle,
}: {
  openId: string | null
  onToggle: (id: string | null) => void
}) {
  return (
    <section className="section faq-section" id="faq">
      <div className="shell faq-grid">
        <div>
          <p className="eyebrow">Good to know</p>
          <h2>
            Questions?
            <br />
            <em>We've got answers.</em>
          </h2>
          <p>
            Can't find what you need? Message the clinic on WhatsApp and the
            team will help.
          </p>
        </div>
        <div className="accordion">
          {faqs.map(({ id, question, answer }) => {
            const open = openId === id
            return (
              <div className={`faq ${open ? "open" : ""}`} key={id}>
                <button
                  id={`faq-${id}`}
                  onClick={() => onToggle(open ? null : id)}
                  aria-expanded={open}
                  aria-controls={`faq-${id}-answer`}
                >
                  <span>{question}</span>
                  <i aria-hidden="true">{open ? "−" : "+"}</i>
                </button>
                <div
                  className="faq-answer"
                  id={`faq-${id}-answer`}
                  role="region"
                  aria-labelledby={`faq-${id}`}
                >
                  <p>{answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
