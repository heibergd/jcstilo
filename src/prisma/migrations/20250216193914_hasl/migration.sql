-- AlterTable
ALTER TABLE "Boleto" ADD COLUMN     "referidoId" INTEGER;

-- CreateTable
CREATE TABLE "Referido" (
    "id" SERIAL NOT NULL,
    "nombrePersona" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Referido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Referido_codigo_key" ON "Referido"("codigo");

-- AddForeignKey
ALTER TABLE "Boleto" ADD CONSTRAINT "Boleto_referidoId_fkey" FOREIGN KEY ("referidoId") REFERENCES "Referido"("id") ON DELETE SET NULL ON UPDATE CASCADE;
