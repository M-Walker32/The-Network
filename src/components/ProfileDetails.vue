<template>
  <div class="col-12 d-flex rounded border-dark m-3 bg-light" id="Post">
    <!-- <img class="p-4 rounded-circle h-25" :src="post.creator.picture" /> -->
    <div class="p-4">
      <!-- <h5 class="selectable" @click="goToProfile()">{{ post.creator.name }}</h5> -->
      <small class="muted">created at</small>
      <p class="m-0 p-0">body</p>
      <!-- here is the like button -->
      <h5>{{ likes }}<i class="mdi mdi-cash-100 selectable"></i></h5>
    </div>
  </div>
</template>


<script>
export default {
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>