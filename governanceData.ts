import { RACIItem, GovernanceRole, EscalationLevel } from '../types/framework';

export const GOVERNANCE_ROLES: GovernanceRole[] = [
  {
    title: 'Chief Trust & Safety / Executive Safety Sponsor',
    department: 'Executive Office / T&S',
    primaryMandate: 'Ultimate corporate and legal accountability for child safety, protection against CSAM/CSAE, and compliance with Indian regulatory bodies (NCPCR, MeitY, MHA).',
    keyDeliverables: ['Quarterly Board Safety Audits', 'Go/No-Go Launch Approval for High/Critical Risk AI Products', 'Regulatory Liasion with Law Enforcement'],
    escalationTrigger: 'Uncontained Critical Risk Incidents (CSAM, Suicide threats, Mass Privacy Breaches under DPDP Sec 9).'
  },
  {
    title: 'Product Lead - Child Safety & Wellbeing',
    department: 'Product Management',
    primaryMandate: 'Drive Safety-by-Design and Age-Appropriate UX integration into core product roadmaps, features, and algorithmic recommendation loops.',
    keyDeliverables: ['Child Safety Impact Assessment (CSIA)', 'Age-Tiered Feature Specifications', 'Default Safe Settings Matrix'],
    escalationTrigger: 'Conflict between engagement growth metrics and child safety design requirements.'
  },
  {
    title: 'Head of AI Trust & Safety Operations',
    department: 'Trust & Safety',
    primaryMandate: 'Operationalize real-time AI moderation, automated content classifiers, red-teaming protocols, and 24/7 child harm triage teams.',
    keyDeliverables: ['Automated CSAM & Grooming Classifiers', 'Safety Red-Teaming Reports', 'Moderator Mental Health Protocols'],
    escalationTrigger: 'Classifier accuracy drop below 95% or spike in high-risk prompt jailbreaks.'
  },
  {
    title: 'Data Protection Officer (DPO) & Privacy Lead',
    department: 'Privacy & Data Governance',
    primaryMandate: 'Enforce India DPDP Act 2023 Section 9 mandates (Verifiable Parental Consent, prohibition of tracking/profiling, data minimization for minors).',
    keyDeliverables: ['Parental Consent Architecture Audit', 'DPDP Compliance Register', 'Data Retention & Erasure Automation'],
    escalationTrigger: 'Detection of unauthorized tracking pixels, behavioral profiling, or dark patterns targeting minors.'
  },
  {
    title: 'Resident Grievance Officer & Legal Counsel',
    department: 'Legal & Regulatory Affairs',
    primaryMandate: 'Ensure strict compliance with IT Rules 2021 (24-hour CSAM takedown, 36-hour content removal orders) and legal response to Indian authorities.',
    keyDeliverables: ['Monthly IT Rules Compliance Reports', 'Law Enforcement Response Desk (Section 91 IT Act)', 'POCSO Legal Safeguard Protocol'],
    escalationTrigger: 'Legal notices from NCPCR, MeitY, CERT-In, or Law Enforcement agencies.'
  },
  {
    title: 'Lead Safety & ML Infrastructure Engineer',
    department: 'Engineering & Data Science',
    primaryMandate: 'Build robust technical guardrails, latency-optimized safety inference APIs, prompt sanitizer proxies, and data logging pipelines.',
    keyDeliverables: ['Safety Guardrail Proxy Service', 'Synthetic Data Privacy Scrubbers', 'Real-time Telemetry & Tele-triage Pipelines'],
    escalationTrigger: 'System failure in prompt filtering proxy or model hallucination bypass.'
  }
];

export const RACI_MATRIX: RACIItem[] = [
  {
    activity: 'Child Safety Risk Assessment (Pre-Build)',
    category: 'Ideation & Scoping',
    execOwner: 'A',
    prodOwner: 'R',
    tsOwner: 'C',
    privacyOwner: 'C',
    legalOwner: 'C',
    engOwner: 'I',
    description: 'Initial risk score calculation and determination of age suitability.'
  },
  {
    activity: 'Verifiable Parental Consent Mechanism Design (DPDP Sec 9)',
    category: 'Privacy & Legal',
    execOwner: 'I',
    prodOwner: 'R',
    tsOwner: 'I',
    privacyOwner: 'A',
    legalOwner: 'C',
    engOwner: 'R',
    description: 'Architecture and user flow for obtaining verifiable consent from parents in India.'
  },
  {
    activity: 'AI Safety Red-Teaming & Jailbreak Testing',
    category: 'Engineering & Safety',
    execOwner: 'I',
    prodOwner: 'C',
    tsOwner: 'A',
    privacyOwner: 'I',
    legalOwner: 'I',
    engOwner: 'R',
    description: 'Adversarial testing against grooming, self-harm, hate speech, and PII extraction.'
  },
  {
    activity: 'Design Review Gate (Go/No-Go Launch Approval)',
    category: 'Governance & Gate',
    execOwner: 'A',
    prodOwner: 'R',
    tsOwner: 'R',
    privacyOwner: 'R',
    legalOwner: 'R',
    engOwner: 'I',
    description: 'Formal multi-stakeholder sign-off before production release.'
  },
  {
    activity: 'CSAM & CSAE Automated Detection & Law Enforcement Reporting',
    category: 'Incident & Operations',
    execOwner: 'A',
    prodOwner: 'I',
    tsOwner: 'R',
    privacyOwner: 'I',
    legalOwner: 'C',
    engOwner: 'C',
    description: 'Instant hash matching, PhotoDNA, and mandatory reporting to NCRB/NCPCR.'
  },
  {
    activity: 'Grievance Redressal (IT Rules 2021 24h/36h Takedown)',
    category: 'Legal & Operations',
    execOwner: 'I',
    prodOwner: 'I',
    tsOwner: 'R',
    privacyOwner: 'C',
    legalOwner: 'A',
    engOwner: 'I',
    description: 'Actioning user and regulatory complaints within statutory timeframes.'
  },
  {
    activity: 'Algorithmic Audit & Recommendation Safety Calibration',
    category: 'AI System Governance',
    execOwner: 'I',
    prodOwner: 'C',
    tsOwner: 'C',
    privacyOwner: 'I',
    legalOwner: 'I',
    engOwner: 'A',
    description: 'Auditing feeds to eliminate addictive rabbit holes and content amplification risks.'
  },
  {
    activity: 'Monthly India Regulatory Compliance Reporting',
    category: 'Compliance & Legal',
    execOwner: 'A',
    prodOwner: 'I',
    tsOwner: 'C',
    privacyOwner: 'C',
    legalOwner: 'R',
    engOwner: 'I',
    description: 'Public disclosure of complaints received and actions taken under IT Rules 2021.'
  }
];

export const ESCALATION_LEVELS: EscalationLevel[] = [
  {
    level: 1,
    name: 'Operational & Automated Containment',
    timeframe: '< 15 Minutes',
    triggerCondition: 'Automated classifier detection of high-risk text/media, user reporting spike, or minor policy violations.',
    keyDeciders: ['T&S Operations Lead', 'Senior Safety Moderator', 'Duty Engineer'],
    actionProtocol: 'Immediate temporary shadow-ban or content removal, automated prompt block, logging incident ticket in T&S queue.'
  },
  {
    level: 2,
    name: 'Cross-Functional Incident Committee',
    timeframe: '< 1 Hour',
    triggerCondition: 'Confirmed CSAM/CSAE attempt, systemic jailbreak exploit, self-harm/suicide risk, or severe cyberbullying.',
    keyDeciders: ['Head of T&S', 'Lead Legal Counsel', 'DPO', 'Product Lead'],
    actionProtocol: 'Account suspension, technical hotfix deployment, law enforcement notification draft, internal post-mortem initiation.'
  },
  {
    level: 3,
    name: 'Executive & Regulatory Crisis Command',
    timeframe: '< 2 Hours',
    triggerCondition: 'Critical breach of DPDP Act 2023, law enforcement warrant (POCSO/IT Act), media/public escalation, or child safety casualty event.',
    keyDeciders: ['CEO', 'Chief Trust & Safety Officer', 'General Counsel', 'Resident Grievance Officer'],
    actionProtocol: 'Product kill-switch execution if needed, formal reporting to NCPCR, CERT-In, and MeitY, public crisis statement release.'
  }
];
