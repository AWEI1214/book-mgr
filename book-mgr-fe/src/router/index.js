import { createRouter, createWebHashHistory } from 'vue-router';

const auth = ()=> import ("../views/Auth/auth.vue")

const routes = [
  {
    path:'/',
    redirect:'/auth'
  },
  {
    path: '/auth',
    name: 'Home',
    component:auth
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
