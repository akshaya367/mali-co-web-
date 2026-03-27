import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.id === newItem.id);
        
        if (existingItem) {
          set({
            items: currentItems.map(item => 
              item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          });
        } else {
          set({ items: [...currentItems, { ...newItem, quantity: 1 }] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter(item => item.id !== id) }),
      updateQuantity: (id, delta) => {
        const currentItems = get().items;
        set({
          items: currentItems.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
          )
        });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: () => get().items.reduce((sum, item) => {
        const priceNum = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
        return sum + (priceNum * item.quantity);
      }, 0),
    }),
    {
      name: 'malai-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Custom hook to handle hydration in Next.js
export const useCart = () => {
  const [hasHydrated, setHasHydrated] = useState(false);
  const store = useCartStore();

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return { ...store, hasHydrated };
};

// Original export for components that don't need hydration check immediately
export { useCartStore };

