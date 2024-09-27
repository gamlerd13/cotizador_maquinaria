import { ItemGet, ItemPost } from "@/models/items";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { UseItemsProp } from "../interfaces/common";

// let itemsCache: ItemGet[] | null = null;

export const useItems = (): UseItemsProp => {
  const [items, setItems] = useState<ItemGet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getItems = async () => {
    setIsLoading(true);
    try {
      const { data, status } = await axios.get("/api/item/");

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

  const createItem = async (dataForm: ItemPost) => {
    setIsLoading(true);
    try {
      const { status } = await axios.post("/api/item/", dataForm);

      if (status == 201) {
        toast.success("Producto creado con éxito");
        getItems();
      }
    } catch (error) {
      toast.error("Hubo un error al crear producto");
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (dataForm: ItemGet) => {
    setIsLoading(true);
    const { id, ...dataFormEdit } = dataForm;
    try {
      const { status } = await axios.put(`/api/item/${id}`, dataFormEdit);

      if (status == 200) {
        toast.success("Producto actualizado correctamente");
        getItems();
      }
    } catch (error) {
      toast.error("Hubo un error al actualizar el producto");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (idItem: number) => {
    setIsLoading(true);
    try {
      const { status } = await axios.delete(`/api/item/${idItem}/`);

      if (status == 200) {
        toast.success("Producto eliminado correctamente");
        getItems();
      }
    } catch (error) {
      toast.error("Hubo un error al eliminar el producto");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItems();
    // if (itemsCache) {
    //   // Si hay caché, la usamos
    //   setItems(itemsCache);
    //   setIsLoading(false);
    // } else {
    //   // Si no hay caché, llamamos a la API
    //   getItems();
    // }
  }, []);

  return {
    items,
    getItems,
    isLoading,
    updateItem,
    createItem,
    deleteItem,
  };
  // return useMemo(
  //   () => ({
  //     items,
  //     getItems,
  //     isLoading,
  //     updateItem,
  //     createItem,
  //     deleteItem,
  //   }),
  //   [items, isLoading, updateItem, createItem, deleteItem]
  // );
};
