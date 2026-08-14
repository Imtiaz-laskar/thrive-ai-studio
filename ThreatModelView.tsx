import React, { useState } from 'react';
import { THREAT_MODEL_MATRIX } from '../data/threatModelData';
import { ThreatVector, RiskLevel } from '../types/framework';
import { Cpu, Search, AlertTriangle, ShieldCheck, ChevronDown, ChevronUp, Lock, ExternalLink } from 'lucide-react';

export const ThreatModelView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedThreatId, setExpandedThreatId] = useState<string | null>('threat_01');

  const categories = ['All', 'Child Exploitation', 'AI Toxicity & Harassment', 'Mental Health & Self-Harm', 'Privacy & PII Exposure', 'Manipulative AI', 'Financial & Dark Patterns', 'Algorithmic Bias'];
  const severities = ['All', 'Critical', 'High', 'Medium', 'Low'];

  const filteredThreats = THREAT_MODEL_MATRIX.filter(t => {
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSev = selectedSeverity === 'All' || t.severity === selectedSeverity;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.indiaLegalRef.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSev && matchesSearch;
  });

  const getSeverityBadge = (severity: RiskLevel) => {
    switch (severity) {
      case 'Critical':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-800 border border-red-200 rounded uppercase">Critical Risk</span>;
      case 'High':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 rounded uppercase">High Risk</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 rounded uppercase">Medium Risk</span>;
      case 'Low':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 rounded uppercase">Low Risk</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm text-slate-900">
        <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-purple-50 border border-purple-200 rounded text-purple-800 text-[10px] font-bold uppercase tracking-wider mb-2">
          <Cpu className="w-3.5 h-3.5 text-purple-700" />
          <span>Section 5: AI Threat Vectors</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
          AI-Specific Child Safety Threat Model Matrix
        </h1>
        <p className="text-slate-600 text-xs leading-relaxed max-w-4xl">
          Exhaustive risk vectors covering grooming, CSAM, deepfake harassment, self-harm prompts, parasocial AI dependency, prompt injection PII leaks, and India statutory offense mappings.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search threat vector, detection, or law..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Severity Filters */}
          <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto">
            <span className="text-xs font-bold text-slate-500 shrink-0 uppercase tracking-wider">Severity:</span>
            {severities.map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-2.5 py-1 text-xs rounded font-semibold transition-all cursor-pointer shrink-0 ${
                  selectedSeverity === sev
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-xs rounded font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Threat Cards Matrix */}
      <div className="space-y-4">
        {filteredThreats.map((threat) => {
          const isExpanded = expandedThreatId === threat.id;

          return (
            <div
              key={threat.id}
              className={`bg-white border rounded-xl p-5 transition-all shadow-sm space-y-4 ${
                threat.severity === 'Critical'
                  ? 'border-red-300'
                  : threat.severity === 'High'
                  ? 'border-amber-300'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {getSeverityBadge(threat.severity)}
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-purple-50 text-purple-800 border border-purple-200 rounded">
                      {threat.category}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded">
                      {threat.indiaLegalRef}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 pt-1">{threat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{threat.description}</p>
                </div>

                <button
                  onClick={() => setExpandedThreatId(isExpanded ? null : threat.id)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-blue-700 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1.5 shrink-0 self-start cursor-pointer"
                >
                  <span>{isExpanded ? 'Hide Controls' : 'Inspect Technical Mitigations'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Detailed Technical Mitigation Drawer */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-slate-200 space-y-4">
                  {/* Real-world Scenario */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-purple-900 block flex items-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-purple-700" />
                      <span>Example Real-World Threat Scenario:</span>
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">{threat.exampleScenario}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Detection Methods */}
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1.5">
                      <span className="font-bold text-blue-900 block uppercase tracking-wider text-[10px]">
                        1. Real-time Detection Methods:
                      </span>
                      <ul className="space-y-1 text-slate-700">
                        {threat.detectionMethods.map((det, dIdx) => (
                          <li key={dIdx} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                            <span>{det}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Prevention Controls */}
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1.5">
                      <span className="font-bold text-emerald-900 block uppercase tracking-wider text-[10px]">
                        2. Prevention & Technical Guardrails:
                      </span>
                      <ul className="space-y-1 text-slate-700">
                        {threat.preventionControls.map((prev, pIdx) => (
                          <li key={pIdx} className="flex items-start space-x-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{prev}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Escalation & Legal Response */}
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg space-y-1 text-xs">
                    <span className="font-bold text-red-900 uppercase tracking-wider text-[10px] block flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5 text-red-700" />
                      <span>3. Escalation Protocol & Legal Takedown SLA:</span>
                    </span>
                    <p className="text-slate-800 leading-relaxed text-[11px]">{threat.escalationProtocol}</p>
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

