import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { CotizacionStatus } from "@prisma/client";

interface Params {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const typeEnding: CotizacionStatus = await req.json();

    const cotizacionUpdated = await prisma.cotizacion.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        status: typeEnding,
      },
    });

    return NextResponse.json(cotizacionUpdated, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
