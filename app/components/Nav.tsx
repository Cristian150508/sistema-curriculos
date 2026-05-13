export default function Nav() {
  const links = [
    { href: "#home", label: "Início" },
    { href: "#vagas", label: "Vagas" },
    { href: "#contato", label: "Contato" },
    { href: "/sistema/paginas/curriculos", label: "Currículos" },
  ];

  return (
    <nav>
      <ul className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-100">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="rounded-full px-3 py-2 transition-colors hover:bg-blue-600 hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
