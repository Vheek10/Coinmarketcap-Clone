/** @format */

import Image from "next/image";
import Link from "next/link";

export default function TrendingCoins({ coins }: { coins: any[] }) {
	return (
		<div className="bg-base-200 rounded-lg p-4 shadow-md">
			<h2 className="text-lg font-semibold mb-4">🔥 Trending Coins</h2>
			<ul className="space-y-3">
				{coins.map(({ item }) => (
					<li
						key={item.id}
						className="flex items-center justify-between">
						<Link
							href={`/coins/${item.id}`}
							className="flex items-center gap-3">
							<Image
								src={item.small}
								alt={item.name}
								width={28}
								height={28}
								className="rounded-full"
							/>
							<div>
								<p className="font-medium text-white">{item.name}</p>
								<p className="text-xs text-gray-400 uppercase">{item.symbol}</p>
							</div>
						</Link>
						<span className="font-semibold text-sm">
							{(item.price_btc * 1e4).toFixed(2)}k BTC
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
