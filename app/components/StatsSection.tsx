/** @format */
"use client";

import { useEffect, useState } from "react";
import StatCard from "./StatCard";

export default function StatsSection() {
	const [marketData, setMarketData] = useState({
		cap: "...",
		capChange: "...",
		btcPrice: "...",
		fearGreed: { value: "...", classification: "..." },
	});

	// ... (keep your existing useEffect and data fetching logic)

	return (
		<section className="px-2 py-3">
			{/* Compact Bento Grid */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
				{/* Row 1 */}
				<div className="h-28">
					{" "}
					{/* Fixed height instead of aspect-square */}
					<StatCard
						title="Market Cap"
						value={marketData.cap}
						subtext={marketData.capChange}
						trend={marketData.capChange.startsWith("-") ? "down" : "up"}
						compact
					/>
				</div>

				<div className="h-28">
					<StatCard
						title="BTC Price"
						value={marketData.btcPrice}
						compact
					/>
				</div>

				{/* Row 2 */}
				<div className="h-28">
					<StatCard
						title="Alt Index"
						value="38/100"
						subtext="Neutral"
						trend="neutral"
						compact
					/>
				</div>

				<div className="h-28">
					<StatCard
						title="F&G Index"
						value={marketData.fearGreed.value}
						subtext={marketData.fearGreed.classification}
						trend={Number(marketData.fearGreed.value) > 50 ? "up" : "down"}
						compact
					/>
				</div>
			</div>
		</section>
	);
}
