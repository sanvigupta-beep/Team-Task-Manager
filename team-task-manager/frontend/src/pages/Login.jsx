import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, Sparkles, CheckCircle2, Users, Zap, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { errorMessage } from "../utils/helpers";

const features = [
  { icon: Zap, title: "Lightning fast", text: "Manage tasks and projects in real time." },
  { icon: Users, title: "Built for teams", text: "Invite members, assign work, track progress." },
  { icon: CheckCircle2, title: "Stay on top", text: "Beautiful dashboards keep you focused." },
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink-50 dark:bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-60 dark:bg-gradient-mesh-dark dark:opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 dark:bg-grid-dark" />

      <div className="relative grid min-h-screen lg:grid-cols-2">
        {/* Left: brand panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-brand p-12 text-white lg:flex">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-fuchsia-400/30 blur-3xl" />

          <div className="relative flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <Sparkles size={22} />
            </div>
            <div className="text-2xl font-extrabold">TeamTasks</div>
          </div>

          <div className="relative space-y-6">
            <h2 className="text-4xl font-extrabold leading-tight">
              Where teams ship work that matters.
            </h2>
            <p className="max-w-md text-white/80">
              Plan projects, assign tasks, and celebrate progress — all in one beautifully
              organized workspace.
            </p>
            <div className="space-y-4 pt-4">
              {features.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="font-semibold">{title}</div>
                    <div className="text-sm text-white/75">{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative text-xs text-white/70">
            © {new Date().getFullYear()} TeamTasks · Crafted for high-performing teams
          </div>
        </div>

        {/* Right: form */}
        <div className="relative flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md animate-pop-in">
            <div className="mb-8 flex items-center gap-2 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
                <Sparkles size={18} className="text-white" />
              </div>
              <div className="text-xl font-extrabold text-gradient">TeamTasks</div>
            </div>

            <h1 className="text-3xl font-extrabold text-ink-900 dark:text-ink-100">
              Welcome back <span className="text-gradient">👋</span>
            </h1>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
              Log in to your TeamTasks account to continue.
            </p>

            <form onSubmit={submit} className="mt-8 space-y-4">
              <Input
                label="Email"
                type="email"
                icon={Mail}
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                label="Password"
                type="password"
                icon={Lock}
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : (
                  <>
                    Log In <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-ink-600 dark:text-ink-400">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-gradient hover:underline">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
