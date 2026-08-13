import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, illustration: Illustration, title = 'Nothing here yet', description = '', action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      {Illustration ? (
        <Illustration aria-hidden="true" />
      ) : (
        <div className="w-16 h-16 rounded-2xl bg-[#f7f8fa] flex items-center justify-center">
          <Icon size={28} className="text-[#b0b1bb]" />
        </div>
      )}
      <div className="text-center">
        <p className="font-semibold text-[#1a1a2e] text-base font-[Plus_Jakarta_Sans]">{title}</p>
        {description && <p className="text-sm text-[#8a8a9a] mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}
