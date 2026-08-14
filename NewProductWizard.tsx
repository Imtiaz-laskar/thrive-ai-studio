import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  FileText,
  Building2,
  Cpu,
  Layers,
  Lock,
  Download,
  Check,
  Zap,
  Info
} from 'lucide-react';

interface NewProductWizardProps {
  onCompleteWizard?: (productData: any) => void;
  onCancel?: () => void;
}

export const NewProductWizard: React.FC<NewProductWizardProps> = ({ onCompleteWizard, onCancel }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [productInfo, setProductInfo] = useState({
    name: 'ThriveSafe Smart Tutor Bot',
    version: 'v1.0.0',
    category: 'Educational Generative AI',
    description: 'Conversational LLM tutor providing personalized math and science homework assistance to school students.',
    targetAgeRange: 'under_13', // 'under_13', '13_15', '16_17'
    isPublicFacing: true,
    hasDirectMessaging: false,
    collectsPII: true,
    usesGenAI: true
  });

  const [riskScores, setRiskScores] = useState({
    genAiImpact: 3,
    privacyImpact: 4,
    interpersonalRisk: 2,
    autonomyLevel: 3
  });

  const [complianceChecks, setComplianceChecks] = useState({
    digiLockerVpc: true,
    zeroProfiling: true,
    promptFirewall: true,
    rgoAppointed: true,
    csamHasher: true
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const steps = [
    { num: 1, title: 'Product Info' },
    { num: 2, title: 'Child Access' },
    { num: 3, title: 'Risk Scoring' },
    { num: 4, title: 'Compliance Review' },
    { num: 5, title: 'Threat Modeling' },
    { num: 6, title: 'Launch Decision' },
    { num: 7, title: 'Audit Package' }
  ];

  const calculateOverallScore = () => {
    const raw = (riskScores.genAiImpact + riskScores.privacyImpact + riskScores.interpersonalRisk + riskScores.autonomyLevel) * 5;
    return Math.min(100, Math.max(0, 100 - raw));
  };

  const score = calculateOverallScore();

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 space-y-6">
      {/* Wizard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-4 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded uppercase border border-blue-200">
              Guided Workflow
            </span>
            <h2 className="text-lg font-bold text-slate-900">New AI Product Pre-Build Assessment Wizard</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Step-by-step statutory evaluation mapping DPDP Act 2023 Sec 9, IT Rules 2021, and POCSO Act requirements.
          </p>
        </div>

        {onCancel && (
          <button
            onClick={onCancel}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold transition-colors cursor-pointer self-start md:self-auto"
          >
            Close Wizard
          </button>
        )}
      </div>

      {/* Steps Indicator Bar */}
      <div className="flex items-center justify-between overflow-x-auto py-2 no-scrollbar border-b border-slate-100">
        {steps.map((step) => {
          const isActive = currentStep === step.num;
          const isDone = currentStep > step.num;
          return (
            <div
              key={step.num}
              onClick={() => setCurrentStep(step.num)}
              className={`flex items-center space-x-2 cursor-pointer transition-all px-2 py-1 rounded text-xs whitespace-nowrap ${
                isActive
                  ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200'
                  : isDone
                  ? 'text-emerald-700 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : isDone
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isDone ? <Check className="w-3 h-3" /> : step.num}
              </div>
              <span>{step.title}</span>
            </div>
          );
        })}
      </div>

      {/* STEP 1: Product Information */}
      {currentStep === 1 && (
        <div className="space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Step 1: Product Profile & Operational Scope</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Product Name</label>
              <input
                type="text"
                value={productInfo.name}
                onChange={(e) => setProductInfo({ ...productInfo, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Version & Build</label>
              <input
                type="text"
                value={productInfo.version}
                onChange={(e) => setProductInfo({ ...productInfo, version: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Product Domain</label>
              <select
                value={productInfo.category}
                onChange={(e) => setProductInfo({ ...productInfo, category: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="Educational Generative AI">Educational Generative AI</option>
                <option value="Social Companion / Chatbot">Social Companion / Chatbot</option>
                <option value="Gaming & Digital Playground">Gaming & Digital Playground</option>
                <option value="Content Recommendation Feed">Content Recommendation Feed</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Primary Age Tier Focus</label>
              <select
                value={productInfo.targetAgeRange}
                onChange={(e) => setProductInfo({ ...productInfo, targetAgeRange: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="under_13">Children Under 13 (Strict VPC Mandate)</option>
                <option value="13_15">Adolescents 13–15 (Parental Notification)</option>
                <option value="16_17">Young Adults 16–17 (Privacy Safeguards)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Functional Description</label>
            <textarea
              rows={3}
              value={productInfo.description}
              onChange={(e) => setProductInfo({ ...productInfo, description: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      )}

      {/* STEP 2: Child Access Assessment */}
      {currentStep === 2 && (
        <div className="space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>Step 2: Child Access & Interaction Touchpoints</span>
          </h3>

          <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={productInfo.isPublicFacing}
                onChange={(e) => setProductInfo({ ...productInfo, isPublicFacing: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="font-semibold text-slate-800">
                Is the application publicly accessible on the internet without invite restrictions?
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={productInfo.hasDirectMessaging}
                onChange={(e) => setProductInfo({ ...productInfo, hasDirectMessaging: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="font-semibold text-slate-800">
                Does the feature enable peer-to-peer or adult-to-minor direct chat/messaging?
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={productInfo.collectsPII}
                onChange={(e) => setProductInfo({ ...productInfo, collectsPII: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="font-semibold text-slate-800">
                Does the system process personal identifiable information (PII, location, device ID)?
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={productInfo.usesGenAI}
                onChange={(e) => setProductInfo({ ...productInfo, usesGenAI: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="font-semibold text-slate-800">
                Does the system utilize generative AI models (LLMs, text-to-image, speech)?
              </span>
            </label>
          </div>
        </div>
      )}

      {/* STEP 3: Risk Scoring */}
      {currentStep === 3 && (
        <div className="space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>Step 3: Child Safety Exposure Index Calculation</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
              <label className="block font-bold text-slate-800">Generative AI Hallucination & Harm Impact (1-5)</label>
              <input
                type="range"
                min="1"
                max="5"
                value={riskScores.genAiImpact}
                onChange={(e) => setRiskScores({ ...riskScores, genAiImpact: Number(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1: Minor</span>
                <span className="font-bold text-slate-900">{riskScores.genAiImpact}/5</span>
                <span>5: Critical</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
              <label className="block font-bold text-slate-800">Minor Privacy & Data Leakage Risk (1-5)</label>
              <input
                type="range"
                min="1"
                max="5"
                value={riskScores.privacyImpact}
                onChange={(e) => setRiskScores({ ...riskScores, privacyImpact: Number(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1: Minimal Data</span>
                <span className="font-bold text-slate-900">{riskScores.privacyImpact}/5</span>
                <span>5: High PII Scope</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-blue-800 block">Calculated Child Safety Index</span>
              <span className="text-2xl font-black text-blue-900 font-mono">{score} / 100</span>
            </div>
            <span className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold uppercase">
              {score >= 80 ? 'LOW RISK' : score >= 50 ? 'MEDIUM RISK' : 'HIGH RISK'}
            </span>
          </div>
        </div>
      )}

      {/* STEP 4: Compliance Review */}
      {currentStep === 4 && (
        <div className="space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Step 4: Statutory DPDP Act & IT Rules Compliance Gate</span>
          </h3>

          <div className="space-y-2.5">
            <label className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200 cursor-pointer">
              <span className="font-semibold text-slate-800">
                DigiLocker / Aadhaar VID Verifiable Parental Consent (VPC) Integration [DPDP Sec 9(1)]
              </span>
              <input
                type="checkbox"
                checked={complianceChecks.digiLockerVpc}
                onChange={(e) => setComplianceChecks({ ...complianceChecks, digiLockerVpc: e.target.checked })}
                className="rounded text-blue-600"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200 cursor-pointer">
              <span className="font-semibold text-slate-800">
                Zero Behavioral Profiling & Ad-Tracker Exclusion Verified [DPDP Sec 9(2)]
              </span>
              <input
                type="checkbox"
                checked={complianceChecks.zeroProfiling}
                onChange={(e) => setComplianceChecks({ ...complianceChecks, zeroProfiling: e.target.checked })}
                className="rounded text-blue-600"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200 cursor-pointer">
              <span className="font-semibold text-slate-800">
                24-Hour IT Rules Takedown Pipeline connected to Resident Grievance Officer (RGO)
              </span>
              <input
                type="checkbox"
                checked={complianceChecks.rgoAppointed}
                onChange={(e) => setComplianceChecks({ ...complianceChecks, rgoAppointed: e.target.checked })}
                className="rounded text-blue-600"
              />
            </label>
          </div>
        </div>
      )}

      {/* STEP 5: Threat Modeling */}
      {currentStep === 5 && (
        <div className="space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-purple-600" />
            <span>Step 5: Pre-Build AI Threat Modeling Verification</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-slate-800">
              <span className="font-bold text-emerald-900 block mb-1">Grooming Classifier</span>
              <p className="text-[11px] text-emerald-800">Real-time NLP intent analyzer blocking predatory contact.</p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-slate-800">
              <span className="font-bold text-emerald-900 block mb-1">Synthetic CSAM Matcher</span>
              <p className="text-[11px] text-emerald-800">PhotoDNA and PDQ image hash matcher active on upload streams.</p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: Launch Decision */}
      {currentStep === 6 && (
        <div className="space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Step 6: Executive Launch Gate Decision</span>
          </h3>

          <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-xl space-y-2 text-emerald-950">
            <div className="flex items-center space-x-2 font-bold text-sm text-emerald-900">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>LAUNCH GATE STATUS: APPROVED WITH MANDATORY MONITORING</span>
            </div>
            <p className="text-xs text-emerald-800">
              Product <strong>{productInfo.name}</strong> satisfies all statutory requirements under the Digital Personal Data Protection Act 2023 and IT Rules 2021.
            </p>
          </div>
        </div>
      )}

      {/* STEP 7: Audit Package */}
      {currentStep === 7 && (
        <div className="space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Step 7: Audit-Ready Compliance Package Generation</span>
          </h3>

          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3 font-mono">
            <div className="flex justify-between items-center text-xs text-emerald-400 font-bold border-b border-slate-800 pb-2">
              <span>CERTIFICATE ID: THRIVESAFE-AUDIT-2026-9102</span>
              <span>PASSED</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Cryptographically timestamped record generated for product release <strong>{productInfo.name} ({productInfo.version})</strong>.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setIsSubmitted(true);
                if (onCompleteWizard) onCompleteWizard(productInfo);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded flex items-center space-x-2 cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export Signed Audit Package (.MD)</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Footer Buttons */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs">
        <button
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold rounded flex items-center space-x-1.5 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous Step</span>
        </button>

        <span className="font-mono text-slate-500 text-[11px]">
          Step {currentStep} of 7
        </span>

        {currentStep < 7 ? (
          <button
            onClick={() => setCurrentStep((prev) => Math.min(7, prev + 1))}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm"
          >
            <span>Next Step</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <span className="text-emerald-700 font-bold flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Workflow Completed</span>
          </span>
        )}
      </div>
    </div>
  );
};
