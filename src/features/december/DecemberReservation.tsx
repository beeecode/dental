import { type FormEvent, useRef, useState } from "react"
import { useDialog } from "@/hooks/useDialog"
import {
  appointmentTimes,
  prependStoredBooking,
  setDemoNotification,
} from "@/lib/bookings"
import {
  daysInMonth,
  formatLongDate,
  formatShortDate,
  mondayOffset,
  startOfToday,
  WEEKDAY_INITIALS,
} from "@/lib/dates"
import { PHONE_PLACEHOLDER, validateContact } from "@/lib/validation"
import { whatsappLink } from "@/lib/whatsapp"
import { campaign } from "./campaign"

const { year, month } = campaign
const dateOf = (day: number) => new Date(year, month, day)

export default function DecemberReservation({
  image,
  onClose,
}: {
  image: string
  onClose: () => void
}) {
  const [step, setStep] = useState(1)
  const [details, setDetails] = useState({ name: "", phone: "", email: "" })
  const [day, setDay] = useState<number | null>(null)
  const [time, setTime] = useState("10:30")
  const [consent, setConsent] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [error, setError] = useState("")
  const [reference, setReference] = useState("")
  const [today] = useState(startOfToday)
  const dialogRef = useRef<HTMLElement>(null)
  useDialog(dialogRef, { onClose })

  const isBookable = (date: number) =>
    campaign.availableDays.includes(date) && dateOf(date) > today
  const preferredDate = day ? formatLongDate(dateOf(day)) : ""

  const goTo = (target: number) => {
    setError("")
    setStep(target)
  }

  const validateDetails = (event: FormEvent) => {
    event.preventDefault()
    const problem = validateContact(details)
    if (problem) return setError(problem)
    goTo(2)
  }

  const confirmPreference = () => {
    if (!day) return setError("Please choose a preferred date.")
    goTo(3)
  }

  const submit = () => {
    if (!consent)
      return setError("Please agree to be contacted about this request.")
    const id = `LDS-DEC-${Date.now().toString().slice(-6)}`
    prependStoredBooking({
      id,
      customer: details.name.trim(),
      phone: details.phone.trim(),
      email: details.email.trim() || "Not provided",
      service: campaign.service,
      campaign: campaign.name,
      date: formatShortDate(dateOf(day!)),
      time,
      source: "December 2026 Promotion",
      submittedAt: new Date().toISOString(),
      status: "Pending",
      marketing,
    })
    setDemoNotification("New December promotional booking request.")
    setReference(id)
    goTo(4)
  }

  const whatsapp = whatsappLink(
    [
      `Hello Luxuriate Dental Solutions, I'd like to reserve the ${campaign.name} offer.`,
      `Reference: ${reference}`,
      `Offer: ${campaign.service} (${campaign.price})`,
      `Preferred date: ${preferredDate}, ${time} WAT`,
      `Name: ${details.name.trim()}`,
      `Phone: ${details.phone.trim()}`,
      details.email.trim() && `Email: ${details.email.trim()}`,
    ]
      .filter(Boolean)
      .join("\n"),
  )

  return (
    <div
      className="reservation-layer"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        ref={dialogRef}
        tabIndex={-1}
        className="reservation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          className="reservation-close"
          onClick={onClose}
          aria-label="Close reservation"
        >
          ×
        </button>
        <aside className="reservation-aside">
          <img src={image} alt="Illustrative December campaign portrait" />
          <div>
            <p>{campaign.name}</p>
            <strong>{campaign.service}</strong>
            <span>{campaign.price}</span>
            <small>Terms and availability are confirmed by the clinic.</small>
          </div>
        </aside>
        <div className="reservation-content">
          {step < 4 && (
            <>
              <p className="eyebrow">December reservation</p>
              <h2 id="reservation-title">Reserve Your December Smile</h2>
              <p className="reservation-sub">
                Request an appointment for our December {campaign.service}{" "}
                special.
              </p>
              <div className="reservation-progress" aria-hidden="true">
                {[1, 2, 3].map((number) => (
                  <i className={step >= number ? "active" : ""} key={number}>
                    <span>{number}</span>
                  </i>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <form
              className="reservation-step"
              noValidate
              onSubmit={validateDetails}
            >
              <div className="reservation-step-title">
                <span>01</span>
                <div>
                  <h3>Tell us about you</h3>
                  <p>No account is required.</p>
                </div>
              </div>
              <label>
                Full name <em>required</em>
                <input
                  data-autofocus
                  value={details.name}
                  onChange={(e) =>
                    setDetails({ ...details, name: e.target.value })
                  }
                  autoComplete="name"
                  placeholder="Your full name"
                />
              </label>
              <label>
                Phone / WhatsApp <em>required</em>
                <input
                  value={details.phone}
                  onChange={(e) =>
                    setDetails({ ...details, phone: e.target.value })
                  }
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder={PHONE_PLACEHOLDER}
                />
              </label>
              <label>
                Email address <em>optional</em>
                <input
                  value={details.email}
                  onChange={(e) =>
                    setDetails({ ...details, email: e.target.value })
                  }
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </label>
              {error && (
                <p className="reservation-error" role="alert">
                  {error}
                </p>
              )}
              <button className="reservation-primary">
                Continue <span>↗</span>
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="reservation-step">
              <div className="reservation-step-title">
                <span>02</span>
                <div>
                  <h3>Select your preference</h3>
                  <p>December 2026 · West Africa Time (WAT)</p>
                </div>
              </div>
              <div className="reservation-notice">
                Choose a preferred date and time. The clinic will confirm
                availability with you.
              </div>
              <div className="dec-calendar">
                <div>
                  <button aria-label="Previous month" disabled>
                    ←
                  </button>
                  <strong>December 2026</strong>
                  <button aria-label="Next month" disabled>
                    →
                  </button>
                </div>
                <div className="dec-days">
                  {WEEKDAY_INITIALS.map((d, i) => (
                    <small key={`${d}${i}`} aria-hidden="true">
                      {d}
                    </small>
                  ))}
                  {Array.from({ length: mondayOffset(year, month) }, (_, i) => (
                    <span key={`blank-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth(year, month) }, (_, i) => {
                    const date = i + 1
                    return (
                      <button
                        key={date}
                        disabled={!isBookable(date)}
                        className={day === date ? "selected" : ""}
                        aria-pressed={day === date}
                        aria-label={formatLongDate(dateOf(date))}
                        onClick={() => setDay(date)}
                      >
                        {date}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="reservation-times">
                {appointmentTimes.map((slot) => (
                  <button
                    className={time === slot ? "selected" : ""}
                    aria-pressed={time === slot}
                    onClick={() => setTime(slot)}
                    key={slot}
                  >
                    {slot}
                    <small>Preference</small>
                  </button>
                ))}
              </div>
              {error && (
                <p className="reservation-error" role="alert">
                  {error}
                </p>
              )}
              <div className="reservation-nav">
                <button onClick={() => goTo(1)}>← Back</button>
                <button
                  className="reservation-primary"
                  onClick={confirmPreference}
                >
                  Continue to Review <span>↗</span>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="reservation-step">
              <div className="reservation-step-title">
                <span>03</span>
                <div>
                  <h3>Review reservation</h3>
                  <p>Please check your request.</p>
                </div>
              </div>
              <div className="reservation-summary">
                <div>
                  <span>Customer</span>
                  <strong>
                    {details.name}
                    <small>
                      {details.phone}
                      {details.email && ` · ${details.email}`}
                    </small>
                  </strong>
                  <button onClick={() => goTo(1)}>Edit</button>
                </div>
                <div>
                  <span>Offer</span>
                  <strong>
                    {campaign.service}
                    <small>
                      {campaign.price} · {campaign.name}
                    </small>
                  </strong>
                </div>
                <div>
                  <span>Preference</span>
                  <strong>
                    {preferredDate}
                    <small>{time} WAT</small>
                  </strong>
                  <button onClick={() => goTo(2)}>Edit</button>
                </div>
              </div>
              <p className="reservation-ack">
                This is a request, not a confirmed appointment. The clinic will
                contact you to confirm.
              </p>
              <label className="reservation-check">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>
                  I agree that Luxuriate Dental Solutions may use these details
                  to contact me about this request. <em>Required</em>
                </span>
              </label>
              <label className="reservation-check">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
                <span>
                  I would like to receive occasional promotional updates.
                  Optional.
                </span>
              </label>
              {error && (
                <p className="reservation-error" role="alert">
                  {error}
                </p>
              )}
              <div className="reservation-nav">
                <button onClick={() => goTo(2)}>← Back</button>
                <button className="reservation-primary" onClick={submit}>
                  Send Reservation Request <span>↗</span>
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="reservation-success">
              <span className="success-check" aria-hidden="true">
                ✓
              </span>
              <p className="eyebrow">Almost done</p>
              <h2 id="reservation-title">Send your reservation.</h2>
              <p>
                Tap below to send these details on WhatsApp. The clinic will
                reply to confirm your December appointment.
              </p>
              <div className="success-reference">
                <small>Reservation reference</small>
                <strong>{reference}</strong>
                <span>
                  {campaign.service} · {preferredDate} · {time} WAT
                </span>
                <b>Awaiting confirmation</b>
              </div>
              <div>
                <a
                  className="reservation-primary"
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  Send on WhatsApp <span>↗</span>
                </a>
                <button className="reservation-link" onClick={onClose}>
                  Back to Homepage
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
