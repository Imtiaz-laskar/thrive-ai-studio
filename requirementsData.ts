import { DesignRequirement } from '../types/framework';

export const DESIGN_REQUIREMENTS: DesignRequirement[] = [
  // User Experience (UX) Requirements
  {
    id: 'ux_01',
    domain: 'UX & Accessibility',
    title: 'India Vernacular Age-Appropriate Interface & Plain Language Terms',
    summary: 'Terms of service, privacy notices, and safety guidelines must be presented in clear, simple language appropriate for minors, with multi-language support (Hindi, Tamil, Telugu, Bengali, Marathi, etc.).',
    ageScope: ['under_13', '13_to_15', '16_to_17'],
    indiaClause: 'DPDP Act 2023 Sec 5(1) & IT Rules 2021 Rule 3(1)(a)',
    implementationGuidance: 'Use visual iconography, audio read-aloud options, interactive tooltips, and simplified 8th-grade reading level summaries instead of dense legalese.',
    verificationMethod: 'Usability testing with minor cohort and readability index audit (< Grade 8 score).',
    mandatoryForLaunch: true
  },
  {
    id: 'ux_02',
    domain: 'UX & Accessibility',
    title: 'One-Tap Emergency Help & Helpline Interceptors (Childline 1098 / CyberCrime 1930)',
    summary: 'Prominent, persistent emergency safety buttons that trigger direct connection to official Indian child protection and cybercrime helplines when distress keywords are detected.',
    ageScope: ['under_13', '13_to_15', '16_to_17'],
    indiaClause: 'NCPCR Child Safety Guidelines & MHA Cyber Crime Portal Protocol',
    implementationGuidance: 'Embed non-intrusive safety badges on all chat screens. Automatically show banner with Childline 1098 and Tele-MANAS (14416) numbers if self-harm or abuse terms are typed.',
    verificationMethod: 'Automated UI test verifying helpline banner popup on key prompt triggers.',
    mandatoryForLaunch: true
  },
  {
    id: 'ux_03',
    domain: 'UX & Accessibility',
    title: 'Frictionless & Anonymous Harm Reporting Tools',
    summary: 'Minors must be able to report inappropriate behavior, grooming, harassment, or toxic AI outputs in 2 taps without fear of retaliation or public exposure.',
    ageScope: ['under_13', '13_to_15', '16_to_17'],
    indiaClause: 'IT Rules 2021 Rule 3(2)(b) & POCSO Act Safeguards',
    implementationGuidance: 'Include long-press report options on all messages, media, and AI outputs. Provide reason tags tailored for children ("Makes me uncomfortable", "Scary", "Asked for private details").',
    verificationMethod: 'End-to-end simulation of report submission to T&S triage queue.',
    mandatoryForLaunch: true
  },

  // DPDP Privacy & Consent Requirements
  {
    id: 'priv_01',
    domain: 'DPDP Privacy & Consent',
    title: 'Verifiable Parental Consent (VPC) Architecture for Minors',
    summary: 'Implement robust, legally compliant mechanism to obtain and verify parental or lawful guardian consent before processing any personal data of children.',
    ageScope: ['under_13', '13_to_15', '16_to_17'],
    indiaClause: 'Digital Personal Data Protection Act (DPDP Act) 2023 Section 9(1)',
    implementationGuidance: 'Support Aadhaar Virtual ID verification, DigiLocker integration, SMS OTP via registered parent phone number, or penny-drop bank verification as authorized by MeitY rules.',
    verificationMethod: 'Audit log inspection confirming valid parent token linked to minor account.',
    mandatoryForLaunch: true
  },
  {
    id: 'priv_02',
    domain: 'DPDP Privacy & Consent',
    title: 'Absolute Ban on Tracking & Behavioral Profiling of Minors',
    summary: 'Complete technical prohibition on tracking online behavior, cross-site cookies, device fingerprinting, and targeted advertising directed at minor accounts.',
    ageScope: ['under_13', '13_to_15', '16_to_17'],
    indiaClause: 'DPDP Act 2023 Section 9(2) & 9(3)',
    implementationGuidance: 'Hardcode telemetry scrubbers for minor sessions. Strip advertising IDs (GAID/IDFA), disable pixel tracking, and serve non-personalized contextual ads only.',
    verificationMethod: 'Network traffic proxy inspection during active minor session to ensure zero third-party tracker pings.',
    mandatoryForLaunch: true
  },
  {
    id: 'priv_03',
    domain: 'DPDP Privacy & Consent',
    title: 'Default High Privacy Settings & Minimal Data Retention',
    summary: 'Minor profiles must default to maximum privacy (private account, search indexing disabled, location hidden). Auto-delete chat logs after 30 days unless required by law.',
    ageScope: ['under_13', '13_to_15', '16_to_17'],
    indiaClause: 'DPDP Act 2023 Sec 8(7) Data Erasure Mandate',
    implementationGuidance: 'Disable public profile discovery by default. Implement automated cron jobs purging minor chat logs and AI prompt embeddings beyond retention policy.',
    verificationMethod: 'Database query verifying data deletion cron job logs.',
    mandatoryForLaunch: true
  },

  // AI System Guardrails Requirements
  {
    id: 'ai_01',
    domain: 'AI System Guardrails',
    title: 'System Prompt Persona Guardrails & Anti-Anthropomorphism Controls',
    summary: 'AI models interacting with minors must explicitly state they are AI assistants, refuse to simulate romantic or intimate relationships, and maintain healthy boundaries.',
    ageScope: ['under_13', '13_to_15', '16_to_17'],
    indiaClause: 'Responsible AI Principles (NITI Aayog) & UNCRC Art 3',
    implementationGuidance: 'Prefix all LLM prompts with immutable system instructions banning romantic roleplay, therapeutic medical advice, and parasocial friendship promises.',
    verificationMethod: 'Adversarial jailbreak benchmark suite testing persona boundaries.',
    mandatoryForLaunch: true
  },
  {
    id: 'ai_02',
    domain: 'AI System Guardrails',
    title: 'Real-time Harmful Content & Prompt Injection Firewall',
    summary: 'Deploy real-time safety classification layers to intercept self-harm, grooming prompts, CSAM references, hate speech, and dangerous challenges before output generation.',
    ageScope: ['under_13', '13_to_15', '16_to_17'],
    indiaClause: 'IT Act 2000 Sec 67B & POCSO Act Sec 13',
    implementationGuidance: 'Route all input prompts and generated responses through multi-modal safety classifiers. Block toxic tokens in <100ms with polite safety refusal templates.',
    verificationMethod: 'Automated test suite firing 5,000+ adversarial child safety prompts.',
    mandatoryForLaunch: true
  },
  {
    id: 'ai_03',
    domain: 'AI System Guardrails',
    title: 'Anti-Hallucination & Dangerous Advice Safeguards',
    summary: 'Prevent AI models from inventing dangerous medical, educational, legal, or chemical mixing instructions when queried by young users.',
    ageScope: ['under_13', '13_to_15', '16_to_17'],
    indiaClause: 'Consumer Protection Act 2019 & Unfair Trade Practices',
    implementationGuidance: 'Enforce Retrieval-Augmented Generation (RAG) backed by verified educational sources for homework help. Ground outputs and block speculative medical advice.',
    verificationMethod: 'Factuality evaluation against benchmark question set.',
    mandatoryForLaunch: true
  },

  // Recommendation Safety Requirements
  {
    id: 'rec_01',
    domain: 'Recommendation Safety',
    title: 'Rabbit-Hole Prevention & Infinite Scroll Dampening',
    summary: 'Algorithmic feeds must actively break negative recommendation feedback loops (e.g., body dysmorphia, extreme diet, self-harm content) and enforce break reminders.',
    ageScope: ['under_13', '13_to_15', '16_to_17'],
    indiaClause: 'NCPCR Advisory on Digital Addiction & Screen Time',
    implementationGuidance: 'Cap sequential recommendations of similar emotional intensity. Inject positive break nudges every 30 minutes of continuous feed usage.',
    verificationMethod: 'Simulation of algorithmic feed distribution across 100 recommendation steps.',
    mandatoryForLaunch: true
  },
  {
    id: 'rec_02',
    domain: 'Recommendation Safety',
    title: 'Prohibition on Engagement-Only Optimization & Dark Patterns',
    summary: 'Recommendation algorithms must not optimize solely for watch-time or click-through rates at the expense of minor wellbeing.',
    ageScope: ['under_13', '13_to_15', '16_to_17'],
    indiaClause: 'CCPA Guidelines on Prevention of Dark Patterns 2023',
    implementationGuidance: 'Incorporate wellbeing metrics into recommendation loss functions (e.g. diversity score, age-appropriateness index, positive sentiment weighting).',
    verificationMethod: 'Algorithmic audit of ranking model loss function coefficients.',
    mandatoryForLaunch: true
  }
];
