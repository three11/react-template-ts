module.exports = {
	swDest: 'dist/service-worker.js',
	sourcemap: false,
	skipWaiting: true,
	globIgnores: [],
	globPatterns: ['**/*.{js,css,png,svg,jpg,gif,json,woff,woff2,eot,ico,webmanifest}'],
	clientsClaim: true,
	globDirectory: 'dist',
	maximumFileSizeToCacheInBytes: 8000000
};
