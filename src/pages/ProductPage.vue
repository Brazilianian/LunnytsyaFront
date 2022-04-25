<template>
  <div class="container mt-5 pt-5">
    <div class="row">
      <div class="col-md-4 border-end">
        <img :src="product.image" class="img-thumbnail">
      </div>
      <div class="col-md-8">
        <h3 class="text-center fst-italic">{{ product.name }}</h3>

        <h4>₴{{ product.price }}</h4>

        <h5 class="white-space-wrap">{{ product.description }}</h5>

        <div>
          <button v-if="!isPresent" class="btn btn-primary float-end" @click="addToBasket">
            <fas icon="cart-plus"></fas>
            Додати в кошик
          </button>
          <button v-else class="btn btn-success float-end" @click="removeFromBasket">
            <fas icon="check"></fas>
          </button>
        </div>

      </div>
    </div>

    <div v-if="isAdmin">
      <hr>
      <div class="row">
        <div class="col-md-12">
          <button
              @click="deleteProduct"
              class="btn btn-danger float-end mx-2"
          >
            <fas icon="trash-alt"></fas>
            Видалити
          </button>

          <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#productEdit">
            <fas icon="edit"></fas>
            Редагувати
          </button>

          <product-edit-modal :product="product"></product-edit-modal>

        </div>
      </div>
    </div>

    <hr>

  </div>
</template>


<script>

import {getOrder, addToOrder, isProductPresentInOrder, removeFromOrder} from "../../public/js/order_worker";
import {deleteProductById, getProductById} from "../../public/js/product_worker";
import {checkIsAdmin} from "../../public/js/security";

export default {
  data() {
    return {
      order: {
        orderedProducts: [
          {
            count: 0,
            product: {
              id: 0,
            }
          },
        ]
      },

      product: {
        id: 0,
        image: '',
        description: '',
        price: 0,
        name: '',
        visible: true,
      },

      productValidation: {},

      isPresent: false,
      isAdmin: false,
    }
  },

  methods: {
    checkIsPresent() {
      this.isPresent = isProductPresentInOrder(this.product);
    },

    addToBasket() {
      this.order = addToOrder(this.product);
      this.checkIsPresent();
    },

    removeFromBasket() {
      this.order = removeFromOrder(this.product);
      this.checkIsPresent();
    },

    deleteProduct() {
      let result = confirm('Ви впевнені, що бажаєте видалити продукт "' + this.product.name + '"?');
      if (result) {
        if (deleteProductById(this.product.id) === null) {
          alert('error');
        }
      }
    },
  },

  created() {
    getProductById(this.$route.params.id)
        .then(product => this.product = product);

    this.order = getOrder();

    this.isAdmin = checkIsAdmin();
  }
}
</script>

<style scoped>
.white-space-wrap {
  white-space: pre-wrap;
}
</style>