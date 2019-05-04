<template>
  <li>
    <a :href="'#' + f.path_lower">
      <strong>{{ f.name }}</strong>
    </a>
  </li>
</template>

<script>
export default {
  name: "Folder",
  props: {
    f: Object
  },
  methods: {
    navigate() {
      this.$emit("path", this.f.path_lower);
    }
  }
};
</script>

<style></style>
