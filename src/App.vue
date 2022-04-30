<template>
  <header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 d-flex bg-dark p-4 space-between">
          <div class="Home">
            <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
              <div class="d-flex align-items-center">
                <i class="mdi mdi-account-cowboy-hat ms-1"></i>
                <p class="p-0 m-0 ms-2">Get on Home</p>
              </div>
            </router-link>
          </div>

          <div class="search d-flex align-items-start">
            <p class="p-2">Search:</p>
            <input />
          </div>
        </div>
      </div>
    </div>
  </header>
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

.profileimg {
  padding: 2em;
  border-radius: 50%;
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
}
.postimg {
  padding: 2em;
  max-width: 100%;
  object-fit: cover;
}

.float {
  height: 3em;
  position: fixed;
  left: 3em;
  bottom: 3em;
}
</style>
