<template>
    <div class="card">

        <!-- Image -->
        <router-link :to="`/galleries/${gallery.id}`">
            <img class="card-img-top" :src=" gallery.preview.url" alt="Preview">
        </router-link>

        <!-- Buttons -->
        <!-- <div v-if="gallery.user_id == activeUser.id" class="card-img-overlay text-end p-2" style="max-height: 100px;">
            <router-link :to="`/edit/${gallery.id}`">
                <b-button variant="light" size="sm" class="pe-1 me-2">
                    <i class="fa fa-edit fa-lg text-dark"></i>
                </b-button>
            </router-link>

            <button class="btn btn-sm btn-dark" @click="remove(gallery.id)">
                <i class="fa fa-trash fa-lg text-light"></i>
            </button>
        </div> -->

        <div class="card-body d-flex flex-column justify-content-between">
            <!-- Title -->
            <div class="my-auto">
                <router-link :to="`/galleries/${gallery.id}`"> 
                    <h5 class="boldish my-1"> {{ gallery.title }} </h5>
                </router-link> 
            </div>

            <div class="d-flex justify-content-between between align-items-end fw-bold">
                <!-- Author -->
                <router-link v-if="gallery.user" :to="`/authors/${gallery.user_id}`">
                    <small class="fw-bolder"> {{ gallery.user.first_name }} {{ gallery.user.last_name }} </small>
                </router-link> 
                <!-- Date -->
                <small class="text-muted"> {{ gallery.created_at | fromNow }} </small>
            </div>
        </div>

        <!-- Footer -->
        <!-- <hr class="dots"> -->
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
        ...mapActions('galleries', ['delete']),

        async remove(id) {
            try {
                await this.delete(id);
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

.dots {
    color: var(--bs-secondary);
    background-color: transparent;
    border-style: none;
    border-top-style: dotted;
    border-width: 15px;
    opacity: .07;
    margin: 0 auto .75rem !important;
    width: 33%;
}

</style>