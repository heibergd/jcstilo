"use client";
import * as React from "react";
import classNames from "classnames";
import { App, Modal } from "antd";
import { DolarPromedio } from "@/types/dolar-promedio";
import { PaymentMethods } from "@/types/payment-methods";
import ModalPayment from "./modal-payment";
import { Boleto } from "@prisma/client";

interface IChooseYourNumberProps {
  dolar: DolarPromedio;
  boletos: Boleto[];
}

const priceNumberInDollars = 10;

const ChooseYourNumber: React.FC<IChooseYourNumberProps> = (props) => {
  const { dolar, boletos } = props;
  const { message, modal } = App.useApp();
  const [paymentMethod, setPaymentMethod] =
    React.useState<PaymentMethods | null>(null);
  const [openModalPayment, setOpenModalPayment] = React.useState(false);
  const [selectedNumbers, setSelectedNumbers] = React.useState<number[]>([]);
  const [isPaying, setIsPaying] = React.useState(false);

  const handleNumberClick = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handlePayClick = () => {
    if (selectedNumbers.length === 0) {
      message.error("Debes seleccionar al menos un número");
      return;
    }
    setIsPaying(true);
  };

  const handleCancelPay = () => {
    modal.confirm({
      title: "¿Estás seguro?",
      content: "¿Estás seguro de querer eliminar los números seleccionados?",
      onOk: () => {
        setSelectedNumbers([]);
        setIsPaying(false);
        message.success("Números eliminados correctamente");
        setIsPaying(false);
      },
      onCancel: () => {
        setIsPaying(false);
      },
    });
  };

  return (
    <>
      <div id="main-container">
        <h1 className="text-center text-3xl font-bold text-orange-600 mb-4">
          ¡Escoje tu número!
        </h1>
        <p className="text-center text-sm text-gray-500 mb-4">
          La fecha de la rifa, se publicará cuándo se hayan vendido el 60% de
          los boletos
        </p>

        <div className="max-w-[500px] mx-auto mb-6">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-orange-600 h-4 rounded-full transition-all duration-300"
              style={{
                width: `${(boletos.length / 9999) * 100}%`,
              }}
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            {boletos.length} de 9999 boletos vendidos (
            {((boletos.length / 9999) * 100).toFixed(1)}%)
          </p>
        </div>

        <div className="grid-container max-w-[500px] mx-auto">
          <div
            className="grid-content w-full mx-auto gap-4"
            id="grid-container"
          >
            {Array.from({ length: 9999 }, (_, index) => {
              const isSelected = selectedNumbers.includes(index + 1);
              const isAlreadySelected = boletos.some(
                (boleto) => boleto.numero === index + 1
              );
              return (
                <div
                  key={index}
                  className={classNames(
                    "number-button hover:bg-orange-400 hover:text-white transition-all duration-300",
                    isSelected && "!bg-orange-400 !text-white",
                    isAlreadySelected && "!bg-gray-400 !text-white"
                  )}
                  onClick={() => {
                    if (isAlreadySelected) {
                      message.error("Este número ya está seleccionado");
                      return;
                    }
                    handleNumberClick(index + 1);
                  }}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button id="pay-button" onClick={handlePayClick} className="mx-auto">
        Pagar
      </button>
      <Modal
        open={isPaying}
        onCancel={handleCancelPay}
        footer={null}
        width={500}
        maskClosable={false}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-orange-600 text-center mb-2">
            Selecciona tu método de pago
          </h2>
          <h6 className="text-sm font-bold p-3 rounded-md mb-3 text-center">
            Boletos seleccionados: {selectedNumbers.length}
          </h6>
          <div
            className={classNames(
              selectedNumbers.length > 3
                ? "grid grid-cols-3 gap-4"
                : "flex items-center justify-center gap-4"
            )}
          >
            {selectedNumbers.map((number) => (
              <div
                key={number}
                className="flex items-center justify-center gap-2"
              >
                <span className="text-sm font-bold text-gray-50 bg-neutral-800 p-3 rounded-md ">
                  {number}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center flex-col justify-center gap-2">
            <span className="text-sm font-bold ">
              Total: {selectedNumbers.length * priceNumberInDollars}$
            </span>
            <span className="text-sm font-bold ">
              Total en bolívares:{" "}
              {Math.ceil(
                selectedNumbers.length *
                  priceNumberInDollars *
                  (dolar.promedio ?? 0)
              )}{" "}
              Bs.D
            </span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              className="bg-orange-400 text-white px-4 py-2 rounded-md"
              onClick={() => setPaymentMethod("pago-movil")}
            >
              Pago móvil
            </button>
            <button
              className="bg-orange-400 text-white px-4 py-2 rounded-md"
              onClick={() => setPaymentMethod("zelle")}
            >
              Zelle
            </button>
          </div>
          {paymentMethod === "pago-movil" && (
            <div className="flex justify-start flex-col gap-2">
              <h6 className="text-sm font-bold text-orange-600">
                {" "}
                Datos para Pago Móvil
              </h6>
              <p>Teléfono: 04144593198</p>
              <p>Banco: Banco de Venezuela</p>
              <p>RIF: J-410923199</p>
            </div>
          )}
          {paymentMethod === "zelle" && (
            <div className="flex justify-start flex-col gap-2">
              <h6 className="text-sm font-bold text-orange-600">
                {" "}
                Datos para Zelle
              </h6>
              <p>Email: inv.julzs@gmail.com</p>
              <p>Nombre: Carina Artigas</p>
            </div>
          )}

          {paymentMethod && (
            <div className="flex items-center justify-center gap-2">
              <button
                className="bg-orange-400 text-white px-4 py-2 rounded-md"
                onClick={() => setOpenModalPayment(true)}
              >
                Confirmar pago
              </button>
            </div>
          )}
        </div>
      </Modal>
      <ModalPayment
        open={openModalPayment}
        onCancel={() => setOpenModalPayment(false)}
        paymentMethod={paymentMethod as PaymentMethods}
        numbers={selectedNumbers}
        montoEnDollars={String(selectedNumbers.length * priceNumberInDollars)}
        montoEnBolivares={String(
          Math.ceil(
            selectedNumbers.length *
              priceNumberInDollars *
              (dolar.promedio ?? 0)
          )
        )}
      />
    </>
  );
};

export default ChooseYourNumber;
