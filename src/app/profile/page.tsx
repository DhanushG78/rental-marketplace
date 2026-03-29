"use client";

import { useStore } from "@/store/useStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function Profile() {
  const user = useStore(state => state.user);
  const wishlist = useStore(state => state.wishlist);
  const properties = useStore(state => state.properties);
  const setUser = useStore(state => state.setUser);
  const router = useRouter();

  if (!user) {
    return (
      <div className="p-8 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-10 rounded-3xl text-center shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Not Logged In</h1>
          <p className="text-gray-500 mb-8">You need to log in to view your profile.</p>
          <Link href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition block">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const userProperties = properties.filter(p => p.hostId === user.id);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Successfully logged out");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to log out");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-sm text-center">
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.name || "User"}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{user.email}</p>
            <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-1.5 rounded-full text-sm font-bold capitalize">
              {user.role} Account
            </span>

            <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6">
              <button 
                onClick={handleLogout}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 py-3 rounded-xl font-bold transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link href="/my-listings" className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm hover:shadow-md transition group cursor-pointer block">
              <div className="flex justify-between items-center mb-4">
                <span className="text-4xl">🏠</span>
                <span className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 transition">{userProperties.length}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Active Listings</h3>
              <p className="text-sm text-gray-500 mt-1">Properties you are currently hosting.</p>
            </Link>

            <Link href="/wishlist" className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm hover:shadow-md transition group cursor-pointer block">
              <div className="flex justify-between items-center mb-4">
                <span className="text-4xl">❤️</span>
                <span className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-red-500 transition">{wishlist.length}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Saved Properties</h3>
              <p className="text-sm text-gray-500 mt-1">Properties you have wishlisted.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
