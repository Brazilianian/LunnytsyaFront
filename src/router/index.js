import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "../pages/MainPage";
import Admin from "../pages/Admin";
import Products from "../pages/Products";
import Background from "../pages/Background";

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/admin/background',
    component: Background
  },
  {
    path: '/product',
    component: Products
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
