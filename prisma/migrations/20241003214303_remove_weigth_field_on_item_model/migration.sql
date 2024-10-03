/*
  Warnings:

  - You are about to drop the column `weight` on the `Item` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Item_code_key";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "weight",
ALTER COLUMN "code" SET DEFAULT '';
