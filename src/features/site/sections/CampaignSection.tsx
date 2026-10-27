import { campaign, useCampaignPhase } from "@/features/december/campaign"
import Arrow from "../components/Arrow"
import { heroImage } from "../data"

const statusLabels = {
  upcoming: "Reservations open",
  live: "Live now",
  ended: "Offer ended",
}

export default function CampaignSection({
  onReserve,
  onBook,
  onOpenFaq,
}: {
  onReserve: () => void
  onBook: () => void
  onOpenFaq: () => void
}) {
  const phase = useCampaignPhase()
  const ended = phase === "ended"

  return (
    <section className="section campaign" id="december">
      <div className="campaign-glow" />
      <div className="shell campaign-grid">
        <div>
          <span className="status">{statusLabels[phase]}</span>
          <p className="eyebrow">December smile event</p>
          <h2>
            Make room for a<br />
            <em>brighter December.</em>
          </h2>
          <p>
            {ended
              ? "Our December Smile Special has ended. You can still book a regular visit at any time."
              : "Reserve a preferred December date for our seasonal Scaling & Polishing special."}
          </p>
          <div className="offer-placeholder">
            <small>December 2026 offer</small>
            <strong>
              {campaign.price} {campaign.service}
            </strong>
            <span>
              Available on selected dates in December 2026. Final terms and
              availability are confirmed by the clinic.
            </span>
          </div>
          <div className="campaign-actions">
            {ended ? (
              <button className="button button-light" onClick={onBook}>
                Book an appointment <Arrow />
              </button>
            ) : (
              <button className="button button-light" onClick={onReserve}>
                Reserve December Offer <Arrow />
              </button>
            )}
            <a className="text-link light-link" href="#faq" onClick={onOpenFaq}>
              Campaign FAQ
            </a>
          </div>
        </div>
        <div className="campaign-photo">
          <img
            src={heroImage}
            alt="Smiling woman, illustrative December campaign photography"
          />
          <span>
            DEC
            <br />
            SMILE
            <br />
            EVENT
          </span>
        </div>
      </div>
    </section>
  )
}
