/** @format */

"use client";

import React from "react";

const trending = [
	{ name: "MAGIC", price: "$0.2072", change: "75.4%" },
	{ name: "BANANAS31", price: "$0.0205", change: "33.67%" },
	{ name: "LINK", price: "$14.08", change: "6.07%" },
	{ name: "FLOKI", price: "$0.00009257", change: "11.03%" },
	{ name: "MAVIA", price: "$0.1679", change: "29.95%" },
];

export default function TrendingCoins() {
	return (
		<div className="bg-base-100 p-4 rounded-lg shadow w-full h-full">
			<h2 className="font-semibold text-lg mb-3">🪙 Trending Coins</h2>
			<ul className="space-y-2 text-sm">
				{trending.map((coin, i) => (
					<li
						key={i}
						className="flex justify-between">
						<span>{coin.name}</span>
						<span className="font-medium">{coin.price}</span>
						<span className="text-green-500">{coin.change}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
