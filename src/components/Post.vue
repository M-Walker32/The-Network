<template>
  <div class="d-flex col-12 rounded border-dark w-100 mt-4 bg-light" id="Post">
    <div class="row">
      <div class="col-3">
        <router-link
          :to="{ name: 'ProfilePage', params: { id: post.creator.id } }"
        >
          <img
            class="p-4 rounded-circle img-fluid w-100"
            :src="post.creator.picture"
          />
        </router-link>
      </div>
      <div class="p-4 col-8">
        <div class="d-flex">
          <h5 class="text-secondary text-uppercase">
            {{ post.creator.name }}
          </h5>
          <div v-if="post.creatorId == account.id">
            <i class="mdi mdi-delete selectable" @click="deletePost()"></i>
          </div>
        </div>
        <small class="muted">Created on: {{ date }}</small>
        <img class="postimg col-12" :src="post.imgUrl" />
        <p class="m-0 p-0">{{ post.body }}</p>
        <!-- here is the like button -->
        <h5 v-if="account.id">
          {{ post.likes.length
          }}<i
            class="mdi mdi-cash-100 text-secondary selectable"
            @click="likePost(post)"
          ></i>
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
    const date = new Date(props.post.createdAt).toDateString();
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
      async likePost(post) {
        try {
          await postsService.likePost(post);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      date,
      account: computed(() => AppState.account),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>