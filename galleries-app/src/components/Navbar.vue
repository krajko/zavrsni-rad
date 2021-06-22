<template>
    <nav class="navbar navbar-expand-lg bg-white border-bottom">
        <div class="container-fluid px-3">

            <!-- Left -->
            <b-icon-images  class="navbar-brand p-0" font-scale="2.5" style="vertical-align: middle;"/>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/" class="nav-link"> All galleries </router-link>
                </li>
            </ul>

            <!-- Right -->
            <ul v-if="!isAuth" class="navbar-nav ms-auto">
                <li class="nav-item">
                    <router-link to="/login" class="nav-link"> Login </router-link>
                </li>
                
                <li class="nav-item">
                    <router-link to="/register" class="nav-link"> Register </router-link>
                </li>
            </ul>

            <ul v-if="isAuth" class="navbar-nav ms-auto">
                <li class="nav-item">
                    <button class="btn nav-link" @click="handleLogout"> Logout </button>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "navbar",

  computed: {
      ...mapGetters('auth', ['isAuth'])
  },

  methods: {
      ...mapActions('auth', ['logout']),

      async handleLogout() {
          try {
              await this.logout();
              this.$router.push('/login');
          } catch(e) {
              console.log(e);
          }
      }
  }
};
</script>