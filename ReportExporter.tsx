import React, { useState } from 'react';
import { X, Download, Copy, Check, Printer, FileText, Shield } from 'lucide-react';

interface ReportExporterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportExporter: React.FC<ReportExporterProps> = ({ isOpen, onClose }) => {
  const [reportType, setReportType] = useState<'governance' | 'csia' | 'launch_gate' | 'github_showcase'>('governance');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const generateMarkdownReport = () => {
    const timestamp = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

    if (reportType === 'governance') {
      return `# THRIVESAFE AI: CHILD SAFETY & WELLBEING OPERATING FRAMEWORK
**Enterprise Governance & Child Rights Policy Briefing**
**Target Jurisdiction:** India (DPDP Act 2023, IT Rules 2021, POCSO Act 2012)
**Generated Date:** ${timestamp}

---

## 1. Executive Summary & Governance Mandate
This operating framework establishes mandatory Child Safety, Privacy, and AI Risk Governance across all digital products and AI systems operating in India.

### Key Governance Principles:
- **Child Rights by Design (UNCRC Alignment):** Prioritizing child safety over monetization metrics.
- **DPDP Act 2023 Sec 9 Compliance:** Strict Verifiable Parental Consent (VPC) & zero behavioral tracking for minors.
- **24/7 Rapid Incident Escalation:** 15-minute triage for CSAM/Self-Harm and 24-hour statutory takedown under IT Rules 2021.

---

## 2. Key Role Accountabilities (RACI Summary)
- **Executive Safety Sponsor:** Ultimate accountability for child safety & Board quarterly audits.
- **Product Lead - Child Safety:** Integrates age-appropriate UX & default max-privacy settings.
- **Data Protection Officer (DPO):** Audits parental consent architecture & DPDP data minimization.
- **Resident Grievance Officer (RGO):** Mandated under IT Rules 2021 for 24h complaint resolution.

---

## 3. Statutory Compliance Mapping (India)
1. **DPDP Act 2023 Sec 9(1):** Verifiable Parental Consent (Aadhaar VID / DigiLocker / Bank Penny Drop).
2. **DPDP Act 2023 Sec 9(2):** Prohibition of tracking, behavioral monitoring, and targeted ads for minors.
3. **IT Rules 2021 Rule 3(2)(b):** 24-hour takedown mandate for non-consensual deepfakes & CSAM.
4. **IT Act Sec 67B & POCSO Act:** Zero-tolerance PhotoDNA CSAM pre-upload scanning and NCRB reporting.

---
*Signed by Executive Safety Committee & Data Protection Officer*`;
    }

    if (reportType === 'csia') {
      return `# CHILD SAFETY IMPACT ASSESSMENT (CSIA / CRIA / DPIA)
**Product Identifier:** AI Conversational Companion / Generative Media Service
**Framework:** ThriveSafe Child Safety Risk Scoring Protocol
**Generated Date:** ${timestamp}

---

## 1. Risk Scoring & Classification
- **Calculated Risk Index:** 78 / 100
- **Risk Category:** CRITICAL RISK PROTOCOL REQUIRED
- **Assessed Cohorts:** Minors Under 13, Young Teens (13-15), Youth (16-17)

## 2. UNCRC Child Rights Impact Assessment (CRIA)
- **Article 3 (Best Interests):** Verified no engagement-only optimization or dark patterns targeting minors.
- **Article 16 (Privacy):** Telemetry scrubbers active; zero third-party ad tracking SDKs.
- **Article 34 (Protection from Exploitation):** Real-time LLM prompt firewall blocking grooming and CSAM prompts.

## 3. DPDP Act 2023 Section 9 Audit
- **Parental Consent:** DigiLocker API integrated for verifiable guardian authorization.
- **Data Erasure:** Automated 30-day chat log deletion cron jobs active.

---
*Status: Approved for Design Review Gate*`;
    }

    if (reportType === 'launch_gate') {
      return `# LAUNCH REVIEW GATE DECISION AUDIT CERTIFICATE
**Product Name:** ThriveSafe AI Service v1.0
**Review Board:** Cross-Functional Child Safety & Legal Committee
**Generated Date:** ${timestamp}

---

## LAUNCH DECISION: [ VERIFIED GO FOR PRODUCTION ]

### Mandatory Checklist Sign-off:
- [✓] CSAM Pre-Upload Scanner (PhotoDNA) Operational
- [✓] Verifiable Parental Consent (VPC) Gateway Active
- [✓] Zero-Tracking Telemetry Scrubbers Active
- [✓] Real-Time LLM Prompt Firewall Passed 5,000+ Red-Team Tests (>98% Refusal)
- [✓] India Resident Grievance Officer Appointed & Contact Details Published
- [✓] One-Tap Emergency Helpline Interceptors (Childline 1098) Integrated

---
*Certificate ID: THRIVESAFE-GATE-2026-99211*`;
    }

    return `# THRIVESAFE KIDS — ENTERPRISE CHILD SAFETY & RESPONSIBLE AI PLATFORM
> **Public Ideation & System Architecture Portfolio (Intellectual Property Protected)**
> **Project Author:** Confidential / Imtiaz Laskar
> **Date:** ${timestamp}
> **License & IP Status:** All Rights Reserved. Proprietary Architectural Brief (Non-Commercial View Only).

---

## 🎯 Executive Problem Statement & Ideation Purpose

Modern generative AI applications and digital platforms exposed to children under 18 face unprecedented statutory mandates under India's **Digital Personal Data Protection (DPDP) Act 2023 (Section 9)**, **IT Rules 2021**, **POCSO Act 2012**, and global **UNCRC Child Rights** frameworks.

### The Core Problem Being Solved:
1. **Lack of Automated Compliance Pipelines:** Product and engineering teams deploy LLMs and conversational agents without real-time age-appropriate safety firewalls.
2. **Statutory Penalties & Fines:** Non-compliance with Verifiable Parental Consent (VPC) and zero-behavioral tracking carries statutory fines up to ₹250 Crore.
3. **Absence of Pre-Launch Simulation:** Organizations lack sandbox environments ("Digital Twins") to test AI features against child wellbeing metrics before public release.

---

## 🏗️ High-Level Abstract Architecture (Clean-Room Specification)

To solve these challenges without exposing proprietary source code, the system establishes a four-tier clean-room architecture:

\`\`\`
  [ Public User Interaction Layer ]
                │
                ▼
  ┌──────────────────────────────────────────┐
  │ 1. Real-Time Prompt Firewall & Filter    │  ◄── (Blocks grooming, CSAM, self-harm)
  └──────────────────────────────────────────┘
                │
                ▼
  ┌──────────────────────────────────────────┐
  │ 2. DPDP Sec 9 VPC & Privacy Gateway       │  ◄── (DigiLocker / Aadhaar VID consent)
  └──────────────────────────────────────────┘
                │
                ▼
  ┌──────────────────────────────────────────┐
  │ 3. Child Safety Digital Twin Simulator  │  ◄── (Pre-launch wellbeing testing)
  └──────────────────────────────────────────┘
                │
                ▼
  ┌──────────────────────────────────────────┐
  │ 4. Executive Audit Vault & Certifier     │  ◄── (Statutory compliance certificates)
  └──────────────────────────────────────────┘
\`\`\`

---

## 🔒 Intellectual Property & Proprietary Rights Notice

This repository provides an abstract conceptual showcase of the **ThriveSafe Child Safety Operating Framework**. 

- **Trade Secrets & Code Preservation:** The underlying production algorithms, neural weight filters, database schemas, and cryptographic key vaults remain proprietary trade secrets.
- **Copyright Protection:** Copyright © 2026. All rights reserved. No part of this conceptual specification, architecture design, or methodology may be reproduced, reverse-engineered, or commercialized without explicit written permission.
- **Patent Rights:** Patent applications and utility protections apply to the automated pre-launch Digital Twin child wellbeing scoring pipeline.

*For inquiries or enterprise partnership licensing, please reach out directly through formal channels.*`;
  };

  const markdownContent = generateMarkdownReport();

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thrivesafe_child_safety_${reportType}_report.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-3xl overflow-hidden shadow-xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Export Framework Report & Policy Assessment</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Report Type Selector */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex space-x-2">
          <button
            onClick={() => setReportType('governance')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
              reportType === 'governance' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Governance Briefing
          </button>
          <button
            onClick={() => setReportType('csia')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
              reportType === 'csia' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            CSIA / CRIA Report
          </button>
          <button
            onClick={() => setReportType('launch_gate')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
              reportType === 'launch_gate' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Launch Gate Certificate
          </button>
          <button
            onClick={() => setReportType('github_showcase')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
              reportType === 'github_showcase' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            GitHub Showcase & IP Spec
          </button>
        </div>

        {/* Content Preview Box */}
        <div className="p-5 bg-slate-50/50 overflow-y-auto flex-1 font-mono text-xs text-slate-800 space-y-2 border-b border-slate-200">
          <pre className="whitespace-pre-wrap">{markdownContent}</pre>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-white flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold rounded transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print View</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold rounded transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .MD Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
