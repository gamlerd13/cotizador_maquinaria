/*
  Warnings:

  - You are about to drop the column `comment` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `manufactureCode` on the `Item` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('SOLES', 'DOLARES');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DISCONTINUED');

-- AlterTable
ALTER TABLE "Cotizacion" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'SOLES';

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "comment",
DROP COLUMN "manufactureCode",
ADD COLUMN     "partNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'ACTIVE';
