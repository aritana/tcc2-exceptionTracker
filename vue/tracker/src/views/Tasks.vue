<template>
  <formulario @aoSalvarTarefa="salvarTarefa" />

  <div class="lista">
    <tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />

    <meu-box v-if="listaEstaVazia">
      Você está muito produtivo hoje? :)
    </meu-box>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MeuBox from "../components/MeuBox.vue";
import Formulario from "../components/MeuFormulario.vue";
import Tarefa from "../components/MinhaTarefa.vue";
import ITarefa from "../interfaces/ITarefa";

export default defineComponent({
  components: {  Formulario, Tarefa, MeuBox },
  name: "App",
  data() {
    return {
      tarefas: [] as ITarefa[]
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
});
</script>