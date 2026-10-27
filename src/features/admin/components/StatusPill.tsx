import type { Status } from "../types"

export default function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={`ad-status status-${status.toLowerCase().replaceAll(" ", "-")}`}
    >
      <i />
      {status}
    </span>
  )
}
