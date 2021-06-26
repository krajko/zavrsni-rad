<template>
  <div class="container-fluid">

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

import { mapActions, mapGetters } from 'vuex'
import store from '../store'

export default {
  name: 'Home',

  components: {
    'gallery-list': GalleryList,
    'search' : Search
  },

  computed: {
    ...mapGetters('galleries', ['galleries', 'lastPage', 'query', 'isLoading'])
  },

  async beforeRouteEnter(to, from, next) {
    store.dispatch('galleries/resetPage');
    store.dispatch('galleries/resetQuery');
    
    try {
      await store.dispatch('galleries/getIndex')
    } catch(e) {
      console.log(e)
    }

    next();
  },
  
  methods: {
    ...mapActions('galleries', ['getIndex', 'setQuery', 'nextPage' , 'resetPage', 'setLoading']),

    async load() {
      this.setLoading();
      this.nextPage();

      try {
        await this.getIndex();
      }catch(e) {
        console.log(e);
      }

      this.setLoading();
    },
    
    async search(query) {
      this.resetPage();
      this.setQuery(query);
      this.getIndex();
    }
  }
}
</script>