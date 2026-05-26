export type TeamMember = {
  slug: string;
  name: string;
  qualifications: string;
  title: string;
  bio: string;
  email: string;
  image: string;
};

export const team: TeamMember[] = [
  {
    slug: "eleanor-ashford-hayes",
    name: "Eleanor Ashford-Hayes",
    qualifications: "FCA",
    title: "Senior Partner, Audit & Assurance",
    bio: "Eighteen years at a Big Four firm before founding Staicha. Specialises in complex group audits and regulated-entity assurance. Fellow of the Institute of Chartered Accountants in England and Wales. Holds the firm's audit-quality standard personally.",
    email: "e.ashford-hayes@staicha.com",
    image:
      "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "marcus-okafor-webb",
    name: "Marcus Okafor-Webb",
    qualifications: "CTA",
    title: "Partner, Tax & Advisory",
    bio: "Former head of mid-market tax at a top-ten UK firm. Chartered Tax Adviser with a focus on cross-border structuring, R&D incentives, and private-client wealth planning. Known among clients for making tax law understandable to non-accountants.",
    email: "m.okafor-webb@staicha.com",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "anika-patel",
    name: "Anika Patel",
    qualifications: "ACA",
    title: "Partner, Corporate Finance & Fractional CFO",
    bio: "Qualified at a Big Four firm before spending five years at a PE-backed growth company as finance director. Brings operational finance experience to every engagement. Leads the firm's fractional CFO practice and corporate finance advisory.",
    email: "a.patel@staicha.com",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80",
  },
];
