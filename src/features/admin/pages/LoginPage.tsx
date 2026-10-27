import { type FormEvent, useState } from "react"
import AdminBrand from "../components/AdminBrand"

// Demo-only sign-in: any credentials are accepted after a short delay.
export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    window.setTimeout(() => {
      setLoading(false)
      onLogin()
    }, 700)
  }
  return (
    <div className="admin-login">
      <section className="login-story">
        <AdminBrand />
        <div className="login-orbit" />
        <div className="login-orbit orbit-two" />
        <div className="login-message">
          <span>Private clinic workspace</span>
          <h1>Exceptional care deserves exceptional organization.</h1>
          <p>
            A calm, connected view of appointments, customers, campaigns, and
            daily operations.
          </p>
        </div>
        <div className="login-caption">
          <i /> Secure admin concept · Demo environment
        </div>
      </section>
      <section className="login-form-wrap">
        <div className="demo-ribbon">DEMO — Sample Data</div>
        <form className="login-form" onSubmit={submit}>
          <p className="ad-eyebrow">Welcome back</p>
          <h2>Sign in to your workspace</h2>
          <p>
            Use any demo email and password to preview the interface. This is
            not production authentication.
          </p>
          <label>
            Email address
            <input
              type="email"
              required
              autoComplete="username"
              defaultValue="owner@luxuriate.demo"
            />
          </label>
          <label>
            Password
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                defaultValue="prototype-only"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-pressed={showPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <button
              type="button"
              onClick={() =>
                setError(
                  "Password reset requires a connected authentication backend.",
                )
              }
            >
              Forgot password?
            </button>
          </div>
          {error && <div className="login-error">{error}</div>}
          <button className="ad-primary login-button" disabled={loading}>
            {loading ? (
              <>
                <i className="spinner" /> Checking demo session…
              </>
            ) : (
              "Sign in to demo →"
            )}
          </button>
          <a className="back-public" href="/">
            ← Return to public website
          </a>
        </form>
      </section>
    </div>
  )
}
