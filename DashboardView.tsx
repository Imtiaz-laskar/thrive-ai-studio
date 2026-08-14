import React, { useState } from 'react';
import { SAFETY_METRICS_DATA } from '../data/sqlQueriesData';
import { ExecutiveSummary } from './ExecutiveSummary';
import { Activity, Database, Copy, Check, TrendingUp, Shield } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const MONTHLY_TREND_DATA = [
  { month: 'Jan', reportVolume: 120, interceptedPrompts: 450, csamAttempts: 0 },
  { month: 'Feb', reportVolume: 98, interceptedPrompts: 520, csamAttempts: 0 },
  { month: 'Mar', reportVolume: 140, interceptedPrompts: 610, csamAttempts: 0 },
  { month: 'Apr', reportVolume: 85, interceptedPrompts: 480, csamAttempts: 0 },
  { month: 'May', reportVolume: 110, interceptedPrompts: 590, csamAttempts: 0 },
  { month: 'Jun', reportVolume: 75, interceptedPrompts: 640, csamAttempts: 0 },
];

const HARM_PIE_DATA = [
  { name: 'Grooming Attempt', value: 35, color: '#e11d48' },
  { name: 'Self-Harm Ideation', value: 25, color: '#d97706' },
  { name: 'Deepfake Bullying', value: 20, color: '#9333ea' },
  { name: 'PII Exposure', value: 15, color: '#0284c7' },
  { name: 'Dark Pattern Complaint', value: 5, color: '#059669' },
];

export const DashboardView: React.FC = () => {
  const [selectedMetricId, setSelectedMetricId] = useState<string>('met_01');
  const [copiedQuery, setCopiedQuery] = useState<boolean>(false);

  const selectedMetric = SAFETY_METRICS_DATA.find(m => m.id === selectedMetricId) || SAFETY_METRICS_DATA[0];

  const handleCopySql = () => {
    navigator.clipboard.writeText(selectedMetric.sqlQuery);
    setCopiedQuery(true);
    setTimeout(() => setCopiedQuery(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <ExecutiveSummary
        sectionNumber="Section 7"
        sectionTitle="Child Safety Telemetry & SQL Query Engine"
        badgeLabel="Telemetry & Analytics"
        badgeColor="blue"
        readingTime="2 min read"
        aboutText="Real-time operational dashboard tracking prompt firewall intercepts, CSAM zero-tolerance alerts, DPDP erasure SLAs, and production SQL queries for data platform engineers."
        whyItMatters="Continuous telemetry gives product executives and data privacy officers immediate quantitative proof of safety system efficacy and statutory SLA performance."
        keyRisks={[
          'Undetected latency spikes in real-time prompt classification.',
          'Missing 24-hour statutory erasure SLA compliance under DPDP Act.',
          'Incomplete audit logs for law enforcement referral in CSAM incidents.'
        ]}
        recommendedActions={[
          'Monitor prompt firewall interception rate (>99.5% threshold).',
          'Export monthly telemetry reports for quarterly executive review.',
          'Verify production BigQuery/PostgreSQL queries against live data lakes.'
        ]}
        keyTakeaways={[
          'Tracks 4 critical safety KPI dimensions in real-time.',
          'Provides production-ready SQL queries for engineering teams.',
          'Maintains historical trends for regulatory audit reporting.'
        ]}
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SAFETY_METRICS_DATA.slice(0, 4).map((metric) => (
          <div
            key={metric.id}
            onClick={() => setSelectedMetricId(metric.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer shadow-sm ${
              selectedMetricId === metric.id
                ? 'bg-white border-blue-500 ring-2 ring-blue-500/20'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider truncate max-w-[150px]">
                {metric.name}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 rounded">
                Target: {metric.targetThreshold}{metric.unit}
              </span>
            </div>

            <div className="mt-2.5 flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
                {metric.currentValue}
              </span>
              <span className="text-xs font-semibold text-slate-500">{metric.unit}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center space-x-1 text-emerald-700 font-bold">
                <TrendingUp className="w-3 h-3" />
                <span>Optimal SLA</span>
              </span>
              <span className="text-blue-600 font-semibold">Click to view SQL</span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Line Chart: Prompt Interceptions & User Reports */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Monthly Intercepted Prompts vs User Reports</h2>
              <p className="text-xs text-slate-500">6-Month Telemetry Trend Analysis</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '12px', color: '#0f172a' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="interceptedPrompts" name="Intercepted Unsafe Prompts" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="reportVolume" name="User Safety Reports" stroke="#0891b2" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Harm Distribution */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Harm Category Breakdown</h2>
            <p className="text-xs text-slate-500">Percentage distribution of flagged incidents</p>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={HARM_PIE_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                  {HARM_PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '12px', color: '#0f172a' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1 text-xs">
            {HARM_PIE_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center space-x-2 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </span>
                <span className="font-bold text-slate-900 font-mono">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SQL Query Engine Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-blue-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">Production Telemetry SQL Query Viewer</h2>
              <p className="text-xs text-slate-500">PostgreSQL / BigQuery query for selected metric: <span className="text-blue-700 font-bold">{selectedMetric.name}</span></p>
            </div>
          </div>

          <button
            onClick={handleCopySql}
            className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow-sm transition-all cursor-pointer self-start sm:self-auto"
          >
            {copiedQuery ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedQuery ? 'SQL Copied!' : 'Copy SQL Query'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">{selectedMetric.description}</p>

        {/* Code Block Display */}
        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner">
          <pre>{selectedMetric.sqlQuery}</pre>
        </div>
      </div>
    </div>
  );
};

