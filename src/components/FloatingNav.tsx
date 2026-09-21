"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/memories", label: "Recuerdos" },
  { href: "/music", label: "Música" },
  { href: "/writings", label: "Escritos" },
];

export function FloatingNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 px-3 sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:px-2 transition-all duration-300">
      <div
        className="
          mx-auto flex max-w-md items-center justify-between gap-0.5
          rounded-full border border-stone-200/80 bg-white/70
          px-1.5 py-1.5 shadow-lg shadow-stone-300/20 backdrop-blur-md
          sm:max-w-none sm:justify-center sm:gap-1 sm:px-2 sm:py-2
        "
      >
        {links.map((link, index) => {
          const isActive = pathname === link.href;

          return (
            <div key={link.href} className="flex items-center min-w-0">
              {index > 0 && (
                <span className="mx-0.5 hidden text-stone-300 select-none sm:inline">
                  ·
                </span>
              )}
              <Link
                href={link.href}
                className={`
                  rounded-full px-2.5 py-1.5 text-xs tracking-wide transition
                  sm:px-4 sm:text-sm
                  ${
                    isActive
                      ? "bg-rose-100/80 font-medium text-rose-700"
                      : "text-stone-600 hover:bg-stone-100/60 hover:text-stone-900"
                  }
                `}
              >
                {link.label}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
