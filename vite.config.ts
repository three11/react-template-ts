import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import { join } from 'node:path';
import { Routes } from './src/utilities/enums';
import { VitePWA } from 'vite-plugin-pwa';
import autoprefixer from 'autoprefixer';
import cssNanoPlugin from 'cssnano';
import vitePrerender from 'vite-plugin-prerender';
import { defineConfig } from 'vite';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico'],
			manifest: {
				name: 'React Template',
				short_name: 'React TPL',
				description: 'A React application!',
				theme_color: '#333333',
				icons: [
					{
						src: 'icon-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		}),
		vitePrerender({
			staticDir: join(__dirname, 'dist'),
			routes: Object.values(Routes)
		}),
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		alias({
			entries: {
				'@src': '/src',
				'@i18n': '/src/i18n',
				'@store': '/src/store',
				'@mocks': '/src/__mocks__',
				'@assets': '/src/assets',
				'@components': '/src/components',
				'@containers': '/src/containers',
				'@utilities': '/src/utilities'
			}
		})
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
				@use 'sass:list';
				@use 'sass:color';
				@use 'sass:string';
				@import "./src/assets/styles/settings.scss";
				`
			}
		},
		postcss: {
			plugins: [autoprefixer, postcssFlexbugsFixes as any, cssNanoPlugin]
		}
	}
});
