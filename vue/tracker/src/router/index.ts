import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tasks from '../views/Tasks.vue'


const routes: RouteRecordRaw[] = [{
    path: '/',
    name: 'Tarefas',
    component: Tasks
}];
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

export default router;