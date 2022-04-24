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
import { computed, defineComponent } from "vue";
import Temporizador from "./MeuTemporizador.vue";
import { useStore } from 'vuex'
import { key } from '@/store'


export default defineComponent({
  name: "MeuFormulario",
  emits: ["aoSalvarTarefa"],
  components: {
    Temporizador,
  },

  data() {
    return {
      descricao: '', //linkado com o v-model que o usuario digitou
      idProjeto: '',
    };
  }, //estados

  methods: {
    salvarTarefa(tempoDecorrido: number): void {
      this.$emit("aoSalvarTarefa", {
        duracaoEmSegudos: tempoDecorrido,
        descricao: this.descricao,
        projeto: this.projetos.find(proj => proj.id == this.idProjeto)
      });

      this.descricao = "";
    }
  },
    setup() {
      const store = useStore(key)
      return {
        projetos: computed(() => store.state.projetos)
      }
    }
  
});

//estilo nao escopado para transmitir para os componentes filhos
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>