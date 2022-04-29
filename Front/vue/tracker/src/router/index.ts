import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from '../views/MinhasTarefas.vue'
import Projetos from '../views/MeusProjetos.vue'
import Formulario from '../views/projects/MeuFormulario.vue'
import Lista from '../views/projects/MinhaLista.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },  
    {
        path: '/projetos',
        component: Projetos,
        children: [

            {
                path: '',
                name: 'Projetos',
                component: Lista
            },
            {
                path: 'novo',
                name: 'Novo projeto',
                component: Formulario
            },
            {
                path: ':id',
                name: 'Editar projeto',
                component: Formulario,
                props: true //injeta como uma props
            }
        ]
    }

];
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

export default router;