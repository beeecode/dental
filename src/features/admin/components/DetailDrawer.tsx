import { useRef } from "react"
import { useDialog } from "@/hooks/useDialog"
import type { Appointment, Status } from "../types"
import { initials } from "../utils"
import StatusPill from "./StatusPill"

const createdLabel = (item: Appointment) =>
  item.submittedAt
    ? new Date(item.submittedAt).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Africa/Lagos",
      }) + " WAT"
    : null

type Action = {
  status: Status
  label: string
  className?: string
}

const actions: Action[] = [
  { status: "Confirmed", label: "Confirm appointment", className: "confirm" },
  { status: "Rescheduled", label: "Propose reschedule" },
  { status: "Completed", label: "Mark completed" },
  { status: "No-show", label: "Mark no-show" },
  { status: "Cancelled", label: "Cancel appointment", className: "cancel" },
]

export default function DetailDrawer({
  item,
  onClose,
  onAction,
}: {
  item: Appointment
  onClose: () => void
  onAction: (s: Status) => void
}) {
  const drawerRef = useRef<HTMLElement>(null)
  useDialog(drawerRef, { onClose })
  const created = createdLabel(item)

  return (
    <div className="drawer-layer">
      <button
        className="drawer-scrim"
        onClick={onClose}
        aria-label="Close details"
        tabIndex={-1}
      />
      <aside
        ref={drawerRef}
        tabIndex={-1}
        className="detail-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="drawer-head">
          <div>
            <p className="ad-eyebrow">Booking details</p>
            <h2 id="drawer-title">{item.id}</h2>
          </div>
          <button onClick={onClose} aria-label="Close details">
            ×
          </button>
        </div>
        <div className="drawer-status">
          <StatusPill status={item.status} />
          <span>{created ? `Created ${created}` : `Via ${item.source}`}</span>
        </div>
        <section className="person-summary">
          <span>{initials(item.customer)}</span>
          <div>
            <h3>{item.customer}</h3>
            <p>
              {item.phone}
              <br />
              {item.email}
            </p>
          </div>
          <button
            onClick={() => {
              window.location.href = `tel:${item.phone.replace(/[^\d+]/g, "")}`
            }}
          >
            Call
          </button>
        </section>
        <section className="drawer-section">
          <h4>Appointment request</h4>
          <dl>
            <div>
              <dt>Service</dt>
              <dd>{item.service}</dd>
            </div>
            <div>
              <dt>Preferred date</dt>
              <dd>{item.date}</dd>
            </div>
            <div>
              <dt>Preferred time</dt>
              <dd>{item.time} WAT</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>{item.source}</dd>
            </div>
            <div>
              <dt>Assigned staff</dt>
              <dd>Unassigned</dd>
            </div>
          </dl>
        </section>
        <section className="drawer-section">
          <h4>Administrative activity</h4>
          <div className="timeline">
            <i />
            <div>
              <strong>Booking request received</strong>
              <p>
                Created through {item.source}
                {created && ` · ${created}`}
              </p>
            </div>
          </div>
        </section>
        <div className="drawer-actions">
          {actions
            .filter(({ status }) => status !== item.status)
            .map(({ status, label, className }) => (
              <button
                key={status}
                className={className}
                onClick={() => onAction(status)}
              >
                {label}
              </button>
            ))}
        </div>
        <p className="privacy-note">
          Contact details should be available only to authorized staff.
        </p>
      </aside>
    </div>
  )
}
