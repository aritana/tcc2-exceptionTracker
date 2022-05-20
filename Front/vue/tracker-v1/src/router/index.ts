import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from "../views/MinhasTarefas.vue";
import Projetos from "../views/MeusProjetos.vue";
import MinhasExcecoes from "../views/MinhasExcecoes.vue";

import Formulario from "../views/projects/MeuFormulario.vue";
import Excecao from "../views/excecoes/MinhaExcecao.vue";
import Classe from "../views/excecoes/MinhaClasse.vue";

import Lista from "../views/projects/MinhaLista.vue";
import Grafo from "../views/MeuGrafo.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tarefas",
    component: Tarefas,
  },
  {
    path: "/projetos",
    component: Projetos,
    children: [
      {
        path: "",
        name: "Projetos",
        component: Lista,
      },
      {
        path: "novo",
        name: "Novo projeto",
        component: Formulario,
      },
      {
        path: ":id",
        name: "Editar projeto",
        component: Formulario,
        props: true, //injeta como uma props
      },
    ],
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
        path: "classe",
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
