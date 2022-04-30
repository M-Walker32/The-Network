<template>
  <div class="container">
    <div class="row">
      <div class="col-4 bg-primary">
        <img class="profileimg" :src="profile.picture" />
        <div class="w-75 text-wrap">
          <h1>Name: {{ profile.name }}</h1>
          <div v-if="profile.class">
            <h2>Class: {{ profile.class }}</h2>
          </div>
          <div v-if="profile.bio">
            <p>
              {{ profile.bio }}
            </p>
          </div>
          <div class="d-flex">
            <div v-if="profile.github">
              <i
                @click="gitGit(profile.github)"
                class="selectable mdi mdi-github"
              >
              </i>
            </div>
            <div v-if="profile.linkedin">
              <i
                @click="getLinked(profile.linkedin)"
                class="mdi mdi-linkedin"
              ></i>
            </div>
            <div v-if="profile.graduated">
              <i class="mdi mdi-school"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8">
        <img class="profilecoverimg w-100" :src="profile.coverImg" alt="" />
        <Post v-for="p in posts" :key="p.id" :post="p" />
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
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        // I'm not sure if this is the correct params
        await postsService.getByQuery(route.params.id);
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
      // route,
      gitGit(git) {
        window.open(git);
      },
      getLinked(link) {
        window.open(link);
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.profileimg {
  padding: 2em;
  border-radius: 50%;
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
}
.profilecoverimg {
  object-fit: cover;
  object-position: center;
  height: 200px;
  width: 100%;
  background-repeat: repeat;
}
</style>