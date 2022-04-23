import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from '../views/MinhasTarefas.vue'
import Projetos from '../views/MeusProjetos.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        name: 'Projetos',
        component: Projetos
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

export default router;