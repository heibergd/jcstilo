"use server";
import { prisma } from "@/lib";
import { Prisma, Referido } from "@prisma/client";

export const insertReferido = async (
  referidoValues: Prisma.ReferidoCreateInput
): Promise<Referido> => {
  try {
    const existEmail = await prisma.referido.findUnique({
      where: { correo: referidoValues.correo },
    });

    if (existEmail) {
      return existEmail;
    }

    const codigo = generateCode();

    const existCode = await prisma.referido.findUnique({
      where: { codigo },
    });

    if (existCode) {
      return await insertReferido({
        ...referidoValues,
        codigo: generateCode(),
      });
    }

    const referido = await prisma.referido.create({
      data: { ...referidoValues, codigo },
    });

    return referido;
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error al insertar el referido, por favor intente nuevamente"
    );
  }
};

const generateCode = () => {
  return Math.random().toString(36).substring(2, 15);
};
