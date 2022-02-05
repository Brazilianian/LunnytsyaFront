<template>
  <nav-bar @admin="changeAdmin"></nav-bar>

  <div v-if="errorMessage !== ''" class="text-center text-danger mt-5 pt-5">
    <h4 class="mt-3">{{ errorMessage }}</h4>
  </div>

  <div v-else class="container mt-5 pt-5">
    <div class="row">
      <div class="col-md-4 border-end">
        <img :src="product.image" class="img-thumbnail">
      </div>
      <div class="col-md-8">
        <h3 class="text-center fst-italic">{{ product.name }}</h3>

        <h4>₴{{ product.price }}</h4>

        <h5 class="white-space-wrap">{{ product.description }}</h5>

        <button class="btn btn-primary float-end" @click="addToBasket">
          <fas icon="cart-plus"></fas>
        </button>

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
          </button>

          <button
              class="btn btn-primary float-end mx-2"
              data-bs-toggle="modal" data-bs-target="#staticBackdrop"
          >
            <fas icon="edit"></fas>
          </button>

          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
               tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">Редагування товару</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p2-">
                  <div class="d-flex border-bottom my-2">
                    <div class="w-25 pe-2 border-end">
                      <img id="productEditImage" :src="product.image" class="img-thumbnail">
                    </div>
                    <div class="w-75 ps-2">
                      <h5 class="text-center fst-italic">{{ product.name }}</h5>
                      <h5>₴{{ product.price }}</h5>
                      <h6 class="white-space-wrap">{{ product.description }}</h6>
                    </div>
                  </div>
                  <div class="d-flex my-2">
                    <div class="w-25 border-end pe-2">
                      <div class="has-validation">
                        <input @change="changeProductImage" ref="productImage" type="file" accept="image/*"
                               :class="productValidation.image !== undefined ? 'form-control is-invalid' : 'form-control'">
                        <div v-if="productValidation.image !== undefined" class="invalid-feedback">
                          {{ productValidation.image }}
                        </div>
                      </div>

                      <hr>

                      <button
                          @click="changeProductIsVisible"
                          class="btn btn-primary float-end mx-2"
                      >
                        <fas v-if="product.visible" icon="eye"></fas>
                        <fas v-else icon="eye-slash"></fas>
                      </button>
                    </div>
                    <div class="w-75 ms-2">
                      <div class="has-validation">
                        <label for="name" class="form-label mt-2">Назва</label>
                        <input id="name" type="text"
                               :class="productValidation.name !== undefined ? 'form-control is-invalid' : 'form-control'"
                               v-model="product.name">
                        <div v-if="productValidation.name !== undefined" class="invalid-feedback">
                          {{ productValidation.name }}
                        </div>
                      </div>

                      <div class="has-validation">
                        <label for="price" class="form-label mt-2">Ціна</label>
                        <input id="price" type="number" min="0"
                               :class="productValidation.price !== undefined ? 'form-control is-invalid' : 'form-control'"
                               v-model="product.price">

                        <div v-if="productValidation.price !== undefined" class="invalid-feedback">
                          {{ productValidation.price }}
                        </div>
                      </div>

                      <div class="has-validation">
                        <label for="description" class="form-label mt-2">Опис</label>
                        <textarea id="description"
                                  :class="productValidation.description !== undefined ? 'form-control no-resize is-invalid' : 'form-control no-resize'"
                                  rows="7"
                                  v-model="product.description"></textarea>

                        <div v-if="productValidation.description !== undefined" class="invalid-feedback">
                          {{ productValidation.description }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрити</button>
                  <button @click="saveChanges" type="button" class="btn btn-primary">Зберегти</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: {
        id: 0,
        image: '',
        description: '',
        price: 0,
        name: '',
        visible: true,
      },
      productValidation: {},
      errorMessage: '',
      isAdmin: false,
      token: '',
    }
  },

  methods: {
    addToBasket() {
      let order = this.$cookies.get('basket');

      let orderedProduct = {
        product: {
          id: this.product.id
        },
        orderStatus: 'IN_BASKET',
        count: 1,
        status: 'ENABLED',
        created: new Date(),
        updated: new Date(),
      };

      if (order === null || order === undefined) {
        order = {
          orderedProducts: [
              orderedProduct
          ],
          user: {},
          date: new Date(),
          status: 'ENABLED',
          created: new Date(),
        }
      } else {
        order.orderedProducts[order.orderedProducts - 1] = orderedProduct;
      }

      order.updated = new Date();
      this.$cookies.set("order",JSON.stringify(order).toString());
      console.log(this.$cookies.get('order'))
    },

    changeProductIsVisible() {
      this.product.visible = !this.product.visible;
    },

    changeProductImage(event) {
      let productEditImage = document.getElementById('productEditImage');
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = (event) => {
        productEditImage.src = event.target.result;
        this.product.image = event.target.result;
      }
    },

    async saveChanges() {
      let result = confirm("Ви дійсно бажаєте зберегти зміни?")
      if (result) {
        try {
          await axios.put('/product', this.product)
              .then(() => {
                    location.reload();
                  }
              )
              .catch(error => {
                if (error.response.status === 422) {
                  this.productValidation = error.response.data;
                } else {
                  alert(error.response);
                }
              })
        } catch (e) {
          alert(e);
        }
      }
    },

    async deleteProduct() {
      let result = confirm('Ви впевнені, що бажаєте видалити продукт "' + this.product.name + '"?');
      if (result) {
        try {
          await axios.delete('/product/' + this.product.id)
              .then(() => {
                location.reload();
              })
              .catch(error => alert(error));
        } catch (e) {
          alert(e);
        }
      }
    },

    async getProduct() {
      try {
        await axios.get('/product/' + this.$route.params.id)
            .then(response => {
              this.product = response.data;
            }).catch(error => {
              this.errorMessage = error;
            });
      } catch (e) {
        this.errorMessage = e;
        alert(e);
      }
    },

    changeAdmin(isAdmin) {
      this.isAdmin = isAdmin;
    }
  },

  async mounted() {
    await this.getProduct();
  }
}
</script>

<style scoped>
.white-space-wrap {
  white-space: pre-wrap;
}
</style>