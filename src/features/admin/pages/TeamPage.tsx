import PageHead from "../components/PageHead"

const team = [
  ["Ada Okoye", "Owner / Super Admin", "Full access", "AO"],
  ["Bisi Lawal", "Reception / Staff", "Appointments & contacts", "BL"],
  ["Nneka Obi", "Marketing Manager", "Campaigns & website content", "NO"],
]

export default function TeamPage() {
  return (
    <>
      <PageHead title="Team & Permissions" action="Invite staff">
        Manage access using the principle of least privilege.
      </PageHead>
      <div className="role-notice">
        <span>i</span>
        <p>
          <strong>Demo permissions preview</strong>Backend-enforced
          authorization requires the cancelled Payload setup. These controls are
          illustrative only.
        </p>
      </div>
      <div className="team-grid">
        {team.map((t) => (
          <article className="dashboard-card" key={t[0]}>
            <div className="team-avatar">{t[3]}</div>
            <h3>{t[0]}</h3>
            <p>{t[1]}</p>
            <span>{t[2]}</span>
            <button>Review permissions →</button>
          </article>
        ))}
      </div>
    </>
  )
}
