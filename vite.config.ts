import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import Vue from '@vitejs/plugin-vue';
import LinkAttributes from 'markdown-it-link-attributes';
import Prism from 'markdown-it-prism';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import Markdown from 'vite-plugin-vue-markdown';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
// Temporarily commenting out
// import WasmPack from 'vite-plugin-wasm-pack';
import WindiCSS from 'vite-plugin-windicss';
import VueMacros from 'unplugin-vue-macros/vite';

export default defineConfig({
  resolve: { alias: { '~/': `${resolve(__dirname, 'src')}/` } },
  build: {
    rollupOptions: {
      output: {
        // === Manual File Name Sanitization ===
        //
        // 1.  By default, `[...all].vue` will be compiled to the chunk file with name starts with `_...all_`.
        //     But jekyll(gh-pages dependency uses it behind the scenes) ignores file name starts with `_`.
        //     So it will be problematic on the production.
        //     In this sanitization, I added '_' to the default sanitization.
        //     https://rollupjs.org/guide/en/#outputsanitizefilename
        // 2.  Alternate solution is adding empty `.nojekyll` file in the root of the dist folder.
        //
        sanitizeFileName: (filename) => filename.replace(/[_?*\0]/, ''),
        //
      },
    },
  },
  plugins: [
    VueMacros({
      plugins: { vue: Vue({ include: [/\.vue$/, /\.md$/], reactivityTransform: true }) },
    }),
    Pages({
      extensions: ['vue', 'md'],
      exclude: ['**/composables/*', '**/components/*', '**/drafts/*'],
    }),
    Layouts(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      directoryAsNamespace: true,
      extensions: ['vue', 'md'],
      resolvers: [IconsResolver({ prefix: false }), HeadlessUiResolver()],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),
    Icons({ autoInstall: true }),
    WindiCSS(),
    Markdown({
      wrapperComponent: 'md-wrapper',
      markdownItSetup(md) {
        md.use(Prism);
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: { target: '_blank', rel: 'noopener noreferrer' },
        });
      },
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve(__dirname, 'locales/**')],
    }),
    // WasmPack(['./wasm']),
  ],
  server: { fs: { strict: true } },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
  optimizeDeps: { include: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'] },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  ssr: {
    // Workaround until they support native ESM ㅠㅠ
    noExternal: [/vue-i18n/],
  },
});
