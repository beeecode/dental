// Calendar helpers. Dates are handled as local "YYYY-MM-DD" strings so a
// chosen day never shifts across time zones.

const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export const WEEKDAY_INITIALS = ["M", "T", "W", "T", "F", "S", "S"]

export function toISODate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${date.getFullYear()}-${month}-${day}`
}

export function fromISODate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number)
  return new Date(year, month - 1, day)
}

export function startOfToday() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
}

/** Number of blank cells before day 1 in a Monday-first grid. */
export function mondayOffset(year: number, month: number) {
  return (new Date(year, month, 1).getDay() + 6) % 7
}

export function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

/** "4 Dec 2026" — the format stored on booking records. */
export function formatShortDate(date: Date) {
  return `${date.getDate()} ${SHORT_MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

/** Parses the "4 Dec 2026" record format back into a date. */
export function parseShortDate(value: string) {
  const [day, month, year] = value.split(" ")
  const monthIndex = SHORT_MONTHS.indexOf(month)
  if (monthIndex < 0) return null
  return new Date(Number(year), monthIndex, Number(day))
}

/** "Friday, 4 December 2026" */
export function formatLongDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/** "December 2026" */
export function formatMonth(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  })
}
