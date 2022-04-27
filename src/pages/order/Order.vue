<template>

  <ordered-products class="my-4"></ordered-products>

  <personal-info class="my-4"></personal-info>
</template>

<script>
import OrderedProducts from "./OrderedProducts";
import PersonalInfo from "./PersonalInfo";

export default {
  name: 'order',
  components: {PersonalInfo, OrderedProducts}
}
</script>

<style scoped>

</style>