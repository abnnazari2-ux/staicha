export const site = {
  name: "Staicha",
  legalName: "Staicha LLP",
  tagline: "Numbers, with conviction.",
  description:
    "A London chartered accountancy and advisory firm where Big Four rigour meets boutique responsiveness.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://staicha.co.uk",
  contact: {
    email: "contact@staicha.com",
    phone: "+44 20 7946 0118",
    phoneHref: "tel:+442079460118",
  },
  address: {
    street: "14 Throgmorton Avenue",
    locality: "London",
    region: "Greater London",
    postcode: "EC2N 2DL",
    country: "United Kingdom",
    countryCode: "GB",
  },
  hours: "Monday – Friday, 08:30 – 18:00 GMT",
  registration: "Registered in England & Wales — OC 478 921",
  copyright: "© 2026 Staicha LLP. All rights reserved.",
  social: [] as { name: string; url: string }[],
};
