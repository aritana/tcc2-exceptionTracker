<template>
  <header>
    <h1>
      <img src="../assets/etracker.png" alt="logotipo da pagina" />
    </h1>
    <div class="has-text-centered">
      <button class="button" @click="alterarTema">{{ textoBotao }}</button>
    </div>

    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            exceptions
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>


<!--exportar componente-->

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BarraLateral",
  emits: ["aoTemaAlterado"],
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },
  computed: {
    textoBotao() {
      if (this.modoEscuroAtivo) {
        return "claro";
      }
      return "escuro";
    },
  },
  methods: {
    alterarTema() {
      (this.modoEscuroAtivo = !this.modoEscuroAtivo),
        this.$emit("aoTemaAlterado", this.modoEscuroAtivo);
    },
  },
});
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 200vh;
  text-align: center;
}

/* mobile */
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: 100vh;
  }
}

.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover {
  color: #faf0ca;
}
.link.router-link-active {
  color: #faf0ca;
}
</style>