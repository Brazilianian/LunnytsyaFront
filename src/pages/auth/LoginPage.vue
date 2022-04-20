<template>

  <div class="main overflow-hidden">
    <div class="container">
      <div class="row">

        <div class="col-2"></div>

        <div class="col-8 bg-dark opacity-90 rounded-3 p-3 text-white has-validation">
          <div class="mb-3 fs-3">
            <label class="form-label" for="username">Ім'я користувача:</label>
            <input id="username" v-model="userDto.username" placeholder="Username" type="text"
                   :class="'form-control ' + [validationMessage === '' ? '' : 'is-invalid']">
          </div>

          <div class="mb-3 fs-3 ">
            <label class="form-label" for="password">Пароль</label>
            <input id="password" v-model="userDto.password" placeholder="Password" type="password"
                   :class="'form-control ' + [validationMessage === '' ? '' : 'is-invalid']">

            <div class="invalid-feedback">
              {{ validationMessage }}
            </div>
          </div>

          <button class="btn btn-primary float-end" @click="login">Увійти</button>
          <h5>
            Не маєте акаунт?
            <a href="/registration" class="link-primary">Зареєструйтесь!</a>
          </h5>

        </div>
        <div class="col-2"></div>

      </div>
    </div>

  </div>

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
      validationMessage: '',
    }
  },

  methods: {
    async login() {
      try {
        await axios.post('/auth/login', this.userDto).then(response => {
          console.log(response);
          if (response.status === 200) {
            localStorage.setItem("token", response.data.jwtToken);
            this.$router.push('/');
          }
        }).catch(error => {
          if (error.response.status === 403) {
            this.validationMessage = 'Невірне ім\'я користувача або пароль';
            return;
          }
          this.validationMessage = '';
        })
      } catch (e) {
        alert(e);
      }
    }
  },
}
</script>

<style scoped>

.main {
  background-image: url(../../assets/images/background.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
}

.container {
  margin-top: 15vh;
}

.opacity-90 {
  opacity: 90%;
}
</style>