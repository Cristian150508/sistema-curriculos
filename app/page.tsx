import Link from "next/link";
import { FiChevronRight, FiLayers, FiShield, FiUserCheck } from "react-icons/fi";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";

export default function Home() {
  return (
    <div className="bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-blue-400">
              Sistema de Currículos
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Gerencie currículos com mais clareza e usabilidade.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Interface clean, responsiva e com navegação clara para cadastrar, listar e ver detalhes de candidatos.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700">Começar agora</Button>
              <Link href="/sistema/paginas/curriculos" className="inline-flex items-center justify-center rounded-full border border-blue-500 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 hover:text-white">
                Ver currículos
                <FiChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <Card className="space-y-6 border-2 border-blue-500/20 bg-white p-8 text-slate-950 shadow-xl shadow-blue-500/10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-blue-600">O que o sistema oferece</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">Prioridade em usabilidade e contraste</h2>
            </div>
            <div className="space-y-4 text-slate-700">
              <div className="rounded-3xl bg-slate-950 p-5 text-slate-100 shadow-sm shadow-blue-500/10">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white">
                    <FiLayers className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Layout clean</p>
                    <p className="mt-1 text-sm text-slate-300">Paleta azul, branco e preto com alto contraste para leitura fácil.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-950 p-5 text-slate-100 shadow-sm shadow-blue-500/10">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-500 text-white">
                    <FiUserCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Responsivo</p>
                    <p className="mt-1 text-sm text-slate-300">Componentes adaptam-se bem em mobile, tablet e desktop.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-950 p-5 text-slate-100 shadow-sm shadow-blue-500/10">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-400 text-slate-950">
                    <FiShield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Ícones funcionais</p>
                    <p className="mt-1 text-sm text-slate-300">Feedback visual e navegação mais intuitiva.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
