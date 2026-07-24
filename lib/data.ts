import {
  MessagesSquare, Lock, MousePointer2, CheckCheck, Users, ShieldCheck,
  History, Paperclip, MonitorSmartphone, Moon,
} from "lucide-react"

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const

export const STATS = [
  { value: 100_000, suffix: "K+", divisor: 1000, label: "Messages Daily" },
  { value: 10_000, suffix: "K+", divisor: 1000, label: "Rooms Created" },
  { value: 99.99, suffix: "%", decimals: 2, label: "Uptime SLA" },
  { value: 50, suffix: "+", label: "Countries" },
]

export const FEATURES = [
  { icon: MessagesSquare, title: "Room Chat", desc: "Spin up unlimited rooms for teams, projects, or communities with granular member controls." },
  { icon: Lock, title: "Private Chat", desc: "One-to-one conversations protected by per-session ephemeral keys and forward secrecy." },
  { icon: MousePointer2, title: "Typing Indicators", desc: "See exactly who is composing a reply with debounced, low-bandwidth presence signals." },
  { icon: CheckCheck, title: "Read Receipts", desc: "Per-message delivered and seen states with opt-in privacy controls at the workspace level." },
  { icon: Users, title: "Online Users", desc: "Real-time presence roster with idle detection, custom statuses, and time-zone hints." },
  { icon: ShieldCheck, title: "Secure Authentication", desc: "JWT + refresh rotation, email verification, and optional SSO with SAML and OIDC." },
  { icon: History, title: "Message History", desc: "Infinite scrollback with lightning-fast search across rooms, DMs, files, and threads." },
  { icon: Paperclip, title: "File Sharing", desc: "Drag-and-drop uploads up to 5 GB with virus scanning and signed preview URLs." },
  { icon: MonitorSmartphone, title: "Responsive Design", desc: "Pixel-perfect across desktop, tablet, and mobile with native gestures and offline queueing." },
  { icon: Moon, title: "Dark Mode", desc: "An OLED-friendly interface tuned for long sessions with reduced motion and glare." },
]

export const STEPS = [
  { n: "01", title: "Create Account", desc: "Sign up with email or SSO in under 30 seconds — no credit card required." },
  { n: "02", title: "Join a Room", desc: "Discover public rooms or accept an invite link to a private workspace." },
  { n: "03", title: "Start Messaging", desc: "Send messages, files, and reactions with sub-100ms delivery worldwide." },
  { n: "04", title: "Collaborate Live", desc: "Presence, typing, and read receipts keep every conversation in sync." },
]

export const SECURITY = [
  { title: "JWT Authentication", desc: "Short-lived access tokens signed with EdDSA and rotated on every request." },
  { title: "Encrypted Passwords", desc: "Argon2id hashing with peppered salts stored in an isolated key vault." },
  { title: "Email Verification", desc: "Signed magic links with single-use tokens and configurable expiry windows." },
  { title: "Secure Sessions", desc: "Device fingerprinting with instant remote sign-out from any active session." },
  { title: "Protected Routes", desc: "Role-based access enforced at the API edge with policy-as-code guards." },
  { title: "Refresh Tokens", desc: "Rotating refresh tokens with reuse-detection and automatic revocation." },
  { title: "MongoDB Storage", desc: "Field-level encryption at rest with tenant-scoped keys and audit logs." },
  { title: "Realtime Socket Auth", desc: "Every WebSocket frame is authenticated and rate-limited per connection." },
]

export const TESTIMONIALS = [
  { name: "Priya Natarajan", role: "Engineering Lead, Northwind", quote: "Ripple replaced three internal tools in a week. Our on-call chatter finally lives in one auditable place.", rating: 5, initials: "PN" },
  { name: "Marcus Weber", role: "CTO, Halcyon Labs", quote: "The presence and typing signals are the smoothest we have shipped. Latency is genuinely imperceptible.", rating: 5, initials: "MW" },
  { name: "Amelia Souza", role: "Head of People, Fernway", quote: "Onboarding a new hire into the right rooms takes seconds. Read receipts are a game changer for async work.", rating: 5, initials: "AS" },
  { name: "Ken Okafor", role: "Security Architect, Lumen", quote: "Signed sockets, rotating refresh tokens, per-tenant keys — our compliance team approved in one review.", rating: 5, initials: "KO" },
]

export const PLANS = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever",
    tag: "For small teams getting started",
    highlight: false,
    features: ["Up to 10 members", "Unlimited public rooms", "7-day message history", "Community support"],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "$8",
    cadence: "per user / month",
    tag: "For growing product teams",
    highlight: true,
    features: ["Unlimited members", "Private rooms & guests", "Unlimited history & search", "File sharing up to 5 GB", "SSO (Google, Microsoft)", "Priority support"],
    cta: "Start 14-day trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual",
    tag: "For regulated organizations",
    highlight: false,
    features: ["SAML SSO & SCIM", "Field-level encryption", "Dedicated region", "99.99% uptime SLA", "Audit log streaming", "Named CSM"],
    cta: "Talk to sales",
  },
]

export const FAQS = [
  { q: "How does Ripple keep my conversations secure?", a: "Every message travels over TLS 1.3 and is signed at the socket layer. Data at rest is encrypted with per-tenant keys, and passwords are hashed with Argon2id. Optional end-to-end encryption is available on Pro and Enterprise." },
  { q: "Can I self-host Ripple Chat?", a: "Yes — Enterprise customers get a Docker-based self-hosted distribution with a Terraform module, along with a managed control plane for updates and observability." },
  { q: "What is included in the free Starter plan?", a: "Up to 10 members, unlimited public rooms, and 7 days of message history. No credit card is required and you can upgrade at any time." },
  { q: "Do you support integrations?", a: "Ripple ships with native integrations for GitHub, Linear, Jira, Notion, PagerDuty, and Zapier, plus a public webhook API and TypeScript SDK." },
  { q: "How fast is message delivery?", a: "Median end-to-end delivery is under 90 ms globally thanks to regional edge relays and a persistent WebSocket mesh with automatic failover." },
  { q: "Is there a mobile app?", a: "Yes. Native iOS and Android apps are generally available, with push notifications, offline queueing, and biometric unlock." },
]
