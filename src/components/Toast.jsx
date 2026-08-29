import React from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export default function Toast({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
              isSuccess
                ? 'bg-emerald-900/95 text-white border-emerald-700 shadow-emerald-950/20'
                : isError
                ? 'bg-rose-900/95 text-white border-rose-700 shadow-rose-950/20'
                : isWarning
                ? 'bg-amber-900/95 text-white border-amber-700 shadow-amber-950/20'
                : 'bg-slate-900/95 text-white border-slate-700 shadow-slate-950/20'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-300" />}
              {isError && <XCircle className="w-5 h-5 text-rose-300" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-300" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-sky-300" />}
            </div>

            <div className="flex-1 pr-2">
              {toast.title && <div className="text-xs font-bold uppercase tracking-wider opacity-80">{toast.title}</div>}
              <div className="text-sm font-medium leading-snug">{toast.message}</div>
              {toast.subtext && <div className="text-xs opacity-75 mt-1 font-mono">{toast.subtext}</div>}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
