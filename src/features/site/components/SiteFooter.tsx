import { navLinks } from "../data"
import Brand from "./Brand"

export default function SiteFooter({ onBook }: { onBook: () => void }) {
  return (
    <footer>
      <div className="shell footer-grid">
        <div>
          <Brand />
          <p>Where healthy smiles meet exceptional care.</p>
        </div>
        <div>
          <strong>Explore</strong>
          {navLinks
            .filter(({ id }) => id !== "contact")
            .map(({ id, label }) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
        </div>
        <div>
          <strong>Connect</strong>
          <a href="#contact">Osogbo, Osun State</a>
          <a
            href="https://www.tiktok.com/@luxuriate_dental"
            target="_blank"
            rel="noreferrer"
          >
            TikTok @luxuriate_dental
          </a>
          <button onClick={onBook}>Book appointment</button>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>
          © {new Date().getFullYear()} Luxuriate Dental Solutions. All rights
          reserved.
        </span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}
