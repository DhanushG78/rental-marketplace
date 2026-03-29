import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";

export const useItems = () => {
  const properties = useStore((state) => state.properties);
  const fetchProperties = useStore((state) => state.fetchProperties);
  const deleteProperty = useStore((state) => state.deleteProperty);
  const [loading, setLoading] = useState(true);
  
  const fetchItems = async () => {
    setLoading(true);
    await fetchProperties();
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { 
    items: properties, 
    loading, 
    fetchItems 
  };
};