import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "../pages/MainPage";
import Admin from "../pages/admin/ProductAdmin";
import Products from "../pages/ProductsPage";
import Background from "../pages/admin/MainPageAdmin";
import Product from "../pages/ProductPage";
import LoginPage from "../pages/auth/LoginPage";
import RegistrationPage from "../pages/auth/RegistrationPage";
import ProfilePage from "../pages/profile/ProfilePage";
import Order from "../pages/Order";

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
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/registration',
    component: RegistrationPage
  },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/order',
    component: Order
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
