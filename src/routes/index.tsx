import { createFileRoute } from "@tanstack/react-router";
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
} from "lucide-react";
import heroDog from "@/assets/hero-dog.jpg";
import petCat from "@/assets/pet-cat.jpg";
import petRabbit from "@/assets/pet-rabbit.jpg";
import petParrot from "@/assets/pet-parrot.jpg";

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
        content: "Mobile veterinary care, salon, hotel, shop and adoption — delivered to your door.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  {
    icon: Stethoscope,
    title: "Medical Care",
    desc: "If you feel your pet needs immediate medical attention, guidance from a doctor, or other care.",
  },
  {
    icon: Home,
    title: "Hotel",
    desc: "If you need a temporary, safe and comfortable place to take care of your pet.",
  },
  {
    icon: Scissors,
    title: "Salon",
    desc: "If your pet needs cleaning, shaving, nail clipping and other grooming services.",
  },
];

const shopCats = [
  { icon: Utensils, label: "Food" },
  { icon: Wrench, label: "Tools" },
  { icon: Gamepad2, label: "Games" },
];

const products = [
  { name: "reflex", desc: "cat food for kitten chicken · 15kg", price: "7.99" },
  { name: "whiskas", desc: "cat food for adult tuna flavour · 7kg", price: "4.99" },
  { name: "royal canin", desc: "cat food for kitten chicken · 15kg", price: "19.99" },
  { name: "pro line", desc: "cat food for adult chicken · 1.5kg", price: "6.50" },
  { name: "reflex stick", desc: "cat stick food rabbit · 3 sticks", price: "1.75" },
  { name: "happy cat", desc: "cat food skin and coat · 1.3kg", price: "14.99" },
];

const kinds = [
  { icon: Cat, label: "Cats" },
  { icon: Dog, label: "Dogs" },
  { icon: Bird, label: "Birds" },
  { icon: Fish, label: "Fish" },
];

const adoptables = [
  { name: "zazo", sex: "♂", img: petCat },
  { name: "lely", sex: "♀", img: petRabbit },
  { name: "kiwi", sex: "♂", img: petParrot },
  { name: "fully", sex: "♀", img: heroDog },
];

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
  return (
    <div id="top" className="min-h-screen bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-4 sm:px-8">
          <Logo />
          <div className="hidden items-center gap-1 text-sm sm:flex">
            <MapPin className="size-4 text-muted-foreground" />
            <span className="font-medium">Location</span>
            <ChevronDown className="size-4 text-primary" />
            <span className="text-muted-foreground">Amman</span>
          </div>
          <nav className="ms-auto hidden items-center gap-7 text-xs font-semibold tracking-[0.12em] lg:flex">
            <a className="transition-colors hover:text-primary" href="#about">
              ABOUT US
            </a>
            <a className="transition-colors hover:text-primary" href="#services">
              OUR SERVICES
            </a>
            <a className="transition-colors hover:text-primary" href="#shop">
              HELP
            </a>
          </nav>
          <button className="relative ms-auto lg:ms-0" aria-label="Cart">
            <ShoppingCart className="size-5" />
            <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              5
            </span>
          </button>
          <button className="hidden rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 sm:block">
            Login
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:pb-24">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-6 rounded-[999px] bg-primary/10 blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[999px_999px_999px_999px] bg-[oklch(0.93_0.005_90)] shadow-[var(--shadow-card)]">
              <img
                src={heroDog}
                alt="Happy dog holding a plush toy"
                width={1008}
                height={1408}
                className="mx-auto block h-[420px] w-full object-cover object-top sm:h-[560px]"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm text-muted-foreground">A great place to receive care.</p>
            <p className="mt-1 font-display text-lg font-bold">
              Be the hero your pet{" "}
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-0.5 h-2 bg-primary/80" aria-hidden />
                <span className="relative">thinks you are.</span>
              </span>
            </p>
            <h1 className="mt-8 font-display text-5xl font-black leading-[1.05] sm:text-6xl">
              Hello, <span className="text-gold">my friend!</span>
            </h1>
            <p className="mt-5 max-w-md text-muted-foreground">
              The first mobile caravan specialized in pets in Jordan — providing treatment,
              grooming, boarding and pet food, right at your doorstep.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-full bg-primary px-8 py-3 text-sm font-bold tracking-wide text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105">
                LOGIN
              </button>
              <button className="rounded-full border border-primary px-8 py-3 text-sm font-bold tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                REGISTER
              </button>
            </div>
            <p className="mt-10 max-w-sm text-sm text-muted-foreground">
              First place potential adopters turn to when looking to get a new pet.
            </p>
            <a
              href="#adopt"
              className="mt-4 inline-block rounded-full bg-primary px-8 py-3 text-sm font-bold tracking-wide text-primary-foreground transition-transform hover:scale-105"
            >
              FIND YOUR BEST FRIEND
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-muted-foreground">Choose the kind of pet you own.</p>
          <div className="mt-5 flex justify-center gap-8">
            {kinds.map((k) => (
              <button
                key={k.label}
                className="group flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                aria-label={k.label}
              >
                <k.icon className="size-8 transition-transform group-hover:-translate-y-1" />
                <span className="text-[11px] tracking-wide">{k.label}</span>
              </button>
            ))}
          </div>

          <h2 className="mt-12 font-display text-4xl font-extrabold text-primary">
            Ask for services
          </h2>
          <p className="mt-1 text-xs tracking-[0.2em] text-muted-foreground">
            WE PUT YOUR PET&apos;S NEED FIRST
          </p>

          <div className="mt-10 rounded-[3rem] border border-border bg-card p-8 shadow-[var(--shadow-card)] sm:p-12">
            <div className="grid gap-10 sm:grid-cols-3">
              {services.map((s) => (
                <article key={s.title} className="group flex flex-col items-center">
                  <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-gold)] transition-transform group-hover:scale-110">
                    <s.icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 max-w-[15rem] text-xs leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                  <button className="mt-5 rounded-full border border-border px-5 py-1.5 text-xs font-bold transition-colors hover:border-primary hover:text-primary">
                    Request
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tracking */}
      <section className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
            <Scissors className="size-5" />
          </span>
          <p className="mt-3 font-display font-bold">Salon</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Cleaning, shaving, nail clipping and other services
          </p>
          <p className="mt-4 font-display text-lg font-bold">
            Cost : <span className="text-primary">15 JD</span>
          </p>

          <h3 className="mt-8 font-display text-2xl font-extrabold">
            Only 10 minutes left to reach you
          </h3>
          <div className="relative mt-5 h-56 overflow-hidden rounded-3xl bg-secondary">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:26px_26px]" />
            <div className="absolute left-1/2 top-1/2 h-1.5 w-4/5 -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-full bg-primary/70" />
            <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-gold)]">
              <MapPin className="size-6" />
            </span>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-primary/20 text-sm font-bold text-primary">
              AH
            </span>
            <div className="text-left">
              <p className="text-sm">
                Doctor <span className="font-bold">Haddad</span> will soon arrive
              </p>
              <span className="flex text-primary">
                {[0, 1, 2, 3].map((i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
                <Star className="size-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-display text-4xl font-extrabold text-primary">Shop</h2>
          <p className="mt-1 text-xs tracking-[0.2em] text-muted-foreground">
            CHOOSE WHAT YOU NEED WHENEVER YOU NEED
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {shopCats.map((c) => (
              <button
                key={c.label}
                className="group grid size-24 place-items-center rounded-3xl bg-foreground text-background shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1"
              >
                <c.icon className="size-8" />
                <span className="sr-only">{c.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <article
                key={p.name}
                className="group relative overflow-hidden rounded-3xl bg-card p-5 text-left shadow-[var(--shadow-card)] ring-1 ring-border transition-transform hover:-translate-y-1"
              >
                <div className="grid h-36 place-items-center rounded-2xl bg-secondary">
                  <Utensils className="size-10 text-primary/70" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold lowercase">{p.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-lg font-bold">{p.price} JD</span>
                  <button
                    className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110"
                    aria-label={`Add ${p.name} to cart`}
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Adoption */}
      <section id="adopt" className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm text-muted-foreground">
            Choose the kind of pet you want to adopt.
          </p>
          <div className="mt-5 flex justify-center gap-8 text-primary">
            {kinds.map((k) => (
              <k.icon key={k.label} className="size-8" />
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {adoptables.map((a) => (
              <figure key={a.name} className="group">
                <img
                  src={a.img}
                  alt={a.name}
                  loading="lazy"
                  width={900}
                  height={1200}
                  className="mx-auto size-28 rounded-full border-2 border-border object-cover transition-transform group-hover:scale-105 group-hover:border-primary"
                />
                <figcaption className="mt-3 font-display font-bold">
                  {a.name} <span className="text-primary">{a.sex}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <button className="mt-10 rounded-full bg-primary px-8 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105">
            View More
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="border-t border-border px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 text-center sm:grid-cols-3 sm:text-left">
          <div>
            <h2 className="font-display font-bold">About Us</h2>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              The first mobile veterinary clinic in Jordan specialized in caring for domestic pets
              by ordering a caravan fully equipped with the latest tools and working hands from
              experienced doctors.
            </p>
          </div>
          <div>
            <h2 className="font-display font-bold">Contact Us</h2>
            <p className="mt-3 text-xs text-muted-foreground">Ahmad000Haddad@gmail.com</p>
            <p className="mt-1 text-xs text-muted-foreground">+962 7 9925 6345</p>
          </div>
          <div>
            <h2 className="font-display font-bold">Social With Us</h2>
            <div className="mt-4 flex justify-center gap-4 text-muted-foreground sm:justify-start">
              {[Instagram, Facebook, Twitter, Mail].map((Icon, i) => (
                <a key={i} href="#top" className="transition-colors hover:text-primary">
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-10 text-center text-[11px] text-muted-foreground/60">
          Ahmad Haddad © All rights reserved.
        </p>
      </footer>
    </div>
  );
}
