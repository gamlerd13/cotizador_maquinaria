import { ItemGet, ItemPost, SearchItemProps } from "@/models/items";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export const useInputSearchItem = (): SearchItemProps => {
  const [items, setItems] = useState<ItemGet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getItems = async (search: string) => {
    setIsLoading(true);
    try {
      const { data, status } = await axios.get(
        `/api/item/query?code_or_name=${search}`
      );

      if (status == 200) {
        // itemsCache = data; // Guardar en la caché
        setItems(data);
      }
    } catch (error) {
      toast.error("Hubo un error al traer los productos");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    items,
    isLoading,
    getItems,
  };
};
