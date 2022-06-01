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
          placeholder="Digite para filtrar por TraceId"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>

    <div class="box" :style="estilos">
      <div class="columns">
        <div class="column is-2">
          <strong>TraceId</strong>
        </div>
        <div class="column is-2">
          <strong>Service</strong>
        </div>
        <div class="column is-3">
          <strong>Id</strong>
        </div>
        <div class="column">
          <strong>Exception</strong>
        </div>
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
        <p class="modal-card-title">Causa Raiz</p>
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
import IException from "@/interfaces/IException";
import { useStore } from "@/store";
import { OBTER_EXCECOES, OBTER_CLASSE } from "@/store/tipo-acoes";
import { computed, defineComponent, ref } from "vue";
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
    fecharModal() {
      this.exceptionSelecionada = null;
    },
    verCausaRaiz() {
      this.$router.push(`/excecoes/${this.exceptionSelecionada?.traceId}`);
      this.fecharModal();
    },
    selecionarExcecao(exception: IException) {
      this.exceptionSelecionada = exception;
    },
  },
  setup() {
    // monta a store
    const store = useStore();
    store.dispatch(OBTER_EXCECOES);

    const filtro = ref("");

    let exceptions = computed(() =>
      store.state.exceptions.filter(
        (ex) => !filtro.value || ex.traceId.includes(filtro.value)
      )
    );
    return {
      exceptions,
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
