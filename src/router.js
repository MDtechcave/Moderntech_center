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
import employees from './components/Employees.vue';
import attendance from './components/Attendance.vue';
import workreviews from './components/workreviews.vue';
import Payroll from './components/Payroll.vue';

const routes = [
  { path: '/login', component: Login },
  {path: '/workreviews',
     component: workreviews,
     meta: {requiresAuth: true}
    },
  { path: '/',
     component: HrHome ,
    meta:{requiresAuth: true}
  },
  { path: '/about', component: About, 
    meta: {requiresAuth: true}
  },
  { path: '/employees',
     component: employees ,
     meta: {requiresAuth: true}
  },
  { path: '/attendance',
     component: attendance,
     meta: {requiresAuth: true}
    },
  { path: '/payroll',
     component: Payroll,
     meta: {requiresAuth: true}
     },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isloggedIn = localStorage.getItem("user");

  if (to.meta.requiresAuth && !isloggedIn) {
    next('/login'); //sends you to login
  } else {
    next(); //allows access
  }
});

export default router;

