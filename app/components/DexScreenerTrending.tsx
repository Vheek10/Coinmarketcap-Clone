/** @format */

"use client";

import React from "react";

const trendingDex = [
	{ name: "SERAPH", price: "$0.1968", change: "0.88%" },
	{ name: "CARV", price: "$0.254", change: "2.04%" },
	{ name: "Circle", price: "$5.04", change: "31240%" },
	{ name: "ROAM", price: "$0.1199", change: "0.1%" },
	{ name: "BULLA", price: "$0.0589", change: "7.4%" },
];

export default function DexScreenerTrending() {
	return (
		<div className="bg-base-100 p-4 rounded-lg shadow w-full h-full">
			<h2 className="font-semibold text-lg mb-3">📊 DexScan Trending</h2>
			<ul className="space-y-2 text-sm">
				{trendingDex.map((token, i) => (
					<li
						key={i}
						className="flex justify-between">
						<span>{token.name}</span>
						<span className="font-medium">{token.price}</span>
						<span className="text-green-500">{token.change}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
