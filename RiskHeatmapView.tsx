import React, { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { CHILD_SAFETY_RISK_THREATS, RiskHeatmapItem } from '../data/riskAssessmentData';
import {
  AlertTriangle,
  ShieldAlert,
  Filter,
  Info,
  CheckCircle2,
  Zap,
  BarChart2,
  Grid,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const RiskHeatmapView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('All');
  const [activeThreat, setActiveThreat] = useState<RiskHeatmapItem | null>(CHILD_SAFETY_RISK_THREATS[0]);
  const [chartViewMode, setChartViewMode] = useState<'matrix' | 'categoryBar'>('matrix');

  // Filter threat items based on user selection
  const filteredThreats = CHILD_SAFETY_RISK_THREATS.filter((threat) => {
    const matchesCategory = selectedCategory === 'All' || threat.category === selectedCategory;
    const matchesLevel = selectedRiskLevel === 'All' || threat.riskLevel === selectedRiskLevel;
    return matchesCategory && matchesLevel;
  });

  // Calculate summary stats
  const totalThreats = filteredThreats.length;
  const criticalCount = filteredThreats.filter((t) => t.riskLevel === 'Critical').length;
  const highCount = filteredThreats.filter((t) => t.riskLevel === 'High').length;
  const mediumCount = filteredThreats.filter((t) => t.riskLevel === 'Medium').length;

  const avgScore =
    totalThreats > 0
      ? (filteredThreats.reduce((sum, t) => sum + t.score, 0) / totalThreats).toFixed(1)
      : '0.0';

  // Category Bar Chart Data aggregation
  const categories = ['Generative AI', 'Interpersonal', 'AI Behavior', 'DPDP Privacy', 'Algorithmic Feed', 'Demographics'];
  const categoryChartData = categories.map((cat) => {
    const items = CHILD_SAFETY_RISK_THREATS.filter((t) => t.category === cat);
    const avgCategoryScore =
      items.length > 0 ? (items.reduce((s, i) => s + i.score, 0) / items.length).toFixed(1) : 0;
    const criticalInCat = items.filter((i) => i.riskLevel === 'Critical').length;
    return {
      category: cat,
      avgScore: Number(avgCategoryScore),
      totalThreats: items.length,
      criticalThreats: criticalInCat
    };
  });

  // Get color based on risk level
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return '#ef4444'; // Red-500
      case 'High':
        return '#f59e0b'; // Amber-500
      case 'Medium':
        return '#3b82f6'; // Blue-500
      default:
        return '#10b981'; // Emerald-500
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'High':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  // Custom Scatter Tooltip
  const CustomScatterTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: RiskHeatmapItem = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs max-w-xs space-y-2 border border-slate-700 z-50">
          <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
            <span className="font-bold text-slate-100">{data.name}</span>
            <span
              className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase"
              style={{ backgroundColor: getRiskColor(data.riskLevel), color: '#ffffff' }}
            >
              {data.riskLevel}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-300 font-mono">
            <div>
              Impact: <span className="text-white font-bold">{data.impact}/5</span>
            </div>
            <div>
              Likelihood: <span className="text-white font-bold">{data.likelihood}/5</span>
            </div>
            <div>
              Score: <span className="text-amber-400 font-bold">{data.score}/25</span>
            </div>
            <div>
              Domain: <span className="text-blue-300 font-bold">{data.category}</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 italic border-t border-slate-800 pt-1 line-clamp-2">
            {data.description}
          </p>
          <span className="text-[9px] text-emerald-400 block font-semibold">Click point to view full mitigation</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & KPI Summary */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <h2 className="text-base font-bold text-slate-900">
                AI Child Safety Threat Matrix: Impact vs. Likelihood
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Interactive 2D risk matrix evaluating threat severity (1–5) against likelihood of occurrence (1–5).
            </p>
          </div>

          {/* View Mode Toggle Button */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setChartViewMode('matrix')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
                chartViewMode === 'matrix'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>2D Heatmap Grid</span>
            </button>
            <button
              onClick={() => setChartViewMode('categoryBar')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
                chartViewMode === 'categoryBar'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Domain Breakdown</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-1.5 text-slate-600 font-semibold">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Filter Domain:</span>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="All">All AI Domains (6)</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-1.5 text-slate-600 font-semibold">
              <span>Risk Severity:</span>
            </div>
            <select
              value={selectedRiskLevel}
              onChange={(e) => setSelectedRiskLevel(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="All">All Severity Levels</option>
              <option value="Critical">Critical Only</option>
              <option value="High">High Severity</option>
              <option value="Medium">Medium Severity</option>
            </select>
          </div>

          <div className="flex items-center space-x-3 text-[11px] font-mono">
            <span className="text-slate-600">
              Showing <strong className="text-slate-900">{totalThreats}</strong> threats
            </span>
            <span className="text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">
              {criticalCount} Critical
            </span>
            <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {highCount} High
            </span>
          </div>
        </div>

        {/* Matrix Visualization Chart Card */}
        {chartViewMode === 'matrix' ? (
          <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center space-x-4">
                <span className="font-bold text-slate-800">Risk Matrix Zones:</span>
                <div className="flex items-center space-x-3 text-[11px]">
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                    <span className="text-slate-700">Critical (15-25)</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    <span className="text-slate-700">High (10-14)</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                    <span className="text-slate-700">Medium (6-9)</span>
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 italic">
                Bubble size scales with combined risk score. Click any point to inspect mitigations.
              </span>
            </div>

            <div className="h-[380px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 25, left: 15 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    type="number"
                    dataKey="likelihood"
                    name="Likelihood"
                    domain={[0.5, 5.5]}
                    ticks={[1, 2, 3, 4, 5]}
                    tickFormatter={(v) =>
                      ['1: Rare', '2: Unlikely', '3: Possible', '4: Likely', '5: Almost Certain'][v - 1] || ''
                    }
                    tick={{ fontSize: 11, fill: '#475569' }}
                    label={{
                      value: 'Likelihood of Occurrence →',
                      position: 'insideBottom',
                      offset: -15,
                      fill: '#334155',
                      fontSize: 11,
                      fontWeight: 'bold'
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="impact"
                    name="Impact"
                    domain={[0.5, 5.5]}
                    ticks={[1, 2, 3, 4, 5]}
                    tickFormatter={(v) =>
                      ['1: Minor', '2: Moderate', '3: Serious', '4: Major', '5: Critical'][v - 1] || ''
                    }
                    tick={{ fontSize: 11, fill: '#475569' }}
                    label={{
                      value: '← Severity of Harm Impact',
                      angle: -90,
                      position: 'insideLeft',
                      offset: 5,
                      fill: '#334155',
                      fontSize: 11,
                      fontWeight: 'bold'
                    }}
                  />
                  <ZAxis type="number" dataKey="score" range={[150, 600]} name="Risk Score" />
                  <Tooltip content={<CustomScatterTooltip />} />
                  <Scatter
                    name="Child Safety Threat Vectors"
                    data={filteredThreats}
                    onClick={(node) => {
                      if (node && node.payload) {
                        setActiveThreat(node.payload);
                      }
                    }}
                    className="cursor-pointer"
                  >
                    {filteredThreats.map((entry) => (
                      <Cell
                        key={entry.id}
                        fill={getRiskColor(entry.riskLevel)}
                        stroke={activeThreat?.id === entry.id ? '#000000' : '#ffffff'}
                        strokeWidth={activeThreat?.id === entry.id ? 3 : 1.5}
                        className="transition-all hover:opacity-80"
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          /* Domain Category Bar Chart View */
          <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">
                Average Child Safety Exposure Score by AI Domain
              </span>
              <span className="text-[11px] text-slate-500">
                Max score: 25.0 (Impact x Likelihood)
              </span>
            </div>

            <div className="h-[320px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryChartData} margin={{ top: 10, right: 30, left: 0, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 11, fill: '#334155', fontWeight: 'bold' }}
                    interval={0}
                  />
                  <YAxis
                    domain={[0, 25]}
                    tick={{ fontSize: 11, fill: '#475569' }}
                    label={{
                      value: 'Avg Exposure Score',
                      angle: -90,
                      position: 'insideLeft',
                      fill: '#334155',
                      fontSize: 11,
                      fontWeight: 'bold'
                    }}
                  />
                  <Tooltip
                    formatter={(value: any, name: string) => [
                      name === 'avgScore' ? `${value} / 25` : value,
                      name === 'avgScore' ? 'Avg Risk Score' : 'Critical Threats'
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="avgScore" name="Avg Risk Score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="criticalThreats" name="Critical Threats" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Threat Selector Grid & Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Threat Vector Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Threat Vectors ({filteredThreats.length})
            </h3>
            <span className="text-[11px] text-slate-500">Click to inspect mitigation</span>
          </div>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {filteredThreats.map((threat) => {
              const isSelected = activeThreat?.id === threat.id;
              return (
                <div
                  key={threat.id}
                  onClick={() => setActiveThreat(threat)}
                  className={`p-3 rounded-lg border text-xs transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-blue-50 border-blue-400 shadow-sm ring-2 ring-blue-500/20'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-500 font-bold">
                      {threat.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${getRiskBadge(
                        threat.riskLevel
                      )}`}
                    >
                      {threat.riskLevel}
                    </span>
                  </div>

                  <p className="font-bold text-slate-900 line-clamp-1">{threat.name}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
                    <span>
                      Impact: <strong className="text-slate-900">{threat.impact}/5</strong>
                    </span>
                    <span>
                      Likelihood: <strong className="text-slate-900">{threat.likelihood}/5</strong>
                    </span>
                    <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                      Score: {threat.score}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Threat Inspector Panel */}
        <div className="lg:col-span-7">
          {activeThreat ? (
            <div className="bg-white border-2 border-blue-200 rounded-xl p-5 shadow-sm space-y-4 sticky top-24">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">
                    {activeThreat.id} • {activeThreat.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{activeThreat.name}</h3>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${getRiskBadge(
                    activeThreat.riskLevel
                  )}`}
                >
                  {activeThreat.riskLevel} Risk ({activeThreat.score}/25)
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Severity Impact</span>
                  <span className="text-lg font-black text-slate-900 mt-0.5 block">
                    {activeThreat.impact} / 5
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Likelihood</span>
                  <span className="text-lg font-black text-slate-900 mt-0.5 block">
                    {activeThreat.likelihood} / 5
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Risk Index</span>
                  <span className="text-lg font-black text-amber-700 mt-0.5 block">
                    {activeThreat.score}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Threat Description & Risk Manifestation:
                  </span>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200 font-medium">
                    {activeThreat.description}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mandatory Code & Engineering Safeguards:</span>
                  </span>
                  <p className="text-slate-800 leading-relaxed bg-emerald-50/60 p-3 rounded border border-emerald-200 font-medium">
                    {activeThreat.mitigation}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block mb-1 flex items-center space-x-1">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Statutory Authority & Act References:</span>
                  </span>
                  <div className="bg-blue-50/60 p-2.5 rounded border border-blue-200 text-blue-950 font-mono font-bold">
                    {activeThreat.statutoryRef}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center text-xs text-slate-500">
              Select a threat vector from the list or matrix to view full safeguards.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
