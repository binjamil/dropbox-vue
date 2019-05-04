# Dropbox-Vue

A Vue single-page app that asynchronously fetches files and folders from my Dropbox account using Dropbox API. It allows users to navigate through the folder structure and download files. During navigation, the URL hash updates so the user can have the standard web experience on an SPA. Furthermore, the application utilizes Vue's official state management library, Vuex, to cache current folder and subfolders to optimize speed.

Dropbox-Vue is hosted on ZEIT Now, so you can see the application live here: https://dropbox-vue.now.sh/

## Note
There is still some work left to get to the final version I have in my mind for Dropbox-Vue:
1. Integrate unit testing using Jest
2. Apply CSS styling to create an aesthetically beautiful UI.
