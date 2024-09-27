import { DinamicFrontendItemItem } from "@/models/cotizacion";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { BiTrash } from "react-icons/bi";

interface ItemProp {
  dinamicItem: DinamicFrontendItemItem;
  removeItem: (itemId: number) => void;
  index: number;
  setDinamicItems: React.Dispatch<
    React.SetStateAction<DinamicFrontendItemItem[]>
  >;
  updateItem: (key: number, clave: string, valor: number) => void;
}
export default function ProductItem({
  dinamicItem,
  removeItem,
  updateItem,
  index,
  setDinamicItems,
}: ItemProp) {
  return (
    <div className="w-full">
      <hr className="pb-2" />

      <div className="flex flex-col gap-2">
        <div className="flex flex-grow gap-2">
          <Button
            size="sm"
            className="h- hover:text-white hover:bg-rose-700 py-2"
            type="button"
            onClick={() => removeItem(dinamicItem.key)}
          >
            <BiTrash className="text-lg" />
          </Button>

          <Input
            size="sm"
            className="w-full z-0"
            type="text"
            value={`${dinamicItem.item.code}-${dinamicItem.item.name}`}
            label="Producto"
            disabled
          />
        </div>

        <div className="flex flex-grow gap-2 min-w-[345px]">
          <Input
            size="sm"
            required
            className="flex-none w-[90px] z-0"
            type="number"
            name={`${dinamicItem.item.id}_amount`}
            label="Cantidad"
            value={dinamicItem.amount.toString()}
            onChange={(e) => {
              updateItem(dinamicItem.key, "amount", parseFloat(e.target.value));
            }}
          />
          <Input
            size="sm"
            className="min-w-[110px] z-0"
            type="number"
            name={`${dinamicItem.item.id}_unitprice`}
            label="P. Unitario"
            value={dinamicItem.unitPrice.toString()}
            onChange={(e) => {
              updateItem(
                dinamicItem.key,
                "unitPrice",
                parseFloat(e.target.value)
              );
            }}
          />
          <Input
            size="sm"
            type="number"
            label="P. Total"
            className="z-0"
            value={(dinamicItem.unitPrice * dinamicItem.amount)
              .toFixed(2)
              .toString()}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
