# Dropbox-Vue

A Vue single-page app that asynchronously fetches files and folder from my Dropbox account using Dropbox API. It allows users to navigate through the folder structure and download files. During navigation, the URL hash updates so the user can have the standard web experience on this SPA. Furthermore, the application uses Vue's official state management library, Vuex, to cache current folder and subfolders to optimize speed.

Dropbox-Vue is hosted on ZEIT now, so can see the application live here: https://dropbox-vue.now.sh/

## Note
There is still some work left to get to the final version I have in my mind:
1. Integrate unit testing using Jest
2. Apply CSS styling to create an aesthetically beautiful UI.
