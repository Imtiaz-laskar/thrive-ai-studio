import React from 'react';
import {
  ShieldAlert,
  BookOpen,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Activity,
  Cpu,
  Layers,
  Award,
  Download,
  Building2,
  Search,
  Library,
  Bot,
  Grid,
  ShieldCheck,
  FolderCheck,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenExporter: () => void;
  onOpenSearch: () => void;
  onOpenCopilot: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenExporter,
  onOpenSearch,
  onOpenCopilot
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'digital_twin', label: 'Digital Twin Simulator', icon: Sparkles },
    { id: 'product_assessment', label: 'Product Assessment', icon: AlertTriangle },
    { id: 'threat_center', label: 'Threat Center', icon: Cpu },
    { id: 'compliance_hub', label: 'Compliance Hub', icon: BookOpen },
    { id: 'incident_center', label: 'Incident Command', icon: FileText },
    { id: 'audit_vault', label: 'Audit Vault', icon: FolderCheck },
    { id: 'governance', label: 'Governance & RACI', icon: Building2 },
    { id: 'lifecycle', label: 'Safety Lifecycle', icon: Layers },
    { id: 'knowledge_bank', label: 'Knowledge Bank', icon: Library },
    { id: 'maturity', label: 'Maturity Model', icon: Award }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Platform Title */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center font-black text-xl text-white shadow-md group-hover:scale-105 transition-transform">
              T
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-extrabold leading-none tracking-tight text-white uppercase">
                  ThriveSafe AI Platform
                </h1>
                <span className="px-2 py-0.5 text-[9px] font-extrabold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded">
                  DPDP Act & IT Rules Certified
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                Child Safety & Wellbeing Operating Framework for India • v2.4
              </p>
            </div>
          </div>

          {/* Quick Actions Header Toolbar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* ThriveSafe AI Copilot Trigger */}
            <button
              onClick={onOpenCopilot}
              className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg shadow transition-all cursor-pointer border border-blue-400/30"
            >
              <Bot className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">ThriveSafe Copilot</span>
              <span className="sm:hidden">Copilot</span>
            </button>

            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium rounded-lg border border-slate-700 transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline">Quick Search (Ctrl+K)</span>
              <span className="md:hidden">Search</span>
            </button>

            {/* Export Audit Package */}
            <button
              onClick={onOpenExporter}
              className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold rounded-lg border border-slate-700 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Audit Export</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex space-x-1 overflow-x-auto py-2 no-scrollbar border-t border-slate-800 text-[11px] font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
