import VueI18n from '@intlify/vite-plugin-vue-i18n';
import Vue from '@vitejs/plugin-vue';
import LinkAttributes from 'markdown-it-link-attributes';
import Prism from 'markdown-it-prism';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import Markdown from 'vite-plugin-md';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
	plugins: [
		Vue({ include: [/\.vue$/, /\.md$/] }),
		Pages({ extensions: ['vue', 'md'] }),
		Layouts(),
		AutoImport({
			imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
			dts: 'src/auto-imports.d.ts',
		}),
		Components({
			extensions: ['vue', 'md'],
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
			resolvers: [IconsResolver({ prefix: false })],
			dts: 'src/components.d.ts',
		}),
		Icons({ autoInstall: true }),
		WindiCSS(),
		Markdown({
			wrapperClasses: '',
			headEnabled: true,
			markdownItSetup(md) {
				md.use(Prism);
				md.use(LinkAttributes, {
					matcher: (link: string) => /^https?:\/\//.test(link),
					attrs: { target: '_blank', rel: 'noopener' },
				});
			},
		}),
		VueI18n({
			runtimeOnly: true,
			compositionOnly: true,
			include: [resolve(__dirname, 'locales/**')],
		}),
	],
	server: { fs: { strict: true } },
	ssgOptions: {
		script: 'async',
		formatting: 'minify',
	},
	optimizeDeps: { include: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'] },
});
