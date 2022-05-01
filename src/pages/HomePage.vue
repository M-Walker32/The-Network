<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <!-- Create a new post -->
        <div v-if="account.id">
          <CreatePostForm />
        </div>
        <div class="bg-primary rounded m-3">
          <SearchForm />
        </div>
        <Post v-for="p in posts" :key="p.id" :post="p" />
      </div>
    </div>
  </div>
  <footer class="bg-primary mt-3 h-25 p-2 text-end">
    <Pager />
  </footer>
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
      account: computed(() => AppState.account),
    };
  },
};
</script>

<style scoped lang="scss">
.profileimg {
  padding: 2em;
  border-radius: 50%;
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
}
</style>
