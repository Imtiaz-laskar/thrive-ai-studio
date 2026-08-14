import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  FileText,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  X,
  MessageSquare,
  Scale,
  Zap,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

interface ThriveSafeCopilotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'copilot';
  text: string;
  timestamp: string;
  citations?: string[];
  suggestedActions?: { label: string; action: string }[];
}

export const ThriveSafeCopilot: React.FC<ThriveSafeCopilotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'copilot',
      text: 'Namaste! I am **ThriveSafe AI Copilot**, your statutory Trust & Safety AI Assistant. How can I assist you with DPDP Act Section 9, IT Rules compliance, threat modeling, or executive launch approvals today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [
        'DPDP Act 2023 Sec 9 (Child Data)',
        'IT Rules 2021 Rule 3(2)(b) (24h Takedown)',
        'POCSO Act 2012 Sec 14 (CSAM Zero-Tolerance)'
      ],
      suggestedActions: [
        { label: 'Explain DPDP Act Sec 9 Mandate', action: 'dpdp_sec_9' },
        { label: 'Generate Launch Checklist', action: 'launch_checklist' },
        { label: 'Summarize IT Rules SLA Timers', action: 'it_rules_sla' },
        { label: 'Draft Executive Compliance Report', action: 'exec_report' }
      ]
    }
  ]);

  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendMessage = (customQuery?: string) => {
    const query = customQuery || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customQuery) setInputText('');
    setIsTyping(true);

    // Simulated AI Copilot Reasoning & Statutory Response Engine
    setTimeout(() => {
      let responseText = '';
      let citations: string[] = [];
      let suggestedActions: { label: string; action: string }[] = [];

      const lower = query.toLowerCase();

      if (lower.includes('dpdp') || lower.includes('section 9') || lower.includes('consent') || lower.includes('dpdp_sec_9')) {
        responseText = `### DPDP Act 2023 Section 9: Mandatory Child Data Governance

Section 9 of the **Digital Personal Data Protection (DPDP) Act 2023** governs data processing for individuals under 18 years of age:

1. **Verifiable Parental Consent (VPC) [Sec 9(1)]**: Data fiduciaries must obtain verifiable consent from the parent or lawful guardian prior to processing any minor's data (via DigiLocker, Aadhaar VID, or parent portal).
2. **Absolute Ban on Behavioral Profiling [Sec 9(2)]**: Fiduciaries shall **not** undertake tracking, behavioral profiling, or targeted advertising directed at children.
3. **No Harmful Content / Processing [Sec 9(3)]**: Fiduciaries are barred from processing personal data that is likely to cause any detrimental effect on the wellbeing of a child.

**Engineering Requirement**: Enforce zero-ad-tracker code policies, default private minor accounts, and DigiLocker VPC verification integration before user onboarding.`;
        citations = ['DPDP Act 2023 Sec 9(1)-(3)', 'Digital Personal Data Protection Rules 2025 (Draft)', 'NCPCR Guidelines Article 4'];
        suggestedActions = [
          { label: 'Check Design Controls for Consent', action: 'launch_checklist' },
          { label: 'Draft DPDP Audit Statement', action: 'exec_report' }
        ];
      } else if (lower.includes('checklist') || lower.includes('launch') || lower.includes('launch_checklist')) {
        responseText = `### ThriveSafe AI Child Safety Launch Readiness Checklist

Before moving an AI feature to Production, complete these mandatory statutory sign-offs:

- [x] **PhotoDNA / PDQ Hash Matcher**: Active pre-upload image firewall for synthetic CSAM prevention.
- [x] **Verifiable Parental Consent (VPC)**: DigiLocker / Aadhaar VID workflow active for users <18.
- [x] **Behavioral Profiling Ban**: Verified zero ad-trackers or targeted algorithm hooks in client codebase.
- [x] **24h IT Rules Takedown Pipeline**: Resident Grievance Officer (RGO) dashboard connected to 24h SLA queue.
- [x] **Prompt Sanitizer & Suicide Helpline**: Tele-MANAS (14416) / Childline (1098) crisis overlays active.
- [x] **Age Tier Design Restrictions**: Under-13 accounts default to private, zero direct messaging with unapproved adults.`;
        citations = ['IT Rules 2021 Rule 3(1)(b)', 'DPDP Act 2023 Sec 9', 'POCSO Act 2012 Sec 11'];
        suggestedActions = [
          { label: 'Export Full Audit Certificate', action: 'exec_report' }
        ];
      } else if (lower.includes('sla') || lower.includes('it rules') || lower.includes('takedown') || lower.includes('it_rules_sla')) {
        responseText = `### IT Rules 2021 / 2026 Statutory SLA Timers & Mandates

The Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules set strict timelines for intermediaries:

⏱️ **15-Minute Triage**: Immediate escalation for CSAM, child sexual exposure, or imminent self-harm threats.  
⏱️ **1-Hour NCRB Reporting**: Mandatory referral to National Cyber Crime Reporting Portal (NCRB) for CSAM/CSAE incidents.  
⏱️ **6-Hour CERT-In Incident SLA**: Reporting system intrusions, prompt injection breaches, or minor PII leaks under CERT-In Directions 2022.  
⏱️ **24-Hour Statutory Takedown Deadline**: Non-consensual deepfakes, minor privacy violations, or illicit content must be taken down within 24 hours of grievance receipt.`;
        citations = ['IT Rules 2021 Rule 3(2)(b)', 'CERT-In Directions 2022 Sec 70B', 'BNS 2023 Sec 108'];
        suggestedActions = [
          { label: 'Open Incident Command Center', action: 'open_incidents' }
        ];
      } else if (lower.includes('report') || lower.includes('exec') || lower.includes('exec_report')) {
        responseText = `### Executive Child Safety Compliance Certificate (Draft)

**Product Name:** ThriveSafe AI Companion Service v2.4  
**Assessed Jurisdiction:** Republic of India  
**Child Safety Index:** **92/100 (LOW RISK - APPROVED FOR LAUNCH)**  

**Executive Summary:**  
The product architecture has undergone rigorous pre-build risk assessment (CRIA) and data privacy evaluation (DPIA). All 10 high-risk AI threat vectors have been mitigated through code-level controls including prompt firewalls, PhotoDNA CSAM hash matchers, and DigiLocker VPC verification.

**Signed By:**  
- Chief Information Security Officer (CISO)  
- Resident Grievance Officer (RGO)  
- Data Protection Officer (DPO)`;
        citations = ['DPDP Act 2023 Sec 8 & 9', 'IT Rules 2021 Compliance Seal', 'ISO/IEC 42001 AI Standard'];
        suggestedActions = [
          { label: 'Copy Executive Certificate', action: 'copy_cert' }
        ];
      } else {
        responseText = `Based on the **ThriveSafe AI Child Safety Operating Framework**, I have analyzed your query: "${query}".

Key Safeguards & Regulatory Alignment:
1. **Statutory Compliance**: Aligned with DPDP Act 2023 Sec 9, IT Rules 2021 24h Takedown, and POCSO Act 2012 safeguards.
2. **Technical Guardrails**: Enforce input prompt firewalls, real-time toxicity classifiers, and zero minor behavioral profiling.
3. **Escalation**: Any CSAM or self-harm threat triggers immediate 15-minute triage and NCRB reporting.

Would you like me to generate a specific checklist, statutory breakdown, or audit report for this scenario?`;
        citations = ['ThriveSafe AI Operating Framework v2.4', 'DPDP Act 2023', 'IT Rules 2021'];
        suggestedActions = [
          { label: 'Explain DPDP Act Sec 9', action: 'dpdp_sec_9' },
          { label: 'Generate Launch Checklist', action: 'launch_checklist' }
        ];
      }

      const copilotMsg: ChatMessage = {
        id: `copilot-${Date.now()}`,
        sender: 'copilot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations,
        suggestedActions
      };

      setMessages((prev) => [...prev, copilotMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold tracking-wide">ThriveSafe AI Copilot</h2>
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded uppercase">
                  Statutory AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                DPDP Act 2023 • IT Rules 2021 • POCSO Expert
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] rounded-xl p-3.5 text-xs shadow-xs space-y-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-200/20 pb-1 text-[10px]">
                  <span className="font-bold flex items-center space-x-1">
                    {msg.sender === 'user' ? (
                      'You'
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span className="text-blue-700 font-bold">ThriveSafe AI Guidance</span>
                      </>
                    )}
                  </span>
                  <span className={msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}>
                    {msg.timestamp}
                  </span>
                </div>

                <div className="whitespace-pre-line leading-relaxed font-sans">
                  {msg.text}
                </div>

                {/* Citations Box */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 text-[10px] space-y-1">
                    <span className="font-bold text-slate-500 uppercase tracking-wider block flex items-center space-x-1">
                      <Scale className="w-3 h-3 text-amber-600" />
                      <span>Statutory Citations:</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {msg.citations.map((cite, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded font-mono font-semibold"
                        >
                          {cite}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Action Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {msg.suggestedActions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(act.action)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-[10px] font-bold border border-slate-300 transition-all flex items-center space-x-1 cursor-pointer"
                      >
                        <Zap className="w-3 h-3 text-amber-500" />
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Copy Button */}
                {msg.sender === 'copilot' && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleCopyText(msg.id, msg.text)}
                      className="text-[10px] text-slate-400 hover:text-slate-700 flex items-center space-x-1 transition-colors cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200 w-fit animate-pulse">
              <Bot className="w-4 h-4 text-blue-600" />
              <span className="font-medium">ThriveSafe Copilot evaluating statutory rules...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about DPDP Sec 9, IT Rules SLAs, threat mitigations..."
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-slate-400 text-center font-mono">
            Grounding: DPDP Act 2023, IT Rules 2021, POCSO Act 2012, CERT-In Directions
          </p>
        </div>
      </div>
    </div>
  );
};
