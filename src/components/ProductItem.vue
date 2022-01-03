<template>
  <a
      :href="'/product/' + product.id"
      class="text-decoration-none text-black"
  >
    <div class="card" style="width: 18rem;">
      <img :src="product.image" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <h5 class="card-title">₴{{ product.price }}</h5>
        <p class="card-text text-secondary">{{ product.description.length > 100 ? product.description.slice(0, 100) + '...' : product.description }}</p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: "product-item",
  props: {
    product: {
      id: 0,
      name: '',
      image: '',
      price: 0,
      description: '',
    }
  }
}
</script>

<style scoped>

</style>