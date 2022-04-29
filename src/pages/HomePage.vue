<template>
  <div class="container">
    <div class="row">
      <!-- Create a post compnenet, write v-for loop, grap posts from api -->
      <Post v-for="p in posts" :key="p.id" :post="p" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";
import { postsService } from "../services/PostService.js";

export default {
  name: "Home",
  setup() {
    // place setup items
    onMounted(async () => {
      try {
        // call to server and retreive all posts
        await postsService.getAll();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      // return stuff here
      posts: computed(() => AppState.posts),
    };
  },
};
</script>

<style scoped lang="scss">
</style>
