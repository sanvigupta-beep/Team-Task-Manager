import { Mail, Calendar, Hash, Shield, Sparkles } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { useAuth } from "../context/AuthContext";

const initials = (name = "") =>
  name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Profile = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
          <Sparkles size={12} /> Account
        </div>
        <h2 className="mt-2 text-3xl font-extrabold text-ink-900 dark:text-ink-50">Profile</h2>
        <p className="text-sm text-ink-500 dark:text-ink-400">Your TeamTasks identity and account details.</p>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-8 text-white shadow-glow">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-fuchsia-300/30 blur-3xl" />
        <div className="relative flex flex-col items-center gap-5 text-center md:flex-row md:items-center md:text-left">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15 text-3xl font-extrabold backdrop-blur">
            {initials(user.name)}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-extrabold">{user.name}</h3>
            <p className="text-sm text-white/85">{user.email}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
              <Badge variant={user.role}>{user.role}</Badge>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                <Shield size={12} /> Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <Card>
        <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
          Account Information
        </h4>
        <div className="space-y-1">
          <Row icon={Mail} label="Email" value={user.email} />
          <Row icon={Shield} label="Role" value={user.role} />
          <Row
            icon={Calendar}
            label="Member since"
            value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
          />
          <Row icon={Hash} label="Account ID" value={user._id} mono />
        </div>
      </Card>
    </div>
  );
};

const Row = ({ icon: Icon, label, value, mono }) => (
  <div className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition hover:bg-ink-50/60 dark:hover:bg-ink-800/40">
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand-soft text-brand-600 dark:bg-ink-800 dark:text-brand-300">
        <Icon size={16} />
      </div>
      <span className="text-sm font-medium text-ink-500 dark:text-ink-400">{label}</span>
    </div>
    <span className={`text-sm font-semibold text-ink-900 dark:text-ink-100 ${mono ? "font-mono text-xs" : ""} max-w-[60%] truncate`}>
      {value}
    </span>
  </div>
);

export default Profile;
