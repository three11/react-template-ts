import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import { join } from 'node:path';
import autoprefixer from 'autoprefixer';
import cssnanoPlugin from 'cssnano';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';

export default defineConfig({
	plugins: [
		react(),
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
			plugins: [autoprefixer, postcssFlexbugsFixes, cssnanoPlugin]
		}
	},
	resolve: {
		alias: {
			'@assets/': join(__dirname, '/src/assets/')
		}
	}
});
