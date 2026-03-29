"use client";

import { useItems, ItemForm } from "@/modules/items";
import { ItemCard } from "@/components/ui/ItemCard";
import { Hero } from "@/components/sections/Hero";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useState } from "react";
import { useStore } from "@/store/useStore";

export default function Home() {
  const { items, loading, fetchItems } = useItems();
  const { getTerminology } = useAppConfig();
  const [editingItem, setEditingItem] = useState<any>(null);
  const user = useStore((state) => state.user);
  
  // Real-time Filtering State
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [bedrooms, setBedrooms] = useState<number | "">("");
  const [propertyType, setPropertyType] = useState("");
  const [furnishing, setFurnishing] = useState("");

  // Filter Items Array 
  const filteredItems = items.filter((item: any) => {
    const itemLocation = item.location || "";
    const matchesLocation = itemLocation.toLowerCase().includes(location.toLowerCase());
    
    const itemPrice = Number(item.rentPerMonth || item.price || 0);
    const matchesMinPrice = minPrice === "" ? true : itemPrice >= Number(minPrice);
    const matchesMaxPrice = maxPrice === "" ? true : itemPrice <= Number(maxPrice);
    
    const matchesBedrooms = bedrooms === "" ? true : Number(item.bedrooms || 0) >= Number(bedrooms);
    
    const matchesPropertyType = propertyType === "" ? true : item.propertyType?.toLowerCase() === propertyType.toLowerCase();
    const matchesFurnishing = furnishing === "" ? true : item.furnishing?.toLowerCase() === furnishing.toLowerCase();
    
    return matchesLocation && matchesMinPrice && matchesMaxPrice && matchesBedrooms && matchesPropertyType && matchesFurnishing;
  });

  return (
    <>
      <Hero />
      
      <div id="browse" className="min-h-screen bg-gray-50/50 dark:bg-gray-950 p-6 md:p-12">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Admin Form */}
          {user?.role === "admin" && (
            <section className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{editingItem ? 'Editing Listing' : 'Create New Listing'}</h2>
                {editingItem && (
                  <button 
                    onClick={() => setEditingItem(null)} 
                    className="text-sm font-semibold text-blue-600 hover:text-blue-500 hover:underline px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
              <ItemForm 
                key={editingItem ? editingItem.id : "new-post"} 
                initialData={editingItem || {}} 
                onSuccess={() => {
                  setEditingItem(null);
                  fetchItems();
                }} 
              />
            </section>
          )}

          {/* Browse Section */}
          <div className="flex flex-col md:flex-row gap-6 w-full">
            
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 self-start sticky top-24">
              <h2 className="font-extrabold mb-6 text-xl text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-3">Advanced Search</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Location</label>
                  <input 
                    placeholder="E.g. Los Angeles, Paris" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-gray-100 text-sm" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Min ₹</label>
                    <input 
                      type="number"
                      placeholder="0" 
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                      className="border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-gray-100 text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Max ₹</label>
                    <input 
                      type="number"
                      placeholder="9999" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                      className="border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-gray-100 text-sm" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Bedrooms</label>
                  <select 
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value === "" ? "" : Number(e.target.value))}
                    className="border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-gray-100 text-sm appearance-none" 
                  >
                    <option value="">Any</option>
                    <option value="1">1+ Beds</option>
                    <option value="2">2+ Beds</option>
                    <option value="3">3+ Beds</option>
                    <option value="4">4+ Beds</option>
                    <option value="5">5+ Beds</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Property Type</label>
                  <select 
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-gray-100 text-sm appearance-none" 
                  >
                    <option value="">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="room">Room</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Furnishing</label>
                  <select 
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value)}
                    className="border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-gray-100 text-sm appearance-none" 
                  >
                    <option value="">Any</option>
                    <option value="furnished">Fully Furnished</option>
                    <option value="semi">Semi-Furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>
              
              <button
                onClick={() => { setLocation(""); setMinPrice(""); setMaxPrice(""); setBedrooms(""); setPropertyType(""); setFurnishing(""); }}
                className="w-full mt-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 font-bold rounded-xl text-sm transition-all"
              >
                Clear Filters
              </button>
            </div>

            {/* Grid */}
            <div className="w-full lg:w-3/4">
              <div className="flex flex-col sm:flex-row items-baseline justify-between mb-6 gap-4">
                <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-gray-100">
                  Trending Properties
                </h2>
                <span className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm py-1.5 px-4 rounded-full font-bold border border-gray-200 dark:border-gray-700 shadow-sm">
                  {filteredItems.length} items
                </span>
              </div>

              {loading ? (
                <div className="py-24 flex flex-col items-center justify-center w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Loading properties...</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="py-32 flex flex-col items-center justify-center w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm">
                  <span className="text-6xl mb-4">🔍</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No properties match your exact filters</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium text-center max-w-sm">Try adjusting your pricing, checking a different area, or removing some conditions.</p>
                  <button onClick={() => { setLocation(""); setMinPrice(""); setMaxPrice(""); setBedrooms(""); setPropertyType(""); setFurnishing(""); }} className="mt-6 px-6 py-2.5 bg-blue-50 text-blue-600 font-bold rounded-full hover:bg-blue-100 transition-colors">Clear all filters</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {filteredItems.map((item: any) => (
                    <ItemCard 
                      key={item.id} 
                      item={item} 
                      onEdit={user?.role === 'admin' ? (i) => setEditingItem(i) : undefined}
                      onDelete={user?.role === 'admin' ? fetchItems : undefined}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}