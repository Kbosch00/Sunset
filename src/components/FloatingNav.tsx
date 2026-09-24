"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M3 11l9-7 9 7" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhotoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path
        d="M21 16l-5-5-4 4-2-2-5 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MusicIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M9 18V5l11-2v13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </svg>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M12 20h9" strokeLinecap="round" />
      <path
        d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChecklistIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M9 6h11" strokeLinecap="round" />
      <path d="M9 12h11" strokeLinecap="round" />
      <path d="M9 18h11" strokeLinecap="round" />
      <path d="M3.5 6l1 1 2-2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 12l1 1 2-2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 18l1 1 2-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const links = [
  { href: "/", label: "Inicio", icon: HomeIcon },
  { href: "/memories", label: "Recuerdos", icon: PhotoIcon },
  { href: "/music", label: "Playlists", icon: MusicIcon },
  { href: "/writings", label: "Escritos", icon: PencilIcon },
  { href: "/todo", label: "Planes", icon: ChecklistIcon },
];

export function FloatingNav() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed inset-x-0 bottom-0 z-50
        border-t border-stone-200/80 bg-white/80 backdrop-blur-md
        pb-[env(safe-area-inset-bottom,0px)]
        sm:inset-x-auto sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2
        sm:rounded-full sm:border sm:pb-0 sm:shadow-lg sm:shadow-stone-300/20
      "
    >
      <div className="mx-auto flex max-w-md sm:max-w-none sm:gap-1 sm:px-2 sm:py-2 ">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className={`
                flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5
                px-1 py-2.5 text-[10px] tracking-wide transition active:scale-90
                sm:flex-row sm:gap-1.5 sm:rounded-full sm:px-4 sm:py-1.5 sm:text-sm
                ${
                  isActive
                    ? "text-rose-600 sm:bg-rose-100/80 sm:font-medium"
                    : "text-stone-500 hover:text-stone-800 sm:hover:bg-stone-100/60"
                }
              `}
            >
              <Icon
                className={`h-5 w-5 shrink-0 sm:h-4 sm:w-4 ${
                  isActive ? "nav-icon-active" : ""
                }`}
              />
              <span className="">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
