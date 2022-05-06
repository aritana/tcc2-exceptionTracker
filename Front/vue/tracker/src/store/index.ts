import IProjeto from "@/interfaces/IProjeto";
import { INotificacao } from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  ADICIONAR_TAREFA,
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  DEFINIR_PROJETOS,
  DEFINIR_TAREFAS,
  EXCLUIR_PROJETO,
  NOTIFICAR,
} from "./tiposMutacoes";
import {
  ALTERAR_PROJETO,
  CADASTRAR_PROJETOS,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  REMOVER_PROJETO,
} from "./tipo-acoes";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";

//vuex

interface Estado {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
  tarefas: ITarefa[];
}
//configurar chave de acesso

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    //estado inicial
    projetos: [],
    notificacoes: [],
    tarefas: [],
  },
  //add sutff in the state
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;
      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id == projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO](state, id: string) {
      //sobrepor
      state.projetos = state.projetos.filter((proj) => proj.id != id);
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      //mutation para pegar projeto do back
      state.projetos = projetos;
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      //mutation para pegar projeto do back
      state.tarefas = tarefas;
    },
    [ADICIONAR_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      (novaNotificacao.id = new Date().getTime()),
        state.notificacoes.push(novaNotificacao),
        //removeu a notificacao que foi adicionada
        setTimeout(() => {
          state.notificacoes = state.notificacoes.filter(
            (notificacao) => notificacao.id != novaNotificacao.id
          );
        }, 2000);
    },
  }, //nao posso fazer operacoes assincronas nas mutations, para vuex, utilizo, actions

  actions: {
    [OBTER_PROJETOS]({ commit }) {
      //commit, quando resolver a requisicao, eu altero o estado
      http
        .get("projetos")
        .then((resposta) => commit(DEFINIR_PROJETOS, resposta.data)); //Mutacao e dados
    },
    [CADASTRAR_PROJETOS](contexto, nomeDoProjeto: string) {
      return http.post("projetos", { nome: nomeDoProjeto }); //retorna a promessa para validar a mensagem de sucesso
    },
    [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
      return http.put(`projetos/${projeto.id}`, projeto);
    },
    [REMOVER_PROJETO]({ commit }, id: string) {
      //commit de uma mutation
      return http
        .delete(`projetos/${id}`)
        .then(() => commit(EXCLUIR_PROJETO, id));
    },
    [OBTER_TAREFAS]({ commit }) {
      //commit, quando resolver a requisicao, eu altero o estado
      http
        .get("tarefas")
        .then((resposta) => commit(DEFINIR_TAREFAS, resposta.data)); //Mutacao e dados
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: string) {
      return http
        .post("tarefas", tarefa)
        .then((resposta) => commit(ADICIONAR_TAREFA, resposta.data)); //ja salva o estado
    },
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
