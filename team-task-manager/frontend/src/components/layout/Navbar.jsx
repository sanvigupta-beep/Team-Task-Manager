import { Menu, LogOut, Sun, Moon, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Badge from "../ui/Badge";

const initials = (name = "") =>
  name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-200/60 bg-white/70 px-4 backdrop-blur-xl md:px-8 dark:border-ink-800/60 dark:bg-ink-900/60">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-ink-600 hover:bg-ink-100 md:hidden dark:text-ink-300 dark:hover:bg-ink-800"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div className="hidden md:block">
          <h1 className="text-base font-bold text-ink-900 dark:text-ink-100">
            Welcome back, <span className="text-gradient">{user?.name?.split(" ")[0]}</span>
            <span className="ml-1">👋</span>
          </h1>
          <p className="text-xs text-ink-500 dark:text-ink-400">
            Here's what's happening with your team today.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className="relative rounded-lg p-2 text-ink-600 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
          aria-label="Toggle theme"
          title={theme === "dark" ? "Switch to light" : "Switch to dark"}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          className="relative rounded-lg p-2 text-ink-600 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gradient-danger ring-2 ring-white dark:ring-ink-900" />
        </button>

        <div className="mx-1 hidden h-8 w-px bg-ink-200 md:block dark:bg-ink-800" />

        <div className="hidden items-center gap-3 md:flex">
          <div className="text-right leading-tight">
            <div className="text-sm font-semibold text-ink-900 dark:text-ink-100">{user?.name}</div>
            <div className="text-xs text-ink-500 dark:text-ink-400">{user?.email}</div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-sm font-bold text-white shadow-glow">
            {initials(user?.name) || "?"}
          </div>
        </div>
        <Badge variant={user?.role}>{user?.role}</Badge>
        <button
          onClick={logout}
          className="rounded-lg p-2 text-ink-600 transition hover:bg-red-50 hover:text-red-600 dark:text-ink-300 dark:hover:bg-red-500/15 dark:hover:text-red-400"
          aria-label="Log out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
