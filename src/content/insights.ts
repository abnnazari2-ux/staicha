export type Insight = {
  slug: string;
  title: string;
  category: "Audit" | "Tax" | "Advisory" | "General";
  date: string;
  author: string;
  excerpt: string;
  image: string;
  body: { type: "p" | "h2" | "quote"; text: string }[];
};

export const insights: Insight[] = [
  {
    slug: "cost-of-late-numbers",
    title: "The Cost of Late Numbers: Why Monthly Management Accounts Pay for Themselves",
    category: "Advisory",
    date: "2026-05-15",
    author: "Anika Patel",
    excerpt:
      "A late management pack is a decision deferred. Across a portfolio of growth-stage businesses, the cost of that deferral is rarely modelled — but it is rarely small.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    body: [
      { type: "p", text: "There is a familiar pattern in growing businesses: the management accounts arrive in the third week of the following month. By then, the founder has already made the hiring decision, signed the lease, or approved the marketing spend. The numbers, when they arrive, do not change those decisions. They simply explain them — after the fact." },
      { type: "h2", text: "The hidden cost of latency" },
      { type: "p", text: "Across the businesses we work with as fractional CFOs, we observe a consistent relationship between management-account latency and decision quality. Businesses receiving figures by working day ten make different hiring and spending decisions than those receiving them on day twenty. The decisions are not necessarily smaller; they are better calibrated to the actual cash position." },
      { type: "quote", text: "A pack that arrives after the decision has been made is a history book, not a steering instrument." },
      { type: "h2", text: "What 'good' looks like" },
      { type: "p", text: "A management pack worth reading is short, unambiguous, and built around three questions: where are we against plan, what is our cash runway, and what decisions does the data require this month. Everything else is appendix." },
      { type: "p", text: "The discipline to deliver this pack on working day ten is not a software problem; it is a process problem. It requires daily bookkeeping, weekly reconciliations, and a finance function that understands that the close is the product." },
    ],
  },
  {
    slug: "rd-tax-credits-after-2025-reform",
    title: "R&D Tax Credits After the 2025 Reform: What Qualifying Expenditure Looks Like Now",
    category: "Tax",
    date: "2026-05-02",
    author: "Marcus Okafor-Webb",
    excerpt:
      "The 2025 reforms tightened the definition of qualifying R&D and raised the evidential bar. Claims that succeeded in 2023 may no longer pass scrutiny.",
    image:
      "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=1600&q=80",
    body: [
      { type: "p", text: "The R&D regime has been a moving target for half a decade. The 2025 reforms — consolidating the SME and RDEC schemes, narrowing the definition of qualifying activity, and requiring an additional information form — have changed both the substance and the procedure of a claim." },
      { type: "h2", text: "Qualifying activity, more narrowly drawn" },
      { type: "p", text: "HMRC's revised guidance places more weight on technological uncertainty as a gating criterion. Routine software development — even where it solves a commercial problem the business has not solved before — increasingly falls outside the relief. The question is not whether the work was difficult; it is whether a competent professional in the field could have resolved the uncertainty using readily deducible knowledge." },
      { type: "h2", text: "The evidential bar" },
      { type: "p", text: "A defensible claim now requires contemporaneous documentation of the uncertainty, the work undertaken to resolve it, and the people whose time was charged to that work. We recommend a project-level technical narrative drafted during the year, not reconstructed at year-end." },
      { type: "quote", text: "A claim that cannot survive a one-hour HMRC enquiry should never have been filed." },
    ],
  },
  {
    slug: "what-your-auditor-should-tell-you",
    title: "What Your Auditor Should Tell You Before You Hear It From HMRC",
    category: "Audit",
    date: "2026-04-18",
    author: "Eleanor Ashford-Hayes",
    excerpt:
      "A signed audit opinion is a single output of a much longer conversation. The most valuable part of that conversation is what your auditor tells you about positions that may not hold.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
    body: [
      { type: "p", text: "Most directors think of an audit as a binary output: the opinion is clean or it is qualified. The audit opinion is, in practice, only one of several outputs of an audit, and the most consequential outputs are often the ones never reduced to a formal letter." },
      { type: "h2", text: "The management letter" },
      { type: "p", text: "A thoughtful audit team will issue a management letter — sometimes called an internal control letter — that identifies process weaknesses, accounting treatments that are technically acceptable but unusual, and positions that may attract HMRC attention. This letter is more valuable than the audit opinion itself." },
      { type: "h2", text: "Conversations that do not appear in writing" },
      { type: "p", text: "A senior partner who knows your business will tell you, before you ask, that the related-party transaction will draw attention, that the revenue recognition policy may not survive a change in standards, that the deferred-tax position depends on a forecast you may not meet. None of this appears in the file." },
      { type: "quote", text: "The opinion is the deliverable. The conversation is the value." },
    ],
  },
];
