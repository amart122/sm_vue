import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Account from "../views/Account.vue";
import Login from "@/components/account/Login.vue";
import Main from "@/components/Main.vue";
import Signup from "@/components/account/Signup.vue";
import store from "../store";
import chat_routes from "./modules/chat";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/account/",
    component: Account,
    children: [
      { path: "login", name: "login", component: Login },
      { path: "signup", name: "signup", component: Signup },
    ],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Main,
    meta: {
      authRequired: true,
    },
  },
  ...chat_routes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
