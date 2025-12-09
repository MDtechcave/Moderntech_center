import { createRouter, createWebHistory } from 'vue-router';
import HrHome from './components/HrHome.vue';
import About from './components/About.vue';

import Payslip from './components/Payslip.vue';
import employees from './components/employees.vue';
import attendance from './components/attendance.vue';

const routes = [
  { path:'/',  component: HrHome },
  {path: '/about', component: About},
  { path: '/payslip', component: Payslip },
  {path: '/employees', component: employees},
  {path: '/attendance', component: attendance},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
