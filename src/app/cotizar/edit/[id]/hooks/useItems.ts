import { CotizacionGet, DinamicFrontendItemItem } from "@/models/cotizacion";
import { ItemGet } from "@/models/items";
import { useState } from "react";
import { toast } from "sonner";

interface Price {
  key: number;
  total: number;
}

export default function useItems(cotizacion: CotizacionGet) {
  const initialItemValues = {
    item: {
      id: 16,
      name: "Milk editado",
      brand: "DairyPure",
      description: "Whole milk editado",
      comment: "Organic, fresh",
      manufactureCode: "MLK-006",
      weight: 1,
      unitPrice: 1.2,
      code: "PRD006",
      unitMeasure: "MILLILITER",
    } as ItemGet,
    amount: 0,
    unitPrice: 0,
    totalPrice: 0,
  };

  const [Items, setItems] = useState<DinamicFrontendItemItem[]>(
    cotizacion.items
  );
  const [prices, setPrices] = useState<Price[]>(
    cotizacion.items.map((item) => ({ key: item.key, total: item.totalPrice }))
  );
  const [nextKey, setNextKey] = useState<number>(cotizacion.items.length + 1); //next id should be 1 more

  const addItem = () => {
    setItems((prevItem) => [
      ...prevItem,
      { key: nextKey, ...initialItemValues },
    ]);
    setPrices((prevPrice) => [...prevPrice, { key: nextKey, total: 0 }]);
    setNextKey((prevKey) => prevKey + 1);
  };

  //Con esto se trabaja el tema de los items dinamicos en el cliente, pero consume muchos recursos
  const updateItem = (id: number, clave: string, valor: string | number) => {
    console.log(id, clave, valor);
    setItems((prevValues) =>
      prevValues.map((item) =>
        item.key === id ? { ...item, [clave]: valor } : item
      )
    );
  };

  const removeItem = (idItem: number) => {
    if (Items.length == 1) {
      toast.error("Tiene que tener al menos un Item");
      return;
    }
    setItems((prevItem) => prevItem.filter((item) => item.key !== idItem));
    setPrices((prevPrice) => prevPrice.filter((price) => price.key !== idItem));
    setNextKey((prevKey) => prevKey - 1);
  };

  return {
    Items,
    addItem,
    updateItem,
    removeItem,
    prices,
    setPrices,
  };
}
