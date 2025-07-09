/** @format */

import Image from "next/image";

export default function DexScreenerTrending({ tokens }: { tokens: any[] }) {
	return (
		<div className="bg-base-200 rounded-lg p-4 shadow-md">
			<h2 className="text-lg font-semibold mb-4">🧪 DexScreener Trending</h2>
			<ul className="space-y-3">
				{tokens.map((token: any) => (
					<li
						key={token.pairAddress}
						className="flex justify-between items-center">
						<div className="flex gap-3 items-center">
							<Image
								src={token.token0.logoURI || "/token.png"}
								alt={token.token0.symbol}
								width={28}
								height={28}
								className="rounded-full"
							/>
							<div>
								<p className="font-medium text-white">
									{token.token0.symbol}/{token.token1.symbol}
								</p>
								<p className="text-xs text-gray-400">{token.baseToken?.name}</p>
							</div>
						</div>
						<div className="text-right">
							<p className="font-semibold text-sm">
								${parseFloat(token.priceUsd).toFixed(4)}
							</p>
							<p
								className={`text-xs ${
									parseFloat(token.priceChange.h24) >= 0
										? "text-green-500"
										: "text-red-500"
								}`}>
								{parseFloat(token.priceChange.h24).toFixed(2)}%
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
