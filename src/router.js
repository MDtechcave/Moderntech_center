import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from './supabase'
import AddEmployee from './components/AddEmployee.vue'
import Login from './components/Login.vue';
import HrHome from './components/HrHome.vue';
import About from './components/About.vue';
import employees from './components/employees.vue';
import attendance from './components/attendance.vue';
import workreviews from './components/workreviews.vue';
import Payroll from './components/Payroll.vue';
import MyLeave from './components/MyLeave.vue';
import MyAttendance from './components/MyAttendance.vue';
import MyPayslip from './components/MyPayslip.vue'

const routes = [
  { path: '/employees/add',
     component: AddEmployee,
    meta: { requiresAuth: true, requiresAdmin: true }
   },
  { path: '/login',
     component: Login 
  },

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
     { path: '/myleave',
      component: MyLeave,
       meta: { requiresAuth: true } 
    },
    { path: '/myattendance',
       component: MyAttendance,
        meta: { requiresAuth: true }
       },
  { path: '/mypayslip',
   component: MyPayslip,
    meta: { requiresAuth: true } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession()
  const isLoggedIn = !!data.session
  const role = localStorage.getItem('role')


  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && isLoggedIn) {
    next('/')
  } else if (to.meta.requiresAdmin && role !== 'admin') {
    next('/')
  } else {
    next()
  }
})

export default router;

