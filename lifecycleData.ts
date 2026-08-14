import { LifecycleStage } from '../types/framework';

export const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    id: 1,
    name: 'Ideation & Product Scoping',
    shortCode: 'IDEA',
    owner: 'Product Manager',
    keyActivities: [
      'Define target user personas and determine minor exposure probability.',
      'Check if product scope involves children under 18 in India.',
      'Draft high-level product feature capabilities matrix.'
    ],
    mandatoryOutputs: ['Product Brief with Minor User Declaration', 'Initial Audience Risk Flag'],
    gateCriteria: 'Sign-off from PM declaring expected age demographic.',
    indiaComplianceTouchpoint: 'DPDP Act 2023 applicability determination.'
  },
  {
    id: 2,
    name: 'Child Safety Risk Assessment',
    shortCode: 'RISK',
    owner: 'Trust & Safety Lead & DPO',
    keyActivities: [
      'Execute 5-Factor Risk Assessment scoring tool.',
      'Conduct Child Rights Impact Assessment (CRIA - UNCRC).',
      'Conduct Privacy Impact Assessment (DPIA - DPDP Sec 9).'
    ],
    mandatoryOutputs: ['Child Safety Impact Assessment (CSIA) Scorecard', 'Risk Categorization (Low/Med/High/Critical)'],
    gateCriteria: 'Approval from DPO and T&S Lead on risk categorization.',
    indiaComplianceTouchpoint: 'DPDP Act Sec 9(1) parental consent requirement mapping.'
  },
  {
    id: 3,
    name: 'Safety-by-Design Architecture',
    shortCode: 'DESIGN',
    owner: 'UX Designer & System Architect',
    keyActivities: [
      'Design Verifiable Parental Consent (VPC) user flow.',
      'Implement default maximum privacy settings for minor accounts.',
      'Design plain-language India vernacular safety warnings & reporting UI.'
    ],
    mandatoryOutputs: ['Age-Appropriate UX Wireframes', 'VPC Architecture Spec', 'Default Settings Matrix'],
    gateCriteria: 'UX Accessibility and Privacy-by-Design review sign-off.',
    indiaComplianceTouchpoint: 'IT Rules 2021 Rule 3(1)(a) accessibility & plain language terms.'
  },
  {
    id: 4,
    name: 'Development & Safety Guardrail Engineering',
    shortCode: 'DEV',
    owner: 'Lead Safety Engineer & Data Scientist',
    keyActivities: [
      'Integrate AI prompt safety proxy & LLM refusal system prompts.',
      'Build PhotoDNA / CSAM perceptual hashing pre-upload scanner.',
      'Implement data retention cron jobs for auto-erasure of minor logs.'
    ],
    mandatoryOutputs: ['Safety Firewall Proxy Service', 'CSAM Scanner Integration', 'PII Scrubber Pipeline'],
    gateCriteria: 'Unit test pass rate > 99% on safety filter benchmarks.',
    indiaComplianceTouchpoint: 'IT Act Sec 67B CSAM prevention technical controls.'
  },
  {
    id: 5,
    name: 'Adversarial Red-Teaming & Jailbreak Testing',
    shortCode: 'TEST',
    owner: 'Trust & Safety Red Team & QA',
    keyActivities: [
      'Run 5,000+ adversarial prompt injection tests targeting child safety.',
      'Simulate grooming, self-harm, deepfake, and PII extraction scenarios.',
      'Test parental consent bypass vulnerabilities.'
    ],
    mandatoryOutputs: ['Red-Teaming Penetration Report', 'Jailbreak Defense Scorecard (>98% refusal)'],
    gateCriteria: 'Zero critical or uncontained vulnerabilities remaining in queue.',
    indiaComplianceTouchpoint: 'CERT-In vulnerability assessment standards.'
  },
  {
    id: 6,
    name: 'Child Safety Design Review Gate (Launch Gate)',
    shortCode: 'GATE',
    owner: 'Executive Safety Committee',
    keyActivities: [
      'Review 12-point mandatory launch gating checklist.',
      'Verify DPO, Legal, T&S, and Engineering sign-offs.',
      'Formal Go / Conditional Go / No-Go decision.'
    ],
    mandatoryOutputs: ['Signed Launch Gate Certificate', 'Risk Residual Register'],
    gateCriteria: 'Unanimous sign-off from Legal, DPO, T&S, and Product Owners.',
    indiaComplianceTouchpoint: 'DPDP Act 2023 & IT Rules 2021 mandatory compliance verification.'
  },
  {
    id: 7,
    name: 'Production Release & Age Assurance Rollout',
    shortCode: 'LAUNCH',
    owner: 'Release Engineering & Operations',
    keyActivities: [
      'Staged rollout with 24/7 active safety monitoring on-call.',
      'Verify live telemetry and prompt firewall latency (<100ms).',
      'Publish Resident Grievance Officer contact details.'
    ],
    mandatoryOutputs: ['Live Service Telemetry', 'Resident Grievance Officer Registration'],
    gateCriteria: 'Zero blocking issues in canary deployment cohort.',
    indiaComplianceTouchpoint: 'IT Rules 2021 Resident Grievance Officer publication.'
  },
  {
    id: 8,
    name: 'Real-Time Safety & Privacy Telemetry',
    shortCode: 'MONITOR',
    owner: 'T&S Operations & SOC Team',
    keyActivities: [
      'Track real-time safety metrics on executive monitoring dashboard.',
      'Monitor unsafe prompt attempt spikes and model false positive/negatives.',
      'Track parental consent conversion rates and erasure requests.'
    ],
    mandatoryOutputs: ['Live Monitoring Dashboard', 'Weekly Safety Anomaly Reports'],
    gateCriteria: 'Continuous metric SLA compliance.',
    indiaComplianceTouchpoint: 'DPDP Act data retention and erasure audit logging.'
  },
  {
    id: 9,
    name: 'Incident Management & Legal Takedown Workflow',
    shortCode: 'INCIDENT',
    owner: 'Resident Grievance Officer & T&S Team',
    keyActivities: [
      'Process user reports, CSAM alerts, and law enforcement notices.',
      'Execute 24-hour IT Rules takedowns and file NCRB reports for CSAM.',
      'Maintain statutory grievance resolution register.'
    ],
    mandatoryOutputs: ['Grievance Resolution Log', 'NCRB / CERT-In Incident Reports'],
    gateCriteria: '100% adherence to 24h/36h statutory takedown SLAs.',
    indiaComplianceTouchpoint: 'IT Rules 2021 Rule 3(2)(b) & CERT-In 6-hour incident reporting.'
  },
  {
    id: 10,
    name: 'Monthly Compliance Transparency Reporting',
    shortCode: 'REPORT',
    owner: 'Legal & Public Policy Lead',
    keyActivities: [
      'Compile monthly transparency report detailing complaints received and actioned.',
      'Publish report on public company website per IT Rules 2021.',
      'Review safety metric trends with Board Executive Committee.'
    ],
    mandatoryOutputs: ['Monthly India Compliance Report', 'Board Safety Briefing'],
    gateCriteria: 'Timely public disclosure within 10 days of month-end.',
    indiaComplianceTouchpoint: 'IT Rules 2021 Rule 3(1)(d) Monthly Compliance Reporting.'
  },
  {
    id: 11,
    name: 'Continuous Learning & Model Calibration',
    shortCode: 'IMPROVE',
    owner: 'AI Safety Research & Product Team',
    keyActivities: [
      'Incorporate post-incident learnings into LLM system prompts & fine-tuning data.',
      'Update red-teaming test suites with newly discovered jailbreak patterns.',
      'Refine parental consent UX based on drop-off analytics.'
    ],
    mandatoryOutputs: ['Updated Safety Model Weights', 'Revised Safety Guidelines v2.0'],
    gateCriteria: 'Quarterly Safety Framework Version Upgrade.',
    indiaComplianceTouchpoint: 'Responsible AI & Continuous Governance standards.'
  }
];
