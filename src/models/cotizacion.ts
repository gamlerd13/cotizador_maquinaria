import { CotizacionStatus, Currency } from "@prisma/client";
import { Client, ClientCreate } from "./client";
import { CotizacionItemItemGet, ItemGet } from "./items";

// Done
export interface CotizacionBase {
  id: number;
  status: CotizacionStatus;
  code: string;
  parentCode: string;
  clientId?: number;
  date: string; //
  deliverTime: string;
  deliverPlace: string;
  paymentCondition: string;
  offerValidity: string;
  generalCondicion: string;
  comments: string;
  totalPrice: number;
  currency: Currency;
  isEdit: boolean;
  includeIgv: boolean;
  companyInf: string;
  unregisteredClientName: string;
  unregisteredClientContact: string;
  unregisteredClientReference: string;
  unregisteredClientRuc: string;
}

export interface UnregisteredClientForm {
  unregisteredClientName: string;
  unregisteredClientContact: string;
  unregisteredClientReference: string;
  unregisteredClientRuc: string;
}

export type CotizacionFormDataPost = {
  clientId: number | null;
  date: Date;
  deliverTime: string;
  paymentCondition: string;
  deliverPlace: string;
  offerValidity: string;
  generalCondicion: string;
  comments: string;
  totalPrice: number;
  isEdit: boolean;
  currency: Currency;
  includeIgv: boolean;
  companyInf: string;
  items: DinamicFrontendItemItemPost[];
  // Unregister client
} & UnregisteredClientForm;

export type CotizacionFormDataPut = CotizacionFormDataPost & {
  parentCode: string;
};

// TODO: Esto trabaja en update, modificar
export interface ProductItemType {
  key: number;
  description: string;
  model: string;
  amount: number;
  unitPrice: number;
  totalPrice: number;
}

export interface DinamicFrontendItemItem {
  key: number;
  item: ItemGet;
  amount: number;
  unitPrice: number;
  totalPrice: number;
}

export interface DinamicFrontendItemItemPost {
  itemId: number;
  amount: number;
  unitPrice: number;
  totalPrice: number;
}

export type ProductItemPost = ProductItemType & {
  [key: string]: any;
};

export interface CotizacionType {
  id?: number; //por si hay que cotizar desde backend
  client: string;
  // undefined client
  clientName: string;
  clientContact: string;
  clientReference: string;
  clientRuc: string;

  date: string;

  // items: ProductItemType[];
  deliverTime: string;
  paymentCondition: string;
  totalPrice: string;
  [key: string]: any;
}

export interface CotizacionUpdate {
  id?: number; //por si hay que cotizar desde backend
  clientId: string;
  // undefined client
  clientName: string;
  clientContact: string;
  clientReference: string;
  clientRuc: string;

  date: string;

  // items: ProductItemType[];
  deliverTime: string;
  paymentCondition: string;
  totalPrice: string;
  [key: string]: any;
}

export type CotizacionGet = CotizacionBase;

export type CotizacionClientGet = CotizacionGet & { client: Client | null };

// To get Cotizacion and cotizacion Item(product)
export type CotizacionClientItemsGet = CotizacionClientGet & {
  cotizacionItem: CotizacionItemItemGet[];
};

// export const statusLabels: { [key in CotizacionStatus]: string } = {
//   [CotizacionStatus.DRAFT]: "BORRADOR",
//   [CotizacionStatus.SENT]: "ENVIADO",
//   [CotizacionStatus.ACCEPTED]: "ACEPTADO",
//   [CotizacionStatus.REJECTED]: "RECHAZADO",
//   [CotizacionStatus.EXPIRED]: "EXPIRADO",
// };

// export const statusLabels: { [key in CotizacionStatus]: string } = {
//   [CotizacionStatus.ESTADO1]: "ESTADO1",
//   [CotizacionStatus.ESTADO2]: "ESTADO2",
//   [CotizacionStatus.ESTADO3]: "ESTADO3",
//   [CotizacionStatus.ESTADO4]: "ESTADO4",
//   [CotizacionStatus.ESTADO5]: "ESTADO5",
//   [CotizacionStatus.ESTADO6]: "ESTADO6",
// };
export const statusLabels: { [key in CotizacionStatus]: string } = {
  [CotizacionStatus.ESTADO1]: "En evaluación por cliente",
  [CotizacionStatus.ESTADO2]: "Cotización actualizada",
  [CotizacionStatus.ESTADO3]: "Cliente toma decisión en siguientes días",
  [CotizacionStatus.ESTADO4]: "Cliente no responde llamada/mensaje",
  [CotizacionStatus.ESTADO5]: "Ganada",
  [CotizacionStatus.ESTADO6]: "Perdida",
};

type ChipColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

export const statusColors: { [key in CotizacionStatus]: ChipColor } = {
  [CotizacionStatus.ESTADO1]: "default",
  [CotizacionStatus.ESTADO2]: "primary",
  [CotizacionStatus.ESTADO3]: "secondary",
  [CotizacionStatus.ESTADO4]: "success",
  [CotizacionStatus.ESTADO5]: "warning",
  [CotizacionStatus.ESTADO6]: "danger",
};

export const InitialCodeCotizacionChild = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const CurrencySymbol: { [key in Currency]: string } = {
  [Currency.SOLES]: "S/.",
  [Currency.DOLARES]: "$.",
};
