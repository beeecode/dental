import AdminApp from "@/features/admin/AdminApp"
import HomePage from "@/features/site/HomePage"

// Minimal path-based routing: /admin* serves the demo admin portal,
// everything else serves the public website.
export default function App() {
  return window.location.pathname.startsWith("/admin") ? (
    <AdminApp />
  ) : (
    <HomePage />
  )
}
