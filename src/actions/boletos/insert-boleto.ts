"use server";
import { prisma } from "@/lib";
import { Prisma, Referido } from "@prisma/client";

export const insertBoleto = async (
  boletoValues: Prisma.BoletoCreateInput & { codigo?: string }
) => {
  try {
    let referido: Referido | null = null;
    if (boletoValues.codigo) {
      referido = await prisma.referido.findUnique({
        where: { codigo: boletoValues.codigo },
      });
    }
    const boleto = await prisma.boleto.create({
      data: {
        numero: boletoValues.numero,
        nombrePersona: boletoValues.nombrePersona,
        paymentMethod: boletoValues.paymentMethod,
        telefono: boletoValues.telefono,
        montoEnDollars: boletoValues.montoEnDollars,
        montoEnBolivares: boletoValues.montoEnBolivares,
        ...(referido && {
          referido: {
            connect: {
              id: referido.id,
            },
          },
        }),
      },
    });
    return boleto;
  } catch (error) {
    console.log(error);
    throw new Error("Error al insertar el boleto");
  }
};
