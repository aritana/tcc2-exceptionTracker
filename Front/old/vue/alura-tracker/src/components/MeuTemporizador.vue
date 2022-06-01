<template>
  <div class="is-flex is-align-items-center is-justify-content-space-evenly">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />

    <Botao @AoBotaoClicado="iniciar" :desabilitado="cronometroRodando" :texto="play" :iconeClasse=classeIcone1 />
    <Botao @AoBotaoClicado="finalizar" :desabilitado="!cronometroRodando" :texto="stop" :iconeClasse=classeIcone2 />

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./MeuCronometro.vue";
import Botao from "./MeuBotao.vue";

export default defineComponent({
  name: "MeuTemporizador",
  emits: ["aoTemporizadorFinalizado"], //emite um evento
  components: { Cronometro, Botao },

  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      classeIcone1:'fas fa-play',
      classeIcone2:'fas fa-stop',
      cronometroRodando: false,
      play:'play',
      stop:'stop'
    };
  },

  methods: {
    iniciar():void {
      //começar a contagem
      //1 seg = 1000 ms
      this.cronometro = setInterval(() => {
        //retorna id do intervalo
        this.tempoEmSegundos += 1;
      }, 1000);

      (this.cronometroRodando = true), console.log("iniciando");
    },

    finalizar():void{
      console.log("finalizando");
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      //emit evento,
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos); //nome e payload para emitir
      //reset
      this.tempoEmSegundos = 0;
    }
  },
});
</script>

<style scoped>
</style>
