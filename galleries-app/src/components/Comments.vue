<template>
    <div class="text-start">
        <div>
            <h4 v-if="comments.length !== 1"> <strong> {{ comments.length }} Comments </strong> </h4>
            <h4 v-else> <strong> 1 Comment </strong> </h4>
            <hr class="my-3">
        </div>

        <div class="my-3">
            <form @submit.prevent="submit">
                <h6> <strong> Add a comment: </strong> </h6>

                <div class="form-input-group d-flex align-items-end">
                    <textarea 
                        class="form-control me-2" 
                        :class="{ 'is-invalid': $v.comment.$error }"
                        rows="1"
                        v-model.trim="$v.comment.$model"
                    ></textarea>
                    <div>
                        <b-button variant="primary" class="px-3" type="submit"> <h4 class="lobster mb-0"> Submit </h4> </b-button>
                    </div>
                </div>
            </form>
        </div>

        <div>
            <comment v-for="comment in comments" :key="comment.id" :comment="comment"/>
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
    },

    methods: {
        ...mapActions('galleries', ['addComment']),

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
        }
    },

    validations: {
        comment: {
            required
        }
    }
}
</script>

<style>

</style>