import { useEffect, useRef, useState } from "react"
import { useDialog } from "@/hooks/useDialog"
import { navLinks } from "../data"
import Arrow from "./Arrow"
import Brand from "./Brand"

type SiteHeaderProps = {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  onBook: () => void
}

export default function SiteHeader({
  menuOpen,
  setMenuOpen,
  onBook,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  useDialog(menuRef, { open: menuOpen, onClose: () => setMenuOpen(false) })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header className={`nav-wrap ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="nav shell" aria-label="Primary navigation">
          <Brand />
          <div className="nav-links">
            {navLinks.map(({ id, label }) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </div>
          <button className="button button-primary nav-cta" onClick={onBook}>
            Book appointment <Arrow />
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        inert={!menuOpen}
      >
        <div className="mobile-menu-top">
          <Brand />
          <button
            className="menu-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
        <div className="mobile-menu-links">
          {navLinks.map(({ id, label }, index) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>
              {label}
            </a>
          ))}
        </div>
        <button className="button button-light" onClick={onBook}>
          Book an appointment <Arrow />
        </button>
      </div>
    </>
  )
}
