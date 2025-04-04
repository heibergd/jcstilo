"use server";
import { prisma } from "@/lib";

export const deleteReferido = async (id: number) => {
  try {
    const referido = await prisma.referido.delete({
      where: { id },
    });

    return referido;
  } catch (error) {
    console.log(error);
    throw new Error("Error al eliminar el referido");
  }
};
