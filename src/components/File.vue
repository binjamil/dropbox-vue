<template>
  <li>
    <strong>{{ f.name }}</strong>
    <span v-if="f.size">- {{ bytesToSize(f.size) }}</span>
    <span v-if="link">
      -
      <a :href="link">Download</a>
    </span>
  </li>
</template>

<script>
export default {
  name: "File",
  props: {
    f: Object,
    d: Object
  },
  data() {
    return {
      link: false,
      byteSizes: ["Bytes", "KB", "MB", "GB", "TB"]
    };
  },
  methods: {
    bytesToSize(bytes) {
      // Set a default
      let output = "0 Byte";
      // If the bytes are bigger than 0
      if (bytes > 0) {
        // Divide by 1024 and make an int
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        // Round to 2 decimal places and select the appropriate unit from the array
        output =
          Math.round(bytes / Math.pow(1024, i), 2) + " " + this.byteSizes[i];
      }
      return output;
    }
  },
  created() {
    this.d.filesGetTemporaryLink({ path: this.f.path_lower }).then(data => {
      this.link = data.link;
    });
  }
};
</script>

<style></style>
