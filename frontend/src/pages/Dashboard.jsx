import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ListTodo,
  FolderKanban,
  Activity,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";
import { dashboardAPI } from "../services/api";
import { useTheme } from "../context/ThemeContext";
import Card from "../components/ui/Card";
import Spinner from "../components/ui/Spinner";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import { formatDate, statusLabel } from "../utils/helpers";

const PIE_COLORS = ["#10b981", "#f59e0b", "#ef4444"];

const StatCard = ({ icon: Icon, label, value, gradient, accent }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-glow dark:border-ink-800 dark:bg-ink-900">
    <div
      className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full ${gradient} opacity-20 blur-2xl transition group-hover:opacity-40`}
    />
    <div className="relative flex items-start justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
          {label}
        </p>
        <p className="mt-2 text-3xl font-extrabold text-ink-900 dark:text-ink-50">{value}</p>
        {accent && (
          <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <TrendingUp size={12} /> {accent}
          </p>
        )}
      </div>
      <div className={`stat-icon ${gradient}`}>
        <Icon size={22} />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    dashboardAPI
      .stats()
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) return <EmptyState title="Could not load dashboard" />;

  const { totals, charts, recentActivity } = data;
  const axisColor = theme === "dark" ? "#94a3b8" : "#64748b";
  const gridColor = theme === "dark" ? "#1e293b" : "#e2e8f0";
  const completionRate =
    totals.totalTasks > 0
      ? Math.round((totals.completedTasks / totals.totalTasks) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-7 text-white shadow-glow">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-fuchsia-300/30 blur-3xl" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <Sparkles size={12} /> Dashboard overview
            </div>
            <h2 className="mt-3 text-3xl font-extrabold">Your workspace at a glance</h2>
            <p className="mt-1 max-w-xl text-sm text-white/80">
              Track progress, spot bottlenecks, and keep the team moving forward.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur">
            <div>
              <div className="text-xs uppercase tracking-wider text-white/70">Completion</div>
              <div className="text-3xl font-extrabold">{completionRate}%</div>
            </div>
            <div className="relative h-14 w-14">
              <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15"
                  fill="none" stroke="white" strokeWidth="3"
                  strokeDasharray={`${(completionRate / 100) * 94.2} 94.2`}
                  strokeLinecap="round"
                />
              </svg>
              <CheckCircle2 className="absolute inset-0 m-auto" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={ListTodo}
          label="Total Tasks"
          value={totals.totalTasks}
          gradient="bg-gradient-brand"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={totals.completedTasks}
          gradient="bg-gradient-success"
          accent={`${completionRate}% done`}
        />
        <StatCard
          icon={Clock}
          label="Pending"
          value={totals.pendingTasks}
          gradient="bg-gradient-warn"
        />
        <StatCard
          icon={AlertTriangle}
          label="Overdue"
          value={totals.overdueTasks}
          gradient="bg-gradient-danger"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <StatCard
          icon={FolderKanban}
          label="Projects"
          value={totals.totalProjects}
          gradient="bg-gradient-blue"
        />
        <StatCard
          icon={Activity}
          label="In Progress"
          value={totals.inProgressTasks}
          gradient="bg-gradient-blue"
        />
        <StatCard
          icon={ListTodo}
          label="To Do"
          value={totals.todoTasks}
          gradient="bg-gradient-brand"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-ink-900 dark:text-ink-100">Tasks by Status</h3>
              <p className="text-xs text-ink-500 dark:text-ink-400">Current task distribution</p>
            </div>
            <div className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
              Live
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.byStatus}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" stroke={axisColor} fontSize={12} />
                <YAxis allowDecimals={false} stroke={axisColor} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: theme === "dark" ? "#0f172a" : "#fff",
                    border: `1px solid ${gridColor}`,
                    borderRadius: 12,
                    color: theme === "dark" ? "#f1f5f9" : "#0f172a",
                  }}
                />
                <Bar dataKey="value" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-ink-900 dark:text-ink-100">Tasks by Priority</h3>
              <p className="text-xs text-ink-500 dark:text-ink-400">How urgent things are</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.byPriority}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={4}
                  stroke="none"
                >
                  {charts.byPriority.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Legend
                  iconType="circle"
                  formatter={(v) => (
                    <span className="text-xs font-medium text-ink-700 dark:text-ink-300">{v}</span>
                  )}
                />
                <Tooltip
                  contentStyle={{
                    background: theme === "dark" ? "#0f172a" : "#fff",
                    border: `1px solid ${gridColor}`,
                    borderRadius: 12,
                    color: theme === "dark" ? "#f1f5f9" : "#0f172a",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-ink-900 dark:text-ink-100">Recent Activity</h3>
            <p className="text-xs text-ink-500 dark:text-ink-400">Latest task updates from your team</p>
          </div>
          <Activity size={18} className="text-brand-500" />
        </div>
        {recentActivity.length === 0 ? (
          <EmptyState title="No recent tasks" />
        ) : (
          <div className="divide-y divide-ink-200 dark:divide-ink-800">
            {recentActivity.map((t) => (
              <div
                key={t._id}
                className="flex items-center justify-between gap-3 py-3 transition hover:bg-ink-50/60 dark:hover:bg-ink-800/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-brand-soft text-sm font-bold text-brand-700 dark:bg-ink-800 dark:text-brand-300">
                    {(t.assignedTo?.name || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-ink-900 dark:text-ink-100">{t.title}</p>
                    <p className="text-xs text-ink-500 dark:text-ink-400">
                      {t.project?.title} · {t.assignedTo?.name || "Unassigned"} ·{" "}
                      {formatDate(t.updatedAt)}
                    </p>
                  </div>
                </div>
                <Badge variant={t.status}>{statusLabel(t.status)}</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
