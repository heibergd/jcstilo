import axios from "axios";
import FirstActionsButtons from "./home/first-actions-buttons";
import ChooseYourNumber from "./home/numbers";
import { DolarPromedio } from "@/types/dolar-promedio";
import { getBoletos } from "@/data/boletos/get-boletos";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [boletos, { data }] = await Promise.all([
    getBoletos(),
    axios.get<DolarPromedio>("https://ve.dolarapi.com/v1/dolares/paralelo"),
  ]);
  return (
    <>
      <h1 className="header">C.J S´TILO</h1>

      <div className="banner">
        <img src="banner.jpg" alt="" className="w-full h-full object-cover" />
      </div>

      <FirstActionsButtons />

      <ChooseYourNumber dolar={data} boletos={boletos} />

      <footer>
        <div className="info mt-10">
          <h2>Información</h2>
          <div className="contact">
            <i className="fa-solid fa-location-dot"></i>
            <p>Maracay, Venezuela</p>
          </div>
          <div className="contact">
            <i className="fa-brands fa-instagram"></i>
            <p>pagos@rifajc.com</p>
          </div>
          <div className="contact">
            <i className="fa-solid fa-phone"></i>
            <a href="tel:04144593198">0414-4593198</a>
          </div>
        </div>
      </footer>
    </>
  );
}
