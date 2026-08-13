import { categories } from '../../data/mockData';

export default function CategoryBadge({ categoryId, size = 'sm' }) {
  const cat = categories.find((c) => c.id === categoryId) || { label: categoryId, color: '#94a3b8' };
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium ${textSize}`}
      style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
      {cat.label}
    </span>
  );
}
