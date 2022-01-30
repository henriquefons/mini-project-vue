import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home.vue";

import UserIndex from "../components/User/Index.vue";
import User from "../components/User/User.vue";

import PostIndex from "../components/Post/Index.vue";
import Post from "../components/Post/Post.vue";

import TodoIndex from "../components/Todo/Index.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/user", component: UserIndex },
  { path: "/user/new", component: User },
  { path: "/user/edit/:id", component: User },
  { path: "/post", component: PostIndex },
  { path: "/post/new", component: Post },
  { path: "/post/edit/:id", component: Post },
  { path: "/todo", component: TodoIndex },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
  routes,
});

export default router;
