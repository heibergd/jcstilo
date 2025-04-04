import * as React from "react";
import TableReferidos from "./table-referidos";
import { getReferidos } from "@/data/referidos/get-referidos";
interface IReferidosPageProps {}

const ReferidosPage: React.FunctionComponent<IReferidosPageProps> = async (
  props
) => {
  const {} = props;
  const referidos = await getReferidos();
  return (
    <div>
      <TableReferidos referidos={referidos} />
    </div>
  );
};

export default ReferidosPage;
