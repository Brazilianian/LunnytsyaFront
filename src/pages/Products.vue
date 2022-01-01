<template>
  <nav-bar></nav-bar>

  <div class="container">
    <div class="row">
      <div class="col-md-3 mt-5"
           v-for="product in products"
           :key="product.id"
      >
        <product-item
            :product="product"
        ></product-item>
      </div>
    </div>

    <pagination
        class="mt-3"
        :page="page"
        :totalPages="totalPages"
        @changePage="changePage"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      HTTP_REQUEST: 'http://localhost:8888/api/v1',
      products: [],
      page: 0,
      size: 12,
      totalPages: 0
    }
  },
  methods: {
    changePage(number) {
      this.getProducts(number - 1);
    },
    async getProducts(pageNumber) {
      try {
        await axios.get(this.HTTP_REQUEST + '/product/get-all', {
          params: {
            page: pageNumber,
            size: this.size
          }
        })
            .then(response => {
              this.page = response.data.number;
              this.products = response.data.content;
              this.totalPages = Math.ceil(response.data.totalElements / this.size);
            })

      } catch (e) {
        alert(e)
      }
    }
  },
  mounted() {
    this.getProducts(0);
  }
}
</script>

<style scoped>

</style>