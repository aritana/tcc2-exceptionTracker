<template>
  <meu-box>
    <div class="columns clicavel" @click="exceptionClicada">
      <div class="column is-2">
        {{ exception.traceId || "Exception sem microserviço vinculado" }}
      </div>
      <div class="column is-2">
        {{ exception.service || "Exception sem microserviço vinculado" }}
      </div>
      <div class="column is-3">
        {{ exception._id }}
      </div>
      <div class="column is-5">
        {{ exception.exception }}
      </div>
    </div>
  </meu-box>
</template>


<script lang="ts">
//PropType para o Object
import IException from "@/interfaces/IException";
import { defineComponent, PropType } from "vue";
import MeuBox from "./MeuBox.vue";

export default defineComponent({
  components: { MeuBox },
  name: "MinhaException",
  emits: ["aoExceptionClicada"],
  props: {
    exception: {
      type: Object as PropType<IException>,
      required: true,
    },
  },
  methods: {
    exceptionClicada(): void {
      this.$emit("aoExceptionClicada", this.exception); //emitr para lista de tarefas
    },
  },
});
</script>

<style scoped>
.clicavel {
  cursor: pointer;
}
</style>
