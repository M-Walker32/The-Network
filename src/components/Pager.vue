<template>
  <!--  -->
  <div class="mt-3" v-if="totalPages > 1">
    <h4>
      <i
        class="mdi mdi-chevron-left text-dark"
        :class="{
          selectable: currentPage > 1,
          'lighten-50': currentPage == 1,
        }"
        @click="changePage(-1)"
      ></i>
      {{ currentPage }}
      <i
        class="mdi mdi-chevron-right text-dark"
        :class="{
          selectable: currentPage != totalPages,
          'lighten-50': currentPage == totalPages,
        }"
        @click="changePage(1)"
      ></i>
    </h4>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostService.js";
export default {
  setup() {
    return {
      currentPage: computed(() => AppState.currentPage),
      totalPages: computed(() => AppState.totalPages),
      async changePage(value) {
        let newPage = AppState.currentPage + value;
        if (newPage > AppState.totalPages || newPage <= 0) {
          Pop.toast("You're' there", "warning");
          return;
        }
        postsService.changePage(newPage);
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>