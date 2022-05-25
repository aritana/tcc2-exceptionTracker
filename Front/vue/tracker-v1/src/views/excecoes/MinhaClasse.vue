k<template>
  <section>
    <router-link to="/" class="button">
      <span class="icon-is-small">
        <i class="fa-solid fa-arrow-left"></i>
      </span>
      <span>Voltar</span>
    </router-link>

    <router-link to="/excecoes/classe" class="button">
      <span class="icon-is-small">
        <i class="fa-solid fa-file-code"></i>
      </span>
      <span>Ver Classe</span>
    </router-link>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Classe de onde o erro foi progapado inicialmente</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ monitoraClasse[0].classe }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts" >
import { computed, defineComponent, ref, watchEffect } from "vue";
import { useStore } from "@/store";
import { OBTER_EXCECOES, REMOVER_PROJETO } from "@/store/tipo-acoes";
import IClasse from "@/interfaces/IClasse";

export default defineComponent({
  name: "MinhaLista",
  props: {
    traceId: {
      type: String,
    },
  },

  computed: {
    monitoraClasse(): IClasse | undefined {
      return this.store.state.classe;
    },
  },
  //Vuex
  setup(props) {
    // monta a store

    const store = useStore();
    //const getTraceId = props.traceId;

    return {
      classe: computed(() => store.state.classe),

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
</style>