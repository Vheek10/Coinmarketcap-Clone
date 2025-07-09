/** @format */

import Image from "next/image";

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

	return (
		<div className="max-w-4xl mx-auto py-8 px-4">
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

			<p
				className="text-gray-500 mb-4"
				dangerouslySetInnerHTML={{
					__html: coin.description.en?.split(". ")[0] + ".",
				}}
			/>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
				<p>
					<strong>Current Price:</strong> $
					{coin.market_data.current_price.usd.toLocaleString()}
				</p>
				<p>
					<strong>Market Cap:</strong> $
					{coin.market_data.market_cap.usd.toLocaleString()}
				</p>
				<p>
					<strong>24h High:</strong> ${coin.market_data.high_24h.usd}
				</p>
				<p>
					<strong>24h Low:</strong> ${coin.market_data.low_24h.usd}
				</p>
				<p>
					<strong>Total Volume:</strong> $
					{coin.market_data.total_volume.usd.toLocaleString()}
				</p>
				<p>
					<strong>Circulating Supply:</strong>{" "}
					{coin.market_data.circulating_supply.toLocaleString()}
				</p>
			</div>
		</div>
	);
}
