<template>
  <form @submit.prevent="findPosts" class="w-100 p-2 rounded bg-primary">
    <div class="form-group d-flex align-items-center">
      <label for="search" class="sr-only"></label>
      <input
        v-model="query"
        type="text"
        name="search"
        required
        class="form-control bg-white"
        placeholder="search matching posts"
      />
      <button class="btn p-2" type="submit">
        <i class="mdi mdi-magnify"></i>
      </button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostService.js";
export default {
  setup() {
    const query = ref("");
    return {
      query,
      async findPosts() {
        try {
          await postsService.search(query.value);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>