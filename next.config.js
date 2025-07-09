/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	images: {
		domains: ["coin-images.coingecko.com"],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
