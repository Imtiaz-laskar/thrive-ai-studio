import { MaturityDimension } from '../types/framework';

export const MATURITY_DIMENSIONS: MaturityDimension[] = [
  {
    id: 'mat_01',
    dimension: 'Child Safety Governance & Ownership',
    level1: 'Ad-hoc: No dedicated child safety roles. Safety handled reactively upon public crisis or legal threat.',
    level2: 'Reactive: Nominated PM handles safety part-time. Basic policy exists but lacks executive enforcement.',
    level3: 'Defined: Dedicated Trust & Safety team. Formal RACI matrix with DPO, Legal, and Engineering ownership.',
    level4: 'Managed & Quantitative: Board Executive Safety Committee oversees KPIs. Annual independent safety audits.',
    level5: 'Optimizing & Industry Leading: AI Safety Chair on Board. Industry benchmark driver, contributing to global standards.'
  },
  {
    id: 'mat_02',
    dimension: 'DPDP Act Privacy & Parental Consent',
    level1: 'Ad-hoc: Standard adult privacy terms. No age check or parental consent mechanisms.',
    level2: 'Reactive: Self-declaration age checkbox ("I am over 18"). Unverified parent email input.',
    level3: 'Defined: Integrated Verifiable Parental Consent (VPC) via SMS OTP or identity verification for minors.',
    level4: 'Managed & Quantitative: Zero-tracking telemetry scrubbers hardcoded for minors with real-time audit logging.',
    level5: 'Optimizing & Industry Leading: Privacy-preserving zero-knowledge proof age verification architecture.'
  },
  {
    id: 'mat_03',
    dimension: 'AI System Guardrails & Red-Teaming',
    level1: 'Ad-hoc: Standard system prompts with no explicit child safety or jailbreak protections.',
    level2: 'Reactive: Keyword blocklist added after user complaints or model safety failures.',
    level3: 'Defined: Multi-modal real-time safety classification proxy filtering input prompts and output generations.',
    level4: 'Managed & Quantitative: Continuous adversarial red-teaming (5,000+ daily automated jailbreak simulations).',
    level5: 'Optimizing & Industry Leading: Self-healing AI safety guardrails with automated real-time alignment model fine-tuning.'
  },
  {
    id: 'mat_04',
    dimension: 'Threat Detection & CSAM Prevention',
    level1: 'Ad-hoc: Manual user reporting only. No automated media scanning.',
    level2: 'Reactive: Basic image hash scanning on reported files only.',
    level3: 'Defined: Pre-upload PhotoDNA / PDQ CSAM scanning integrated into media upload pipeline.',
    level4: 'Managed & Quantitative: Real-time ML models detecting synthetic CSAM and grooming intent in <100ms.',
    level5: 'Optimizing & Industry Leading: Zero-delay proactive threat detection with automated cross-industry hash sharing.'
  },
  {
    id: 'mat_05',
    dimension: 'Incident Response & Grievance Redressal',
    level1: 'Ad-hoc: Standard generic support email inbox. Resolution time > 14 days.',
    level2: 'Reactive: Manual ticket queue with 72-hour turnaround. Resident Grievance Officer on paper only.',
    level3: 'Defined: Structured SLA tiers (15-min Critical triage, 24-h IT Rules takedown). Dedicated India Grievance Desk.',
    level4: 'Managed & Quantitative: Automated SLA tracking with instant regulatory reporting integrations (NCRB/CERT-In).',
    level5: 'Optimizing & Industry Leading: Automated 1-click evidence packaging and proactive emergency helpline interventions.'
  },
  {
    id: 'mat_06',
    dimension: 'Algorithmic Recommendation Safety',
    level1: 'Ad-hoc: Pure engagement/watch-time optimization algorithms with zero safety weights.',
    level2: 'Reactive: Manual removal of reported viral harmful channels or accounts.',
    level3: 'Defined: Safety weights and age-appropriateness filters built into feed ranking algorithms.',
    level4: 'Managed & Quantitative: Automated circuit breakers stopping extreme content rabbit holes within 2 feed cycles.',
    level5: 'Optimizing & Industry Leading: Wellbeing-first recommendation architecture with transparent user control sliders.'
  }
];
