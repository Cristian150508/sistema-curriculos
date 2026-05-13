export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-100">
      <div className="mx-auto flex flex-col gap-3 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Sistema de Currículos. Todos os direitos reservados.</p>
        <div className="flex flex-wrap gap-4">
          <a href="/privacy" className="transition-colors hover:text-white">
            Política de Privacidade
          </a>
          <a href="/terms" className="transition-colors hover:text-white">
            Termos de Uso
          </a>
        </div>
      </div>
    </footer>
  );
}
