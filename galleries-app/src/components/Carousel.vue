<template>
    <div>
        <b-carousel id="gallery-carousel" :interval="3000" :controls="images.length !== 1" :indicators="true" no-animation>
                <b-carousel-slide v-for="(image, index) in images" :key="image.id">
                    <template #img>
                        <a :href="image.url">
                            <img class="d-block img-fluid w-100" :src="image.url" :alt="`Image ${index}`">
                        </a>
                    </template>
                </b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
export default {
    name: 'Carousel',

    props: {
        images: Array
    }
}
</script>