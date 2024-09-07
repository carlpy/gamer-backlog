import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', name: 'home', component: () => import('@/views/HomePage.vue') },
    { path: '/current-games', name: 'c-games', component: () => import('@/views/CurrentGames.vue') },
    { path: '/completed-games', name: 'co-games', component: () => import('@/views/CompletedGames.vue') },
    { path: '/games/:id', name: 'game-info', component: () => import('@/views/GameDetails.vue') },
];

const router = new createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
