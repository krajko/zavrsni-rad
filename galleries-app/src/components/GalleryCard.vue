<template>
    <div class="card">
        <router-link :to="`/galleries/${gallery.id}`">
            <img class="card-img-top" :src=" gallery.preview.url" alt="Preview">
        </router-link>

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
export default {
    name: 'gallery-card',

    props: {
        gallery: Object
    }
}
</script>