import { createRouter, createWebHistory } from 'vue-router'
import TodoView from "../views/TodoView.vue";
import PostView from "../views/PostView.vue";
import MainLayout from "../layout/MainLayout.vue";
import AlbumView from "../views/AlbumView.vue";
import HomeView from "../views/HomeView.vue";
import AlbumDetails from '../views/AlbumDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path: '/',
        name: 'MainLayout',
        component: MainLayout,
        children: [
        {
          path: '/Todo',
          name: 'TodoView',
          component: TodoView
        },
        {
          path: '/Post',
          name: 'PostView',
          component: PostView
        },
        {
          path: '/Home',
          name: 'Home',
          component: HomeView
        },
        {
          path: '/Album',
          name: 'AlbumView',
          component: AlbumView
        },
        {
          path: '/album/:id',
          name: 'AlbumDetails',
          component: AlbumDetails
        }
      ],
    },
  ],
});

export default router;
