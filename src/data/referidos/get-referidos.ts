import { prisma } from "@/lib";

export const getReferidos = async () => {
  const referidos = await prisma.referido.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return referidos;
};
