<template>
    <div class="card">
        <img class="card-img-top" :src=" gallery.preview.url" alt="Preview">
        <!-- <div v-if="gallery.user_id == activeUser.id" class="card-img-overlay text-end p-2" style="max-height: 0px;">
            <router-link :to="`/edit/${gallery.id}`">
                <b-button variant="light" size="sm" class="pe-1 me-2">
                    <i class="fa fa-edit fa-lg text-dark"></i>
                </b-button>
            </router-link>

            <b-button @click="remove(gallery.id)" variant="dark" size="sm">
                <i class="fa fa-trash fa-lg text-light"></i>
            </b-button>
        </div> -->

        <div class="card-body row">
            <h5 class="card-title d-flex align-items-center"> 
                <router-link :to="`/galleries/${gallery.id}`"> <strong> {{ gallery.title }} </strong> </router-link> 
            </h5>

            <div class="d-flex justify-content-between align-items-end">
                <router-link v-if="gallery.user" :to="`/authors/${gallery.user_id}`">
                    <small> {{ gallery.user.first_name }} {{ gallery.user.last_name }} </small>
                </router-link> 
                <small class="text-muted"> {{ gallery.created_at | formatDate }} </small>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'gallery-card',

    props: {
        gallery: Object
    },

    computed: {
        ...mapGetters('auth', ['activeUser'])
    },

    methods: {
        ...mapActions('galleries', ['deleteGallery']),

        async remove(id) {
            try {
                await this.deleteGallery(id);
            } catch(e) {
                console.log(e);
            }
        }
    }
}
</script>

<style scoped>

.card-img-top {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

</style>