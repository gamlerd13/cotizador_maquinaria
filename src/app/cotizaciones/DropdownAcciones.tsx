import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FaEdit, FaFilePdf } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { CotizacionClientGet } from "@/models/cotizacion";
import ReactPdfComponentV2 from "@/components/cotizacion/React-pdf-v2";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { getCotizacionById } from "../hooks/cotizacion/getCotizacionById";

export function DropdownAcciones({
  pdfDataCotizacion,
  handleOpenCotizarForm,
  handleOpenFinalizarModal,
}: {
  pdfDataCotizacion: CotizacionClientGet;
  handleOpenCotizarForm: () => void;
  handleOpenFinalizarModal: () => void;
}) {
  const { getCotizaciones } = getCotizacionById();

  const handleDownloadCotizacionPdf = async () => {
    const pdfData = await getCotizaciones(pdfDataCotizacion.id);
    if (pdfData) {
      const blob = await pdf(
        <ReactPdfComponentV2 cotizacion={pdfData} />
      ).toBlob();
      saveAs(blob, `cotizacion-${pdfDataCotizacion.code}.pdf`);
    }
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Opciones</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="export"
          onClick={() => handleDownloadCotizacionPdf()}
          startContent={<FaFilePdf />}
        >
          Exportar Pdf
        </DropdownItem>

        <DropdownItem
          key="edit"
          startContent={<FaEdit />}
          onClick={handleOpenCotizarForm}
        >
          Editar
        </DropdownItem>
        <DropdownItem
          key="changeStatus"
          color="default"
          startContent={<CiSettings />}
          onClick={handleOpenFinalizarModal}
        >
          Cambiar estado
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
