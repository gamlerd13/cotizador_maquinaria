import prisma from "@/libs/db";
import { ParamsIdAPI } from "@/models/common";
import { ItemPost } from "@/models/items";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: ParamsIdAPI) {
  try {
    const item = await prisma.item.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!item) throw new Error("No se pudo encontrar registro");

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(req: NextRequest, { params }: ParamsIdAPI) {
  try {
    const body: ItemPost = await req.json();

    const item = await prisma.item.update({
      where: {
        id: parseInt(params.id),
      },
      data: body,
    });

    if (!item) throw new Error("No se pudo actualizar registro");

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsIdAPI) {
  try {
    const item = await prisma.item.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!item) throw new Error("No se pudo eliminar registro");

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
