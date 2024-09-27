"use client";
import {
  CotizacionClientGet,
  CotizacionClientItemsGet,
  CotizacionFormDataPost,
  statusLabels,
} from "@/models/cotizacion";
import axios from "axios";
import { useEffect, useState } from "react";
import { CotizacionStatus } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const usePostCotizacion = () => {
  const router = useRouter();
  const [responseNewCotizacion, setResponseNewCotizacion] = useState<
    string | null
  >(null);
  const addNewCotizacion = async (
    formDataNewCotizacion: CotizacionFormDataPost
  ) => {
    try {
      console.log(formDataNewCotizacion);
      const response = await axios.post(
        "api/cotizacion/",
        formDataNewCotizacion

        // JSON.stringify(formDataEntries)
      );
      if (response.status == 201) {
        toast.success("Se creó una cotizacion exitosamente");
        setResponseNewCotizacion(response.data);
        router.push("/cotizaciones");
      }
    } catch (error) {
      console.error("Hubo un error en useClient, getClient");
    }
  };

  return {
    responseNewCotizacion,
    addNewCotizacion,
  };
};

export const usePutCotizacion = () => {
  const router = useRouter();
  const [responseNewCotizacion, setResponseNewCotizacion] = useState<
    string | null
  >(null);
  const updateCotizacion = async (
    idCotizacion: number,
    formDataNewCotizacion: CotizacionFormDataPost
  ) => {
    try {
      const response = await axios.put(
        `/api/cotizacion/update-code/${idCotizacion}`,
        formDataNewCotizacion
      );
      if (response.status == 201) {
        toast.success("Se actualizó una cotizacion exitosamente");
        setResponseNewCotizacion(response.data);
        router.push("/cotizaciones");
      }
    } catch (error) {
      console.error("Hubo un error");
    }
  };

  return {
    responseNewCotizacion,
    updateCotizacion,
  };
};

export const useGetUpdateCotizacion = () => {
  const [cotizacionList, setCotizacionList] = useState<
    CotizacionClientGet[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCotizaciones = async () => {
    try {
      const response = await axios.get("api/cotizacion");

      if (response.status == 200) {
        setCotizacionList(response.data);
      }
    } catch (error) {
      console.error("Hubo un error en useGetUpdateCotizacion, getCotizaciones");
    } finally {
      setIsLoading(false);
    }
  };

  const updateCotizacion = async (
    cotizacionId: number,
    typeEnding: CotizacionStatus
  ) => {
    try {
      console.log("este es el cotizacion estatus", typeEnding);

      const response = await axios.put(
        `/api/cotizacion/update-status/${cotizacionId}`,
        JSON.stringify(typeEnding)
      );
      console.log("respueste de la api: ", response);
      if (response.status == 201) {
        toast.success(
          `Se actualizó el estado de la cotización ${statusLabels[typeEnding]}`
        );
        getCotizaciones();
      }
    } catch (error) {
      console.error("Hubo un error en updateCotizacion, updateCotizacion");
    }
  };

  useEffect(() => {
    getCotizaciones();
  }, []);

  return {
    cotizacionList,
    isLoading,
    updateCotizacion,
  };
};

export const useGetCotizacionById = () => {
  const [cotizacionList, setCotizacionList] =
    useState<CotizacionClientItemsGet | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCotizaciones = async (idCotizacion: number) => {
    try {
      const response = await axios.get(`/api/cotizacion/${idCotizacion}`);

      if (response.status == 200) {
        setCotizacionList(response.data);
      }
    } catch (error) {
      console.error("Hubo un error en useGetUpdateCotizacion, getCotizaciones");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cotizacionList,
    getCotizaciones,
    isLoading,
  };
};
