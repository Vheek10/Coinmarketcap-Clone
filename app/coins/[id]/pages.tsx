/** @format */

import Image from "next/image";
import { ResponsiveContainer, LineChart, Line } from "recharts";

interface CoinDetailProps {
	params: { id: string };
}

async function getCoinDetails(id: string) {
	const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
		next: { revalidate: 60 }, // ISR
	});
	if (!res.ok) throw new Error("Failed to fetch coin details");
	return res.json();
}

export default async function CoinDetailPage({ params }: CoinDetailProps) {
	const coin = await getCoinDetails(params.id);

	const formatNum = (num: number) => num?.toLocaleString();

	return (
		<div className="max-w-5xl mx-auto py-10 px-4">
			<div className="flex items-center gap-4 mb-6">
				<Image
					src={coin.image.large}
					alt={coin.name}
					width={48}
					height={48}
				/>
				<h1 className="text-3xl font-bold">
					{coin.name} ({coin.symbol.toUpperCase()})
				</h1>
			</div>

			{/* Description */}
			<p
				className="text-gray-500 mb-6 text-sm max-w-3xl"
				dangerouslySetInnerHTML={{
					__html: coin.description.en?.split(". ")[0] + ".",
				}}
			/>

			{/* Stat Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
				<p>
					<strong>Current Price:</strong> $
					{formatNum(coin.market_data.current_price.usd)}
				</p>
				<p>
					<strong>Market Cap:</strong> $
					{formatNum(coin.market_data.market_cap.usd)}
				</p>
				<p>
					<strong>24h High:</strong> ${formatNum(coin.market_data.high_24h.usd)}
				</p>
				<p>
					<strong>24h Low:</strong> ${formatNum(coin.market_data.low_24h.usd)}
				</p>
				<p>
					<strong>Total Volume:</strong> $
					{formatNum(coin.market_data.total_volume.usd)}
				</p>
				<p>
					<strong>Circulating Supply:</strong>{" "}
					{formatNum(coin.market_data.circulating_supply)}
				</p>
				<p>
					<strong>1h Change:</strong>{" "}
					<span
						className={
							coin.market_data.price_change_percentage_1h_in_currency.usd >= 0
								? "text-green-500"
								: "text-red-500"
						}>
						{coin.market_data.price_change_percentage_1h_in_currency.usd?.toFixed(
							2,
						)}
						%
					</span>
				</p>
				<p>
					<strong>24h Change:</strong>{" "}
					<span
						className={
							coin.market_data.price_change_percentage_24h >= 0
								? "text-green-500"
								: "text-red-500"
						}>
						{coin.market_data.price_change_percentage_24h?.toFixed(2)}%
					</span>
				</p>
				<p>
					<strong>7d Change:</strong>{" "}
					<span
						className={
							coin.market_data.price_change_percentage_7d_in_currency.usd >= 0
								? "text-green-500"
								: "text-red-500"
						}>
						{coin.market_data.price_change_percentage_7d_in_currency.usd?.toFixed(
							2,
						)}
						%
					</span>
				</p>
			</div>

			{/* Sparkline Chart */}
			{coin.market_data.sparkline_7d?.price && (
				<div className="h-[100px] mb-6">
					<ResponsiveContainer
						width="100%"
						height="100%">
						<LineChart
							data={coin.market_data.sparkline_7d.price.map(
								(p: number, i: number) => ({
									index: i,
									price: p,
								}),
							)}>
							<Line
								type="monotone"
								dataKey="price"
								stroke="#3b82f6"
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			)}

			{/* External Links */}
			<div className="flex flex-wrap items-center gap-4 text-sm text-blue-500">
				{coin.links.homepage[0] && (
					<a
						href={coin.links.homepage[0]}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline">
						🌐 Website
					</a>
				)}
				{coin.links.blockchain_site[0] && (
					<a
						href={coin.links.blockchain_site[0]}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline">
						🔗 Explorer
					</a>
				)}
				{coin.links.twitter_screen_name && (
					<a
						href={`https://twitter.com/${coin.links.twitter_screen_name}`}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline">
						🐦 Twitter
					</a>
				)}
			</div>
		</div>
	);
}
