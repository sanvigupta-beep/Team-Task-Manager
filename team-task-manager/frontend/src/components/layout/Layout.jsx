import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex min-h-screen bg-ink-50 dark:bg-ink-950">
      {/* decorative background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-mesh opacity-50 dark:bg-gradient-mesh-dark dark:opacity-40" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-40 dark:bg-grid-dark dark:opacity-50" />

      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex flex-1 flex-col">
        <Navbar onMenuClick={() => setOpen(true)} />
        <main className="flex-1 p-4 md:p-8 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
