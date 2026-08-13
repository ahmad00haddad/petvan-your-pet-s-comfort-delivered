import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface AppState {
  lang: 'en' | 'ar'
  setLang: (lang: 'en' | 'ar') => void

  userId: string | null
  setUserId: (id: string | null) => void
  
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      lang: 'en',
      setLang: (lang) => set({ lang }),

      userId: null,
      setUserId: (id) => set({ userId: id }),

      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((c) => c.productId === item.productId)
          if (existing) {
            return {
              cart: state.cart.map((c) =>
                c.productId === item.productId ? { ...c, quantity: c.quantity + item.quantity } : c
              ),
            }
          }
          return { cart: [...state.cart, item] }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((c) => c.productId !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((c) => (c.productId === productId ? { ...c, quantity } : c)),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'petvan-storage',
    }
  )
)
