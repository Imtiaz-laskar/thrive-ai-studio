export interface KnowledgeResource {
  id: string;
  title: string;
  category: 'Legal References' | 'Regulatory Guidance' | 'Industry Standards' | 'Child Safety Resources' | 'AI Governance' | 'Privacy' | 'Definitions & Glossary' | 'FAQs' | 'Case Studies' | 'Best Practices';
  shortSummary: string;
  keyTakeaways: string[];
  relevanceScore: number; // 0 - 100
  indiaJurisdiction: string;
  relatedResources: string[];
  externalUrl?: string;
  detailedContent: string;
}

export const KNOWLEDGE_BANK_ITEMS: KnowledgeResource[] = [
  {
    id: 'kb_01',
    title: 'DPDP Act 2023 - Section 9: Certain Obligations in Relation to Children',
    category: 'Legal References',
    shortSummary: 'Statutory mandates under India\'s Digital Personal Data Protection Act 2023 regarding verifiable parental consent and prohibition of targeted ads to minors.',
    keyTakeaways: [
      'Data Fiduciaries must obtain verifiable consent of parent or lawful guardian prior to processing child personal data.',
      'Absolute prohibition on processing data likely to cause detrimental effect on child well-being.',
      'Absolute prohibition on behavioral tracking or targeted advertising directed at children.'
    ],
    relevanceScore: 100,
    indiaJurisdiction: 'Ministry of Electronics & Information Technology (MeitY)',
    relatedResources: ['DPDP Rule 12 draft', 'Verifiable Parental Consent Architecture'],
    externalUrl: 'https://www.meity.gov.in/content/digital-personal-data-protection-act-2023',
    detailedContent: `Section 9 of the Digital Personal Data Protection Act 2023 (DPDP Act) governs all data fiduciaries operating digital platforms in India. It mandates that no data fiduciary shall process personal data of a child (individual under 18 years) without prior verifiable consent of the parent or lawful guardian. Furthermore, data fiduciaries are barred from engaging in tracking, behavioral monitoring, or targeted advertising directed towards children.`
  },
  {
    id: 'kb_02',
    title: 'IT Rules 2021 (Intermediary Guidelines) - Due Diligence & 24-Hour CSAM Takedown',
    category: 'Regulatory Guidance',
    shortSummary: 'Due diligence requirements for social media intermediaries and AI platforms under Rule 3(1)(b) regarding child sexual abuse material (CSAM) and grievance redressal.',
    keyTakeaways: [
      '24-hour SLA to disable access or remove CSAM and non-consensual sexual imagery upon receiving complaint or order.',
      'Mandatory appointment of Resident Grievance Officer, Chief Compliance Officer, and Nodal Contact Person in India.',
      'Prohibition on hosting or transmitting material that is harmful to minors.'
    ],
    relevanceScore: 98,
    indiaJurisdiction: 'Ministry of Electronics & Information Technology (MeitY)',
    relatedResources: ['NCRB Cyber Crime Portal Integration', 'CERT-In Incident Directions'],
    externalUrl: 'https://www.meity.gov.in/content/information-technology-intermediary-guidelines-and-digital-media-ethics-code-rules-2021',
    detailedContent: `The Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 mandate strict due diligence for platforms. Rule 3(1)(b) prohibits hosting, displaying, or uploading content harmful to minors or constituting CSAM. Intermediaries must maintain automated detection tools and execute content takedowns within 24 hours of notification.`
  },
  {
    id: 'kb_03',
    title: 'POCSO Act 2012 - Section 19 & Section 20: Mandatory Incident Reporting',
    category: 'Legal References',
    shortSummary: 'Statutory duty to report child sexual abuse and explicit material to specialized law enforcement or Cyber Crime portal.',
    keyTakeaways: [
      'Mandatory duty on platform operators and individuals to report knowledge of CSAM or sexual exploitation of children.',
      'Failure to report carries statutory criminal liability and penalties under Indian Penal Code / Bharatiya Nyaya Sanhita.',
      'Direct statutory mapping to National Cyber Crime Reporting Portal (cybercrime.gov.in).'
    ],
    relevanceScore: 95,
    indiaJurisdiction: 'Ministry of Women & Child Development (MWCD) / MHA',
    relatedResources: ['NCRB Tip Line Protocol', 'POCSO Legal Defense Standard'],
    externalUrl: 'https://wcd.nic.in/act/pocso-act-2012',
    detailedContent: `Under Section 19 and 20 of the Protection of Children from Sexual Offences (POCSO) Act 2012, any person or corporate entity that apprehends or has knowledge of child abuse or CSAM must report the matter to Special Juvenile Police Units or local police immediately.`
  },
  {
    id: 'kb_04',
    title: 'IEEE 2089.1-2023 Standard: Age-Appropriate Digital Services Framework',
    category: 'Industry Standards',
    shortSummary: 'Global engineering benchmark establishing technical specifications for age-gating, default privacy settings, and algorithmic safety for children.',
    keyTakeaways: [
      'High-privacy settings mandated by default for all minor users.',
      'Prohibition on dark patterns, infinite scroll nudges, and coercive gamification.',
      'Technical validation for age verification without excessive personal data collection.'
    ],
    relevanceScore: 92,
    indiaJurisdiction: 'IEEE Computer Society / Global Standard',
    relatedResources: ['UK Age Appropriate Design Code', 'NCPCR AI Safety Guidelines'],
    externalUrl: 'https://standards.ieee.org/ieee/2089.1/10547/',
    detailedContent: `IEEE 2089.1 establishes practical engineering rules for software architects building platforms used by children, covering age assurance, data minimization, and nudge technique restrictions.`
  },
  {
    id: 'kb_05',
    title: 'ISO/IEC 42001:2023 - Artificial Intelligence Management System (AIMS)',
    category: 'Industry Standards',
    shortSummary: 'International management standard specifying requirements for establishing, implementing, and continually improving AI risk management.',
    keyTakeaways: [
      'Mandatory risk impact assessments prior to deploying AI generative models.',
      'Continuous monitoring for prompt injection, deepfake harm, and hallucinated advise to vulnerable populations.',
      'Full traceability of training data provenance and model weights validation.'
    ],
    relevanceScore: 90,
    indiaJurisdiction: 'ISO / BIS (Bureau of Indian Standards)',
    relatedResources: ['ISO/IEC 23894 AI Risk Management', 'Guardian AI Lifecycle Model'],
    externalUrl: 'https://www.iso.org/standard/81230.html',
    detailedContent: `ISO/IEC 42001 provides a structured audit frame for certifying enterprise AI models. When applied to child safety, it ensures model guardrails and prompt firewalls are rigorously verified.`
  },
  {
    id: 'kb_06',
    title: 'NCPCR Guidelines on Online Gaming & Digital Child Protection',
    category: 'Regulatory Guidance',
    shortSummary: 'National Commission for Protection of Child Rights guidelines on screen time limits, parental controls, and financial transactions.',
    keyTakeaways: [
      'Mandatory session limits and screen time warnings after 45 minutes of continuous usage.',
      'Biometric or OTP parental confirmation for all in-app monetary transactions.',
      'Prohibition on loot boxes and real-money wagering targeting minors.'
    ],
    relevanceScore: 88,
    indiaJurisdiction: 'NCPCR (Statutory Body under MWCD)',
    relatedResources: ['MeitY Online Gaming Rules 2023', 'Parental Controls Architecture'],
    externalUrl: 'https://ncpcr.gov.in',
    detailedContent: `NCPCR guidelines offer granular UI/UX requirements to prevent online gaming addiction, financial exploitation, and exposure to toxic multiplayer interactions.`
  },
  {
    id: 'kb_07',
    title: 'Glossary: Child Sexual Abuse Material (CSAM) & Perceptual Hashing',
    category: 'Definitions & Glossary',
    shortSummary: 'Definitions of CSAM, PhotoDNA, PDQ hashing, and automated cryptographic matching standards used in AI safety systems.',
    keyTakeaways: [
      'PhotoDNA & PDQ generate fuzzy perceptual hashes invariant to image scaling or minor edits.',
      'Zero-tolerance immediate quarantine upon perceptual hash collision with NCMEC or NCRB blocklists.',
      'Automated encrypted audit trail generated for law enforcement referral.'
    ],
    relevanceScore: 96,
    indiaJurisdiction: 'Cyber Crime / Global Safety Tech',
    relatedResources: ['NCMEIC Hash Database API', 'NCRB Tip Line Workflow'],
    detailedContent: `Perceptual hashing compares visual features rather than exact byte signatures. This allows real-time prevention of known CSAM uploads across file attachments and image generator inputs.`
  },
  {
    id: 'kb_08',
    title: 'Glossary: Child Risk Impact Assessment (CRIA)',
    category: 'Definitions & Glossary',
    shortSummary: 'Multidisciplinary audit methodology evaluating psychological, physical, data privacy, and legal risks to minors prior to feature launch.',
    keyTakeaways: [
      'Mandatory prerequisite before deploying AI chat models or recommendation algorithms.',
      'Involves Legal, Engineering, Trust & Safety, and Child Development experts.',
      'Yields quantitative risk severity score and gating launch decision.'
    ],
    relevanceScore: 94,
    indiaJurisdiction: 'Guardian AI Operating Model / Global Best Practice',
    relatedResources: ['Risk Calculator & CRIA View', 'Launch Review Gate'],
    detailedContent: `A Child Risk Impact Assessment (CRIA) systematically evaluates potential harms a feature could pose to minors, documenting mitigation controls and establishing sign-off accountability.`
  },
  {
    id: 'kb_09',
    title: 'Case Study: Parasocial AI Companion Dependency & Self-Harm Prompt Mitigation',
    category: 'Case Studies',
    shortSummary: 'Anonymized case analysis of conversational AI chatbots forming emotional attachment with adolescent users, and technical firewall solutions.',
    keyTakeaways: [
      'Adolescents are susceptible to anthropomorphizing AI companions, leading to isolated emotional reliance.',
      'Real-time semantic classifiers must inject boundary-setting reminders ("I am an AI, not a human friend").',
      'Instant crisis intervention hotline redirection (e.g. KIRAN 14416 / Childline 1098) upon self-harm intent.'
    ],
    relevanceScore: 91,
    indiaJurisdiction: 'AI Trust & Safety Research',
    relatedResources: ['AI Threat Matrix', 'Prompt Firewall Specifications'],
    detailedContent: `This case study examines how conversational AI platforms mitigate parasocial risk by embedding periodic reality checks, hard session caps, and crisis helpline referrals when self-harm terms are detected.`
  }
];
