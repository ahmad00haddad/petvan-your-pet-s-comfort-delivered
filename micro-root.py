import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

# 1. Smart Page Title in __root.tsx
root = rd('src/routes/__root.tsx')
if "visibilitychange" not in root:
    root = root.replace(
        '  const [scrolled, setScrolled] = useState(false);',
        '''  const [scrolled, setScrolled] = useState(false);

  // Micro-interaction: Smart Page Title
  useEffect(() => {
    const originalTitle = document.title || "PetVan";
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = lang === "ar" ? "🐶 اشتقنالك! عد إلينا" : "🐶 We miss you! Come back";
      } else {
        document.title = originalTitle;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [lang]);'''
    )
    # Pulsing Map Pin
    root = root.replace(
        '<MapPin className="size-4 text-primary" />',
        '<MapPin className="size-4 text-primary animate-pulse" />'
    )
    rw('src/routes/__root.tsx', root)

print("Done root")