import prisma from "@/libs/db";
import { ItemPost } from "@/models/items";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // get all items(products)
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("code_or_name") || "";

    const items = await prisma.item.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } }, // Búsqueda por nombre
          { code: { contains: query, mode: "insensitive" } }, // Búsqueda por descripción
        ],
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
