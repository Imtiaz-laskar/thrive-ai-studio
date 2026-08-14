import React, { useState } from 'react';
import { Search, X, BookOpen, CheckCircle2, ShieldAlert, Cpu, FileText, ArrowRight } from 'lucide-react';
import { DESIGN_REQUIREMENTS } from '../data/requirementsData';
import { THREAT_MODEL_MATRIX } from '../data/threatModelData';
import { INDIA_COMPLIANCE_CLAUSES } from '../data/indiaComplianceData';
import { KNOWLEDGE_BANK_ITEMS } from '../data/knowledgeBankData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onSelectTab }) => {
  const [query, setQuery] = useState<string>('');

  if (!isOpen) return null;

  const matchedReqs = DESIGN_REQUIREMENTS.filter(r =>
    query && (r.title.toLowerCase().includes(query.toLowerCase()) || r.summary.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 3);

  const matchedThreats = THREAT_MODEL_MATRIX.filter(t =>
    query && (t.title.toLowerCase().includes(query.toLowerCase()) || t.description.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 3);

  const matchedLaws = INDIA_COMPLIANCE_CLAUSES.filter(l =>
    query && (l.lawName.toLowerCase().includes(query.toLowerCase()) || l.keyProvision.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 3);

  const matchedKnowledge = KNOWLEDGE_BANK_ITEMS.filter(k =>
    query && (k.title.toLowerCase().includes(query.toLowerCase()) || k.shortSummary.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 3);

  const totalMatches = matchedReqs.length + matchedThreats.length + matchedLaws.length + matchedKnowledge.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 flex items-center space-x-3 bg-slate-50">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            placeholder="Type to search requirements, laws (DPDP, POCSO), threats, or playbooks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {!query && (
            <div className="text-center py-8 text-slate-500 space-y-2">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-medium text-xs">Search Guardian AI Child Safety System</p>
              <p className="text-[11px] text-slate-400">Try searching for <span className="font-mono font-semibold text-slate-700">"DPDP Section 9"</span>, <span className="font-mono font-semibold text-slate-700">"Verifiable Consent"</span>, or <span className="font-mono font-semibold text-slate-700">"Grooming"</span></p>
            </div>
          )}

          {query && totalMatches === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p className="font-semibold text-xs text-slate-700">No matching framework items found for "{query}"</p>
              <p className="text-[11px] text-slate-400 mt-1">Try refining your search keyword or check Knowledge Bank tab.</p>
            </div>
          )}

          {/* Matched Design Requirements */}
          {matchedReqs.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Section 3: Design Control Requirements</span>
              </span>
              <div className="space-y-1.5">
                {matchedReqs.map(req => (
                  <div
                    key={req.id}
                    onClick={() => { onSelectTab('requirements'); onClose(); }}
                    className="p-3 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 rounded-lg cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-blue-800 uppercase">{req.domain}</span>
                      <h4 className="font-bold text-slate-900 text-xs">{req.title}</h4>
                      <p className="text-[11px] text-slate-600 line-clamp-1">{req.summary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched AI Threats */}
          {matchedThreats.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 flex items-center space-x-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>Section 5: AI Threat Vectors</span>
              </span>
              <div className="space-y-1.5">
                {matchedThreats.map(threat => (
                  <div
                    key={threat.id}
                    onClick={() => { onSelectTab('threat_model'); onClose(); }}
                    className="p-3 bg-slate-50 hover:bg-purple-50/50 border border-slate-200 rounded-lg cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-red-800 uppercase">Risk: {threat.severity}</span>
                      <h4 className="font-bold text-slate-900 text-xs">{threat.title}</h4>
                      <p className="text-[11px] text-slate-600 line-clamp-1">{threat.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Statutory Laws */}
          {matchedLaws.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center space-x-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Section 9: India Statutory Register</span>
              </span>
              <div className="space-y-1.5">
                {matchedLaws.map((law, idx) => (
                  <div
                    key={idx}
                    onClick={() => { onSelectTab('india_compliance'); onClose(); }}
                    className="p-3 bg-slate-50 hover:bg-amber-50/50 border border-slate-200 rounded-lg cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase">{law.lawName}</span>
                      <h4 className="font-bold text-slate-900 text-xs">{law.sectionRef}</h4>
                      <p className="text-[11px] text-slate-600 line-clamp-1">{law.keyProvision}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Knowledge Bank Items */}
          {matchedKnowledge.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Knowledge Bank Reference</span>
              </span>
              <div className="space-y-1.5">
                {matchedKnowledge.map(kb => (
                  <div
                    key={kb.id}
                    onClick={() => { onSelectTab('knowledge_bank'); onClose(); }}
                    className="p-3 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 rounded-lg cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 uppercase">{kb.category}</span>
                      <h4 className="font-bold text-slate-900 text-xs">{kb.title}</h4>
                      <p className="text-[11px] text-slate-600 line-clamp-1">{kb.shortSummary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 font-mono flex justify-between items-center">
          <span>Guardian AI Framework Global Indexer</span>
          <span>Press ESC or Click Outside to close</span>
        </div>
      </div>
    </div>
  );
};
