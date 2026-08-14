import { IndiaLegalClause } from '../types/framework';

export const INDIA_COMPLIANCE_CLAUSES: IndiaLegalClause[] = [
  {
    lawName: 'Digital Personal Data Protection Act (DPDP Act), 2023',
    sectionRef: 'Section 9(1) - Processing of Personal Data of Children',
    keyProvision: 'A Data Fiduciary shall obtain verifiable consent of the parent or lawful guardian of a child (individual under 18 years of age) before processing any personal data.',
    childSafetyMandate: 'Must deploy verified parental consent mechanisms (e.g. DigiLocker, Aadhaar VID, penny-drop bank verification) prior to onboarding or processing data of any minor in India.',
    penaltyOrConsequence: 'Penalty up to ₹200 Crore (Rupees Two Hundred Crores) for breach of obligations in relation to processing data of children under Section 9.',
    operationalChecklist: [
      'Integrated verifiable parental consent (VPC) gateway.',
      'Maintain immutable parent-minor consent audit trail.',
      'Provide easy parent consent revocation dashboard.',
      'Re-verify consent upon user reaching age 18.'
    ]
  },
  {
    lawName: 'Digital Personal Data Protection Act (DPDP Act), 2023',
    sectionRef: 'Section 9(2) & 9(3) - Restrictions on Tracking & Targeted Ads',
    keyProvision: 'A Data Fiduciary shall not undertake tracking or behavioral monitoring of children or targeted advertising directed at children. Shall not process data likely to cause detrimental effect on child wellbeing.',
    childSafetyMandate: 'Absolute prohibition on behavioral profiling, targeted ads, cross-app tracking, or predictive engagement nudging targeting minor accounts.',
    penaltyOrConsequence: 'Penalty up to ₹200 Crore under DPDP Act Schedule for violation of Section 9 provisions.',
    operationalChecklist: [
      'Disable third-party tracking pixels & SDKs for minor sessions.',
      'Strip Advertising IDs (GAID/IDFA) for minor accounts.',
      'Audit AI recommendation loss functions to eliminate behavioral profiling.',
      'Serve only context-based non-personalized advertisements.'
    ]
  },
  {
    lawName: 'Information Technology (Intermediary Guidelines) Rules, 2021',
    sectionRef: 'Rule 3(1)(b) & Rule 3(2)(b) - Safe Harbor & 24h Takedown',
    keyProvision: 'Intermediary must remove or disable access within 24 hours to content depicting non-consensual nudity, sexual act, or synthetic CSAM/deepfakes upon complaint by individual/minor.',
    childSafetyMandate: 'Mandatory 24-hour SLA for takedown of CSAM, non-consensual deepfakes, and explicit material targeting minors to maintain Section 79 Safe Harbor protection.',
    penaltyOrConsequence: 'Loss of Intermediary Safe Harbor protection under Section 79 of IT Act; direct criminal liability for hosting obscene material.',
    operationalChecklist: [
      'Appoint a Resident Grievance Officer (RGO) located in India.',
      'Publish monthly compliance transparency report detailing reports received and actioned.',
      'Maintain 24/7 priority workflow for CSAM and minor sexual privacy grievances.',
      'Acknowledge complaints within 24 hours and resolve within statutory limits.'
    ]
  },
  {
    lawName: 'Information Technology Act, 2000',
    sectionRef: 'Section 67B - Punishment for Publishing Child Explicit Content',
    keyProvision: 'Makes it a severe non-bailable criminal offence to publish, transmit, generate, or create material depicting children in sexually explicit acts or conduct online.',
    childSafetyMandate: 'Zero-tolerance technical and operational safeguards against CSAM creation, storage, or transmission on AI platforms.',
    penaltyOrConsequence: 'Imprisonment up to 5 years (7 years on second conviction) and fine up to ₹10 Lakhs.',
    operationalChecklist: [
      'Pre-upload PhotoDNA / PDQ CSAM perceptual hash scanning.',
      'Prompt blocking on generative AI models for minor-related explicit keywords.',
      'Instant automated submission of CSAM hashes to NCRB (National Crime Records Bureau).',
      'Preserve server logs and IP addresses for law enforcement subpoena.'
    ]
  },
  {
    lawName: 'Protection of Children from Sexual Offences (POCSO) Act, 2012',
    sectionRef: 'Section 19 & Section 20 - Mandatory Reporting Duty',
    keyProvision: 'Any person (including personnel of a digital platform or media house) who has apprehension or knowledge that an offence under POCSO has been committed is legally bound to report it to Special Juvenile Police Unit or local police.',
    childSafetyMandate: 'Platform employees and T&S operators must immediately report known child sexual abuse incidents to law enforcement or NCPCR.',
    penaltyOrConsequence: 'Imprisonment up to 6 months or fine for failure to report offences under POCSO Act.',
    operationalChecklist: [
      'Draft formal POCSO Law Enforcement Reporting SOP for T&S teams.',
      'Provide legal training to moderation staff on POCSO compliance.',
      'Maintain direct liaison channel with MHA National Cyber Crime Reporting Portal.'
    ]
  },
  {
    lawName: 'CERT-In Cyber Security Directions, 2022',
    sectionRef: 'Direction 6 - Cyber Security Incident Reporting within 6 Hours',
    keyProvision: 'Mandates all service providers and intermediaries to report cyber security incidents (including data breaches, unauthorized DB access, systems compromise) to CERT-In within 6 hours.',
    childSafetyMandate: 'If minor personal data or safety logs are breached or accessed by unauthorized actors, incident must be reported to CERT-In within 6 hours.',
    penaltyOrConsequence: 'Punishment under Section 70B(7) of IT Act (Imprisonment up to 1 year or fine up to ₹1 Lakh).',
    operationalChecklist: [
      'Automated SOC alert triggering 6-hour CERT-In reporting workflow.',
      'Maintain synchronized NTP clock logs for 180 days in India as mandated.'
    ]
  },
  {
    lawName: 'CCPA Guidelines on Prevention and Regulation of Dark Patterns, 2023',
    sectionRef: 'Annexure 1 - Prohibition of Dark Patterns targeting Consumers/Minors',
    keyProvision: 'Bans deceptive patterns including forced continuity, trick questions, disguised ads, bait-and-switch, and nagging targeting vulnerable consumers and children.',
    childSafetyMandate: 'Prohibit gamified addiction mechanics, hidden auto-renewals, or misleading UI buttons targeting young users.',
    penaltyOrConsequence: 'Action under Consumer Protection Act 2019 for Unfair Trade Practices.',
    operationalChecklist: [
      'UX design review against CCPA 13 recognized dark pattern categories.',
      'Prohibit countdown pressure timers on minor purchase flows.',
      'Provide simple 1-click cancellation for parent-managed subscriptions.'
    ]
  }
];
