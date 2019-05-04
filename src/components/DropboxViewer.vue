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
            <folder :f="entry" :cache="getFolderStructure"></folder>
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
    }
  },
  methods: {
    dropbox() {
      return new Dropbox({
        accessToken: this.accessToken,
        fetch
      });
    },
    generateSlug(path) {
      return path
        .toLowerCase()
        .replace(/^\/|\/$/g, "")
        .replace(/ /g, "-")
        .replace(/\//g, "-")
        .replace(/[-]+/g, "-")
        .replace(/[^\w-]+/g, "");
    },
    getFolderStructure(path) {
      let output;
      const slug = this.generateSlug(path);
      const data = this.$store.state.structure[slug];

      if (data) {
        output = Promise.resolve(data);
      } else {
        output = this.dropbox()
          .filesListFolder({
            path: path,
            include_media_info: true
          })
          .then(response => {
            let entries = response.entries;

            this.$store.commit("structure", {
              path: slug,
              data: entries
            });

            return entries;
          })
          .catch(error => {
            this.isLoading = "error";
            console.log(error);
          });
      }

      return output;
    },
    displayFolderStructure() {
      this.isLoading = true;

      const structure = {
        folders: [],
        files: []
      };

      this.getFolderStructure(this.path).then(data => {
        for (let entry of data) {
          // Check ".tag" prop for type
          if (entry[".tag"] == "folder") {
            structure.folders.push(entry);
          } else {
            structure.files.push(entry);
          }
        }

        this.structure = structure;
        this.isLoading = false;
      });
    }
  },
  created() {
    this.displayFolderStructure();
  },
  watch: {
    path() {
      this.displayFolderStructure();
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
