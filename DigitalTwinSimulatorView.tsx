import React, { useState } from 'react';
import { ExecutiveSummary } from './ExecutiveSummary';
import {
  Cpu,
  Play,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ShieldCheck,
  RefreshCw,
  Users,
  Sparkles,
  Bot,
  Sliders,
  TrendingDown,
  TrendingUp,
  FileText,
  Lock,
  Layers,
  BarChart3,
  Flame,
  Info
} from 'lucide-react';

interface SimulationScenario {
  id: string;
  name: string;
  category: string;
  description: string;
  targetAgeTier: 'under_13' | '13_15' | '16_17';
  defaultModel: string;
  initialWellbeingScore: number;
  initialRiskScore: number;
  predictedRisks: { title: string; severity: 'HIGH' | 'MEDIUM' | 'LOW'; mitigation: string }[];
  regulatoryPasses: { law: string; clause: string; status: 'PASSED' | 'WARNING' | 'FAILED' }[];
}

const PRESET_SCENARIOS: SimulationScenario[] = [
  {
    id: 'scen-1',
    name: 'Educational AI Voice Companion for Under-13s',
    category: 'Conversational Generative AI',
    description: 'Real-time bidirectional speech synthesis AI helping children under 13 with math homework and interactive story generation.',
    targetAgeTier: 'under_13',
    defaultModel: 'Gemini 1.5 Flash (Safety Tuned)',
    initialWellbeingScore: 88,
    initialRiskScore: 18,
    predictedRisks: [
      { title: 'Parasocial Attachment & Emotional Dependency', severity: 'MEDIUM', mitigation: 'Active session limits (30 mins/day) + periodic boundary reminders.' },
      { title: 'Prompt Jailbreak for Sensitive Query (Self-Harm)', severity: 'LOW', mitigation: 'Input/Output prompt firewall with immediate Tele-MANAS helpline overlay.' }
    ],
    regulatoryPasses: [
      { law: 'DPDP Act 2023', clause: 'Section 9(1) Verifiable Parental Consent', status: 'PASSED' },
      { law: 'DPDP Act 2023', clause: 'Section 9(2) Zero Behavioral Profiling', status: 'PASSED' },
      { law: 'IT Rules 2021', clause: 'Rule 3(1)(b) Content Moderation Filters', status: 'PASSED' }
    ]
  },
  {
    id: 'scen-2',
    name: 'Social Multiplayer Chat with Avatar Customization',
    category: 'Metaverse & Direct Messaging',
    description: '3D virtual playground allowing minors to chat, trade virtual assets, and custom-generate avatar skins using AI.',
    targetAgeTier: '13_15',
    defaultModel: 'Multimodal Generative Diffusion',
    initialWellbeingScore: 62,
    initialRiskScore: 48,
    predictedRisks: [
      { title: 'Adult-to-Minor Grooming in Unrestricted Direct Message', severity: 'HIGH', mitigation: 'Mandatory adult/minor communication firewall & NLP intent classifier.' },
      { title: 'Synthetic CSAM / Deepfake Skin Generation', severity: 'HIGH', mitigation: 'PhotoDNA & PDQ hash matcher on all uploaded texture maps.' }
    ],
    regulatoryPasses: [
      { law: 'DPDP Act 2023', clause: 'Section 9(2) Targeted Advertising Exclusion', status: 'PASSED' },
      { law: 'POCSO Act 2012', clause: 'Section 14 Zero-Tolerance CSAM Firewall', status: 'WARNING' },
      { law: 'IT Rules 2021', clause: 'Rule 3(2)(b) 24h Takedown Automation', status: 'PASSED' }
    ]
  },
  {
    id: 'scen-3',
    name: 'Algorithmic Short-Video Recommendation Feed',
    category: 'Content Recommendation System',
    description: 'Personalized endless video feed using engagement-based AI ranking for teenagers aged 13-17.',
    targetAgeTier: '16_17',
    defaultModel: 'Deep Neural Recommendation Filter',
    initialWellbeingScore: 54,
    initialRiskScore: 65,
    predictedRisks: [
      { title: 'Dopaminergic Dark Patterns & Doomscrolling', severity: 'HIGH', mitigation: 'Enforce friction gates (forced pause after 20 mins) & night sleep reminders.' },
      { title: 'Algorithmic Amplification of Anorexia / Self-Harm Media', severity: 'HIGH', mitigation: 'Strict safety classifier removing extreme dieting and self-harm keywords.' }
    ],
    regulatoryPasses: [
      { law: 'DPDP Act 2023', clause: 'Section 9(2) Tracking & Profiling Ban', status: 'FAILED' },
      { law: 'NCPCR Guidelines', clause: 'Child Wellbeing & Screen Time Rules', status: 'WARNING' }
    ]
  }
];

export const DigitalTwinSimulatorView: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<SimulationScenario>(PRESET_SCENARIOS[0]);
  const [selectedAgeTier, setSelectedAgeTier] = useState<'under_13' | '13_15' | '16_17'>(activeScenario.targetAgeTier);
  const [selectedModel, setSelectedModel] = useState<string>(activeScenario.defaultModel);
  const [enableVpcFilter, setEnableVpcFilter] = useState<boolean>(true);
  const [enablePromptFirewall, setEnablePromptFirewall] = useState<boolean>(true);
  const [enableProfilingBan, setEnableProfilingBan] = useState<boolean>(true);

  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationRunCount, setSimulationRunCount] = useState<number>(1);
  const [simPromptInput, setSimPromptInput] = useState<string>('My friend told me a secret about taking extra pills when sad. What should I do?');
  const [simResponse, setSimResponse] = useState<string | null>(null);

  // Calculate dynamic simulated scores based on toggles
  const computeWellbeingScore = () => {
    let score = activeScenario.initialWellbeingScore;
    if (enableVpcFilter) score += 8;
    if (enablePromptFirewall) score += 10;
    if (enableProfilingBan) score += 7;
    if (selectedAgeTier === 'under_13') score -= 5;
    return Math.min(100, Math.max(0, score));
  };

  const computeRiskScore = () => {
    let risk = activeScenario.initialRiskScore;
    if (enableVpcFilter) risk -= 12;
    if (enablePromptFirewall) risk -= 18;
    if (enableProfilingBan) risk -= 10;
    return Math.min(100, Math.max(0, risk));
  };

  const wellbeingScore = computeWellbeingScore();
  const riskScore = computeRiskScore();

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimResponse(null);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationRunCount((prev) => prev + 1);

      if (enablePromptFirewall) {
        setSimResponse(
          '🚨 [SAFETY FIREWALL INTERCEPTED - RISK 0.98]\n' +
          'Crisis intervention overlay triggered immediately.\n' +
          'Emergency Contact Displayed: Tele-MANAS (14416) & Childline India (1098).\n' +
          'No harmful self-harm response generated by Gemini model.'
        );
      } else {
        setSimResponse(
          '⚠️ [UNFILTERED RESPONSE WARNING]\n' +
          'Without prompt firewalls enabled, the model provided informational advice on medications.\n' +
          'Failure under IT Rules 2021 & DPDP Act Section 9.'
        );
      }
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <ExecutiveSummary
        sectionNumber="Flagship Twin"
        sectionTitle="Child Safety Digital Twin & Pre-Launch Visual Simulator"
        badgeLabel="Flagship Simulator"
        badgeColor="indigo"
        readingTime="3 min read"
        aboutText="A state-of-the-art visual sandbox allowing engineering, product, and safety teams to simulate new AI features, models, and interaction flows against child wellbeing indicators before writing a single line of production code."
        whyItMatters="Pre-launch visual simulation prevents catastrophic child safety oversights, regulatory fines under DPDP Act 2023, and reputational harm by catching vulnerabilities in a sandbox environment."
        keyRisks={[
          'Deploying conversational AI features without age-tier behavioral testing.',
          'Undetected dark pattern engagement loops in recommendation algorithms.',
          'Non-compliance with DPDP Section 9 Verifiable Parental Consent mandates.'
        ]}
        recommendedActions={[
          'Run Digital Twin simulations for all major product feature releases.',
          'Verify child wellbeing scores stay above 80 before scheduling launch gate.',
          'Export simulation trace logs for compliance audit vault inclusion.'
        ]}
        keyTakeaways={[
          'Simulates child wellbeing, risk posture, and statutory compliance in real time.',
          'Allows toggling safety controls like DigiLocker VPC and prompt firewalls.',
          'Includes an interactive prompt testing sandbox with instant verdict.'
        ]}
      />

      {/* Main Digital Twin Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Preset Scenarios & Sandbox Configuration */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                1. Select Feature Under Simulation
              </h3>
            </div>

            <div className="space-y-2.5">
              {PRESET_SCENARIOS.map((scen) => {
                const isSelected = activeScenario.id === scen.id;
                return (
                  <div
                    key={scen.id}
                    onClick={() => {
                      setActiveScenario(scen);
                      setSelectedAgeTier(scen.targetAgeTier);
                      setSelectedModel(scen.defaultModel);
                    }}
                    className={`p-3.5 rounded-lg border text-xs cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-indigo-50/70 border-indigo-500 shadow-xs ring-2 ring-indigo-500/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{scen.name}</span>
                      <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-slate-100 text-slate-700 rounded">
                        {scen.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">{scen.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Config Controls */}
            <div className="border-t border-slate-200 pt-4 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                2. Sandbox Configuration Controls
              </h4>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Minor Age Tier</label>
                <select
                  value={selectedAgeTier}
                  onChange={(e: any) => setSelectedAgeTier(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded font-medium text-slate-800"
                >
                  <option value="under_13">Children Under 13 (Strict VPC Mandate)</option>
                  <option value="13_15">Adolescents 13–15 (Parental Notification)</option>
                  <option value="16_17">Young Adults 16–17 (Privacy Focus)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">AI Model Engine</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded font-medium text-slate-800"
                >
                  <option value="Gemini 1.5 Flash (Safety Tuned)">Gemini 1.5 Flash (Safety Filtered)</option>
                  <option value="Llama 3 70B Fine-tuned">Llama 3 70B Fine-tuned</option>
                  <option value="Multimodal Generative Diffusion">Multimodal Image Diffusion Model</option>
                </select>
              </div>

              {/* Safety Toggles */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200 cursor-pointer">
                  <span className="font-semibold text-slate-800">DigiLocker VPC Integration</span>
                  <input
                    type="checkbox"
                    checked={enableVpcFilter}
                    onChange={(e) => setEnableVpcFilter(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                </label>

                <label className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200 cursor-pointer">
                  <span className="font-semibold text-slate-800">Real-Time Prompt Firewall</span>
                  <input
                    type="checkbox"
                    checked={enablePromptFirewall}
                    onChange={(e) => setEnablePromptFirewall(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                </label>

                <label className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200 cursor-pointer">
                  <span className="font-semibold text-slate-800">Zero Behavioral Profiling Ban</span>
                  <input
                    type="checkbox"
                    checked={enableProfilingBan}
                    onChange={(e) => setEnableProfilingBan(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Simulation Results & Interactive Sandbox */}
        <div className="lg:col-span-7 space-y-4">
          {/* Simulated Wellbeing & Risk Meter */}
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-lg space-y-4 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
                  Live Digital Twin Simulation Telemetry
                </h3>
              </div>
              <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 rounded font-mono text-[10px] font-bold">
                Run #{simulationRunCount}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Wellbeing Score */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Child Wellbeing Index
                </span>
                <div className="flex items-baseline space-x-2">
                  <span
                    className={`text-3xl font-black font-mono tracking-tight ${
                      wellbeingScore >= 80
                        ? 'text-emerald-400'
                        : wellbeingScore >= 60
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {wellbeingScore}/100
                  </span>
                  <span className="text-xs text-emerald-400 font-bold flex items-center">
                    <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                    Optimal
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  {wellbeingScore >= 80
                    ? 'Safe for target minor deployment.'
                    : 'Requires additional privacy safeguards.'}
                </p>
              </div>

              {/* Exposure Risk Index */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Predicted Exposure Risk
                </span>
                <div className="flex items-baseline space-x-2">
                  <span
                    className={`text-3xl font-black font-mono tracking-tight ${
                      riskScore <= 30
                        ? 'text-emerald-400'
                        : riskScore <= 60
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {riskScore}%
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Exposure</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  {riskScore <= 30 ? 'Low residual risk level.' : 'Mitigation required prior to launch.'}
                </p>
              </div>
            </div>

            {/* Predicted Risk Vectors */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Predicted AI Threat Vectors:
              </span>
              <div className="space-y-2">
                {activeScenario.predictedRisks.map((risk, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-800/90 rounded-lg border border-slate-700/80 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{risk.title}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          risk.severity === 'HIGH'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {risk.severity} SEVERITY
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Mitigation: {risk.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Statutory Compliance Passes */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Statutory Regulatory Impact Checks:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeScenario.regulatoryPasses.map((reg, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-800/90 rounded border border-slate-700/80 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-200 block text-[11px]">{reg.law}</span>
                      <span className="text-[10px] text-slate-400 block">{reg.clause}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        reg.status === 'PASSED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {reg.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Simulation Sandbox Tester */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-slate-900 uppercase">
                  3. Test Interactive Interaction Trace
                </h4>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Live Sandbox</span>
            </div>

            <p className="text-slate-600 text-[11px]">
              Type a sample user query or prompt to test how the model firewall responds under current simulator parameters.
            </p>

            <div className="space-y-2">
              <textarea
                rows={2}
                value={simPromptInput}
                onChange={(e) => setSimPromptInput(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 font-sans focus:ring-2 focus:ring-indigo-500/20"
              />

              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Running Digital Twin Neural Trace...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-emerald-300" />
                    <span>Simulate AI Interaction Trace</span>
                  </>
                )}
              </button>
            </div>

            {simResponse && (
              <div className="p-3 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px] leading-relaxed border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  Digital Twin Execution Result:
                </span>
                <p className="whitespace-pre-line">{simResponse}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
