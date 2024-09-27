-- CreateEnum
CREATE TYPE "CotizacionStatus" AS ENUM ('ESTADO1', 'ESTADO2', 'ESTADO3', 'ESTADO4', 'ESTADO5', 'ESTADO6');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotizacion" (
    "id" SERIAL NOT NULL,
    "status" "CotizacionStatus" NOT NULL DEFAULT 'ESTADO1',
    "code" TEXT NOT NULL,
    "parentCode" TEXT NOT NULL,
    "clientId" INTEGER,
    "clientName" TEXT NOT NULL,
    "clientContact" TEXT NOT NULL,
    "clientRuc" TEXT NOT NULL,
    "clientReference" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "deliverTime" TEXT NOT NULL,
    "paymentCondition" TEXT NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "items" JSONB NOT NULL,
    "isEdit" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Cotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LastCodeCotizacion" (
    "id" SERIAL NOT NULL,
    "cotizacionId" INTEGER NOT NULL,
    "nextCode" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LastCodeCotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeCotizacion" (
    "id" SERIAL NOT NULL,
    "nextCode" INTEGER NOT NULL,

    CONSTRAINT "CodeCotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
