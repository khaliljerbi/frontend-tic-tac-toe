import Vue from "vue";
import VueRouter from "vue-router";

import Welcome from "../components/Welcome";
import Board from "../components/Board";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Welcome },
  { path: "/board", component: Board },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
