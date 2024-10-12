import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";

// Types
import { CotizacionFormDataPost } from "@/models/cotizacion";
import { CotizacionStatus } from "@prisma/client";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: CotizacionFormDataPost = await req.json();
    const {
      clientId,
      unregisteredClientName,
      unregisteredClientContact,
      unregisteredClientReference,
      unregisteredClientRuc,
      date,
      deliverTime,
      paymentCondition,
      deliverPlace,
      offerValidity,
      generalCondicion,
      comments,
      currency,
      totalPrice,
      isEdit,
      includeIgv,
      items,
      companyInf,
    } = body;

    //  handle code here
    const prefix = "2024-";
    let newNumber = 1; // Valor predeterminado si no hay registros
    const codeRecord = await prisma.codeCotizacion.findFirst();
    if (codeRecord) newNumber = codeRecord.nextCode + 1;
    const newCode = `${prefix}${newNumber.toString().padStart(4, "0")}`;

    let newCotizacionConditional = null;
    //create client
    const commonData = {
      date,
      deliverPlace,
      deliverTime,
      offerValidity,
      generalCondicion,
      paymentCondition,
      comments,
      currency,
      totalPrice,
      isEdit,
      includeIgv,
      companyInf,
      status: CotizacionStatus.ESTADO1,
      parentCode: newCode, //TODO: creck this if include
      code: newCode,
      clientId: clientId ? clientId : undefined,
      unregisteredClientName: clientId ? undefined : unregisteredClientName,
      unregisteredClientContact: clientId
        ? undefined
        : unregisteredClientContact,
      unregisteredClientReference: clientId
        ? undefined
        : unregisteredClientReference,
      unregisteredClientRuc: clientId ? undefined : unregisteredClientRuc,
    };

    newCotizacionConditional = await prisma.cotizacion.create({
      data: {
        ...commonData,
        cotizacionItem: {
          createMany: {
            data: items,
          },
        },
      },
    });

    if (!newCotizacionConditional) {
      throw new Error("No se pudo crear el pago");
    }

    //Despues de que se haya creado satisfactoriamente la cotizacion, crear el siguiente numero en codigo cotizacion
    if (codeRecord) {
      await prisma.codeCotizacion.update({
        where: { id: codeRecord.id },
        data: { nextCode: newNumber },
      });
    } else {
      //crear el primer registro
      await prisma.codeCotizacion.create({
        data: {
          nextCode: 1,
        },
      });
    }

    //Crear una instancia de LastCodeFhaterCotizacion para el cotizador padre
    await prisma.lastCodeCotizacion.create({
      data: {
        cotizacionId: newCotizacionConditional.id,
      },
    });

    return NextResponse.json(newCotizacionConditional, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cotizaciones = await prisma.cotizacion.findMany({
      include: {
        client: true,
      },

      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(cotizaciones, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}
