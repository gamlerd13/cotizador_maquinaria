/*
  Warnings:

  - You are about to drop the column `clientContact` on the `Cotizacion` table. All the data in the column will be lost.
  - You are about to drop the column `clientName` on the `Cotizacion` table. All the data in the column will be lost.
  - You are about to drop the column `clientReference` on the `Cotizacion` table. All the data in the column will be lost.
  - You are about to drop the column `clientRuc` on the `Cotizacion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cotizacion" DROP COLUMN "clientContact",
DROP COLUMN "clientName",
DROP COLUMN "clientReference",
DROP COLUMN "clientRuc";
