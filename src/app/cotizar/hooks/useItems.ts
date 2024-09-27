import { DinamicFrontendItemItem } from "@/models/cotizacion";
import { ItemGet } from "@/models/items";
import { useState } from "react";
import { toast } from "sonner";

interface Price {
  key: number;
  total: number;
}

export default function useItems() {
  const initialItemValues = {
    amount: 0,
    unitPrice: 0,
    totalPrice: 0,
  };
  const [dinamicItems, setItems] = useState<DinamicFrontendItemItem[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [nextKey, setNextKey] = useState<number>(1);

  const addItem = (itemProduct: ItemGet) => {
    //find repeat item
    const repeatItem = dinamicItems.some(
      (item) => item.item.id === itemProduct.id
    );
    if (repeatItem) return toast.error("No puede agregar producto repetido");

    setItems((prevItem) => [
      ...prevItem,
      { key: nextKey, item: itemProduct, ...initialItemValues },
    ]);
    setPrices((prevPrice) => [...prevPrice, { key: nextKey, total: 0 }]);
    setNextKey((prevKey) => prevKey + 1);
  };

  //Con esto se trabaja el tema de los items dinamicos en el cliente, pero consume muchos recursos
  const updateItem = (id: number, clave: string, valor: string | number) => {
    setItems((prevValues) =>
      prevValues.map((item) =>
        item.key === id ? { ...item, [clave]: valor } : item
      )
    );
  };

  const removeItem = (idItem: number) => {
    // if (dinamicItems.length == 1) {
    //   toast.error("Tiene que tener al menos un Item");
    //   return;
    // }
    setItems((prevItem) => prevItem.filter((item) => item.key !== idItem)); // {key: 1} , {key: 2} , {key: 3}   {key: 4}
    setPrices((prevPrice) => prevPrice.filter((price) => price.key !== idItem));
  };

  return {
    dinamicItems,
    setItems,
    addItem,
    updateItem,
    removeItem,
    prices,
    setPrices,
  };
}
