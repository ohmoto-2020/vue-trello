<template>
  <div class="login">
    <h2 class="login__ttl">ログイン</h2>
    <button class="login__button" @click="login">
      Googleアカウントでログイン
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$store.dispatch("login");
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  padding-top: 3rem;
  text-align: center;
  &__button {
    background-color: #4180ed;
    color: #fff;
    margin-top: 3rem;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: none;
    cursor: pointer;
    outline: none;
    appearance: none;
  }
}
</style>
