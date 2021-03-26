const { join, resolve } = require('path');

const webpack = require('webpack');
const { argv } = require('yargs');
const TerserPlugin = require('terser-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const PrerenderSPAPlugin = require('@dreysolano/prerender-spa-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const r = resolve.bind(__dirname);
const { mode } = argv;

const dotenv = require('dotenv').config({
	path: join(__dirname, '.env')
});

const { Routes } = require('./src/utilities/enums');

const PATHS = {
	src: r('./src'),
	root: r('./'),
	dist: r('./dist'),
	i18n: r('./src/i18n'),
	store: r('./src/store'),
	assets: r('./src/assets'),
	utilities: r('./src/utilities'),
	components: r('./src/components'),
	containers: r('./src/containers'),
	nodeModules: r('./node_modules')
};

const tsConfig = {
	test: /\.tsx?$/,
	use: [
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
				sources: {
					list: [{ tag: 'link', attribute: 'href', type: 'src' }]
				},
				esModule: false,
				minimize: false
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
				resources: process.env.SCSS_IMPORTS.split(',')
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

module.exports = () => {
	const isDev = mode === 'development';

	if (isDev) {
		tsConfig.use.splice(0, 0, {
			loader: require.resolve('babel-loader'),
			// @ts-ignore
			options: {
				plugins: [require.resolve('react-refresh/babel')]
			}
		});
	}

	return {
		mode,
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
			new webpack.DefinePlugin({
				'process.env': {
					...dotenv.parsed,
					NODE_ENV: JSON.stringify(isDev ? 'development' : 'production')
				}
			}),
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
				? [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()]
				: [
						new WebpackPwaManifest({
							name: process.env.APP_NAME,
							short_name: process.env.APP_SHORT_NAME,
							description: process.env.APP_DESCRIPTION,
							background_color: process.env.APP_BACKGROUND_COLOR,
							theme_color: process.env.APP_THEME_COLOR,
							inject: true,
							ios: true,
							icons: [
								{
									src: r(process.env.APP_ICON),
									sizes: [72, 96, 128, 144, 192, 384, 512]
								},
								{
									src: r(process.env.APP_ICON),
									sizes: [120, 152, 167, 180],
									ios: true
								}
							]
						}),
						new PrerenderSPAPlugin({
							staticDir: join(__dirname, 'dist'),
							// @ts-ignore
							routes: Object.values(Routes)
						})
				  ])
		],
		cache: true,
		bail: false,
		target: 'web',
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
								compress: {
									comparisons: false
								},
								mangle: true,
								output: {
									comments: false,
									ascii_only: true
								}
							},
							parallel: true
						})
					],
					nodeEnv: 'production',
					concatenateModules: false,
					splitChunks: {
						chunks: 'async',
						minSize: 30000,
						minRemainingSize: 0,
						maxSize: 0,
						minChunks: 1,
						maxAsyncRequests: 30,
						maxInitialRequests: 30,
						enforceSizeThreshold: 50000,
						cacheGroups: {
							defaultVendors: {
								test: /[\\/]node_modules[\\/]/,
								priority: -10,
								reuseExistingChunk: true
							},
							default: {
								minChunks: 2,
								priority: -20,
								reuseExistingChunk: true
							}
						}
					},
					runtimeChunk: true
			  }
	};
};
