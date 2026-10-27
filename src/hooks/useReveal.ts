import { useEffect } from "react"

export function useReveal(dependency?: unknown) {
  useEffect(() => {
    const selector = [
      ".section-heading",
      ".section-copy",
      ".editorial-images",
      ".service-card",
      ".step",
      ".comparison",
      ".campaign-grid > div",
      ".testimonial-grid > div",
      ".faq",
      ".contact-card > div",
      ".metric-card",
      ".dashboard-card",
      ".service-admin-grid > article",
      ".team-grid > article",
      ".revenue-metrics > article",
    ].join(",")
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(selector),
    )
    elements.forEach((element, index) => {
      element.classList.add("motion-reveal")
      element.style.setProperty("--reveal-delay", `${(index % 6) * 55}ms`)
    })
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"))
      return
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [dependency])
}
