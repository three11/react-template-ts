import * as path from 'path';
import * as webpack from 'webpack';
import * as TerserPlugin from 'terser-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as HtmlWebPackPlugin from 'html-webpack-plugin';
import * as WebpackPwaManifest from 'webpack-pwa-manifest';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
	devServer?: WebpackDevServerConfiguration;
}

// because there are no type definitions available
const OfflinePlugin: any = require('offline-plugin');

interface IndexedList<T> {
	[key: string]: T;
}

interface Environment {
	dev?: boolean | undefined;
}

interface HotLoader extends webpack.NewLoader {
	hot: boolean;
}

const resolve: (path: string) => string = path.resolve.bind(__dirname);

const PATHS: IndexedList<string> = {
	src: resolve('./src'),
	root: resolve('./'),
	dist: resolve('./dist'),
	assets: resolve('./src/assets'),
	utilities: resolve('./src/utilities'),
	components: resolve('./src/components'),
	containers: resolve('./src/containers'),
	nodeModules: resolve('./node_modules')
};

const tsConfig: webpack.Rule = {
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

const htmlConfig: webpack.Rule = {
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

const postcssPlugins: string[] = [
	require('postcss-easy-import'),
	require('postcss-url')({
		url: 'rebase'
	}),
	require('postcss-utilities'),
	require('postcss-flexbugs-fixes'),
	require('autoprefixer')()
];

const cssConfig: webpack.Rule = {
	test: /(\.css|\.scss)$/,
	use: [
		'css-hot-loader',
		MiniCssExtractPlugin.loader,
		'css-loader',
		{
			loader: 'postcss-loader',
			options: {
				plugins: (loader: HotLoader): string[] => {
					return loader.hot
						? postcssPlugins
						: [
								...postcssPlugins,
								require('cssnano')({
									discardComments: {
										removeAll: true
									}
								})
						  ];
				}
			}
		},
		'sass-loader'
	]
};

const fontsConfig: webpack.Rule = {
	test: /\.(eot|otf|ttf|woff|woff2)$/,
	use: 'file-loader'
};

const svgConfig: webpack.Rule = {
	test: /\.svg$/,
	issuer: /\.tsx?$/,
	exclude: /node_modules/,
	loader: 'svg-inline-loader'
};

const svgCSSConfig: webpack.Rule = {
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

const imagesConfig: webpack.Rule = {
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
					quality: '65-90',
					speed: 4
				}
			}
		}
	]
};

const mediaConfig: webpack.Rule = {
	test: /\.(mp3|mp4|webm)$/,
	use: {
		loader: 'url-loader',
		options: {
			limit: 10000
		}
	}
};

module.exports = (env: Environment = {}): Configuration => {
	const isDev: boolean | undefined = env.dev;

	return {
		entry: ['react-hot-loader/patch', './src/index.tsx'],
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
				'@assets': PATHS.assets,
				'@utilities': PATHS.utilities,
				'@components': PATHS.components,
				'@containers': PATHS.containers
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
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(isDev ? 'development' : 'production')
				}
			}),
			new CopyWebpackPlugin([
				{
					from: 'src/assets/',
					to: 'assets/'
				}
			]),
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
						})
				  ])
		],
		cache: true,
		bail: false,
		devtool: isDev ? 'eval-source-map' : 'source-map',
		devServer: {
			hot: true,
			noInfo: true,
			hotOnly: true,
			overlay: true,
			historyApiFallback: true
			// host: '0.0.0.0'
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
					sideEffects: true,
					concatenateModules: true,
					splitChunks: {
						chunks: 'all',
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
