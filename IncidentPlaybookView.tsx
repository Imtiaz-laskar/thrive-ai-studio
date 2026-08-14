import React, { useState } from 'react';
import { INCIDENT_SLAS, INCIDENT_STAGES, SIMULATION_SCENARIOS } from '../data/incidentResponseData';
import { FileText, AlertTriangle, Clock, ShieldAlert, Play, CheckCircle2, ArrowRight } from 'lucide-react';

export const IncidentPlaybookView: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('scen_csam');
  const [simulatedStep, setSimulatedStep] = useState<number>(0);

  const currentScenario = SIMULATION_SCENARIOS.find(s => s.id === activeScenarioId) || SIMULATION_SCENARIOS[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm text-slate-900">
        <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-red-50 border border-red-200 rounded text-red-800 text-[10px] font-bold uppercase tracking-wider mb-2">
          <FileText className="w-3.5 h-3.5 text-red-700" />
          <span>Section 6: Emergency Operations</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
          Child Safety Incident Response Workflow & Playbook
        </h1>
        <p className="text-slate-600 text-xs leading-relaxed max-w-4xl">
          Standard Operating Procedures (SOP) for detecting, triaging, containing, and reporting child harm incidents under statutory SLAs (NCRB CSAM reporting, CERT-In 6-hour notice, IT Rules 24-hour takedown).
        </p>
      </div>

      {/* SLA Tiers Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">1. Statutory SLA Tiers & Notification Targets</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INCIDENT_SLAS.map((sla) => (
            <div
              key={sla.severity}
              className={`p-4 rounded-lg border flex flex-col justify-between space-y-3 ${
                sla.severity === 'Critical'
                  ? 'bg-red-50/50 border-red-200'
                  : sla.severity === 'High'
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                    sla.severity === 'Critical' ? 'bg-red-100 text-red-800 border border-red-200' :
                    sla.severity === 'High' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    'bg-slate-200 text-slate-800'
                  }`}>
                    {sla.severity} Severity
                  </span>
                </div>

                <div className="pt-1 font-mono text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Triage SLA:</span>
                    <span className="font-bold text-slate-900">{sla.triageSLA}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Containment:</span>
                    <span className="font-bold text-slate-900">{sla.containmentSLA}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Resolution:</span>
                    <span className="font-bold text-slate-900">{sla.resolutionSLA}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">Regulatory SLA:</span>
                  <p className="text-[11px] text-slate-800 font-semibold">{sla.regulatoryReportingSLA}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">Example Triggers:</span>
                <ul className="text-[11px] text-slate-600 space-y-0.5 list-disc list-inside">
                  {sla.exampleTriggers.slice(0, 2).map((tr, tIdx) => (
                    <li key={tIdx} className="truncate">{tr}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6-Stage Resolution Pipeline */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-emerald-600" />
          <span>2. Six-Stage Incident Resolution Workflow</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {INCIDENT_STAGES.map((stg) => (
            <div key={stg.stage} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                  {stg.stage}
                </span>
                <h3 className="font-bold text-slate-900 text-xs">{stg.name}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{stg.description}</p>
              <div className="pt-2 border-t border-slate-200 space-y-1">
                {stg.actions.map((act, aIdx) => (
                  <div key={aIdx} className="text-[11px] text-blue-900 flex items-center space-x-1 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Incident Playbook Simulator */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Play className="w-4 h-4 text-blue-600" />
              <span>3. Interactive Incident Playbook Simulator</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Test team response protocol against real-world child harm scenarios</p>
          </div>

          <div className="flex space-x-1.5">
            {SIMULATION_SCENARIOS.map((scen) => (
              <button
                key={scen.id}
                onClick={() => {
                  setActiveScenarioId(scen.id);
                  setSimulatedStep(0);
                }}
                className={`px-2.5 py-1 text-xs rounded font-semibold transition-all cursor-pointer ${
                  activeScenarioId === scen.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {scen.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Scenario Walkthrough */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-800 border border-red-200 rounded uppercase">
                Severity: {currentScenario.correctSeverity}
              </span>
              <h3 className="text-sm font-bold text-slate-900 pt-1">{currentScenario.title}</h3>
              <p className="text-xs text-slate-600">{currentScenario.description}</p>
            </div>
          </div>

          {/* Interactive Steps Visualizer */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Step-by-Step Response Protocol:</h4>
            
            {currentScenario.recommendedSteps.map((stepText, idx) => {
              const isDone = simulatedStep >= idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSimulatedStep(idx)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start space-x-3 ${
                    isDone
                      ? 'bg-white border-blue-400 text-slate-900 shadow-sm'
                      : 'bg-slate-100/70 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    isDone ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 text-slate-500'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold leading-relaxed">{stepText}</p>
                  </div>
                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                </div>
              );
            })}
          </div>

          {/* Simulation Progress Button */}
          <div className="flex justify-end pt-1">
            {simulatedStep < currentScenario.recommendedSteps.length - 1 ? (
              <button
                onClick={() => setSimulatedStep(prev => prev + 1)}
                className="flex items-center space-x-2 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow-sm transition-all cursor-pointer"
              >
                <span>Execute Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="px-3 py-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold rounded flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Playbook Scenario Complete & Logged</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

