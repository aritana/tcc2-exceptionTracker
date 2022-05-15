import { INotificacao } from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  ADICIONAR_TAREFA,
  ALTERA_TAREFA,
  DEFINIR_TAREFAS,
  NOTIFICAR,
} from "./tiposMutacoes";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "./tipo-acoes";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { EstadoProjeto, projeto } from "./modulos/projeto";

export interface Estado {
  notificacoes: INotificacao[];
  tarefas: ITarefa[];
  projeto: EstadoProjeto;
}
//configurar chave de acesso

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    //estado inicial
    notificacoes: [],
    tarefas: [],
    projeto: {
      projetos: [],
    },
  },
  //add sutff in the state
  mutations: {
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      //mutation para pegar projeto do back
      state.tarefas = tarefas;
    },
    [ADICIONAR_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((t) => t.id == tarefa.id);
      state.tarefas[index] = tarefa;
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
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      //commit, quando resolver a requisicao, eu altero o estado

      let url = "tarefas";

      if (filtro) {
        url += "?descricao=" + filtro;
      }

      http.get(url).then((resposta) => commit(DEFINIR_TAREFAS, resposta.data)); //Mutacao e dados
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: string) {
      return http
        .post("tarefas", tarefa)
        .then((resposta) => commit(ADICIONAR_TAREFA, resposta.data)); //ja salva o estado
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      //acao commita a mutacao
      return http
        .put(`tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa)); //ja salva o estado
      // .then((resposta) => commit(ALTERA_TAREFA, tarefa)); //ja salva o estado
    },
  },
  modules: {
    projeto,
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
