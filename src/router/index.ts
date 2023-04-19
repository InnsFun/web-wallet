import { createRouter, createWebHistory } from "vue-router";

import WalletView from "../views/InnsWalletView.vue";

const routerHistory = createWebHistory();
const routes = [
  { path: "/", component: WalletView },
];

const router = createRouter({
  history: routerHistory,
  routes,
});

export default router;
