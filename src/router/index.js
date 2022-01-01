import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "../pages/MainPage";
import Admin from "../pages/Admin";

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
