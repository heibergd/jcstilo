"use client";

import { Referido } from "@prisma/client";
import { App, Table } from "antd";

import * as React from "react";

interface ITableReferidosProps {
  referidos: Referido[];
}

const TableReferidos: React.FunctionComponent<ITableReferidosProps> = (
  props
) => {
  const { referidos } = props;
  const { message } = App.useApp();

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombrePersona",
    },
    {
      title: "Correo",
      dataIndex: "correo",
    },
    {
      title: "Telefono",
      dataIndex: "telefono",
    },
    {
      title: "Codigo Referido",
      dataIndex: "codigoLink",
    },
  ];

  return (
    <Table
      dataSource={referidos.map((referido) => ({
        ...referido,
        codigoLink: (
          <a
            className="cursor-pointer"
            target="_blank"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(
                `${window.location.origin}?codigo=${referido.codigo}`
              );
              message.success("Codigo copiado al portapapeles");
            }}
            href={"#"}
          >
            {referido.codigo}
          </a>
        ),
      }))}
      columns={columns}
    />
  );
};

export default TableReferidos;
