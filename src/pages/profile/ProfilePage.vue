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
          <img src="@/assets/images/no-image.png" class="img-thumbnail"
               v-if="profile.image === null || profile.image === ''">

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
              <td class="has-validation">
                <input type="text" class="form-control" placeholder="Введіть ім'я"
                         v-model="profile.name">
                <div v-if="profileValidation?.name !== undefined" class="invalid-feedback">
                  {{ profileValidation.name }}
                </div>
              </td>
            </tr>
            <tr>
              <td>Прізвище:</td>
              <td class="has-validation">
                <input type="text" class="form-control" placeholder="Введіть прізвище"
                         v-model="profile.surname">
                <div v-if="profileValidation?.surname !== undefined" class="invalid-feedback">
                  {{ profileValidation.surname }}
                </div>
              </td>
            </tr>
            <tr>
              <td>E-mail:</td>
              <td class="has-validation">
                <input type="email" class="form-control" placeholder="Введіть email"
                       :class="profileValidation?.email === undefined? '' : 'is-invalid'"
                         v-model="profile.email">
                <div v-if="profileValidation?.email !== undefined" class="invalid-feedback">
                  {{ profileValidation.email }}
                </div>
              </td>
            </tr>
            <tr>
              <td>Номер телефону:</td>
              <td class="has-validation">
                <input type="text" class="form-control" placeholder="Введіть номер телефону"
                       :class="profileValidation?.phone === undefined? '' : 'is-invalid'"
                       v-model="profile.phone">
                <div v-if="profileValidation?.phone !== undefined" class="invalid-feedback">
                  {{ profileValidation.phone }}
                </div>
              </td>
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
import {changeButtonClass, clearValidation} from "../../../public/js/UI_worker";

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
        profileValidation: {},
    }
  },

  methods: {
    userLogout() {
      if (confirm('Ви дійсно бажаєте вийти?')) {
        logout();
      }
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

      changeButtonClass("button", 'btn-success', 'btn-primary');
    },


    saveChanges() {
      saveProfileChanges(this.profile).then(response => {
        if (response.status === 200) {
          clearValidation()
        } else if (response.status === 422) {
          this.profileValidation = response.data;
          console.log(this.profileValidation)
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