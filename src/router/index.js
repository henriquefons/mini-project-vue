import { createRouter, createWebHistory } from "vue-router";
import IndexUser from "../components/User/Index.vue";
import IndexPost from "../components/Post/Index.vue";
import IndexTodo from "../components/Todo/Index.vue";
import Home from "../components/Home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/user", component: IndexUser },
  { path: "/post", component: IndexPost },
  { path: "/todo", component: IndexTodo },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
  routes, // short for `routes: routes`
});

export default router;
