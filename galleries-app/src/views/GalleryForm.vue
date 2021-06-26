<template>
    <div class="container" style="max-width: 580px;">
        <div class="text-center mb-4">
            <h1 v-if="id" class="display-2 lobster"> Edit </h1>
            <h1 v-else class="display-2 lobster"> Create </h1>
            <hr>
        </div>
        
        <form @submit.prevent="submit">

            <!-- Title -->
            <div class="form-group mb-3">
                <label> Title: </label>
                <input 
                    type="text"
                    class="form-control" 
                    :class="{ 'is-invalid': $v.data.title.$error }"
                    @blur="setTitle($event.target.value)"
                    :value="data.title"
                />

                <!-- Errors -->
                <div v-if="$v.data.title.$dirty">
                    <div v-if="!$v.data.title.minLength">
                        <small class="text-danger"> Title must contain at least 2 characters. </small>
                    </div>
                    <div v-if="!$v.data.title.maxLength">
                        <small class="text-danger"> Title must not contain more than 255 characters. </small>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div class="form-group mb-3">
                <label> Description: </label>
                <small class="form-text text-muted"> Optional. </small>
                <textarea
                    type="text"
                    rows="10"
                    class="form-control" 
                    :class="{ 'is-invalid': $v.data.description.$error }"
                    @blur="setDescription($event.target.value)"
                    :value="data.description"
                />

                <!-- Errors -->
                <div v-if="$v.data.description.$dirty">
                    <div v-if="!$v.data.description.maxLength">
                        <small class="text-danger"> Description must not contain more than 1000 characters. </small>
                    </div>
                </div>
            </div>

            <!-- Inputs -->
            <div class="form-group mb-5">
                <label> Image URLs: </label>
                <small class="form-text text-muted"> Ending in .png, .jpg or .jpeg. </small>
                <div v-for="(image, index) in data.images" :key="index" class="input-group mb-3">
                    <input 
                        type="text"
                        class="form-control" 
                        :class="{ 'is-invalid': $v.data.images.$each[index].$error }"
                        v-model="data.images[index]"
                        @blur="setImageURL($event.target.value, index)" 
                    />

                    <!-- Buttons  -->
                    <div class="input-group-append" v-if="data.images.length !== 1">
                        <b-button @click="removeURL(index)" variant="light border"> 
                            <i class="fa fa-minus-circle fa-lg"/>
                        </b-button>
                        <b-button @click="moveUp(index)" variant="light border" :class="{ 'disabled': index === 0 }">
                            <i class="fa fa-arrow-alt-circle-up fa-lg"/>
                        </b-button>
                        <b-button @click="moveDown(index)" variant="light border" :class="{ 'disabled': index === data.images.length - 1 }">
                            <i class="fa fa-arrow-alt-circle-down fa-lg"/>
                        </b-button>
                    </div>

                    <!-- Errors -->
                    <div v-if="$v.data.images.$each[index].$dirty" class="col-12">
                        <div v-if="!$v.data.images.$each[index].url" >
                            <small class="text-danger"> Not a valid URL. </small>
                        </div>
                        <div v-if="!$v.data.images.$each[index].img && $v.data.images.$each[index].url">
                            <small class="text-danger"> Not an image. </small>
                        </div>
                    </div>
                </div>

                <!-- Add button -->
                <div class="mt-3">
                    <b-button @click="addURL" variant="primary px-3">
                        <i class="fa fa-plus-circle fa-lg"></i>
                        <strong> Add another URL </strong>
                    </b-button>
                </div>
            </div>

            <!-- Submit -->
            <div v-if="isLoading" class="text-center mb-auto h1">
                <i class="fas fa-spinner fa-spin text-primary"></i>
            </div>
            <div v-else class="text-center">
                <b-button variant="primary px-3 mb-3" type="submit"> <h4 class="lobster mb-0"> Submit </h4> </b-button>
            </div>

            <!-- Cancel -->
            <div class="text-center">
                <b-button @click="cancel" variant="dark px-3 pb-2"> <strong> Cancel </strong> </b-button>
            </div>

            <!-- Error -->
            <div v-if="error" class="text-center">
                <small class="text-danger"> Something went wrong. Please try again. </small>
            </div>
        </form>
    </div>
</template>

<script>
import { required, minLength, maxLength, url } from 'vuelidate/lib/validators';
import { mapGetters, mapActions } from 'vuex';
import store from '../store';

export default {
    name: 'GalleryForm',

    props: ['id'],

    data() {
        return {
            data: {
                title: '',
                description: '',
                images: this.id ? [] : ['']
            },
            error: false
        }
    },

    computed: {
        ...mapGetters('galleries', ['gallery', 'isLoading'])
    },

    async beforeRouteEnter(to, from, next) {
        if (to.params.id) {
            try {
                await store.dispatch('galleries/getGallery', to.params.id);
            } catch(e) {
                console.log(e);
            }
        }

        next();
    },

    created() {
        if (this.id) {
            this.data.title = this.gallery.title;
            this.data.title = this.gallery.title;
            this.gallery.images.forEach((image) => {
                this.data.images.push(image.url);
            });
        }
    },

    methods: {
        ...mapActions('galleries', ['create', 'edit', 'setLoading']),

        addURL() {
            this.data.images.push('');
        },

        removeURL(index) {
            return this.data.images.splice(index, 1);
        },

        moveUp(index) {
            const swap = this.removeURL(index - 1);
            this.data.images.splice(index, -1, swap[0]);

            this.$v.data.images.$each[index - 1].$touch();
        },

        moveDown(index) {
            const swap = this.removeURL(index + 1);
            this.data.images.splice(index, -1, swap[0]);

            this.$v.data.images.$each[index + 1].$touch();
        },

        async submit() {
            this.setLoading();
            this.$v.$touch();

            if (!this.$v.$invalid) {
                try {
                    if (this.id) {
                        await this.edit({ 
                            id: this.id,
                            gallery: this.data 
                        });
                        this.$router.push(`/galleries/${this.id}`);
                    } else {
                        await this.create(this.data);
                        this.$router.push('/my-galleries');
                    }
                } catch(e) {
                    console.log(e);
                    this.error = true;
                }
            }
            this.setLoading();
        },

        cancel() {
            this.$router.push('/my-galleries');
        },

        setTitle(value) {
            this.data.title = value;
            this.$v.data.title.$touch();
        },

        setDescription(value) {
            this.data.description = value;
            this.$v.data.description.$touch();
        },

        setImageURL(value, index) {
            this.data.images[index] = value;
            this.$v.data.images.$each[index].$touch();
        }
    },

    validations: {
        data: {
            title: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(255)
            },
    
            description: {
                maxLength: maxLength(1000)
            },

            images: {
                $each: {
                    required,
                    url,
                    img: function(url) {
                        return url.indexOf('.png') >= url.length - 4
                            || url.indexOf('.jpg') >= url.length - 4 
                            || url.indexOf('.jpeg') >= url.length - 5;
                    }
                }
            }
        }
    }
}
</script>