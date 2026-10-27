import { navGroups, navIcons } from "../data"
import AdminBrand from "./AdminBrand"

type AdminSidebarProps = {
  page: string
  onNavigate: (page: string) => void
  collapsed: boolean
  onToggleCollapsed: () => void
  mobileOpen: boolean
  pendingCount: number
  onLogout: () => void
}

export default function AdminSidebar({
  page,
  onNavigate,
  collapsed,
  onToggleCollapsed,
  mobileOpen,
  pendingCount,
  onLogout,
}: AdminSidebarProps) {
  return (
    <aside className={`admin-sidebar ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-top">
        <AdminBrand compact={collapsed} />
        <button onClick={onToggleCollapsed} aria-label="Collapse sidebar">
          ‹
        </button>
      </div>
      <div className="demo-label">{collapsed ? "D" : "DEMO — Sample Data"}</div>
      <nav className="admin-nav">
        {navGroups.map(([group, items]) => (
          <div className="nav-group" key={group}>
            {!collapsed && <small>{group}</small>}
            {items.map((item) => (
              <button
                className={page === item ? "active" : ""}
                key={item}
                title={collapsed ? item : ""}
                onClick={() => onNavigate(item)}
              >
                <i>{navIcons[item]}</i>
                {!collapsed && <span>{item}</span>}
                {item === "Appointments" && !collapsed && <b>{pendingCount}</b>}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="admin-profile">
        <span>AO</span>
        {!collapsed && (
          <div>
            <strong>Ada Okoye</strong>
            <small>Owner · Demo</small>
          </div>
        )}
        <button onClick={onLogout}>↪</button>
      </div>
    </aside>
  )
}
