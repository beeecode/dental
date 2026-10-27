export default function AdminTopbar({
  search,
  onSearch,
  onOpenMobileNav,
  onOpenNotifications,
}: {
  search: string
  onSearch: (query: string) => void
  onOpenMobileNav: () => void
  onOpenNotifications: () => void
}) {
  return (
    <header className="admin-topbar">
      <button
        className="mobile-nav-button"
        onClick={onOpenMobileNav}
        aria-label="Open navigation"
      >
        ☰
      </button>
      <div className="top-search">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search appointments…"
          aria-label="Search appointments"
        />
      </div>
      <div className="top-actions">
        <button onClick={onOpenNotifications} aria-label="Notifications">
          ◌<i />
        </button>
        <div>
          <span>AO</span>
          <strong>Ada Okoye</strong>
        </div>
      </div>
    </header>
  )
}
