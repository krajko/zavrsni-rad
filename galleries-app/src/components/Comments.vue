<template>
    <div class="text-start">
        <div>
            <h4 v-if="comments.length !== 1"> <strong> {{ comments.length }} Comments </strong> </h4>
            <h4 v-else> <strong> 1 Comment </strong> </h4>
            <hr class="my-3">
        </div>

        <div class="my-3">
            <form>
                <h6> <strong> Add a comment </strong> </h6>
                <div class="form-input-group d-flex align-items-end">
                    <textarea class="form-control me-2" rows="1"></textarea>
                    <div>
                        <button class="btn btn-primary px-3 pb-2"> <strong> Submit </strong> </button>
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
import Comment from './Comment.vue'

export default {
    name: 'Comments',

    components: {
        Comment
    },

    props: {
        comments: Array
    }
}
</script>

<style>

</style>