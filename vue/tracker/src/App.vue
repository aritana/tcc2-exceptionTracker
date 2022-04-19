<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro' : modoEscuroAtivo}">
    <div class="column is-1">
      <barra-lateral @aoTemaAlterado="trocarTema" />
    </div>

    <div class="column is-11 conteudo">
      <formulario @aoSalvarTarefa="salvarTarefa" />

      <div class="lista">
        <tarefa
          v-for="(tarefa, index) in tarefas"
          :key="index"
          :tarefa="tarefa"
        />

        <meu-box v-if="listaEstaVazia">
          Você está muito produtivo hoje? :)
        </meu-box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import MeuBox from "./components/MeuBox.vue";
import Formulario from "./components/MeuFormulario.vue";
import Tarefa from "./components/MinhaTarefa.vue";
import ITarefa from "./interfaces/ITarefa";

export default defineComponent({
  components: { BarraLateral, Formulario, Tarefa, MeuBox },
  name: "App",
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo:false
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
    trocarTema(modoEscuroAtivo:boolean){
      this.modoEscuroAtivo = modoEscuroAtivo
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}
.conteudo{
  background-color: var(--bg-primario);
}
</style>
