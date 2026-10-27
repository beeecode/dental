import { useState } from "react"
import {
  addDays,
  daysInMonth,
  formatLongDate,
  formatMonth,
  fromISODate,
  mondayOffset,
  startOfToday,
  toISODate,
  WEEKDAY_INITIALS,
} from "@/lib/dates"

/** Requests can be made from tomorrow up to this many days ahead. */
const BOOKING_WINDOW_DAYS = 60

export default function BookingCalendar({
  value,
  onChange,
}: {
  value: string | null
  onChange: (iso: string) => void
}) {
  const [range] = useState(() => {
    const today = startOfToday()
    return {
      first: addDays(today, 1),
      last: addDays(today, BOOKING_WINDOW_DAYS),
    }
  })
  const [view, setView] = useState(() => {
    const initial = value ? fromISODate(value) : range.first
    return { year: initial.getFullYear(), month: initial.getMonth() }
  })

  const monthIndex = (year: number, month: number) => year * 12 + month
  const current = monthIndex(view.year, view.month)
  const canGoBack =
    current > monthIndex(range.first.getFullYear(), range.first.getMonth())
  const canGoForward =
    current < monthIndex(range.last.getFullYear(), range.last.getMonth())
  const shift = (delta: number) => {
    const date = new Date(view.year, view.month + delta, 1)
    setView({ year: date.getFullYear(), month: date.getMonth() })
  }

  return (
    <div className="calendar">
      <div className="calendar-head">
        <button
          type="button"
          onClick={() => shift(-1)}
          disabled={!canGoBack}
          aria-label="Previous month"
        >
          ←
        </button>
        <strong aria-live="polite">{formatMonth(view.year, view.month)}</strong>
        <button
          type="button"
          onClick={() => shift(1)}
          disabled={!canGoForward}
          aria-label="Next month"
        >
          →
        </button>
      </div>
      <div className="date-grid">
        {WEEKDAY_INITIALS.map((d, i) => (
          <span className="day" key={`${d}${i}`} aria-hidden="true">
            {d}
          </span>
        ))}
        {Array.from({ length: mondayOffset(view.year, view.month) }, (_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {Array.from({ length: daysInMonth(view.year, view.month) }, (_, i) => {
          const date = new Date(view.year, view.month, i + 1)
          const iso = toISODate(date)
          const unavailable = date < range.first || date > range.last
          return (
            <button
              type="button"
              key={iso}
              className={value === iso ? "selected" : ""}
              disabled={unavailable}
              aria-pressed={value === iso}
              aria-label={formatLongDate(date)}
              onClick={() => onChange(iso)}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}
