<template>
  <div class="excecoes">
    <h1 class="title">excecoes</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MinhasExcecoes",
});
</script>

<style scoped>
.excecoes {
  padding: 1.25rem;
}
</style>
