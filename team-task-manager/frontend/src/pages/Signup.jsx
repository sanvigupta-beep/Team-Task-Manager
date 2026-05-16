import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, User as UserIcon, Sparkles, Rocket, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { errorMessage } from "../utils/helpers";

const perks = [
  { icon: Rocket, title: "Start in seconds", text: "No credit card. No setup. Just go." },
  { icon: ShieldCheck, title: "Secure by default", text: "Your data stays yours, always." },
  { icon: Heart, title: "Loved by teams", text: "Made by makers, for makers." },
];

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(form);
      toast.success("Account created successfully");
      navigate("/", { replace: true });
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
        {/* Left: form */}
        <div className="relative order-2 flex items-center justify-center p-6 sm:p-12 lg:order-1">
          <div className="w-full max-w-md animate-pop-in">
            <div className="mb-8 flex items-center gap-2 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
                <Sparkles size={18} className="text-white" />
              </div>
              <div className="text-xl font-extrabold text-gradient">TeamTasks</div>
            </div>

            <h1 className="text-3xl font-extrabold text-ink-900 dark:text-ink-100">
              Create your account <span className="text-gradient">✨</span>
            </h1>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
              Get started in seconds — your team will thank you.
            </p>

            <form onSubmit={submit} className="mt-8 space-y-4">
              <Input
                label="Full name"
                icon={UserIcon}
                required
                placeholder="Jane Cooper"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
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
                minLength={6}
                placeholder="At least 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <div>
                <label className="form-label">Role</label>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {["member", "admin"].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setForm({ ...form, role: r })}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-semibold capitalize transition ${
                        form.role === r
                          ? "border-transparent bg-gradient-brand text-white shadow-glow"
                          : "border-ink-200 bg-white text-ink-700 hover:border-brand-300 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : (
                  <>
                    Create Account <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-ink-600 dark:text-ink-400">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-gradient hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Right: brand panel */}
        <div className="relative order-1 hidden flex-col justify-between overflow-hidden bg-gradient-brand p-12 text-white lg:order-2 lg:flex">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />

          <div className="relative flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <Sparkles size={22} />
            </div>
            <div className="text-2xl font-extrabold">TeamTasks</div>
          </div>

          <div className="relative space-y-6">
            <h2 className="text-4xl font-extrabold leading-tight">
              Join thousands of teams getting more done.
            </h2>
            <p className="max-w-md text-white/80">
              From tiny side projects to ambitious roadmaps — TeamTasks scales with you.
            </p>
            <div className="space-y-4 pt-4">
              {perks.map(({ icon: Icon, title, text }) => (
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
      </div>
    </div>
  );
};

export default Signup;
