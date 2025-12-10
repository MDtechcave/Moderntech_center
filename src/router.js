// import { createRouter, createWebHistory } from 'vue-router';
// import HrHome from './components/HrHome.vue';
// import About from './components/About.vue';

// import Employees from './components/Employees.vue';
// import Attendance from './components/Attendance.vue';
// import Payroll from './components/Payroll.vue';

// const routes = [
//   { path:'/',  component: HrHome },
//   {path: '/about', component: about},
//   {path: '/employees', component: employees},
//   {path: '/attendance', component: attendance},
//   {path: '/payroll', component: payroll},

// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';

import HrHome from './components/HrHome.vue';
import About from './components/About.vue';
import employees from './components/employees.vue';
import attendance from './components/attendance.vue';
import workreviews from './components/workreviews.vue';
import Payroll from './components/Payroll.vue';

const routes = [
  { path: '/login', component: Login },
  {path: '/workreviews', component: workreviews}
  { path: '/', component: HrHome },
  { path: '/about', component: About },
  { path: '/employees', component: employees },
  { path: '/attendance', component: attendance },
  { path: '/payroll', component: Payroll },
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

