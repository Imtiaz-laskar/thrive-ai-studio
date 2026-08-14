import React, { useState } from 'react';
import { LIFECYCLE_STAGES } from '../data/lifecycleData';
import { ExecutiveSummary } from './ExecutiveSummary';
import { Layers, ArrowRight, CheckCircle2, Lock, FileText } from 'lucide-react';

export const LifecycleView: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<number>(1);

  const selectedStage = LIFECYCLE_STAGES.find(s => s.id === selectedStageId) || LIFECYCLE_STAGES[0];

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <ExecutiveSummary
        sectionNumber="Section 8"
        sectionTitle="Child Safety Product Lifecycle Operating Model"
        badgeLabel="Lifecycle Operating Model"
        badgeColor="purple"
        readingTime="2 min read"
        aboutText="11-stage step-by-step operating pipeline embedding child safety, privacy, and Indian statutory touchpoints into every phase of software development."
        whyItMatters="Integrating child safety at the architecture phase eliminates costly late-stage redesigns and ensures continuous regulatory audit readiness."
        keyRisks={[
          'Treating child safety as a post-launch add-on rather than a design constraint.',
          'Missing mandatory stage-gate approvals from Legal and Trust & Safety prior to release.',
          'Unmonitored third-party AI dependencies or model updates altering guardrail behavior.'
        ]}
        recommendedActions={[
          'Review 11 lifecycle stages with product managers and engineering leads.',
          'Mandate completion of Stage Gate exit criteria before feature deployment.',
          'Align Stage 9 (Incident Management) with the 24-hour statutory takedown SLA.'
        ]}
        keyTakeaways={[
          'Covers end-to-end SDLC from ideation to deprecation.',
          'Defines clear owner roles, deliverables, and India legal touchpoints per stage.',
          'Provides strict stage-gate criteria to enforce compliance.'
        ]}
      />

      {/* Lifecycle Stage Pipeline Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase text-slate-500 tracking-wider">11-Phase Product Lifecycle Roadmap</h2>
        
        <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {LIFECYCLE_STAGES.map((stg) => {
            const isSelected = selectedStageId === stg.id;
            return (
              <button
                key={stg.id}
                onClick={() => setSelectedStageId(stg.id)}
                className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition-all shrink-0 w-36 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-blue-100' : 'text-blue-600'}`}>
                  STAGE 0{stg.id}
                </span>
                <span className="text-xs font-bold mt-0.5 line-clamp-1">{stg.shortCode}</span>
                <span className={`text-[10px] line-clamp-1 mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  {stg.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Inspection Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 text-xs font-bold font-mono bg-blue-100 text-blue-800 border border-blue-200 rounded">
                STAGE {selectedStage.id} OF 11
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded border border-slate-200">
                Owner: {selectedStage.owner}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 pt-1">{selectedStage.name}</h2>
          </div>

          <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-right">
            <span className="text-[10px] font-bold uppercase text-amber-800 block">India Legal Touchpoint</span>
            <span className="text-xs font-bold text-slate-900">{selectedStage.indiaComplianceTouchpoint}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Key Activities */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2.5">
            <span className="font-bold text-blue-900 uppercase tracking-wider text-[10px] flex items-center space-x-2">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Key Lifecycle Activities:</span>
            </span>
            <ul className="space-y-1.5 text-slate-700">
              {selectedStage.keyActivities.map((act, aIdx) => (
                <li key={aIdx} className="flex items-start space-x-2">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mandatory Outputs */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2.5">
            <span className="font-bold text-emerald-900 uppercase tracking-wider text-[10px] flex items-center space-x-2">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mandatory Deliverables / Outputs:</span>
            </span>
            <ul className="space-y-1.5 text-slate-700">
              {selectedStage.mandatoryOutputs.map((out, oIdx) => (
                <li key={oIdx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stage Gate Criteria */}
        <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg space-y-1 text-xs">
          <span className="font-bold text-amber-900 uppercase tracking-wider text-[10px] flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span>Stage Gate Exit Criteria (Prerequisite for Next Stage):</span>
          </span>
          <p className="text-slate-800 font-medium">{selectedStage.gateCriteria}</p>
        </div>
      </div>
    </div>
  );
};

