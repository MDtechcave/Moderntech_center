import { createRouter, createWebHistory } from 'vue-router';
import HrHome from './components/HrHome.vue';
import About from './components/About.vue';


const routes = [
  { path:'/',  component: HrHome },
  {path: '/about', component: About},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
