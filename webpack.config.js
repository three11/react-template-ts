const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = path.resolve.bind(__dirname);

const { Routes } = require('./src/utilities/enums');

const PATHS = {
	src: resolve('./src'),
	root: resolve('./'),
	dist: resolve('./dist'),
	i18n: resolve('./src/i18n'),
	store: resolve('./src/store'),
	assets: resolve('./src/assets'),
	utilities: resolve('./src/utilities'),
	components: resolve('./src/components'),
	containers: resolve('./src/containers'),
	nodeModules: resolve('./node_modules')
};

const tsConfig = {
	test: /\.tsx?$/,
	loaders: [
		'react-hot-loader/webpack',
		{
			loader: 'ts-loader',
			options: {
				transpileOnly: true,
				compilerOptions: {
					sourceMap: true,
					target: 'es5',
					isolatedModules: true,
					noEmitOnError: false
				}
			}
		}
	],
	exclude: PATHS.nodeModules,
	include: PATHS.src
};

const htmlConfig = {
	test: /\.html$/,
	use: [
		{
			loader: 'html-loader',
			options: {
				minimize: true
			}
		}
	]
};

const postcssPlugins = [
	require('postcss-easy-import'),
	require('postcss-url')({
		url: 'rebase'
	}),
	require('postcss-utilities'),
	require('postcss-flexbugs-fixes'),
	require('autoprefixer')()
];

const cssConfig = {
	test: /(\.css|\.scss)$/,
	use: [
		'css-hot-loader',
		MiniCssExtractPlugin.loader,
		'css-loader',
		{
			loader: 'postcss-loader',
			options: {
				postcssOptions: loader => ({
					plugins: loader.hot ? postcssPlugins : [...postcssPlugins, require('cssnano')()]
				})
			}
		},
		'sass-loader',
		{
			loader: 'sass-resources-loader',
			options: {
				resources: ['./src/settings.scss']
			}
		}
	]
};

const fontsConfig = {
	test: /\.(eot|otf|ttf|woff|woff2)$/,
	use: 'file-loader'
};

const svgConfig = {
	test: /\.svg$/,
	issuer: /\.tsx?$/,
	exclude: /node_modules/,
	loader: 'svg-inline-loader'
};

const svgCSSConfig = {
	test: /\.svg$/,
	issuer: /\.s?css?$/,
	use: [
		{
			loader: 'url-loader',
			options: {
				limit: 10 * 1024
			}
		}
	]
};

const imagesConfig = {
	test: /\.(jpg|png|gif|ico)$/,
	use: [
		{
			loader: 'url-loader',
			options: {
				limit: 10 * 1024
			}
		},
		{
			loader: 'image-webpack-loader',
			options: {
				mozjpeg: {
					enabled: true,
					progressive: true
				},
				gifsicle: {
					interlaced: false
				},
				optipng: {
					optimizationLevel: 7
				},
				pngquant: {
					quality: [0.65, 0.9],
					speed: 4
				}
			}
		}
	]
};

const mediaConfig = {
	test: /\.(mp3|mp4|webm)$/,
	use: {
		loader: 'url-loader',
		options: {
			limit: 10000
		}
	}
};

module.exports = (env = {}) => {
	const isDev = env.dev;

	return {
		entry: ['./src/index.tsx'],
		output: {
			path: PATHS.dist,
			filename: isDev ? '[name].js' : '[name].[chunkhash].bundle.js',
			sourceMapFilename: isDev ? '[name].bundle.map' : '[name].[chunkhash].bundle.map',
			chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash].chunk.js',
			publicPath: '/'
		},
		module: {
			rules: [tsConfig, htmlConfig, cssConfig, fontsConfig, svgConfig, svgCSSConfig, imagesConfig, mediaConfig]
		},
		resolve: {
			alias: {
				'@src': PATHS.src,
				'@root': PATHS.root,
				'@i18n': PATHS.i18n,
				'@store': PATHS.store,
				'@assets': PATHS.assets,
				'@utilities': PATHS.utilities,
				'@components': PATHS.components,
				'@containers': PATHS.containers,
				'react-dom': '@hot-loader/react-dom'
			},
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
			modules: ['src', 'node_modules']
		},
		plugins: [
			new HtmlWebPackPlugin({
				template: './src/index.html',
				filename: './index.html',
				inject: true,
				...(isDev
					? {}
					: {
							minify: {
								removeComments: true,
								collapseWhitespace: true,
								removeRedundantAttributes: true,
								useShortDoctype: true,
								removeEmptyAttributes: true,
								removeStyleLinkTypeAttributes: true,
								keepClosingSlash: true,
								minifyJS: true,
								minifyCSS: true,
								minifyURLs: true
							}
					  })
			}),
			// @ts-ignore
			new LoadablePlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(isDev ? 'development' : 'production')
				}
			}),
			new CopyWebpackPlugin({
				// @ts-ignore
				patterns: [
					{
						from: 'src/assets/',
						to: 'assets/'
					}
				]
			}),
			new MiniCssExtractPlugin({
				filename: isDev ? '[name].css' : '[name].[hash].css',
				chunkFilename: isDev ? '[id].css' : '[id].[hash].css'
			}),
			...(isDev
				? [new webpack.HotModuleReplacementPlugin()]
				: [
						new OfflinePlugin({
							relativePaths: false,
							publicPath: '/',
							appShell: '/',
							caches: {
								main: [':rest:'],
								additional: ['*.chunk.js']
							},
							safeToUseOptionalCaches: true
						}),
						new WebpackPwaManifest({
							name: 'React Template',
							short_name: 'React TPL',
							description: 'A React application!',
							background_color: '#cccccc',
							theme_color: '#333333',
							inject: true,
							ios: true,
							icons: [
								{
									src: resolve('src/assets/icon-512x512.png'),
									sizes: [72, 96, 128, 144, 192, 384, 512]
								},
								{
									src: resolve('src/assets/icon-512x512.png'),
									sizes: [120, 152, 167, 180],
									ios: true
								}
							]
						}),
						new PrerenderSPAPlugin({
							staticDir: path.join(__dirname, 'dist'),
							// @ts-ignore
							routes: Object.values(Routes)
						})
				  ])
		],
		cache: true,
		bail: false,
		devtool: isDev ? 'eval-source-map' : false,
		devServer: {
			hot: true,
			noInfo: true,
			contentBase: './dist',
			historyApiFallback: true
		},
		stats: 'errors-only',
		performance: {
			hints: false
		},
		optimization: isDev
			? {
					splitChunks: {
						chunks: 'all'
					}
			  }
			: {
					minimize: true,
					minimizer: [
						new TerserPlugin({
							terserOptions: {
								warnings: false,
								compress: {
									comparisons: false
								},
								mangle: true,
								output: {
									comments: false,
									ascii_only: true
								}
							},
							parallel: true,
							cache: true,
							sourceMap: true
						})
					],
					nodeEnv: 'production',
					concatenateModules: false,
					splitChunks: {
						chunks: 'async',
						minSize: 30000,
						minChunks: 1,
						maxAsyncRequests: 5,
						maxInitialRequests: 3,
						name: true,
						cacheGroups: {
							commons: {
								test: /[\\/]node_modules[\\/]/,
								name: 'vendor',
								chunks: 'all'
							},
							main: {
								chunks: 'all',
								minChunks: 2,
								reuseExistingChunk: true,
								enforce: true
							}
						}
					},
					runtimeChunk: true
			  }
	};
};
