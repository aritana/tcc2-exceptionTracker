import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";



interface Estado {
    projetos: IProjeto[]
}
//configurar chave de acesso

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: []
    },
    //add sutff in the state
    mutations: {
        'ADICIONA_PROJETO'(state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        'ALTERA_PROJETO'(state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        "EXCLUIR_PROJETO"(state, id: string) { //sobrepor
            state.projetos = state.projetos.filter(proj => proj.id != id)

        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}