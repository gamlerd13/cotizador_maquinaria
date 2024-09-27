import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
} from "@nextui-org/react";

import { CotizacionStatus } from "@prisma/client";
import { CotizacionEnd } from "../types/main";
import { statusLabels } from "@/models/cotizacion";

interface ModalEndCotizacionProps {
  isOpen: boolean;
  onOpenChange: () => void;
  cotizacionEnd: CotizacionEnd | null;
  handleFinalizarCotizacion: (typeEnding: CotizacionStatus) => void;
}

export default function ModalEndCotizacion({
  isOpen,
  onOpenChange,
  cotizacionEnd,
  handleFinalizarCotizacion,
}: ModalEndCotizacionProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-around">
                Cambiar de estado Cotización
                <Chip color="default" variant="bordered">
                  {cotizacionEnd?.code}
                </Chip>
              </div>
            </ModalHeader>
            <ModalBody>
              <span className="text-sm">Cliente: {cotizacionEnd?.name}</span>

              <div className="flex gap-2 justify-around">
                <Button
                  className="w-[170px] max-w-[170px] text-wrap"
                  size="sm"
                  color={
                    cotizacionEnd?.status == CotizacionStatus.ESTADO1
                      ? "success"
                      : "default"
                  }
                  onClick={() =>
                    handleFinalizarCotizacion(CotizacionStatus.ESTADO1)
                  }
                >
                  <span>{statusLabels[CotizacionStatus.ESTADO1]}</span>
                </Button>
                <Button
                  size="sm"
                  className="w-[170px] max-w-[170px] text-wrap"
                  color={
                    cotizacionEnd?.status == CotizacionStatus.ESTADO2
                      ? "success"
                      : "default"
                  }
                  onClick={() =>
                    handleFinalizarCotizacion(CotizacionStatus.ESTADO2)
                  }
                >
                  <span>{statusLabels[CotizacionStatus.ESTADO2]}</span>
                </Button>
              </div>
              <div className="flex gap-2 justify-around">
                <Button
                  className="w-[170px] max-w-[170px] text-wrap"
                  size="sm"
                  color={
                    cotizacionEnd?.status == CotizacionStatus.ESTADO3
                      ? "success"
                      : "default"
                  }
                  onClick={() =>
                    handleFinalizarCotizacion(CotizacionStatus.ESTADO3)
                  }
                >
                  <span>{statusLabels[CotizacionStatus.ESTADO3]}</span>
                </Button>
                <Button
                  className="w-[170px] max-w-[170px] text-wrap"
                  size="sm"
                  color={
                    cotizacionEnd?.status == CotizacionStatus.ESTADO4
                      ? "success"
                      : "default"
                  }
                  onClick={() =>
                    handleFinalizarCotizacion(CotizacionStatus.ESTADO4)
                  }
                >
                  <span className="">
                    {" "}
                    {statusLabels[CotizacionStatus.ESTADO4]}
                  </span>
                </Button>
              </div>

              <div className="flex gap-2 justify-around">
                <Button
                  size="sm"
                  className="w-[170px] max-w-[170px] text-wrap"
                  color={
                    cotizacionEnd?.status == CotizacionStatus.ESTADO5
                      ? "success"
                      : "default"
                  }
                  onClick={() =>
                    handleFinalizarCotizacion(CotizacionStatus.ESTADO5)
                  }
                >
                  {statusLabels[CotizacionStatus.ESTADO5]}
                </Button>
                <Button
                  className="w-[170px] max-w-[170px] text-wrap"
                  size="sm"
                  color={
                    cotizacionEnd?.status == CotizacionStatus.ESTADO6
                      ? "success"
                      : "default"
                  }
                  onClick={() =>
                    handleFinalizarCotizacion(CotizacionStatus.ESTADO6)
                  }
                >
                  {statusLabels[CotizacionStatus.ESTADO6]}
                </Button>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button size="sm" color="default" onPress={onClose}>
                cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
