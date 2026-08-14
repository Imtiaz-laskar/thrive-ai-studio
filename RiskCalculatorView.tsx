import React, { useState } from 'react';
import { RISK_ASSESSMENT_QUESTIONS, AGE_TIER_DETAILS, IMPACT_ASSESSMENT_FRAMEWORKS } from '../data/riskAssessmentData';
import { RiskLevel } from '../types/framework';
import { ExecutiveSummary } from './ExecutiveSummary';
import { RiskHeatmapView } from './RiskHeatmapView';
import { NewProductWizard } from './NewProductWizard';
import { Calculator, AlertTriangle, ShieldCheck, FileCheck, Layers, Info, Grid, Sparkles, Wand2 } from 'lucide-react';

export const RiskCalculatorView: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({
    product_nature: 25,
    child_audience: 25,
    communication_features: 10,
    ai_autonomy: 15,
    data_handling: 10,
  });

  const [activeTab, setActiveTab] = useState<'wizard' | 'calculator' | 'heatmap' | 'cria' | 'dpia' | 'sia'>('wizard');

  const handleOptionSelect = (questionId: string, score: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  // Calculate total risk score (max 175, scaled to 100)
  const rawScore = (Object.values(selectedAnswers) as number[]).reduce((a, b) => a + b, 0);
  const normalizedScore = Math.min(100, Math.round((rawScore / 175) * 100));

  let riskCategory: RiskLevel = 'Low';
  let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
  let cardBorder = 'border-emerald-300';

  if (normalizedScore >= 75) {
    riskCategory = 'Critical';
    badgeColor = 'bg-red-100 text-red-800 border-red-200';
    cardBorder = 'border-red-300';
  } else if (normalizedScore >= 50) {
    riskCategory = 'High';
    badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
    cardBorder = 'border-amber-300';
  } else if (normalizedScore >= 25) {
    riskCategory = 'Medium';
    badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
    cardBorder = 'border-blue-300';
  }

  return (
    <div className="space-y-6">
      {/* Executive Summary Section Header */}
      <ExecutiveSummary
        sectionNumber="Section 2"
        sectionTitle="Child Safety Pre-Build Risk Assessment & Impact Frameworks"
        badgeLabel="Pre-Build Risk Assessment"
        badgeColor="amber"
        readingTime="3 min read"
        aboutText="Quantify child safety risk before writing code. Generates age-tiered safety requirements, visualizes Impact vs. Likelihood heatmaps, and structures UNCRC (CRIA) and DPDP Act 2023 (DPIA) assessments."
        whyItMatters="Pre-build risk scoring identifies catastrophic AI safety vectors early, preventing costly architectural redesigns and ensuring statutory DPDP Act Section 9 compliance."
        keyRisks={[
          'Deploying high-autonomy generative AI without pre-build impact classification.',
          'Non-compliance with DPDP Sec 9 bans on minor profiling and targeted advertising.',
          'Inadequate protection against synthetic CSAM and predator grooming vectors.'
        ]}
        recommendedActions={[
          'Complete the 5-category Risk Factor calculator before feature freeze.',
          'Inspect the Impact vs. Likelihood Risk Heatmap to isolate critical threat vectors.',
          'Fulfill age-tiered safety controls for children under 13, 13-15, and 16-17.'
        ]}
        keyTakeaways={[
          'Calculates normalized Child Safety Exposure Index (0-100 score).',
          'Features an interactive Recharts Impact vs. Likelihood Risk Heatmap matrix.',
          'Provides structured CRIA (UNCRC), DPIA (DPDP), and SIA compliance frameworks.'
        ]}
      />

      {/* Sub-tabs Navigation */}
      <div className="flex border-b border-slate-200 space-x-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('wizard')}
          className={`pb-3 px-1 text-xs font-bold flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'wizard'
              ? 'border-blue-600 text-blue-700 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Wand2 className="w-4 h-4 text-indigo-600" />
          <span>7-Step Guided Product Wizard</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`pb-3 px-1 text-xs font-bold flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'calculator'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Interactive Risk Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('heatmap')}
          className={`pb-3 px-1 text-xs font-bold flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'heatmap'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Risk Heatmap (Impact vs Likelihood)</span>
        </button>

        <button
          onClick={() => setActiveTab('cria')}
          className={`pb-3 px-1 text-xs font-bold flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'cria'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>CRIA (UNCRC Principles)</span>
        </button>

        <button
          onClick={() => setActiveTab('dpia')}
          className={`pb-3 px-1 text-xs font-bold flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'dpia'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>DPIA (DPDP Act Sec 9)</span>
        </button>

        <button
          onClick={() => setActiveTab('sia')}
          className={`pb-3 px-1 text-xs font-bold flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'sia'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Safety & AI Harm (SIA)</span>
        </button>
      </div>

      {/* TAB 0: Guided New Product Wizard */}
      {activeTab === 'wizard' && <NewProductWizard />}

      {/* TAB 1: Calculator */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question Form Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
              <h2 className="text-base font-bold text-slate-900">Product Characteristics & Risk Factors</h2>

              {RISK_ASSESSMENT_QUESTIONS.map((q) => (
                <div key={q.id} className="space-y-2.5 pt-4 border-t border-slate-200 first:pt-0 first:border-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">{q.category}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900">{q.question}</p>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[q.id] === opt.score;
                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleOptionSelect(q.id, opt.score)}
                          className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start space-x-3 ${
                            isSelected
                              ? 'bg-blue-50 border-blue-300 text-slate-900 shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-400 bg-white'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold">{opt.label}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5">{opt.detail}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Result Scorecard Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`bg-white border-2 ${cardBorder} rounded-xl p-5 shadow-sm sticky top-24 space-y-5`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Calculated Risk Score</span>
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border uppercase ${badgeColor}`}>
                  {riskCategory} Risk
                </span>
              </div>

              <div className="text-center py-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-4xl font-black text-slate-900 font-mono tracking-tight">{normalizedScore}<span className="text-slate-400 text-xl font-normal">/100</span></div>
                <p className="text-[11px] text-slate-500 mt-0.5 font-bold uppercase tracking-wider">Child Safety Exposure Index</p>
              </div>

              {/* Action Mandates Based on Score */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Mandatory Product Requirements</h3>
                
                {riskCategory === 'Critical' && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg space-y-2 text-xs text-red-950">
                    <p className="font-bold flex items-center space-x-1.5 text-red-800">
                      <AlertTriangle className="w-4 h-4 text-red-700" />
                      <span>CRITICAL RISK PROTOCOL</span>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-slate-800 text-[11px]">
                      <li>Mandatory Executive Safety Committee review before any code deployment.</li>
                      <li>Verifiable Parental Consent (DigiLocker / Aadhaar VID) mandatory under DPDP Sec 9.</li>
                      <li>Pre-upload PhotoDNA / CSAM scanning + real-time LLM prompt firewall required.</li>
                      <li>Adversarial Red-Teaming jailbreak audit required before launch gate.</li>
                    </ul>
                  </div>
                )}

                {riskCategory === 'High' && (
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg space-y-2 text-xs text-amber-950">
                    <p className="font-bold flex items-center space-x-1.5 text-amber-800">
                      <AlertTriangle className="w-4 h-4 text-amber-700" />
                      <span>HIGH RISK PROTOCOL</span>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-slate-800 text-[11px]">
                      <li>Formal Child Safety Impact Assessment (CSIA) sign-off required.</li>
                      <li>Default private minor accounts and search index exclusion.</li>
                      <li>24-hour IT Rules takedown SLA integration with Resident Grievance Officer.</li>
                    </ul>
                  </div>
                )}

                {(riskCategory === 'Medium' || riskCategory === 'Low') && (
                  <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg space-y-2 text-xs text-blue-950">
                    <p className="font-bold flex items-center space-x-1.5 text-blue-800">
                      <ShieldCheck className="w-4 h-4 text-blue-700" />
                      <span>STANDARD / LOW RISK PROTOCOL</span>
                    </p>
                    <p className="text-[11px] text-slate-800">
                      Standard Safety-by-Design controls apply. Plain language terms, basic reporting tools, and privacy defaults required.
                    </p>
                  </div>
                )}
              </div>

              {/* Age Tier Recommendations */}
              <div className="space-y-2 pt-3 border-t border-slate-200">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Age-Tier Breakdown (India DPDP)</h3>
                <div className="space-y-2">
                  {AGE_TIER_DETAILS.map((t) => (
                    <div key={t.tier} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-0.5">
                      <span className="font-bold text-slate-900 block">{t.label}</span>
                      <p className="text-slate-600 text-[11px]">{t.dpdpRequirement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Heatmap Shortcut Banner */}
              <div className="pt-3 border-t border-slate-200">
                <button
                  onClick={() => setActiveTab('heatmap')}
                  className="w-full p-3 bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-lg text-xs font-bold flex items-center justify-between hover:from-blue-800 hover:to-slate-800 transition-all cursor-pointer shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    <Grid className="w-4 h-4 text-amber-400" />
                    <span>View Visual Risk Heatmap Matrix</span>
                  </div>
                  <span className="text-[10px] bg-blue-800 text-blue-200 px-2 py-0.5 rounded font-mono">
                    2D Matrix →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Risk Heatmap (Impact vs Likelihood) */}
      {activeTab === 'heatmap' && <RiskHeatmapView />}

      {/* TAB 2: CRIA (UNCRC Principles) */}
      {activeTab === 'cria' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
          <div>
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 rounded uppercase">
              International Rights Standard
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-2">{IMPACT_ASSESSMENT_FRAMEWORKS.cria.title}</h2>
            <p className="text-slate-600 text-xs mt-0.5">{IMPACT_ASSESSMENT_FRAMEWORKS.cria.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {IMPACT_ASSESSMENT_FRAMEWORKS.cria.pillars.map((p, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5">
                <h3 className="font-bold text-blue-800 text-xs flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>{p.right}</span>
                </h3>
                <p className="text-slate-700 text-xs leading-relaxed">{p.focus}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DPIA (DPDP Act Sec 9) */}
      {activeTab === 'dpia' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
          <div>
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 rounded uppercase">
              Mandatory Indian Statutory Audit
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-2">{IMPACT_ASSESSMENT_FRAMEWORKS.dpia.title}</h2>
            <p className="text-slate-600 text-xs mt-0.5">{IMPACT_ASSESSMENT_FRAMEWORKS.dpia.description}</p>
          </div>

          <div className="space-y-2.5">
            {IMPACT_ASSESSMENT_FRAMEWORKS.dpia.requirements.map((req, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-900">{req}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SIA (Safety Impact) */}
      {activeTab === 'sia' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
          <div>
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 rounded uppercase">
              Technical Safety & AI Harm Evaluation
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-2">{IMPACT_ASSESSMENT_FRAMEWORKS.sia.title}</h2>
            <p className="text-slate-600 text-xs mt-0.5">{IMPACT_ASSESSMENT_FRAMEWORKS.sia.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {IMPACT_ASSESSMENT_FRAMEWORKS.sia.requirements.map((req, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex items-start space-x-3">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-800 leading-relaxed">{req}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

