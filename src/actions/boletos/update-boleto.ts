"use server";
import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";

export const updateBoleto = async (
  id: number,
  boletoValues: Prisma.BoletoUpdateInput
) => {
  try {
    const boleto = await prisma.boleto.update({
      where: { id },
      data: {
        status: boletoValues.status,
        nombrePersona: boletoValues.nombrePersona,
        telefono: boletoValues.telefono,
        paymentMethod: boletoValues.paymentMethod,
        numero: boletoValues.numero,
        montoEnDollars: boletoValues.montoEnDollars,
        montoEnBolivares: boletoValues.montoEnBolivares,
      },
    });
    return boleto;
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar el boleto");
  }
};
