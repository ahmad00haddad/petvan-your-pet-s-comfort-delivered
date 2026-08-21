import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getPetByIdFn } from "../../api/pets";
import {
  ArrowLeft,
  Loader2,
  Share2,
  Syringe,
  Activity,
  Info,
  CalendarDays,
  Weight,
  Stethoscope,
  FileText,
  QrCode,
} from "lucide-react";
import { useAppStore } from "../../lib/store";
import { copy } from "../../lib/i18n";

export const Route = createFileRoute("/pets/$petId")({
  component: PetProfile,
});

function PetProfile() {
  const { petId } = Route.useParams();
  const lang = useAppStore((state) => state.lang);
  const t = copy[lang];
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"medical" | "vaccines">("medical");
  const [ageString, setAgeString] = useState(lang === "ar" ? "غير محدد" : "Unknown");

  useEffect(() => {
    getPetByIdFn({ data: petId })
      .then((data) => {
        setPet(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [petId]);

  // Calculate age — client-only to avoid SSR hydration mismatch
  useEffect(() => {
    if (pet?.birthDate) {
      const birth = new Date(pet.birthDate);
      const diff = Date.now() - birth.getTime();
      const age = new Date(diff);
      const years = Math.abs(age.getUTCFullYear() - 1970);
      const months = age.getUTCMonth();
      setAgeString(years > 0 ? `${years}y ${months}m` : `${months}m`);
    }
  }, [pet?.birthDate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Meet ${pet?.name}`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === "ar" ? "تم نسخ الرابط!" : "Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 text-primary bg-background">
        <Loader2 className="size-10 animate-spin" />
        <p className="font-bold animate-pulse text-foreground">{lang === "ar" ? "جاري تحميل الملف الشخصي..." : "Loading Profile..."}</p>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="mx-auto max-w-2xl p-8 text-center min-h-[60vh] flex flex-col justify-center bg-background text-foreground">
        <h1 className="font-display text-3xl font-bold mb-4">{t.petNotFound}</h1>
        <p className="text-muted-foreground mb-8">
          {t.petNotFoundDesc}
        </p>
        <Link to="/" className="text-primary hover:underline font-bold">
          {t.goBackHome}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <div className="relative h-72 sm:h-96 w-full bg-secondary">
        {pet.image ? (
          <img
            src={pet.image}
            alt={pet.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-8xl">
            {pet.type === "Cats" || pet.type === "Cat"
              ? "🐱"
              : pet.type === "Dogs" || pet.type === "Dog"
                ? "🐶"
                : pet.type === "Birds" || pet.type === "Bird"
                  ? "🦜"
                  : "🐟"}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <Link
            to="/profile"
            className="grid size-10 place-items-center rounded-full bg-background/50 backdrop-blur text-foreground hover:bg-background transition-colors"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(lang === "ar" ? "قريباً: رمز QR الخاص بحيوانك" : "Coming soon: Pet QR Code")}
              className="grid size-10 place-items-center rounded-full bg-background/50 backdrop-blur text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <QrCode className="size-5" />
            </button>
            <button
              onClick={handleShare}
              className="grid size-10 place-items-center rounded-full bg-background/50 backdrop-blur text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Share2 className="size-5" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
          <div className="mx-auto max-w-4xl flex items-end justify-between">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground drop-shadow-md">
                {pet.name}{" "}
                <span className="text-primary text-2xl align-middle">
                  {pet.gender === "M" ? "♂" : "♀"}
                </span>
              </h1>
              <p className="mt-1 text-muted-foreground font-bold text-sm sm:text-base drop-shadow-md">
                {pet.breed || pet.type}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-5 sm:px-8 -mt-2 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="rounded-2xl glass-panel p-4 shadow-[var(--shadow-card)] flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:glow-primary">
            <CalendarDays className="size-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground">{t.age}</p>
            <p className="font-bold text-sm">{ageString}</p>
          </div>
          <div className="rounded-2xl glass-panel p-4 shadow-[var(--shadow-card)] flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:glow-primary">
            <Weight className="size-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground">{t.weight}</p>
            <p className="font-bold text-sm">{pet.weight || "--"}</p>
          </div>
          <div className="rounded-2xl glass-panel p-4 shadow-[var(--shadow-card)] flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:glow-primary">
            <Info className="size-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground">{t.gender}</p>
            <p className="font-bold text-sm">{pet.gender === "M" ? (lang === "ar" ? "ذكر" : "Male") : (lang === "ar" ? "أنثى" : "Female")}</p>
          </div>
          <div className="rounded-2xl glass-panel p-4 shadow-[var(--shadow-card)] flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:glow-primary">
            <Activity className="size-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground">{t.status}</p>
            <p className="font-bold text-sm text-green-500">{t.healthy}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border mb-6">
          <button
            onClick={() => setActiveTab("medical")}
            className={`pb-3 text-sm font-bold transition-colors relative ${activeTab === "medical" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t.medicalReports}
            {activeTab === "medical" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("vaccines")}
            className={`pb-3 text-sm font-bold transition-colors relative ${activeTab === "vaccines" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t.vaccinations}
            {activeTab === "vaccines" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          {activeTab === "medical" && (
            <div className="relative pl-6 sm:pl-8 py-4 space-y-8 before:absolute before:inset-0 before:left-[19px] sm:before:left-[27px] before:w-px before:bg-border">
              {pet.medicalReports && pet.medicalReports.length > 0 ? (
                pet.medicalReports.map((report: any, idx: number) => (
                  <div
                    key={report.id}
                    className="relative rounded-3xl glass-panel p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:glow-primary"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="absolute top-6 -left-[2.1rem] sm:-left-[2.6rem] grid size-8 place-items-center rounded-full bg-background border-2 border-primary text-primary z-10 shadow-[0_0_10px_color-mix(in_oklch,var(--color-primary)_30%,transparent)]">
                      <Stethoscope className="size-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg font-display text-primary mb-1">{report.diagnosis}</h3>
                      <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider font-bold">
                        {new Date(report.date).toLocaleDateString()} • {report.doctor}
                      </p>

                      {report.prescription && report.prescription !== "None" && (
                        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
                          <FileText className="size-4" />
                          {report.prescription}
                        </div>
                      )}

                      <p className="text-sm text-muted-foreground leading-relaxed">{report.notes}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-border p-12 text-center">
                  <Activity className="size-10 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="font-bold mb-1">{t.noMedicalRecords}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.noMedicalRecordsDesc}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "vaccines" && (
            <div className="space-y-4">
              {pet.vaccinations && pet.vaccinations.length > 0 ? (
                pet.vaccinations.map((vac: any) => (
                  <div
                    key={vac.id}
                    className="rounded-2xl glass-panel p-5 shadow-[var(--shadow-card)] flex items-center justify-between gap-4 transition-all hover:bg-card/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="grid size-10 shrink-0 place-items-center rounded-full bg-blue-500/10 text-blue-500">
                        <Syringe className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-base">{vac.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {t.given}: {new Date(vac.dateGiven).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">{t.nextDue}</p>
                      <div className="rounded bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                        {new Date(vac.nextDueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-border p-12 text-center">
                  <Syringe className="size-10 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="font-bold mb-1">{t.noVaccinations}</p>
                  <p className="text-xs text-muted-foreground">{t.noVaccinationsDesc}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
