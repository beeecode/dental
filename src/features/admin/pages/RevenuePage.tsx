import PageHead from "../components/PageHead"

const rows = [
  ["LDS-24115", "Kemi Adeyemi", "Veneers Consultation", "₦160,000", "Paid"],
  ["LDS-24110", "Bola Sanni", "Scaling & Polishing", "₦10,000", "Paid"],
  ["LDS-24108", "Ngozi Umeh", "Dental Crowns", "₦85,000", "Partially Paid"],
  ["LDS-24103", "Sade Williams", "Teeth Whitening", "₦45,000", "Unpaid"],
]

export default function RevenuePage() {
  return (
    <>
      <PageHead title="Revenue Records" action="Record payment">
        Lightweight operational records — not an accounting or billing system.
      </PageHead>
      <div className="revenue-metrics">
        <article>
          <span>Total recorded payments</span>
          <strong>₦420,000</strong>
          <small>Sample data · December</small>
        </article>
        <article>
          <span>Outstanding balances</span>
          <strong>₦120,000</strong>
          <small>Entered records only</small>
        </article>
        <article>
          <span>Campaign revenue</span>
          <strong>₦180,000</strong>
          <small>Attributed records</small>
        </article>
      </div>
      <div className="dashboard-card simple-table">
        <div className="simple-row revenue-row header">
          <span>Reference</span>
          <span>Customer</span>
          <span>Service</span>
          <span>Amount received</span>
          <span>Status</span>
        </div>
        {rows.map((r) => (
          <div className="simple-row revenue-row" key={r[0]}>
            {r.map((c, i) => (
              <span key={c}>
                {i === 4 ? <b className="payment-status">{c}</b> : c}
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
