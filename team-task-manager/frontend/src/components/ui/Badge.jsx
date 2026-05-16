const variants = {
  todo: "bg-slate-100 text-slate-700 dark:bg-slate-700/40 dark:text-slate-200",
  "in-progress": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  high: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  admin: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-300",
  member: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  overdue: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
};

const Badge = ({ variant = "todo", children, dot = true }) => {
  const cls = variants[variant] || variants.todo;
  return (
    <span className={`${dot ? "badge" : "badge-plain"} ${cls}`}>{children}</span>
  );
};

export default Badge;
