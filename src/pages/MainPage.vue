<template>

  <nav-bar></nav-bar>

  <div
      id="background"
      class="vh-75 vw-100 cover no-repeat bg-position-center attachment-fixed"
  >
  </div>

  <div class="container vh-100">
    <div class="row mt-5">
      <div class="col-md-4 border-end">
        <img :src="author.image" class="img-thumbnail">
      </div>
      <div class="col-md-8">
        <h5
            class="white-space-wrap"
        >
          {{ author.description }}
        </h5>
      </div>
    </div>

    <hr>

    <div class="row">
      <h3 class="text-center my-3">Популярне</h3>
      <div
          class="col-md-3 mt-3 mb-3"
          v-for="product in products"
          :key="product.id"
      >
        <product-item
            :product="product"
        ></product-item>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  components: {},

  data() {
    return {
      HTTP_REQUEST: 'http://localhost:8888/api/v1',
      backgroundImage: {
        content: ''
      },
      author: {
        image: '',
        description: ''
      },
      products: []
    }
  },
  methods: {
    async getBackgroundImage() {
      try {
        await axios.get(this.HTTP_REQUEST + '/main-page/background-image/get-main')
            .then(response => {
              if (response.data !== '') {
                this.backgroundImage = response.data;
              }
            })
            .catch(error => {
              alert(error);
            })
        if (this.backgroundImage.content !== '') {
          document.getElementById('background').style.backgroundImage = 'url(' + this.backgroundImage.content + ')';
        } else {
          document.getElementById('background').style.backgroundImage = 'url()';
        }
      } catch (error) {
        alert(error);
      }
    },
    async getAuthor() {
      try {
        await axios.get(this.HTTP_REQUEST + '/main-page/author')
            .then(response => {
              this.author = response.data;
            })
            .catch(error => {
              alert(error);
            })
      } catch (error) {
        alert(error);
      }
    },
    async getProducts() {
      try {
        await axios.get(this.HTTP_REQUEST + '/product', {
          params: {
            page: 0,
            size: 4
          }
        })
            .then(response => {
              console.log(response);
              this.products = response.data.content;
            })
            .catch(error => alert(error));
      } catch (e) {
        alert(e);
      }
    }
  },
  mounted() {
    this.getBackgroundImage();
    this.getAuthor();
    this.getProducts();
  }
}
</script>

<style scoped>
.vh-75 {
  height: 75vh;
}

.cover {
  background-size: cover;
}

.no-repeat {
  background-repeat: no-repeat;
}

.bg-position-center {
  background-position: center;
}

.attachment-fixed {
  background-attachment: fixed;
}

.white-space-wrap {
  white-space: pre-wrap;
}
</style>