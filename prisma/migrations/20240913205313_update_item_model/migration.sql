/*
  Warnings:

  - You are about to drop the column `price` on the `Item` table. All the data in the column will be lost.
  - Added the required column `description` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "price",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL;
