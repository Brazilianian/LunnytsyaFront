<template>
<div class="container mt-5">
  <div class="row">
    <div class="col-12 mt-5">
      <h3>Ваш поточний заказ:</h3>
      <hr>
    </div>
  </div>
  <div
      v-for="product in products"
      :key="product.id"
      class="row">
      <div class="col-3">
        <img :src="product.image" class="img-thumbnail">
      </div>
  </div>
</div>

</template>

<script>

import axios from "axios";

export default {
  name: "Order",

  data() {
    return {
      isAuthorized: false,
      order: {
        date: '',
        orderedProducts: [
          {
            count: 0,
            orderStatus: '',
            product: {
              id: 0
            },
          }
        ],
        user: {},
      },

      products: []
    }
  },

  methods: {
    getTotalPrice() {
      let total = 0;
      for (let i = 0; i < this.products.length; i++) {
        total += (this.products[i].price * (this.getOrderedProductById(this.products[i].id).count));
      }
      return total;
    },

    removeProductFromOrder(id) {
      for (let i = 0; i < this.order.orderedProducts.length; i++) {
        if (this.order.orderedProducts[i].product.id === id) {
          this.order.orderedProducts.splice(i, 1);
          localStorage.setItem('order', JSON.stringify(this.order));
          break;
        }
      }

      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
          this.products.splice(i, 1);
          break;
        }
      }
    },

    fillBasket() {
      this.order = JSON.parse(localStorage.getItem('order'));

      this.order?.orderedProducts.forEach(orderedProduct => {
        axios.get('/product/' + orderedProduct.product.id).then(response => {
          if (response.status === 200) {
            this.products[this.products.length] = response.data;
          }
        })
      })
    },

    getOrderedProductById(id) {
      for (let i = 0; i < this.order.orderedProducts.length; i++) {
        if (this.order.orderedProducts[i].product.id === id) {
          return this.order.orderedProducts[i];
        }
      }
    }
  },

  mounted() {
    this.fillBasket();
  }
}
</script>

<style scoped>

</style>