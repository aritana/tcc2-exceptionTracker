k<template>
  <section>
    <router-link to="/" class="button">
      <span class="icon-is-small">
        <i class="fa-solid fa-arrow-left"></i>
      </span>
      <span>Voltar</span>
    </router-link>

    <router-link
      :to="`/excecoes/classe/${this.$route.params.id}`"
      class="button"
    >
      <span class="icon-is-small">
        <i class="fa-solid fa-file-code"></i>
      </span>
      <span>Ver Classe</span>
    </router-link>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Causas</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cause in pegarException" :key="cause.length" class="last">
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
  computed: {
    pegarException(): string[] | undefined {
      const ex = this.store.state.exceptions.find(
        (ex: IException) => ex.traceId == this.$route.params.id
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

table,
th,
td {
  margin-top: 10px;
  border: 1px solid blue;
}

tr:last-child.last {
  background-color: greenyellow;
}
</style>