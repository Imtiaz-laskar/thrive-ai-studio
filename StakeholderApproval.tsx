import React, { useState, useRef } from 'react';
import { StakeholderApprovalRecord } from '../types/framework';
import {
  FileCheck,
  PenTool,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Download,
  Copy,
  Check,
  Lock,
  UserCheck,
  Plus,
  Filter,
  BadgeCheck,
  RefreshCw,
  Trash2,
  Calendar,
  Hash,
  ChevronDown,
  ChevronUp,
  X,
  FileText
} from 'lucide-react';

const INITIAL_APPROVALS: StakeholderApprovalRecord[] = [
  {
    id: 'SIG-2026-DPDP-01',
    stakeholderName: 'Dr. Ramesh K. Varma',
    role: 'Data Protection Officer (DPO) & Privacy Lead',
    department: 'Privacy & Data Governance',
    milestone: 'DPDP Sec 9 Verifiable Parental Consent Architecture Signoff',
    status: 'Approved',
    timestamp: '2026-07-20 10:14:22 IST',
    digitalSignatureHash: 'SIG-SHA256-9F8A2B1C4D5E6F7A8B9C0D1E2F3A4B5C',
    signatureType: 'Cryptographic Hash',
    complianceNotes: 'Full compliance verified for DigiLocker parental consent verification & zero-tracking rules for minors under 18.',
    riskCategory: 'DPDP Privacy',
    verificationStatus: 'Valid',
    verifiedByIp: '10.240.12.88'
  },
  {
    id: 'SIG-2026-CSAM-02',
    stakeholderName: 'Ayesha Mukherjee',
    role: 'Chief Trust & Safety / Executive Sponsor',
    department: 'Executive Office / T&S',
    milestone: 'CSAM & CSAE Zero-Tolerance Classifier & NCRB Reporting Audit',
    status: 'Approved',
    timestamp: '2026-07-19 16:45:10 IST',
    digitalSignatureHash: 'SIG-SHA256-3E4F5A6B7C8D9E0F1A2B3C4D5E6F7A8B',
    signatureType: 'SSO Authenticated',
    complianceNotes: 'PhotoDNA and perceptual hash matcher calibrated. Law enforcement dispatch queue tested with zero false positives on trial dataset.',
    riskCategory: 'CSAM & Zero Tolerance',
    verificationStatus: 'Valid',
    verifiedByIp: '10.240.14.102'
  },
  {
    id: 'SIG-2026-AIG-03',
    stakeholderName: 'Vikramaditya Singh',
    role: 'Lead Safety & ML Infrastructure Engineer',
    department: 'Engineering & Data Science',
    milestone: 'Real-time Prompt Sanitizer & Model Jailbreak Firewall Verification',
    status: 'Conditionally Approved',
    timestamp: '2026-07-18 11:30:00 IST',
    digitalSignatureHash: 'SIG-SHA256-7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D',
    signatureType: 'Cryptographic Hash',
    complianceNotes: 'Conditional approval granted pending latency optimization (<120ms requirement). Red-teaming jailbreak defense stands at 99.4%.',
    riskCategory: 'AI Guardrails',
    verificationStatus: 'Valid',
    verifiedByIp: '10.240.18.45'
  },
  {
    id: 'SIG-2026-ITR-04',
    stakeholderName: 'Priya Sundaram',
    role: 'Resident Grievance Officer & Legal Counsel',
    department: 'Legal & Regulatory Affairs',
    milestone: 'IT Rules 2021 24h CSAM Takedown & Monthly Grievance Protocol',
    status: 'Approved',
    timestamp: '2026-07-15 09:05:40 IST',
    digitalSignatureHash: 'SIG-SHA256-1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E',
    signatureType: 'Biometric/Canvas',
    complianceNotes: 'Resident Grievance portal configured with automated statutory clocking for 24h CSAM and 36h content orders.',
    riskCategory: 'General Governance',
    verificationStatus: 'Valid',
    verifiedByIp: '10.240.11.05'
  }
];

export const StakeholderApproval: React.FC = () => {
  const [approvals, setApprovals] = useState<StakeholderApprovalRecord[]>(INITIAL_APPROVALS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [verifiedHashId, setVerifiedHashId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    stakeholderName: '',
    role: 'Chief Trust & Safety / Executive Safety Sponsor',
    department: 'Executive Office / T&S',
    milestone: 'DPDP Sec 9 Verifiable Parental Consent Architecture Signoff',
    status: 'Approved' as 'Approved' | 'Conditionally Approved' | 'Rejected' | 'Pending Review',
    signatureType: 'Cryptographic Hash' as 'Cryptographic Hash' | 'SSO Authenticated' | 'Biometric/Canvas',
    riskCategory: 'DPDP Privacy' as 'DPDP Privacy' | 'CSAM & Zero Tolerance' | 'AI Guardrails' | 'General Governance',
    complianceNotes: '',
    signatureText: ''
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasCanvasSignature, setHasCanvasSignature] = useState(false);

  // Canvas Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 2;
    ctx.stroke();
    setHasCanvasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasCanvasSignature(false);
  };

  const generateSignatureHash = (name: string, milestone: string, timestamp: string) => {
    const str = `${name}-${milestone}-${timestamp}-${Math.random().toString(36).substring(2, 10)}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
    const randPart = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `SIG-SHA256-${hex}${randPart}`;
  };

  const handleAddApproval = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.stakeholderName.trim()) return;

    const now = new Date();
    const timestampStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} IST`;
    const newHash = generateSignatureHash(formData.stakeholderName, formData.milestone, timestampStr);

    const newRecord: StakeholderApprovalRecord = {
      id: `SIG-${now.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      stakeholderName: formData.stakeholderName,
      role: formData.role,
      department: formData.department,
      milestone: formData.milestone,
      status: formData.status,
      timestamp: timestampStr,
      digitalSignatureHash: newHash,
      signatureType: formData.signatureType,
      complianceNotes: formData.complianceNotes || 'Formally recorded and timestamped digital signature for regulatory compliance audit.',
      riskCategory: formData.riskCategory,
      verificationStatus: 'Valid',
      verifiedByIp: '10.240.15.99'
    };

    setApprovals([newRecord, ...approvals]);
    setIsModalOpen(false);
    setFormData({
      stakeholderName: '',
      role: 'Chief Trust & Safety / Executive Safety Sponsor',
      department: 'Executive Office / T&S',
      milestone: 'DPDP Sec 9 Verifiable Parental Consent Architecture Signoff',
      status: 'Approved',
      signatureType: 'Cryptographic Hash',
      riskCategory: 'DPDP Privacy',
      complianceNotes: '',
      signatureText: ''
    });
    clearCanvas();
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleVerifyHash = (id: string) => {
    setVerifiedHashId(id);
    setTimeout(() => setVerifiedHashId(null), 3000);
  };

  const handleDeleteApproval = (id: string) => {
    if (confirm('Are you sure you want to revoke this digital signature from the audit ledger?')) {
      setApprovals(approvals.filter(a => a.id !== id));
    }
  };

  const filteredApprovals = approvals.filter(item => {
    const matchesSearch =
      item.stakeholderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.milestone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.digitalSignatureHash.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || item.riskCategory === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const exportAuditLogJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(approvals, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Child_Safety_Stakeholder_Approvals_Audit_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getStatusBadge = (status: StakeholderApprovalRecord['status']) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Approved</span>
          </span>
        );
      case 'Conditionally Approved':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200 rounded-full">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            <span>Conditional</span>
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 text-[11px] font-bold bg-red-100 text-red-800 border border-red-200 rounded-full">
            <XCircle className="w-3 h-3 text-red-600" />
            <span>Rejected</span>
          </span>
        );
      case 'Pending Review':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 rounded-full">
            <RefreshCw className="w-3 h-3 text-blue-600 animate-spin" />
            <span>Pending</span>
          </span>
        );
    }
  };

  const approvedCount = approvals.filter(a => a.status === 'Approved').length;
  const conditionalCount = approvals.filter(a => a.status === 'Conditionally Approved').length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileCheck className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              4. Stakeholder Sign-Off & Digital Signature Audit Trail
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically timestamped compliance approvals recorded for DPDP Act 2023, IT Rules 2021, and internal safety gates.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={exportAuditLogJSON}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded border border-slate-200 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export Audit Trail</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Record Digital Signature</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="text-[10px] font-bold uppercase text-slate-500 block">Total Signatures</span>
          <span className="text-xl font-black text-slate-900 font-mono mt-0.5 block">{approvals.length}</span>
        </div>
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <span className="text-[10px] font-bold uppercase text-emerald-800 block">Fully Approved</span>
          <span className="text-xl font-black text-emerald-900 font-mono mt-0.5 block">{approvedCount}</span>
        </div>
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <span className="text-[10px] font-bold uppercase text-amber-800 block">Conditional Clearances</span>
          <span className="text-xl font-black text-amber-900 font-mono mt-0.5 block">{conditionalCount}</span>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="text-[10px] font-bold uppercase text-blue-800 block">Integrity Verification</span>
          <span className="text-xl font-black text-blue-900 font-mono mt-0.5 block">100% Valid</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by stakeholder, role, milestone or hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <div className="flex items-center space-x-1 text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span className="font-semibold">Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Conditionally Approved">Conditional</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending Review">Pending</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All">All Risk Domains</option>
            <option value="DPDP Privacy">DPDP Privacy</option>
            <option value="CSAM & Zero Tolerance">CSAM & Zero Tolerance</option>
            <option value="AI Guardrails">AI Guardrails</option>
            <option value="General Governance">General Governance</option>
          </select>
        </div>
      </div>

      {/* Signatures Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-3">Stakeholder & Role</th>
              <th className="p-3 min-w-[180px]">Compliance Milestone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Timestamp (IST)</th>
              <th className="p-3">SHA-256 Signature Stamp</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {filteredApprovals.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-slate-500 text-xs">
                  No digital signatures found matching search criteria.
                </td>
              </tr>
            ) : (
              filteredApprovals.map((record) => {
                const isExpanded = expandedId === record.id;
                const isVerified = verifiedHashId === record.id;

                return (
                  <React.Fragment key={record.id}>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-3">
                        <div>
                          <p className="font-bold text-slate-900">{record.stakeholderName}</p>
                          <p className="text-[11px] text-slate-500 font-medium">{record.role}</p>
                          <span className="inline-block mt-0.5 text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            {record.department}
                          </span>
                        </div>
                      </td>

                      <td className="p-3 font-medium text-slate-800">
                        <div>
                          <p className="line-clamp-2">{record.milestone}</p>
                          <span className="inline-block mt-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                            {record.riskCategory}
                          </span>
                        </div>
                      </td>

                      <td className="p-3">{getStatusBadge(record.status)}</td>

                      <td className="p-3 font-mono text-[11px] text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{record.timestamp}</span>
                        </div>
                      </td>

                      <td className="p-3">
                        <div className="flex items-center space-x-1.5">
                          <code className="px-2 py-1 bg-slate-900 text-emerald-400 rounded font-mono text-[10px] tracking-tight">
                            {record.digitalSignatureHash.substring(0, 16)}...
                          </code>
                          <button
                            onClick={() => handleCopyHash(record.digitalSignatureHash)}
                            title="Copy full signature hash"
                            className="p-1 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded transition-colors cursor-pointer"
                          >
                            {copiedHash === record.digitalSignatureHash ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleVerifyHash(record.id)}
                            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold rounded transition-colors cursor-pointer"
                          >
                            Verify Hash
                          </button>

                          <button
                            onClick={() => setExpandedId(isExpanded ? null : record.id)}
                            className="p-1 text-slate-500 hover:text-blue-700 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>

                          <button
                            onClick={() => handleDeleteApproval(record.id)}
                            title="Revoke signature"
                            className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Verification Notification Banner */}
                    {isVerified && (
                      <tr className="bg-emerald-50 border-y border-emerald-200">
                        <td colSpan={6} className="p-3 text-xs text-emerald-900">
                          <div className="flex items-center space-x-2">
                            <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="font-bold">Cryptographic Integrity Confirmed:</span>
                            <span>
                              Signature hash <code className="font-mono text-emerald-950 font-bold">{record.digitalSignatureHash}</code> matched ledger block at {record.verifiedByIp || '10.240.12.88'}. No tampering detected.
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}

                    {/* Expanded Audit Details */}
                    {isExpanded && (
                      <tr className="bg-slate-50 border-y border-slate-200">
                        <td colSpan={6} className="p-4 text-xs space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-3 rounded border border-slate-200">
                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-500 block">Signature Type</span>
                              <span className="font-semibold text-slate-900 flex items-center space-x-1 mt-0.5">
                                <Lock className="w-3.5 h-3.5 text-blue-600" />
                                <span>{record.signatureType}</span>
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-500 block">Verification Status</span>
                              <span className="font-semibold text-emerald-700 flex items-center space-x-1 mt-0.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{record.verificationStatus} Integrity</span>
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-500 block">Signer Node IP</span>
                              <span className="font-mono text-slate-800 font-medium mt-0.5 block">{record.verifiedByIp || '10.240.12.88'}</span>
                            </div>
                          </div>

                          <div className="bg-white p-3 rounded border border-slate-200">
                            <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                              Compliance Audit Notes & Recommendations:
                            </span>
                            <p className="text-slate-700 leading-relaxed font-medium">
                              {record.complianceNotes}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Record Digital Signature Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-5 text-slate-900 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <PenTool className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">Record Digital Stakeholder Approval</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddApproval} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stakeholder Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Ananya Sharma"
                    value={formData.stakeholderName}
                    onChange={(e) => setFormData({ ...formData, stakeholderName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Risk Domain / Category</label>
                  <select
                    value={formData.riskCategory}
                    onChange={(e) => setFormData({ ...formData, riskCategory: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="DPDP Privacy">DPDP Privacy</option>
                    <option value="CSAM & Zero Tolerance">CSAM & Zero Tolerance</option>
                    <option value="AI Guardrails">AI Guardrails</option>
                    <option value="General Governance">General Governance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Chief Trust & Safety / Executive Safety Sponsor">Chief Trust & Safety / Executive Sponsor</option>
                    <option value="Product Lead - Child Safety & Wellbeing">Product Lead - Child Safety & Wellbeing</option>
                    <option value="Head of AI Trust & Safety Operations">Head of AI Trust & Safety Operations</option>
                    <option value="Data Protection Officer (DPO) & Privacy Lead">Data Protection Officer (DPO) & Privacy Lead</option>
                    <option value="Resident Grievance Officer & Legal Counsel">Resident Grievance Officer & Legal Counsel</option>
                    <option value="Lead Safety & ML Infrastructure Engineer">Lead Safety & ML Infrastructure Engineer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Compliance Milestone Signoff</label>
                <select
                  value={formData.milestone}
                  onChange={(e) => setFormData({ ...formData, milestone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="DPDP Sec 9 Verifiable Parental Consent Architecture Signoff">DPDP Sec 9 Verifiable Parental Consent Architecture</option>
                  <option value="CSAM & CSAE Zero-Tolerance Classifier & NCRB Reporting Audit">CSAM & CSAE Zero-Tolerance Classifier & NCRB Audit</option>
                  <option value="Real-time Prompt Sanitizer & Model Jailbreak Firewall Verification">Real-time Prompt Sanitizer & Jailbreak Firewall</option>
                  <option value="IT Rules 2021 24h CSAM Takedown & Monthly Grievance Protocol">IT Rules 2021 24h CSAM Takedown & Grievance Protocol</option>
                  <option value="Pre-Launch Design Review Gate Safety Approval">Pre-Launch Design Review Gate Safety Approval</option>
                  <option value="Quarterly Board Child Safety Audit Clearance">Quarterly Board Child Safety Audit Clearance</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Approval Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Approved">Approved</option>
                    <option value="Conditionally Approved">Conditionally Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Pending Review">Pending Review</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Signature Method</label>
                  <select
                    value={formData.signatureType}
                    onChange={(e) => setFormData({ ...formData, signatureType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Cryptographic Hash">Cryptographic Hash Stamp</option>
                    <option value="SSO Authenticated">SSO OAuth Token</option>
                    <option value="Biometric/Canvas">Biometric / Canvas Sign</option>
                  </select>
                </div>
              </div>

              {formData.signatureType === 'Biometric/Canvas' ? (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-slate-700">Digital Touch Signature</label>
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="text-[11px] text-blue-600 hover:underline font-semibold"
                    >
                      Clear Pad
                    </button>
                  </div>
                  <canvas
                    ref={canvasRef}
                    width={450}
                    height={90}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="w-full bg-slate-50 border border-slate-300 rounded cursor-crosshair touch-none"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Draw signature above using mouse or touch screen.</p>
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Digital Signature Verification Name</label>
                  <input
                    type="text"
                    placeholder="Type full legal name to verify signature"
                    value={formData.signatureText}
                    onChange={(e) => setFormData({ ...formData, signatureText: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Compliance Audit Notes & Safeguard Directives</label>
                <textarea
                  rows={3}
                  placeholder="Record formal comments, audit findings or conditional launch mandates..."
                  value={formData.complianceNotes}
                  onChange={(e) => setFormData({ ...formData, complianceNotes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded text-[11px] text-blue-900 space-y-1">
                <span className="font-bold flex items-center space-x-1">
                  <Lock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Regulatory Legal Notice:</span>
                </span>
                <p>
                  Submitting this digital signature binds the approval to an immutable cryptographic SHA-256 ledger block for compliance audit by Indian regulatory authorities (MeitY / NCPCR).
                </p>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow transition-colors cursor-pointer"
                >
                  Confirm & Stamp Digital Signature
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
