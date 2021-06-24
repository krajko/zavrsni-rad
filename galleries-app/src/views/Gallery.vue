<template>
    <div class="container" style="max-width: 960px;">
        <div class="d-flex flex-column mb-3">
            <h1> 
                <strong> {{ gallery.title }} </strong> 
            </h1>

            <router-link :to="`/authors/${gallery.user.id}`"> 
                <strong> {{ gallery.user.first_name }} {{ gallery.user.last_name }} </strong> 
            </router-link>

            <p class="my-2"> {{ gallery.description }} </p>

            <h6 class="text-muted"> 
                <em> {{ gallery.created_at | formatDate }} </em>
            </h6>
        </div>

        <carousel :images="gallery.images" class="mb-4"/>

        <div>
            <comments :comments="gallery.comments"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store'

import Carousel from '../components/Carousel.vue'
import Comments from '../components/Comments.vue'

export default {
    name: 'Gallery',

    components: {
        Carousel, Comments
    },

    computed: {
        ...mapGetters('galleries', ['gallery'])
    },

    async beforeRouteEnter(to, from, next) {
        try {
            await store.dispatch('galleries/getGallery', to.params.id);
        } catch(e) {
            console.log(e);
        }
        next();
    }
}
</script>

<style>

</style>