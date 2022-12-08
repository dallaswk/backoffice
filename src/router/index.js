import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/crud",
    name: "CRUD",
    component: () =>
      import(/* webpackChunkName: "crudview" */ "../views/CrudView.vue"),
  },
  {
    path: "/users",
    name: "Usuarios",
    component: () =>
      import(/* webpackChunkName: "usercrud" */ "../views/UserCrudView.vue"),
  },
  {
    path: "/user/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../components/login/Login.vue"),
  },
  {
    path: "/user/signup",
    name: "Registro",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../components/login/Signup.vue"),
  },
  {
    path: "/user/profile",
    name: "Perfil",
    component: () =>
      import(
        /* webpackChunkName: "profile" */ "../components/login/Profile.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
