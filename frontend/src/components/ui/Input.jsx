export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[#1a1a2e]">{label}</label>}
      <input
        className={`w-full px-4 py-2.5 rounded-xl border border-[#e8e9ef] bg-white text-[#1a1a2e] text-sm placeholder:text-[#b0b1bb] focus:outline-none focus:ring-2 focus:ring-[#f5c518] focus:border-transparent transition-all ${error ? 'border-red-400 focus:ring-red-300' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
