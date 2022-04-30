<template>
  <div class="postmaker w-100 d-flex align-items-center">
    <img
      class="profileimg"
      src="http://thiscatdoesnotexist.com"
      title="profilepic"
    />
    <form @submit.prevent="createPost" class="w-100 p-3">
      <div class="form-group m-2">
        <label for="image url">Image Url:</label>
        <input
          type="url"
          class="form-control"
          v-model="newPost.imgUrl"
          id="image"
          placeholder="url"
        />
      </div>

      <div class="form-group m-2">
        <label for="body">What is up?</label>
        <textarea
          class="form-control"
          id="body"
          v-model="newPost.body"
          rows="3"
          placeholder="Your message to the internets goes here..."
        ></textarea>
      </div>
      <button type="submit" class="">Post</button>
    </form>
  </div>
</template>


<script>
import { ref, watchEffect } from "@vue/runtime-core";
import { postsService } from "../services/PostService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
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
    };
  },
};
</script>


<style lang="scss" scoped>
</style>