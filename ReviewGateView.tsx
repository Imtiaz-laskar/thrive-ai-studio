import React, { useState } from 'react';
import { GateChecklistItem } from '../types/framework';
import { ShieldAlert, CheckCircle2, XCircle, AlertTriangle, Printer, FileText, Lock, Unlock } from 'lucide-react';

const INITIAL_GATE_ITEMS: GateChecklistItem[] = [
  {
    id: 'gate_01',
    category: 'Trust & Safety',
    question: 'Is an automated pre-upload CSAM / CSAE scanner (PhotoDNA / PDQ) integrated and operational?',
    requirementDetail: 'Mandatory under IT Act Sec 67B and POCSO Act for all platforms hosting user media or generative imagery.',
    isBlocking: true,
    status: 'pass'
  },
  {
    id: 'gate_02',
    category: 'DPDP Privacy',
    question: 'Is a Verifiable Parental Consent (VPC) mechanism active for minor users under DPDP Act Sec 9(1)?',
    requirementDetail: 'Parental consent must be verified via DigiLocker, Aadhaar VID, or penny-drop before minor data processing.',
    isBlocking: true,
    status: 'pass'
  },
  {
    id: 'gate_03',
    category: 'DPDP Privacy',
    question: 'Have all third-party tracking pixels, cross-app cookies, and targeted ad SDKs been stripped for minor sessions?',
    requirementDetail: 'Direct statutory prohibition under DPDP Act Section 9(2) & 9(3).',
    isBlocking: true,
    status: 'pass'
  },
  {
    id: 'gate_04',
    category: 'Engineering & AI Ethics',
    question: 'Has real-time LLM prompt firewall proxy passed 5,000+ adversarial red-teaming jailbreak tests (>98% refusal rate)?',
    requirementDetail: 'Protects against grooming, self-harm, hate speech, and dangerous challenge outputs.',
    isBlocking: true,
    status: 'pass'
  },
  {
    id: 'gate_05',
    category: 'Legal & Regulatory',
    question: 'Is an India Resident Grievance Officer (RGO) appointed and contact details published per IT Rules 2021?',
    requirementDetail: 'Required to preserve Intermediary Safe Harbor under Section 79 of IT Act.',
    isBlocking: true,
    status: 'pass'
  },
  {
    id: 'gate_06',
    category: 'Legal & Regulatory',
    question: 'Is the 24-hour IT Rules takedown workflow & 1-hour NCRB CSAM reporting pipeline active?',
    requirementDetail: '24/7 operational triage for sexual privacy complaints and CSAM alerts.',
    isBlocking: true,
    status: 'pass'
  },
  {
    id: 'gate_07',
    category: 'Product UX',
    question: 'Are prominent one-tap emergency helpline buttons (Childline 1098 & CyberCrime 1930) embedded in chat UI?',
    requirementDetail: 'NCPCR and MHA recommended safety intervention for minor users in distress.',
    isBlocking: false,
    status: 'pass'
  },
  {
    id: 'gate_08',
    category: 'Product UX',
    question: 'Are terms of service and privacy notices available in simple India regional languages at an 8th-grade reading level?',
    requirementDetail: 'IT Rules 2021 & DPDP Act plain language notice mandate.',
    isBlocking: false,
    status: 'pass'
  },
  {
    id: 'gate_09',
    category: 'Engineering & AI Ethics',
    question: 'Are AI persona system prompts configured to prevent romantic roleplay and anthropomorphism?',
    requirementDetail: 'Prevents unhealthy parasocial bonding and emotional codependency in minors.',
    isBlocking: true,
    status: 'pass'
  },
  {
    id: 'gate_10',
    category: 'Product UX',
    question: 'Are minor account profiles set to maximum privacy defaults (private profile, search exclusion, location hidden)?',
    requirementDetail: 'Safety-by-Design privacy default standard.',
    isBlocking: false,
    status: 'pass'
  },
  {
    id: 'gate_11',
    category: 'Engineering & AI Ethics',
    question: 'Have recommendation loss functions been calibrated to break negative rabbit holes and enforce break reminders?',
    requirementDetail: 'Prevents addictive feed loops and exposure to extreme body dysmorphia content.',
    isBlocking: false,
    status: 'pass'
  },
  {
    id: 'gate_12',
    category: 'Legal & Regulatory',
    question: 'Has a formal Child Safety Impact Assessment (CSIA) report been signed off by DPO, Legal, and T&S Leads?',
    requirementDetail: 'Executive governance requirement for launch sign-off.',
    isBlocking: true,
    status: 'pass'
  }
];

export const ReviewGateView: React.FC = () => {
  const [checklist, setChecklist] = useState<GateChecklistItem[]>(INITIAL_GATE_ITEMS);
  const [productName, setProductName] = useState<string>('Project ThriveSafe Companion Bot v1.0');
  const [assessorName, setAssessorName] = useState<string>('Child Safety Review Board');

  const handleStatusChange = (id: string, newStatus: 'pass' | 'fail' | 'conditional') => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const blockingFailures = checklist.filter(item => item.isBlocking && item.status === 'fail');
  const totalFailures = checklist.filter(item => item.status === 'fail');
  const totalConditional = checklist.filter(item => item.status === 'conditional');

  let launchDecision: 'GO' | 'CONDITIONAL GO' | 'HARD NO-GO' = 'GO';
  let decisionBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  let decisionIcon = CheckCircle2;

  if (blockingFailures.length > 0) {
    launchDecision = 'HARD NO-GO';
    decisionBadge = 'bg-red-100 text-red-800 border-red-300';
    decisionIcon = XCircle;
  } else if (totalConditional.length > 0 || totalFailures.length > 0) {
    launchDecision = 'CONDITIONAL GO';
    decisionBadge = 'bg-amber-100 text-amber-800 border-amber-300';
    decisionIcon = AlertTriangle;
  }

  const DecisionIconComponent = decisionIcon;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm text-slate-900">
        <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-red-50 border border-red-200 rounded text-red-800 text-[10px] font-bold uppercase tracking-wider mb-2">
          <ShieldAlert className="w-3.5 h-3.5 text-red-700" />
          <span>Section 4: Launch Governance Gate</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
          Child Safety Design Review Gate (Launch Decision Simulator)
        </h1>
        <p className="text-slate-600 text-xs leading-relaxed max-w-4xl">
          Multi-stakeholder launch gating framework. Evaluates mandatory blocking criteria before code deployment to production. Any single blocking requirement failure yields an automatic HARD NO-GO.
        </p>
      </div>

      {/* Decision Summary Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Product / AI Model Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Assessing Governance Board</label>
            <input
              type="text"
              value={assessorName}
              onChange={(e) => setAssessorName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Launch Decision Output</span>
            <div className={`inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border text-xs font-extrabold uppercase ${decisionBadge}`}>
              <DecisionIconComponent className="w-3.5 h-3.5" />
              <span>{launchDecision}</span>
            </div>
            {blockingFailures.length > 0 && (
              <p className="text-[11px] text-red-700 mt-0.5 font-bold">
                {blockingFailures.length} Blocking Safety Violation(s) Detected
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>12-Point Mandatory Launch Gate Checklist</span>
          </h2>
          <span className="text-xs text-slate-500">Toggle statuses below to simulate launch decisions</span>
        </div>

        <div className="space-y-2.5">
          {checklist.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-lg border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                item.status === 'pass'
                  ? 'bg-slate-50 border-slate-200'
                  : item.status === 'fail'
                  ? item.isBlocking
                    ? 'bg-red-50 border-red-300'
                    : 'bg-red-50/50 border-red-200'
                  : 'bg-amber-50 border-amber-200'
              }`}
            >
              <div className="space-y-0.5 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-slate-200 text-slate-800 rounded">
                    {item.category}
                  </span>
                  {item.isBlocking ? (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-red-100 text-red-800 border border-red-200 rounded flex items-center space-x-1">
                      <Lock className="w-3 h-3 inline" />
                      <span>Hard Blocking Item</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded">
                      Standard Item
                    </span>
                  )}
                </div>

                <p className="font-bold text-slate-900 text-xs pt-1">{item.question}</p>
                <p className="text-[11px] text-slate-600">{item.requirementDetail}</p>
              </div>

              {/* Status Selector */}
              <div className="flex items-center space-x-1 bg-white p-1 rounded-lg border border-slate-200 shrink-0">
                <button
                  onClick={() => handleStatusChange(item.id, 'pass')}
                  className={`px-2.5 py-1 text-xs font-bold rounded transition-all cursor-pointer ${
                    item.status === 'pass' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  PASS
                </button>
                <button
                  onClick={() => handleStatusChange(item.id, 'conditional')}
                  className={`px-2.5 py-1 text-xs font-bold rounded transition-all cursor-pointer ${
                    item.status === 'conditional' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  CONDITIONAL
                </button>
                <button
                  onClick={() => handleStatusChange(item.id, 'fail')}
                  className={`px-2.5 py-1 text-xs font-bold rounded transition-all cursor-pointer ${
                    item.status === 'fail' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  FAIL
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Printable Certificate Preview */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Executive Launch Gate Certificate Preview</h2>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Audit Certificate</span>
          </button>
        </div>

        <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg space-y-3 font-mono text-xs text-slate-800">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-900 text-sm">CHILD SAFETY & PRIVACY LAUNCH AUDIT CERTIFICATE</p>
              <p className="text-[11px] text-slate-500">Framework: Guardian AI Operating Model (DPDP Act 2023 / IT Rules 2021)</p>
            </div>
            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 border border-blue-200 rounded font-bold">
              VERIFIED RECORD
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-[11px]">
            <div>
              <span className="text-slate-500 block">PRODUCT IDENTIFIER:</span>
              <span className="font-bold text-slate-900">{productName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">ASSESSING BOARD:</span>
              <span className="font-bold text-slate-900">{assessorName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">AUDIT TIMESTAMP:</span>
              <span className="font-bold text-slate-900">{new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div>
              <span className="text-slate-500 block">GATE STATUS:</span>
              <span className={`font-extrabold ${launchDecision === 'GO' ? 'text-emerald-700' : launchDecision === 'CONDITIONAL GO' ? 'text-amber-700' : 'text-red-700'}`}>
                {launchDecision}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 text-[11px]">
            <span className="text-slate-500 block mb-0.5">MANDATORY SIGN-OFF STAKEHOLDERS:</span>
            <p className="text-slate-800 font-semibold">
              [✓] Chief Trust & Safety Officer &nbsp;&nbsp;&nbsp; [✓] Data Protection Officer (DPDP Lead) &nbsp;&nbsp;&nbsp; [✓] Resident Grievance Officer & Legal Counsel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

