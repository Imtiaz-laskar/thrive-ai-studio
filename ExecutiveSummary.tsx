import React, { useState } from 'react';
import { BookOpen, ShieldAlert, CheckCircle2, Clock, AlertTriangle, ArrowRight, ChevronDown, ChevronUp, Sparkles, ExternalLink } from 'lucide-react';

export interface ExecSummaryProps {
  sectionNumber: string;
  sectionTitle: string;
  badgeLabel: string;
  badgeColor?: string; // 'blue' | 'red' | 'amber' | 'emerald' | 'purple'
  readingTime: string;
  aboutText: string;
  whyItMatters: string;
  keyRisks: string[];
  recommendedActions: string[];
  keyTakeaways: string[];
  onActionClick?: (action: string) => void;
}

export const ExecutiveSummary: React.FC<ExecSummaryProps> = ({
  sectionNumber,
  sectionTitle,
  badgeLabel,
  badgeColor = 'blue',
  readingTime,
  aboutText,
  whyItMatters,
  keyRisks,
  recommendedActions,
  keyTakeaways,
  onActionClick
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const getBadgeStyle = () => {
    switch (badgeColor) {
      case 'red':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'amber':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'emerald':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800';
      case 'purple':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-50 via-white to-blue-50/30 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${getBadgeStyle()}`}>
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{sectionNumber}: {badgeLabel}</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 rounded text-[10px] font-mono font-medium">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>{readingTime}</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {sectionTitle}
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
              {aboutText}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <span>{isExpanded ? 'Collapse Executive Summary' : 'Expand Executive Summary'}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Executive Summary Details (Level 1 Progressive Disclosure) */}
      {isExpanded && (
        <div className="p-5 sm:p-6 bg-white space-y-5 text-xs">
          {/* Why It Matters Callout */}
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-lg space-y-1">
            <span className="font-bold text-blue-900 flex items-center space-x-1.5 uppercase tracking-wider text-[10px]">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Why This Matters to Stakeholders & Executives:</span>
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">{whyItMatters}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Key Risks */}
            <div className="p-4 bg-red-50/40 border border-red-200 rounded-lg space-y-2">
              <span className="font-bold text-red-900 flex items-center space-x-1.5 uppercase tracking-wider text-[10px]">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                <span>Key Operational & Legal Risks:</span>
              </span>
              <ul className="space-y-1.5 text-slate-700">
                {keyRisks.map((risk, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Actions */}
            <div className="p-4 bg-emerald-50/40 border border-emerald-200 rounded-lg space-y-2">
              <span className="font-bold text-emerald-900 flex items-center space-x-1.5 uppercase tracking-wider text-[10px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Recommended Immediate Actions:</span>
              </span>
              <ul className="space-y-1.5 text-slate-700">
                {recommendedActions.map((act, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Takeaways */}
            <div className="p-4 bg-purple-50/40 border border-purple-200 rounded-lg space-y-2">
              <span className="font-bold text-purple-900 flex items-center space-x-1.5 uppercase tracking-wider text-[10px]">
                <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                <span>Key Executive Takeaways:</span>
              </span>
              <ul className="space-y-1.5 text-slate-700">
                {keyTakeaways.map((take, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 shrink-0" />
                    <span>{take}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
