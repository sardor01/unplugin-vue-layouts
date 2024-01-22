import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import VueLayouts from 'unplugin-vue-layouts';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'types/typed-router.d.ts',
    }),
    Vue(),
    VueLayouts({
      skipTopLevelRouteLayout: true,
    }),
    Inspect(),
  ],
});
