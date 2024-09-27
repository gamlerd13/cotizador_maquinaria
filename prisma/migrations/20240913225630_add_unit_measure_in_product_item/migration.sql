/*
  Warnings:

  - Added the required column `weight` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UnitOfMeasure" AS ENUM ('KILOGRAM', 'GRAM', 'LITER', 'MILLILITER', 'METER', 'CENTIMETER', 'BOX');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "brand" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "comment" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "manufactureCode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "unitMeasure" "UnitOfMeasure" NOT NULL DEFAULT 'KILOGRAM',
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "description" SET DEFAULT '';
