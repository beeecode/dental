export default function MiniChart({
  values,
  color = "#3568d4",
}: {
  values: readonly number[]
  color?: string
}) {
  const points = values
    .map((v, i) => `${(i / (values.length - 1)) * 100},${45 - v}`)
    .join(" ")
  return (
    <svg
      className="mini-chart"
      viewBox="0 0 100 48"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
