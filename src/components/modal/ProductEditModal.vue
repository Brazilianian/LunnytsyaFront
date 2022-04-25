<template>
  <div class="modal fade" id="productEdit" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="productEditLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="productEditLabel">Редагування товару</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p2-">
          <div class="d-flex border-bottom my-2">
            <div class="w-25 pe-2 border-end">
              <img id="productEditImage" :src="newProduct.image" class="img-thumbnail">
            </div>
            <div class="w-75 ps-2">
              <h5 class="text-center fst-italic">{{ newProduct.name }}</h5>
              <h5>₴{{ newProduct.price }}</h5>
              <h6 class="white-space-wrap">{{ newProduct.description }}</h6>
            </div>
          </div>
          <div class="d-flex my-2">
            <div class="w-25 border-end pe-2">
              <div class="has-validation">
                <input @change="changeProductImage" ref="productImage" type="file" accept="image/*"
                       :class="validationMessage.image !== undefined ? 'form-control is-invalid' : 'form-control'">
                <div v-if="validationMessage.image !== undefined" class="invalid-feedback">
                  {{ validationMessage.image }}
                </div>
              </div>

              <hr>

              <button
                  @click="changeProductIsVisible"
                  class="btn btn-primary float-end mx-2"
              >
                <fas v-if="newProduct.visible" icon="eye"></fas>
                <fas v-else icon="eye-slash"></fas>
              </button>
            </div>
            <div class="w-75 ms-2">
              <div class="has-validation">
                <label for="name" class="form-label mt-2">Назва</label>
                <input id="name" type="text"
                       :class="validationMessage.name !== undefined ? 'form-control is-invalid' : 'form-control'"
                       v-model="newProduct.name">
                <div v-if="validationMessage.name !== undefined" class="invalid-feedback">
                  {{ validationMessage.name }}
                </div>
              </div>

              <div class="has-validation">
                <label for="price" class="form-label mt-2">Ціна</label>
                <input id="price" type="number" min="0"
                       :class="validationMessage.price !== undefined ? 'form-control is-invalid' : 'form-control'"
                       v-model="newProduct.price">

                <div v-if="validationMessage.price !== undefined" class="invalid-feedback">
                  {{ validationMessage.price }}
                </div>
              </div>

              <div class="has-validation">
                <label for="description" class="form-label mt-2">Опис</label>
                <textarea id="description"
                          :class="validationMessage.description !== undefined ? 'form-control no-resize is-invalid' : 'form-control no-resize'"
                          rows="7"
                          v-model="newProduct.description"
                ></textarea>

                <div v-if="validationMessage.description !== undefined" class="invalid-feedback">
                  {{ validationMessage.description }}
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
</template>

<script>
import {editProduct} from "../../../public/js/product_worker";

export default {
  name: "product-edit-modal",
  data() {
    return {
      validationMessage: {},

      newProduct: {
        id: 0,
        name: '',
        description: '',
        price: 0,
        image: '',
        visible: false,
      }
    }
  },

  props: {
    product: {}
  },

  watch: {
    product(newProduct) {
      this.newProduct = Object.assign({}, newProduct);
    }
  },

  methods: {
    changeProductIsVisible() {
      this.newProduct.visible = !this.newProduct.visible;
    },

    changeProductImage(event) {
      let productEditImage = document.getElementById('productEditImage');
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = (event) => {
        productEditImage.src = event.target.result;
        this.newProduct.image = event.target.result;
      }
    },

    saveChanges() {
      let result = confirm("Ви дійсно бажаєте зберегти зміни?")
      if (result) {
        editProduct(this.newProduct).then(response => {
          console.log(response.status);
          if (response.status === 422) {
            this.validationMessage = response.data
          } else if (response.status === 200) {
            this.$router.go(0);
          }
        });
      }
    },
  },

  mounted() {
  }
}
</script>

<style scoped>

</style>