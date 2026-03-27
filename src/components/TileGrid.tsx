"use client";

import { useEffect, useState } from "react";

import TileLink from "./TileLink";

const tiles: Array<{
  href: string;
  src: string;
  label: string;
  hoverText: string;
  offset: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}> = [
  {
    href: "/commercial",
    src: "/tiles/commercial.svg",
    label: "COMMERCIAL",
    hoverText: "View Commercial",
    offset: "topLeft",
  },
  {
    href: "/observations",
    src: "/tiles/observations.svg",
    label: "OBSERVATIONS",
    hoverText: "View Observations",
    offset: "topRight",
  },
  {
    href: "/archives",
    src: "/tiles/archives.svg",
    label: "ARCHIVES",
    hoverText: "View Archives",
    offset: "bottomLeft",
  },
  {
    href: "/motion",
    src: "/tiles/motion.svg",
    label: "MOTION",
    hoverText: "View Motion",
    offset: "bottomRight",
  },
];

export default function TileGrid() {
  const [armedHref, setArmedHref] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => setCanHover(mq.matches);
    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  useEffect(() => {
    if (canHover) setArmedHref(null);
  }, [canHover]);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {tiles.map((tile) => (
        <TileLink
          key={tile.href}
          href={tile.href}
          src={tile.src}
          label={tile.label}
          hoverText={tile.hoverText}
          offset={tile.offset}
          armedHref={armedHref}
          setArmedHref={setArmedHref}
          canHover={canHover}
          priority={tile.href === "/commercial"}
        />
      ))}
    </div>
  );
}

