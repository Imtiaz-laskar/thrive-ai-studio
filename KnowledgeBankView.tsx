import React, { useState } from 'react';
import { KNOWLEDGE_BANK_ITEMS, KnowledgeResource } from '../data/knowledgeBankData';
import { ExecutiveSummary } from './ExecutiveSummary';
import {
  Search,
  BookOpen,
  ExternalLink,
  ShieldCheck,
  Tag,
  Scale,
  Sparkles,
  ChevronRight,
  X,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Zap,
  Bookmark,
  Layers,
  Code2,
  Briefcase,
  GraduationCap
} from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: 'Foundational' | 'Advanced' | 'Executive';
  duration: string;
  steps: string[];
}

const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'lp-1',
    title: 'DPDP Act 2023 Section 9 Engineering Readiness',
    description: 'Master age verification, verifiable parental consent (VPC), and zero-profiling constraints for products used by Indian minors.',
    level: 'Foundational',
    duration: '15 min module',
    steps: [
      '1. Review DPDP Sec 9 statutory requirements',
      '2. Implement DigiLocker API VPC workflow',
      '3. Disable tracking pixels and behavioral ad profilers',
      '4. Conduct mandatory Child Rights Impact Assessment (CRIA)'
    ]
  },
  {
    id: 'lp-2',
    title: 'CSAM & Emergency Triage Protocol (POCSO & NCRB)',
    description: 'Operational guide for 15-minute zero-tolerance response, PhotoDNA hashing, and statutory law enforcement referrals.',
    level: 'Advanced',
    duration: '20 min module',
    steps: [
      '1. Configure PhotoDNA & PDQ hash matching on media upload',
      '2. Establish automated NCRB / NCMEC API reporting pipeline',
      '3. Implement statutory 24-hour content takedown workflow under IT Rules 2021',
      '4. Lock cryptographic chain-of-custody audit logs'
    ]
  },
  {
    id: 'lp-3',
    title: 'AI Governance & Anti-Dark Pattern Architecture',
    description: 'Design non-dopaminergic interaction loops, prompt firewalls, and parasocial attachment mitigations for minors.',
    level: 'Executive',
    duration: '12 min module',
    steps: [
      '1. Identify dopaminergic engagement loops in recommendation engines',
      '2. Deploy Gemini real-time prompt classification firewalls',
      '3. Embed automatic session friction breaks (30 min limits)',
      '4. Pass CISO & Chief Child Safety Officer launch gates'
    ]
  }
];

export const KnowledgeBankView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedResource, setSelectedResource] = useState<KnowledgeResource | null>(null);
  const [activeTab, setActiveTab] = useState<'articles' | 'paths'>('articles');
  const [activePerspective, setActivePerspective] = useState<'30sec' | 'exec' | 'practitioner' | 'technical'>('30sec');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['kb-1']);

  const categories = ['All', 'Legal References', 'Regulatory Guidance', 'Industry Standards', 'Definitions & Glossary', 'Case Studies'];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredItems = KNOWLEDGE_BANK_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.indiaJurisdiction.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Executive Summary for Knowledge Bank 2.0 */}
      <ExecutiveSummary
        sectionNumber="Knowledge Hub 2.0"
        sectionTitle="ThriveSafe Central Knowledge Bank & Semantic Regulatory Hub"
        badgeLabel="Knowledge 2.0"
        badgeColor="purple"
        readingTime="3 min read"
        aboutText="A world-class knowledge engine featuring multi-perspective article views (30-sec summary, Executive, Practitioner, Technical), interactive learning paths, and semantic regulatory mapping."
        whyItMatters="Bridge the gap between legal counsel, product executives, and AI engineers with perspective-tailored briefs that accelerate compliance sign-offs and statutory audit readiness."
        keyRisks={[
          'Misinterpreting statutory SLAs leading to non-compliance penalties.',
          'Siloed knowledge between legal counselors and AI engineering teams.',
          'Lack of standardized definitions for CRIA, CSAM hashing, and parental consent.'
        ]}
        recommendedActions={[
          'Complete the DPDP Act Sec 9 engineering learning path.',
          'Bookmark critical CSAM & IT Rules 2021 reference briefs.',
          'Review technical implementation views with lead software architects.'
        ]}
        keyTakeaways={[
          'Supports 4 tailored reader perspectives: 30-sec summary, Executive, Practitioner, and Technical.',
          'Includes interactive guided learning paths with step-by-step verification.',
          'Maintains bookmarked collections for enterprise governance teams.'
        ]}
      />

      {/* Primary View Mode Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl p-1 gap-2">
        <button
          onClick={() => setActiveTab('articles')}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'articles'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Knowledge Artifacts & Legal Briefs ({filteredItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('paths')}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'paths'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Interactive Learning Paths ({LEARNING_PATHS.length})</span>
        </button>
      </div>

      {activeTab === 'articles' ? (
        <>
          {/* Search and Category Filter Bar */}
          <div className="bg-white border border-slate-200 rounded-b-xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search laws (e.g. DPDP, POCSO), terms, or guidelines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
                <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                <span>Bookmarked: <strong className="text-slate-900">{bookmarkedIds.length}</strong></span>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs rounded font-semibold transition-all cursor-pointer ${
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

          {/* Resource Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const isBookmarked = bookmarkedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-blue-50 text-blue-800 border border-blue-200 rounded">
                        {item.category}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                          Relevance: {item.relevanceScore}%
                        </span>
                        <button
                          onClick={(e) => toggleBookmark(item.id, e)}
                          className={`p-1 rounded cursor-pointer transition-colors ${
                            isBookmarked ? 'text-amber-500 bg-amber-50' : 'text-slate-300 hover:text-slate-600'
                          }`}
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug pt-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.shortSummary}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Key Takeaways:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {item.keyTakeaways.map((takeaway, tIdx) => (
                          <li key={tIdx} className="flex items-start space-x-1.5">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                            <span className="line-clamp-2">{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-slate-500 truncate max-w-[200px]">
                      Authority: {item.indiaJurisdiction}
                    </span>

                    <button
                      onClick={() => {
                        setSelectedResource(item);
                        setActivePerspective('30sec');
                      }}
                      className="flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                    >
                      <span>Read Brief</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Interactive Learning Paths View */
        <div className="space-y-4">
          {LEARNING_PATHS.map((path) => (
            <div
              key={path.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{path.title}</h3>
                    <p className="text-xs text-slate-500">{path.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 font-mono text-[10px] font-bold rounded">
                    {path.duration}
                  </span>
                  <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 font-bold text-[10px] rounded border border-indigo-200">
                    {path.level}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Guided Learning Steps:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {path.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start space-x-2 text-slate-800 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal with Perspective View Switcher */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {selectedResource.category} Briefing
                </span>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Perspective View Switcher Tabs */}
            <div className="p-2 bg-slate-100 border-b border-slate-200 flex gap-1 text-xs">
              <button
                onClick={() => setActivePerspective('30sec')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
                  activePerspective === '30sec'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>30-Second Summary</span>
              </button>

              <button
                onClick={() => setActivePerspective('exec')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
                  activePerspective === 'exec'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Executive View</span>
              </button>

              <button
                onClick={() => setActivePerspective('practitioner')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
                  activePerspective === 'practitioner'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Practitioner View</span>
              </button>

              <button
                onClick={() => setActivePerspective('technical')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
                  activePerspective === 'technical'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Technical Implementation</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-800">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-blue-100 text-blue-800 border border-blue-200 rounded">
                  {selectedResource.indiaJurisdiction}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-2">{selectedResource.title}</h2>
              </div>

              {/* View Content Rendering */}
              {activePerspective === '30sec' && (
                <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-lg space-y-2">
                  <div className="flex items-center space-x-2 text-amber-800 font-bold uppercase text-[11px]">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>30-Second Executive Snapshot</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed font-medium">{selectedResource.shortSummary}</p>
                  <div className="pt-2 border-t border-amber-200/60 font-mono text-[11px] text-amber-900">
                    <strong>Primary Mandate:</strong> Strict statutory compliance under {selectedResource.indiaJurisdiction}.
                  </div>
                </div>
              )}

              {activePerspective === 'exec' && (
                <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-lg space-y-3">
                  <span className="font-bold text-blue-900 uppercase tracking-wider text-[11px] block">
                    Boardroom & C-Suite Risk Impact:
                  </span>
                  <p className="text-slate-800 leading-relaxed">{selectedResource.detailedContent}</p>
                  <div className="p-3 bg-white rounded border border-blue-200 space-y-1">
                    <span className="font-bold text-blue-900 text-[10px] uppercase block">
                      Statutory Penalty Threshold:
                    </span>
                    <p className="text-slate-700 text-[11px]">
                      Up to ₹250 Crore per incident under DPDP Act 2023 for failure to observe child data protection standards.
                    </p>
                  </div>
                </div>
              )}

              {activePerspective === 'practitioner' && (
                <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-lg space-y-3">
                  <span className="font-bold text-indigo-900 uppercase tracking-wider text-[11px] block">
                    Product & Trust Safety Operational Workflow:
                  </span>
                  <ul className="space-y-2 text-slate-800">
                    {selectedResource.keyTakeaways.map((kt, idx) => (
                      <li key={idx} className="flex items-start space-x-2 p-2 bg-white rounded border border-indigo-200">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-800">{kt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activePerspective === 'technical' && (
                <div className="p-4 bg-slate-900 text-emerald-400 rounded-lg font-mono text-[11px] space-y-3 border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-amber-400 uppercase text-[10px]">
                      Engineering Architecture & Code Spec
                    </span>
                    <span className="text-[10px] text-slate-400">PostgreSQL / API Spec</span>
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed text-slate-200">
{`// Technical Enforcement Endpoint for ${selectedResource.title}
export async function enforceChildSafetyPolicy(userId: string, ageTier: string) {
  if (ageTier === 'under_13') {
    const parentConsent = await verifyDigiLockerVPC(userId);
    if (!parentConsent.valid) {
      throw new Error("DPDP_SEC_9_VPC_REQUIRED: Missing verifiable consent.");
    }
    // Block behavioral profiling & ad tracking tags
    await disableTrackingPixels(userId);
  }
}`}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              {selectedResource.externalUrl ? (
                <a
                  href={selectedResource.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Official Gazette / Gazette Reference</span>
                </a>
              ) : (
                <span className="text-xs text-slate-500 font-mono">
                  Internal ThriveSafe Knowledge Artifact
                </span>
              )}

              <button
                onClick={() => setSelectedResource(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded transition-all cursor-pointer"
              >
                Close Brief
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
