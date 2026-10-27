import { useCallback, useState } from "react"
import { prependStoredBooking } from "@/lib/bookings"
import { formatLongDate, formatShortDate, fromISODate } from "@/lib/dates"
import { validateContact } from "@/lib/validation"

/** Steps the patient fills in; the confirmation screen comes after them. */
export const BOOKING_STEPS = 4
const CONFIRMATION_STEP = BOOKING_STEPS + 1

const emptyForm = { name: "", phone: "", email: "" }

/**
 * State for the appointment request modal. It lives on the page (not inside
 * the modal) so entered details survive closing and reopening mid-way; a
 * completed request is cleared the next time the modal opens.
 */
export default function useBookingFlow() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState("10:30")
  const [form, setForm] = useState(emptyForm)
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState("")
  const [reference, setReference] = useState("")

  const start = (preselectedService?: string) => {
    if (step === CONFIRMATION_STEP) {
      setSelectedDate(null)
      setSelectedTime("10:30")
      setForm(emptyForm)
      setConsent(false)
      setReference("")
    }
    if (preselectedService !== undefined) setSelectedService(preselectedService)
    else if (step === CONFIRMATION_STEP) setSelectedService("")
    setError("")
    setStep(1)
    setOpen(true)
  }

  const close = useCallback(() => setOpen(false), [])

  const goTo = (target: number) => {
    setError("")
    setStep(target)
  }

  const submit = () => {
    const id = `LDS-${Date.now().toString().slice(-6)}`
    prependStoredBooking({
      id,
      customer: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || "Not provided",
      service: selectedService,
      date: formatShortDate(fromISODate(selectedDate!)),
      time: selectedTime,
      source: "Website booking",
      submittedAt: new Date().toISOString(),
      status: "Pending",
    })
    setReference(id)
  }

  const next = () => {
    let problem = ""
    if (step === 1 && !selectedService)
      problem = "Please select a reason for your visit."
    if (step === 2 && !selectedDate) problem = "Please choose a preferred date."
    if (step === 3) problem = validateContact(form)
    if (step === 4 && !consent)
      problem = "Please agree to be contacted about this request."
    if (problem) {
      setError(problem)
      return
    }
    if (step === 4) submit()
    goTo(step + 1)
  }

  const back = () => goTo(step - 1)

  const summary = () =>
    [
      "Hello Luxuriate Dental Solutions, I'd like to request an appointment.",
      `Reference: ${reference}`,
      `Reason for visit: ${selectedService}`,
      `Preferred date: ${
        selectedDate ? formatLongDate(fromISODate(selectedDate)) : ""
      }, ${selectedTime} WAT`,
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email.trim() && `Email: ${form.email.trim()}`,
    ]
      .filter(Boolean)
      .join("\n")

  return {
    open,
    step,
    isComplete: step === CONFIRMATION_STEP,
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
    start,
    close,
    goTo,
    next,
    back,
  }
}

export type BookingFlow = ReturnType<typeof useBookingFlow>
