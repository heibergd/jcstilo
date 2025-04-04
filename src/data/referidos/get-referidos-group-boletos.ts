import { prisma } from "@/lib";

export const getReferidosGroupBoletos = async () => {
  // Obtener los boletos agrupados por referido
  const boletos = await prisma.boleto.groupBy({
    by: ["referidoId"],
    _count: true,
  });

  return boletos.sort((a, b) => b._count - a._count);
};
