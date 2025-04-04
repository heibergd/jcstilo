import { prisma } from "@/lib";

export const getBoletos = async () => {
  const boletos = await prisma.boleto.findMany({
    orderBy: { id: "desc" },
  });
  return boletos;
};
