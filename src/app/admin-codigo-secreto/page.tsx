import * as React from "react";
import { getBoletos } from "@/data/boletos/get-boletos";
import TableBoletos from "./table-boletos";
import { getReferidosGroupBoletos } from "@/data/referidos/get-referidos-group-boletos";
import { getReferidos } from "@/data/referidos/get-referidos";
interface IAdminProps {
  params: Promise<{
    code: string;
  }>;
}

const Admin: React.FunctionComponent<IAdminProps> = async (props) => {
  const { params } = props;
  const _params = await params;

  const [boletos, groupBoletosReferidos, referidos] = await Promise.all([
    getBoletos(),
    getReferidosGroupBoletos(),
    getReferidos(),
  ]);

  const referidosWithBoletos = groupBoletosReferidos
    .map((referido) => ({
      ...referido,
      boletos: boletos.filter(
        (boleto) => boleto.referidoId === referido.referidoId
      ),
      referido: referidos.find(
        (_referido) => _referido.id === referido.referidoId
      ),
    }))
    .filter((boleto) => boleto.referidoId);

  const boletosWithoutReferido = groupBoletosReferidos
    .filter(({ referidoId }) => {
      return !referidoId;
    })
    .map(({ _count }) => _count)[0];

  const totalVendido = boletos.reduce(
    (acc, boleto) => {
      return {
        montoEnBolivares:
          acc.montoEnBolivares + Number(boleto.montoEnBolivares),
        montoEnDolares: acc.montoEnDolares + Number(boleto.montoEnDollars),
        boletos: acc.boletos + 1,
      };
    },
    {
      montoEnBolivares: 0,
      montoEnDolares: 0,
      boletos: 0,
    }
  );

  return (
    <div>
      <div>
        <TableBoletos
          boletos={boletos}
          referidosWithBoletos={referidosWithBoletos}
          boletosWithoutReferido={boletosWithoutReferido}
          referidos={referidos}
          totalVendido={totalVendido}
        />
      </div>
    </div>
  );
};

export default Admin;
