<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>

      <div class="field">
        <button class="button" type="submit">salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  NOTIFICAR,
} from "@/store/tiposMutacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: "MeuFormulario",
  props: {
    id: {
      type: String,
    },
  },
  //Ao ser montado
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        (proj) => proj.id == this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  },
  data() {
    return {
      nomeDoProjeto: "",
    };
  },

  methods: {
    salvar() {
      if (this.id) {
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        });
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
      }
      this.nomeDoProjeto = "";
      this.$router.push("/projetos");
    },
    notificar (){
      this.store.commit(NOTIFICAR, {
        titulo: "Novo projeto já foi salvo",
        texto: "Prontinho ;) seu projeto já está disponível.",
         tipo: TipoNotificacao.SUCESSO,
      });
    }

  },
  //Vuex
  setup() {
    const store = useStore();
    return {
      store, //access to the store
    };
  },
});
</script>

