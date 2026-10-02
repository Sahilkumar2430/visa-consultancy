import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button.jsx';

export default function ErrorState({
  title = 'Something went wrong',
  description = 'We could not load this content. Please try again.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-3xl bg-white border border-red-100">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-5">
        <AlertTriangle className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="font-display text-xl font-bold text-navy-900 mb-2">{title}</h3>
      <p className="text-navy-500 max-w-md mb-6">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" icon={RefreshCw}>
          Try again
        </Button>
      )}
    </div>
  );
}