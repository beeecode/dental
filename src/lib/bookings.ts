// Browser-local persistence for booking requests. The public site writes
// requests here and the demo admin portal reads them back. Storage can be
// unavailable (private browsing, blocked cookies) — every call degrades to a
// no-op rather than breaking the booking flow.

const BOOKINGS_KEY = "luxuriate-demo-bookings"
const NOTIFICATION_KEY = "luxuriate-demo-notification"
const STATUS_KEY = "luxuriate-demo-status"

/** Preferred-time slots offered by every booking flow (WAT). */
export const appointmentTimes = ["09:00", "10:30", "12:00", "14:30"]

function read<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value),
    )
  } catch {
    // Storage unavailable; the request still completes on screen.
  }
}

export function readStoredBookings<T = unknown>(): T[] {
  const stored = read<unknown>(BOOKINGS_KEY, [])
  return Array.isArray(stored) ? (stored as T[]) : []
}

export function prependStoredBooking(record: object) {
  write(BOOKINGS_KEY, [record, ...readStoredBookings()])
}

export function setDemoNotification(message: string) {
  write(NOTIFICATION_KEY, message)
}

/** Status changes made in the admin portal, keyed by booking reference. */
export function readStatusOverrides(): Record<string, string> {
  return read<Record<string, string>>(STATUS_KEY, {})
}

export function saveStatusOverride(id: string, status: string) {
  write(STATUS_KEY, { ...readStatusOverrides(), [id]: status })
}
