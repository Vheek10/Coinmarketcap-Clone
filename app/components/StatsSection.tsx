/** @format */

// components/StatsSection.tsx
"use client";

import { useEffect, useState } from "react";
import TrendingCoins from "./TrendingCoins";
import DexScreenerTrending from "./DexScreenerTrending";
import StatCard from "./StatCard";

export default function StatsSection() {
	const [data, setData] = useState({
		marketCap: "$3.37T",
		marketCapChange: "1.17%",
		cmc100: "$207.55",
		cmcChange: "1.10%",
		altcoinIndex: "23",
		fearGreed: "52",
	});

	useEffect(() => {
		// You can fetch real API data here and update `setData`
	}, []);

	return (
		<div className="px-4 py-6 space-y-4">
			{/* Top row */}
			<div className="hidden md:flex gap-4">
				<div className="w-1/2">
					<TrendingCoins />
				</div>
				<div className="w-1/2">
					<DexScreenerTrending />
				</div>
			</div>

			{/* Bento grid */}
			<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 rounded-lg overflow-hidden border border-base-300">
				<StatCard
					title="Market Cap"
					value={data.marketCap}
					subtext={data.marketCapChange}
					className="border-b border-r border-base-300"
				/>
				<StatCard
					title="CMC100"
					value={data.cmc100}
					subtext={data.cmcChange}
					className="border-b border-base-300"
				/>
				<StatCard
					title="Altcoin Index"
					value={data.altcoinIndex}
					subtext="/100"
					className="border-r border-base-300"
				/>
				<StatCard
					title="Fear & Greed"
					value={data.fearGreed}
					subtext="Neutral"
				/>
			</div>
		</div>
	);
}
