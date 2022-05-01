<template>
  <div class="postmaker w-100 d-flex align-items-center">
    <img class="profileimg" :src="account.picture" title="profilepic" />
    <form @submit.prevent="createPost" class="w-100 p-3">
      <div class="form-group m-2">
        <label for="image url" class="text-primary py-2">Image Url:</label>
        <input
          type="url"
          class="form-control"
          v-model="newPost.imgUrl"
          id="image"
          placeholder="url"
        />
      </div>

      <div class="form-group m-2">
        <label for="body" class="text-primary py-2">What is up?</label>
        <textarea
          class="form-control"
          id="body"
          v-model="newPost.body"
          rows="3"
          placeholder="Your message to the world wide web..."
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary text-dark m-2">Post</button>
    </form>
  </div>
</template>


<script>
import { computed, ref, watchEffect } from "@vue/runtime-core";
import { postsService } from "../services/PostService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
export default {
  setup() {
    const newPost = ref({});
    return {
      newPost,
      async createPost() {
        try {
          // const createdPost = await postService.createPost()
          await postsService.createPost(newPost.value);
          newPost.value = {};
          Pop.toast("New post!", "success");
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      account: computed(() => AppState.account),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>