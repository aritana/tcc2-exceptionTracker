import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store,useStore as vuexUseStore } from "vuex";



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
        }
    }
})

 export function useStore(): Store<Estado> {
     return vuexUseStore(key)
 }