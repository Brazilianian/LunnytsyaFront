<template>
  <div class="card" style="width: 18rem;">
    <img :src="product.image" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">{{ product.description }}</p>
      <a href="product" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-item",
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>