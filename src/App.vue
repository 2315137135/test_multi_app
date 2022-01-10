<template>
  <v-app id="app">
    <v-main id="main" style="height: 100vh;overflow-y: hidden;">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
html, body, #app, #main {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden !important;
}
</style>
