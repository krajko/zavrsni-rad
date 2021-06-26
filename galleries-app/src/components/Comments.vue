<template>
    <div class="text-start">
        <div>
            <h4 v-if="comments.length !== 1" class="fw-bold"> {{ comments.length }} Comments </h4>
            <h4 v-else class="fw-bold"> 1 Comment </h4>
            <hr class="my-3">
        </div>


        <div v-for="comment in comments" :key="comment.id">
            <comment class="mb-5" :comment="comment" @removeComment="removeComment($event)"/>
        </div>
        <div class="my-5">
            <form @submit.prevent="submit">
                <h6 class="bold mb-0"> {{ activeUser.first_name }} {{ activeUser.last_name }}: </h6>

                <div class="form-input-group d-flex align-items-end">
                    <textarea 
                        class="form-control border-0 bg-transparent me-1 pt-2"
                        :class="{ 'border-danger': $v.comment.$error }"
                        v-model.trim="$v.comment.$model"
                    ></textarea>

                    <div>
                        <b-button variant="primary px-3" type="submit"> <h4 class="lobster mb-0"> Comment </h4> </b-button>
                    </div>
                </div>

                <hr class="comment my-1" :class="{ 'text-danger': $v.comment.$error }">
            </form>
        </div>
    </div>
</template>

<script>
import Comment from './Comment.vue';

import { mapActions, mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
    name: 'Comments',

    components: {
        Comment
    },

    props: {
        comments: Array
    },

    data() {
        return {
            comment: ''
        }
    },

    computed: {
        ...mapGetters('galleries', ['gallery']),
        ...mapGetters('auth', ['activeUser'])
    },

    methods: {
        ...mapActions('galleries', ['addComment', 'deleteComment']),

        async submit() {
            this.$v.$touch();

            if (!this.$v.$invalid) {
                try {
                    await this.addComment({
                        body: this.comment,
                        gallery_id: this.gallery.id
                    })
                } catch(e) {
                    console.log(e);
                }

                this.comment = '';
                this.$v.comment.$reset();
            }
        },

        async removeComment(id) {
            try {
                await this.deleteComment(id);
            } catch(e) {
                console.log(e);
            }
        }
    },

    

    validations: {
        comment: {
            required
        }
    }
}
</script>

<style scoped>

textarea.form-control {
    height: 10px;
}

textarea.form-control:focus {
    border: none;
    box-shadow: none;
}

.comment {
    height: 2px;
}

</style>