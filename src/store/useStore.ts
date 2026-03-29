import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp, query, orderBy } from "firebase/firestore";

export type User = {
  id: string;
  email: string;
  name?: string;
  role: "admin" | "user";
};

export type Property = {
  id: string;
  title: string;
  description: string;
  location: string;
  rentPerMonth: number;
  propertyType: "apartment" | "house" | "room" | string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnishing: "furnished" | "semi" | "unfurnished" | string;
  amenities: string[];
  image: string;
  hostId: string;
  createdAt: string;
};

type Store = {
  user: User | null;
  setUser: (user: User | null) => void;
  
  wishlist: Property[];
  addToWishlist: (item: Property) => void;
  removeFromWishlist: (id: string) => void;
  
  properties: Property[];
  fetchProperties: () => Promise<void>;
  addProperty: (item: Omit<Property, "id" | "createdAt" | "hostId">) => Promise<void>;
  updateProperty: (id: string, updates: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  getUserProperties: (userId: string) => Property[];

  messages: any[];
  addMessage: (msg: any) => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      
      wishlist: [],
      addToWishlist: (item: any) => set((state) => {
        if (state.wishlist.find(i => i.id === item.id)) return state;
        return { wishlist: [...state.wishlist, item] };
      }),
      removeFromWishlist: (id: string) => set((state) => ({ 
        wishlist: state.wishlist.filter((item) => item.id !== id) 
      })),

      properties: [],
      fetchProperties: async () => {
        try {
          const q = query(collection(db, "properties"));
          const querySnapshot = await getDocs(q);
          const properties: Property[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            properties.push({
              id: doc.id,
              ...data,
            } as Property);
          });
          // Sort locally just to ensure consistency
          properties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          set({ properties });
        } catch (error) {
          console.error("Error fetching properties:", error);
        }
      },
      addProperty: async (itemData) => {
        const state = get();
        if (!state.user) throw new Error("Must be logged in to post");
        
        try {
          const newPropData = {
            ...itemData,
            hostId: state.user.id,
            createdAt: new Date().toISOString()
          };
          const docRef = await addDoc(collection(db, "properties"), newPropData);
          
          set({
            properties: [{ id: docRef.id, ...newPropData } as Property, ...state.properties]
          });
        } catch (error) {
          console.error("Error adding property:", error);
          throw error;
        }
      },
      updateProperty: async (id, updates) => {
        try {
          const itemRef = doc(db, "properties", id);
          await updateDoc(itemRef, updates);
          
          set((state) => ({
            properties: state.properties.map((p) => (p.id === id ? { ...p, ...updates } : p))
          }));
        } catch (error) {
          console.error("Error updating property:", error);
          throw error;
        }
      },
      deleteProperty: async (id) => {
        try {
          await deleteDoc(doc(db, "properties", id));
          
          set((state) => ({
            properties: state.properties.filter((p) => p.id !== id)
          }));
        } catch (error) {
          console.error("Error deleting property:", error);
          throw error;
        }
      },
      getUserProperties: (userId) => {
        return get().properties.filter((p) => p.hostId === userId);
      },

      messages: [],
      addMessage: (msg) => set((state) => ({
        messages: [...state.messages, msg]
      })),
    }),
    {
      name: "rental-marketplace-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, wishlist: state.wishlist }), // Exclude properties from Localstorage
    }
  )
);
