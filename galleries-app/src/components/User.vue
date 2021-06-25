<template>
  <div class="text-center">
      <h1 class="lobster display-2"> {{ user.first_name }} {{ user.last_name }} </h1>
  </div>
</template>

<script>
export default {
    name: 'User',

    props: {
      user: Object
    }
}
</script>