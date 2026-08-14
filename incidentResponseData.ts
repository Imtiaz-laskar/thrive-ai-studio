import { IncidentSLA } from '../types/framework';

export const INCIDENT_SLAS: IncidentSLA[] = [
  {
    severity: 'Critical',
    triageSLA: '< 15 Minutes',
    containmentSLA: '< 1 Hour',
    resolutionSLA: '< 4 Hours',
    regulatoryReportingSLA: '< 1 Hour (NCRB/NCMEC) / < 6 Hours (CERT-In) / < 24 Hours (IT Rules 2021)',
    notificationTargets: ['CEO', 'Chief Trust Officer', 'General Counsel', 'DPO', 'Resident Grievance Officer', 'Engineering On-Call'],
    exampleTriggers: [
      'Confirmed CSAM / CSAE upload or generation',
      'Active suicide / self-harm threat in progress',
      'Live grooming or abduction threat reported',
      'Mass PII breach involving DPDP Act Sec 9 child data',
      'Law enforcement warrant under POCSO Act / IT Act Sec 91'
    ]
  },
  {
    severity: 'High',
    triageSLA: '< 30 Minutes',
    containmentSLA: '< 4 Hours',
    resolutionSLA: '< 24 Hours',
    regulatoryReportingSLA: '< 24 Hours (IT Rules 2021 Takedown Mandate)',
    notificationTargets: ['Head of Trust & Safety', 'Lead Legal Counsel', 'Privacy Lead', 'Product Manager'],
    exampleTriggers: [
      'Systemic LLM jailbreak producing non-consensual deepfakes',
      'Severe cyberbullying or doxxing targeting a minor',
      'Detection of unauthorized tracking / profiling pixel on minor accounts',
      'High-volume prompt injection exposing system prompts'
    ]
  },
  {
    severity: 'Medium',
    triageSLA: '< 2 Hours',
    containmentSLA: '< 12 Hours',
    resolutionSLA: '< 48 Hours',
    regulatoryReportingSLA: 'Included in Monthly IT Rules Compliance Report',
    notificationTargets: ['T&S Operational Lead', 'Product Manager', 'Safety Engineer'],
    exampleTriggers: [
      'Isolated toxic content report in minor chat',
      'Parental consent verification flow failure spike (>5%)',
      'Age-inappropriate content recommendation in secondary feed',
      'Dark pattern user complaint'
    ]
  },
  {
    severity: 'Low',
    triageSLA: '< 8 Hours',
    containmentSLA: '< 48 Hours',
    resolutionSLA: '< 5 Days',
    regulatoryReportingSLA: 'Standard Internal Quarterly Review',
    notificationTargets: ['T&S Queue Moderator', 'QA Engineer'],
    exampleTriggers: [
      'Minor UI bug in safety reporting flow',
      'Inaccurate vernacular translation in safety help page',
      'Spam or duplicate reporting ticket'
    ]
  }
];

export const INCIDENT_STAGES = [
  {
    stage: 1,
    name: 'Detection & Ingestion',
    description: 'Incident signal received via user reporting, automated CSAM scanners, safety proxy firewall, law enforcement notice, or CERT-In alert.',
    actions: ['Capture full telemetry & raw payload', 'Assign unique Incident Tracking ID', 'Automated severity classification']
  },
  {
    stage: 2,
    name: 'Triage & Verification',
    description: 'Duty T&S analyst verifies report authenticity, checks user age status, and evaluates immediate child risk level against SLA matrix.',
    actions: ['Validate minor status', 'Check if CSAM or suicide risk exists', 'Set SLA countdown timer']
  },
  {
    stage: 3,
    name: 'Immediate Containment',
    description: 'Execute technical containment to stop ongoing harm or spread.',
    actions: ['Block user/account/IP', 'Quarantine content binary', 'Trigger emergency helpline popups', 'Apply prompt firewall hotfix']
  },
  {
    stage: 4,
    name: 'Investigation & Preservation',
    description: 'Deep technical and policy analysis. Preserve chain of custody for legal reporting.',
    actions: ['Secure encrypted audit logs', 'Extract chat history and metadata', 'Conduct model prompt reconstruction']
  },
  {
    stage: 5,
    name: 'Regulatory & Legal Escalation',
    description: 'File statutory reports required under Indian law.',
    actions: ['File CSAM report to NCRB / CyberCrime Portal', 'Notify CERT-In if cyber security breach', 'Update Grievance Officer log']
  },
  {
    stage: 6,
    name: 'Remediation & Post-Mortem',
    description: 'Root cause analysis, model retraining, safety filter updates, and policy review.',
    actions: ['Deploy model patch', 'Update red-teaming test suite', 'Conduct cross-functional post-mortem within 72 hours']
  }
];

export const SIMULATION_SCENARIOS = [
  {
    id: 'scen_csam',
    title: 'Scenario A: CSAM Image Generation Prompt Attempt',
    description: 'A malicious user attempts to bypass LLM image generation guardrails to synthesize explicit images of a minor.',
    correctSeverity: 'Critical' as const,
    recommendedSteps: [
      '1. Safety proxy intercepts prompt in real-time and blocks generation (< 50ms).',
      '2. Account immediately locked and IP flagged in T&S security console.',
      '3. Raw prompt logs and account metadata isolated in encrypted legal vault.',
      '4. Resident Grievance Officer and Legal notified for mandatory reporting to NCRB / NCMEC within 1 hour.',
      '5. Safety engineering adds prompt vector to automated regression test suite.'
    ]
  },
  {
    id: 'scen_suicide',
    title: 'Scenario B: Minor Expressing Active Self-Harm Ideation',
    description: 'A 14-year-old user expresses severe distress and asks an AI chatbot for instructions on self-harm.',
    correctSeverity: 'Critical' as const,
    recommendedSteps: [
      '1. Sentiment & keyword classifier detects self-harm intent with high confidence.',
      '2. AI output blocked; replaced with compassionate crisis intercept card showing Tele-MANAS (14416) & Childline (1098).',
      '3. High-priority alert triggered in 24/7 T&S emergency queue for human safety reviewer review.',
      '4. If imminent danger indicated, alert Safety Lead for proactive outreach per emergency protocol.',
      '5. Conversation thread flagged for safety system prompt boundary calibration.'
    ]
  },
  {
    id: 'scen_deepfake',
    title: 'Scenario C: Classmate Deepfake Cyberbullying Complaint',
    description: 'A parent submits an urgent grievance reporting that an AI image swap feature was used to create non-consensual face-swap photos of their daughter.',
    correctSeverity: 'High' as const,
    recommendedSteps: [
      '1. Resident Grievance Officer acknowledges complaint within 24 hours under IT Rules 2021.',
      '2. Images removed from platform within 24 hours per Rule 3(2)(b).',
      '3. Perpetrator account suspended pending policy investigation.',
      '4. Face-swap feature disabled for all minor accounts as preventative measure.',
      '5. Formal response and resolution letter issued to parent.'
    ]
  }
];
