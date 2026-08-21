
import { useEffect, useState } from "react";
import { useAppStore } from "../lib/store";
import { copy } from "../lib/i18n";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const lang = useAppStore((state: any) => state.lang);
  const t = copy[lang];

  useEffect(() => {
    setMounted(true);
    // Hide preloader after 2.5s (simulate sophisticated loading)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[150] flex flex-col items-center justify-center bg-background transition-transform duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)] ${
        loading ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="relative overflow-hidden">
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight flex items-center">
          <span className="text-foreground translate-y-0 animate-[slideUp_1s_ease_forwards]">Pet</span>
          <span className="text-primary translate-y-0 animate-[slideUp_1s_ease_0.2s_forwards]">Van</span>
        </h1>
      </div>
      <div className="mt-8 h-[2px] w-48 overflow-hidden bg-secondary rounded-full">
        <div className="h-full w-full bg-primary animate-[loadingBar_2s_ease_forwards] origin-left" />
      </div>
      <p className="mt-4 text-sm font-bold text-muted-foreground animate-pulse tracking-widest uppercase">
        {lang === "ar" ? "نجهز لك الأفضل..." : "Curating perfection..."}
      </p>
    </div>
  );
}
