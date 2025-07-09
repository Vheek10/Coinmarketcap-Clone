/** @format */
"use client";

import Image from "next/image";
import Link from "next/link";
import { ResponsiveContainer, LineChart, Line } from "recharts";

interface Coin {
	id: string;
	name: string;
	symbol: string;
	image: string;
	current_price: number;
	market_cap_rank: number;
	market_cap: number;
	total_volume: number;
	circulating_supply: number;
	price_change_percentage_1h_in_currency?: number;
	price_change_percentage_24h: number;
	price_change_percentage_7d_in_currency?: number;
	sparkline_in_7d?: { price: number[] };
}

export default function CoinList({ coins }: { coins: Coin[] }) {
	return (
		<div className="overflow-x-auto mt-6">
			<table className="table w-full bg-base-100">
				<thead className="text-sm text-gray-500 border-b">
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Price</th>
						<th>1h %</th>
						<th>24h %</th>
						<th>7d %</th>
						<th>Market Cap</th>
						<th>Volume (24h)</th>
						<th>Circulating Supply</th>
						<th>Last 7 Days</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-base-200">
					{coins.map((coin) => {
						const {
							id,
							name,
							symbol,
							image,
							current_price,
							market_cap_rank,
							market_cap,
							total_volume,
							circulating_supply,
							price_change_percentage_1h_in_currency,
							price_change_percentage_24h,
							price_change_percentage_7d_in_currency,
							sparkline_in_7d,
						} = coin;

						return (
							<tr
								key={id}
								className="hover:bg-base-200 transition duration-150">
								<td>{market_cap_rank}</td>

								<td>
									<Link
										href={`/coins/${coin.id}`}
										className="flex items-center gap-3 font-medium hover:underline">
										<Image
											src={image}
											alt={name}
											width={24}
											height={24}
											className="rounded-full"
										/>
										<div className="flex flex-col">
											<span className="font-bold">{name}</span>
											<span className="text-xs text-gray-400 uppercase">
												{symbol}
											</span>
										</div>
									</Link>
								</td>

								<td>${current_price.toLocaleString()}</td>

								<td
									className={
										price_change_percentage_1h_in_currency! >= 0
											? "text-green-500"
											: "text-red-500"
									}>
									{price_change_percentage_1h_in_currency?.toFixed(2)}%
								</td>

								<td
									className={
										price_change_percentage_24h >= 0
											? "text-green-500"
											: "text-red-500"
									}>
									{price_change_percentage_24h.toFixed(2)}%
								</td>

								<td
									className={
										price_change_percentage_7d_in_currency! >= 0
											? "text-green-500"
											: "text-red-500"
									}>
									{price_change_percentage_7d_in_currency?.toFixed(2)}%
								</td>

								<td>${market_cap.toLocaleString()}</td>
								<td>${total_volume.toLocaleString()}</td>
								<td>{circulating_supply.toLocaleString()}</td>

								<td className="w-[100px] h-[40px]">
									{sparkline_in_7d?.price ? (
										<ResponsiveContainer
											width="100%"
											height="100%">
											<LineChart
												data={sparkline_in_7d.price.map((p, i) => ({
													price: p,
													index: i,
												}))}>
												<Line
													type="monotone"
													dataKey="price"
													stroke={
														price_change_percentage_7d_in_currency! >= 0
															? "#16a34a"
															: "#dc2626"
													}
													strokeWidth={2}
													dot={false}
												/>
											</LineChart>
										</ResponsiveContainer>
									) : (
										<span className="text-xs text-gray-400">N/A</span>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
