import PageHead from "../components/PageHead"
import TrendChart from "../components/TrendChart"
import { serviceData } from "../data"

export default function AnalyticsPage({
  campaignOnly = false,
}: {
  campaignOnly?: boolean
}) {
  return (
    <>
      <PageHead
        title={campaignOnly ? "Campaign Analytics" : "Reports & Analytics"}
      >
        Fictional metrics for presentation. Definitions and source notes remain
        visible.
      </PageHead>
      <div className="report-grid">
        {[
          "Booking performance",
          "Service performance",
          campaignOnly ? "Campaign conversion" : "Customer trends",
          "Recorded revenue",
        ].map((title, i) => (
          <article className="dashboard-card report-card" key={title}>
            <div className="card-head">
              <div>
                <h2>{title}</h2>
                <p>
                  {i === 3
                    ? "Entered payments only"
                    : "Sample records · 30 days"}
                </p>
              </div>
              <button>•••</button>
            </div>
            {i === 1 ? (
              <div className="service-bars">
                {serviceData.slice(0, 4).map(([n, v]) => (
                  <div key={n}>
                    <span>{n}</span>
                    <i>
                      <b style={{ width: `${v * 2}%` }} />
                    </i>
                    <strong>{v}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <TrendChart />
            )}
          </article>
        ))}
      </div>
    </>
  )
}
