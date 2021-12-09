import { createRouter, createWebHashHistory } from 'vue-router';

const auth = ()=> import ("../views/Auth/auth.vue")
const basiclayout = ()=> import ("../layout/BasicLayout/index.vue")
const book = ()=> import ("../views/Books/index.vue")
const bookdetail = ()=> import ("../views/BookDetail/index.vue")
const users = ()=> import ("../views/Users/index.vue")

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
      {
        path: '/books/:id',
        name: 'BookDetail;',
        component:bookdetail
      },
      {
        path: '/user',
        name: 'Users;',
        component:users
      },
    ]
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
