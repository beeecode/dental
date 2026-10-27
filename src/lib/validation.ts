export type ContactDetails = {
  name: string
  phone: string
  email: string
}

export const PHONE_PLACEHOLDER = "0801 234 5678"

/** Shared by every patient-facing form. Returns an error message, or "". */
export function validateContact({ name, phone, email }: ContactDetails) {
  if (name.trim().length < 3) return "Please enter your full name."
  if (!/^(0\d{10}|234\d{10})$/.test(phone.replace(/\D/g, "")))
    return `Enter a valid Nigerian phone number, for example ${PHONE_PLACEHOLDER}.`
  if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    return "Enter a valid email address, or leave it blank."
  return ""
}
