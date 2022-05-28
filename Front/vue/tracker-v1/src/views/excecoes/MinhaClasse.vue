k<template>
  <section>
    <router-link to="/" class="button">
      <span class="icon-is-small">
        <i class="fa-solid fa-arrow-left"></i>
      </span>
      <span>Voltar</span>
    </router-link>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>
            Link do Git Hub para exibição da classe de onde o erro foi progapado
            inicialmente:
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <a v-bind:href="`${pegarPathGithubException}`" target="_blank">
              {{ pegarPathGithubException }}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts" >
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import IClasse from "@/interfaces/IClasse";
import IException from "@/interfaces/IException";

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
    pegarPathGithubException(): string | undefined {
      const ex = this.store.state.exceptions.find(
        (ex: IException) => ex.traceId == this.$route.params.id
      );
      const pathGithub = ex?.path;
      return pathGithub;
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

/* unvisited link */
a:link {
  color: red;
}

/* visited link */
a:visited {
  color: green;
}

/* mouse over link */
a:hover {
  color: hotpink;
}

/* selected link */
a:active {
  color: blue;
}
</style>