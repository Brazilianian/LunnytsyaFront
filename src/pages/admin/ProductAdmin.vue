<template v-if="isAdmin">
  <div class="container mt-5 pt-3">

    <h3 class="text-center">Створення продукту</h3>

    <div class="row">
      <div class="col-md-3 border-end">
        <ul class="list-group">
          <a href="/admin" class="list-group-item active">Новий товар</a>
          <a href="/admin/main-page" class="list-group-item">Налаштування головної сторінки</a>
          <a class="list-group-item">Посилання 3</a>
          <a class="list-group-item">Посилання 4</a>
        </ul>
      </div>


      <div class="col-md-9 bg-secondary rounded-2 text-center w-50 mx-2">
        <img id="productImage" src="@/assets/images/no-image.png" class="img-fluid m-auto my-2 rounded-2">
      </div>
    </div>

    <hr>

    <div class="row mb-5">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <form @submit.prevent enctype="multipart/form-data">

          <div :class="[productValidation.image !== undefined ? 'has-validation' : '']">
            <label class="form-label" for="image">Виберіть зображення</label>
            <input @change="setImage" id="image" ref="file" name="image" type="file" accept="image/*"
                   :class="'form-control ' + [productValidation.image !== undefined ? 'is-invalid' : '']">
            <div v-if="productValidation.image !== undefined" class="invalid-feedback">
              {{ productValidation.image }}
            </div>
          </div>

          <div :class="[productValidation.name !== undefined ? 'has-validation' : '']">
            <label class="form-label" for="name">Введіть назву</label>
            <input v-model="product.name" id="name" type="text"
                   :class="'form-control ' + [productValidation.name !== undefined ? 'is-invalid' : '']">
            <div v-if="productValidation.name !== undefined" class="invalid-feedback">
              {{ productValidation.name }}
            </div>
          </div>

          <div :class="[productValidation.price !== undefined ? 'has-validation' : '']">
            <label class="form-label" for="price">Введіть ціну</label>
            <input v-model="product.price" id="price" type="number" step="0.01"
                   :class="'form-control ' + [productValidation.price !== undefined ? 'is-invalid' : '']">
            <div v-if="productValidation.price !== undefined" class="invalid-feedback">
              {{ productValidation.price }}
            </div>
          </div>

          <div :class="[productValidation.description !== undefined ? 'has-validation' : '']">
            <label class="form-label" for="text">Введіть опис</label>
            <textarea v-model="product.description" id="text" name="name"
                      :class="'form-control ' + [productValidation.description !== undefined ? 'is-invalid' : '']"
                      style="resize: none"
                      rows="10"></textarea>
            <div v-if="productValidation.description !== undefined" class="invalid-feedback">
              {{ productValidation.description }}
            </div>
          </div>

          <button class="btn btn-success float-end mt-2" @click="createProduct">
            <h5>Створити</h5>
          </button>
        </form>
      </div>

      <div class="col-md-1"></div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import {checkIsAdmin} from "../../../public/js/security";

export default {
  name: "SecondPage",
  components: {},
  data() {
    return {
      token: '',
      isAdmin: false,
      product: {
        name: '',
        description: '',
        price: 0,
        image: ''
      },
      productValidation: {},
      file: '',
    }
  },

  methods: {
    adminChange(isAdmin) {
      if (!isAdmin) {
        this.$router.push('/');
      }
      this.isAdmin = isAdmin;
    },

    setImage(event) {
      let img = document.getElementById('productImage')
      let file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        img.src = reader.result;
      }

      this.file = this.$refs.file.files[0];
    },

    createProduct() {
      if (this.file !== null && this.file !== '') {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = this.createProductMessage;
      } else {
        this.createProductMessage(null);
      }
    },

    createProductMessage(event) {
      if (event != null) {
        this.product.image = event.target.result;
      }
      axios.post('/product', this.product)
          .then(() => {
            location.reload();
          })
          .catch(
              error => {
                if (error.response.status === 422) {
                  this.productValidation = error.response.data;
                } else {
                  alert(error.response);
                }
              }
          );
    },
  },

  mounted() {

  },

  beforeCreate() {
    checkIsAdmin().then(isAdmin => {
      this.isAdmin = isAdmin;
      if(!isAdmin){
        this.$router.push('/');
      }
    })
  }
}
</script>

<style scoped>
.list-group-item {
  user-select: none;
}
</style>