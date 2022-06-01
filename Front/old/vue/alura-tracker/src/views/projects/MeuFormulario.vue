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
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { CADASTRAR_PROJETOS, ALTERAR_PROJETO } from "@/store/tipo-acoes";
import IProjeto from "@/interfaces/IProjeto";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MeuFormulario",
  props: {
    id: {
      type: String,
    },
  },

  //mixins: [notificacaoMixin], //trocado por um hook
  //Ao ser montado
  /*
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projeto.projetos.find(
        (proj: IProjeto) => proj.id == this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  }, //tratado no set up
*/

  /* data() {
    return {
      nomeDoProjeto: "", //estado local
    };
  },*/

  //Vuex
  setup(props) {
    //dentro do setup nao existe this

    const router = useRouter();
    const store = useStore();
    const nomeDoProjeto = ref(""); //referencia para string, variavel reativa, hook

    const { notificar } = useNotificador(); //hook
    if (props.id) {
      //linha 31
      const projeto = store.state.projeto.projetos.find(
        (proj: IProjeto) => proj.id == props.id
      );
      nomeDoProjeto.value = projeto?.nome || "";
    }
    const lidarComSucesso = () => {
      nomeDoProjeto.value = "";
      notificar(
        TipoNotificacao.SUCESSO,
        "Excelente",
        "O projeto foi cadastrado com sucesso"
      );
      router.push("/projetos");
    };
    const salvar = () => {
      if (props.id) {
        store
          .dispatch(ALTERAR_PROJETO, {
            //antes era commit, mas mudou pra back
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => lidarComSucesso());
      } else {
        store
          .dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
          .then(() => lidarComSucesso());
      }
    };
    return {
      //usar no componente
      nomeDoProjeto,
      salvar,
    };
  },
});
</script>

