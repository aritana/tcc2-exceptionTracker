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
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { CADASTRAR_PROJETOS, ALTERAR_PROJETO } from "@/store/tipo-acoes";

export default defineComponent({
  name: "MeuFormulario",
  props: {
    id: {
      type: String,
    },
  },

  //mixins: [notificacaoMixin], //trocado por um hook
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
        this.store
          .dispatch(ALTERAR_PROJETO, {
            //antes era commit, mas mudou pra back
            id: this.id,
            nome: this.nomeDoProjeto,
          })
          .then(() => this.lidarComSucesso());
      } else {
        this.store
          .dispatch(CADASTRAR_PROJETOS, this.nomeDoProjeto)
          .then(() => this.lidarComSucesso());
      }
    },
    lidarComSucesso() {
      this.nomeDoProjeto = "";
      this.notificar(
        TipoNotificacao.SUCESSO,
        "Excelente",
        "O projeto foi cadastrado com sucesso"
      );
      this.$router.push("/projetos");
    },
  },
  //Vuex
  setup() {
    const store = useStore();
    const { notificar } = useNotificador(); //hook

    return {
      store, //access to the store
      notificar,
    };
  },
});
</script>

