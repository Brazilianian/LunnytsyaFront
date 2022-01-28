<template>
  <nav-bar/>

  <h3 class="text-center mt-5 pt-3">Реєстрація</h3>

  <div class="container">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">

        <label for="username">Username</label>
        <input id="username" v-model="user.username" type="text" class="form-control">

        <label for="password">Password</label>
        <input id="password" v-model="user.password" type="password" class="form-control">

        <button class="btn btn-primary" @click="registration">Зареєструвати</button>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import bcrypt from "bcryptjs"

export default {
  name: "RegistrationPage",
  data() {
    return {
      rounds: 8,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async registration() {
      try {
        if (this.user.password !== '') {
          this.user.password = await bcrypt.hash(this.user.password, this.rounds);

          await axios.post('/auth/registration', this.user).then(response => {
            console.log(response);
          }).catch(error => {
            console.log(error.response);
          })
        }
      } catch (e) {
        alert(e);
      }
    }
  }

}
</script>

<style scoped>

</style>