export type Status =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "No-show"
  | "Rescheduled"

export type Appointment = {
  id: string
  customer: string
  phone: string
  email: string
  service: string
  date: string
  time: string
  source: string
  status: Status
  /** ISO timestamp, present on requests submitted from the website. */
  submittedAt?: string
}

export type ShowToast = (message: string) => void
