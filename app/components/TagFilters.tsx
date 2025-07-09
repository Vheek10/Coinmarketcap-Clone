/** @format */

"use client";

import { useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FILTER_TAGS } from "@/constants/tags";
import { ChevronRight } from "lucide-react";

export default function CategoryFilters() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const selected = searchParams.get("tag") || "All Crypto";

	const scrollRef = useRef<HTMLDivElement>(null);

	const handleClick = (tag: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (tag === "All Crypto") {
			params.delete("tag");
		} else {
			params.set("tag", tag);
		}
		router.push(`/?${params.toString()}`);
	};

	const scrollRight = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
		}
	};

	return (
		<div className="relative flex items-center">
			<div
				ref={scrollRef}
				className="flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap pr-10">
				{FILTER_TAGS.map((tag) => (
					<button
						key={tag}
						className={`btn btn-sm rounded-full px-3 ${
							selected === tag
								? "btn-primary text-white"
								: "bg-transparent text-base-content hover:bg-base-200"
						}`}
						onClick={() => handleClick(tag)}>
						{tag}
					</button>
				))}
			</div>

			{/* Scroll right button */}
			<button
				className="absolute right-0 h-full px-2 bg-gradient-to-l from-base-100 to-transparent"
				onClick={scrollRight}>
				<ChevronRight size={20} />
			</button>
		</div>
	);
}
