import { createFileRoute } from "@tanstack/react-router";
import {
  Stethoscope,
  Scissors,
  Hotel,
  ShoppingBag,
  HeartHandshake,
  MapPin,
  Star,
  PawPrint,
  Clock,
  ShieldCheck,
  Truck,
  Phone,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/petvan/Section";
import heroVan from "@/assets/hero-van.jpg";
import medical from "@/assets/service-medical.jpg";
import salon from "@/assets/service-salon.jpg";
import hotel from "@/assets/service-hotel.jpg";
import adoption from "@/assets/adoption.jpg";
import shop from "@/assets/shop.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PetVan — عيادة بيطرية وعربة متنقلة في الأردن" },
      {
        name: "description",
        content:
          "PetVan: أول عيادة بيطرية وعربة متنقلة في عمّان وإربد. رعاية طبية، صالون عناية، فندق حيوانات، متجر ومنصة تبني — على باب بيتك.",
      },
      { property: "og:title", content: "PetVan — رعاية حيوانك الأليف تصل إليك" },
      {
        property: "og:description",
        content: "خدمات بيطرية وعناية ومتجر وتبني عبر عربات مجهزة بالكامل في عمّان وإربد.",
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
    title: "الرعاية الطبية",
    desc: "طبيب بيطري مجهّز يصل إليك لفحص وعلاج حيوانك داخل عربة معقّمة بالكامل.",
    price: "من 25 د.أ",
    img: medical,
  },
  {
    icon: Scissors,
    title: "صالون العناية",
    desc: "حلاقة، استحمام، وقص أظافر بأدوات آمنة ومنتجات مميزة داخل العربة.",
    price: "15 د.أ",
    img: salon,
  },
  {
    icon: Hotel,
    title: "فندق الحيوانات",
    desc: "استضافة مريحة وآمنة مع استلام وتوصيل عبر عربة PetVan.",
    price: "من 12 د.أ / ليلة",
    img: hotel,
  },
];

const shopCategories = [
  { name: "الطعام", items: "Reflex · Whiskas · Royal Canin", count: "120+ منتج" },
  { name: "الأدوات", items: "أطواق · حاملات · أمشاط", count: "80+ منتج" },
  { name: "الألعاب", items: "تفاعلية · مضغ · كرات", count: "60+ منتج" },
];

const petTypes = ["قطط", "كلاب", "طيور", "أسماك"];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <PawPrint className="size-5" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">PetVan</span>
          </a>
          <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-primary" href="#services">
              الخدمات
            </a>
            <a className="transition-colors hover:text-primary" href="#tracking">
              التتبع
            </a>
            <a className="transition-colors hover:text-primary" href="#shop">
              المتجر
            </a>
            <a className="transition-colors hover:text-primary" href="#adopt">
              التبني
            </a>
          </div>
          <button className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105">
            تسجيل الدخول
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <img
          src={heroVan}
          alt="عربة PetVan البيطرية المتنقلة في شارع بعمّان وقت الغروب"
          width={1600}
          height={1104}
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-fade)]" />
        <div className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
            <Truck className="size-4" /> عمّان · إربد
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-black leading-tight sm:text-6xl">
            أول <span className="text-gold">عيادة بيطرية متنقلة</span> في الأردن — تصل إلى باب بيتك
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            رعاية طبية، صالون عناية، فندق للحيوانات، متجر إلكتروني ومنصة تبني — كلها في تطبيق واحد
            وعربات مجهّزة بالكامل.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button className="rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105">
              اطلب خدمة الآن
            </button>
            <a
              href="#shop"
              className="rounded-full border border-border bg-card/70 px-7 py-3 font-bold transition-colors hover:border-primary/60"
            >
              تصفّح المتجر
            </a>
          </div>
          <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-4">
            {[
              { k: "دقيقة متوسط الوصول", v: "10" },
              { k: "حيوان تمت رعايته", v: "4,800+" },
              { k: "تقييم العملاء", v: "4.9" },
            ].map((s) => (
              <div key={s.k} className="surface-card px-4 py-5 text-center">
                <dt className="font-display text-3xl font-extrabold text-primary">{s.v}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.k}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <Section id="services">
        <SectionHeading
          eyebrow="الخدمات المتنقلة"
          title="كل ما يحتاجه حيوانك الأليف — يأتي إليه"
          subtitle="عربات مجهّزة بأحدث المعدات وفريق بيطري مرخّص، على مدار الأسبوع."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="group surface-card overflow-hidden transition-transform hover:-translate-y-1"
            >
              <img
                src={s.img}
                alt={s.title}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-2xl bg-primary/15 text-primary">
                    <s.icon className="size-5" />
                  </span>
                  <h3 className="font-display text-xl font-bold">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-bold text-primary">{s.price}</span>
                  <button className="rounded-full bg-secondary px-4 py-2 text-xs font-bold transition-colors hover:bg-primary hover:text-primary-foreground">
                    احجز
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Tracking */}
      <Section id="tracking" className="bg-card/40">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="تتبع مباشر"
              title="تابع عربتك لحظة بلحظة"
            />
            <p className="-mt-6 text-muted-foreground">
              بعد تأكيد الطلب تظهر لك الخريطة مع موقع العربة، الوقت المتبقي للوصول، وبيانات الطبيب
              المسؤول وتقييمه. وبعد انتهاء الخدمة يمكنك تقييم التجربة وكتابة ملاحظاتك.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                { icon: Clock, t: "باقي 10 دقائق للوصول" },
                { icon: ShieldCheck, t: "أطباء مرخّصون ومعقّمات معتمدة" },
                { icon: Star, t: "تقييم الطبيب بعد كل زيارة" },
              ].map((i) => (
                <li key={i.t} className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-full bg-primary/15 text-primary">
                    <i.icon className="size-4" />
                  </span>
                  {i.t}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-card p-6">
            <div className="relative grid h-56 place-items-center overflow-hidden rounded-3xl bg-secondary">
              <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:28px_28px]" />
              <span className="relative grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-gold)]">
                <MapPin className="size-7" />
              </span>
              <span className="relative mt-3 text-sm text-muted-foreground">
                العربة في الطريق إليك · 2.4 كم
              </span>
            </div>
            <div className="mt-5 flex items-center gap-4 rounded-2xl bg-secondary/60 p-4">
              <span className="grid size-12 place-items-center rounded-full bg-primary/20 font-display font-bold text-primary">
                د.س
              </span>
              <div className="flex-1">
                <p className="font-bold">د. سامر الخطيب</p>
                <p className="text-xs text-muted-foreground">طبيب بيطري · PetVan عمّان</p>
              </div>
              <span className="flex items-center gap-1 text-sm font-bold text-primary">
                <Star className="size-4 fill-current" /> 4.9
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* Shop */}
      <Section id="shop">
        <SectionHeading
          eyebrow="المتجر الإلكتروني"
          title="كل مستلزمات حيوانك في مكان واحد"
          subtitle="طعام، أدوات، وألعاب من أفضل العلامات التجارية مع توصيل عبر عربات PetVan."
        />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <img
            src={shop}
            alt="منتجات طعام وألعاب للحيوانات الأليفة"
            loading="lazy"
            width={1200}
            height={900}
            className="h-full w-full rounded-[var(--radius-3xl)] border border-border object-cover"
          />
          <div className="grid gap-4">
            {shopCategories.map((c) => (
              <div
                key={c.name}
                className="surface-card flex items-center justify-between p-6 transition-colors hover:border-primary/50"
              >
                <div>
                  <h3 className="font-display text-lg font-bold">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.items}</p>
                </div>
                <div className="text-left">
                  <span className="block text-xs text-muted-foreground">{c.count}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-primary">
                    <ShoppingBag className="size-4" /> تسوّق
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Adoption */}
      <Section id="adopt" className="bg-card/40">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src={adoption}
            alt="شاب يحمل جرواً تم إنقاذه"
            loading="lazy"
            width={1200}
            height={900}
            className="w-full rounded-[var(--radius-3xl)] border border-border object-cover"
          />
          <div>
            <SectionHeading eyebrow="منصة التبني" title="امنح صديقاً جديداً بيتاً دافئاً" />
            <p className="-mt-6 text-muted-foreground">
              تصفّح الحيوانات المعروضة للتبني من مستخدمي PetVan، مع فلترة حسب النوع، وتواصل مباشر
              مع المالك الحالي.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {petTypes.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-secondary px-4 py-2 text-sm transition-colors hover:border-primary/60 hover:text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
            <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105">
              <HeartHandshake className="size-5" /> استعرض حيوانات التبني
            </button>
          </div>
        </div>
      </Section>

      {/* Pet profiles */}
      <Section>
        <SectionHeading
          eyebrow="ملفات الحيوانات"
          title="سجل كامل لكل حيوان أليف تملكه"
          subtitle="تاريخ الميلاد، معرض الصور، التقارير الطبية والمطاعيم، واسم الطبيب المشرف."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "لونا", t: "قطة شيرازية", d: "المطعوم القادم: 12 آب" },
            { n: "ماكس", t: "كلب غولدن", d: "فحص دوري مكتمل" },
            { n: "كيوي", t: "ببغاء", d: "تقرير جديد من د. رنا" },
            { n: "بابلز", t: "سمكة", d: "متابعة أسبوعية" },
          ].map((p) => (
            <div key={p.n} className="surface-card p-6 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary/15 text-primary">
                <PawPrint className="size-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{p.n}</h3>
              <p className="text-sm text-muted-foreground">{p.t}</p>
              <p className="mt-3 text-xs text-primary">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="surface-card relative overflow-hidden p-10 text-center sm:p-16">
          <div className="absolute inset-x-0 -top-24 mx-auto size-64 rounded-full bg-primary/20 blur-3xl" />
          <h2 className="relative font-display text-3xl font-extrabold sm:text-4xl">
            جاهز لتجربة <span className="text-gold">PetVan</span>؟
          </h2>
          <p className="relative mt-3 text-muted-foreground">
            حمّل التطبيق واطلب أول زيارة خلال دقائق.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <button className="rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105">
              إنشاء حساب
            </button>
            <a
              href="tel:+96200000000"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 font-bold transition-colors hover:border-primary/60"
            >
              <Phone className="size-4" /> اتصل بنا
            </a>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border px-5 py-10 text-center text-sm text-muted-foreground sm:px-8">
        <p className="font-display text-lg font-extrabold text-foreground">PetVan</p>
        <p className="mt-2">عيادة بيطرية وعربة متنقلة · عمّان وإربد، الأردن</p>
        <p className="mt-4 text-xs">© {new Date().getFullYear()} PetVan. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
