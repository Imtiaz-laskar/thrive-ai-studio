export interface RiskFactorQuestion {
  id: string;
  category: string;
  question: string;
  options: { label: string; score: number; detail: string }[];
}

export interface RiskHeatmapItem {
  id: string;
  name: string;
  category: 'Generative AI' | 'Interpersonal' | 'AI Behavior' | 'DPDP Privacy' | 'Algorithmic Feed' | 'Demographics';
  impact: number; // 1 (Minor) to 5 (Critical)
  likelihood: number; // 1 (Rare) to 5 (Almost Certain)
  score: number; // impact * likelihood
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  mitigation: string;
  statutoryRef: string;
}

export const CHILD_SAFETY_RISK_THREATS: RiskHeatmapItem[] = [
  {
    id: 'THREAT-01',
    name: 'Synthetic CSAM / Deepfake Generation',
    category: 'Generative AI',
    impact: 5,
    likelihood: 3,
    score: 15,
    riskLevel: 'Critical',
    description: 'Use of generative image/video models to synthesize child sexual abuse material or non-consensual deepfakes targeting minors.',
    mitigation: 'Pre-upload PhotoDNA/PDQ hash matcher, prompts blocked by firewall, zero-tolerance law enforcement reporting queue.',
    statutoryRef: 'POCSO Act 2012 Sec 14, IT Rules 2021 Rule 3(1)(b)'
  },
  {
    id: 'THREAT-02',
    name: 'Predator Grooming via Unmoderated DMs',
    category: 'Interpersonal',
    impact: 5,
    likelihood: 4,
    score: 20,
    riskLevel: 'Critical',
    description: 'Adult predators using direct messaging or open chat to groom, manipulate, or extract personal information from minor users.',
    mitigation: 'Default private accounts for minors, restricted communication to parent-approved contacts, automated grooming keyword classifiers.',
    statutoryRef: 'POCSO Act 2012 Sec 11, DPDP Act 2023 Sec 9'
  },
  {
    id: 'THREAT-03',
    name: 'LLM Jailbreak for Self-Harm / Suicide Prompts',
    category: 'AI Behavior',
    impact: 5,
    likelihood: 2,
    score: 10,
    riskLevel: 'High',
    description: 'Adversarial prompt injection bypassing LLM safety layers to produce self-harm, eating disorder, or suicide encouragement.',
    mitigation: 'Real-time prompt sanitizer, suicide crisis helpline overlay (Childline 1098 / Tele-MANAS), automated session kill-switch.',
    statutoryRef: 'BNS 2023, IT Rules 2021 Safety Guidelines'
  },
  {
    id: 'THREAT-04',
    name: 'Minor Behavioral Profiling & Targeted Ads',
    category: 'DPDP Privacy',
    impact: 4,
    likelihood: 4,
    score: 16,
    riskLevel: 'Critical',
    description: 'Tracking minor user actions, emotional states, or search queries to build behavioral profiles or target commercial advertisements.',
    mitigation: 'Absolute code-level prohibition on ad trackers, cookie minimization, zero behavioral profiling for users < 18.',
    statutoryRef: 'DPDP Act 2023 Section 9(2)'
  },
  {
    id: 'THREAT-05',
    name: 'AI Parasocial Bonding & Anthropomorphism',
    category: 'AI Behavior',
    impact: 3,
    likelihood: 4,
    score: 12,
    riskLevel: 'High',
    description: 'Children developing unnatural emotional dependency or parasocial attachment to AI companion bots, leading to real-world isolation.',
    mitigation: 'Mandatory AI disclosure badges ("I am an AI, not a real person"), periodic break reminders, parent supervision alerts.',
    statutoryRef: 'UNCRC Article 3, NCPCR AI Guidelines'
  },
  {
    id: 'THREAT-06',
    name: 'Algorithmic Rabbit Holes & Addictive Feed',
    category: 'Algorithmic Feed',
    impact: 3,
    likelihood: 5,
    score: 15,
    riskLevel: 'Critical',
    description: 'Recommendation engines steering minors into increasingly harmful, extremist, or body-dysmorphia content loops to maximize screen time.',
    mitigation: 'Algorithmic safety caps, default screen-time reminders after 45 minutes, transparent recommendation controls.',
    statutoryRef: 'IT Rules 2021 Due Diligence, CRIA Article 3'
  },
  {
    id: 'THREAT-07',
    name: 'Age Verification Bypass / DOB Fraud',
    category: 'Demographics',
    impact: 3,
    likelihood: 4,
    score: 12,
    riskLevel: 'High',
    description: 'Minors falsifying birth dates during registration to access adult features or bypass parental consent requirements.',
    mitigation: 'Verifiable Parental Consent (VPC) via DigiLocker / Aadhaar VID, age-assurance behavioral signals, parent verification portal.',
    statutoryRef: 'DPDP Act 2023 Section 9(1)'
  },
  {
    id: 'THREAT-08',
    name: 'Unfiltered Voice / Video Stream Harassment',
    category: 'Interpersonal',
    impact: 4,
    likelihood: 3,
    score: 12,
    riskLevel: 'High',
    description: 'Exposure to inappropriate live content, cyberbullying, or verbal abuse in unmoderated live audio/video channels.',
    mitigation: 'Real-time audio toxicity classification, instant block/report button, default muted microphones for minors.',
    statutoryRef: 'IT Rules 2021 Rule 3(1)(b), BNS 2023'
  },
  {
    id: 'THREAT-09',
    name: 'Accidental Minor PII Exposure / Data Leak',
    category: 'DPDP Privacy',
    impact: 4,
    likelihood: 2,
    score: 8,
    riskLevel: 'Medium',
    description: 'Accidental exposure of child names, school locations, or contact info through unencrypted storage or public search indexing.',
    mitigation: 'PII scrubbing middleware, automatic anonymization, search index exclusion headers (noindex, nofollow).',
    statutoryRef: 'DPDP Act 2023 Sec 8 & Sec 9'
  },
  {
    id: 'THREAT-10',
    name: 'Hallucinated Advice in Educational AI',
    category: 'Generative AI',
    impact: 2,
    likelihood: 4,
    score: 8,
    riskLevel: 'Medium',
    description: 'Generative AI producing factually inaccurate or misleading answers in homework help tools without citation.',
    mitigation: 'RAG grounding on verified textbooks, confidence threshold display, clear disclaimer on factual limits.',
    statutoryRef: 'NCPCR Digital Learning Guidelines'
  }
];

export const AGE_TIER_DETAILS = [
  {
    tier: 'under_13' as const,
    label: 'Children Under 13 Years (Pre-Teens & Kids)',
    cognitiveProfile: 'Developing critical reasoning, high emotional susceptibility to AI anthropomorphism, vulnerable to dark patterns, gamification, and manipulative persona design.',
    dpdpRequirement: 'Strict Verifiable Parental Consent mandatory. Absolute prohibition on tracking, targeted ads, or behavioral profiling. Maximum privacy defaults.',
    safetyControls: 'Restricted communication (no open DMs), pre-approved text responses or strict filtered AI, strict content rating, zero location sharing.'
  },
  {
    tier: '13_to_15' as const,
    label: 'Young Teens (13–15 Years)',
    cognitiveProfile: 'High social drive, vulnerable to peer pressure, body image dysmorphia, online harassment, parasocial AI friendships, and addictive infinite scroll feeds.',
    dpdpRequirement: 'Verifiable Parental Consent required under DPDP Act 2023 (unless specific central government exemption applies). No behavioral profiling.',
    safetyControls: 'Default private accounts, restricted search indexing, suicide/self-harm prompt triggers redirecting to Childline 1098, default screen-time reminders.'
  },
  {
    tier: '16_to_17' as const,
    label: 'Older Minors / Youth (16–17 Years)',
    cognitiveProfile: 'High digital fluency, exposure to radicalization, complex romantic/sexual exploration, sophisticated jailbreak techniques, job/education scam risks.',
    dpdpRequirement: 'Protected minor data status under DPDP Act. Explicit consent & transparent data usage rights without deceptive design patterns.',
    safetyControls: 'Prohibition on adult content recommendations, algorithmic safety filters, clear reporting mechanisms, privacy exposure warnings.'
  }
];

export const RISK_ASSESSMENT_QUESTIONS: RiskFactorQuestion[] = [
  {
    id: 'product_nature',
    category: 'Product & Architecture',
    question: 'What is the primary nature of the product or AI service?',
    options: [
      { label: 'Educational tool / Offline utility with no social features', score: 5, detail: 'Low risk of unmoderated interpersonal or algorithmic harm.' },
      { label: 'Conversational AI / Interactive AI Chatbot', score: 25, detail: 'High potential for emotional dependency, hallucination, or unsafe advice.' },
      { label: 'Social Media / Open Community / Messaging Platform', score: 30, detail: 'High risk of grooming, cyberbullying, unsolicited DMs, and CSAM sharing.' },
      { label: 'Generative Media (AI Photo/Video/Voice Synthesizer)', score: 35, detail: 'Critical risk of synthetic CSAM, deepfake bullying, and voice cloning scams.' },
      { label: 'Algorithmic Content Feed / Recommendation Engine', score: 20, detail: 'High risk of algorithmic rabbit holes, radicalization, and addictive scroll.' }
    ]
  },
  {
    id: 'child_audience',
    category: 'User Demographics & Access',
    question: 'What is the likelihood and intended ratio of child users (< 18 years in India)?',
    options: [
      { label: 'Product specifically designed for & targeted at children (< 13 or 13-17)', score: 30, detail: 'Mandates full DPDP Sec 9 compliance and Child Safety by Design.' },
      { label: 'General audience product with high expected minor usage (> 20%)', score: 25, detail: 'Requires strict age assurance / gating and default minor protections.' },
      { label: 'Enterprise/B2B tool with accidental minor access possibilities (< 5%)', score: 10, detail: 'Requires basic terms enforcement and age verification.' }
    ]
  },
  {
    id: 'communication_features',
    category: 'Interpersonal & Interaction Features',
    question: 'What communication capabilities exist in the application?',
    options: [
      { label: 'No multi-user interaction or messaging capabilities', score: 0, detail: 'Zero exposure to peer-to-peer grooming or harassment.' },
      { label: 'Restricted interaction (e.g. predefined stickers, parent-approved contacts)', score: 10, detail: 'Controlled social exposure.' },
      { label: 'Direct Messaging (DMs), voice chat, or unmoderated comments', score: 30, detail: 'Critical vector for predator grooming, harassment, and PII extraction.' },
      { label: 'Live streaming or real-time unmoderated video chat', score: 40, detail: 'Extremely high risk of live child sexual exploitation and self-harm.' }
    ]
  },
  {
    id: 'ai_autonomy',
    category: 'AI Autonomy & System Behavior',
    question: 'How autonomous and reactive is the underlying AI system?',
    options: [
      { label: 'Deterministic AI / Rules-based output with zero free-form generation', score: 5, detail: 'Predictable and safe output bounds.' },
      { label: 'Fine-tuned LLM with strict system prompt guardrails & safety filters', score: 15, detail: 'Requires continuous red-teaming against jailbreaks.' },
      { label: 'Open-ended Generative AI / Companion Bot with persona memory', score: 30, detail: 'High risk of parasocial bonding, anthropomorphism, and safety bypasses.' }
    ]
  },
  {
    id: 'data_handling',
    category: 'DPDP Act Privacy & Data Practices',
    question: 'How does the product collect and process user data?',
    options: [
      { label: 'Zero personal data collection / Session-only ephemeral storage', score: 0, detail: 'Fully aligned with privacy minimization.' },
      { label: 'Standard account data with clear verifiable parental consent', score: 10, detail: 'Compliant if parental consent is validated per DPDP Act.' },
      { label: 'Continuous location tracking, behavioral profiling, or ad targeting', score: 40, detail: 'Direct violation of DPDP Act 2023 Section 9 for minors.' }
    ]
  }
];

export const IMPACT_ASSESSMENT_FRAMEWORKS = {
  cria: {
    title: 'Child Rights Impact Assessment (CRIA - UNCRC Principles)',
    description: 'Evaluates impact on the UN Convention on the Rights of the Child.',
    pillars: [
      { right: 'Article 3: Best Interests of the Child', focus: 'Product decisions must prioritize child wellbeing over monetization and engagement metrics.' },
      { right: 'Article 12: Right to Expression & Participation', focus: 'Children should have safe avenues for self-expression without predatory risks.' },
      { right: 'Article 16: Right to Privacy', focus: 'Protection from arbitrary or unlawful interference with privacy and family life.' },
      { right: 'Article 19: Protection from Violence & Abuse', focus: 'Proactive shielding against physical, mental, and digital harm or exploitation.' },
      { right: 'Article 34: Protection from Sexual Exploitation', focus: 'Zero-tolerance mechanisms against CSAM, CSAE, and sexual grooming.' }
    ]
  },
  dpia: {
    title: 'Data Protection Impact Assessment (DPIA - DPDP Act 2023 Sec 9)',
    description: 'Mandatory privacy impact evaluation under Indian Data Protection Law.',
    requirements: [
      'Verifiable Parental Consent (VPC) mechanism validated for Indian identity infrastructure.',
      'Prohibition on processing data likely to cause detrimental effect on wellbeing of a child.',
      'Complete ban on tracking, behavioral monitoring, and targeted advertising directed at children.',
      'Automated data deletion / retention caps upon reaching majority or account closure.',
      'Explicit Data Fiduciary accountability and Resident Grievance Officer accessibility.'
    ]
  },
  sia: {
    title: 'Safety Impact Assessment (SIA) & AI Harm Matrix',
    description: 'Technical evaluation of threat vectors and automated mitigations.',
    requirements: [
      'Red-teaming against prompt injections, adversarial persona prompts, and unsafe advice.',
      'Automated CSAM / CSAE hash matching integration (PhotoDNA / PDQ / CSAE classifier).',
      'Mental health emergency keyword detection linking directly to India crisis helplines.',
      'Real-time moderation escalation paths with 15-minute triage for critical harms.',
      'Parental controls dashboard for supervision without invasive surveillance.'
    ]
  }
};
