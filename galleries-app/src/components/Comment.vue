<template>
    <div class="my-3">
        <div class="d-flex flex-row justify-content-between align-items-end">
            <router-link :to="`/authors/${comment.user.id}`">
                <h6 class="mb-1"> <strong> {{ comment.user.first_name }} {{ comment.user.last_name }} </strong> </h6>
            </router-link>

            <b-button v-if="comment.user_id === activeUser.id" @click="handleDelete" variant="dark btn-sm ms-2 py-1 px-2">
                <i class="fa fa-trash fa-md"></i>
            </b-button>        
        </div>
            <p class="my-0"> {{ comment.body }} </p>
            <small class="text-muted"> {{ comment.created_at | formatDate }} </small>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Comment',

    props: {
        comment: Object
    },

    computed: {
        ...mapGetters('auth', ['activeUser'])
    },
    
    methods: {
        ...mapActions('galleries', ['deleteComment']),

        async handleDelete() {
            try {
                await this.deleteComment(this.comment.id);
            } catch(e) {
                console.log(e);
            }
        }
    }
}
</script>

<style>

</style>