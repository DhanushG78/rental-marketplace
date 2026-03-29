"use client";

import { useItems } from "@/modules/items";
import { useStore } from "@/store/useStore";
import { ItemCard } from "@/components/ui/ItemCard";
import Link from "next/link";

export default function MyListings() {
  const { items, fetchItems } = useItems();
  const user = useStore((s) => s.user);

  const myItems = items.filter(
    (item: any) => item.userId === user?.email || item.userId === user?.id
  );

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-200 dark:border-gray-800 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">My Listings</h1>
          <p className="text-gray-500 mt-2 text-lg">Manage your rental properties</p>
        </div>
        <Link href="/#browse" className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-md">
          + Add New Property
        </Link>
      </div>

      {!user ? (
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-10 rounded-3xl text-center text-lg font-medium shadow-sm">
          Please <Link href="/login" className="text-blue-600 hover:underline">log in</Link> to view and manage your properties.
        </div>
      ) : myItems.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-12 rounded-3xl text-center shadow-sm">
          <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">No properties listed yet.</h2>
          <p className="text-gray-500 text-lg">It's easy to get started! Click the button above to add your first property.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {myItems.map((item: any) => (
            <ItemCard key={item.id} item={item} onDelete={fetchItems} />
          ))}
        </div>
      )}
    </div>
  );
}
