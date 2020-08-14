import Vue from "vue";
import VueRouter from "vue-router";

import Home from "views/home/Home"
const Category = () => import(/* webpackChunkName: 'category' */'views/category/Category')
const Cart = () => import(/* webpackChunkName: 'cart' */'views/cart/Cart')
const Profile = () => import(/* webpackChunkName: 'profile'*/ 'views/profile/Profile')

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
