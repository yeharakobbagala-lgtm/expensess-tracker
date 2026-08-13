import { ChevronDown } from 'lucide-react';

export default function Select({ label, options = [], error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[#1a1a2e]">{label}</label>}
      <div className="relative">
        <select
          className={`w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-[#e8e9ef] bg-white text-[#1a1a2e] text-sm focus:outline-none focus:ring-2 focus:ring-[#f5c518] focus:border-transparent transition-all cursor-pointer ${error ? 'border-red-400' : ''} ${className}`}
          {...props}
        >
          {options.map((opt) =>
            typeof opt === 'string' ? (
              <option key={opt} value={opt}>{opt}</option>
            ) : (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            )
          )}
        </select>
        <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a9a] pointer-events-none" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
