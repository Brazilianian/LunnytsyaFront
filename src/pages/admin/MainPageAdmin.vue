<template>
  <nav-bar class="mb-5"></nav-bar>

  <h3 class="text-center mt-5 pt-2">Зображення головної сторінки</h3>

  <div
      id="background"
      class="vh-75 border border-4 border-primary m-2 rounded-3 no-repeat cover bg-position-center"
  >
    <img src="" alt="">
  </div>

  <div class="container mt-5">
    <!--Menu-->
    <div class="row border-top border-bottom py-4">
      <div class="col-md-3">
        <ul class="list-group">
          <a href="/admin" class="list-group-item">Новий товар</a>
          <a href="/admin/main-page" class="list-group-item active">Налаштування головної сторінки</a>
          <a class="list-group-item">Посилання 3</a>
          <a class="list-group-item">Посилання 4</a>
        </ul>
      </div>

      <!--Background image-->
      <div class="col-md-9">
        <label for="image" class="form-label">Виберіть зображення</label>
        <input id="image" type="file" ref="background-image" accept="image/*" class="form-control"
               @change="backgroundImageChange" required>

        <button
            id="background-button"
            class="btn btn-primary mt-3 float-end"
            @click="saveBackground"
        >
          Зберегти зміни
        </button>

      </div>
    </div>


    <!--Author-->
    <div class="row pt-2">

      <h3 class="text-center">Автор</h3>

      <div class="col-md-4 border-end">

        <div class="text-center">
          <img
              id="author-image"
              :src="author.image !== '' && author.image !== null && author.image !== undefined
                      ? author.image
                      : '@/assets/images/no-image.png'" class="img-thumbnail">
        </div>
      </div>

      <div class="col-md-8">
        <h5
            class="white-space-wrap ms-5 me-2"
        >
          {{ author.description }}
          <span
              v-if="author.description === ''"
              class="text-secondary"
          >
            Немає опису
          </span>
        </h5>
      </div>
    </div>

    <hr>

    <div class="row mb-5">
      <div class="col-md-4">
        <div class="mt-3">
          <label for="image" class="form-label">Виберіть зображення</label>
          <input @change="authorImageChange" ref="author-image" type="file" accept="image/*" class="form-control">
        </div>

      </div>
      <div class="col-md-8">
        <div class="mt-3">
          <label for="author-description" class="form-label">Введіть опис</label>
          <textarea
              @change="changeButtonClass('author-button', 'btn-success', 'btn-primary')"
              v-model="author.description"
              id="author-description"
              class="form-control no-resize"
              rows="6"
              placeholder="Опис"></textarea>
        </div>

        <button
            id="author-button"
            class="btn btn-primary mt-3 float-end"
            @click="saveAuthor"
        >Зберегти зміни
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      backgroundFile: '',
      authorImageFile: '',
      HTTP_REQUEST: 'http://localhost:8888/api/v1',
      backgroundImage: {
        content: '',
      },
      author: {
        image: '',
        description: '',
      },
      backgroundValidation: '',
      authorValidation: {
        image: '',
        description: '',
      },
    }
  },

  methods: {
    backgroundImageChange(event) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.backgroundFile = this.$refs["background-image"].files[0];
      reader.onload = (reader) => {
        let background = document.getElementById('background');
        background.style.backgroundImage = 'url(' + reader.target.result + ')';

        this.changeButtonClass('background-button', 'btn-success', 'btn-primary');

      };
    },

    authorImageChange(event) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.authorImageFile = this.$refs["author-image"].files[0];
      reader.onload = (reader) => {
        let background = document.getElementById('author-image');
        background.src = reader.target.result;

        let button = document.getElementById('author-button');
        button.className = button.className.replace('btn-success', 'btn-primary');
      };
    },

    saveBackground() {
      if (this.backgroundFile !== '') {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(this.backgroundFile);
        fileReader.onload = async (event) => {
          this.backgroundImage.content = event.target.result;
          try {
            await axios.post(this.HTTP_REQUEST + '/main-page/background-image', this.backgroundImage)
                .then(response => {
                  console.log(response);
                  this.changeButtonClass('background-button', 'btn-primary', 'btn-success')
                })
                .catch(error => {
                  alert(error);
                })
          } catch (e) {
            alert(e);
          }
        };
      }
    },

    saveAuthor() {
      if (this.authorImageFile !== '') {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(this.authorImageFile);
        fileReader.onload = (event) => {
          this.author.image = event.target.result;
          this.setAuthor();
        };
      } else {
        this.setAuthor();
      }
    },

    async setAuthor() {
      try {
        await axios.post(this.HTTP_REQUEST + '/main-page/author', this.author)
            .then(() => {
              this.changeButtonClass('author-button', 'btn-primary', 'btn-success')
            })
            .catch(error => {
              this.productValidation = error.response.data;
            })
      } catch (e) {
        alert(e);
      }
    },

    async getBackgroundImage() {
      try {
        await axios
            .get(this.HTTP_REQUEST + '/main-page/background-image/get-main')
            .then(response => {
              document.getElementById('background').style.backgroundImage = 'url(' + response.data.content + ')';
            })
            .catch(error => {
              this.backgroundValidation = error.response.data;
            })
      } catch (e) {
        alert(e);
      }
    },

    async getAuthor() {
      try {
        await axios.get(this.HTTP_REQUEST + '/main-page/author')
            .then(response => {
              if (response.data !== '') {
                this.author = response.data;
              }
            })
            .catch(error => console.log(error));
      } catch (e) {
        alert(e);
      }
    },

    changeButtonClass(id, from, to) {
      let button = document.getElementById(id);
      button.className = button.className.replace(from, to);
    }
  },

  mounted() {
    this.getBackgroundImage();
    this.getAuthor();
  }
}
</script>

<style scoped>
.vh-75 {
  height: 75vh;
}

.no-repeat {
  background-repeat: no-repeat;
}

.cover {
  background-size: cover;
}

.bg-position-center {
  background-position: center;
}

.no-resize {
  resize: none;
}

.white-space-wrap {
  white-space: pre-wrap;
}
</style>