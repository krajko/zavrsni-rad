<template>
    <div class="container" style="max-width: 960px;">

        <!-- Gallery -->
        <div class="d-flex flex-column mb-3">
            <div class="d-flex flex-row row justify-content-between align-items-start">
                <h1 class="col"> 
                    <strong> {{ gallery.title }} </strong> 
                </h1>

                <!-- Buttons -->
                <div v-if="gallery.user_id === activeUser.id" class="col-2 d-flex justify-content-end mt-2">
                    <router-link :to="`/edit/${gallery.id}`">
                        <b-button variant="primary px-3 me-1">
                            <i class="fa fa-edit fa-lg"></i>
                        </b-button>
                    </router-link>
                    
                    <b-button variant="dark px-3" v-b-modal.confirmDeleteModal>
                        <i class="fa fa-trash fa-lg"></i>
                    </b-button>
                </div>
            </div>

            <h6 class="text-muted fw-bold my-0"> 
                <em> {{ gallery.created_at | dateTime }} </em>
            </h6>

            <p class="my-3"> {{ gallery.description }} </p>

            <!-- Author -->
            <router-link :to="`/authors/${gallery.user.id}`">  
                <span class="bold"> {{ gallery.user.first_name }} {{ gallery.user.last_name }} </span>
            </router-link>
        </div>

        <!-- Carousel -->
        <carousel :images="gallery.images" class="mb-4"/>

        <!-- Comments  -->
        <div>
            <comments :comments="gallery.comments"/>
        </div>

        <!-- Modal -->
        <b-modal id="confirmDeleteModal">
            <template v-slot:modal-header>
                <h2 class="lobster"> Delete gallery </h2>
            </template>    

            <template>
                <p> 
                    Are you sure you want to delete this gallery? <br>
                    This action is irreversible. 
                </p>
            </template>

            <template v-slot:modal-footer>
                <b-button variant="dark px-3 fw-bold" @click="$bvModal.hide('confirmDeleteModal')"> Cancel </b-button>
                <b-button variant="primary px-3 fw-bold" @click="removeGallery(gallery.id)"> Confirm </b-button>
            </template>
        </b-modal>

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
        Carousel, 
        Comments
    },

    computed: {
        ...mapGetters('galleries', ['gallery']),
        ...mapGetters('auth', ['activeUser'])
    },

    methods: {
        ...mapActions('galleries', ['delete']),

         async removeGallery(id) {
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