import { Modal } from "antd";
import * as React from "react";

interface IModalPremiosProps {}

const ModalPremios: React.FunctionComponent<IModalPremiosProps> = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button id="prize-button" onClick={() => setOpen(true)}>
        Premios
      </button>
      <Modal
        width={1000}
        footer={null}
        open={open}
        onCancel={() => setOpen(false)}
        title={<div className="flex justify-center">Premios</div>}
      >
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="prize-item">
            <div className="prize-item-content">
              <div className="prize-item-image flex items-center justify-center">
                <img
                  src="/primer-premio/WhatsApp Image 2025-01-08 at 3.01.40 PM.jpeg"
                  alt="C.J S´TILO"
                  className="object-cover rounded-lg shadow-md h-[300px] w-[300px] mx-auto"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-2xl font-bold text-orange-600 mb-2">
                  Primer premio{" "}
                </h3>
                <p className="text-sm text-orange-500">Local comercial</p>
                <p className="text-sm text-orange-500">+ 2000$</p>
              </div>
            </div>
          </div>
          <div className="prize-item">
            <div className="prize-item-content">
              <div className="prize-item-image flex items-center justify-center">
                <img
                  src="/primer-premio/2do.jpg"
                  alt="C.J S´TILO"
                  className="object-cover rounded-lg shadow-md h-[300px] w-[300px]"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-2xl font-bold text-orange-600 mb-2">
                  Segundo premio
                </h3>
                <div className="flex flex-col gap-1 seg-premio">
                  <a
                    href="https://beravirtual.com/producto/sbr-150cc-roja/"
                    target="blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    Moto SBR 2025
                  </a>
                  <a
                    href="https://beravirtual.com/producto/runner-150cc/"
                    target="blank"
                    rel="noopener noreferrer"
                  >
                    Moto Runner 2025
                  </a>
                  <p className="text-orange-500 text-center text-lg font-bold">
                    + 1.000$
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="prize-item">
            <div className="prize-item-content">
              <div className="prize-item-image flex items-center justify-center">
                <img
                  src="/primer-premio/3er.jpg"
                  alt="C.J S´TILO"
                  className="object-cover rounded-lg shadow-md h-[300px] w-[300px]"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-2xl font-bold text-orange-600 mb-2">
                  Tercer premio
                </h3>
                <div className="flex flex-col gap-1 seg-premio">
                  <a
                    href="https://beravirtual.com/producto/sbr-150cc-roja/"
                    target="blank"
                    rel="noopener noreferrer"
                  >
                    Moto SBR 2025
                  </a>
                </div>
                <p className="text-orange-500 text-center text-lg font-bold">
                  + 500$
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalPremios;
