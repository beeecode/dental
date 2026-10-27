import { useRef } from "react"
import { useDialog } from "@/hooks/useDialog"
import type { Appointment, Status } from "../types"

export default function ConfirmDialog({
  item,
  status,
  onCancel,
  onConfirm,
}: {
  item: Appointment
  status: Status
  onCancel: () => void
  onConfirm: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  useDialog(dialogRef, { onClose: onCancel })

  return (
    <div className="ad-modal-bg">
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <span aria-hidden="true">!</span>
        <h3 id="confirm-title">Confirm status change</h3>
        <p>
          Mark {item.id} as {status}? This consequential action will be included
          in the administrative history.
        </p>
        <div>
          <button onClick={onCancel} data-autofocus>
            Go back
          </button>
          <button className="danger" onClick={onConfirm}>
            Confirm change
          </button>
        </div>
      </div>
    </div>
  )
}
