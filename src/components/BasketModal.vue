<template>
  <div class="position-absolute">
    <!-- Button trigger modal -->
    <div class="position-fixed end-0 bottom-0 mb-2 me-2">
      <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <fas class="fs-1" icon="shopping-basket"></fas>
      </button>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-xl modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Корзина</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container"
               v-if="!isRefresh"
          >
            <div
                class="row pb-2 mb-2 border-bottom border-2"
                v-for="product in products"
                :key="product.id"
            >
              <div class="col-3 border-2 border-end">
                <img :src="product.image" class="img-thumbnail">
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
            <div class="row float-end">
              <h5>Загальна ціна - ₴{{ getTotalPrice() }}</h5>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">Перейти до оформлення заказу</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрити</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "basket-modal",

  data() {
    return {
      isRefresh: false,
      order: {
        created: '',
        date: '',
        orderedProducts: [
          {
            count: 0,
            created: '',
            orderStatus: '',
            product: {
              id: 0
            },
            status: '',
            updated: '',
          }
        ],
        status: '',
        updated: '',
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
      this.isRefresh = true;

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

      this.isRefresh = false;
    },

    fillBasket() {
      this.order = JSON.parse(localStorage.getItem('order'));

      this.order.orderedProducts.forEach(orderedProduct => {
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
  },
}
</script>

<style scoped>
</style>