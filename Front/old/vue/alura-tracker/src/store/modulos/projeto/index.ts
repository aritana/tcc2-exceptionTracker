import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import {
  OBTER_PROJETOS,
  CADASTRAR_PROJETOS,
  ALTERAR_PROJETO,
  REMOVER_PROJETO,
} from "@/store/tipo-acoes";
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  EXCLUIR_PROJETO,
  DEFINIR_PROJETOS,
} from "@/store/tiposMutacoes";
import { Module } from "vuex";

export interface EstadoProjeto {
  projetos: IProjeto[];
}

//estado do modulo e estado global
export const projeto: Module<EstadoProjeto, Estado> = {
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
  },
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
  },
};
