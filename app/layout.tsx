/** @format */

// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "CoinMarketClone",
	description: "A clone of CoinMarketCap built with Next.js 14",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			data-theme="light">
			<body className={inter.className}>
				<Navbar />
				<main className="px-4">{children}</main>
			</body>
		</html>
	);
}
