// react
import React, { useState } from "react";

// ui components
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Chip,
} from "@nextui-org/react";
import { Button, useDisclosure } from "@nextui-org/react";

// icons
import { FaEdit } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

// components
import ModalEndCotizacion from "./modal/ModalEndQuotation";

// libraries
import ReactPdfComponent from "@/components/cotizacion/React-pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

// utils and hooks
import { getDateHour } from "@/lib/main";
import { useRouter } from "next/navigation";

// types
import {
  CotizacionClientGet,
  CurrencySymbol,
  statusColors,
  statusLabels,
} from "@/models/cotizacion";
import { CotizacionEnd } from "./types/main";
import { CotizacionStatus } from "@prisma/client";
import { DropdownAcciones } from "./DropdownAcciones";

interface CotizacionesTable {
  cotizacionList: CotizacionClientGet[] | null;
  isLoading: boolean;
  updateCotizacion: (
    cotizacionId: number,
    typeEnding: CotizacionStatus
  ) => void;
}

function CotizacionesTable({
  cotizacionList,
  isLoading,
  updateCotizacion,
}: CotizacionesTable) {
  const router = useRouter();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [cotizacionEnd, setCotizacionIdEnd] = useState<CotizacionEnd | null>(
    null
  );
  if (!cotizacionList) return true;
  const handleOpenFinalizarModal = (cotizacion: CotizacionEnd) => {
    setCotizacionIdEnd(cotizacion);
    onOpen();
  };
  const handleFinalizarCotizacion = (typeEnding: CotizacionStatus) => {
    if (cotizacionEnd) {
      updateCotizacion(cotizacionEnd.id, typeEnding);
    }
    onClose();
  };

  const handleOpenCotizarForm = (idCotizacion: number) => {
    router.push(`cotizar/edit/${idCotizacion}`);
  };
  return (
    <>
      <ModalEndCotizacion
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        cotizacionEnd={cotizacionEnd}
        handleFinalizarCotizacion={handleFinalizarCotizacion}
      />

      <Table
        aria-label="Example table with dynamic content"
        className=""
        classNames={{
          base: "max-h-[520px] overflow-scroll",
          table: "min-h-[200px]",
        }}
        isCompact
        removeWrapper
      >
        <TableHeader>
          <TableColumn>Código</TableColumn>
          <TableColumn>Cliente</TableColumn>
          <TableColumn>Fecha Creación</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Precio Total</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody
          items={cotizacionList}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(cotizacion) => (
            <TableRow key={cotizacion.id}>
              <TableCell>{cotizacion.code}</TableCell>
              <TableCell>
                {cotizacion.client?.name || cotizacion.unregisteredClientName}
              </TableCell>
              <TableCell>
                <div>{getDateHour(cotizacion.date)[0]}</div>
                <div>{getDateHour(cotizacion.date)[1]}</div>
              </TableCell>
              <TableCell>
                <Chip size="sm" color={statusColors[cotizacion.status]}>
                  {statusLabels[cotizacion.status]}
                </Chip>
              </TableCell>
              <TableCell>
                {CurrencySymbol[cotizacion.currency]} {cotizacion.totalPrice}
              </TableCell>

              <TableCell>
                <DropdownAcciones
                  pdfDataCotizacion={cotizacion}
                  handleOpenCotizarForm={() =>
                    handleOpenCotizarForm(cotizacion.id)
                  }
                  handleOpenFinalizarModal={() =>
                    handleOpenFinalizarModal({
                      id: cotizacion.id,
                      name:
                        cotizacion.client?.name ||
                        cotizacion.unregisteredClientName,
                      code: cotizacion.code,
                      status: cotizacion.status,
                    })
                  }
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default CotizacionesTable;
