<template>
  <canvas id="canvas" style="width: 100%;height: 100%;"></canvas>
</template>

<script>

import {Game} from "@/js/game";

export default {
  name: "Game",
  mounted() {
    let ethAddress = localStorage.getItem("ethAddress")

    // if (!ethAddress) {
    //   alert('Need account for login')
    //   this.$router.push('login')
    //   return
    // }
    window.game = new Game(document.getElementById('canvas'))

  }
}
</script>

<style scoped>


</style>
