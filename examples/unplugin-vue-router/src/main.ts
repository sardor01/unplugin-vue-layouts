import { createApp } from 'vue';
import { setupLayouts } from 'virtual:vue-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import { routes as _routes } from 'vue-router/auto/routes';
import App from './App.vue';

const app = createApp(App);

const routes = setupLayouts(_routes);

const router = createRouter({
  routes,
  history: createWebHistory(),
});

app.use(router);

app.mount('#app');
