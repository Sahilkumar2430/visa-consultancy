import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = 'info', duration = 4500) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      if (duration) {
        setTimeout(() => removeToast(id), duration);
      }
      return id;
    },
    [removeToast]
  );

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
  };

  return (
    <ToastContext.Provider value={{ toast, toasts, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx.toast;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const styles = {
  success: 'border-l-4 border-emerald-500 bg-white',
  error: 'border-l-4 border-red-500 bg-white',
  info: 'border-l-4 border-royal-500 bg-white',
  warning: 'border-l-4 border-amber-500 bg-white',
};

const iconColors = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  info: 'text-royal-500',
  warning: 'text-amber-500',
};

function ToastContainer({ toasts, onClose }) {
  return (
    <div
      className="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-[calc(100%-2rem)] max-w-sm"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((t) => {
        const Icon = icons[t.type];
        return (
          <div
            key={t.id}
            role="alert"
            className={`${styles[t.type]} rounded-xl shadow-card p-4 flex items-start gap-3 animate-slide-in-right`}
          >
            <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconColors[t.type]}`} />
            <p className="text-sm text-navy-700 flex-1 leading-snug">{t.message}</p>
            <button
              onClick={() => onClose(t.id)}
              className="text-navy-400 hover:text-navy-700 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}