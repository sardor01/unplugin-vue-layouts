# unplugin-vue-layouts

## usage 🦖

### basic

#### install

```shell
pnpm add -D unplugin-vue-layouts
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueLayouts from 'unplugin-vue-layouts';

export default defineConfig({
  plugins: [Vue(), VueLayouts()],
});
```

#### usage

```ts
import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:vue-layouts';

const routes = setupLayouts([
  {
    // ... Page routes
  },
]);

const router = createRouter({
  routes,
  history: createWebHistory(),
});
```

1. `layouts/default.vue` 👉 The default layout, which is now applied to the page

```html
<template>
  default
  <router-view />
</template>
```

2. Of course you can configure different layouts

For example `layouts/other.vue`

```ts
// apply layouts/default.vue layout
const home = {
  path: '/',
  component: () => import('./pages/home.vue'),
};

// apply layouts/other.vue layout
const about = {
  path: '/about',
  component: () => import('./pages/home.vue'),
  meta: {
    layout: 'other', // Manage layouts through meta information
  },
};

const routes = setupLayouts([home, about]);
```

<br />

### Pair with file routing

Of course, file routing is also supported 🤗

#### [unplugin-vue-router](https://github.com/posva/unplugin-vue-router)

##### install

```shell
npm i unplugin-vue-router -D
```

##### usage

```ts
import { createRouter, createWebHistory } from 'vue-router/auto';
import { routes } from 'vue-router/auto/routes';
import { setupLayouts } from 'virtual:vue-layouts';

const router = createRouter({
  routes: setupLayouts(routes), // Register the file routes
  history: createWebHistory(),
});
```

<br />

### config

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueLayouts from 'unplugin-vue-layouts';

export default defineConfig({
  plugins: [
    Vue(),
    VueLayouts({
      target: 'src/layouts', // Layout directory, default src/layouts
      defaultLayout: 'default', // Default layout, which defaults to default
      importMode: 'sync', // Load mode, support sync and async. The default is automatic processing, sync for SSGs, and async for non-SSGs
      skipTopLevelRouteLayout: true, // Turn on fixing https://github.com/JohnCampionJr/vite-plugin-vue-layouts/issues/134, default is false Close
    }),
  ],
});
```

<br />

### Type declarations 🦕

If you are a `ts` project, you can also configure the following declaration in
`tsconfig.json`

```json
{
  "compilerOptions": {
    "types": ["unplugin-vue-layouts/client"]
  }
}
```

<br />

### note

Since the layout system needs to nest a layer of layout routes in the outermost
layer, it may cause confusion in obtaining the routing table, and auxiliary
functions can be used at this time 👇

```ts
import { createGetRoutes } from 'virtual:vue-layouts';

const getRoutes = createGetRoutes(router);

// Gets the route table, but does not contain layout routes
console.log(getRoutes());
```

<br />

## implement 👀

The layout implementation idea comes from [vite-plugin-vue-layouts]
(https://github.com/JohnCampionJr/vite-plugin-vue-layouts).

However, the simpler scheme 👉
[virtual file](https://vitejs.dev/guide/api-plugin#importing-a-virtual-file)
and [glob import](https://vitejs.dev/guide/features#glob-import) is used.

The program can do reasonable `HMR` automatically.

<br />

## License

Published under [MIT License](./LICENSE).
