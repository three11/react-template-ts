import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import { join } from 'node:path';
import { Routes } from './src/utilities/enums';
import autoprefixer from 'autoprefixer';
import cssNanoPlugin from 'cssnano';
import vitePrerender from 'vite-plugin-prerender';
import { defineConfig } from 'vite';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';

export default defineConfig({
	plugins: [
		react(),
		vitePrerender({
			staticDir: join(__dirname, 'dist'),
			routes: Object.values(Routes)
		}),
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
	},
	resolve: {
		alias: {
			'@assets/': join(__dirname, '/src/assets/')
		}
	}
});
