import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import OtherPage from './OtherPage.vue';

const routes = [
  {
    path: '/',
    component: App
  },
  {
    path: '/other',
    component: OtherPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;    