import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const prefix = "2024-";
    let newNumber = 1;
    const lastCode = await prisma.codeCotizacion.findFirst();
    if (lastCode) newNumber = lastCode.nextCode + 1;
    const code = `${prefix}${newNumber.toString().padStart(4, "0")}`;
    const response = NextResponse.json(code, { status: 200 });
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}
export const dynamic = "force-dynamic";
