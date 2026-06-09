export const SITE = {
  name: "Caldwell Safaris",
  shortName: "Caldwell",
  tagline: "Free-range hunting · South Africa",
  url: "https://caldwellsafaris.kurokode.com",
  description:
    "A family-run, free-range hunting safari in South Africa. Plains game, big game and bow hunting — guided with honesty and respect since 1993.",
  founded: 1993,
} as const;

export const NAV = [
  { label: "About", href: "/about" },
  { label: "Prices", href: "/prices" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const CONTACT = {
  email: "caldwellsafari@gmail.com",
  phoneDisplay: "+27 76 233 7184",
  phoneHref: "tel:+27762337184",
  whatsapp: "https://wa.me/27762337184",
  zoom: "https://www.zoom.us/signup#/signup",
  region: "South Africa · transfers from Johannesburg (OR Tambo)",
} as const;

export const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
  { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
] as const;
