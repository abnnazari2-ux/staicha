export type Position = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const positions: Position[] = [
  {
    slug: "audit-senior",
    title: "Audit Senior",
    department: "Audit & Assurance",
    location: "London EC2",
    type: "Full-time",
    summary:
      "Lead audit fieldwork on a portfolio of mid-market and regulated-entity clients. Report directly to the audit partner; mentor junior staff; own the working-paper file.",
    responsibilities: [
      "Plan and execute audit fieldwork in accordance with ISAs",
      "Prepare and review working papers to partner-review standard",
      "Manage client relationships during the audit fieldwork period",
      "Mentor and review the work of audit assistants",
    ],
    requirements: [
      "ACA or ACCA qualified",
      "Three or more years post-qualification audit experience",
      "Big Four or top-ten firm background preferred",
      "Strong written communication; comfortable presenting findings to senior management",
    ],
  },
  {
    slug: "tax-manager",
    title: "Tax Manager",
    department: "Tax & Advisory",
    location: "London EC2",
    type: "Full-time",
    summary:
      "Manage a portfolio of corporate and private clients, with a focus on cross-border structuring and R&D. Report to the tax partner; review junior work; advise clients directly.",
    responsibilities: [
      "Manage corporate tax compliance and advisory portfolio",
      "Prepare and review R&D tax credit claims",
      "Advise on cross-border tax structuring and transfer pricing",
      "HMRC correspondence and enquiry defence",
    ],
    requirements: [
      "CTA or equivalent",
      "Five or more years tax experience, ideally in a top-ten or specialist firm",
      "Cross-border experience preferred",
      "Demonstrable ability to translate technical positions into clear written advice",
    ],
  },
  {
    slug: "graduate-trainee",
    title: "Graduate Trainee",
    department: "Audit / Tax / Advisory",
    location: "London EC2",
    type: "Full-time",
    summary:
      "Three-year ACA training contract with full study support, structured rotations across audit, tax, and advisory, and direct mentorship from the founding partners.",
    responsibilities: [
      "Rotate through audit, tax, and advisory engagements",
      "Complete ACA examinations alongside client work",
      "Take ownership of discrete pieces of client work from the first month",
    ],
    requirements: [
      "2.1 or higher in any discipline",
      "Available for September 2027 intake",
      "Eligible to work in the UK without sponsorship",
      "Demonstrable interest in business, finance, or professional services",
    ],
  },
];
