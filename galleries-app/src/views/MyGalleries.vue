<template>
  <div class="container-fluid">
    
    <div v-if="!(galleries.length === 0 && searchMode === false)" class="mx-auto" style="max-width: 480px;">
      <search @search="search($event)"/>
    </div>

    <div>
      <gallery-list :galleries="galleries"/>
     
      <div v-if="isLoading" class="text-center mb-auto h1">
        <i class="fas fa-spinner fa-spin text-primary"></i>
      </div>

      <div v-else class="text-center mt-3">
        <b-button v-if="!lastPage" @click="load" variant="primary" class="px-3 pb-2"> <strong> Load more </strong> </b-button>
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
  name: 'MyGalleries',

  components: {
    'gallery-list': GalleryList,
    'search' : Search
  },

  data() {
    return {
      page: 1,
      isLoading: false,
      searchMode: false
    }
  },

  computed: {
    ...mapGetters('galleries', ['galleries', 'lastPage']),
    ...mapGetters('auth', ['activeUser'])
  },

  async beforeRouteEnter(to, from, next) {
    try {
      await store.dispatch('galleries/getUserIndex', { 
        id: store.getters['auth/activeUser'].id, 
        page: 1 
      });
    } catch(e) {
      console.log(e)
    }
    next();
  },
  
  methods: {
    ...mapActions('galleries', ['getUserIndex', 'searchUser']),

    async load() {
      this.isLoading = true;
      this.page++;

      try {
        if (this.searchMode) {
          await this.searchUserIndex({
            id: this.activeUser.id,
            query: this.query,
            page: this.page
          });
        } else {
          await this.getUserIndex({
            id: this.activeUser.id,
            page: this.page
          });
        }
      }catch(e) {
        console.log(e);
      }

      this.isLoading = false;
    },
    
    async search(query) {
      this.searchMode = true;
      this.page = 1;
      this.query = query;

      this.searchUser({
        id: this.activeUser.id,
        query: query,
        page: this.page
      })
    }
  }
}
</script>