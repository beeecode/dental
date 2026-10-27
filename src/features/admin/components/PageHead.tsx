import { DEMO_RANGE } from "../data"

export default function PageHead({
  title,
  children,
  action,
}: {
  title: string
  children: string
  action?: string
}) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
      <div className="page-head-actions">
        <button className="date-button">{DEMO_RANGE}⌄</button>
        {action && <button className="ad-primary">＋ {action}</button>}
      </div>
    </div>
  )
}
