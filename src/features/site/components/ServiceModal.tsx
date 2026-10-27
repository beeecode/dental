import { useRef } from "react"
import { useDialog } from "@/hooks/useDialog"
import type { Service } from "../data"
import Arrow from "./Arrow"

type ServiceModalProps = {
  service: Service
  onClose: () => void
  onRequestConsultation: (service: Service) => void
}

export default function ServiceModal({
  service,
  onClose,
  onRequestConsultation,
}: ServiceModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  useDialog(dialogRef, { onClose })

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="service-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${service.title} details`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close service details"
        >
          ×
        </button>
        <div className="service-modal-image">
          <img src={service.image} alt="" />
          <span>{service.number}</span>
        </div>
        <div className="service-modal-copy">
          <p className="eyebrow">Service overview</p>
          <h2>{service.title}</h2>
          <p>
            {service.text} A consultation helps determine whether an option is
            suitable for your individual needs.
          </p>
          <div className="considerations">
            <strong>What a consultation may involve</strong>
            <span>Conversation about your concern</span>
            <span>General assessment by a dental professional</span>
            <span>Discussion of appropriate next steps</span>
          </div>
          <button
            className="button button-primary"
            onClick={() => onRequestConsultation(service)}
          >
            Request consultation <Arrow />
          </button>
        </div>
      </div>
    </div>
  )
}
