import React, { useState } from 'react';
import { ExecutiveSummary } from './ExecutiveSummary';
import {
  FolderCheck,
  FileCheck,
  ShieldCheck,
  Lock,
  Download,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Award,
  Hash,
  Clock,
  UserCheck,
  Database
} from 'lucide-react';

interface AuditItem {
  id: string;
  title: string;
  category: 'Risk Assessment' | 'Safety Review' | 'Compliance Evidence' | 'Launch Certificate' | 'Incident Record';
  timestamp: string;
  signee: string;
  status: 'CRYPTOGRAPHICALLY SIGNED' | 'VERIFIED' | 'ARCHIVED';
  hash: string;
  statutoryBasis: string;
  description: string;
}

const AUDIT_VAULT_DATA: AuditItem[] = [
  {
    id: 'VAULT-2026-001',
    title: 'Pre-Build Child Risk Impact Assessment (CRIA)',
    category: 'Risk Assessment',
    timestamp: '2026-07-22 06:14:22 UTC',
    signee: 'Data Protection Officer (DPO)',
    status: 'CRYPTOGRAPHICALLY SIGNED',
    hash: '0x8f3a9d12e84c93f01ab45c678d90123ef',
    statutoryBasis: 'UNCRC Article 3 & DPDP Act 2023 Sec 9',
    description: 'Quantified 5-category exposure score (Low Risk - 88/100). Validated VPC DigiLocker controls and zero minor profiling.'
  },
  {
    id: 'VAULT-2026-002',
    title: 'Verifiable Parental Consent (VPC) DigiLocker Audit Log',
    category: 'Compliance Evidence',
    timestamp: '2026-07-21 18:45:10 UTC',
    signee: 'Lead Security Engineer',
    status: 'VERIFIED',
    hash: '0x4c21b90eef52d1109a8761234c89012cd',
    statutoryBasis: 'DPDP Act 2023 Section 9(1)',
    description: '10,000 anonymized parental consent verification tokens verified via DigiLocker / Aadhaar Virtual ID API without raw UIDAI storage.'
  },
  {
    id: 'VAULT-2026-003',
    title: 'Resident Grievance Officer (RGO) Appointment & 24h Takedown SLA',
    category: 'Safety Review',
    timestamp: '2026-07-20 12:30:00 UTC',
    signee: 'Resident Grievance Officer',
    status: 'CRYPTOGRAPHICALLY SIGNED',
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7',
    statutoryBasis: 'IT Rules 2021 Rule 3(2)(b)',
    description: 'Formal designation of India Resident Grievance Officer and activation of automated 24-hour non-consensual deepfake takedown queue.'
  },
  {
    id: 'VAULT-2026-004',
    title: 'PhotoDNA & PDQ CSAM Hash Matcher Verification Seal',
    category: 'Compliance Evidence',
    timestamp: '2026-07-19 09:15:44 UTC',
    signee: 'Chief Information Security Officer (CISO)',
    status: 'CRYPTOGRAPHICALLY SIGNED',
    hash: '0x99887766554433221100aabbccddeeff0',
    statutoryBasis: 'POCSO Act 2012 Sec 14 & IT Rules 2021',
    description: 'Tested pre-upload image stream filtering. Guaranteed 0% bypass for known CSAM hashes and 1-hour NCRB auto-referral.'
  },
  {
    id: 'VAULT-2026-005',
    title: 'Final Executive Launch Certificate: Project ThriveSafe AI v2.4',
    category: 'Launch Certificate',
    timestamp: '2026-07-18 15:20:00 UTC',
    signee: 'Chief Product Officer & CISO',
    status: 'CRYPTOGRAPHICALLY SIGNED',
    hash: '0xefcdab8967452301109876543210fedcba',
    statutoryBasis: 'DPDP Act 2023 / IT Rules 2021 / POCSO Act 2012',
    description: 'Full statutory sign-off approving production release across web and mobile runtimes in India region.'
  }
];

export const AuditVaultView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<AuditItem>(AUDIT_VAULT_DATA[0]);

  const filteredItems = AUDIT_VAULT_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <ExecutiveSummary
        sectionNumber="Vault Hub"
        sectionTitle="Audit & Cryptographic Evidence Vault"
        badgeLabel="Audit & Evidence"
        badgeColor="emerald"
        readingTime="2 min read"
        aboutText="Central tamper-evident repository storing cryptographically timestamped child safety reviews, VPC verification logs, statutory launch certificates, and Grievance Officer sign-offs."
        whyItMatters="In the event of regulatory inquiry by the Data Protection Board of India or MeitY, immutable evidence logs provide legally binding proof of statutory due diligence."
        keyRisks={[
          'Unverified manual sign-offs lacking cryptographic timestamping.',
          'Missing records for historical parental consent DigiLocker verification.',
          'Inability to produce audit trails during statutory compliance inquiries.'
        ]}
        recommendedActions={[
          'Verify all launch certificates before deploying major model updates.',
          'Export annual audit packages for executive board and regulatory filing.',
          'Maintain SHA-256 hash chains for all incident response logs.'
        ]}
        keyTakeaways={[
          'Stores 5 core categories of immutable child safety evidence.',
          'Features SHA-256 hash signatures and multi-stakeholder sign-offs.',
          'Generates one-click audit packages for DPDP Act Section 9 compliance.'
        ]}
      />

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="font-bold text-slate-700">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded font-medium text-slate-800"
          >
            <option value="All">All Categories (5)</option>
            <option value="Risk Assessment">Risk Assessments</option>
            <option value="Safety Review">Safety Reviews</option>
            <option value="Compliance Evidence">Compliance Evidence</option>
            <option value="Launch Certificate">Launch Certificates</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-80 bg-slate-50 px-3 py-1.5 border border-slate-200 rounded">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search certificate ID, signee, hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 w-full"
          />
        </div>
      </div>

      {/* Audit Vault Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Artifacts List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 uppercase tracking-wider">
            <span>Evidence Artifacts ({filteredItems.length})</span>
            <span className="text-emerald-700 text-[10px]">Tamper-Evident</span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredItems.map((item) => {
              const isSelected = activeItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`p-3.5 rounded-lg border text-xs transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-blue-50 border-blue-400 shadow-sm ring-2 ring-blue-500/20'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-500">{item.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                      {item.status}
                    </span>
                  </div>

                  <p className="font-bold text-slate-900 line-clamp-1">{item.title}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>{item.signee}</span>
                    <span className="text-slate-400">{item.timestamp.split(' ')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Artifact Inspection Panel */}
        <div className="lg:col-span-7">
          <div className="bg-white border-2 border-emerald-200 rounded-xl p-5 shadow-sm space-y-4 sticky top-20">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase block">
                  {activeItem.id} • {activeItem.category}
                </span>
                <h3 className="text-base font-bold text-slate-900">{activeItem.title}</h3>
              </div>

              <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Evidence</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Signee Authority</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{activeItem.signee}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Timestamp</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{activeItem.timestamp}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Cryptographic SHA-256 Signature Hash:
                </span>
                <div className="p-2.5 bg-slate-900 text-emerald-400 font-mono rounded text-[11px] break-all border border-slate-800 shadow-inner">
                  {activeItem.hash}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Statutory Basis & Reference:
                </span>
                <div className="p-2.5 bg-blue-50 text-blue-900 font-mono font-bold rounded border border-blue-200">
                  {activeItem.statutoryBasis}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Evidence Summary & Technical Details:
                </span>
                <p className="p-3 bg-slate-50 text-slate-800 rounded border border-slate-200 leading-relaxed font-medium">
                  {activeItem.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => alert(`Downloading cryptographic proof artifact: ${activeItem.id}`)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Verification Proof (.JSON)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
