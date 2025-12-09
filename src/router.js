import { createRouter, createWebHistory } from 'vue-router';
import HrHome from './components/HrHome.vue';
import About from './components/About.vue';
<<<<<<< HEAD

=======
import Payslip from './components/Payslip.vue';
import employees from './components/employees.vue';
import attendance from './components/attendance.vue';
>>>>>>> 54a3cbe24210402677f4009ffefe96850a9623e3

const routes = [
  { path:'/',  component: HrHome },
  {path: '/about', component: About},
<<<<<<< HEAD
=======
  { path: '/payslip', component: Payslip },
  {path: '/employees', component: employees},
  {path: '/attendance', component: attendance},
>>>>>>> 54a3cbe24210402677f4009ffefe96850a9623e3

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
