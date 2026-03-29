"use client";

import { useAuth } from "@/hooks/useAuth";
import { appConfig } from "@/config/appConfig";
import { useItems } from "@/modules/items";
import { ItemCard } from "@/components/ui/ItemCard";

export default function Dashboard() {
  const { user } = useAuth("admin");
  const { items, fetchItems, loading } = useItems();

  if (!user || user.role !== "admin") return null;

  // Filter listings by the current user
  const currentUser = user;
  const myProperties = items.filter((item: any) => item.userId === currentUser.id || item.userId === currentUser.email);

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-white dark:bg-gray-950">
      <header className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Host Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          Welcome back, {currentUser.email}! Manage your properties effectively.
        </p>
      </header>

      <section className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Listings</h2>
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-bold px-3 py-1 rounded-full">
            {myProperties.length} active
          </span>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading your properties...</p>
        ) : myProperties.length === 0 ? (
          <div className="bg-gray-50 border p-8 rounded-2xl dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-center">
             <p className="text-gray-500 dark:text-gray-400">You don't have any properties listed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProperties.map((item: any) => (
              <ItemCard 
                key={item.id} 
                item={item} 
                onDelete={fetchItems}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
