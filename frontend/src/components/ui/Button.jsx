export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-[#f5c518] text-[#1a1a2e] hover:bg-[#e6b800] active:scale-[0.98]',
    secondary: 'bg-[#f0f1f5] text-[#1a1a2e] hover:bg-[#e4e5ec] active:scale-[0.98]',
    ghost: 'bg-transparent text-[#4a4a5a] hover:bg-[#f0f1f5] active:scale-[0.98]',
    danger: 'bg-[#fef2f2] text-[#e53935] hover:bg-[#fee2e2] active:scale-[0.98]',
    outline: 'border border-[#e8e9ef] bg-white text-[#1a1a2e] hover:bg-[#f7f8fa] active:scale-[0.98]',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-6 py-3',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
