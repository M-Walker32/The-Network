<template>
  <div class="col-12 d-flex rounded border-dark m-3 bg-light" id="Post">
    <img class="p-4 rounded-circle h-25" :src="post.creator.picture" />
    <div class="p-4">
      <h5 class="selectable" @click="goToProfile()">{{ post.creator.name }}</h5>
      <small class="muted">{{ post.createdAt }}</small>
      <p class="m-0 p-0">{{ post.body }}</p>
      <!-- here is the like button -->
      <h5>
        {{ post.likes.length }}<i class="mdi mdi-cash-100 selectable"></i>
      </h5>
    </div>
  </div>
</template>


<script>
import { router } from "../router.js";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      goToProfile() {
        router.push({ name: "Profile", params: { id: props.post.creatorId } });
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>