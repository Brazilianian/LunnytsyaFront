<template>
  <div class="modal fade" id="basket" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="basketLabel" aria-hidden="true">
    <div class="modal-xl modal-dialog">
      <div class="modal-content text-black">
        <div class="modal-header">
          <h5 class="modal-title" id="basketLabel">Кошик</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container"
          >
            <div
                class="row pb-2 mb-2 border-bottom border-2"
                v-for="product in products"
                :key="product.id"
            >
              <div class="col-3 border-2 border-end">
                <a :href="'/product/' + product.id">
                  <img :src="product.image" class="img-thumbnail">
                </a>
              </div>

              <div class="col-4 border-2 border-end">
                <h3 class="fst-italic"> {{ product.name }} </h3>
                <h4>₴{{ product.price * (getOrderedProductById(product.id)).count }} </h4>
              </div>

              <div class="col-4 border-2 border-end">
                <h5>Кількість:</h5>
                <input
                    type="number" min="1"
                    v-model="(getOrderedProductById(product.id)).count"
                    class="form-control"
                >
              </div>

              <div class="col-1 pt-2">
                <button
                    class="btn btn-outline-danger"
                    @click="removeProductFromOrder(product.id)"
                >
                  <fas icon="times"></fas>
                </button>
              </div>
            </div>
            <div class="row float-end" v-if="order !== null">
              <h5>Загальна ціна - ₴{{ getTotalPrice() }}</h5>
            </div>
            <div class="row" v-else>
              <h5 class="text-center">У Вас поки пустий кошик, але це не пізно виправити</h5>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <a href="/order" v-if="order !== null">
            <button type="button" class="btn btn-success" data-bs-dismiss="modal">Перейти до оформлення заказу</button>
          </a>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрити</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {getProductById} from "../../../public/js/product_worker";
import {getOrder, removeFromOrder} from "../../../public/js/order_worker";

export default {
  name: "basket-modal",

  data() {
    return {
      order: null,
      products: [],
    }
  },

  methods: {
    getTotalPrice() {
      let total = 0;
      this.products.forEach(product => {
        total += product * (this.getOrderedProductById(product.id).count);
      });
      return total;
    },

    removeProductFromOrder(id) {
      removeFromOrder(id);
      this.products = this.products.filter(product => product.id !== id);
    },

    fillBasket() {
      this.order = getOrder();

      if (this.order !== null) {
        this.order.orderedProducts.forEach(orderedProduct => {
          getProductById(orderedProduct.product.id).then(product => {
            this.products[this.products.length] = product;
          })
        })
      }
    },

    getOrderedProductById(id) {
      for (let i = 0; i < this.order.orderedProducts.length; i++) {
        if (this.order.orderedProducts[i].product.id === id) {
          return this.order.orderedProducts[i];
        }
      }
    },
  },
}
</script>

<style scoped>
</style>