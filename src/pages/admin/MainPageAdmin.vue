<template v-if="isAdmin">
  <h3 class="text-center mt-5 pt-2">Зображення головної сторінки</h3>

  <div
      id="background"
      :class="'vh-75 border border-4 border-primary m-2 rounded-3 no-repeat cover bg-position-center ' + [backgroundImage.content === '' ? 'no-image' : '']"
  >
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
        <label for="background-image" class="form-label">Виберіть зображення</label>
        <input id="background-image" type="file" accept="image/*" class="form-control"
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
              :src="author.image === '' ? '' : author.image"
              :class="'img-thumbnail ' + [author.image === '' ? 'invisible' : '']">

          <img v-if="author.image === ''" src="@/assets/images/no-image.png" class="img-thumbnail">
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
          <label for="background-image" class="form-label">Виберіть зображення</label>
          <input @change="authorImageChange" type="file" accept="image/*" class="form-control">
        </div>

      </div>
      <div class="col-md-8">
        <div class="mt-3 has-validation">
          <label for="author-description" class="form-label">Введіть опис</label>
          <textarea
              v-model="author.description"
              id="author-description"
              :class="'form-control no-resize ' + [authorValidation.description === undefined ? '' : 'is-invalid']"
              rows="6"
              placeholder="Опис"></textarea>
          <div class="invalid-feedback">
            {{ authorValidation.description }}
          </div>
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

import {checkIsAdmin} from "../../../public/js/security";
import {
  getAuthor,
  getBackgroundImage,
  saveBackground,
  saveAuthor
} from "../../../public/js/page/admin/main_page";

import {changeButtonClass, clearValidation} from "../../../public/js/UI_worker";

export default {
  data() {
    return {
      backgroundFile: '',
      authorImageFile: '',

      backgroundImage: {
        content: '',
      },
      author: {
        image: '',
        description: '',
      },
      backgroundValidation: '',
      authorValidation: {},
      token: '',
      isAdmin: ''
    }
  },

  methods: {
    backgroundImageChange(event) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (reader) => {
        this.backgroundImage.content = reader.target.result;
        changeButtonClass('background-button', 'btn-success', 'btn-primary');
      };
    },

    authorImageChange(event) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (reader) => {
        this.author.image = reader.target.result;
        changeButtonClass('author-button', 'btn-success', 'btn-primary');
      };
    },

    saveBackground() {
      saveBackground(this.backgroundImage).then((response) => {
        if (response.status === 200) {
          changeButtonClass('background-button', 'btn-primary', 'btn-success');
          clearValidation(['background-image']);
          this.backgroundValidation = '';
        } else if (response.status === 422) {
          this.backgroundValidation = response.data;
        }
      });
    },

    saveAuthor() {
      saveAuthor(this.author).then(response => {
        if (response.status === 200) {
          changeButtonClass('author-button', 'btn-primary', 'btn-success')
          clearValidation(['author-description', 'author-image']);
          this.authorValidation = {};
        } else if (response.status === 422) {
          this.authorValidation = response.data;
        }
      })
    }
  },

  watch: {
    'author.image': {
      handler: function (image) {
        let authorImg = document.getElementById('author-image');
        authorImg.src = image;
      },
      deep: true
    },

    'backgroundImage.content': {
      handler: function (content) {
        let backgroundImageDiv = document.getElementById('background');
        backgroundImageDiv.style.backgroundImage = 'url(' + content + ')';
      },
      deep: true
    },

    'author.description': {
      handler: function () {
        changeButtonClass('author-button', 'btn-success', 'btn-primary');
        clearValidation(['author-description'])
      },
      deep: true
    }
  },

  beforeCreate() {
    checkIsAdmin().then(isAdmin => {
      this.isAdmin = isAdmin;
      if (isAdmin) {
        getBackgroundImage().then(bi => {
          this.backgroundImage = bi;
        });
        getAuthor().then(author => {
          this.author = author;
        });
      } else {
        this.$router.push('/');
      }
    })
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

.no-image {
  background-image: url(../../assets/images/no-image.png);
}
</style>