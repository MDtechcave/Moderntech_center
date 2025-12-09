import { createRouter, createWebHistory } from 'vue-router';
import HrHome from './components/HrHome.vue';
import About from './components/About.vue';
import Payslip from './components/Payslip.vue';

const routes = [
  { path:'/',  component: HrHome },
  {path: '/about', component: About},
  { path: '/payslip', component: Payslip },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
