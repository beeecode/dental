import type { Appointment } from "../types"
import { initials } from "../utils"
import StatusPill from "./StatusPill"

export default function AppointmentTable({
  items,
  onOpen,
  compact = false,
}: {
  items: Appointment[]
  onOpen: (a: Appointment) => void
  compact?: boolean
}) {
  return (
    <div className="appointment-table">
      <div className="appointment-row table-header">
        <span>Reference</span>
        <span>Customer</span>
        <span>Service</span>
        {!compact && <span>Source</span>}
        <span>Requested date</span>
        <span>Status</span>
        <span />
      </div>
      {items.map((item) => (
        <button
          className="appointment-row"
          key={item.id}
          onClick={() => onOpen(item)}
        >
          <span className="ref">{item.id}</span>
          <span className="customer-cell">
            <i>{initials(item.customer)}</i>
            <b>
              {item.customer}
              <small>{item.phone}</small>
            </b>
          </span>
          <span>{item.service}</span>
          {!compact && <span>{item.source}</span>}
          <span>
            {item.date}
            <small>{item.time}</small>
          </span>
          <span>
            <StatusPill status={item.status} />
          </span>
          <span className="row-more">•••</span>
        </button>
      ))}
      {!items.length && (
        <div className="empty-table">
          <span>⌕</span>
          <strong>No matching appointments</strong>
          <p>Try adjusting the status or search filters.</p>
        </div>
      )}
    </div>
  )
}
