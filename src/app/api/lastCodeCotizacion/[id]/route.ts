import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { InitialCodeCotizacionChild } from "@/models/cotizacion";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const cotizacionId = params.id;
    const cotizacion = await prisma.lastCodeCotizacion.findFirst({
      where: {
        cotizacionId: parseInt(cotizacionId),
      },
    });

    if (!cotizacion) throw new Error("No existe cotizacion");

    const caracter = InitialCodeCotizacionChild[cotizacion.nextCode];

    return NextResponse.json(caracter, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}

export const dynamic = "force-dynamic";
