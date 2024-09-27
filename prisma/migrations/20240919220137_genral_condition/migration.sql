-- AlterTable
ALTER TABLE "Cotizacion" ADD COLUMN     "deliverPlace" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "generalCondicion" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "deliverTime" SET DEFAULT '',
ALTER COLUMN "paymentCondition" SET DEFAULT '',
ALTER COLUMN "totalPrice" SET DEFAULT 0.00;
