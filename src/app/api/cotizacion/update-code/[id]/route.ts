import {
  InitialCodeCotizacionChild,
  CotizacionFormDataPost,
  CotizacionFormDataPut,
} from "@/models/cotizacion";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
export interface ProductItemType {
  key: number;
  description: string;
  model: string;
  amount: number;
  unitPrice: number;
  totalPrice: number;
}

interface Params {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const cotizacionId = params.id;
    const body: CotizacionFormDataPut = await req.json();
    const {
      clientId,
      unregisteredClientName,
      unregisteredClientContact,
      unregisteredClientReference,
      unregisteredClientRuc,
      date,
      parentCode,
      deliverTime,
      paymentCondition,
      deliverPlace,
      offerValidity,
      generalCondicion,
      comments,
      totalPrice,
      isEdit,
      includeIgv,
      items,
    } = body;

    //  manejar el codigo, asegurar que exista una coti. padre
    let newCodeLeter = 0;
    const codeLeter = await prisma.lastCodeCotizacion.findFirst({
      where: {
        cotizacionId: parseInt(cotizacionId),
      },
    });
    if (codeLeter) newCodeLeter = codeLeter.nextCode;
    const newCode = `${parentCode}-${InitialCodeCotizacionChild[newCodeLeter]}`; //2024-0021-A

    let newCotizacion = null;

    const commonData = {
      date,
      deliverPlace,
      deliverTime,
      offerValidity,
      generalCondicion,
      paymentCondition,
      comments,
      totalPrice,
      isEdit,
      includeIgv,
      code: newCode,
      clientId: clientId ? clientId : null,
      unregisteredClientName: clientId ? null : unregisteredClientName,
      unregisteredClientContact: clientId ? null : unregisteredClientContact,
      unregisteredClientReference: clientId
        ? null
        : unregisteredClientReference,
      unregisteredClientRuc: clientId ? null : unregisteredClientRuc,
    };

    newCotizacion = await prisma.cotizacion.update({
      where: {
        id: parseInt(cotizacionId),
      },
      data: {
        ...commonData,
        cotizacionItem: {
          deleteMany: {},
          createMany: {
            data: items,
          },
        },
      },
    });
    if (!newCotizacion) {
      throw new Error("No se pudo actualizar la cotizacion");
    }

    //Despues de haber creado satisfactoriamente la cotizacion, crear el siguiente numero en codigo cotizacion
    if (codeLeter) {
      await prisma.lastCodeCotizacion.update({
        where: {
          id: codeLeter.id,
        },
        data: {
          nextCode: codeLeter.nextCode + 1,
        },
      });
    }

    return NextResponse.json(newCotizacion, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
