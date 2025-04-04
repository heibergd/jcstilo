"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
interface ITitleAdminProps {}

const TitleAdmin: React.FunctionComponent<ITitleAdminProps> = (props) => {
  const {} = props;
  const pathname = usePathname();
  const title = pathname.split("/").pop();

  const titleMap = {
    "admin-codigo-secreto": "Boletos",
    referidos: "Referidos",
  };

  return <h1>{titleMap[title as keyof typeof titleMap]}</h1>;
};

export default TitleAdmin;
