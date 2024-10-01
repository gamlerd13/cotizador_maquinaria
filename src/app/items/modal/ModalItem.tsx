import React from "react";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Chip, Input, Select, SelectItem } from "@nextui-org/react";
import { ModalReasonProps, UseItemsProp } from "../interfaces/common";
import { UnitOfMeasure } from "prisma/prisma-client";
import { ItemGet, ItemPost } from "@/models/items";

interface ModalItemProps {
  modalProps: {
    onOpenChange: () => void;
    isOpen: boolean;
    onClose: () => void;
  };
  modalReason: ModalReasonProps;
  useItems: Pick<UseItemsProp, "updateItem" | "deleteItem" | "createItem">;
  initialData: ItemGet | null;
}

function ModalItem({
  modalProps,
  modalReason,
  useItems,
  initialData,
}: ModalItemProps) {
  const titleModal = () => {
    switch (modalReason.reason) {
      case "create":
        return {
          titleText: "Crear Nuevo Producto",
          titleButton: "Crear",
        };
      case "edit":
        return {
          titleText: "Editar Producto",
          titleButton: "Editar",
        };
      case "delete":
        return {
          titleText: "Eliminar Producto",
          titleButton: "Eliminar",
        };
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // const formDataObject = Object.fromEntries(formData.entries());
    // console.log(formDataObject);

    const formDataObject: ItemPost = {
      name: formData.get("name")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      unitMeasure:
        (formData.get("unitMeasure") as UnitOfMeasure) ||
        UnitOfMeasure.KILOGRAM,
      weight: parseFloat(
        parseFloat(formData.get("weight")?.toString() || "0").toFixed(2)
      ),
      unitPrice: parseFloat(
        parseFloat(formData.get("unitPrice")?.toString() || "0").toFixed(2)
      ),
      partNumber: formData.get("partNumber")?.toString() || "",
      brand: formData.get("brand")?.toString() || "",
      code: formData.get("code")?.toString() || "",
    };

    if (modalReason.reason === "create") {
      useItems.createItem(formDataObject);
    } else if (modalReason.reason === "edit" && initialData?.id) {
      useItems.updateItem({ ...formDataObject, id: initialData.id });
    }
    modalProps.onClose();
  };

  const handleDelete = (idItem: number) => {
    console.log(idItem);
    useItems.deleteItem(idItem);
    modalProps.onClose();
  };
  return (
    <Modal isOpen={modalProps.isOpen} onOpenChange={modalProps.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex">{titleModal().titleText}</div>
            </ModalHeader>
            <ModalBody>
              {modalReason.reason === "delete" ? (
                <DeleteItem
                  onClose={onClose}
                  titleButton={titleModal().titleButton}
                  idItem={modalReason.id}
                  handleDelete={handleDelete}
                />
              ) : (
                <FormItem
                  handleSubmit={handleSubmit}
                  onClose={onClose}
                  titleButton={titleModal().titleButton}
                  initialData={initialData}
                />
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

function FormItem({
  onClose,
  handleSubmit,
  titleButton,
  initialData,
}: {
  onClose: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  titleButton: string;
  initialData: ItemGet | null;
}) {
  console.log(initialData);

  const unitPrice =
    initialData?.unitPrice !== undefined
      ? initialData.unitPrice.toLocaleString("es-PE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          useGrouping: false,
        })
      : undefined;

  const weight =
    initialData?.weight !== undefined
      ? initialData.weight.toLocaleString("es-PE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          useGrouping: false,
        })
      : undefined;

  return (
    <form className="mb-8 grid gap-2" onSubmit={handleSubmit}>
      <div className="w-full">
        <Input
          size="sm"
          className="md:col-span-1"
          type="text"
          name="name"
          defaultValue={initialData?.name}
          label="Nombre"
        />
      </div>

      <div className="w-full">
        <Input
          size="sm"
          className="md:col-span-1"
          type="text"
          name="description"
          defaultValue={initialData?.description}
          label="Descripción"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-2">
        <Input
          size="sm"
          className="md:col-span-1"
          type="text"
          name="code"
          defaultValue={initialData?.code}
          label="Código"
        />
        <Input
          size="sm"
          className="md:col-span-1"
          type="text"
          name="brand"
          defaultValue={initialData?.brand}
          label="Marca"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-2">
        <Input
          size="sm"
          className="md:col-span-1"
          type="text"
          name="partNumber"
          defaultValue={initialData?.partNumber}
          label="Numero de Parte"
        />
        <Select
          label="Unidad de Medida"
          placeholder="Seleccione"
          name="unitMeasure"
          defaultSelectedKeys={[initialData?.unitMeasure as UnitOfMeasure]}
        >
          {Object.values(UnitOfMeasure).map((unitMeasure) => (
            <SelectItem key={unitMeasure} value={unitMeasure}>
              {unitMeasure}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-2">
        <Input
          size="sm"
          className="md:col-span-1"
          type="number"
          name="unitPrice"
          //   defaultValue={initialData?.unitPrice.toString()}
          defaultValue={unitPrice}
          label="Precio Unitario"
        />
        <Input
          size="sm"
          className="md:col-span-1"
          type="number"
          name="weight"
          //   defaultValue={initialData?.weight.toString()}
          defaultValue={weight}
          label="Peso (KLgr)"
        />
      </div>

      <ModalFooter>
        <Button size="sm" color="default" variant="flat" onPress={onClose}>
          cerrar
        </Button>
        <Button size="sm" color="default" type="submit">
          {titleButton}
        </Button>
      </ModalFooter>
    </form>
  );
}

function DeleteItem({
  idItem,
  handleDelete,
  onClose,
  titleButton,
}: {
  idItem: number | null;
  handleDelete: (idItem: number) => void;
  onClose: () => void;
  titleButton: string;
}) {
  if (!idItem) return;
  return (
    <>
      <div>
        <span>Esta seguro de eliminar</span>
      </div>
      <ModalFooter>
        <Button size="sm" color="default" variant="flat" onPress={onClose}>
          cerrar
        </Button>
        <Button
          size="sm"
          color="default"
          type="button"
          onClick={() => handleDelete(idItem)}
        >
          {titleButton}
        </Button>
      </ModalFooter>
    </>
  );
}

export default ModalItem;
