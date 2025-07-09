/** @format */

"use client";

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<div className="text-red-500 p-4">
			<h2>Market data unavailable</h2>
			<button
				onClick={() => reset()}
				className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
				Try again
			</button>
		</div>
	);
}
