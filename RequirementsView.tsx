import React, { useState } from 'react';
import { DESIGN_REQUIREMENTS } from '../data/requirementsData';
import { CheckCircle2, XCircle, AlertCircle, Search, Filter, ShieldCheck, Check, Sparkles } from 'lucide-react';

export const RequirementsView: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statuses, setStatuses] = useState<Record<string, 'pass' | 'fail' | 'pending'>>({
    ux_01: 'pass',
    ux_02: 'pass',
    priv_01: 'pass',
    ai_01: 'pass',
    ai_02: 'pass',
  });

  const domains = ['All', 'UX & Accessibility', 'DPDP Privacy & Consent', 'AI System Guardrails', 'Recommendation Safety'];

  const filteredRequirements = DESIGN_REQUIREMENTS.filter(req => {
    const matchesDomain = selectedDomain === 'All' || req.domain === selectedDomain;
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.indiaClause.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const handleStatusToggle = (id: string, newStatus: 'pass' | 'fail' | 'pending') => {
    setStatuses(prev => ({ ...prev, [id]: newStatus }));
  };

  const totalCount = DESIGN_REQUIREMENTS.length;
  const passCount = Object.values(statuses).filter(s => s === 'pass').length;
  const progressPct = Math.round((passCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm text-slate-900">
        <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Section 3: Product Design Controls</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
          Child Safety Design Requirements Checklist
        </h1>
        <p className="text-slate-600 text-xs leading-relaxed max-w-4xl">
          Actionable technical and UX requirements mapped across User Experience, DPDP Privacy, AI System Guardrails, and Recommendation Safety algorithms.
        </p>
      </div>

      {/* Progress & Filters Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-base font-bold text-slate-900">Design Audit Verification Progress</h2>
              <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200 rounded">
                {passCount} / {totalCount} Requirements Passed ({progressPct}%)
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full sm:w-80 h-2 bg-slate-100 border border-slate-200 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search requirements or Indian laws..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-200">
          <Filter className="w-3.5 h-3.5 text-slate-500 mr-1" />
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-2.5 py-1 text-xs rounded font-semibold transition-all cursor-pointer ${
                selectedDomain === dom
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Requirements List Grid */}
      <div className="space-y-4">
        {filteredRequirements.map((req) => {
          const currentStatus = statuses[req.id] || 'pending';

          return (
            <div
              key={req.id}
              className={`bg-white border rounded-xl p-5 transition-all shadow-sm space-y-4 ${
                currentStatus === 'pass'
                  ? 'border-emerald-300 bg-white'
                  : currentStatus === 'fail'
                  ? 'border-red-300 bg-red-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 rounded">
                      {req.domain}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded">
                      {req.indiaClause}
                    </span>
                    {req.mandatoryForLaunch && (
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-red-100 text-red-800 border border-red-200 rounded">
                        Mandatory Gate
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 pt-1">{req.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{req.summary}</p>
                </div>

                {/* Interactive Status Controls */}
                <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0 self-start">
                  <button
                    onClick={() => handleStatusToggle(req.id, 'pass')}
                    className={`px-2.5 py-1 text-xs font-bold rounded flex items-center space-x-1 transition-all cursor-pointer ${
                      currentStatus === 'pass'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-emerald-700'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>PASS</span>
                  </button>

                  <button
                    onClick={() => handleStatusToggle(req.id, 'fail')}
                    className={`px-2.5 py-1 text-xs font-bold rounded flex items-center space-x-1 transition-all cursor-pointer ${
                      currentStatus === 'fail'
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-red-700'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>FAIL</span>
                  </button>

                  <button
                    onClick={() => handleStatusToggle(req.id, 'pending')}
                    className={`px-2.5 py-1 text-xs font-bold rounded flex items-center space-x-1 transition-all cursor-pointer ${
                      currentStatus === 'pending'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-amber-700'
                    }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>PENDING</span>
                  </button>
                </div>
              </div>

              {/* Implementation & Verification Detail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-200 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-blue-900 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Implementation Guidance:</span>
                  </span>
                  <p className="text-slate-700 leading-relaxed text-[11px]">{req.implementationGuidance}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-emerald-900 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verification & Audit Method:</span>
                  </span>
                  <p className="text-slate-700 leading-relaxed text-[11px]">{req.verificationMethod}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

