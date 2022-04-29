<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 d-flex bg-dark p-4">
        <p>header with search input</p>
        <input />
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-4 bg-primary">
          <img
            class="p-4 rounded-circle h-25"
            src="http://thiscatdoesnotexist.com"
          />
          <h1>Name: {{ profile.name }}</h1>
          <!-- <h2>Class: {{ profile.class }}</h2> -->
          <p>
            <!-- {{ profile.bio }} -->
          </p>
          <i class="selectable mdi mdi-github"> </i>
          <i class="mdi mdi-linkedin"></i>
          <!-- create ternary to show if graduated -->
          <!-- <div v-if="profile.graduated"> -->
          <i class="mdi mdi-school"></i>
          <!-- </div> -->
        </div>
        <div class="col-8">
          <img class="w-100 h-25" src="http://thiscatdoesnotexist.com" alt="" />
          <!-- put in profile deatils here -->
          <p>profile posts go here</p>
          <Post v-for="p in posts" :key="p.id" :post="p" />
          <!-- this will need to be filtered to just this users posts -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { profilesService } from "../services/ProfileService.js";
import { AppState } from "../AppState.js";
import { postsService } from "../services/PostService.js";

export default {
  // components: { Post },
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await postsService.getByQuery({ creatorId: route.params.id });
        // logger.log(route.params.id);
        await profilesService.getProfile(route.params.id);
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.searchResults),
      account: computed(() => AppState.account),
      route,
    };
  },
};
</script>


<style lang="scss" scoped>
</style>