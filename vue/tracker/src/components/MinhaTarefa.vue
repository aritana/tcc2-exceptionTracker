<template>
  <meu-box>
    <div class="columns">
      <div class="column is-4">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column">
        <meu-cronometro :tempoEmSegundos="tarefa.duracaoEmSegudos" />
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || "N/D" }}
      </div>
    </div>
  </meu-box>
</template>


<script lang="ts">
//PropType para o Object
import ITarefa from "@/interfaces/ITarefa";
import { defineComponent, PropType } from "vue";
import MeuBox from "./MeuBox.vue";
import MeuCronometro from "./MeuCronometro.vue";

export default defineComponent({
  components: { MeuCronometro, MeuBox },
  name: "MinhaTarefa",
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
});
</script>

<style scoped>
</style>
