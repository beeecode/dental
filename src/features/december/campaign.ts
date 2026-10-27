import { useEffect, useState } from "react"

// Single source of truth for the December promotion. Everything the patient
// sees about the offer (hero card, campaign section, FAQ, reservation) reads
// from here, so dates and price can't drift apart.
export const campaign = {
  name: "December Smile Special 2026",
  service: "Scaling & Polishing",
  price: "₦10,000",
  year: 2026,
  month: 11, // December (0-based)
  start: new Date("2026-12-01T00:00:00+01:00").getTime(),
  end: new Date("2027-01-01T00:00:00+01:00").getTime(),
  /** Days in December with promotional slots. */
  availableDays: [4, 5, 7, 9, 11, 12, 14, 16, 18, 19, 21, 23],
}

export type CampaignPhase = "upcoming" | "live" | "ended"

export function getCampaignPhase(now: number): CampaignPhase {
  if (now < campaign.start) return "upcoming"
  if (now < campaign.end) return "live"
  return "ended"
}

/** Current phase, re-checked every minute. */
export function useCampaignPhase() {
  const [phase, setPhase] = useState(() => getCampaignPhase(Date.now()))
  useEffect(() => {
    const timer = window.setInterval(
      () => setPhase(getCampaignPhase(Date.now())),
      60_000,
    )
    return () => window.clearInterval(timer)
  }, [])
  return phase
}
