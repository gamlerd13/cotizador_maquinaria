import { generatePdf } from "@/components/cotizacion/getHtml";
import { Cotizacion, ProductItemPost } from "@/models/cotizacion";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { CotizacionStatus } from "@prisma/client";
export interface ProductItemType {
  key: number;
  description: string;
  model: string;
  amount: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PdfCotizacion {
  id: number; //por si hay que cotizar desde backend
  code: string;
  clientName: string;
  clientReference: string;
  clientContact: string;
  date: string;
  items: ProductItemType[];
  deliverTime: string;
  paymentCondition: string;
  totalPrice: number;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: Cotizacion = await req.json();
    console.log(body);
    const {
      client,
      clientName,
      clientContact,
      clientRuc,
      clientReference,
      date,
      deliverTime,
      paymentCondition,
      totalPrice,
      ...resto //son los items que hay que tiene,estos son dinamicos
    } = body;

    const items: ProductItemType[] = Object.keys(resto)
      .filter((key) => key.match(/^\d+_id$/))
      .map((key) => {
        const id = key.split("_")[0];
        return {
          key: parseInt(resto[`${id}_id`], 10),
          description: resto[`${id}_description`],
          model: resto[`${id}_model`],
          amount: parseInt(resto[`${id}_amount`], 10),
          unitPrice: parseFloat(resto[`${id}_unitprice`]),
          totalPrice: parseFloat(resto[`${id}_totalprice`]),
        };
      });

    //  manejar el codigo aca
    const prefix = "2024-";
    let newNumber = 1; // Valor predeterminado si no hay registros
    const codeRecord = await prisma.codeCotizacion.findFirst();
    if (codeRecord) newNumber = codeRecord.nextCode + 1;
    const newCode = `${prefix}${newNumber.toString().padStart(4, "0")}`;

    const dateString = date === "" ? new Date() : new Date(date);

    const data = {
      status: CotizacionStatus.SENT,
      code: newCode,
      clientName: clientName.trim(),
      clientContact: clientContact.trim(),
      clientRuc: clientRuc.trim(),
      clientReference: clientReference.trim(),
      date: dateString,
      deliverTime: deliverTime,
      paymentCondition: paymentCondition,
      totalPrice: totalPrice,
      items: items,
    };

    //create client
    if (client == "") {
      if (clientName.trim() != "")
        data.client = {
          create: {
            name: clientName.trim(),
            contact: clientContact.trim(),
            ruc: clientRuc.trim(),
            reference: clientReference.trim(),
            createAt: new Date(),
          },
        };
      data.clientName = "";
      data.clientContact = "";
      data.clientRuc = "";
      data.clientReference = "";
    } else {
      if (typeof parseInt(client) == "number") data.clientId = parseInt(client);
    }

    console.log(items);

    // Guardar en base  de datos
    const newCotizacion = await prisma.cotizacion.create({
      data,
    });
    // const newCotizacion = "asdf";
    // return NextResponse.json(data, { status: 201 });

    // const pdf = await generatePdf({ number: "sdf", description: "sdf" });
    // console.log(pdf);

    // // Devolver el PDF
    // const pdfBuffer = pdf;

    // // Configurar las cabeceras para la respuesta PDF
    // const headers = new Headers({
    //   "Content-Type": "application/pdf",
    //   "Content-Disposition": 'attachment; filename="invoice.pdf"',
    // });

    // // Devolver el buffer como respuesta
    // return new NextResponse(pdfBuffer, {
    //   headers,
    // });

    // const newCotizacion = await prisma.cotizacion.create({
    //   data: {
    //     alumnoId,
    //     paymentConceptId,
    //     paymentMethod,
    //     total,
    //   },
    // });
    if (!newCotizacion) {
      console.log("va  a haber un error");
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

    return NextResponse.json(newCotizacion, { status: 201 });
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
