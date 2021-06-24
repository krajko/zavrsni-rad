<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <navbar/>

    <router-view class="my-4"/>

    <footer class="border-top text-center d-flex mt-auto bg-dark" >
      <div class="mx-auto my-5 text-light">
        <span> © Nikola Krajinović | 2021 </span>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "app",

  components: {
    Navbar
  }
};
</script>


<style lang="scss">
#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {

  &.router-link-exact-active {
    color: var(--bs-primary);
  }
}
</style>
