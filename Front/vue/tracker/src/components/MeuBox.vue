<template>
  <!-- o slot serve para renderizar o qe eu coloquei dentro do componente  -->
  <div class="box has-text-weight-bold" :style="estilos">
    <slot> </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MeuBox",
  data() {
    return {
      estilos: {
        //camelCase
        backgroundColor: "#faf0ca",
      },
    };
  },
});
</script>
