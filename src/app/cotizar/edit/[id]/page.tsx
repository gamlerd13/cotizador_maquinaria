"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useCotizacion } from "./hooks/useCotizacion";
import CotizarFormV2 from "./formCotizacion/CotizarFormV2";

function Page() {
  const { id }: { id: string } = useParams();
  const { cotizacion } = useCotizacion(id);

  return (
    <div className="h-screen flex flex-col justify-between">
      <div>
        <NavBar />
        <div className="w-full flex justify-center">
          <div className="p-4 sm:w-9/12">
            {cotizacion && <CotizarFormV2 cotizacion={cotizacion} />}
          </div>
        </div>
      </div>
      <div className="bg-slate-200">
        <hr className="border-1 " />
        <Footer />
      </div>
    </div>
  );
}

export default Page;
