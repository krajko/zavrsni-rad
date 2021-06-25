<template>
    <div class="container" style="max-width: 960px;">
        <div class="d-flex flex-column mb-3">

            <div class="d-flex flex-row row justify-content-between align-items-center">
                <h1 class="col"> 
                    <strong> {{ gallery.title }} </strong> 
                </h1>

                <div v-if="gallery.user_id === activeUser.id" class="col-2 d-flex justify-content-end">
                    <router-link :to="`/edit/${gallery.id}`">
                        <b-button variant="primary" class="px-3 me-1">
                            <i class="fa fa-edit fa-lg"></i>
                        </b-button>
                    </router-link>
                    <b-button @click="remove(gallery.id)" variant="dark" class="px-3">
                        <i class="fa fa-trash fa-lg"></i>
                    </b-button>
                </div>
            </div>

            <h6 class="text-muted"> 
                <em> {{ gallery.created_at | formatDate }} </em>
            </h6>

            <p class="my-2"> {{ gallery.description }} </p>

            <router-link :to="`/authors/${gallery.user.id}`"> 
                <strong> {{ gallery.user.first_name }} {{ gallery.user.last_name }} </strong> 
            </router-link>
        </div>

        <carousel :images="gallery.images" class="mb-4"/>

        <div>
            <comments :comments="gallery.comments"/>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '../store'

import Carousel from '../components/Carousel.vue'
import Comments from '../components/Comments.vue'

export default {
    name: 'Gallery',

    components: {
        Carousel, Comments
    },

    computed: {
        ...mapGetters('galleries', ['gallery']),
        ...mapGetters('auth', ['activeUser'])
    },

    methods: {
        ...mapActions('galleries', ['delete']),

         async remove(id) {
            try {
                await this.delete(id);
                this.$router.push('/my-galleries');
            } catch(e) {
                console.log(e);
            }
        }
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