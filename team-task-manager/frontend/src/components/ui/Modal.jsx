import { X } from "lucide-react";
import { useEffect } from "react";

const Modal = ({ open, onClose, title, children, footer }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/60 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-glow animate-pop-in dark:border-ink-800 dark:bg-ink-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center justify-between border-b border-ink-200 px-6 py-4 dark:border-ink-800">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-brand" />
          <h3 className="text-base font-bold text-ink-900 dark:text-ink-100">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink-500 transition hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-ink-800 dark:hover:text-ink-100"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && (
          <div className="border-t border-ink-200 px-6 py-3 dark:border-ink-800">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
