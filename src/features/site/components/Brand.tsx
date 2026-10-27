export default function Brand() {
  return (
    <button
      className="brand"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Luxuriate Dental Solutions home"
    >
      <span className="brand-mark">L</span>
      <span>
        <strong>Luxuriate</strong>
        <small>Dental Solutions</small>
      </span>
    </button>
  )
}
