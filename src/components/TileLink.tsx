"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export type TileLinkProps = {
  href: string;
  src: string;
  label: string;
  hoverText: string;
  offset:
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
  priority?: boolean;
  armedHref: string | null;
  setArmedHref: (href: string | null) => void;
  canHover: boolean;
};

export default function TileLink({
  href,
  src,
  label,
  hoverText,
  offset,
  priority,
  armedHref,
  setArmedHref,
  canHover,
}: TileLinkProps) {
  const router = useRouter();
  const isArmed = armedHref === href;

  const offsetArmed =
    offset === "topLeft"
      ? "-translate-x-2 -translate-y-2"
      : offset === "topRight"
      ? "translate-x-2 -translate-y-2"
      : offset === "bottomLeft"
      ? "-translate-x-2 translate-y-2"
      : "translate-x-2 translate-y-2";

  const offsetHover =
    offset === "topLeft"
      ? "group-hover:-translate-x-2 group-hover:-translate-y-2"
      : offset === "topRight"
      ? "group-hover:translate-x-2 group-hover:-translate-y-2"
      : offset === "bottomLeft"
      ? "group-hover:-translate-x-2 group-hover:translate-y-2"
      : "group-hover:translate-x-2 group-hover:translate-y-2";

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Desktop/mouse: navigate normally.
      if (canHover) return;

      // Touch/coarse pointer: first tap arms (expand + show overlay), second tap navigates.
      e.preventDefault();

      if (isArmed) {
        setArmedHref(null);
        router.push(href);
      } else {
        setArmedHref(href);
      }
    },
    [canHover, href, isArmed, router, setArmedHref]
  );

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "group relative overflow-hidden rounded-2xl bg-zinc-900",
        "transition-transform duration-300 ease-out",
        isArmed ? `${offsetArmed} scale-[1.02]` : "",
        offsetHover,
        "group-hover:scale-[1.02]",
      ].join(" ")}
      prefetch={false}
    >
      <div className="aspect-4/3 w-full">
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          priority={priority}
          className={[
            "object-cover transition-transform duration-300",
            canHover ? "group-hover:scale-[1.06]" : "",
            // Keep the "more image" feel when armed on touch.
            isArmed ? "scale-[1.06]" : "",
          ].join(" ")}
        />
      </div>

      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />

      <div
        className={[
          "absolute inset-0 p-5 flex flex-col justify-end pointer-events-none transition-all duration-200",
          isArmed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          // On desktop, show overlay on hover.
          "group-hover:opacity-100 group-hover:translate-y-0",
        ].join(" ")}
      >
        <div className="text-sm tracking-[0.24em] uppercase text-white/95">
          {label}
        </div>
        <div className="mt-1 text-sm text-white/95 transition-opacity duration-200">
          {hoverText}
        </div>
      </div>
    </Link>
  );
}

