import { useEffect, useState } from "react";
import { useAppStore } from "../lib/store";

export function Preloader() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const lang = useAppStore((state: any) => state.lang);

  useEffect(() => {
    // Show the intro only once per browser session, and never on inner navigations.
    if (sessionStorage.getItem("petvan-intro-shown")) return;
    sessionStorage.setItem("petvan-intro-shown", "1");
    setVisible(true);
    const closeTimer = setTimeout(() => setClosing(true), 1200);
    const removeTimer = setTimeout(() => setVisible(false), 2000);
    return () => {
      clearTimeout(closeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[150] flex flex-col items-center justify-center bg-background transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] ${
        closing ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="relative overflow-hidden">
        <div className="font-display text-5xl md:text-7xl font-extrabold tracking-tight flex items-center">
          <span className="text-foreground">Pet</span>
          <span className="text-primary">Van</span>
        </div>
      </div>
      <div className="mt-8 h-[2px] w-48 overflow-hidden bg-secondary rounded-full">
        <div className="h-full w-full bg-primary animate-[loadingBar_1.2s_ease_forwards] origin-left" />
      </div>
      <p className="mt-4 text-sm font-bold text-muted-foreground tracking-widest uppercase">
        {lang === "ar" ? "نجهز لك الأفضل..." : "Curating perfection..."}
      </p>
    </div>
  );
}
