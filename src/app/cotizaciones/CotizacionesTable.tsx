import { getDateHour } from "@/lib/main";
import { CotizacionGet, statusLabels } from "@/models/cotizacion";
import { FaFilePdf } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";
import { CotizacionStatus } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  Chip,
} from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import ReactPdfComponent from "@/components/cotizacion/React-pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

interface CotizacionesTable {
  cotizacionList: CotizacionGet[] | null;
  isLoading: boolean;
  updateCotizacion: (
    cotizacionId: number,
    typeEnding: CotizacionStatus
  ) => void;
}
interface CotizacionEnd {
  id: number;
  name: string;
  code: string;
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

  const handleOpenCotizarForm = () => {
    router.push("/cotizar");
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex justify-around">
                  Finalizar Cotización
                  <Chip color="success">{cotizacionEnd?.code}</Chip>
                </div>
              </ModalHeader>
              <ModalBody>¿Está seguro de finalizar cotización?</ModalBody>
              <ModalFooter>
                <Button
                  size="sm"
                  color="success"
                  onClick={() =>
                    handleFinalizarCotizacion(CotizacionStatus.ACCEPTED)
                  }
                >
                  Finalizar aceptado
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() =>
                    handleFinalizarCotizacion(CotizacionStatus.REJECTED)
                  }
                >
                  Finalizar rechazado
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Table
        aria-label="Example table with client side sorting"
        //   sortDescriptor={list.sortDescriptor}
        //   onSortChange={list.sort}
        classNames={{
          table: "min-h-[300px]",
        }}
      >
        <TableHeader>
          <TableColumn>Código</TableColumn>
          <TableColumn>Cliente</TableColumn>
          <TableColumn>Fecha Creación</TableColumn>
          <TableColumn>Estado</TableColumn>
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
              <TableCell>{cotizacion.client?.name || "Sin cliente"}</TableCell>
              <TableCell>
                <div>{getDateHour(cotizacion.date)[0]}</div>
                <div>{getDateHour(cotizacion.date)[1]}</div>
              </TableCell>
              <TableCell>
                <Chip
                  size="sm"
                  color={
                    cotizacion.status === CotizacionStatus.SENT
                      ? "warning"
                      : cotizacion.status === CotizacionStatus.ACCEPTED
                      ? "success"
                      : cotizacion.status === CotizacionStatus.REJECTED
                      ? "danger"
                      : "default"
                  }
                >
                  {statusLabels[cotizacion.status]}
                </Chip>
              </TableCell>

              <TableCell>
                <div className="flex gap-2">
                  <span className="flex items-center justify-center text-2xl w-8  text-red-950 cursor-pointer rounded-full">
                    <PDFDownloadLink
                      document={<ReactPdfComponent cotizacion={cotizacion} />}
                      fileName={`cotizacion-${cotizacion.code}.pdf`}
                    >
                      <FaFilePdf />
                    </PDFDownloadLink>
                  </span>
                  <span
                    onClick={() => handleOpenCotizarForm()}
                    className="flex items-center justify-center text-2xl w-8 text-red-950 cursor-pointer rounded-full"
                  >
                    <GoPlusCircle />
                  </span>
                  <Button
                    size="sm"
                    type="button"
                    onPress={() =>
                      handleOpenFinalizarModal({
                        id: cotizacion.id,
                        name: cotizacion.client?.name || "Sin cliente",
                        code: cotizacion.code,
                      })
                    }
                  >
                    Finalizar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default CotizacionesTable;
