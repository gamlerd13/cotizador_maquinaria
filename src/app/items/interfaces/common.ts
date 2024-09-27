import { ItemGet, ItemPost } from "@/models/items";

export interface UseItemsProp {
  items: ItemGet[];
  isLoading: boolean;
  getItems: () => void;
  createItem: (dataForm: ItemPost) => void;
  updateItem: (dataForm: ItemGet) => void;
  deleteItem: (idItem: number) => void;
}

export type ModalReason = "create" | "edit" | "delete";

export type ModalReasonProps = {
  reason: ModalReason;
  id: number | null;
};
