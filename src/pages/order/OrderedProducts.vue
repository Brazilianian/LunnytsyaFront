<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 mt-5">
        <h2>Поточний заказ:</h2>
        <hr>
      </div>
    </div>
    <div
        v-for="product in products"
        :key="product.id"
        class="row my-2">
      <div class="col-3">
        <img :src="product.image" class="img-thumbnail">
      </div>

      <div class="col-8 border-2 border-end position-relative">
        <h3 class="fst-italic"> {{ product.name }} </h3>
        <h4>Ціна: ₴{{ product.price }}</h4>
        <div class="d-flex">
          <h4>Кількість: </h4>
          <input
              type="number"
              min="1"
              class="form-control ms-3"
              v-model="(getOrderedProductById(product.id)).count"
              @change="changeCount"
          >
        </div>
        <hr>
        <h4 class="position-absolute bottom-0">Загалом:</h4>
        <h4 class="position-absolute bottom-0 end-0 my-1 mx-3">₴{{ product.price * getOrderedProductById(product.id).count }}</h4>
      </div>

      <div class="col-1">
        <button
            class="btn btn-outline-danger"
            @click="removeProductFromOrder(product)"
        >
          <fas icon="times"></fas>
        </button>
      </div>
      <hr class="my-3">
    </div>
    <div class="row">
      <div class="col-12 position-relative">
        <h3 class="position-absolute end-0">
          Загальна ціна - ₴{{ getTotalPrice() }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import {getOrder, removeFromOrder, saveOrder} from "../../../public/js/order_worker";
import {getProductById} from "../../../public/js/product_worker";

export default {
  name: "ordered-products",

  data() {
    return {
      products: [],
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

    removeProductFromOrder(product) {
      removeFromOrder(product);
      this.products = this.products.filter(p => p.id !== product.id);
    },

    fillBasket() {
      this.products = [];
      this.order = getOrder();
      this.order.orderedProducts.forEach(orderedProduct => {
        getProductById(orderedProduct.product.id).then(product => {
          this.products[this.products.length] = product;
        })
      })
    },

    getOrderedProductById(id) {
      for (let i = 0; i < this.order.orderedProducts.length; i++) {
        if (this.order.orderedProducts[i].product.id === id) {
          return this.order.orderedProducts[i];
        }
      }
    },

    changeCount(event) {
      console.log(event.target.value)
      if (isNaN(event.target.value) && event.target.value > 0) {
        saveOrder(this.order);
      }
    }
  },

  created() {
    this.fillBasket();
  }
}
</script>

<style scoped>

</style>