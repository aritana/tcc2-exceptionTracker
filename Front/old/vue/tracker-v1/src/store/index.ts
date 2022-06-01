import { INotificacao } from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  NOTIFICAR,
  DEFINIR_EXCECOES,
  EXCLUIR_EXCEPTION,
} from "./tiposMutacoes";
import { OBTER_EXCECOES, REMOVER_EXCEPTION } from "./tipo-acoes";
import http from "@/http";
import IException from "@/interfaces/IException";

export interface Estado {
  notificacoes: INotificacao[];
  exceptions: IException[];
}
//configurar chave de acesso

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    //estado inicial
    notificacoes: [],
    exceptions: [],
  },
  //add sutff in the state
  mutations: {
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
    [EXCLUIR_EXCEPTION](state, traceId: string) {
      //sobrepor
      state.exceptions = state.exceptions.filter((ex) => ex.traceId != traceId);
    },
  }, //nao posso fazer operacoes assincronas nas mutations, para vuex, utilizo, actions

  actions: {
    [OBTER_EXCECOES]({ commit }, filtro: string) {
      //commit, quando resolver a requisicao, eu altero o estado

      const url = "exceptions";
      http.get(url).then((resposta) => commit(DEFINIR_EXCECOES, resposta.data)); //Mutacao e
    },
    [REMOVER_EXCEPTION]({ commit }, traceId: string) {
      //commit de uma mutation
      return http
        .delete(`exceptions/traceid/${traceId}`)
        .then(() => commit(EXCLUIR_EXCEPTION, traceId));
    },
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
