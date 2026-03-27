import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/commercial", label: "Commercial" },
  { href: "/observations", label: "Observations" },
  { href: "/archives", label: "Archives" },
  { href: "/motion", label: "Motion" },
];

export default function Header() {
  return (
    <header className="w-full bg-background text-foreground">
      <div className="mx-auto flex max-w-7xl items-start justify-between px-6 pt-8">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-[0.06em] uppercase"
        >
          Fabrizio Quiñones
        </Link>

        <nav className="flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[16px] font-semibold transition-opacity hover:opacity-80"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="text-[16px] font-semibold transition-opacity hover:opacity-80"
          >
            Contact
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

