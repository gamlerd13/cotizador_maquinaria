import { UnitOfMeasure } from "prisma/prisma-client";

// CotizacionItem = CotizacionProduct table
export interface CotizacionItemGet {
  id: number;
  unitPrice: number;
  amount: number;
  totalPrice: number;
  itemId: number;
  number: number;
}

// Item = product
export interface ItemGet {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  unitMeasure: UnitOfMeasure;
  weight: number;
  partNumber: string;
  brand: string;
  code: string;
}

// CotizacionItemGet include product, relation 1 1
export type CotizacionItemItemGet = CotizacionItemGet & {
  item: ItemGet;
};

export type ItemPost = Omit<ItemGet, "id">;

export type SearchItemProps = {
  items: ItemGet[];
  isLoading: boolean;
  getItems: (search: string) => void;
};

export const UnitOfMeasureES: { [key in UnitOfMeasure]: string } = {
  [UnitOfMeasure.BOX]: "CAJA",
  [UnitOfMeasure.CENTIMETER]: "CENTIMETRO",
  [UnitOfMeasure.GRAM]: "GRAMO",
  [UnitOfMeasure.KILOGRAM]: "KILOGRAMO",
  [UnitOfMeasure.UNIT]: "UNIDAD",
  [UnitOfMeasure.LITER]: "LITRO",
  [UnitOfMeasure.METER]: "METRO",
  [UnitOfMeasure.PIECE]: "PIEZA",
  [UnitOfMeasure.MILLILITER]: "MILILITRO",
};
