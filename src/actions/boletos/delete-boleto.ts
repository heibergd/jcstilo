"use server";
import { prisma } from "@/lib";

export const deleteBoleto = async (id: number) => {
  try {
    const boleto = await prisma.boleto.delete({
      where: { id },
    });

    return boleto;
  } catch (error) {
    console.log(error);
    throw new Error("Error al eliminar el boleto");
  }
};
