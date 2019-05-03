<template>
  <div>
    <h1>Dropbox</h1>
    <transition name="fade">
      <div v-if="isLoading">Loading...</div>
    </transition>

    <transition name="fade">
      <ul v-if="!isLoading">
        <li v-for="entry in structure">
          <strong>{{ entry.name }}</strong>
          <span v-if="entry.size">- {{ bytesToSize(entry.size) }}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { Dropbox } from "dropbox";

export default {
  name: "DropboxViewer",
  data() {
    return {
      accessToken:
        "E9I9QfHebZAAAAAAAAAAboJjOJi1QPQzAB7C0G8M5VBf66-IjH74_m9lA7f7kjAG",
      structure: [],
      byteSizes: ["Bytes", "KB", "MB", "GB", "TB"],
      isLoading: true
    };
  },
  methods: {
    dropbox() {
      return new Dropbox({
        accessToken: this.accessToken,
        fetch
      });
    },
    getFolderStructure(path) {
      this.dropbox()
        .filesListFolder({ path: path, include_media_info: true })
        .then(response => {
          console.log(response.entries);
          this.structure = response.entries;
          this.isLoading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
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
    this.getFolderStructure("/images");
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
