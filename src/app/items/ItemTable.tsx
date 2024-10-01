"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useMemo, useState } from "react";
import {
  ModalReason,
  ModalReasonProps,
  UseItemsProp,
} from "./interfaces/common";
import { Spinner } from "@nextui-org/react";
import { DropdownAcciones } from "./DropdownAcciones";
import ModalItem from "./modal/ModalItem";
import { useDisclosure } from "@nextui-org/react";
import { ItemGet } from "@/models/items";
import { InputSearch } from "@/components/InputSearch";
import { ButtonCreateInstance } from "@/components/Button";

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function ItemTable({ useItems }: { useItems: Omit<UseItemsProp, "getItems"> }) {
  const { onOpen, onClose, onOpenChange, isOpen } = useDisclosure();
  const [modalReason, setModalReason] = useState<ModalReasonProps>({
    reason: "create",
    id: null,
  });
  const [initialData, setInitialData] = useState<ItemGet | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const pages = Math.ceil(useItems.items.length / rowsPerPage);

  const items: ItemGet[] = useMemo(() => {
    // const start = (page - 1) * rowsPerPage;
    // const end = start + rowsPerPage;

    if (searchFilter.trim() !== "") {
      const normalizedSearchFilter = removeAccents(
        searchFilter.trim().toLowerCase()
      );
      const filteredAlumnos = useItems.items.filter((product) => {
        const columnsRawFilter =
          `${product.name} ${product.code} ${product.partNumber} ${product.brand} ${product.description} ${product.unitMeasure}`.toLowerCase();
        return removeAccents(columnsRawFilter).includes(normalizedSearchFilter);
      });
      // return filteredAlumnos.slice(start, end);
      return filteredAlumnos;
    } else {
      // return useItems.items.slice(start, end);
      return useItems.items;
    }
  }, [useItems.items, searchFilter]);

  const handleOpenModal = (
    modalReason: ModalReason,
    itemId: number | null,
    item: ItemGet | null
  ) => {
    setModalReason({ reason: modalReason, id: itemId });
    modalReason === "edit" ? setInitialData(item) : setInitialData(null);
    onOpen();
    console.log(modalReason);
  };

  return (
    <>
      <ModalItem
        useItems={{
          updateItem: useItems.updateItem,
          deleteItem: useItems.deleteItem,
          createItem: useItems.createItem,
        }}
        modalProps={{ onOpenChange, isOpen, onClose }}
        modalReason={modalReason}
        initialData={initialData}
      />
      <Table
        isStriped
        aria-label="Example table with dynamic content"
        className=""
        topContent={TopContentDataTable({
          items: useItems.items,
          setRowsPerPage,
          searchFilter,
          setSearchFilter,
          handleOpenModal,
        })}
        align="center"
        classNames={{
          base: "max-h-[520px] overflow-scroll",
          table: "min-h-[200px]",
        }}
        isCompact
        removeWrapper
      >
        <TableHeader>
          <TableColumn>Numero</TableColumn>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Código</TableColumn>
          <TableColumn>Numero de Parte</TableColumn>
          <TableColumn>Marca</TableColumn>
          <TableColumn>Peso</TableColumn>
          <TableColumn>Unidad de Medida</TableColumn>
          <TableColumn>Precio unitario</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody
          // items={useItems.items}
          items={items}
          isLoading={useItems.isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={"No hay filas por mostrar"}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.partNumber}</TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell>{item.unitMeasure}</TableCell>
              <TableCell>{item.unitPrice.toFixed(2)}</TableCell>

              <TableCell>
                <DropdownAcciones
                  item={item}
                  handleOpenModal={handleOpenModal}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

interface TopContentDataTable {
  items: ItemGet[];
  setRowsPerPage: (row: number) => void;
  searchFilter: string;
  setSearchFilter: (value: string) => void;
  handleOpenModal: (
    modalReason: ModalReason,
    itemId: number | null,
    item: ItemGet | null
  ) => void;
}

const TopContentDataTable = ({
  items,
  searchFilter,
  setRowsPerPage,
  setSearchFilter,
  handleOpenModal,
}: TopContentDataTable) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <InputSearch value={searchFilter} setValue={setSearchFilter} />
        <div className="flex gap-3">
          <ButtonCreateInstance
            handleClick={() => handleOpenModal("create", null, null)}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {items.length} Productos
        </span>
        {/* <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label> */}
      </div>
    </div>
  );
};

export default ItemTable;
