/** @format */

"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
	totalItems: number;
	currentPage: number;
	pageSize: number;
}

export default function Pagination({
	totalItems,
	currentPage,
	pageSize,
}: PaginationProps) {
	const totalPages = Math.ceil(totalItems / pageSize);
	const router = useRouter();
	const searchParams = useSearchParams();

	const updateQuery = (newPage: number, newPageSize: number = pageSize) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", newPage.toString());
		params.set("pageSize", newPageSize.toString());
		router.push(`/?${params.toString()}`);
	};

	const start = (currentPage - 1) * pageSize + 1;
	const end = Math.min(currentPage * pageSize, totalItems);

	const getPageNumbers = () => {
		const pages = new Set<number>();
		pages.add(1);
		pages.add(2);
		pages.add(3);
		pages.add(currentPage - 1);
		pages.add(currentPage);
		pages.add(currentPage + 1);
		pages.add(totalPages);
		return Array.from(pages)
			.filter((p) => p >= 1 && p <= totalPages)
			.sort((a, b) => a - b);
	};

	const pages = getPageNumbers();

	return (
		<div className="mt-10 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
			{/* Left - Range Info */}
			<p className="text-sm text-gray-500 text-center md:text-left">
				Showing <strong>{start}</strong> - <strong>{end}</strong> of{" "}
				<strong>{totalItems}</strong> coins
			</p>

			{/* Center - Pagination Buttons */}
			<div className="flex justify-center flex-wrap items-center gap-2">
				<button
					className="btn btn-sm btn-outline hover:btn-primary"
					disabled={currentPage === 1}
					onClick={() => updateQuery(currentPage - 1)}>
					←
				</button>

				{pages.map((page, index) => {
					const prevPage = pages[index - 1];
					const isCurrent = page === currentPage;

					return (
						<React.Fragment key={page}>
							{prevPage && page - prevPage > 1 && (
								<span className="px-1">...</span>
							)}
							<button
								className={`btn btn-sm ${
									isCurrent ? "btn-primary" : "btn-outline hover:btn-primary"
								}`}
								onClick={() => updateQuery(page)}>
								{page}
							</button>
						</React.Fragment>
					);
				})}

				<button
					className="btn btn-sm btn-outline hover:btn-primary"
					disabled={currentPage === totalPages}
					onClick={() => updateQuery(currentPage + 1)}>
					→
				</button>
			</div>

			{/* Right - Page Size Selector */}
			<div className="flex justify-center md:justify-end items-center gap-2">
				<span className="text-sm">Show</span>
				<select
					className="select select-sm select-bordered w-20"
					value={pageSize}
					onChange={(e) => updateQuery(1, parseInt(e.target.value))}>
					<option value={100}>100</option>
					<option value={200}>200</option>
					<option value={500}>500</option>
				</select>
				<span className="text-sm">per page</span>
			</div>
		</div>
	);
}
