import Link from "next/link";
import ScriptCodigoSecreto from "./script-codigo";
import TitleAdmin from "./title-admin";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-100 max-w-6xl mx-auto">
      <div className="mb-4">
        <TitleAdmin />
        <ul className="flex gap-4 items-center justify-center">
          <li>
            <Link
              href="/admin-codigo-secreto"
              className="text-blue-500 hover:text-sky-600 font-bold"
            >
              Boletos
            </Link>
          </li>
          <li>
            <Link
              href="/admin-codigo-secreto/referidos"
              className="text-blue-500 hover:text-sky-600 font-bold"
            >
              Referidos
            </Link>
          </li>
        </ul>
      </div>
      <ScriptCodigoSecreto>{children}</ScriptCodigoSecreto>
    </main>
  );
}
