import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const cotizacionId = params.id;
    const cotizacion = await prisma.cotizacion.findFirst({
      where: {
        id: parseInt(cotizacionId),
      },
      include: {
        client: true,
        cotizacionItem: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!cotizacion) throw new Error("No existe cotizacion");

    return NextResponse.json(cotizacion, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}
