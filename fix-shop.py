import re

with open('src/routes/shop/index.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# The file is broken. Rewrite the top part.
# Find what we need: the import block ends around line 14 (before 'Flame')
# Let's just do a targeted replacement of the broken section

old_broken = '''  ShoppingCart,
  Utensils,
  Wrench,
  Gamepad2,
  Plus,
  Loader2,
  Sparkles,
  Flame,
    });
  }, []);'''

new_fixed = '''  ShoppingCart,
  Utensils,
  Wrench,
  Gamepad2,
  Plus,
  Loader2,
  Sparkles,
  Flame,
  X,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { copy } from "../../lib/i18n";

export const Route = createFileRoute("/shop/")({
  component: Shop,
});

function Shop() {
  const globalPetType = useAppStore((state) => state.globalPetType);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAppStore((state) => state.addToCart);
  const cart = useAppStore((state) => state.cart);
  const lang = useAppStore((state) => state.lang);
  const t = copy[lang];

  const cats = [
    { id: "food", icon: Utensils, label: lang === "ar" ? "طعام" : "Food" },
    { id: "tools", icon: Wrench, label: lang === "ar" ? "أدوات" : "Tools" },
    { id: "games", icon: Gamepad2, label: lang === "ar" ? "ألعاب" : "Games" },
  ];

  useEffect(() => {
    getProductsFn().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);'''

content = content.replace(old_broken, new_fixed)

with open('src/routes/shop/index.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('shop/index.tsx fixed')