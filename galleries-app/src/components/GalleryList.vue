<template>
  <div class="container-fluid">

    <div v-if="galleries.length !== 0" class="row justify-content-center my-3">
      <div v-for="gallery in galleries" :key="gallery.id" class="d-flex align-items-stretch col-10 col-sm-8 col-md-6 col-lg-4 col-xxl-2 m-3">
        <gallery-card :gallery="gallery"/>
      </div>
    </div>

    <div v-else class="text-center mt-5">
      <h5> No galleries to show. </h5>
    </div>

  </div>
</template>

<script>
import GalleryCard from './GalleryCard.vue'

export default {
  name: 'GalleryList',

  props: ['galleries', 'lastPage', 'isLoading'],

  components: {
    'gallery-card': GalleryCard
  },
}
</script>
