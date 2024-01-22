/* eslint-disable n/prefer-global/process */
import type { Plugin } from 'vite';
import { createVirtualModuleCode, createVirtualModuleID } from './virtual';

export interface Options {
  /**
   * layouts dir
   * @default "src/layouts"
   */
  target?: string;
  /**
   * default layout
   * @default "default"
   */
  defaultLayout?: string;
  /**
   * default auto resolve
   */
  importMode?: 'sync' | 'async';
  /**
   * If opened, fix →
   * https://github.com/JohnCampionJr/vite-plugin-vue-layouts/issues/134
   * @default false
   */
  skipTopLevelRouteLayout?: boolean;
}

export default function VueLayouts(options: Partial<Options> = {}): Plugin {
  const {
    target = 'src/layouts',
    defaultLayout = 'default',
    importMode = process.env.VITE_SSG ? 'sync' : 'async',
    skipTopLevelRouteLayout = false,
  } = options;

  const { virtualModuleId, resolvedVirtualModuleId } = createVirtualModuleID('vue-layouts');

  return {
    name: 'unplugin-vue-layouts',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return createVirtualModuleCode({
          target,
          importMode,
          defaultLayout,
          skipTopLevelRouteLayout,
        });
      }
    },
  };
}
