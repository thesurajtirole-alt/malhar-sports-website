// Single source of truth for real business details.
// Update here and it propagates to schema, footer, header CTA, contact page, etc.

export const business = {
  name: "Malhar Sports and Shoes",
  tagline: "Indore Ka Sports Adda",
  phone: "+91 98263 23377",
  phoneRaw: "919826323377", // for wa.me / tel: links, no spaces or plus
  whatsappLink: "https://wa.me/919826323377",
  telLink: "tel:+919826323377",
  address: {
    line1: "126, near Balaji Regency, Dravid Nagar Colony",
    line2: "Dravid Nagar, Scheme 71",
    city: "Indore",
    state: "Madhya Pradesh",
    pincode: "452009",
    country: "IN",
    full: "126, near Balaji Regency, Dravid Nagar Colony, Dravid Nagar, Scheme 71, Indore, Madhya Pradesh 452009",
  },
  geo: {
    // Approximate — swap for exact pin from Google Business Profile when available
    lat: 22.7245,
    lng: 75.8477,
  },
  mapsLink: "https://share.google/d14ENROki54aagWeh",
  hours: {
    // Same hours every day per Google Business Profile
    opens: "10:00",
    closes: "22:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    display: "Har din — Subah 10 se Raat 10 baje tak",
  },
  rating: {
    value: 4.6,
    count: 49, // Google reviews — bump when you check again
  },
  domain: "malharsportsandshoes.in",
  siteUrl: "https://malharsportsandshoes.in",
  social: {
    instagram: "https://www.instagram.com/malhar_sports_and_shoes_/",
    facebook: "",
  },
} as const;

export type Business = typeof business;
