import prisma from "@/libs/db";
import { ItemPost } from "@/models/items";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // get all items(products)
    const items = await prisma.item.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: ItemPost = await req.json();

    const item = await prisma.item.create({
      data: body,
    });

    if (!item) throw new Error("No se pudo crear el registro");

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}
