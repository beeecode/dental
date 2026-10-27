import { type RefObject, useEffect, useRef } from "react"

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Open dialogs, top-most last. Only the top one reacts to keys.
const openDialogs: HTMLElement[] = []

/**
 * Modal behaviour for an overlay: locks page scroll, moves focus inside
 * (to `[data-autofocus]`, else the container), keeps Tab within it, closes on
 * Escape, and returns focus to the trigger when it closes.
 */
export function useDialog(
  ref: RefObject<HTMLElement | null>,
  {
    open = true,
    onClose,
  }: {
    open?: boolean
    onClose: () => void
  },
) {
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    const node = ref.current
    if (!open || !node) return
    const trigger = document.activeElement as HTMLElement | null
    openDialogs.push(node)
    document.body.style.overflow = "hidden"
    ;(node.querySelector<HTMLElement>("[data-autofocus]") ?? node).focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (openDialogs[openDialogs.length - 1] !== node) return
      if (event.key === "Escape") {
        onCloseRef.current()
        return
      }
      if (event.key !== "Tab") return
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (!node.contains(active) || active === node) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
      } else if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      openDialogs.splice(openDialogs.indexOf(node), 1)
      if (!openDialogs.length) document.body.style.overflow = ""
      trigger?.focus?.()
    }
  }, [open, ref])
}
