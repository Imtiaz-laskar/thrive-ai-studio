import React, { useState } from 'react';
import { GOVERNANCE_ROLES, RACI_MATRIX, ESCALATION_LEVELS } from '../data/governanceData';
import { ExecutiveSummary } from './ExecutiveSummary';
import { StakeholderApproval } from './StakeholderApproval';
import { Shield, Users, AlertTriangle, CheckCircle2, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export const GovernanceView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedRole, setExpandedRole] = useState<number | null>(0);

  const categories = ['All', 'Ideation & Scoping', 'Privacy & Legal', 'Engineering & Safety', 'Governance & Gate', 'Incident & Operations', 'Legal & Operations', 'AI System Governance', 'Compliance & Legal'];

  const filteredRaci = selectedCategory === 'All'
    ? RACI_MATRIX
    : RACI_MATRIX.filter(item => item.category === selectedCategory);

  const getRaciBadge = (role: 'R' | 'A' | 'C' | 'I') => {
    switch (role) {
      case 'A':
        return <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-200 rounded inline-block">ACCOUNTABLE</span>;
      case 'R':
        return <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200 rounded inline-block">RESPONSIBLE</span>;
      case 'C':
        return <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200 rounded inline-block">CONSULTED</span>;
      case 'I':
        return <span className="px-2 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-200 rounded inline-block">INFORMED</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <ExecutiveSummary
        sectionNumber="Section 1"
        sectionTitle="Child Safety Governance Model & RACI Matrix"
        badgeLabel="Operating Architecture"
        badgeColor="blue"
        readingTime="3 min read"
        aboutText="Operating framework defining executive ownership, cross-functional mandates, legal accountability, and decision authority for AI products operating under Indian laws (DPDP Act 2023, IT Rules 2021)."
        whyItMatters="Explicit governance accountability prevents organizational gaps, ensuring rapid responses to child safety risks and clear ownership during regulatory audits."
        keyRisks={[
          'Unclear executive escalation paths during high-severity CSAM or self-harm incidents.',
          'Lack of explicit legal and DPO approval before releasing minor-facing AI features.',
          'Siloed engineering teams deploying recommendations without Trust & Safety oversight.'
        ]}
        recommendedActions={[
          'Review RACI matrix roles and confirm assigned department leads.',
          'Ensure 24-hour escalation SLAs are integrated into on-call incident protocols.',
          'Record digital stakeholder signatures for compliance audits before product release.'
        ]}
        keyTakeaways={[
          'Defines 6 core executive & functional department mandates.',
          'Establishes an 8-activity cross-functional RACI matrix.',
          'Provides 3-tier escalation pathways with strict time-bound SLAs.',
          'Includes an interactive Stakeholder Approval engine for digital signature auditing.'
        ]}
      />


      {/* Role Ownership Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">1. Executive & Functional Role Mandates</h2>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">6 Departmental Owners</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GOVERNANCE_ROLES.map((role, idx) => {
            const isExpanded = expandedRole === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 rounded">
                      {role.department}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{role.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-3">{role.primaryMandate}</p>
                </div>

                <div>
                  <button
                    onClick={() => setExpandedRole(isExpanded ? null : idx)}
                    className="flex items-center justify-between w-full py-1.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-blue-700 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Deliverables & Triggers' : 'View Key Deliverables'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-200 space-y-3 text-xs">
                      <div>
                        <span className="font-bold text-slate-800 block mb-1">Key Deliverables:</span>
                        <ul className="space-y-1 text-slate-600">
                          {role.keyDeliverables.map((del, dIdx) => (
                            <li key={dIdx} className="flex items-start space-x-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                        <span className="font-bold text-amber-900 block mb-0.5 flex items-center space-x-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                          <span>Escalation Trigger:</span>
                        </span>
                        <p className="text-amber-800 text-[11px]">{role.escalationTrigger}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RACI Matrix Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>2. Accountability & Responsibility Matrix (RACI)</span>
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              R = Responsible (Executes), A = Accountable (Final Decision), C = Consulted (Provides Input), I = Informed (Updated)
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-[11px] rounded font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* RACI Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3 min-w-[200px]">Lifecycle Activity</th>
                <th className="p-3">Exec Sponsor</th>
                <th className="p-3">Product Lead</th>
                <th className="p-3">T&S Operations</th>
                <th className="p-3">Privacy / DPO</th>
                <th className="p-3">Legal Counsel</th>
                <th className="p-3">Engineering Lead</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredRaci.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-medium text-slate-900">
                    <div>
                      <p className="font-bold text-slate-900">{item.activity}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded">
                        {item.category}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">{getRaciBadge(item.execOwner)}</td>
                  <td className="p-3">{getRaciBadge(item.prodOwner)}</td>
                  <td className="p-3">{getRaciBadge(item.tsOwner)}</td>
                  <td className="p-3">{getRaciBadge(item.privacyOwner)}</td>
                  <td className="p-3">{getRaciBadge(item.legalOwner)}</td>
                  <td className="p-3">{getRaciBadge(item.engOwner)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Escalation Pathway Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <h2 className="text-base font-bold text-slate-900">3. Three-Tier Safety Escalation Pathways</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ESCALATION_LEVELS.map((esc) => (
            <div
              key={esc.level}
              className={`rounded-xl p-4 border flex flex-col justify-between space-y-3 ${
                esc.level === 3
                  ? 'bg-red-50 border-red-200 text-red-950'
                  : esc.level === 2
                  ? 'bg-amber-50 border-amber-200 text-amber-950'
                  : 'bg-blue-50 border-blue-200 text-blue-950'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                    esc.level === 3 ? 'bg-red-200 text-red-900 border border-red-300' :
                    esc.level === 2 ? 'bg-amber-200 text-amber-900 border border-amber-300' :
                    'bg-blue-200 text-blue-900 border border-blue-300'
                  }`}>
                    Level {esc.level} Escalation
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    SLA: {esc.timeframe}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900">{esc.name}</h3>
                
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                    Trigger Condition:
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed bg-white/80 p-2.5 rounded border border-slate-200/80">
                    {esc.triggerCondition}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                    Key Deciders:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {esc.keyDeciders.map((dec, dIdx) => (
                      <span key={dIdx} className="px-1.5 py-0.5 bg-white text-slate-800 text-[10px] font-medium rounded border border-slate-200">
                        {dec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                  Action Protocol:
                </span>
                <p className="text-xs text-slate-800 font-medium flex items-start space-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{esc.actionProtocol}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stakeholder Sign-Off & Digital Signature Audit Component */}
      <StakeholderApproval />
    </div>
  );
};


