<template>
    <div class="my-3">
        <router-link :to="`/authors/${comment.user.id}`">
            <h6 class="mb-1"> <strong> {{ comment.user.first_name }} {{ comment.user.last_name }} </strong> </h6>
        </router-link>
        <p class="my-0"> {{ comment.body }} </p>
        <small class="text-muted"> {{ comment.created_at | formatDate }} </small>
    </div>
</template>

<script>
export default {
    name: 'Comment',

    props: {
        comment: Object
    }
}
</script>

<style>

</style>