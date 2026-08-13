import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Share, PlusSquare, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/install")({
  component: InstallPage,
});

function InstallPage() {
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    setIsAndroid(/android/.test(userAgent));

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <div className="mx-auto max-w-lg p-5 py-10 sm:p-8 min-h-screen">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>

      <div className="text-center mb-10">
        <div className="mx-auto grid size-24 place-items-center rounded-3xl bg-primary shadow-[var(--shadow-gold)] mb-6">
          <Smartphone className="size-12 text-primary-foreground" />
        </div>
        <h1 className="font-display text-4xl font-extrabold text-primary mb-4">Install PetVan</h1>
        <p className="text-muted-foreground">
          Get the full app experience. Install PetVan on your home screen for faster access, offline mode, and push notifications.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] space-y-8">
        {/* Android / Native PWA Install */}
        {(isAndroid || deferredPrompt) && (
          <div className="text-center border-b border-border pb-8">
            <h2 className="font-bold text-xl mb-4">Fast Installation</h2>
            <button
              onClick={handleInstallClick}
              disabled={!deferredPrompt}
              className="w-full rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <Download className="size-5" />
              {deferredPrompt ? "Install App Now" : "App is already installed"}
            </button>
          </div>
        )}

        {/* iOS Manual Install Guide */}
        {isIOS && (
          <div className="space-y-6">
            <h2 className="font-bold text-xl text-center">Apple iOS Installation</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Safari doesn't support automatic installation. Follow these 2 easy steps:
            </p>
            
            <div className="flex items-start gap-4">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-bold">1</div>
              <div>
                <p className="font-bold">Tap the Share button</p>
                <p className="text-sm text-muted-foreground mt-1">Look for the share icon at the bottom of your Safari browser.</p>
                <div className="mt-3 inline-flex rounded-xl bg-background border border-border p-3">
                  <Share className="size-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-bold">2</div>
              <div>
                <p className="font-bold">Tap "Add to Home Screen"</p>
                <p className="text-sm text-muted-foreground mt-1">Scroll down the list of actions and tap this option.</p>
                <div className="mt-3 inline-flex items-center gap-3 rounded-xl bg-background border border-border p-3 px-5">
                  <PlusSquare className="size-5 text-foreground" />
                  <span className="font-medium">Add to Home Screen</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isIOS && !isAndroid && !deferredPrompt && (
          <div className="text-center text-muted-foreground text-sm">
            <p>To install PetVan on your phone, open this website on your mobile device (Safari for iOS, Chrome for Android) and follow the prompts.</p>
          </div>
        )}
      </div>
    </div>
  );
}
