<template>

  <nav-bar></nav-bar>

  <div class="container">
    <div class="row">


      <div class="col-md-3"
           v-for="product in products"
           :key="product.id"
      >
        <product-item :product="product"></product-item>
      </div>

    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  components: {},

  data() {
    return {
      HTTP_REQUEST: 'http://localhost:8888/api/v1',
      products: []
    }
  },
  methods: {},
  async mounted() {
    try {
      await axios.get(this.HTTP_REQUEST + '/product/get-all').then(response => this.products = response.data)

    } catch (e) {
      alert("Error")
    }
  }
}
</script>

<style scoped>

</style>