<template>
  <div class="d-flex col-12 rounded border-dark w-100 mt-4 bg-light" id="Post">
    <div class="row">
      <div class="col-3">
        <img
          class="p-4 rounded-circle img-fluid w-100"
          :src="post.creator.picture"
        />
      </div>
      <div class="p-4 col-8">
        <h5 class="selectable" @click="goToProfile">
          {{ post.creator.name }}
        </h5>
        <div class="text-end" v-if="post.creatorId == account.id">
          <i class="mdi mdi-delete selectable" @click="deletePost()"></i>
        </div>
        <small class="muted ms-2">{{ post.createdAt }}</small>
        <img class="postimg" :src="post.imgUrl" />
        <p class="m-0 p-0">{{ post.body }}</p>
        <!-- here is the like button -->
        <h5>
          {{ post.likes.length
          }}<i class="mdi mdi-cash-100 selectable" @click="likePost()"></i>
        </h5>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { postsService } from "../services/PostService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    return {
      // post: computed(() => AppState.post), - this would mess up the get posts by id
      goToProfile() {
        // do i need to pass the account too?, look for an example where two params were passed
        router.push({ name: "Profile", params: { id: props.post.creatorId } });
      },
      async deletePost() {
        try {
          if (await Pop.confirm()) {
            // is there a reason my route.params.id would now work? it's grabbing the route, the route params, and the id
            // I think i need to pass the creatorId since I'm coming from the post instead of the 'carPage' equivaliant
            await postsService.deletePost(props.post.id);
            Pop.toast("Delorted!", "success");
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async likePost() {
        try {
          await postsService.likePost(route.params.id);
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