import { useEffect, useState } from "react"
import { campaign, getCampaignPhase } from "./campaign"

const pad = (value: number) => String(value).padStart(2, "0")

export default function DecemberCountdown({
  onReserve,
}: {
  onReserve: () => void
}) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const phase = getCampaignPhase(now)
  if (phase === "ended") return null

  const target = phase === "upcoming" ? campaign.start : campaign.end
  const remaining = Math.max(0, target - now)
  const days = Math.floor(remaining / 86400000)
  const hours = Math.floor((remaining / 3600000) % 24)
  const minutes = Math.floor((remaining / 60000) % 60)
  const label = phase === "upcoming" ? "Starts in" : "Offer ends in"

  return (
    <div className="hero-promo-card">
      <div className="promo-card-head">
        <span>December Smile Special</span>
        <i>{label}</i>
      </div>
      <div
        className="promo-countdown"
        role="timer"
        aria-label={`${label} ${days} days, ${hours} hours and ${minutes} minutes`}
      >
        <strong>
          {pad(days)}
          <small>Days</small>
        </strong>
        <b>:</b>
        <strong>
          {pad(hours)}
          <small>Hours</small>
        </strong>
        <b>:</b>
        <strong>
          {pad(minutes)}
          <small>Mins</small>
        </strong>
      </div>
      <button onClick={onReserve}>
        Reserve December Offer <span>↗</span>
      </button>
      <small>
        {campaign.price} {campaign.service} · December 2026
      </small>
    </div>
  )
}
