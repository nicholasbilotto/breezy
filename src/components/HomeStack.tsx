"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";

type Strip = {
	href: string;
	src: string;
	label: string;
	top: number; // px
	height: number; // px
	left: number; // px
	width: number; // px
	z: number;
	rotate: number; // deg
	hoverShift: number; // px
};

const strips: Strip[] = [
	{
		href: "/commercial",
		src: "/tiles/commercial.png",
		label: "Commercial",
		top: 29,
		height: 576,
		left: 126,
		width: 392,
		z: 56,
		rotate: -0.75,
		hoverShift: 50,
	},
	{
		href: "/observations",
		src: "/tiles/observations.png",
		label: "Observations",
		top: 25,
		height: 578,
		left: 204,
		width: 392,
		z: 48,
		rotate: 0.95,
		hoverShift: 60,
	},
	{
		href: "/archives",
		src: "/tiles/archives.png",
		label: "Archives",
		top: 22,
		height: 580,
		left: 278,
		width: 392,
		z: 40,
		rotate: -0.8,
		hoverShift: 64,
	},
	{
		href: "/motion",
		src: "/tiles/motion.png",
		label: "Motion",
		top: 20,
		height: 582,
		left: 356,
		width: 392,
		z: 32,
		rotate: 1.15,
		hoverShift: 80,
	},
];

function useCanHover() {
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
	return canHover;
}

export default function HomeStack() {
	const router = useRouter();
	const canHover = useCanHover();
	const [armedHref, setArmedHref] = useState<string | null>(null);
	const [commercialEdgeHover, setCommercialEdgeHover] = useState(false);
	const [activeLabel, setActiveLabel] = useState<string | null>(null);

	useEffect(() => {
		if (canHover) setArmedHref(null);
	}, [canHover]);

	const armedSet = useMemo(
		() => new Set([armedHref].filter(Boolean) as string[]),
		[armedHref],
	);

	return (
		<div className="flex w-full items-center justify-center">
			{/* Fixed composition box to match mockup proportions */}
			<div className="relative h-[670px] w-[820px] max-w-full">
				<div className="pointer-events-none absolute left-1/2 top-5 z-120 -translate-x-1/2 text-center">
					<div
						className={[
							"text-xs font-semibold tracking-[0.22em] uppercase text-foreground",
							"transition-all duration-200 ease-out",
							activeLabel ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
						].join(" ")}
					>
						{activeLabel ?? ""}
					</div>
				</div>

				{/* Folder back (slightly offset so it creeps through) */}
				<div className="absolute left-[92px] top-[42px] h-[548px] w-[530px] origin-center scale-y-[1.49] opacity-[0.98]">
					<Image
						src="/home/folder-back.svg"
						alt=""
						fill
						priority
						className="object-contain"
					/>
				</div>

				{/* Vertical strips (the 4 clickable gateways), tucked under the folder front */}
				{strips.map((s) => {
					const isArmed = armedSet.has(s.href);
					const isCommercial = s.href === "/commercial";
					const pullActiveForCommercial =
						(canHover && commercialEdgeHover) || (!canHover && isArmed);

					const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
						if (canHover) return;
						e.preventDefault();
						if (isArmed) {
							setArmedHref(null);
							router.push(s.href);
						} else {
							setArmedHref(s.href);
						}
					};

					return (
						<Link
							key={s.href}
							href={s.href}
							onClick={onClick}
							onMouseMove={(e) => {
								if (!canHover || !isCommercial) return;
								const rect = e.currentTarget.getBoundingClientRect();
								const localX = e.clientX - rect.left;
								// Activate pull near the folder opening/right edge.
								setCommercialEdgeHover(localX >= rect.width * 0.74);
							}}
							onMouseEnter={() => {
								setActiveLabel(s.label);
							}}
							onMouseLeave={() => {
								setActiveLabel((prev) => (prev === s.label ? null : prev));
								if (!isCommercial) return;
								setCommercialEdgeHover(false);
							}}
							className="group absolute"
							style={{
								top: s.top,
								left: s.left,
								width: s.width,
								height: s.height,
								zIndex: s.z,
							}}
						>
							<div
								style={
									{
										transform: `rotate(${s.rotate}deg)`,
										["--shift" as string]: `${s.hoverShift}px`,
									} as CSSProperties
								}
								className={[
									"relative h-full w-full",
									"transition-transform duration-300 ease-out",
									// Pull photo out without resizing.
									isCommercial
										? pullActiveForCommercial
											? "translate-x-(--shift)"
											: ""
										: "group-hover:translate-x-(--shift)",
									!isCommercial && isArmed ? "translate-x-(--shift)" : "",
								].join(" ")}
							>
								<Image
									src={s.src}
									alt={s.label}
									fill
									sizes="392px"
									className="object-contain object-right"
								/>
							</div>
						</Link>
					);
				})}

				{/* Folder front (covers the strips so they look tucked inside) */}
				<div className="pointer-events-none absolute left-[98px] top-[48px] h-[536px] w-[518px] origin-center scale-y-[1.49] z-80">
					<Image
						src="/home/folder-front.svg"
						alt=""
						fill
						priority
						className="object-contain"
					/>
				</div>
			</div>
		</div>
	);
}
