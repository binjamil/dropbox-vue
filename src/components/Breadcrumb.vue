<template>
  <div>
    <span v-for="(f,i) in folders">
      <a :href="f.path">{{ f.name }}</a>
      <span v-if="i !== (folders.length - 1)">/</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  computed: {
    folders() {
      let output = [],
        slug = "",
        parts = this.$store.state.path.split("/");
      for (let item of parts) {
        slug += item;
        output.push({ name: item || "home", path: "#" + slug });
        slug += "/";
      }
      return output;
    }
  },
  methods: {
    navigate(folder) {
      this.$emit("path", folder.path);
    }
  }
};
</script>

<style></style>
