import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "../pages/MainPage";
import Admin from "../pages/admin/ProductAdmin";
import Products from "../pages/Products";
import Background from "../pages/admin/MainPageAdmin";
import Product from "../pages/admin/Product";

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
    path: '/admin/main-page',
    component: Background
  },
  {
    path: '/product',
    component: Products
  },
  {
    path: '/product/:id',
    component: Product
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
