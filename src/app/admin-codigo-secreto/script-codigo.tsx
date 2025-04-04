"use client";
import * as React from "react";

interface IScriptCodigoSecretoProps {
  children: React.ReactNode;
}

const ScriptCodigoSecreto: React.FunctionComponent<
  IScriptCodigoSecretoProps
> = (props) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const _show = prompt("¿Cuál es el codigo secreto?");
    if (_show === "220806") {
      setShow(true);
    }
  }, []);
  return show
    ? props.children
    : "El codigo es incorrecto, no tienes acceso a esta pagina.";
};

export default ScriptCodigoSecreto;
