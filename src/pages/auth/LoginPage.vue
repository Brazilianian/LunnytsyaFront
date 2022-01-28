<template>

  <nav-bar></nav-bar>

  <h3 class="text-center mt-5 pt-3">Login page</h3>

  <div class="container">
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10">

        <label for="username">Ім'я користувача</label>
        <input id="username" v-model="userDto.username" type="text" class="form-control">

        <label for="password">Пароль</label>
        <input id="password" v-model="userDto.password" type="text" class="form-control">

        <button class="btn btn-primary float-end" @click="login">Увійти</button>

        <a href="/registration" class="link-primary">Зареєструватися</a>
      </div>
      <div class="col-md-1"></div>
    </div>
  </div>

  <h6>{{ response }}</h6>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  components: {},

  data() {
    return {
      userDto: {
        username: '',
        password: '',
      },
      response: '',
    }
  },
  methods: {
    async login() {
      try {
        await axios.post('/auth/login', this.userDto).then(response => {
          console.log(response);
         if (response.status === 200) {
           localStorage.setItem("token", response.data.jwtToken);
         }
        }).catch(error => {
          console.log(error.response);
          this.response = error.response.data.trace;
        })
      } catch (e) {
        alert(e);
      }
    }
  },
}
</script>

<style scoped>

</style>