"use client";

import { useStore } from "@/store/useStore";
import { ItemCard } from "@/components/ui/ItemCard";

export default function Wishlist() {
  const wishlist = useStore((s) => s.wishlist);

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 tracking-tight text-gray-900 dark:text-gray-100">Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-lg font-medium">No saved properties yet. Start exploring and click the heart to save!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist.map((item: any) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
