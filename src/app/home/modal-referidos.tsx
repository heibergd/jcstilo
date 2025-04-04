import * as React from "react";
import { App, Modal } from "antd";
import { insertReferido } from "@/actions/referidos/insert-referido";
interface IModalReferidosProps {}

const ModalReferidos: React.FC<IModalReferidosProps> = (props) => {
  const {} = props;
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
  });
  const { message } = App.useApp();
  const [isLoading, setIsLoading] = React.useState(false);
  const [codigo, setCodigo] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const referido = await insertReferido({
        nombrePersona: form.name,
        telefono: form.phone,
        correo: form.email,
        codigo: "",
      });
      setCodigo(referido.codigo);
      message.success(
        "Referido generado correctamente, puedes compartir el código con tus amigos. Se ha copiado el enlace al portapapeles."
      );
      handleCopy(false);
      setIsLoading(false);
    } catch (error) {
      message.error(
        (error as Error).message || "Error al insertar el referido"
      );
      setIsLoading(false);
    }
  };

  const setFormValue = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  React.useEffect(() => {
    if (codigo) {
      handleCopy();
    }
  }, [codigo]);

  const handleCopy = (_message: boolean = true) => {
    navigator.clipboard.writeText(`${window.location.origin}?codigo=${codigo}`);
    if (_message) {
      message.success("Código copiado al portapapeles");
    }
  };

  const onCancel = () => {
    setOpen(false);
    setCodigo("");
    setForm({
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <>
      <button id="refer-button" onClick={() => setOpen(true)}>
        Conviértete en referido
      </button>
      <Modal open={open} onCancel={onCancel} footer={null} width={500}>
        <div className="refer-modal-content">
          <div className="refer-modal-content-header">
            <h2 className="text-2xl font-bold text-orange-600 text-center mb-8">
              Conviértete en referido
            </h2>
          </div>
          <div className="refer-modal-content-body">
            <form onSubmit={handleSubmit}>
              <div className="refer-modal-content-body-form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => setFormValue("name", e.target.value)}
                />
              </div>
              <div className="refer-modal-content-body-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => setFormValue("email", e.target.value)}
                />
              </div>
              <div className="refer-modal-content-body-form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={(e) => setFormValue("phone", e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-orange-600 text-white px-4 py-2 rounded-md mx-auto block mt-6"
              >
                {isLoading ? "Generando..." : "Enviar"}
              </button>
            </form>
            {codigo && (
              <p className="mt-4">
                <span className="font-semibold">
                  Tu código de referido se ha generado correctamente, haz click
                  en el siguiente enlace para compartirlo:
                </span>{" "}
                <span className="text-orange-600 font-bold">
                  <button onClick={() => handleCopy(true)}>
                    {window.location.origin}?codigo={codigo}
                  </button>
                </span>
              </p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalReferidos;
