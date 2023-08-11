import { createRouter, createWebHistory } from 'vue-router'
import { useSettingStore } from '@/store/setting'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/views/Setting.vue'),
      },
      {
        path: 'archive',
        name: 'Archive',
        component: () => import('@/views/Archive.vue'),
      },
      {
        path: 'tag',
        redirect: '/archive',
      },
      {
        path: 'tag/:tag',
        name: 'Tag',
        component: () => import('@/views/Tag.vue'),
      },
      {
        path: ':path',
        name: 'Article',
        component: () => import('@/views/Article.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const settingStore = useSettingStore()
  if (to.name === 'Setting' && !settingStore.isLogin) {
    return {name: 'Home'}
  }
})

export default router