<template>
  <div class="main vh-100 overflow-hidden text-white">

    <div class="container mt-5">
      <div class="row">

        <div class="col-3 mt-5 p-2 border-end border-2 text-center">

          <img
              id="productEditImage"
              :class="'img-thumbnail ' + [profile.image === null || profile.image === '' ? 'invisible' : '']"
              :src="profile.image"
          >
          <img src="@/assets/images/no-image.png" class="img-thumbnail" v-if="profile.image === null || profile.image === ''">

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

          <button class="btn btn-danger float-end mx-2" @click="userLogout">
            <fas icon="sign-out-alt"></fas>
          </button>

          <div v-if="profile.isAdmin">
            <h5 class="text-success fst-italic">Ви адмінітратор!</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getProfile, saveProfileChanges} from "../../../public/js/user_worker"
import {logout} from "../../../public/js/page/profile_page";
import {goToMainPage} from "../../../public/js/router_worker";

export default {
  name: "ProfilePage",
  data() {
    return {
      profile: {
        name: '',
        surname: '',
        username: '',
        email: '',
        image: '',
        isAuthorized: false,
        isAdmin: false,
      },
      validation: {},
    }
  },

  methods: {
    userLogout() {
      if (confirm('Ви дійсно бажаєте вийти?')) {
        logout();
      }
    },

    classChange(buttonId, classFrom, classTo) {
      let button = document.getElementById(buttonId);
      button.className = button.className.replace(classFrom, classTo);
    },

    //todo import from js file maybe...
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


    saveChanges() {
      saveProfileChanges().then(profile => {
        if (profile !== null) {
          console.log(profile)
          this.classChange('button', 'btn-primary', 'btn-success');
        }
      });
    },
  },

  watch: {
    user(newUser) {
      if (newUser === null) {
        goToMainPage();
      }
    }
  },

  mounted() {
    getProfile().then(profile => {
      this.profile = profile
    });
  },
}
</script>

<style scoped>
.main {
  background: #1a1a1a;
}
</style>