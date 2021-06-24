<template>
    <div>
        <b-carousel :interval="3000" controls indicators>
            <b-carousel-slide v-for="image in images" :key="image.id" :img-src="image.url"/>
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