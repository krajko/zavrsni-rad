<template>
  <div class="container-fluid">

    <user :user="activeUser" class="mb-4"/>
    
    <div class="mx-auto" style="max-width: 480px;">
      <search @search="search($event)"/>
    </div>

    <div>
      <gallery-list :galleries="galleries"/>
     
      <div v-if="isLoading" class="text-center mb-auto h1">
        <i class="fas fa-spinner fa-spin text-primary"></i>
      </div>

      <div v-else class="text-center mt-3">
        <b-button v-if="!lastPage" @click="load" variant="primary" class="px-3"> <h4 class="lobster mb-0"> View more </h4> </b-button>
      </div>
    </div>
  
  </div>
</template>

<script>
import GalleryList from '../components/GalleryList.vue'
import Search from '../components/Search.vue'
import User from '../components/User.vue'

import { mapActions, mapGetters } from 'vuex'
import store from '../store'

export default {
  name: 'MyGalleries',

  components: {
    'gallery-list': GalleryList,
    'search' : Search,
    'user': User
  },

  data() {
    return {
      isLoading: false
    }
  },

  computed: {
    ...mapGetters('galleries', ['galleries', 'lastPage']),
    ...mapGetters('auth', ['activeUser'])
  },

  async beforeRouteEnter(to, from, next) {
    store.dispatch('galleries/resetPage');
    store.dispatch('galleries/resetQuery');

    try {
      if (!store.getters['auth/activeUser'].id) {
        await store.dispatch('auth/getActiveUser');
      }
      await store.dispatch('galleries/getMyGalleries');
    } catch(e) {
      console.log(e)
    }

    next();
  },
  
  methods: {
    ...mapActions('galleries', ['getMyGalleries', 'setQuery', 'nextPage', 'resetPage']),

    async load() {
      this.isLoading = true;
      this.nextPage();

      try {
        await this.getMyGalleries();
      }catch(e) {
        console.log(e);
      }

      this.isLoading = false;
    },
    
    async search(query) {
      this.resetPage();
      this.setQuery(query);
      this.getMyGalleries();
    }
  }
}
</script>