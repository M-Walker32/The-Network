<template>
  <img
    class="adimg selectable"
    @click="openLink(billboard.linkURL)"
    :src="billboard.banner"
    :alt="billboard.title"
  />
</template>


<script>
export default {
  props: {
    billboard: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      openLink(link) {
        window.open("https://" + link);
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.adimg {
  object-fit: fill;
  max-width: 48%;
  margin: 2px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px;
}
</style>