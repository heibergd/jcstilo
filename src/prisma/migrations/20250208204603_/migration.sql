/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `Boleto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Boleto_numero_key" ON "Boleto"("numero");
