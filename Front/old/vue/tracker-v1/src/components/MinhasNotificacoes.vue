<template>
  <div class="notificacoes">
    <article
      class="message"
      :class="contexto[notificacao.tipo]"
      v-for="notificacao in notificacoes"
      :key="notificacao.id"
    >
      <div class="message-header">
        <p>{{ notificacao.titulo }}</p>
      </div>

      <div class="message-body">{{ notificacao.texto }}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: "MinhasNotificacoes",
  data() {
    return {
      contexto: {
        [TipoNotificacao.SUCESSO]: "is-success",
        [TipoNotificacao.ATENCAO]: "is-warning",
        [TipoNotificacao.FALHA]: "is-danger",
      },
    };
  },
  //Vuex
  setup() {
    const store = useStore();
    return {
      notificacoes: computed(() => store.state.notificacoes), //access to the store
    };
  },
});
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 20%;
  padding: 8px;
  z-index: 1;
}
</style>

