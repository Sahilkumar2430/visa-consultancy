import { SearchX } from 'lucide-react';
import Button from './Button.jsx';

export default function EmptyState({
  icon: Icon = SearchX,
  title = 'Nothing here yet',
  description = 'Try adjusting your search or filters.',
  action,
  actionLabel,
  actionTo,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-3xl bg-white border border-navy-100">
      <div className="w-16 h-16 rounded-2xl bg-navy-50 flex items-center justify-center mb-5">
        <Icon className="w-8 h-8 text-navy-300" />
      </div>
      <h3 className="font-display text-xl font-bold text-navy-900 mb-2">{title}</h3>
      <p className="text-navy-500 max-w-md mb-6">{description}</p>
      {action && actionLabel && (
        <Button onClick={action} to={actionTo} variant="accent">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}