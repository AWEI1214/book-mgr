import { createRouter, createWebHashHistory } from 'vue-router';

const auth = ()=> import ("../views/Auth/auth.vue")
const basiclayout = ()=> import ("../layout/BasicLayout/index.vue")
const book = ()=> import ("../views/Books/index.vue")

const routes = [
  // {
  //   path:'/',
  //   redirect:'/auth'
  // },
  {
    path: '/auth',
    name: 'Home',
    component:auth
  },
  {
    path: '/',
    name:'BacicLayout',
    component:basiclayout,
    children:[
      {
        path: '/books',
        name: 'Book',
        component:book
      },
    ]
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
