k<template>
  <section>
    <router-link to="/" class="button">
      <span class="icon-is-small">
        <i class="fa-solid fa-arrow-left"></i>
      </span>
      <span>Voltar</span>
    </router-link>

    <router-link to="/classe" class="button">
      <span class="icon-is-small">
        <i class="fa-solid fa-file-code"></i>
      </span>
      <span>Ver Classe</span>
    </router-link>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Causa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cause in monitoraException" :key="cause.length" class="last">
          <td>{{ cause }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import { useStore } from "@/store";
import { OBTER_EXCECOES, REMOVER_PROJETO } from "@/store/tipo-acoes";
import IException from "@/interfaces/IException";

export default defineComponent({
  name: "MinhaLista",
  props: {
    traceId: {
      type: String,
    },
  },

  data() {
    return {
      exception: {
        _id: "627c5134af4e7201259d9a02",
        service: "fornecedorCidade",
        traceId: "102190a670ea42d9",
        exception:
          "alura.br.microservicesspringcloud.exception.NotFoundException: Sintaxe inválida",
        causedBy: [
          "java.util.NoSuchElementException: Classe não Encontrada - Class: ExceptionGenerator - Method: nullPointerExceptionExceptionInitCauseGenerator - Line: 53",
          "java.lang.NullPointerException - Class: ExceptionGenerator - Method: nullPointerExceptionExceptionInitCauseGenerator - Line: 50",
        ],
        path: "/home/aritana/Downloads/Cefet/cefet2021-b/Tcc1/code/tcc2-exceptionTracker/Back/microservices-spring-cloud/cloud-entregador-cidade/src/main/java/alura/br/microservicesspringcloud/service/ExceptionGenerator.java",
      },
    };
  },
  computed: {
    monitoraException(): string[] | undefined {
      const ex = this.store.state.exceptions.find(
        (ex: IException) => ex.traceId == "65a0da7b11716b5e"
      );
      const causedBy = ex?.causedBy;
      return causedBy;
    },
  },
  //Vuex
  setup(props) {
    // monta a store

    const store = useStore();
    store.dispatch(OBTER_EXCECOES);
    //const getTraceId = props.traceId;

    return {
      exceptions: computed(() => store.state.exceptions), //pega excecoes

      store,
    };
  },
});
</script>

<style scoped>
.button,
span {
  margin-left: 5px;
}

tr {
  border-color: blue;
  border: 1px solid;
}

tr:last-child.last {
  background-color: greenyellow;
}
</style>