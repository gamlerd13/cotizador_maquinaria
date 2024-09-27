import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { ModalReason } from "./interfaces/common";
import { ItemGet } from "@/models/items";

export function DropdownAcciones({
  handleOpenModal,
  item,
}: {
  handleOpenModal: (
    modalReason: ModalReason,
    itemId: number | null,
    item: ItemGet | null
  ) => void;
  item: ItemGet;
}) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Opciones</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="edit"
          startContent={<FaEdit />}
          onClick={() => handleOpenModal("edit", item.id, item)}
        >
          Editar
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<BiTrash />}
          onClick={() => handleOpenModal("delete", item.id, null)}
        >
          Eliminar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
