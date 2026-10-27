import {
  daysInMonth,
  formatMonth,
  mondayOffset,
  parseShortDate,
} from "@/lib/dates"
import PageHead from "../components/PageHead"
import { DEMO_TODAY } from "../data"
import type { Appointment } from "../types"

const year = DEMO_TODAY.getFullYear()
const month = DEMO_TODAY.getMonth()

/** "Tunde Afolayan" -> "Tunde A." */
const shortName = (name: string) => {
  const [first, ...rest] = name.trim().split(" ")
  return rest.length ? `${first} ${rest[rest.length - 1][0]}.` : first
}

export default function CalendarPage({
  appointments,
  onOpen,
}: {
  appointments: Appointment[]
  onOpen: (a: Appointment) => void
}) {
  const offset = mondayOffset(year, month)
  const monthDays = daysInMonth(year, month)
  const previousMonthDays = daysInMonth(year, month - 1)
  const cells = Math.ceil((offset + monthDays) / 7) * 7

  // Group this month's appointments by day, earliest time first.
  const byDay = new Map<number, Appointment[]>()
  for (const item of appointments) {
    const date = parseShortDate(item.date)
    if (!date || date.getFullYear() !== year || date.getMonth() !== month)
      continue
    byDay.set(date.getDate(), [...(byDay.get(date.getDate()) ?? []), item])
  }
  byDay.forEach((items) => items.sort((a, b) => a.time.localeCompare(b.time)))

  return (
    <>
      <PageHead title="Calendar" action="New appointment">
        Clinic schedule · Africa/Lagos timezone.
      </PageHead>
      <div className="calendar-toolbar">
        <div>
          <button>←</button>
          <button>Today</button>
          <button>→</button>
          <h2>{formatMonth(year, month)}</h2>
        </div>
        <div className="view-toggle">
          <button className="active">Month</button>
          <button>Week</button>
          <button>Day</button>
          <button>Agenda</button>
        </div>
      </div>
      <div className="admin-calendar">
        <div className="calendar-week">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="calendar-month">
          {Array.from({ length: cells }, (_, i) => {
            const day = i - offset + 1
            if (day < 1 || day > monthDays)
              return (
                <div className="outside" key={i}>
                  <span>
                    {day < 1 ? previousMonthDays + day : day - monthDays}
                  </span>
                </div>
              )
            return (
              <div
                className={day === DEMO_TODAY.getDate() ? "today" : ""}
                key={i}
              >
                <span>{day}</span>
                {byDay.get(day)?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onOpen(item)}
                    className={`cal-event ${item.status.toLowerCase()}`}
                    title={`${item.time} ${item.customer} · ${item.service} · ${item.status}`}
                  >
                    <i />
                    {item.time} {shortName(item.customer)}
                  </button>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
