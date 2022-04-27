<template>
  <div class="container">
    <div class="row">
      <div class="col-6 border-end">
        <div class="mb-3 has-validation">
          <div class="m-1">Ім'я</div>
          <input
              type="text" class="form-control" v-model="profile.name"
              :class="profileValidation.name !== undefined? 'is-invalid' : ''"
          >
          <div class="valid-feedback">
            {{ profileValidation.name }}
          </div>
        </div>

        <div class="mb-3 has-validation">
          <div class="m-1">Номер телефону</div>
          <input
              type="text" class="form-control" v-model="profile.phone"
              :class="profileValidation.phone !== undefined? 'is-invalid' : ''"
          >
          <div class="valid-feedback">
            {{ profileValidation.phone }}
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="mb-3 has-validation">
          <div class="m-1">Прізвище</div>
          <input
              type="text" class="form-control my-0" v-model="profile.surname"
              :class="profileValidation.surname !== undefined? 'is-invalid' : ''"
          >
          <div class="valid-feedback">
            {{ profileValidation.surname }}
          </div>
        </div>

        <div class="mb-3 has-validation">
          <div class="m-1">Поштова скринька</div>
          <input
              type="text" class="form-control my-0" v-model="profile.email"
              :class="profileValidation.email !== undefined? 'is-invalid' : ''"
          >
          <div class="valid-feedback">
            {{ profileValidation.email }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getProfile} from "../../../public/js/user_worker";

export default {
  name: "PersonalInfo",

  data() {
    return {
      profile: {},
      profileValidation: {}
    }
  },

  mounted() {
    getProfile().then(profile => {
      this.profile = profile;
    });
  }
}
</script>

<style scoped>

</style>