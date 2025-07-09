// components/StatCard.tsx
"use client";

import React from "react";

interface StatCardProps {
	title: string;
	value: string;
	subtext?: string;
	className?: string;
}

export default function StatCard({ title, value, subtext, className }: StatCardProps) {
	return (
		<div
			className={`flex flex-col items-center justify-center p-4 bg-base-200 text-center ${className}`}>
			<p className="text-sm text-gray-400">{title}</p>
			<p className="text-xl font-bold">{value}</p>
			{subtext && <p className="text-xs text-gray-500">{subtext}</p>}
		</div>
	);
}
