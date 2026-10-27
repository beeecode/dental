import PageHead from "../components/PageHead"
import type { ShowToast } from "../types"

const events = [
  [
    "New appointment request",
    "Amara Okafor requested Scaling & Polishing.",
    "2 minutes ago",
  ],
  [
    "Appointment confirmed",
    "Tunde Afolayan’s appointment was confirmed.",
    "42 minutes ago",
  ],
  [
    "Campaign draft updated",
    "December campaign content was edited.",
    "Yesterday",
  ],
  [
    "Upcoming appointment",
    "Zainab Bello is scheduled for 19 Dec at 09:00.",
    "Yesterday",
  ],
]

export default function NotificationsPage({
  setToast,
}: {
  setToast: ShowToast
}) {
  return (
    <>
      <PageHead title="Notifications">
        Stay on top of operational activity requiring attention.
      </PageHead>
      <div className="notification-head">
        <div className="filter-tabs">
          <button className="active">All</button>
          <button>Unread</button>
          <button>Appointments</button>
          <button>Campaigns</button>
        </div>
        <button onClick={() => setToast("All notifications marked as read")}>
          Mark all as read
        </button>
      </div>
      <div className="dashboard-card notification-list">
        {events.map((e, i) => (
          <article className={i < 2 ? "unread" : ""} key={e[0]}>
            <i>{i < 2 ? "" : "✓"}</i>
            <div>
              <strong>{e[0]}</strong>
              <p>{e[1]}</p>
              <small>{e[2]}</small>
            </div>
            <button>View →</button>
          </article>
        ))}
      </div>
    </>
  )
}
