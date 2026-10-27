import AppointmentTable from "../components/AppointmentTable"
import MiniChart from "../components/MiniChart"
import TrendChart from "../components/TrendChart"
import { formatLongDate } from "@/lib/dates"
import { DEMO_TODAY, serviceData } from "../data"
import type { Appointment } from "../types"

const metricIcons = ["◫", "⌛", "✓", "◇", "↘", "₦"]

export default function OverviewPage({
  appointments,
  onOpen,
  goAppointments,
}: {
  appointments: Appointment[]
  onOpen: (a: Appointment) => void
  goAppointments: () => void
}) {
  const counts = {
    Pending: appointments.filter((a) => a.status === "Pending").length,
    Confirmed: appointments.filter((a) => a.status === "Confirmed").length,
    Completed: appointments.filter((a) => a.status === "Completed").length,
  }
  const cards = [
    [
      "Total booking requests",
      String(appointments.length),
      "+12% demo trend",
      [10, 18, 12, 23, 20, 31, 29],
    ],
    [
      "Pending requests",
      String(counts.Pending),
      "Needs review",
      [8, 10, 14, 9, 17, 12, 20],
    ],
    [
      "Confirmed appointments",
      String(counts.Confirmed),
      "Demo period",
      [7, 12, 8, 17, 19, 25, 28],
    ],
    [
      "Completed appointments",
      String(counts.Completed),
      "Demo period",
      [3, 8, 12, 10, 16, 21, 24],
    ],
    [
      "Cancellation rate",
      "12.5%",
      "Fictional records",
      [16, 14, 18, 9, 13, 8, 7],
    ],
    [
      "Recorded revenue",
      "₦420k",
      "Sample payments only",
      [4, 9, 8, 18, 14, 24, 30],
    ],
  ] as const
  return (
    <>
      <div className="welcome-line">
        <div>
          <p className="ad-eyebrow">{formatLongDate(DEMO_TODAY)}</p>
          <h1>
            Good morning, <em>Welcome back.</em>
          </h1>
          <span>Here’s what’s happening at Luxuriate Dental Solutions.</span>
        </div>
        <div className="overview-controls">
          <button>◌</button>
          <button className="date-button">Last 30 days⌄</button>
        </div>
      </div>
      <div className="metric-grid">
        {cards.map(([label, value, note, values], index) => (
          <article className="metric-card" key={label}>
            <div className="metric-top">
              <span>{metricIcons[index]}</span>
              <button title="Based on fictional demonstration records">
                i
              </button>
            </div>
            <small>{label}</small>
            <div className="metric-value">
              <strong>{value}</strong>
              <MiniChart
                values={values}
                color={index === 4 ? "#d97a6c" : "#3568d4"}
              />
            </div>
            <p>{note}</p>
          </article>
        ))}
      </div>
      <div className="analytics-grid">
        <article className="dashboard-card booking-trend">
          <div className="card-head">
            <div>
              <h2>Booking activity</h2>
              <p>Requests and confirmed appointments</p>
            </div>
            <div className="range-pills">
              <button>7D</button>
              <button className="active">30D</button>
              <button>90D</button>
            </div>
          </div>
          <TrendChart />
        </article>
        <article className="dashboard-card service-performance">
          <div className="card-head">
            <div>
              <h2>Popular services</h2>
              <p>Sample requests</p>
            </div>
            <button>•••</button>
          </div>
          <div className="service-bars">
            {serviceData.slice(0, 5).map(([name, value]) => (
              <div key={name}>
                <span>{name}</span>
                <i>
                  <b style={{ width: `${value}%` }} />
                </i>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </article>
      </div>
      <div className="dashboard-card recent-card">
        <div className="card-head">
          <div>
            <h2>Recent booking requests</h2>
            <p>Latest activity in the demonstration workspace</p>
          </div>
          <button className="view-all" onClick={goAppointments}>
            View all appointments →
          </button>
        </div>
        <AppointmentTable
          items={appointments.slice(0, 5)}
          onOpen={onOpen}
          compact
        />
      </div>
    </>
  )
}
