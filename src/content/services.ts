export type Service = {
  slug: string;
  title: string;
  short: string;
  long: string;
  forWhom: string[];
  process: { step: string; detail: string }[];
};

export const services: Service[] = [
  {
    slug: "statutory-audit-and-assurance",
    title: "Statutory Audit & Assurance",
    short:
      "Independent examination of financial statements to the standards expected by regulators, investors, and boards. We sign opinions we can defend.",
    long:
      "Our audit practice is led by partners with Big Four backgrounds and a combined three decades of regulated-entity experience. Every audit is planned, performed, and reviewed by named individuals who are accountable for the opinion. We use the same methodologies as the largest firms — risk-based planning, substantive testing, working papers reviewed by a second partner — applied without the layered hand-offs that frustrate clients of larger firms.",
    forWhom: [
      "Companies subject to mandatory audit under the Companies Act 2006",
      "Privately held businesses requiring audit for lenders, investors, or shareholders",
      "Subsidiaries of international groups requiring UK statutory audit",
      "Regulated entities under FCA or other UK regulatory regimes",
    ],
    process: [
      { step: "Planning", detail: "Risk assessment, materiality, scoping, and engagement letter — typically four to six weeks before year-end." },
      { step: "Interim fieldwork", detail: "Controls testing and substantive procedures on transactions to date, performed on site or remotely." },
      { step: "Year-end fieldwork", detail: "Substantive testing of balances, cut-off, completeness, and disclosure. On site for two to four weeks." },
      { step: "Completion", detail: "Working paper review by a second partner, draft accounts review, and signed audit opinion." },
    ],
  },
  {
    slug: "tax-compliance-and-advisory",
    title: "Tax Compliance & Advisory",
    short:
      "Corporation tax, personal tax, and cross-border structuring for UK and international businesses. Every return filed on time; every position documented.",
    long:
      "Tax positions are only worth taking if they hold up. Our tax team — led by a Chartered Tax Adviser with a top-10 firm background — combines technical depth with the discipline to document every position so that it survives HMRC scrutiny. We work with corporate clients, owner-managers, and private individuals across the full lifecycle: registration, compliance, planning, and dispute resolution.",
    forWhom: [
      "UK companies needing corporation tax compliance and planning",
      "Owner-managed businesses considering remuneration structures or exits",
      "International groups with UK tax exposure or transfer pricing requirements",
      "High-net-worth individuals with complex personal tax positions",
    ],
    process: [
      { step: "Position review", detail: "Annual review of the client's tax position, planning opportunities, and exposures." },
      { step: "Compliance", detail: "Preparation and filing of corporation tax, personal tax, and ancillary returns to statutory deadlines." },
      { step: "Advisory", detail: "Ad hoc advice on transactions, restructuring, remuneration, and cross-border matters." },
      { step: "Representation", detail: "HMRC correspondence, enquiry defence, and dispute resolution where required." },
    ],
  },
  {
    slug: "corporate-finance-and-transactions",
    title: "Corporate Finance & Transactions",
    short:
      "Due diligence, financial modelling, and deal advisory for acquisitions, disposals, and fundraising rounds. The numbers behind the handshake.",
    long:
      "Transactions live or die on the credibility of the numbers presented to the other side of the table. Our corporate finance practice prepares vendor due diligence, buy-side diligence, financial models, and information memoranda for deals from £2m to £200m. We work with founders, private equity backers, and family offices through the full transaction lifecycle.",
    forWhom: [
      "Founders preparing for a sale or fundraise",
      "Private equity firms requiring buy-side diligence",
      "Acquirers needing target financial analysis and integration planning",
      "Vendors requiring data-room preparation and Q&A management",
    ],
    process: [
      { step: "Scoping", detail: "Define transaction objectives, deliverables, and timeline with the client and any sponsor." },
      { step: "Information gathering", detail: "Data-room population, management interviews, and analytical reviews." },
      { step: "Diligence report", detail: "Draft report covering trading performance, quality of earnings, working capital, debt, and tax." },
      { step: "Completion support", detail: "SPA negotiation support, completion accounts, and post-deal handover." },
    ],
  },
  {
    slug: "fractional-cfo-services",
    title: "Fractional CFO Services",
    short:
      "Senior financial leadership on a part-time basis for businesses that need the calibre but not the full-time cost. Board packs, cash-flow forecasts, and investor-ready reporting.",
    long:
      "A fractional CFO from Staicha is a partner-level professional who takes ownership of your finance function for one to three days a week. They sit in your board meetings, manage your finance team, present to investors, and run your year-end. The depth of a senior hire, without the fixed cost of one.",
    forWhom: [
      "Series A to Series C businesses with revenue between £2m and £30m",
      "Founder-led businesses preparing for institutional investment",
      "Businesses between full-time finance leaders",
      "Family offices needing senior financial governance",
    ],
    process: [
      { step: "Engagement scoping", detail: "Two-week assessment of finance function, reporting cadence, and key priorities." },
      { step: "Onboarding", detail: "Embed in board meetings, review reporting, meet the team and key stakeholders." },
      { step: "Steady state", detail: "Monthly board packs, quarterly forecasts, annual budget cycle, and investor reporting." },
      { step: "Handover", detail: "Recruit and onboard a permanent CFO when the business is ready — typically twelve to twenty-four months." },
    ],
  },
  {
    slug: "management-accounts-and-reporting",
    title: "Management Accounts & Reporting",
    short:
      "Monthly and quarterly financial reporting that tells you where you stand and where you are heading. Clear, timely, and built for decision-making.",
    long:
      "Late management accounts are worse than no management accounts. We deliver a complete monthly pack — P&L, balance sheet, cash flow, KPIs, variance analysis, and a one-page commentary — by the tenth working day of the following month. Every pack is reviewed before it leaves the firm.",
    forWhom: [
      "Owner-managed businesses needing reliable monthly reporting",
      "Investor-backed companies with monthly board reporting requirements",
      "Businesses that have outgrown bookkeeping but cannot yet justify in-house finance",
    ],
    process: [
      { step: "Setup", detail: "Chart of accounts review, reporting template design, and KPI definition." },
      { step: "Monthly close", detail: "Accruals, prepayments, depreciation, and reconciliations performed by the firm." },
      { step: "Pack production", detail: "Report drafted, reviewed by a manager, and issued by working day ten." },
      { step: "Review", detail: "Quarterly review meeting with the client to discuss trends and forward look." },
    ],
  },
  {
    slug: "bookkeeping-and-payroll",
    title: "Bookkeeping & Payroll",
    short:
      "Accurate, reliable record-keeping and payroll processing. The foundation everything else depends on.",
    long:
      "Bookkeeping looks simple until it goes wrong. Our bookkeeping team uses Xero or QuickBooks, follows a documented monthly checklist, and reconciles to source documents — not to plug numbers. Payroll runs monthly with HMRC RTI submissions, pension contributions, and payslips delivered on time, every time.",
    forWhom: [
      "Businesses without in-house finance staff",
      "Businesses with bookkeeping that has fallen behind",
      "Employers needing reliable monthly payroll processing",
    ],
    process: [
      { step: "Systems setup", detail: "Software configuration, bank feeds, and integration with invoicing tools." },
      { step: "Monthly bookkeeping", detail: "Bank reconciliations, expense processing, sales and purchase ledger maintenance." },
      { step: "Payroll", detail: "Monthly payroll run, payslips, RTI submissions, pension contributions." },
      { step: "Year-end", detail: "P60s, P11Ds, and handover to tax preparation." },
    ],
  },
  {
    slug: "rd-tax-credits",
    title: "R&D Tax Credits",
    short:
      "Identifying qualifying expenditure and preparing robust claims that survive HMRC enquiry. Technical narrative and financial schedules, handled end to end.",
    long:
      "Since the 2025 reforms, R&D claims face a higher bar of evidence and a narrower definition of qualifying activity. We prepare claims that hold up: technical narratives written with the development team, financial schedules tied to the general ledger, and a defence file ready for any HMRC enquiry.",
    forWhom: [
      "Technology, life sciences, and engineering companies undertaking qualifying R&D",
      "Companies whose previous claims have faced HMRC enquiry",
      "First-time claimants needing a defensible methodology",
    ],
    process: [
      { step: "Eligibility assessment", detail: "Technical interview with the development team to identify qualifying projects." },
      { step: "Quantification", detail: "Apportion staff costs, externally provided workers, software, and consumables." },
      { step: "Claim preparation", detail: "Technical narrative and financial schedules drafted, reviewed by a partner." },
      { step: "Submission and defence", detail: "Claim filed with CT600 and additional information form; enquiry support if required." },
    ],
  },
  {
    slug: "vat-advisory-and-compliance",
    title: "VAT Advisory & Compliance",
    short:
      "Registration, returns, partial exemption, international VAT, and HMRC dispute resolution. The rules are complex; the filings should not be.",
    long:
      "VAT is the tax most likely to catch a growing business off guard — particularly on international sales, partial exemption, and Making Tax Digital compliance. We handle UK and EU VAT registrations, prepare returns, advise on transactions, and defend VAT positions in HMRC correspondence.",
    forWhom: [
      "Businesses approaching or exceeding the VAT registration threshold",
      "Partially exempt businesses (financial services, education, property)",
      "International businesses with UK VAT obligations",
    ],
    process: [
      { step: "Registration review", detail: "Establish VAT status, scheme selection, and registration if required." },
      { step: "Quarterly returns", detail: "Return preparation, review, and submission via MTD-compatible software." },
      { step: "Advisory", detail: "Transactional advice on land and property, international supply chains, and special schemes." },
      { step: "Dispute support", detail: "HMRC correspondence, voluntary disclosures, and tribunal preparation if needed." },
    ],
  },
  {
    slug: "company-secretarial",
    title: "Company Secretarial",
    short:
      "Companies House filings, statutory registers, board minutes, and corporate governance support. Every document filed correctly and on time.",
    long:
      "Companies House penalties are entirely avoidable. We maintain statutory registers, prepare and file confirmation statements, document share issues and transfers, and draft board minutes for the routine corporate calendar. For more complex matters — restructuring, share schemes, governance reviews — we coordinate with the client's legal advisers.",
    forWhom: [
      "Limited companies without an in-house company secretary",
      "Groups requiring coordinated filings across multiple entities",
      "Companies preparing for transactions or investment requiring clean governance records",
    ],
    process: [
      { step: "Records review", detail: "Audit of statutory registers and Companies House filings to establish baseline." },
      { step: "Routine compliance", detail: "Confirmation statements, accounts filings, PSC register maintenance." },
      { step: "Transactional support", detail: "Share allotments, transfers, director appointments, and resignations." },
      { step: "Governance reviews", detail: "Annual review of governance documents, board calendar, and statutory obligations." },
    ],
  },
  {
    slug: "business-restructuring-and-insolvency",
    title: "Business Restructuring & Insolvency",
    short:
      "Advice for businesses under financial pressure. Options appraisals, creditor negotiations, and formal insolvency procedures when needed.",
    long:
      "Financial pressure is rarely a single event. It is a sequence of decisions that compound. We work with directors and shareholders to understand the position, model the options, and where appropriate negotiate with creditors. Where formal procedures become necessary, we work alongside licensed insolvency practitioners.",
    forWhom: [
      "Directors of companies facing cash-flow pressure or solvency concerns",
      "Shareholders considering rescue, restructuring, or wind-down options",
      "Lenders requiring independent business reviews",
    ],
    process: [
      { step: "Initial assessment", detail: "Confidential review of the financial position, cash runway, and creditor exposure." },
      { step: "Options appraisal", detail: "Modelling of restructuring, rescue, and insolvency options with comparative outcomes." },
      { step: "Implementation", detail: "Creditor negotiations, CVA preparation, or coordination of formal procedures." },
      { step: "Stabilisation", detail: "Post-restructuring financial controls and reporting to support recovery." },
    ],
  },
  {
    slug: "wealth-and-private-client",
    title: "Wealth & Private Client",
    short:
      "Tax planning, estate structuring, and financial reporting for high-net-worth individuals, family offices, and trusts.",
    long:
      "Private clients need the same rigour as institutional ones — often more, because the consequences of a misstep are personal. We advise individuals, families, and trustees on tax planning, estate structuring, residency and domicile, and consolidated reporting across multiple jurisdictions and asset classes.",
    forWhom: [
      "High-net-worth individuals and families",
      "Family offices managing multi-generational wealth",
      "Trustees of family and charitable trusts",
    ],
    process: [
      { step: "Position mapping", detail: "Consolidated view of assets, liabilities, and tax positions across entities and jurisdictions." },
      { step: "Planning", detail: "Annual tax planning, estate review, and structuring recommendations." },
      { step: "Compliance", detail: "Personal tax, trust tax, and entity-level returns prepared and filed." },
      { step: "Reporting", detail: "Quarterly consolidated reporting in a format family members can actually read." },
    ],
  },
  {
    slug: "international-and-cross-border-advisory",
    title: "International & Cross-Border Advisory",
    short:
      "UK tax and regulatory guidance for international businesses entering or operating in the UK market, and UK businesses expanding abroad.",
    long:
      "Cross-border activity multiplies the rule sets that apply to a business. We advise inbound investors on UK entity selection, registration, and ongoing compliance; we advise UK businesses on the tax and structural implications of operating abroad. Where local advice is required, we coordinate with a network of correspondent firms in major jurisdictions.",
    forWhom: [
      "International businesses establishing a UK presence",
      "UK businesses expanding into Europe, North America, or Asia",
      "International groups with UK subsidiaries or branches",
    ],
    process: [
      { step: "Structuring", detail: "Entity selection, treaty analysis, and registration in the relevant jurisdictions." },
      { step: "Implementation", detail: "Company formation, registrations, banking, and operational set-up." },
      { step: "Ongoing compliance", detail: "Coordinated compliance across jurisdictions with consolidated reporting." },
      { step: "Transactions", detail: "Cross-border M&A, transfer pricing, and exit planning." },
    ],
  },
];
