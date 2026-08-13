export default function SummaryCard({ title, value, icon: Icon, trend, trendLabel, accent = false }) {
  const hasValidTrend = typeof trend === 'number' && !isNaN(trend) && isFinite(trend);
  const isPositiveTrend = hasValidTrend && trend > 0;

  return (
    <div className={`rounded-2xl p-5 shadow-sm border border-[#e8e9ef] ${accent ? 'bg-[#f5c518]' : 'bg-white'}`}>
      <div className="flex items-start justify-between mb-4">
        <p className={`text-sm font-medium ${accent ? 'text-[#1a1a2e]/70' : 'text-[#8a8a9a]'}`}>{title}</p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent ? 'bg-white/30' : 'bg-[#f7f8fa]'}`}>
          {Icon && <Icon size={18} className={accent ? 'text-[#1a1a2e]' : 'text-[#f5c518]'} />}
        </div>
      </div>
      <p className={`text-2xl font-bold font-[Plus_Jakarta_Sans] tracking-tight ${accent ? 'text-[#1a1a2e]' : 'text-[#1a1a2e]'}`}>
        {value ?? '—'}
      </p>
      {hasValidTrend && (
        <p className={`text-xs mt-1.5 font-medium ${accent ? 'text-[#1a1a2e]/70' : isPositiveTrend ? 'text-emerald-600' : 'text-red-500'}`}>
          {isPositiveTrend ? '↑' : '↓'} {Math.abs(trend)}% {trendLabel || ''}
        </p>
      )}
    </div>
  );
}
