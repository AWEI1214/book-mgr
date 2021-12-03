<template>
  <div class="space-between">
    <slot />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped lang="scss">
.space-between {
  display: flex;
  justify-content: space-between;
}
</style>
