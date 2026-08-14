export type AgeTier = 'under_13' | '13_to_15' | '16_to_17' | 'all_minors';

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type ProductType = 
  | 'Conversational AI / Chatbot'
  | 'Generative Media (Image/Video/Audio)'
  | 'Social & Community Platform'
  | 'Gaming & Virtual World'
  | 'EdTech & Learning System'
  | 'Recommendation & Feed Algorithm'
  | 'Voice Assistant / Audio AI';

export interface RACIItem {
  activity: string;
  category: string;
  execOwner: 'R' | 'A' | 'C' | 'I';
  prodOwner: 'R' | 'A' | 'C' | 'I';
  tsOwner: 'R' | 'A' | 'C' | 'I';
  privacyOwner: 'R' | 'A' | 'C' | 'I';
  legalOwner: 'R' | 'A' | 'C' | 'I';
  engOwner: 'R' | 'A' | 'C' | 'I';
  description: string;
}

export interface GovernanceRole {
  title: string;
  department: string;
  primaryMandate: string;
  keyDeliverables: string[];
  escalationTrigger: string;
}

export interface EscalationLevel {
  level: number;
  name: string;
  timeframe: string;
  triggerCondition: string;
  keyDeciders: string[];
  actionProtocol: string;
}

export interface ThreatVector {
  id: string;
  title: string;
  category: 'Child Exploitation' | 'AI Toxicity & Harassment' | 'Mental Health & Self-Harm' | 'Privacy & PII Exposure' | 'Manipulative AI' | 'Financial & Dark Patterns' | 'Algorithmic Bias';
  severity: RiskLevel;
  description: string;
  indiaLegalRef: string;
  detectionMethods: string[];
  preventionControls: string[];
  escalationProtocol: string;
  exampleScenario: string;
}

export interface DesignRequirement {
  id: string;
  domain: 'UX & Accessibility' | 'DPDP Privacy & Consent' | 'AI System Guardrails' | 'Recommendation Safety';
  title: string;
  summary: string;
  ageScope: AgeTier[];
  indiaClause: string;
  implementationGuidance: string;
  verificationMethod: string;
  mandatoryForLaunch: boolean;
}

export interface GateChecklistItem {
  id: string;
  category: 'Trust & Safety' | 'DPDP Privacy' | 'Legal & Regulatory' | 'Engineering & AI Ethics' | 'Product UX';
  question: string;
  requirementDetail: string;
  isBlocking: boolean;
  status?: 'pass' | 'fail' | 'conditional' | 'pending';
  notes?: string;
}

export interface IncidentSLA {
  severity: RiskLevel;
  triageSLA: string;
  containmentSLA: string;
  resolutionSLA: string;
  regulatoryReportingSLA: string;
  notificationTargets: string[];
  exampleTriggers: string[];
}

export interface IndiaLegalClause {
  lawName: string;
  sectionRef: string;
  keyProvision: string;
  childSafetyMandate: string;
  penaltyOrConsequence: string;
  operationalChecklist: string[];
}

export interface LifecycleStage {
  id: number;
  name: string;
  shortCode: string;
  owner: string;
  keyActivities: string[];
  mandatoryOutputs: string[];
  gateCriteria: string;
  indiaComplianceTouchpoint: string;
}

export interface MaturityDimension {
  id: string;
  dimension: string;
  level1: string; // Ad-hoc
  level2: string; // Reactive
  level3: string; // Defined
  level4: string; // Managed
  level5: string; // Optimizing
}

export interface SafetyMetric {
  id: string;
  name: string;
  category: 'Safety' | 'AI System' | 'Privacy' | 'Trust & Compliance';
  unit: string;
  currentValue: number;
  targetThreshold: number;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
  description: string;
  sqlQuery: string;
}

export interface StakeholderApprovalRecord {
  id: string;
  stakeholderName: string;
  role: string;
  department: string;
  milestone: string;
  status: 'Approved' | 'Conditionally Approved' | 'Rejected' | 'Pending Review';
  timestamp: string;
  digitalSignatureHash: string;
  signatureType: 'Cryptographic Hash' | 'SSO Authenticated' | 'Biometric/Canvas';
  complianceNotes: string;
  riskCategory: 'DPDP Privacy' | 'CSAM & Zero Tolerance' | 'AI Guardrails' | 'General Governance';
  verificationStatus: 'Valid' | 'Flagged' | 'Pending Verification';
  verifiedByIp?: string;
}

