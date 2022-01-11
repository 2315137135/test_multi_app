<template>
  <div>
    <v-btn @click="login">login</v-btn>
    <v-btn @click="logOut">logOut</v-btn>
  </div>

</template>

<script>
import {Moralis} from "moralis"

const serverUrl = "https://z72ogjd8wrj0.usemoralis.com:2053/server";
const appId = "Sup0neoUfrGgf4azAktrfVeJoZROvcbMCtiHEmPR";
Moralis.start({serverUrl, appId});


export default {
  name: "Login",
  data() {
    return {
      username: ""
    }
  },
  methods: {
    async login() {
      let user: Moralis.User = Moralis.User.current();
      if (!user) {
        user = await Moralis.authenticate({signingMessage: "Log in using Moralis"})
            .then(function (user) {
              console.log("logged in user:", user);
              console.log(user.get("ethAddress"));

            })
            .catch(function (error) {
              console.log(error);
            });
      }
      if (user) {
        console.log(user.get('ethAddress'))
        localStorage.setItem('ethAddress', user.get('ethAddress'))
        await this.$router.push('/game')
      }
    },

    async logOut() {
      localStorage.removeItem('ethAddress')
      Moralis.User.logOut()
    }
  }
}
</script>

<style scoped>

</style>
