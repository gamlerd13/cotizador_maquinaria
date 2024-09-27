import { DinamicFrontendItemItem } from "@/models/cotizacion";
import { CotizacionItemItemGet, ItemGet } from "@/models/items";
import { useState } from "react";
import { toast } from "sonner";

interface InitialValues {
  amount: number;
  unitPrice: number;
  totalPrice: number;
}

export default function useDinamicItems(
  cotizacionItemInitValues: CotizacionItemItemGet[]
) {
  const initialItemValues: InitialValues = {
    amount: 0,
    unitPrice: 0,
    totalPrice: 0,
  };

  const initialItemValuesBD: DinamicFrontendItemItem[] =
    cotizacionItemInitValues.map((dinamicItem, index) => ({
      key: index + 1,
      amount: dinamicItem.amount,
      unitPrice: dinamicItem.unitPrice,
      totalPrice: dinamicItem.totalPrice,
      item: dinamicItem.item,
    }));
  const INITIAL_NEXT_KEY_ITEM = initialItemValuesBD.length + 1;

  const [dinamicItems, setDinamicItems] =
    useState<DinamicFrontendItemItem[]>(initialItemValuesBD);
  const [nextKeyItem, setNextKeyItem] = useState<number>(INITIAL_NEXT_KEY_ITEM);

  const addItem = (itemProduct: ItemGet) => {
    //find repeat item
    const repeatItem = dinamicItems.some(
      (item) => item.item.id === itemProduct.id
    );
    if (repeatItem) return toast.error("No puede agregar producto repetido");

    setDinamicItems((prevItem) => [
      ...prevItem,
      { key: nextKeyItem, item: itemProduct, ...initialItemValues },
    ]);
    setNextKeyItem((prevKey) => prevKey + 1);
  };

  //Con esto se trabaja el tema de los items dinamicos en el cliente, pero consume muchos recursos
  const updateItem = (key: number, clave: string, valor: number) => {
    setDinamicItems((prevValues) =>
      prevValues.map((item) => {
        if (item.key === key) {
          const updatedItem = { ...item, [clave]: valor };

          // Si uno de los dos campos cambia, recalculamos el valor de la clave 'key'
          if (clave === "amount" || clave === "unitPrice") {
            const amount = clave === "amount" ? valor : item.amount;
            const unitPrice = clave === "unitPrice" ? valor : item.unitPrice;
            updatedItem.totalPrice = Number(amount) * Number(unitPrice);
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const removeItem = (idItem: number) => {
    // if (dinamicItems.length == 1) {
    //   toast.error("Tiene que tener al menos un Item");
    //   return;
    // }
    setDinamicItems((prevItem) =>
      prevItem.filter((item) => item.key !== idItem)
    ); // {key: 1} , {key: 2} , {key: 3}   {key: 4}
  };

  return {
    dinamicItems,
    setDinamicItems,
    addItem,
    updateItem,
    removeItem,
  };
}
