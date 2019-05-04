<template>
  <div>
    <h1>Dropbox</h1>
    <transition name="fade">
      <div v-if="isLoading">
        <div v-if="isLoading === 'error'">
          <p>There seems to be an issue with the URL entered.</p>
          <p>
            <a href>Go home</a>
          </p>
        </div>
        <div v-else>Loading...</div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="!isLoading">
        <breadcrumb></breadcrumb>
        <ul>
          <template v-for="entry in structure.folders">
            <folder :f="entry"></folder>
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
      isLoading: true
    };
  },
  computed: {
    path() {
      return this.$store.state.path;
    },
    slug() {
      return this.path
        .toLowerCase()
        .replace(/^\/|\/$/g, "")
        .replace(/ /g, "-")
        .replace(/\//g, "-")
        .replace(/[-]+/g, "-")
        .replace(/[^\w-]+/g, "");
    }
  },
  methods: {
    dropbox() {
      return new Dropbox({
        accessToken: this.accessToken,
        fetch
      });
    },
    createFolderStructure(response) {
      const structure = {
        folders: [],
        files: []
      };

      for (let entry of response.entries) {
        // Check ".tag" prop for type
        if (entry[".tag"] == "folder") {
          structure.folders.push(entry);
        } else {
          structure.files.push(entry);
        }
      }

      this.structure = structure;
      this.isLoading = false;
    },
    createStructureAndSave(response) {
      this.createFolderStructure(response);

      this.$store.commit("structure", {
        path: this.slug,
        data: response
      });
    },
    getFolderStructure() {
      let data = this.$store.state.structure[this.slug];
      if (data) {
        this.createFolderStructure(data);
      } else {
        this.dropbox()
          .filesListFolder({
            path: this.path,
            include_media_info: true
          })
          .then(this.createStructureAndSave)
          .catch(error => {
            this.isLoading = "error";
            console.log(error);
          });
      }
    },
    updateStructure() {
      this.isLoading = true;
      this.getFolderStructure();
    }
  },
  created() {
    this.getFolderStructure();
  },
  watch: {
    path() {
      this.updateStructure();
    }
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
