import { useEffect, useState } from "react"
import { useReveal } from "@/hooks/useReveal"
import {
  readStatusOverrides,
  readStoredBookings,
  saveStatusOverride,
} from "@/lib/bookings"
import AdminSidebar from "./components/AdminSidebar"
import AdminTopbar from "./components/AdminTopbar"
import ConfirmDialog from "./components/ConfirmDialog"
import DetailDrawer from "./components/DetailDrawer"
import { baseAppointments } from "./data"
import AnalyticsPage from "./pages/AnalyticsPage"
import AppointmentsPage from "./pages/AppointmentsPage"
import CalendarPage from "./pages/CalendarPage"
import CampaignPage from "./pages/CampaignPage"
import ContentPage from "./pages/ContentPage"
import CustomersPage from "./pages/CustomersPage"
import LoginPage from "./pages/LoginPage"
import NotificationsPage from "./pages/NotificationsPage"
import OverviewPage from "./pages/OverviewPage"
import RevenuePage from "./pages/RevenuePage"
import ServicesPage from "./pages/ServicesPage"
import SettingsPage from "./pages/SettingsPage"
import TeamPage from "./pages/TeamPage"
import type { Appointment, Status } from "./types"

const SESSION_KEY = "luxuriate-demo-session"

function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1"
  } catch {
    return false
  }
}

function writeSession(active: boolean) {
  try {
    if (active) sessionStorage.setItem(SESSION_KEY, "1")
    else sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // Session storage unavailable; sign-in lasts until reload.
  }
}

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(readSession)
  const [page, setPage] = useState("Overview")
  const [collapsed, setCollapsed] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  // Requests submitted from the public site in this browser are listed first,
  // with any status changes made here re-applied.
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const overrides = readStatusOverrides()
    return [...readStoredBookings<Appointment>(), ...baseAppointments].map(
      (item) =>
        overrides[item.id]
          ? { ...item, status: overrides[item.id] as Status }
          : item,
    )
  })
  const [selected, setSelected] = useState<Appointment | null>(null)
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [toast, setToast] = useState("")
  const [confirmAction, setConfirmAction] = useState<{
    status: Status
    item: Appointment
  } | null>(null)
  useReveal(loggedIn ? page : "login")

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(""), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const updateStatus = (item: Appointment, status: Status) => {
    setAppointments((items) =>
      items.map((entry) =>
        entry.id === item.id ? { ...entry, status } : entry,
      ),
    )
    setSelected((current) =>
      current?.id === item.id ? { ...current, status } : current,
    )
    saveStatusOverride(item.id, status)
    setToast(`${item.id} updated to ${status}`)
    setConfirmAction(null)
  }

  const signIn = (active: boolean) => {
    writeSession(active)
    setLoggedIn(active)
  }

  if (!loggedIn) return <LoginPage onLogin={() => signIn(true)} />

  const query = search.trim().toLowerCase()

  const filtered = appointments.filter(
    (item) =>
      (filter === "All" || item.status === filter) &&
      `${item.customer} ${item.id} ${item.service} ${item.phone}`
        .toLowerCase()
        .includes(query),
  )

  return (
    <div className={`admin-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <AdminSidebar
        page={page}
        onNavigate={(item) => {
          setPage(item)
          setMobileNav(false)
        }}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed(!collapsed)}
        mobileOpen={mobileNav}
        pendingCount={appointments.filter((a) => a.status === "Pending").length}
        onLogout={() => signIn(false)}
      />

      <div className="admin-main">
        <AdminTopbar
          search={search}
          onSearch={(value) => {
            setSearch(value)
            setPage("Appointments")
          }}
          onOpenMobileNav={() => setMobileNav(true)}
          onOpenNotifications={() => setPage("Notifications")}
        />
        <main className="admin-content">
          {page === "Overview" && (
            <OverviewPage
              appointments={appointments}
              onOpen={setSelected}
              goAppointments={() => setPage("Appointments")}
            />
          )}
          {page === "Appointments" && (
            <AppointmentsPage
              appointments={filtered}
              filter={filter}
              setFilter={setFilter}
              search={search}
              setSearch={setSearch}
              onOpen={setSelected}
            />
          )}
          {page === "Calendar" && (
            <CalendarPage appointments={appointments} onOpen={setSelected} />
          )}
          {page === "Customers" && (
            <CustomersPage appointments={appointments} />
          )}
          {page === "Services" && <ServicesPage />}
          {page === "December Campaign" && (
            <CampaignPage
              setToast={setToast}
              appointments={appointments}
              onOpen={setSelected}
            />
          )}
          {page === "Campaign Analytics" && <AnalyticsPage campaignOnly />}
          {page === "Website Content" && <ContentPage setToast={setToast} />}
          {page === "Revenue Records" && <RevenuePage />}
          {page === "Reports & Analytics" && <AnalyticsPage />}
          {page === "Notifications" && (
            <NotificationsPage setToast={setToast} />
          )}
          {page === "Team & Permissions" && <TeamPage />}
          {page === "Settings" && <SettingsPage setToast={setToast} />}
        </main>
      </div>

      {selected && (
        <DetailDrawer
          item={selected}
          onClose={() => setSelected(null)}
          onAction={(status) =>
            status === "Cancelled" || status === "No-show"
              ? setConfirmAction({ status, item: selected })
              : updateStatus(selected, status)
          }
        />
      )}
      {confirmAction && (
        <ConfirmDialog
          item={confirmAction.item}
          status={confirmAction.status}
          onCancel={() => setConfirmAction(null)}
          onConfirm={() =>
            updateStatus(confirmAction.item, confirmAction.status)
          }
        />
      )}
      {toast && (
        <div className="admin-toast">
          <span>✓</span>
          {toast}
        </div>
      )}
      {mobileNav && (
        <button
          className="nav-scrim"
          onClick={() => setMobileNav(false)}
          aria-label="Close navigation"
        />
      )}
    </div>
  )
}
