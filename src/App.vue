<template>
  <header>
    <div class="container-fluid">
      <div class="row">
        <div class="d-flex bg-primary p-4 space-between">
          <div class="Home col-6">
            <router-link
              class="navbar-brand text-dark d-flex"
              :to="{ name: 'Home' }"
              @click="clearParams"
            >
              <div class="d-flex align-items-center">
                <i class="mdi mdi-account-cowboy-hat ms-1"></i>
                <p class="p-0 m-0 ms-2">Get on Home</p>
              </div>
            </router-link>
          </div>
          <div class="col-6 d-flex">
            <Billboard v-for="b in billboards" :key="b.id" :billboard="b" />
          </div>
        </div>
      </div>
    </div>
  </header>
  <main>
    <router-view />
    <div class="float">
      <Login />
    </div>
  </main>
  <footer></footer>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "./AppState";
import { logger } from "./utils/Logger.js";
import { postsService } from "./services/PostService.js";
import Pop from "./utils/Pop.js";
import { adsService } from "./services/AdsService.js";
export default {
  name: "App",
  setup() {
    onMounted(async () => {
      try {
        await adsService.getBills();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      appState: computed(() => AppState),
      billboards: computed(() => AppState.billboards),
      async clearParams() {
        await postsService.clearParams();
      },
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
