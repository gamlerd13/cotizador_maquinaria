import axios from "axios";
import { CotizacionClientItemsGet } from "@/models/cotizacion";
import { toast } from "sonner";

export const getCotizacionById = () => {
  const getCotizaciones = async (
    idCotizacion: number
  ): Promise<CotizacionClientItemsGet | null> => {
    try {
      const response = await axios.get(`/api/cotizacion/${idCotizacion}`);

      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      toast.error("Error al generar pdf");
      return null;
    }
  };

  return {
    getCotizaciones,
  };
};
