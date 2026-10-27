import AdminBrand from "../components/AdminBrand"
import PageHead from "../components/PageHead"
import type { ShowToast } from "../types"

export default function SettingsPage({ setToast }: { setToast: ShowToast }) {
  return (
    <>
      <PageHead title="Settings">
        Configure clinic identity, booking preferences, notifications, and
        security.
      </PageHead>
      <div className="settings-layout">
        <aside>
          {[
            "Clinic profile",
            "Booking settings",
            "Team",
            "Notifications",
            "Security",
          ].map((x, i) => (
            <button className={i === 0 ? "active" : ""} key={x}>
              {x}
            </button>
          ))}
        </aside>
        <section className="dashboard-card settings-form">
          <div className="card-head">
            <div>
              <h2>Clinic profile</h2>
              <p>Public-facing business information</p>
            </div>
          </div>
          <div className="logo-upload">
            <AdminBrand />
            <button>Replace official logo</button>
          </div>
          <label>
            Business name
            <input defaultValue="Luxuriate Dental Solutions" />
          </label>
          <label>
            Verified address
            <input placeholder="Awaiting clinic verification" />
          </label>
          <div className="field-pair">
            <label>
              Phone number
              <input placeholder="Awaiting verification" />
            </label>
            <label>
              Public email
              <input placeholder="Awaiting verification" />
            </label>
          </div>
          <label>
            Business hours
            <textarea placeholder="Add confirmed opening hours" />
          </label>
          <div className="editor-actions">
            <button
              className="ad-primary"
              onClick={() => setToast("Demo mode — changes aren’t saved")}
            >
              Save changes
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
