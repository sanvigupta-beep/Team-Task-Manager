import { NavLink } from "react-router-dom";
import { LayoutDashboard, FolderKanban, CheckSquare, User, Sparkles } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/profile", label: "Profile", icon: User },
];

const Sidebar = ({ open, onClose }) => (
  <>
    {open && (
      <div
        className="fixed inset-0 z-30 bg-ink-950/60 backdrop-blur-sm md:hidden"
        onClick={onClose}
      />
    )}
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-ink-200/60 bg-white/80 backdrop-blur-xl transition-transform duration-200 md:static md:translate-x-0 dark:border-ink-800/60 dark:bg-ink-900/70 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-16 items-center gap-2.5 border-b border-ink-200/60 px-6 dark:border-ink-800/60">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
          <Sparkles size={18} className="text-white" />
        </div>
        <div className="leading-tight">
          <div className="text-base font-extrabold text-gradient">TeamTasks</div>
          <div className="text-[10px] font-medium uppercase tracking-wider text-ink-400 dark:text-ink-500">
            Workspace
          </div>
        </div>
      </div>

      <nav className="space-y-1 p-4">
        <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-ink-400 dark:text-ink-500">
          Menu
        </div>
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-gradient-brand text-white shadow-glow"
                  : "text-ink-600 hover:bg-brand-50 hover:text-brand-700 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-brand-300"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? "" : "opacity-80"} />
                <span>{label}</span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="absolute inset-x-4 bottom-4">
        <div className="rounded-2xl bg-gradient-brand p-4 text-white shadow-glow">
          <div className="text-xs font-bold uppercase tracking-wider opacity-80">Pro Tip</div>
          <div className="mt-1 text-sm font-medium">
            Stay organized — tackle high-priority tasks first.
          </div>
        </div>
      </div>
    </aside>
  </>
);

export default Sidebar;
