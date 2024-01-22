/// <reference types="vite/client" />
/// <reference types="unplugin-vue-layoutss/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
