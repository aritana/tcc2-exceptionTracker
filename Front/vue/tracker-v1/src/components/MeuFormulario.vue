<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-6"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <!-- Vmodel: linkar com o estado, a descricao da tarefa -->

      <div class="column is-2">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <!-- recebe o valor emitido  -->
        <temporizador @aoTemporizadorFinalizado="salvarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Temporizador from "./MeuTemporizador.vue";
import { useStore } from "vuex";
import { key } from "@/store";
import IProjeto from "@/interfaces/IProjeto";

export default defineComponent({
  name: "MeuFormulario",
  emits: ["aoSalvarTarefa"],
  components: {
    Temporizador,
  },

  setup(props, { emit }) {
    //vuex
    const store = useStore(key);
    const descricao = ref(""); //ref de string
    const idProjeto = ref("");
    const projetos = computed(() => store.state.projeto.projetos);

    const salvarTarefa = (tempoDecorrido: number): void => {
      emit("aoSalvarTarefa", {
        duracaoEmSegudos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find(
          (proj: IProjeto) => proj.id == idProjeto.value
        ),
      });

      descricao.value = "";
    };

    return {
      projetos,
      descricao, //como se descricao:descricao, mesmo nome, ignora esse passo
      idProjeto,
      salvarTarefa,
    };
  },
});

//estilo nao escopado para transmitir para os componentes filhos
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>