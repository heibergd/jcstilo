"use client";
import * as React from "react";
import ModalPremios from "./modal-premios";
import ModalReferidos from "./modal-referidos";

interface IFirstActionsButtonsProps {}

const FirstActionsButtons: React.FC<IFirstActionsButtonsProps> = (props) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <ModalPremios />
      <ModalReferidos />
    </div>
  );
};

export default FirstActionsButtons;
