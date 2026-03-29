import { useRouter } from "next/navigation";
import { useStore, Property } from "@/store/useStore";
import toast from "react-hot-toast";

type Props = {
  item: Property;
  onEdit?: (item: any) => void;
  onDelete?: () => void;
};

export const ItemCard = ({ item, onEdit, onDelete }: Props) => {
  const router = useRouter();
  const addToWishlist = useStore(state => state.addToWishlist);
  const deleteProperty = useStore(state => state.deleteProperty);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this property?")) {
      deleteProperty(item.id);
      toast.success("Property deleted");
      onDelete?.();
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(item);
  };

  const isNew = item.createdAt ? (new Date().getTime() - new Date(item.createdAt).getTime() < 86400000 * 3) : false;

  return (
    <div 
      onClick={() => router.push(`/properties/${item.id}`)}
      className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full relative cursor-pointer hover:-translate-y-1 border border-gray-100 dark:border-gray-800"
    >
      <button 
        onClick={(e) => { 
          e.stopPropagation(); 
          addToWishlist(item); 
          toast.success("Added to wishlist! ❤️"); 
        }}
        className="absolute top-4 right-4 z-10 bg-white/70 dark:bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-white dark:hover:bg-black hover:scale-110 transition-all shadow-sm"
      >
        ❤️
      </button>

      {isNew && (
        <span className="absolute top-4 left-4 z-10 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          NEW
        </span>
      )}

      <img
        src={item.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"}
        className="h-56 w-full object-cover transition-transform duration-700 hover:scale-105"
      />

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h2 className="font-extrabold text-lg text-gray-900 dark:text-gray-100 line-clamp-1">{item.title}</h2>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 font-medium">{item.location}</p>

        <p className="font-black text-xl text-black dark:text-white mt-auto pt-2">
          ₹ {Number(item.rentPerMonth).toLocaleString()} <span className="font-semibold text-sm text-gray-500">/mo</span>
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 font-medium flex gap-3">
          <span><span className="font-bold text-gray-900 dark:text-gray-100">{item.bedrooms || 1}</span> Bed</span>
          <span><span className="font-bold text-gray-900 dark:text-gray-100">{item.bathrooms || 1}</span> Bath</span>
          <span><span className="font-bold text-gray-900 dark:text-gray-100">{item.area || 500}</span> sqft</span>
        </p>
      </div>

      {/* Action Buttons */}
      {(onEdit || onDelete) && (
        <div className="px-5 pb-5">
          <div className="mt-auto pt-4 flex w-full gap-3 border-t border-gray-100 dark:border-gray-800">
            {onEdit && (
              <button
                onClick={handleEdit}
                className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 py-2.5 rounded-xl font-bold text-sm transition-colors"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 py-2.5 rounded-xl font-bold text-sm transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};