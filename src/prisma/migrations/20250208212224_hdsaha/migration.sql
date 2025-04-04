-- AlterTable
ALTER TABLE "Boleto" ADD COLUMN     "montoEnBolivares" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "montoEnDollars" TEXT NOT NULL DEFAULT '0';
