
import { useState, useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HelpCircle } from "lucide-react";
import { useAppStore } from "../lib/store";
import { copy } from "../lib/i18n";

export function GuidedTour() {
  const lang = useAppStore((state: any) => state.lang) as keyof typeof copy;
  const t = copy[lang];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const startTour = () => {
    const isArabic = lang === "ar";
    
    const driverObj = driver({
      showProgress: true,
      doneBtnText: isArabic ? "إنهاء" : "Done",
      nextBtnText: isArabic ? "التالي" : "Next",
      prevBtnText: isArabic ? "السابق" : "Prev",
      steps: [
        {
          element: ".nav-tour",
          popover: {
            title: isArabic ? "القائمة الرئيسية" : "Main Navigation",
            description: isArabic 
              ? "من هنا يمكنك تصفح خدماتنا، متجرنا، أو البحث عن حيوان أليف للتبني." 
              : "Use this menu to browse our services, shop, or find a pet to adopt.",
            side: "bottom",
            align: "start"
          }
        },
        {
          element: ".install-tour",
          popover: {
            title: isArabic ? "تثبيت التطبيق" : "Install App",
            description: isArabic 
              ? "قم بتثبيت التطبيق على هاتفك للوصول السريع والإشعارات الفورية."
              : "Install the app on your phone for quick access and instant notifications.",
            side: "bottom",
            align: "start"
          }
        },
        {
          element: ".profile-tour",
          popover: {
            title: isArabic ? "ملفك الشخصي" : "Your Profile",
            description: isArabic 
              ? "أضف حيواناتك الأليفة هنا لتسهيل عملية الحجز وتتبع تاريخها الطبي."
              : "Add your pets here to make booking easier and track their medical history.",
            side: "bottom",
            align: "start"
          }
        },
        {
          element: ".cart-tour",
          popover: {
            title: isArabic ? "سلة المشتريات" : "Shopping Cart",
            description: isArabic 
              ? "طلباتك من المتجر ستظهر هنا جاهزة للدفع."
              : "Your shop orders will appear here ready for checkout.",
            side: "bottom",
            align: "start"
          }
        },
        {
          popover: {
            title: isArabic ? "أنت جاهز!" : "You're All Set!",
            description: isArabic 
              ? "استمتع بتجربة PetVan وابدأ بحجز أول خدمة لك."
              : "Enjoy your PetVan experience and book your first service.",
          }
        }
      ]
    });
    
    driverObj.drive();
  };

  if (!isMounted) return null;

  return (
    <button
      onClick={startTour}
      className="fixed bottom-20 right-6 z-50 p-4 rounded-full bg-secondary border border-primary/30 text-primary shadow-[var(--shadow-card)] transition-all duration-300 hover:scale-110 hover:shadow-[var(--shadow-gold)] group animate-fade-in-up"
      aria-label="Start Tour"
    >
      <HelpCircle className="size-6 transition-transform group-hover:rotate-12" />
      <span className="absolute -top-10 right-0 bg-background text-foreground text-xs px-3 py-1.5 rounded-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">
        {lang === "ar" ? "كيف يعمل؟" : "How it works?"}
      </span>
    </button>
  );
}
