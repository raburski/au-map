/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Disable image optimization for static assets to avoid Vercel issues
		unoptimized: true,
		// Alternative: configure domains if you want to keep optimization
		// domains: ['uprisingmap.com'],
		// remotePatterns: [
		// 	{
		// 		protocol: 'https',
		// 		hostname: 'uprisingmap.com',
		// 		port: '',
		// 		pathname: '/emblems/**',
		// 	},
		// ],
	},
	// Ensure static assets are properly handled
	experimental: {
		optimizePackageImports: ['react-icons'],
	},
};

export default nextConfig;
