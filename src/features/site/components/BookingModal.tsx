import { useRef } from "react"
import { useDialog } from "@/hooks/useDialog"
import { appointmentTimes } from "@/lib/bookings"
import { formatLongDate, fromISODate } from "@/lib/dates"
import { PHONE_PLACEHOLDER } from "@/lib/validation"
import { whatsappLink } from "@/lib/whatsapp"
import { bookingServices } from "../data"
import { BOOKING_STEPS, type BookingFlow } from "../hooks/useBookingFlow"
import Arrow from "./Arrow"
import BookingCalendar from "./BookingCalendar"

const nextLabels = ["Continue", "Continue", "Review request", "Send request"]

export default function BookingModal({ booking }: { booking: BookingFlow }) {
  const {
    step,
    isComplete,
    selectedService,
    setSelectedService,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    form,
    setForm,
    consent,
    setConsent,
    error,
    reference,
    summary,
    close,
    goTo,
    next,
    back,
  } = booking
  const dialogRef = useRef<HTMLDivElement>(null)
  useDialog(dialogRef, { onClose: close })
  const preferredDate = selectedDate
    ? formatLongDate(fromISODate(selectedDate))
    : ""

  return (
    <div
      className="modal-backdrop booking-backdrop"
      role="presentation"
      onMouseDown={close}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={close}
          aria-label="Close booking"
        >
          ×
        </button>
        <div className="booking-head">
          <div>
            <p className="eyebrow">Appointment request</p>
            <h2 id="booking-title">Let’s plan your visit.</h2>
          </div>
          {!isComplete && (
            <span>
              Step {step} of {BOOKING_STEPS}
            </span>
          )}
        </div>
        <div className="progress" aria-hidden="true">
          {Array.from({ length: BOOKING_STEPS }, (_, i) => i + 1).map((n) => (
            <i key={n} className={step >= n ? "active" : ""} />
          ))}
        </div>

        {step === 1 && (
          <div className="booking-panel">
            <h3>What brings you in?</h3>
            <div className="option-grid">
              {bookingServices.map((item) => (
                <button
                  className={selectedService === item ? "selected" : ""}
                  aria-pressed={selectedService === item}
                  onClick={() => setSelectedService(item)}
                  key={item}
                >
                  {item}
                  <span aria-hidden="true">
                    {selectedService === item ? "✓" : "↗"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="booking-panel">
            <h3>Choose a preference</h3>
            <p className="helper">
              Pick your preferred day and time. The clinic will confirm the
              final appointment with you. Times are West Africa Time (WAT).
            </p>
            <BookingCalendar value={selectedDate} onChange={setSelectedDate} />
            <div className="times">
              {appointmentTimes.map((time) => (
                <button
                  className={selectedTime === time ? "selected" : ""}
                  aria-pressed={selectedTime === time}
                  onClick={() => setSelectedTime(time)}
                  key={time}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <form
            className="booking-panel"
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              next()
            }}
          >
            <h3>How can we reach you?</h3>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                autoFocus
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="phone">Phone / WhatsApp</label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder={PHONE_PLACEHOLDER}
                />
              </div>
              <div className="field">
                <label htmlFor="email">
                  Email <span>optional</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <button type="submit" className="visually-hidden">
              Continue
            </button>
          </form>
        )}

        {step === 4 && (
          <div className="booking-panel review">
            <h3>Review your request</h3>
            <div>
              <span>Reason for visit</span>
              <strong>{selectedService}</strong>
              <button className="review-edit" onClick={() => goTo(1)}>
                Edit
              </button>
            </div>
            <div>
              <span>Preference</span>
              <strong>
                {preferredDate}
                <br />
                {selectedTime} WAT
              </strong>
              <button className="review-edit" onClick={() => goTo(2)}>
                Edit
              </button>
            </div>
            <div>
              <span>Contact</span>
              <strong>
                {form.name}
                <br />
                {form.phone}
                {form.email && (
                  <>
                    <br />
                    {form.email}
                  </>
                )}
              </strong>
              <button className="review-edit" onClick={() => goTo(3)}>
                Edit
              </button>
            </div>
            <label className="reservation-check">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>
                I agree that Luxuriate Dental Solutions may use these details to
                contact me about this request.
              </span>
            </label>
            <p>
              This is a request, not a confirmed appointment. The clinic will
              contact you to confirm.
            </p>
          </div>
        )}

        {isComplete && (
          <div className="booking-panel confirmation">
            <span className="check" aria-hidden="true">
              ✓
            </span>
            <p className="eyebrow">Almost done</p>
            <h3>Send your request to the clinic.</h3>
            <p>
              Tap below to send these details on WhatsApp. The clinic will reply
              to confirm your appointment.
            </p>
            <div className="success-reference">
              <small>Request reference</small>
              <strong>{reference}</strong>
              <span>
                {selectedService} · {preferredDate} · {selectedTime} WAT
              </span>
              <b>Awaiting confirmation</b>
            </div>
            <div className="confirmation-actions">
              <a
                className="button button-primary"
                href={whatsappLink(summary())}
                target="_blank"
                rel="noreferrer"
              >
                Send on WhatsApp <Arrow />
              </a>
              <button className="text-link" onClick={close}>
                Return to website
              </button>
            </div>
          </div>
        )}

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        {!isComplete && (
          <div className="booking-controls">
            {step > 1 ? (
              <button className="back-button" onClick={back}>
                ← Back
              </button>
            ) : (
              <span />
            )}
            <button className="button button-primary" onClick={next}>
              {nextLabels[step - 1]} <Arrow />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
