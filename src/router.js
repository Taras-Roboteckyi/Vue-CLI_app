//Тут прописуються всі настройки роутінга///////
import VueRouter from "vue-router";

import ErrorPage from "./pages/ErrorPage";

import store from "./store";

//Розбиваєм роути на чанки. Це все вирішує Webpack
const HomePage = () => import("./pages/HomePage");
const ApartmentPage = () => import("./pages/Apartment");
const LoginPage = () => import("./pages/Login");
const RegistrationPage = () => import("./pages/Registration");
const MyOrdersPage = () => import("./pages/MyOrders");

//Щоб роутер працював, потрібно на основі компонентів створити масив роутерів////
const routes = [
  {
    path: "/", //Задаєм кореневий шлях, щоб переходило по сторінці///
    component: HomePage,
    name: "homepage",
  },
  {
    path: "/apartment/:id", //створюєм динамічний маршрут //
    component: ApartmentPage,
    name: "apartment", //Система nameрнів, для того щоб дати імя кожному роуту///
    meta: {
      requiresAuth: true,
    }, //Робим захищений роут.Тобто якщо користувач не залогінений, то користувач не може зайти на сторінку
  },
  {
    path: "/my-orders", //створюєм динамічний маршрут //
    component: MyOrdersPage,
    name: "my-orders", //Система nameрнів, для того щоб дати імя кожному роуту///
    meta: {
      requiresAuth: true,
    }, //Робим захищений роут.Тобто якщо користувач не залогінений, то користувач не може зайти на сторінку
  },
  {
    path: "/login", //створюєм  маршрут //
    component: LoginPage,
    name: "login-page",
    meta: {
      hideForAuth: true,
    }, //Робим захищений роут.Тобто якщо користувач зареєстрований, то не показувати ці сторінки
  },
  {
    path: "/registration", //створюєм  маршрут //
    component: RegistrationPage,
    name: "registration-page",
  },
  {
    path: "*", //такий роутер підходить до любого шляху і спрацьовує коли не відпрацював ні один із цих верхніх роутів//
    component: ErrorPage,
    name: "error-page",
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
  base: "/Vue-CLI_app/",
});

//Є глобальний хук який називається beforeEach, який спрацьовує кожен раз коли є перехід з роута на інший роут. Він приймає три параметри to, from i next
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters["auth/isLoggedIn"];

  //Інфа з офіційної документації, для провірки на meta
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //провірка проходить по всім роутам і дивиться якщо одни співпавший роут requiresAuth
    if (!isLoggedIn) {
      next({ name: "login-page" });
    }
  }

  if (to.matched.some((record) => record.meta.hideForAuth)) {
    //провірка проходить по всім роутам і дивиться якщо одни співпавший роут requiresAuth
    if (isLoggedIn) {
      next({ name: "homepage" });
    }
  }

  next();
});
//to - означає на яку сторінку переходить роут. from - означає з якої сторінки. Понятно що перший раз загружаємся то from у нас не існує. І next - самий головний, якщо ми його не застосуєм то не відбудеться перехід з  роута на інший.
export default router;
