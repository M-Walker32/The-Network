<template>
  <div class="container-fluid">
    <div class="row">
      <!-- if NOT !editing here -->
      <div class="d-flex" v-if="!editing">
        <div class="col-4 text-light">
          <div class="p-2">
            <img class="profileimg" :src="profile.picture" />
            <div class="w-75 text-wrap">
              <h3>Name: {{ profile.name }}</h3>
              <div v-if="profile.class">
                <h4>Class: {{ profile.class }}</h4>
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
                    class="selectable m-2 mdi mdi-github"
                  >
                  </i>
                </div>
                <div v-if="profile.linkedin">
                  <i
                    @click="getLinked(profile.linkedin)"
                    class="selectable m-2 mdi mdi-linkedin"
                  ></i>
                </div>
                <div v-if="profile.resume">
                  <i
                    @click="getResume(profile.resume)"
                    class="selectable m-2 mdi mdi-account-details-outline"
                  >
                  </i>
                </div>
                <div v-if="profile.graduated">
                  <i class="m-2 mdi mdi-school"></i>
                </div>
                <div v-if="profile.id == account.id">
                  <!-- AT Click edit -->
                  <button
                    @click="editing = true"
                    class="btn btn-primary text-light"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end of if NOT editing -->
        <div class="col-8">
          <img
            class="profilecoverimg mt-2 rounded w-100"
            :src="profile.coverImg"
            alt=""
          />
          <Post v-for="p in posts" :key="p.id" :post="p" />
        </div>
      </div>
      <!-- edit form -->

      <form v-else class="bg-dark m-2 p-4" @submit="editAccount">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            aria-describedby="helpId"
            placeholder="Name.."
            v-model="account.name"
          />
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">Picture</label>
          <input
            type="text"
            class="form-control"
            id="name"
            aria-describedby="helpId"
            placeholder="Name.."
            v-model="account.picture"
          />
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">Cover Image</label>
          <input
            type="text"
            class="form-control"
            id="name"
            aria-describedby="helpId"
            placeholder="image url..."
            v-model="account.coverImg"
          />
        </div>
        <div class="mb-3">
          <label for="bio" class="form-label">Bio</label>
          <input
            type="text"
            class="form-control"
            id="bio"
            aria-describedby="helpId"
            placeholder="Bio..."
            v-model="account.bio"
          />
        </div>
        <button class="btn btn-danger" @click="editing = false">Cancel</button>
        <button class="btn btn-success ms-2">Submit</button>
      </form>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { profilesService } from "../services/ProfileService.js";
import { AppState } from "../AppState.js";
import { postsService } from "../services/PostService.js";
import { accountService } from "../services/AccountService.js";

export default {
  setup() {
    const route = useRoute();
    const editing = ref(false);
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
      editing,
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
      getResume(link) {
        window.open(link);
      },
      async editAccount() {
        try {
          await accountService.editAccount(AppState.account);
          Pop.toast("Account updated", "success");
          editing.value = false;
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