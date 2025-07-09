/** @format */

// components/LoadingSkeleton.tsx
export default function LoadingSkeleton() {
	return (
		<div className="w-full animate-pulse space-y-2">
			<div className="h-4 bg-base-200 rounded w-1/2"></div>
			<div className="h-4 bg-base-200 rounded w-3/4"></div>
			<div className="h-4 bg-base-200 rounded w-full"></div>
			{/* Repeat for effect */}
		</div>
	);
}
