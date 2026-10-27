import type { Appointment } from "./types"

// The demo workspace is a snapshot of one day in the December campaign.
export const DEMO_TODAY = new Date(2026, 11, 15)
export const DEMO_RANGE = "Dec 1 — Dec 31, 2026"

// Fictional sample records for the demo workspace.
export const baseAppointments: Appointment[] = [
  {
    id: "LDS-24118",
    customer: "Amara Okafor",
    phone: "0800 000 0142",
    email: "amara@example.test",
    service: "Scaling & Polishing",
    date: "18 Dec 2026",
    time: "10:30",
    source: "December campaign",
    status: "Pending",
  },
  {
    id: "LDS-24117",
    customer: "Tunde Afolayan",
    phone: "0800 000 2711",
    email: "tunde@example.test",
    service: "General Consultation",
    date: "18 Dec 2026",
    time: "12:00",
    source: "Website",
    status: "Confirmed",
  },
  {
    id: "LDS-24116",
    customer: "Zainab Bello",
    phone: "0800 000 8871",
    email: "zainab@example.test",
    service: "Teeth Whitening",
    date: "19 Dec 2026",
    time: "09:00",
    source: "TikTok / UTM",
    status: "Confirmed",
  },
  {
    id: "LDS-24115",
    customer: "Kemi Adeyemi",
    phone: "0800 000 4165",
    email: "kemi@example.test",
    service: "Veneers Consultation",
    date: "12 Dec 2026",
    time: "14:30",
    source: "Website",
    status: "Completed",
  },
  {
    id: "LDS-24114",
    customer: "Chinedu Eze",
    phone: "0800 000 9210",
    email: "chinedu@example.test",
    service: "Dental Crown Consultation",
    date: "20 Dec 2026",
    time: "10:30",
    source: "Referral",
    status: "Rescheduled",
  },
  {
    id: "LDS-24113",
    customer: "Funmilayo Ajayi",
    phone: "0800 000 6374",
    email: "funmi@example.test",
    service: "Scaling & Polishing",
    date: "16 Dec 2026",
    time: "12:00",
    source: "December campaign",
    status: "Cancelled",
  },
  {
    id: "LDS-24112",
    customer: "Damilola Yusuf",
    phone: "0800 000 1288",
    email: "dami@example.test",
    service: "Teeth Replacement",
    date: "21 Dec 2026",
    time: "09:00",
    source: "Website",
    status: "Pending",
  },
  {
    id: "LDS-24111",
    customer: "Ifeanyi Nwosu",
    phone: "0800 000 3641",
    email: "ifeanyi@example.test",
    service: "General Consultation",
    date: "14 Dec 2026",
    time: "14:30",
    source: "Walk-in",
    status: "No-show",
  },
]

export const navGroups: [group: string, pages: string[]][] = [
  ["Main", ["Overview", "Appointments", "Calendar", "Customers", "Services"]],
  ["Marketing", ["December Campaign", "Campaign Analytics", "Website Content"]],
  ["Business", ["Revenue Records", "Reports & Analytics"]],
  ["System", ["Notifications", "Team & Permissions", "Settings"]],
]

export const navIcons: Record<string, string> = {
  Overview: "⌂",
  Appointments: "◫",
  Calendar: "□",
  Customers: "♧",
  Services: "◇",
  "December Campaign": "✦",
  "Campaign Analytics": "↗",
  "Website Content": "▤",
  "Revenue Records": "₦",
  "Reports & Analytics": "⌁",
  Notifications: "○",
  "Team & Permissions": "♙",
  Settings: "⚙",
}

export const serviceData: [name: string, requests: number][] = [
  ["Scaling & Polishing", 38],
  ["General Consultation", 31],
  ["Teeth Whitening", 22],
  ["Dental Crowns", 16],
  ["Veneers Consultation", 12],
  ["Teeth Replacement", 9],
]
