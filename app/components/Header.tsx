import { FiBriefcase } from "react-icons/fi";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-lg text-white">
      <div className="mx-auto flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="grid h-12 w-12 place-items-center rounded-3xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <FiBriefcase className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-semibold text-white">Sistema de Currículos</p>
            <p className="text-sm text-slate-300">Dashboard moderno e responsivo</p>
          </div>
        </div>
        <Nav />
      </div>
    </header>
  );
}
