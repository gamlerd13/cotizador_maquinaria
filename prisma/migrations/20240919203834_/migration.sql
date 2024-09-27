/*
  Warnings:

  - You are about to drop the column `items` on the `Cotizacion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cotizacion" DROP COLUMN "items",
ADD COLUMN     "includeIgv" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "CotizacionItem" (
    "id" SERIAL NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "itemId" INTEGER NOT NULL,
    "cotizacionId" INTEGER NOT NULL,

    CONSTRAINT "CotizacionItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CotizacionItem_itemId_cotizacionId_key" ON "CotizacionItem"("itemId", "cotizacionId");

-- AddForeignKey
ALTER TABLE "CotizacionItem" ADD CONSTRAINT "CotizacionItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CotizacionItem" ADD CONSTRAINT "CotizacionItem_cotizacionId_fkey" FOREIGN KEY ("cotizacionId") REFERENCES "Cotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
