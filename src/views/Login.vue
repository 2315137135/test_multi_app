<template>
  <div>
    <v-btn @click="login"></v-btn>
    <v-img
        src="https://opensea.io/assets/0x26231a65ef80706307bbe71f032dc1e5bf28ce43/1716"></v-img>
  </div>

</template>

<script>


export default {
  name: "Login",
  methods: {
    async login() {
      require("../js/nft/index.js")

    }
  }
}
</script>

<style scoped>

</style>
