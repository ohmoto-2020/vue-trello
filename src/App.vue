<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header";
import firebase from "firebase";

export default {
  components: {
    Header,
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("setLoginUser", user);
        this.$store.dispatch("fetchLists");
      } else {
        this.$store.dispatch("deleteLoginUser");
      }
    });
  },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
