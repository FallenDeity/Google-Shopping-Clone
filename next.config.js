/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	distDir: "dist",
	experimental: {
		serverActions: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "links.papareact.com",
			},
		],
	},
};

module.exports = nextConfig;
