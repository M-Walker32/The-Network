<template>
  <form class="bg-dark" @submit="editAccount">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input
        type="text"
        class="form-control"
        id="name"
        aria-describedby="helpId"
        placeholder="Name.."
        v-model="profile.name"
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
        v-model="profile.picture"
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
        v-model="profile.coverImg"
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
        v-model="profile.bio"
      />
    </div>
    <button class="btn btn-danger" @click="editing = false">Cancel</button>
    <button class="btn btn-success ms-2">Submit</button>
  </form>
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