import { Link } from "react-router-dom";
import { Home, Compass } from "lucide-react";
import Button from "../components/ui/Button";

const NotFound = () => (
  <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-50 p-6 text-center dark:bg-ink-950">
    <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-60 dark:bg-gradient-mesh-dark dark:opacity-40" />
    <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 dark:bg-grid-dark" />

    <div className="relative animate-pop-in">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-brand shadow-glow animate-float">
        <Compass size={36} className="text-white" />
      </div>
      <h1 className="text-8xl font-extrabold tracking-tight">
        <span className="text-gradient">404</span>
      </h1>
      <p className="mt-3 text-2xl font-bold text-ink-900 dark:text-ink-100">Lost in space</p>
      <p className="mt-2 max-w-sm text-sm text-ink-500 dark:text-ink-400">
        The page you're looking for has drifted off into the void. Let's get you back home.
      </p>
      <Link to="/" className="mt-8 inline-block">
        <Button size="lg">
          <Home size={16} /> Go to Dashboard
        </Button>
      </Link>
    </div>
  </div>
);

export default NotFound;
