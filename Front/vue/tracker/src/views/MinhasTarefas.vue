<template>
  <formulario @aoSalvarTarefa="salvarTarefa" />

  <div class="lista">
    <meu-box v-if="listaEstaVazia">
      Você está muito produtivo hoje? :)
    </meu-box>

    <tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />

    <div
      class="modal"
      :class="{ 'is-active': tarefaSelecionada }"
      v-if="tarefaSelecionada"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma tarefa</p>
          <button
            @click="fecharModal"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label"> Descrição </label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="descricaoDaTarefa"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="alterarTarefa" class="button is-success">
            Salvar alterações
          </button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ITarefa from "@/interfaces/ITarefa";
import { useStore } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";
import { computed, defineComponent } from "vue";
import MeuBox from "../components/MeuBox.vue";
import Formulario from "../components/MeuFormulario.vue";
import Tarefa from "../components/MinhaTarefa.vue";

export default defineComponent({
  components: { Formulario, Tarefa, MeuBox },
  name: "App",
  data() {
    //trabalhar com o modal do buma

    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null; //sem tarefas
    },
    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length == 0;
    },
  },
  setup() {
    // monta a store
    const store = useStore();
    store.dispatch(OBTER_TAREFAS); //axion, acao
    store.dispatch(OBTER_PROJETOS); //axion, acao
    return {
      tarefas: computed(() => store.state.tarefas),
      store,
    };
  },
});
</script>