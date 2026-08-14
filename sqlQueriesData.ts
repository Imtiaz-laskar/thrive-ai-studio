import { SafetyMetric } from '../types/framework';

export const SAFETY_METRICS_DATA: SafetyMetric[] = [
  {
    id: 'met_01',
    name: 'CSAM Zero-Tolerance Interceptions',
    category: 'Safety',
    unit: 'incidents',
    currentValue: 0,
    targetThreshold: 0,
    trend: 'stable',
    status: 'good',
    description: 'Total number of PhotoDNA / PDQ media hash matches and generative AI synthetic CSAM prompt attempts blocked.',
    sqlQuery: `SELECT 
  COUNT(*) as csam_blocked_count,
  DATE(created_at) as event_date,
  detection_engine
FROM safety_audit_logs
WHERE event_type IN ('CSAM_HASH_MATCH', 'SYNTHETIC_CSAM_PROMPT_BLOCK')
  AND created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY 2, 3
ORDER BY event_date DESC;`
  },
  {
    id: 'met_02',
    name: 'Unsafe Prompt Interception Rate (AI Safety Proxy)',
    category: 'AI System',
    unit: '%',
    currentValue: 99.4,
    targetThreshold: 98.0,
    trend: 'up',
    status: 'good',
    description: 'Percentage of toxic, self-harm, grooming, or jailbreak prompts successfully intercepted by safety firewall before model inference.',
    sqlQuery: `SELECT 
  ROUND(
    (COUNT(CASE WHEN safety_decision = 'BLOCKED' THEN 1 END) * 100.0) / COUNT(*), 
    2
  ) as interception_percentage,
  threat_category
FROM ai_prompt_telemetry
WHERE is_minor_session = TRUE
  AND created_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY threat_category;`
  },
  {
    id: 'met_03',
    name: 'Verifiable Parental Consent (VPC) Conversion Rate',
    category: 'Privacy',
    unit: '%',
    currentValue: 88.2,
    targetThreshold: 85.0,
    trend: 'up',
    status: 'good',
    description: 'Percentage of minor onboarding attempts where parent/guardian successfully completes DigiLocker / Aadhaar VID / OTP consent.',
    sqlQuery: `SELECT 
  ROUND(
    (COUNT(CASE WHEN status = 'CONSENT_VERIFIED' THEN 1 END) * 100.0) / COUNT(*), 
    2
  ) as vpc_success_rate,
  verification_method
FROM parental_consent_audit_log
WHERE request_timestamp >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY verification_method;`
  },
  {
    id: 'met_04',
    name: 'DPDP Sec 9 Erasure & Deletion SLA Compliance',
    category: 'Privacy',
    unit: '%',
    currentValue: 100.0,
    targetThreshold: 100.0,
    trend: 'stable',
    status: 'good',
    description: 'Percentage of minor data erasure and account deletion requests completed within statutory SLA (<48 hours).',
    sqlQuery: `SELECT 
  COUNT(*) as total_erasure_requests,
  COUNT(CASE WHEN completed_at <= requested_at + INTERVAL '48 hours' THEN 1 END) as compliant_requests,
  ROUND(
    (COUNT(CASE WHEN completed_at <= requested_at + INTERVAL '48 hours' THEN 1 END) * 100.0) / COUNT(*), 
    2
  ) as sla_compliance_pct
FROM dpdp_data_erasure_queue
WHERE requested_at >= CURRENT_DATE - INTERVAL '30 days';`
  },
  {
    id: 'met_05',
    name: 'IT Rules 2021 Grievance Takedown SLA Compliance',
    category: 'Trust & Compliance',
    unit: '%',
    currentValue: 98.7,
    targetThreshold: 95.0,
    trend: 'up',
    status: 'good',
    description: 'Percentage of user/parent complaints actioned and resolved within 24 hours under Rule 3(2)(b).',
    sqlQuery: `SELECT 
  COUNT(*) as total_grievances,
  AVG(EXTRACT(EPOCH FROM (resolved_at - acknowledged_at))/3600.0) as avg_resolution_hours,
  COUNT(CASE WHEN resolved_at <= created_at + INTERVAL '24 hours' THEN 1 END) as resolved_within_24h
FROM resident_grievance_tickets
WHERE is_minor_related = TRUE
  AND created_at >= CURRENT_DATE - INTERVAL '30 days';`
  },
  {
    id: 'met_06',
    name: 'AI Model Safety False Positive / False Negative Rate',
    category: 'AI System',
    unit: '%',
    currentValue: 1.2,
    targetThreshold: 2.0,
    trend: 'down',
    status: 'good',
    description: 'Percentage of safe user prompts falsely blocked (over-refusal) or unsafe prompts missed (under-refusal).',
    sqlQuery: `SELECT 
  ROUND((COUNT(CASE WHEN audit_status = 'FALSE_POSITIVE' THEN 1 END) * 100.0) / COUNT(*), 2) as fp_rate,
  ROUND((COUNT(CASE WHEN audit_status = 'FALSE_NEGATIVE' THEN 1 END) * 100.0) / COUNT(*), 2) as fn_rate
FROM safety_model_human_audits
WHERE audited_at >= CURRENT_DATE - INTERVAL '7 days';`
  }
];
