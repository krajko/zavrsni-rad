<template>
  <div class="container-fluid">

    <user :user="user" class="mb-4"/>
    
    <div v-if="!(query === null && galleries.length === 0)" class="mx-auto" style="max-width: 480px;">
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
  name: 'UserGalleries',

  props: ['id'],

  components: {
    'gallery-list': GalleryList,
    'search' : Search,
    'user': User
  },

  computed: {
    ...mapGetters('galleries', ['galleries', 'query', 'lastPage', 'user', 'isLoading'])
  },

  async beforeRouteEnter(to, from, next) {
    store.dispatch('galleries/resetPage');
    store.dispatch('galleries/resetQuery');

    try {
      await store.dispatch('galleries/getUser', to.params.id);
      await store.dispatch('galleries/getUserGalleries', to.params.id);
    } catch(e) {
      console.log(e)
    }

    next();
  },
  
  methods: {
    ...mapActions('galleries', ['getUserGalleries', 'setQuery', 'nextPage', 'resetPage']),

    async load() {
      this.setLoading();
      this.nextPage();

      try {
        await this.getUserGalleries(this.id);
      }catch(e) {
        console.log(e);
      }

      this.setLoading();
    },
    
    async search(query) {
      this.resetPage();
      this.setQuery(query);

      this.getUserGalleries(this.id);
    }
  }
}
</script>