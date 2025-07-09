/** @format */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Sun, Moon, Menu } from "lucide-react";

export default function Navbar() {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") as "light" | "dark";
		if (storedTheme) {
			setTheme(storedTheme);
			document.documentElement.setAttribute("data-theme", storedTheme);
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
	};

	return (
		<div className="navbar bg-base-100 shadow sticky top-0 z-50 px-4">
			<div className="flex-1">
				<Link
					href="/"
					className="text-xl font-bold text-primary">
					CoinMarketClone
				</Link>
			</div>

			<div className="flex gap-2 items-center">
				{/* Search bar */}
				<div className="relative hidden md:block">
					<input
						type="text"
						placeholder="Search coins"
						className="input input-sm input-bordered pl-10 w-40 md:w-60"
					/>
					<Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
				</div>

				{/* Theme toggle */}
				<button
					onClick={toggleTheme}
					className="btn btn-sm btn-ghost">
					{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
				</button>

				{/* Dropdown menu */}
				<div className="dropdown dropdown-end">
					<label
						tabIndex={0}
						className="btn btn-sm btn-ghost">
						<Menu size={18} />
					</label>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40">
						<li>
							<Link href="/">Home</Link>
						</li>
						<li>
							<Link href="/trending">Trending</Link>
						</li>
						<li>
							<Link href="/about">About</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
