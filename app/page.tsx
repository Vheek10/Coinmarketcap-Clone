/** @format */

import TagFilters from "./components/TagFilters";
import Pagination from "./components/Pagination";
import CoinTable from "./components/CoinList";
import StatsSection from "./components/StatsSection";
interface Coin {
	id: string;
	name: string;
	symbol: string;
	image: string;
	current_price: number;
	market_cap: number;
	price_change_percentage_24h: number;
	market_cap_rank: number;
	total_volume: number;
	sparkline_in_7d?: {
		price: number[];
	};
}

async function getCoins(page: number, pageSize: number): Promise<Coin[]> {
	const res = await fetch(
		`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${pageSize}&page=${page}&sparkline=true&price_change_percentage=24h`,
		{ next: { revalidate: 60 } },
	);

	if (!res.ok) {
		const text = await res.text();
		if (text.includes("Throttled")) {
			throw new Error("API rate limit reached. Please try again later.");
		}
		throw new Error("Failed to fetch coins");
	}

	return res.json();
}

export default async function HomePage({
	searchParams,
}: {
	searchParams: { page?: string; pageSize?: string };
}) {
	const currentPage = parseInt(searchParams.page || "1");
	const pageSize = parseInt(searchParams.pageSize || "100");

	const coins = await getCoins(currentPage, pageSize);

	// CoinGecko only has 10k coins max — hard cap
	const totalCoins = 10000;

	return (
		<div className="py-6">
			<TagFilters />
			<StatsSection />
			<CoinTable coins={coins} />
			<Pagination
				totalItems={totalCoins}
				currentPage={currentPage}
				pageSize={pageSize}
			/>
		</div>
	);
}
