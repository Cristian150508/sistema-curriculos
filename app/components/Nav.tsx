'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Início" },
    { href: "/sistema/paginas/curriculos", label: "Currículos" },
    { href: "/#contato", label: "Contato" },
  ];

  const isActive = (href: string) => {
    if (href.includes("#")) {
      return false;
    }
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav>
      <ul className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-100">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`rounded-full px-3 py-2 transition-colors hover:bg-blue-600 hover:text-white ${
                isActive(link.href) ? "bg-blue-600 text-white" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
