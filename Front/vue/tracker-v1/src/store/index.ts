import { INotificacao } from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  ADICIONAR_TAREFA,
  ALTERA_TAREFA,
  DEFINIR_TAREFAS,
  NOTIFICAR,
  DEFINIR_EXCECOES,
  DEFINIR_CLASSE,
} from "./tiposMutacoes";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_TAREFAS,
  OBTER_EXCECOES,
  OBTER_CLASSE,
} from "./tipo-acoes";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import IException from "@/interfaces/IException";
import IClasse from "@/interfaces/IClasse";
import { EstadoProjeto, projeto } from "./modulos/projeto";

export interface Estado {
  notificacoes: INotificacao[];
  tarefas: ITarefa[];
  projeto: EstadoProjeto;
  exceptions: IException[];
  classe: IClasse;
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
    exceptions: [],
    classe: { classe: "" },
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
    [DEFINIR_EXCECOES](state, exceptions: IException[]) {
      //remove excecoes em causa
      state.exceptions = exceptions.filter(
        (exception) => exception.causedBy.length != 0
      );
    },
    [DEFINIR_CLASSE](state, classe: IClasse) {
      state.classe = classe;

      console.log("state.classe");
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
    [OBTER_EXCECOES]({ commit }, filtro: string) {
      //commit, quando resolver a requisicao, eu altero o estado

      let url = "exceptions";

      if (filtro) {
        url += "?descricao=" + filtro;
      }

      http.get(url).then((resposta) => commit(DEFINIR_EXCECOES, resposta.data)); //Mutacao e dados
    },
    [OBTER_CLASSE]({ commit }, filtro: string) {
      //commit, quando resolver a requisicao, eu altero o estado

      const url = "classe";

      if (filtro) {
        //  url += "?descricao=" + filtro;
      }

      http.get(url).then((resposta) => commit(DEFINIR_CLASSE, resposta.data)); //Mutacao e dados
    },
  },
  modules: {
    projeto,
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
