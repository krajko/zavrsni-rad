<template>
    <nav class="navbar navbar-expand-lg bg-white border-bottom">
        <div class="container-fluid px-3">

            <!-- Left -->            
            <ul class="navbar-nav me-auto">
                <li class="nav-item mx-3">
                    <router-link to="/" class="nav-link mx-1">
                        <h2 class="lobster mb-0">
                            <i class="far fa-images"></i>
                            Galleries 
                        </h2>
                    </router-link>
                </li>

                <li v-if="isAuth" class="nav-item mx-3">
                    <router-link to="/my-galleries" class="nav-link mx-1">
                        <h2 class="lobster mb-0">
                            <i class="far fa-user-circle"></i>
                            My Galleries 
                        </h2>
                    </router-link>
                </li>

                <li v-if="isAuth" class="nav-item mx-3">
                    <router-link to="/create" class="nav-link mx-1">
                        <h2 class="lobster mb-0">        
                            <i class="fa fa-plus"></i>
                            Create 
                        </h2>
                    </router-link>
                </li>
            </ul>

            <!-- Right -->
            <ul v-if="!isAuth" class="navbar-nav ms-auto">
                <li class="nav-item">
                    <router-link to="/login" class="nav-link"> 
                        <h3 class="lobster mb-0">
                            Login 
                        </h3>
                    </router-link>
                </li>
                
                <li class="nav-item">
                    <router-link to="/register" class="nav-link"> 
                        <h3 class="lobster mb-0">
                            Register
                        </h3>
                    </router-link>
                </li>
            </ul>

            <ul v-if="isAuth" class="navbar-nav ms-auto">
                <li class="nav-item">
                    <button class="btn btn-dark px-3 pb-2 bold" @click="handleLogout"> 
                        <strong> Logout </strong> 
                    </button>
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

<style scoped lang="scss">
.image-border {
    border: 4px solid #42b983;
    border-radius: 50%;

    padding: 0 2px;

 }

 .nav-link:hover {
     border-color: #359469;
 }
</style>