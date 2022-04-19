<template>

  <button class="button" @click="emitirClick" :disabled="desabilitado">
    <span class="icon">
      <i :class="iconeClasse"></i>
    </span>
    <span>{{ texto }}</span>
  </button>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MeuBotao",
  emits: ["AoBotaoClicado"], //emite um evento

  props: {
    //onde importamos proprs
    desabilitado: {
      type: Boolean,
      default: false,
    },
    texto: {
      type: String,
      default: "",
    },
    iconeClasse: {
      type: String,
      default: "fas fa-stop",
    },
  },
  methods: {
    emitirClick() {
      this.$emit("AoBotaoClicado"); //nome e payload para emitir
      console.log(this.texto);
    },
  },
});
</script>


<style scoped>
</style>