export default function AdminBrand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="ad-brand">
      <span>L</span>
      {!compact && (
        <div>
          <strong>Luxuriate</strong>
          <small>Dental Solutions</small>
        </div>
      )}
    </div>
  )
}
