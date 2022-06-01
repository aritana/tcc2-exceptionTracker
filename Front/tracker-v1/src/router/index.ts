import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from "../views/MinhasTarefas.vue";
import MinhasExcecoes from "../views/MinhasExcecoes.vue";
import Excecao from "../views/excecoes/MinhaExcecao.vue";
import Classe from "../views/excecoes/MinhaClasse.vue";
import Grafo from "../views/MeuGrafo.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tarefas",
    component: Tarefas,
  },
  {
    path: "/excecoes",
    component: MinhasExcecoes,
    children: [
      {
        path: ":id",
        name: "Excecao",
        component: Excecao,
      },
      {
        path: "classe/:id",
        name: "Classe",
        component: Classe,
      },
    ],
  },
  {
    path: "/graph",
    name: "Grafo",
    component: Grafo,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
