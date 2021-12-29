import VueRouter from 'vue-router'
import TodoList from './components/TodoList.vue'
import Create from './components/Create.vue'

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: TodoList,
    },
    {
      path: '/create',
      component: Create,
    },
    {
      path: '/edit/:id',
      component: Create,
    }
  ],
})