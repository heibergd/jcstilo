/*
  Warnings:

  - A unique constraint covering the columns `[correo]` on the table `Referido` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Referido_correo_key" ON "Referido"("correo");
