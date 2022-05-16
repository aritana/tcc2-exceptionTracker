<template>
  <!-- <formulario @aoSalvarTarefa="salvarTarefa" /> -->

  <div class="lista">
    <meu-box v-if="listaEstaVazia">
      Você está muito produtivo hoje? :)
    </meu-box>

    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Digite para filtrar"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>

    <!-- <tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    /> -->

    <exception
      v-for="(exception, index) in exceptions"
      :key="index"
      :exception="exception"
      @aoExceptionClicada="selecionarTarefa"
    />
    <MeuModal :mostrar="tarefaSelecionada != null">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editando uma tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </template>

      <template v-slot:corpo>
        <div class="field">
          <label for="descricaoDaTarefa" class="label"> Descrição </label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="descricaoDaTarefa"
          />
        </div>
      </template>

      <template v-slot:rodape>
        <button @click="alterarTarefa" class="button is-success">
          Salvar alterações
        </button>
        <button @click="fecharModal" class="button">Cancelar</button>
      </template>
    </MeuModal>
  </div>
</template>

<script lang="ts">
import ITarefa from "@/interfaces/ITarefa";
import IException from "@/interfaces/IException";
import { useStore } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  OBTER_EXCECOES
} from "@/store/tipo-acoes";
import { computed, defineComponent, ref, watchEffect } from "vue";
import MeuBox from "../components/MeuBox.vue";
//import Tarefa from "../components/MinhaTarefa.vue";
import Exception from "../components/MinhaException.vue";
import MeuModal from "../components/MeuModal.vue";

export default defineComponent({
  components: { MeuBox, MeuModal,Exception },
  name: "App",
  data() {
    //trabalhar com o modal do buma

    return {    
      exceptionSelecionada: null as IException | null,
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      //this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
    //  this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
    //  this.tarefaSelecionada = null; //sem tarefas
    },
    alterarTarefa() {
     // this.store
    //    .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
     //   .then(() => this.fecharModal());
    },
    selecionarExcecao(exception: IException) {
      this.exceptionSelecionada = exception;
    },
  },
  computed: {
  //  listaEstaVazia(): boolean {
  //    return this.tarefas.length == 0;
  //  },
  },
  setup() {
    // monta a store
    const store = useStore();
    store.dispatch(OBTER_TAREFAS); //axion, acao
    store.dispatch(OBTER_PROJETOS);
    store.dispatch(OBTER_EXCECOES);

    const filtro = ref("");

    //para aplicar filtros no back end, reagir a operacoes
    watchEffect(() => {
      console.log(filtro.value);
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {  
      exceptions: computed(() => store.state.exceptions),
      store,
      filtro,
    };
  },
});
</script>