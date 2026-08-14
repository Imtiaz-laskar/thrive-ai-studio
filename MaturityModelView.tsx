import React, { useState } from 'react';
import { MATURITY_DIMENSIONS } from '../data/maturityData';
import { ExecutiveSummary } from './ExecutiveSummary';
import { Award, CheckCircle2, Sparkles } from 'lucide-react';

export const MaturityModelView: React.FC = () => {
  const [dimensionLevels, setDimensionLevels] = useState<Record<string, number>>({
    mat_01: 3,
    mat_02: 3,
    mat_03: 3,
    mat_04: 3,
    mat_05: 3,
    mat_06: 3,
  });

  const handleLevelSelect = (dimId: string, level: number) => {
    setDimensionLevels(prev => ({ ...prev, [dimId]: level }));
  };

  const avgLevel = ((Object.values(dimensionLevels) as number[]).reduce((a, b) => a + b, 0) / MATURITY_DIMENSIONS.length).toFixed(1);
  const numericAvg = parseFloat(avgLevel);

  let maturityTier = 'Level 3: Defined';
  let tierBadge = 'bg-blue-100 text-blue-800 border-blue-200';

  if (numericAvg >= 4.5) {
    maturityTier = 'Level 5: Optimizing & Industry Leading';
    tierBadge = 'bg-emerald-100 text-emerald-800 border-emerald-200';
  } else if (numericAvg >= 3.5) {
    maturityTier = 'Level 4: Managed & Quantitative';
    tierBadge = 'bg-cyan-100 text-cyan-800 border-cyan-200';
  } else if (numericAvg >= 2.5) {
    maturityTier = 'Level 3: Defined';
    tierBadge = 'bg-blue-100 text-blue-800 border-blue-200';
  } else if (numericAvg >= 1.5) {
    maturityTier = 'Level 2: Reactive';
    tierBadge = 'bg-amber-100 text-amber-800 border-amber-200';
  } else {
    maturityTier = 'Level 1: Ad-hoc';
    tierBadge = 'bg-red-100 text-red-800 border-red-200';
  }

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <ExecutiveSummary
        sectionNumber="Section 10"
        sectionTitle="Organizational Child Safety Maturity Model Benchmark"
        badgeLabel="Organizational Benchmark"
        badgeColor="emerald"
        readingTime="2 min read"
        aboutText="5-tier organizational maturity rubric evaluating readiness across Governance, DPDP Consent, AI Guardrails, Threat Detection, Incident Response, and Recommendation Safety."
        whyItMatters="Self-assessing maturity provides product executives and board members clear visibility into operational capability gaps and investment priorities."
        keyRisks={[
          'Operating at Level 1 (Ad-hoc) with manual uncoordinated safety responses.',
          'Siloed safety teams without executive board visibility or legal integration.',
          'Missing automated red-teaming leading to undetected model drift.'
        ]}
        recommendedActions={[
          'Conduct self-assessment across all 6 maturity dimensions.',
          'Prioritize upgrades to reach Level 3 (Defined) baseline for statutory compliance.',
          'Establish quarterly executive maturity reviews and board reporting.'
        ]}
        keyTakeaways={[
          'Evaluates 6 core dimensions of child safety capability.',
          'Provides instant score computation and tier classification.',
          'Delivers an actionable upgrade roadmap to reach Level 5 excellence.'
        ]}
      />

      {/* Maturity Scorecard Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase text-slate-500">Current Maturity Scorecard</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight mt-1">
              {avgLevel} <span className="text-slate-400 text-base font-normal">/ 5.0</span>
            </h2>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Maturity Classification</span>
            <span className={`px-3 py-1 text-xs font-bold rounded-full border ${tierBadge}`}>
              {maturityTier}
            </span>
          </div>
        </div>
      </div>

      {/* 6 Dimensions Self-Assessment Grid */}
      <div className="space-y-4">
        {MATURITY_DIMENSIONS.map((dim) => {
          const currentLvl = dimensionLevels[dim.id] || 3;

          return (
            <div key={dim.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                <h3 className="text-sm font-bold text-slate-900">{dim.dimension}</h3>
                <span className="text-xs font-mono font-bold text-blue-700">
                  Selected Level: {currentLvl} / 5
                </span>
              </div>

              {/* 5-Level Pill Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((lvl) => {
                  const isSelected = currentLvl === lvl;
                  const lvlTextKey = `level${lvl}` as keyof typeof dim;
                  const lvlDescription = dim[lvlTextKey] as string;

                  return (
                    <div
                      key={lvl}
                      onClick={() => handleLevelSelect(dim.id, lvl)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-50 border-blue-500 text-slate-900 ring-2 ring-blue-500/20 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase text-blue-800">Level {lvl}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <p className="text-[11px] leading-relaxed line-clamp-3 font-medium">{lvlDescription.split(': ')[1]}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actionable Upgrade Roadmap to Level 5 */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <h2 className="text-base font-bold text-slate-900">Recommended Roadmap to Level 5 Maturity</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-amber-900 block uppercase text-[10px]">1. Immediate High-Impact Upgrades</span>
            <p className="text-slate-700 leading-relaxed">
              Automate Verifiable Parental Consent (VPC) via DigiLocker and hardcode prompt filtering proxy with &lt;100ms latency.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-blue-900 block uppercase text-[10px]">2. Quantitative Monitoring</span>
            <p className="text-slate-700 leading-relaxed">
              Deploy automated red-teaming (5,000+ daily adversarial jailbreak prompts) and real-time telemetry dashboards.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-emerald-900 block uppercase text-[10px]">3. Industry Leadership</span>
            <p className="text-slate-700 leading-relaxed">
              Appoint an AI Safety Chair on the Board and contribute open-source safety datasets to NCPCR & UNCRC working groups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

