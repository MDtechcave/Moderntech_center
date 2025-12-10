import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import HrHome from './components/HrHome.vue';
import About from './components/About.vue';

import Payslip from './components/Payslip.vue';
import employees from './components/employees.vue';
import attendance from './components/attendance.vue';
import workreviews from './components/workreviews.vue';

const routes = [
  // { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path:'/',  component: HrHome },
  {path: '/about', component: About},
  { path: '/payslip', component: Payslip },
  {path: '/employees', component: employees},
  {path: '/attendance', component: attendance},
  {path: '/workreviews', component: workreviews}

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("auth");

  if (to.meta.requiresAuth && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
