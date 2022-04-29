<template>
  <header></header>
  <main>
    <router-view />
    <button
      class="float btn btn-primary align-items-center justify-content-center"
    >
      <Login />
    </button>
  </main>
  <footer></footer>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.float {
  height: 3em;
  position: fixed;
  left: 3em;
  bottom: 3em;
}
</style>
