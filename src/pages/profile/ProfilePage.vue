<template>
  <div class="main vh-100 overflow-hidden text-white">
    <nav-bar></nav-bar>

    <div class="container mt-5">
      <div class="row">

        <div class="col-3 mt-5 p-2 border-end border-2 text-center">

          <img
              id="productEditImage"
              :class="'img-thumbnail ' + [profile.image === null ? 'invisible' : '']"
              :src="profile.image"
          >
          <img src="@/assets/images/no-image.png" class="img-thumbnail" v-if="profile.image === null">

          <div class="text-center">
            <input type="file" name="image" class="form-control mt-1" accept="image/*" @change="imageChange"
                   ref="productImage">
          </div>

        </div>
        <div class="col-9 mt-5">

          <h3 class="fst-italic">{{ profile.username }}</h3>

          <table class="table table-dark table-striped ">
            <tbody>
            <tr>
              <td>Ім'я:</td>
              <td><input type="text" class="form-control" placeholder="Введіть ім'я"
                         v-model="profile.name"
                         @change="classChange('button', 'btn-success', 'btn-primary')"></td>
            </tr>
            <tr>
              <td>Прізвище:</td>
              <td><input type="text" class="form-control" placeholder="Введіть прізвище"
                         v-model="profile.surname"
                         @change="classChange('button', 'btn-success', 'btn-primary')"></td>
            </tr>
            <tr>
              <td>E-mail:</td>
              <td><input type="email" class="form-control" placeholder="Введіть email"
                         v-model="profile.email"
                         @change="classChange('button', 'btn-success', 'btn-primary')"></td>
            </tr>
            </tbody>
          </table>

          <button id="button" class="btn btn-success float-end" @click="saveChanges">Зберегти зміни</button>

          <button class="btn btn-danger float-end mx-2" @click="logout">
            <fas icon="sign-out-alt"></fas>
          </button>

          <div v-if="isAdmin">
            <h5 class="text-success fst-italic">Ви адмінітратор!</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router";

export default {
  name: "ProfilePage",
  data() {
    return {
      token: '',
      isAuthorized: false,
      profile: {
        image: '',
        username: '',
        name: '',
        surname: '',
        authorities: [],
        email: '',
      },
      validation: {

      }
    }
  },

  methods: {
    logout() {
      if (confirm('Ви дійсно бажаєте вийти?')) {
        localStorage.setItem('token', '');
        router.push('/login');
      }
    },

    classChange(buttonId, classFrom, classTo) {
      let button = document.getElementById(buttonId);
      button.className = button.className.replace(classFrom, classTo);
    },

    imageChange(event) {
      let productEditImage = document.getElementById('productEditImage');
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = (event) => {
        productEditImage.src = event.target.result;
        this.profile.image = event.target.result;
      }

      this.classChange("button", 'btn-success', 'btn-primary');
    },

    isAdmin() {
      this.profile.authorities.forEach(role => {
        if (role === 'ADMIN') {
          return true;
        }
      });
      return false;
    },

    async saveChanges() {
      await axios.put('/profile', this.profile, {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      }).then(response => {
        if (response.status === 200) {
          this.classChange('button', 'btn-primary', 'btn-success');
        }
        console.log(response)
        }).catch(e => {
          alert(e)
      })
    },

    async getProfile() {
      await axios.get('/profile', {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      }).then(response => {
        if (response.status === 200) {
          this.profile = response.data;
        }
      }).catch(error => {
        if (error.response.status === 403) {
          this.checkIsAuthorized();
        }
      });
    },

    async checkIsAuthorized() {
      this.token = localStorage.getItem("token");

      await axios.get('/check/auth', {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      }).then(response => {
        if (response.status === 200) {
          this.isAuthorized = true;
        } else {
          this.isAuthorized = false;
          this.$router.push('/');
        }
      }).catch(() => {
        this.isAuthorized = false;
        this.$router.push('/');
      })
    },
  },

  async mounted() {
    await this.checkIsAuthorized();

    await this.getProfile();
  }
}
</script>

<style scoped>
.main {
  background: #1a1a1a;
}
</style>