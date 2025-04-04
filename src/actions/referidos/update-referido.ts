"use server";
import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";

export const updateReferido = async (
  id: number,
  referidoValues: Prisma.ReferidoUpdateInput
) => {
  try {
    const referido = await prisma.referido.update({
      where: { id },
      data: referidoValues,
    });
    return referido;
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar el referido");
  }
};
