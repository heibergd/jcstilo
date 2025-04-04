import { insertBoleto } from "@/actions/boletos/insert-boleto";
import { PaymentMethods } from "@/types/payment-methods";
import { App, Input, Modal, ModalProps } from "antd";
import classNames from "classnames";
import * as React from "react";

interface IModalPaymentProps extends ModalProps {
  paymentMethod: PaymentMethods;
  numbers: number[];
  onCancel: (e?: any) => void;
  montoEnDollars: string;
  montoEnBolivares: string;
}

const ModalPayment: React.FunctionComponent<IModalPaymentProps> = (props) => {
  const {
    open,
    onCancel,
    numbers,
    paymentMethod,
    montoEnDollars,
    montoEnBolivares,
  } = props;
  const { message } = App.useApp();
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (form.name === "" || form.phone === "") {
      message.error("Debes llenar todos los campos");
      setIsLoading(false);
      return;
    }
    try {
      let codigo: string | undefined = undefined;

      const params = new URLSearchParams(window.location.search);
      if (params.has("codigo")) {
        codigo = params.get("codigo") ?? undefined;
      }

      await Promise.all(
        numbers.map((number) =>
          insertBoleto({
            numero: number,
            nombrePersona: form.name,
            telefono: form.phone,
            paymentMethod: paymentMethod,
            montoEnDollars,
            montoEnBolivares,
            codigo,
          })
        )
      );

      message.success("Boletos comprados correctamente");
      onCancel?.();
      window.open("https://wa.me/584144593198", "_blank");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
      message.error("Error al comprar boletos");
    } finally {
      setIsLoading(false);
    }
  };

  const setFormValue = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <Modal
      footer={null}
      open={open}
      width={400}
      onCancel={(e) => {
        onCancel?.(e);
        setForm({
          name: "",
          phone: "",
        });
      }}
      maskClosable={false}
    >
      <header className="flex justify-center items-center mb-4">
        <h1 className="text-2xl font-bold text-black text-center">
          Ingrese sus datos
        </h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-sm font-bold text-black">
            Nombre Completo
          </label>
          <Input
            value={form.name}
            onChange={(e) => setFormValue("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-sm font-bold text-black">Teléfono</label>
          <Input
            value={form.phone}
            onChange={(e) => setFormValue("phone", e.target.value)}
          />
        </div>

        <p className="text-sm text-gray-500 mb-4 font-semibold text-center">
          Una vez que hagas el pago, envianos el comprobante del pago vía
          Whatsapp, <br /> ¡Muchas gracias por su participación!
        </p>

        <button
          type="submit"
          disabled={isLoading}
          className={classNames(
            "bg-teal-600 text-white px-4 py-2 rounded-md mx-auto block mt-6 w-full text-center hover:bg-teal-700 transition-colors duration-300 cursor-pointer hover:text-white",
            {
              "opacity-50 cursor-not-allowed": isLoading,
            }
          )}
        >
          {isLoading
            ? "Procesando..."
            : "Confirmar pago, y enviar comprobante a WhatsApp"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalPayment;
