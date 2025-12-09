import { createRouter, createWebHistory } from 'vue-router';
import HrHome from './components/HrHome.vue';
import About from './components/About.vue';

import employees from './components/employees.vue';
import attendance from './components/attendance.vue';
import Payroll from './components/Payroll.vue';

const routes = [
  { path:'/',  component: HrHome },
  {path: '/about', component: About},
  {path: '/employees', component: employees},
  {path: '/attendance', component: attendance},
  {path: '/payroll', component: Payroll},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
