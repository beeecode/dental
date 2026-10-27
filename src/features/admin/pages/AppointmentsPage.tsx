import AppointmentTable from "../components/AppointmentTable"
import PageHead from "../components/PageHead"
import type { Appointment } from "../types"

const statusFilters = [
  "All",
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
  "Rescheduled",
  "No-show",
]

export default function AppointmentsPage({
  appointments,
  filter,
  setFilter,
  search,
  setSearch,
  onOpen,
}: {
  appointments: Appointment[]
  filter: string
  setFilter: (s: string) => void
  search: string
  setSearch: (s: string) => void
  onOpen: (a: Appointment) => void
}) {
  return (
    <>
      <PageHead title="Appointments" action="New appointment">
        Review requests, coordinate schedules, and keep every appointment
        organized.
      </PageHead>
      <div className="filter-tabs">
        {statusFilters.map((item) => (
          <button
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="table-tools">
        <label>
          ⌕
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reference, customer, service…"
          />
        </label>
        <div>
          <button>All services⌄</button>
          <button>All sources⌄</button>
          <button>More filters ⚙</button>
        </div>
      </div>
      <div className="dashboard-card appointment-table-card">
        <AppointmentTable items={appointments} onOpen={onOpen} />
      </div>
    </>
  )
}
