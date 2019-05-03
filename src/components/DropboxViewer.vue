<template>
  <div>
    <h1>Dropbox</h1>
    <transition name="fade">
      <div v-if="isLoading">Loading...</div>
    </transition>

    <transition name="fade">
      <div v-if="!isLoading">
        <breadcrumb :p="path" @path="updateStructure"></breadcrumb>
        <ul>
          <template v-for="entry in structure.folders">
            <folder :f="entry" @path="updateStructure"></folder>
          </template>
          <template v-for="entry in structure.files">
            <file :d="dropbox()" :f="entry"></file>
          </template>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { Dropbox } from "dropbox";
import Folder from "./Folder";
import File from "./File";
import Breadcrumb from "./Breadcrumb";

export default {
  name: "DropboxViewer",
  components: {
    Folder,
    File,
    Breadcrumb
  },
  data() {
    return {
      accessToken:
        "E9I9QfHebZAAAAAAAAAAboJjOJi1QPQzAB7C0G8M5VBf66-IjH74_m9lA7f7kjAG",
      structure: {},
      isLoading: true,
      path: ""
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
          const structure = {
            folders: [],
            files: []
          };
          for (let entry of response.entries) {
            // Check ".tag" prop for type
            if (entry[".tag"] === "folder") {
              structure.folders.push(entry);
            } else {
              structure.files.push(entry);
            }
          }
          this.structure = structure;
          this.path = path;
          this.isLoading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateStructure(path) {
      this.isLoading = true;
      this.getFolderStructure(path);
    }
  },
  created() {
    this.getFolderStructure("");
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
