<template>
    <div>
        <form @submit.prevent="search">
            <b-input-group size="lg">
                <input 
                    v-model="query"
                    type="search"
                    class="form-control"
                    autocomplete="off"
                    placeholder="Search galleries"
                />

                <div class="input-group-prepend">
                    <b-button variant="primary px-3" type="submit">
                        <i class="fa fa-search fa-2x"></i>
                    </b-button>
                </div>
            </b-input-group>
        </form>
    </div>
</template>

<script>
export default {
    name: 'search',

    data() {
        return {
            query: ''
        }
    },

    methods: {
        search() {
            this.$emit('search', this.query);
        }
    }
}
</script>