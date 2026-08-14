import React, { useState } from 'react';
import { INDIA_COMPLIANCE_CLAUSES } from '../data/indiaComplianceData';
import { ExecutiveSummary } from './ExecutiveSummary';
import {
  CheckCircle2,
  ShieldAlert,
  Scale,
  HelpCircle,
  FileCheck2,
  Lock,
  Flame,
  Info,
  ChevronDown,
  ChevronUp,
  Link,
  BookOpen
} from 'lucide-react';

export const IndiaComplianceView: React.FC = () => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [expandedClause, setExpandedClause] = useState<number | null>(0);

  const toggleCheck = (id: string) => {
    setCompletedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalChecklistCount = INDIA_COMPLIANCE_CLAUSES.reduce(
    (acc, clause) => acc + clause.operationalChecklist.length,
    0
  );
  const checkedCount = Object.values(completedItems).filter(Boolean).length;
  const compliancePct = Math.round((checkedCount / totalChecklistCount) * 100);

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <ExecutiveSummary
        sectionNumber="Intelligence Center"
        sectionTitle="India Statutory Compliance Intelligence Center & Regulatory Hub"
        badgeLabel="Compliance Intelligence"
        badgeColor="amber"
        readingTime="3 min read"
        aboutText="A plain-language regulatory intelligence center structured around: What this law means, Why it matters, What teams must do, Required evidence, Related controls, and Product impact."
        whyItMatters="Non-compliance with Indian statutory mandates risks severe statutory fines (up to ₹250 Crore under DPDP Act Sec 9) and criminal liability for officers under POCSO Act."
        keyRisks={[
          'Failing to obtain verifiable parental consent before processing minor data.',
          'Missing mandatory 24-hour CSAM takedown SLAs under IT Rules 2021.',
          'Inadequate data localization or missing Resident Grievance Officer in India.'
        ]}
        recommendedActions={[
          'Complete operational self-audit checklist for all 7 statutory clauses.',
          'Verify mandatory reporting integration with NCRB Cyber Crime Portal.',
          'Appoint certified Resident Grievance Officer and Nodal Officer in India.'
        ]}
        keyTakeaways={[
          'Translates legal clauses directly into clear team action items and audit evidence.',
          'Provides granular operational self-audit checklist with completion tracking.',
          'Highlights penalty risks, statutory consequences, and linked incidents.'
        ]}
      />

      {/* Compliance Audit Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Statutory Compliance Scorecard</span>
            </h2>
            <p className="text-xs text-slate-500">
              Interactive self-audit checklist across all 7 Indian statutory frameworks
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-2xl font-black text-slate-900 font-mono">{compliancePct}%</span>
            <div className="w-36 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${compliancePct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Clauses Matrix */}
      <div className="space-y-4">
        {INDIA_COMPLIANCE_CLAUSES.map((clause, idx) => {
          const isExpanded = expandedClause === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-200 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-200 rounded">
                      {clause.lawName}
                    </span>
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      Ref: {clause.sectionRef}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 pt-1">{clause.sectionRef}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{clause.keyProvision}</p>
                </div>

                {/* Penalty Risk Badge */}
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg shrink-0 self-start max-w-xs text-xs">
                  <span className="font-bold text-red-900 block flex items-center space-x-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                    <span>Statutory Penalty Risk:</span>
                  </span>
                  <p className="text-[11px] text-red-800 font-medium mt-0.5">
                    {clause.penaltyOrConsequence}
                  </p>
                </div>
              </div>

              {/* Compliance Intelligence Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* What this law means */}
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg space-y-1">
                  <span className="font-bold text-blue-900 uppercase text-[10px] flex items-center space-x-1">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>1. What This Law Means</span>
                  </span>
                  <p className="text-slate-800 text-[11px] leading-relaxed">
                    {clause.childSafetyMandate}
                  </p>
                </div>

                {/* Why it matters */}
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg space-y-1">
                  <span className="font-bold text-amber-900 uppercase text-[10px] flex items-center space-x-1">
                    <Scale className="w-3.5 h-3.5 text-amber-600" />
                    <span>2. Why It Matters For Children</span>
                  </span>
                  <p className="text-slate-800 text-[11px] leading-relaxed">
                    Protects minors under 18 from unauthorized data exploitation, behavioral tracking, and non-consensual profiling in online products.
                  </p>
                </div>

                {/* What teams must do */}
                <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-lg space-y-1">
                  <span className="font-bold text-indigo-900 uppercase text-[10px] flex items-center space-x-1">
                    <FileCheck2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>3. What Teams Must Do</span>
                  </span>
                  <p className="text-slate-800 text-[11px] leading-relaxed">
                    Implement verifiable parental consent (DigiLocker VPC), lock telemetry logs, and block targeted ad scripts before launch.
                  </p>
                </div>

                {/* Required Evidence */}
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-1">
                  <span className="font-bold text-emerald-900 uppercase text-[10px] flex items-center space-x-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>4. Required Evidence & Audit Trail</span>
                  </span>
                  <p className="text-slate-800 text-[11px] leading-relaxed font-mono">
                    Signed CRIA Certificate (ID: CRIA-2026-9012), VPC consent logs in PostgreSQL, and CISO sign-off sheet in Vault.
                  </p>
                </div>
              </div>

              {/* Toggle Detail Expansion */}
              <button
                onClick={() => setExpandedClause(isExpanded ? null : idx)}
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-700 text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer transition-all"
              >
                <span>{isExpanded ? 'Hide Mandatory Operational Checklist' : 'Show Mandatory Operational Checklist & Controls'}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Interactive Checklist Items when expanded */}
              {isExpanded && (
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block tracking-wider">
                    Mandatory Operational Checklist:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {clause.operationalChecklist.map((item, itemIdx) => {
                      const checkKey = `${idx}_${itemIdx}`;
                      const isChecked = !!completedItems[checkKey];

                      return (
                        <div
                          key={itemIdx}
                          onClick={() => toggleCheck(checkKey)}
                          className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center space-x-2.5 ${
                            isChecked
                              ? 'bg-emerald-50 border-emerald-300 text-slate-900 shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              isChecked ? 'bg-emerald-600 border-emerald-600' : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isChecked && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-xs font-medium leading-snug">{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
