// Clinic WhatsApp number in international format, without "+".
// TODO: confirm with the clinic before launch.
export const CLINIC_WHATSAPP = "2349013462685"

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${CLINIC_WHATSAPP}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
