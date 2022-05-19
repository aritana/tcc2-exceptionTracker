<template>
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

    <div class="box" :style="estilos">
      <div class="columns">
        <div class="column is-3">Id</div>
        <div class="column is-2">Service</div>
        <div class="column is-2">TraceId</div>
        <div class="column">Exception</div>
      </div>
    </div>

    <exception
      v-for="(exception, index) in exceptions"
      :key="index"
      :exception="exception"
      @aoExceptionClicada="selecionarExcecao"
    />

    <MeuModal :mostrar="exceptionSelecionada != null">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editando uma tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </template>

      <template v-slot:corpo>
        <div class="field">
          <label for="descricaoDaException" class="label"> TraceId </label>
          <input
            type="text"
            class="input"
            v-model="exceptionSelecionada.traceId"
            id="descricaoDaException"
          />
        </div>
      </template>

      <template v-slot:rodape>
        <button @click="verCausaRaiz" class="button is-success">
          Ver Causa Raiz
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
  OBTER_EXCECOES,
  OBTER_CLASSE,
} from "@/store/tipo-acoes";
import { computed, defineComponent, ref, watchEffect } from "vue";
import MeuBox from "../components/MeuBox.vue";
import Exception from "../components/MinhaException.vue";
import MeuModal from "../components/MeuModal.vue";

export default defineComponent({
  components: { MeuBox, MeuModal, Exception },
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
    fecharModal() {
      this.exceptionSelecionada = null; //sem tarefas
    },
    verCausaRaiz() {
      this.store.dispatch(OBTER_CLASSE, this.exceptionSelecionada).then(() => {
        this.fecharModal();
        this.$router.push("/graph");
      });
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
      estilos: {
        //camelCase
        backgroundColor: "#B0E0E6",
      },
    };
  },
});
</script>

