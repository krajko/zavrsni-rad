<template>
    <div>
            <router-link :to="`/authors/${comment.user.id}`">
                <h6 class="mb-1 fw-bolder"> <strong> {{ comment.user.first_name }} {{ comment.user.last_name }} </strong> </h6>
            </router-link>

        <div class="mb-2 mt-1">
            <small class="text-break">
                {{ comment.body }}
            </small>
        </div>

        <div class="d-flex flex-row justify-content-between align-items-end">
            <small class="text-muted"> {{ comment.created_at | dateTime }} </small>
            <b-button v-if="comment.user_id === activeUser.id" variant="dark py-2 px-2 d-flex align-self-start" v-b-modal="`confirmDeleteCommentModal${comment.id}`">
                <i class="fa fa-trash fa-md"></i>
            </b-button>        
        </div>

        <hr class="my-1" style="color: #2c3e5057">

        <!-- Modal -->
        <b-modal :id="`confirmDeleteCommentModal${comment.id}`">
            <template v-slot:modal-header>
                <h2 class="lobster"> Delete comment </h2>
            </template>    

            <template>
                <p> 
                    Are you sure you want to delete this comment? <br>
                    This action is irreversible. {{ comment.id }}
                </p>
            </template>

            <template v-slot:modal-footer>
                <b-button variant="dark px-3 fw-bold" @click="$bvModal.hide(`confirmDeleteCommentModal${comment.id}`)"> Cancel </b-button>
                <b-button variant="primary px-3 fw-bold" @click="$emit('removeComment', comment.id)"> Confirm </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Comment',

    props: {
        comment: Object
    },

    computed: {
        ...mapGetters('auth', ['activeUser'])
    }
}
</script>

<style>

</style>