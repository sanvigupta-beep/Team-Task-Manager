import { Inbox } from "lucide-react";

const EmptyState = ({ title = "Nothing here yet", message, action, icon: Icon = Inbox }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-ink-200 bg-white/60 py-14 text-center dark:border-ink-800 dark:bg-ink-900/40">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand-soft text-brand-600 shadow-soft dark:bg-ink-800 dark:text-brand-300">
      <Icon size={28} />
    </div>
    <h4 className="text-base font-bold text-ink-900 dark:text-ink-100">{title}</h4>
    {message && (
      <p className="mt-1 max-w-sm text-sm text-ink-500 dark:text-ink-400">{message}</p>
    )}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;
