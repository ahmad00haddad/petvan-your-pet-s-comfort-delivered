import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "../lib/store";
import { useEffect, useState, useMemo } from "react";
import { getProductsFn } from "../api/shop";
import {
  Stethoscope,
  Home,
  Scissors,
  Utensils,
  Wrench,
  Gamepad2,
  Cat,
  Dog,
  Bird,
  Fish,
  Star,
  Plus,
  MapPin,
  ChevronDown,
  ShoppingCart,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  LogOut,
  Calendar,
  Languages,
  Smartphone,
} from "lucide-react";
import heroDog from "@/assets/hero-dog.jpg";
import petCat from "@/assets/pet-cat.jpg";
import petRabbit from "@/assets/pet-rabbit.jpg";
import petParrot from "@/assets/pet-parrot.jpg";
// Use fish icon if no image
import { copy, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PetVan — Jordan's First Mobile Vet Clinic" },
      {
        name: "description",
        content:
          "PetVan brings medical care, grooming, boarding, a pet shop and adoption to your door in Amman and Irbid.",
      },
      { property: "og:title", content: "PetVan — Be the hero your pet thinks you are" },
      {
        property: "og:description",
        content:
          "Mobile veterinary care, salon, hotel, shop and adoption — delivered to your door.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const serviceIcons = [Stethoscope, Home, Scissors];

const shopCats = [
  { icon: Utensils, label: "Food" },
  { icon: Wrench, label: "Tools" },
  { icon: Gamepad2, label: "Games" },
];

const prices = ["7.99", "4.99", "19.99", "6.50", "1.75", "14.99"];

const kinds = [
  { icon: Cat, key: "Cats" as const },
  { icon: Dog, key: "Dogs" as const },
  { icon: Bird, key: "Birds" as const },
  { icon: Fish, key: "Fish" as const },
];

const adoptables = [
  { key: "zazo" as const, sex: "♂", img: petCat, type: "Cats" },
  { key: "lely" as const, sex: "♀", img: petRabbit, type: "Dogs" },
  { key: "kiwi" as const, sex: "♂", img: petParrot, type: "Birds" },
  { key: "fully" as const, sex: "♀", img: heroDog, type: "Cats" },
];

const getHeroImage = (petType: string | null) => {
  if (petType === "Cats") return petCat;
  if (petType === "Birds") return petParrot;
  if (petType === "Dogs") return heroDog;
  // Default/Fish
  return heroDog;
};

function Logo() {
  return (
    <a href="#top" className="shrink-0">
      <span className="relative inline-block font-display text-2xl font-extrabold leading-none">
        <span className="absolute inset-x-0 bottom-0.5 h-2.5 bg-primary" aria-hidden />
        <span className="relative">PetVan</span>
      </span>
    </a>
  );
}

function Index() {
  const userId = useAppStore((state) => state.userId);
  const cart = useAppStore((state) => state.cart);
  const lang = useAppStore((state) => state.lang);
  const setLang = useAppStore((state) => state.setLang);
  const globalPetType = useAppStore((state) => state.globalPetType);
  const setGlobalPetType = useAppStore((state) => state.setGlobalPetType);
  const t = copy[lang];

  const [dbProducts, setDbProducts] = useState<any[]>([]);

  useEffect(() => {
    getProductsFn().then(setDbProducts);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("petvan-lang") as Lang;
    if (saved === "ar" || saved === "en") setLang(saved);
  }, [setLang]);

  useEffect(() => {
    localStorage.setItem("petvan-lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  return (
    <div
      id="top"
      dir={t.dir}
      className={`min-h-screen bg-background text-foreground pb-20 ${lang === "ar" ? "font-arabic" : "font-sans"}`}
    >
      {/* Hero */}
      <section className="relative overflow-hidden w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[600px] items-center pt-8 px-5 sm:px-12">
        <div className="relative order-2 lg:order-1 h-[400px] sm:h-[600px] w-full mt-12 lg:mt-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-foreground rounded-[999px] -z-10 shadow-[0_0_80px_rgba(255,255,255,0.05)]"></div>
          <img
            key={globalPetType || "default"}
            src={getHeroImage(globalPetType)}
            alt="Happy pet"
            className="w-[85%] h-full object-contain mx-auto mix-blend-multiply"
          />
        </div>

        <div className="order-1 lg:order-2 lg:pl-16 relative z-10 text-center lg:text-start flex flex-col items-center lg:items-start">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Hello, <br /> my friend!
          </h1>
          <p className="mt-6 max-w-sm text-sm sm:text-base text-muted-foreground leading-relaxed">
            The first mobile caravan specialized in pets in Jordan, specialized in providing
            treatment and care for them.
          </p>
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <Link
              to={userId ? "/profile" : "/login"}
              className="rounded-full bg-primary px-8 py-2 text-xs sm:text-sm font-bold text-primary-foreground transition-transform hover:scale-105 uppercase tracking-wider"
            >
              {userId ? "Profile" : "Login"}
            </Link>
            {!userId && (
              <Link
                to="/register"
                className="rounded-full border border-foreground px-8 py-2 text-xs sm:text-sm font-bold text-foreground transition-colors hover:bg-foreground hover:text-background uppercase tracking-wider"
              >
                Register
              </Link>
            )}
          </div>
          <p className="mt-10 text-xs text-muted-foreground uppercase tracking-wider mb-4">
            FIND A NEW PET AND RESCUE IT FROM WHEN IT MIGHT BE ALONE OR LOST
          </p>
          <Link
            to="/adopt"
            className="rounded-full bg-primary px-8 py-2.5 text-xs font-bold text-primary-foreground transition-transform hover:scale-105 uppercase tracking-widest"
          >
            FIND YOUR ADOPT FRIEND
          </Link>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-5 py-24 sm:px-8 text-center max-w-4xl mx-auto">
        <p className="text-sm text-muted-foreground mb-6">Choose the kind of pet you own.</p>
        <div className="flex justify-center gap-6 sm:gap-10">
          {kinds.map((k) => {
            const isActive = globalPetType === k.key;
            return (
              <button
                key={k.key}
                onClick={() => setGlobalPetType(isActive ? null : k.key)}
                className={`transition-all hover:scale-110 ${isActive ? "text-primary" : "text-foreground hover:text-primary"}`}
              >
                <k.icon className="w-10 h-10 sm:w-14 sm:h-14" strokeWidth={1.5} />
              </button>
            );
          })}
        </div>

        <h2 className="mt-20 font-display text-3xl font-extrabold text-primary">
          Ask for services
        </h2>
        <p className="mt-2 text-[10px] tracking-widest text-muted-foreground uppercase">
          CHOOSE THE KIND OF SERVICES YOU NEED
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6">
          {t.services.map((s, i) => {
            const Icon = serviceIcons[i];
            return (
              <article key={s.title} className="flex flex-col items-center">
                <span className="grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(255,193,7,0.3)] transition-transform hover:scale-110">
                  <Icon className="size-8" />
                </span>
                <h3 className="mt-6 font-display text-base font-bold">{s.title}</h3>
                <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground max-w-[200px] text-center">
                  The first mobile caravan specialized in caring for domestic pets by ordering a
                  caravan fully equipped...
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Shop */}
      <section
        id="shop"
        className="px-5 py-20 sm:px-8 bg-background border-t border-b border-border relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-display text-3xl font-extrabold text-primary">Shop</h2>
          <p className="mt-2 text-[10px] tracking-widest text-muted-foreground uppercase">
            CHOOSE WHAT YOU NEED WHENEVER YOU NEED
          </p>

          <div className="mt-14 flex flex-wrap justify-center gap-6 sm:gap-10">
            {shopCats.map((c) => (
              <Link
                key={c.label}
                to="/shop"
                className="group w-28 h-28 bg-foreground rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-2 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                <c.icon className="size-8 text-primary-foreground" />
                <span className="text-[10px] font-bold text-primary-foreground">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Adoption */}
      <section id="adopt" className="px-5 py-24 sm:px-8 text-center max-w-5xl mx-auto">
        <p className="text-sm text-muted-foreground mb-8">
          Choose the kind of pet you want to adopt.
        </p>
        <div className="flex justify-center gap-6 sm:gap-10 mb-16">
          {kinds.map((k) => {
            const isActive = globalPetType === k.key;
            return (
              <button
                key={k.key}
                onClick={() => setGlobalPetType(isActive ? null : k.key)}
                className={`transition-all hover:scale-110 ${isActive ? "text-primary" : "text-foreground hover:text-primary"}`}
              >
                <k.icon className="w-10 h-10 sm:w-14 sm:h-14" strokeWidth={1.5} />
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-12">
          {(globalPetType ? adoptables.filter((a) => a.type === globalPetType) : adoptables)
            .concat(adoptables)
            .slice(0, 8)
            .map((a, i) => (
              <figure key={`${a.key}-${i}`} className="group flex flex-col items-center">
                <div className="size-32 sm:size-40 rounded-full border-4 border-foreground/20 overflow-hidden mb-4 transition-transform group-hover:scale-105 group-hover:border-primary">
                  <img
                    src={a.img}
                    alt={a.key}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="font-display font-bold text-lg lowercase flex items-center gap-2">
                  {a.key} <span className="text-foreground text-xl leading-none">{a.sex}</span>
                </figcaption>
              </figure>
            ))}
        </div>

        <Link
          to="/adopt"
          className="mt-16 inline-block rounded-full bg-primary px-10 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
        >
          View More
        </Link>
      </section>
    </div>
  );
}
