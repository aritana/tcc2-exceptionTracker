import IProjeto from "@/interfaces/IProjeto";
import { INotificacao } from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tiposMutacoes";




interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}
//configurar chave de acesso

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
    },
    //add sutff in the state
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) { //sobrepor
            state.projetos = state.projetos.filter(proj => proj.id != id)

        },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {

            novaNotificacao.id = new Date().getTime(),
                state.notificacoes.push(novaNotificacao),
                //removeu a notificacao que foi adicionada
                setTimeout(() => {
                    state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
                }, 2000)

        }


    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}