import { useState } from "react"
import PageHead from "../components/PageHead"
import StatusPill from "../components/StatusPill"
import type { Appointment } from "../types"
import { initials } from "../utils"

export default function CustomersPage({
  appointments,
}: {
  appointments: Appointment[]
}) {
  const [search, setSearch] = useState("")
  // One row per person (matched on phone number); records are newest first,
  // so the first record seen is the latest activity.
  type Row = {
    latest: Appointment
    count: number
  }
  const customers = new Map<string, Row>()
  for (const item of appointments) {
    const key = item.phone.replace(/\D/g, "") || item.customer
    const entry = customers.get(key)
    if (entry) entry.count += 1
    else customers.set(key, { latest: item, count: 1 })
  }
  const query = search.trim().toLowerCase()
  const rows = [...customers.values()].filter(({ latest }) =>
    `${latest.customer} ${latest.phone} ${latest.email}`
      .toLowerCase()
      .includes(query),
  )
  return (
    <>
      <PageHead title="Customers" action="Add customer">
        Administrative contact directory — not a clinical record system.
      </PageHead>
      <div className="table-tools">
        <label>
          ⌕
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone or email…"
          />
        </label>
        <div>
          <button>Export permitted data ↓</button>
        </div>
      </div>
      <div className="dashboard-card simple-table">
        <div className="simple-row header">
          <span>Customer</span>
          <span>Contact</span>
          <span>Appointments</span>
          <span>Last activity</span>
          <span>Status</span>
        </div>
        {rows.map(({ latest: a, count }) => (
          <div className="simple-row" key={a.phone + a.customer}>
            <span className="customer-cell">
              <i>{initials(a.customer)}</i>
              <b>{a.customer}</b>
            </span>
            <span>
              {a.phone}
              <small>{a.email}</small>
            </span>
            <span>{count}</span>
            <span>{a.date}</span>
            <span>
              <StatusPill status={a.status} />
            </span>
          </div>
        ))}
        {!rows.length && (
          <div className="empty-table">
            <span>⌕</span>
            <strong>No matching customers</strong>
            <p>Try a different name, phone number or email.</p>
          </div>
        )}
      </div>
    </>
  )
}
