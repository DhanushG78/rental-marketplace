"use client";

import { useParams } from "next/navigation";
import { useItems } from "@/modules/items";
import { useStore } from "@/store/useStore";

export default function PropertyDetail() {
  const { id } = useParams();
  const { items } = useItems();
  const addMessage = useStore(state => state.addMessage);

  const property = items.find((i: any) => i.id == id);

  if (!property) return <div className="p-10 flex w-full items-center justify-center min-h-[50vh]"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>;

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen pb-24">
      <img
        src={property.image || "https://via.placeholder.com/800"}
        className="w-full h-[500px] object-cover rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 transition"
      />

      <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100">
            {property.title}
          </h1>
          <p className="text-lg text-gray-500 mt-2 font-medium">{property.location}</p>
        </div>
        
        <div className="text-left md:text-right">
          <p className="text-3xl font-bold text-black dark:text-white">
            ₹ {property.rentPerMonth}
          </p>
          <p className="text-sm font-semibold text-gray-400">per month</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full font-bold text-sm">
          {property.bedrooms || 1} BHK
        </span>
        <span className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full font-bold text-sm">
          {property.area || 500} sqft
        </span>
      </div>

      <div className="mt-10 border-t border-gray-100 dark:border-gray-800 pt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Description</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
          {property.description || "A beautiful property situated in a prime location. Reach out to the host for more details!"}
        </p>
      </div>

      <button 
        onClick={() => {
          const msg = prompt("Enter your message to the host:");
          if (msg) {
            addMessage({ propertyId: id, message: msg, date: new Date().toISOString() });
            alert("Message stored successfully!");
          }
        }}
        className="mt-10 bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors shadow-lg w-full sm:w-auto"
      >
        Contact Host
      </button>
    </div>
  );
}
