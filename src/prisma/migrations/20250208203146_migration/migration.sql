-- CreateTable
CREATE TABLE "Boleto" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "nombrePersona" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Boleto_pkey" PRIMARY KEY ("id")
);
