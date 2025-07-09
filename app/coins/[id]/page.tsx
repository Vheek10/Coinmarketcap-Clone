/** @format */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	ResponsiveContainer,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
	Tooltip as ReTooltip,
} from "recharts";
import { createChart, UTCTimestamp } from "lightweight-charts";

interface Ticker {
	market: { name: string };
	base: string;
	target: string;
	last: number;
	volume: number;
}
interface StatusUpdate {
	title?: string;
	description?: string;
	user_sentiment?: string;
}

interface CoinData {
	id: string;
	name: string;
	symbol: string;
	image: { large: string };
	description?: { en?: string };
	market_data: {
		current_price: { usd: number };
		market_cap: { usd: number };
		high_24h: { usd: number };
		low_24h: { usd: number };
		total_volume: { usd: number };
		circulating_supply: number;
		total_supply?: number;
		price_change_percentage_1h_in_currency?: { usd?: number };
		price_change_percentage_24h?: number;
		price_change_percentage_7d_in_currency?: { usd?: number };
		sparkline_7d?: { price: number[] };
	};
	tickers?: Ticker[];
}

type OHLC = {
	time: UTCTimestamp;
	open: number;
	high: number;
	low: number;
	close: number;
};
type LinePoint = { time: UTCTimestamp; value: number };

export default function CoinDetailPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const [coin, setCoin] = useState<CoinData | null>(null);
	const [news, setNews] = useState<StatusUpdate[]>([]);
	const [range, setRange] = useState<"1" | "7" | "30">("7");
	const [ohlc7, setOhlc7] = useState<OHLC[]>([]);
	const [line30, setLine30] = useState<LinePoint[]>([]);
	const [intra1h, setIntra1h] = useState<LinePoint[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			try {
				const [cRes, nRes, histRes, ohlcRes, intraRes] = await Promise.all([
					fetch(
						`https://api.coingecko.com/api/v3/coins/${id}?sparkline=true&tickers=true`,
					),
					fetch(`https://api.coingecko.com/api/v3/coins/${id}/status_updates`),
					fetch(
						`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`,
					),
					fetch(
						`https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=7`,
					),
					fetch(
						`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&interval=hourly`,
					),
				]);

				// Check for throttling or bad responses
				const checkAndParse = async (res: Response) => {
					const text = await res.text();
					try {
						return JSON.parse(text);
					} catch {
						if (text.includes("Throttled")) {
							throw new Error(
								"API rate limit reached. Please try again later.",
							);
						}
						throw new Error("Failed to fetch data from CoinGecko.");
					}
				};

				const cData = await checkAndParse(cRes);
				const nData = await checkAndParse(nRes);
				const histData = await checkAndParse(histRes);
				const ohlcData = await checkAndParse(ohlcRes);
				const intraData = await checkAndParse(intraRes);

				setCoin(cData);
				setNews(
					Array.isArray(nData.status_updates)
						? nData.status_updates.slice(0, 5)
						: [],
				);
				setLine30(
					histData.prices.map(([t, p]: [number, number]) => ({
						time: (t / 1000) as UTCTimestamp,
						value: p,
					})),
				);
				setOhlc7(
					ohlcData.map(([t, o, h, l, c]: number[]) => ({
						time: (t / 1000) as UTCTimestamp,
						open: o,
						high: h,
						low: l,
						close: c,
					})),
				);
				setIntra1h(
					intraData.prices.map(([t, p]: [number, number]) => ({
						time: (t / 1000) as UTCTimestamp,
						value: p,
					})),
				);
			} catch (e: any) {
				console.error(e);
				setError(e.message);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [id]);

	useEffect(() => {
		if (!coin) return;

		const container = document.getElementById("tv-chart");
		if (!container) return;
		container.innerHTML = "";
		const chart = createChart(container, {
			width: container.clientWidth,
			height: 300,
		});
		if (range === "7") {
			const series = chart.addCandlestickSeries();
			series.setData(ohlc7);
		} else {
			const series = chart.addLineSeries({ color: "#2563EB" });
			series.setData(range === "1" ? intra1h : line30);
		}
	}, [coin, range, ohlc7, line30, intra1h]);

	if (loading) return <div className="p-8 text-center">Loading...</div>;
	if (error)
		return <div className="p-8 text-center text-red-500">Error: {error}</div>;
	if (!coin) return null;

	const md = coin.market_data;
	const formatNum = (n: number) => n.toLocaleString();
	const pctClass = (n: number | undefined) =>
		n === undefined ? "" : n >= 0 ? "text-green-600" : "text-red-600";

	const supplyData = [
		{ name: "Circulating", value: md.circulating_supply },
		{
			name: "Non‑circulating",
			value: (md.total_supply || 0) - md.circulating_supply,
		},
	];
	const COLORS = ["#2563EB", "#CBD5E1"];

	const metrics = [
		["Price", `$${formatNum(md.current_price.usd)}`],
		["Market Cap", `$${formatNum(md.market_cap.usd)}`],
		["High 24h", `$${formatNum(md.high_24h.usd)}`],
		["Low 24h", `$${formatNum(md.low_24h.usd)}`],
		["Volume 24h", `$${formatNum(md.total_volume.usd)}`],
		["Circulating Supply", formatNum(md.circulating_supply)],
		["1h Δ", md.price_change_percentage_1h_in_currency?.usd?.toFixed(2) + "%"],
		["24h Δ", md.price_change_percentage_24h?.toFixed(2) + "%"],
		["7d Δ", md.price_change_percentage_7d_in_currency?.usd?.toFixed(2) + "%"],
	];

	return (
		<div className="max-w-4xl mx-auto p-4 space-y-6">
			<Link
				href="/"
				className="underline">
				← Back
			</Link>
			<div className="flex items-center gap-4">
				<Image
					src={coin.image.large}
					width={48}
					height={48}
					alt={coin.name}
				/>
				<h1 className="text-2xl font-bold">
					{coin.name} ({coin.symbol.toUpperCase()})
				</h1>
			</div>

			<div className="space-x-2">
				{["1", "7", "30"].map((d) => (
					<button
						key={d}
						onClick={() => setRange(d as any)}
						className={`px-3 py-1 rounded ${
							range === d ? "bg-blue-500 text-white" : "bg-gray-200"
						}`}>
						{d === "1" ? "1D" : d === "7" ? "7D" : "30D"}
					</button>
				))}
			</div>

			<div
				id="tv-chart"
				className="rounded shadow-lg"></div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{metrics.map(([lbl, val], i) => (
					<div
						key={i}
						className="p-4 bg-base-200 rounded">
						<p className="text-sm text-gray-500">{lbl}</p>
						<p
							className={`text-lg font-bold ${
								lbl.includes("Δ") ? pctClass(Number(val.replace("%", ""))) : ""
							}`}>
							{val}
						</p>
					</div>
				))}
			</div>

			<div className="bg-base-200 p-4 rounded shadow">
				<h2 className="text-xl font-semibold mb-2">Tokenomics</h2>
				<ResponsiveContainer
					width="100%"
					height={200}>
					<PieChart>
						<Pie
							data={supplyData}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							outerRadius={60}>
							{COLORS.map((c, i) => (
								<Cell
									key={i}
									fill={c}
								/>
							))}
						</Pie>
						<ReTooltip formatter={(v) => formatNum(Number(v))} />
					</PieChart>
				</ResponsiveContainer>
			</div>

			<div className="bg-base-200 p-4 rounded shadow overflow-x-auto">
				<h2 className="text-xl font-semibold mb-2">Market Pairs</h2>
				<table className="w-full text-sm">
					<thead className="text-gray-500">
						<tr>
							<th>Exchange</th>
							<th>Pair</th>
							<th>Price</th>
							<th>Volume</th>
						</tr>
					</thead>
					<tbody>
						{coin.tickers?.slice(0, 5).map((t, i) => (
							<tr
								key={i}
								className="border-t border-base-300">
								<td>{t.market.name}</td>
								<td>
									{t.base}/{t.target}
								</td>
								<td>${formatNum(t.last)}</td>
								<td>${formatNum(t.volume)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="bg-base-200 p-4 rounded shadow">
				<h2 className="text-xl font-semibold mb-2">Latest News</h2>
				{Array.isArray(news) && news.length > 0 ? (
					<ul className="space-y-3">
						{news.map((n, i) => (
							<li
								key={i}
								className="border-b pb-2 last:border-0">
								<Link
									href={n.user_sentiment || "#"}
									className="text-blue-600 font-medium">
									{n.title || "Update"}
								</Link>
								<p className="text-gray-500 text-sm">{n.description}</p>
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500 text-center">No recent updates.</p>
				)}
			</div>
		</div>
	);
}
