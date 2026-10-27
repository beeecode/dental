import AppointmentTable from "../components/AppointmentTable"
import MiniChart from "../components/MiniChart"
import PageHead from "../components/PageHead"
import type { Appointment, ShowToast, Status } from "../types"

export default function CampaignPage({
  setToast,
  appointments,
  onOpen,
}: {
  setToast: ShowToast
  appointments: Appointment[]
  onOpen: (a: Appointment) => void
}) {
  const promo = appointments.filter(
    (item) => item.source === "December 2026 Promotion",
  )
  const count = (status: Status) =>
    promo.filter((item) => item.status === status).length
  return (
    <>
      <PageHead title="December Smile Campaign">
        Manage the seasonal offer and preview approved public content.
      </PageHead>
      <div className="campaign-admin-hero">
        <div>
          <span className="campaign-state">Draft · Approval required</span>
          <p className="ad-eyebrow">December smile event</p>
          <h2>
            ₦10,000
            <br />
            <em>Scaling & Polishing</em>
          </h2>
          <p>
            Price appeared in social promotional materials. Terms, eligibility,
            capacity, and dates require clinic approval before publication.
          </p>
          <div>
            <button
              className="ad-primary"
              onClick={() => setToast("Demo mode — changes aren’t saved")}
            >
              Save draft
            </button>
            <button>Open live preview ↗</button>
          </div>
        </div>
        <div className="campaign-score">
          <span>DEC</span>
          <strong>
            Smile
            <br />
            Event
          </strong>
          <small>Public preview concept</small>
        </div>
      </div>
      <div className="campaign-admin-grid">
        <article className="dashboard-card campaign-form">
          <div className="card-head">
            <div>
              <h2>Campaign details</h2>
              <p>Draft content</p>
            </div>
            <span>Not published</span>
          </div>
          <label>
            Campaign title
            <input defaultValue="December Smile Special 2026" />
          </label>
          <div className="field-pair">
            <label>
              Promotional service
              <input defaultValue="Scaling & Polishing" />
            </label>
            <label>
              Advertised price
              <input defaultValue="₦10,000" />
            </label>
          </div>
          <div className="field-pair">
            <label>
              Start date
              <input type="date" />
            </label>
            <label>
              End date
              <input type="date" />
            </label>
          </div>
          <label>
            Confirmed terms
            <textarea placeholder="Add approved terms and eligibility before publication…" />
          </label>
        </article>
        <article className="dashboard-card campaign-metrics">
          <div className="card-head">
            <div>
              <h2>Campaign performance</h2>
              <p>Fictional tracked demonstration</p>
            </div>
          </div>
          {[
            ["Promotional requests", String(promo.length)],
            ["Pending requests", String(count("Pending"))],
            ["Confirmed appointments", String(count("Confirmed"))],
            ["Completed appointments", String(count("Completed"))],
          ].map(([l, v]) => (
            <div key={l}>
              <span>{l}</span>
              <strong>{v}</strong>
            </div>
          ))}
          <MiniChart values={[3, 8, 11, 9, 19, 24, 31, 28, 38]} />
        </article>
      </div>
      <div className="dashboard-card promo-queue">
        <div className="card-head">
          <div>
            <h2>December Smile Special 2026 queue</h2>
            <p>Browser-local demonstration records</p>
          </div>
          <span>{promo.length} requests</span>
        </div>
        {promo.length ? (
          <AppointmentTable items={promo} onOpen={onOpen} />
        ) : (
          <div className="empty-table">
            <span>✦</span>
            <strong>No promotional requests yet</strong>
            <p>
              Complete the reservation journey on the public homepage to add
              one.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
