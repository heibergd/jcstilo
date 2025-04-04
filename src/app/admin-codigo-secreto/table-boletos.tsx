"use client";
import { deleteBoleto } from "@/actions/boletos/delete-boleto";
import { updateBoleto } from "@/actions/boletos/update-boleto";
import { Boleto, Referido } from "@prisma/client";
import { Table, Select, Button, App, Input, Modal } from "antd";
import * as React from "react";

interface ITableBoletosProps {
  boletos: Boleto[];
  referidosWithBoletos: {
    boletos: {
      id: number;
      numero: number;
      nombrePersona: string;
      telefono: string;
      paymentMethod: string;
      montoEnDollars: string;
      montoEnBolivares: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
      referidoId: number | null;
    }[];
    referidoId: number | null;
    referido: Referido | undefined;
    _count: number;
  }[];
  boletosWithoutReferido: number;
  referidos: Referido[];
  totalVendido: {
    montoEnBolivares: number;
    montoEnDolares: number;
    boletos: number;
  };
}

const PaymentMethodsLabel = {
  "pago-movil": "Pago Movil",
  zelle: "Zelle",
};

const TableBoletos: React.FunctionComponent<ITableBoletosProps> = (props) => {
  const { boletos, referidosWithBoletos } = props;
  const { message, modal } = App.useApp();
  const [referidoTemp, setReferidoTemp] = React.useState<Referido | null>(null);
  const [boletosReferidoTemp, setBoletosReferidoTemp] = React.useState<
    Boleto[]
  >([]);
  const [boletosState, setBoletosState] = React.useState<Boleto[]>(boletos);
  const columns = [
    {
      title: "Numero",

      dataIndex: "numero",
    },
    {
      title: "Nombre",
      dataIndex: "nombrePersona",
    },
    {
      title: "Telefono",
      dataIndex: "telefono",
    },
    {
      title: "Metodo de pago",
      dataIndex: "methodPaymentFormatted",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Monto en dolares",
      dataIndex: "montoEnDollarsFormatted",
    },
    {
      title: "Monto en bolivares",
      dataIndex: "montoEnBolivaresFormatted",
    },

    {
      title: "Acciones",
      dataIndex: "actions",
    },
  ];

  const handleChangeStatus = async (status: string, id: number) => {
    try {
      await updateBoleto(id, { status });
      message.success("Status actualizado correctamente");
      setBoletosState(
        boletosState.map((boleto) => {
          if (boleto.id === id) {
            return { ...boleto, status };
          }
          return boleto;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    modal.confirm({
      title: "¿Estás seguro?",
      content: "¿Estás seguro de querer eliminar el boleto?",
      onOk: async () => {
        try {
          await deleteBoleto(id);
          message.success("Boleto eliminado correctamente");
          setBoletosState(boletosState.filter((boleto) => boleto.id !== id));
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  React.useEffect(() => {
    setBoletosState(boletos);
  }, [boletos]);

  const newDataSource = boletosState.map((boleto) => ({
    ...boleto,

    status: (
      <Select
        options={[
          { value: "pending", label: "Pendiente" },

          { value: "paid", label: "Pagado" },
        ]}
        onChange={(value) => handleChangeStatus(value, boleto.id)}
        defaultValue={boleto.status}
        value={boleto.status}
        className="w-32"
      />
    ),
    actions:
      boleto.status === "pending" ? (
        <Button type="primary" danger onClick={() => handleDelete(boleto.id)}>
          Eliminar
        </Button>
      ) : null,
    montoEnDollarsFormatted: <span>{boleto.montoEnDollars} $</span>,
    montoEnBolivaresFormatted: <span>{boleto.montoEnBolivares} Bs</span>,
    methodPaymentFormatted: (
      <span>
        {
          PaymentMethodsLabel[
            boleto.paymentMethod as keyof typeof PaymentMethodsLabel
          ]
        }
      </span>
    ),
  }));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      // search by name phone and number
      setBoletosState(
        boletosState.filter(
          (boleto) =>
            boleto.nombrePersona.toLowerCase().includes(value.toLowerCase()) ||
            boleto.telefono.toLowerCase().includes(value.toLowerCase()) ||
            boleto.numero.toString().includes(value)
        )
      );
    } else {
      setBoletosState(boletos);
    }
  };

  const columnsReferidos = [
    {
      title: "Nombre",
      dataIndex: "nombrePersona",
    },
    {
      title: "Telefono",
      dataIndex: "telefono",
    },
    {
      title: "Correo",
      dataIndex: "correo",
    },
    {
      title: "Boletos vendidos",
      dataIndex: "countFormatted",
    },
  ];

  const dataSourceReferidos = referidosWithBoletos.map((data) => ({
    ...data,
    nombrePersona: data.referido?.nombrePersona,
    telefono: data.referido?.telefono,
    correo: data.referido?.correo,
    countFormatted: (
      <span
        className="hover:text-sky-500 transtion duration-300 cursor-pointer"
        onClick={() => {
          setReferidoTemp(data.referido as Referido);
          setBoletosReferidoTemp(data.boletos);
        }}
      >
        {data._count} boletos vendidos
      </span>
    ),
  }));

  return (
    <>
      <Input
        placeholder="Buscar"
        className="mb-4"
        onChange={(e) => handleSearch(e)}
      />
      <Table
        dataSource={newDataSource}
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
        rowKey={(record) => record.id}
        onChange={(pagination, filters, sorter, extra) => {
          console.log({ pagination, filters, sorter, extra });
        }}
      />
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">
          Referidos con más boletos vendidos
        </h2>
        <Table
          dataSource={dataSourceReferidos}
          columns={columnsReferidos}
          rowKey={(record) => record.referidoId as number}
        />
      </div>

      <Modal
        open={!!referidoTemp}
        onCancel={() => setReferidoTemp(null)}
        footer={null}
      >
        <div className="mb-4">
          <h2 className="font-semibold text-2xl text-center mb-4">
            Referido: {referidoTemp?.nombrePersona}
          </h2>
          <p className="text-center text-gray-500">{referidoTemp?.correo}</p>
          <p className="text-center text-gray-500">{referidoTemp?.telefono}</p>
        </div>
        <div className="col-span-4 text-center">
          <p className="text-2xl text-center font-semibold">
            Boletos vendidos como referido
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {boletosReferidoTemp.map((boleto) => (
            <div
              key={boleto.id}
              className="text-center border border-gray-300 rounded-md p-2 bg-neutral-800 text-white max-w-24 mx-auto"
            >
              <p>{boleto.numero}</p>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default TableBoletos;
