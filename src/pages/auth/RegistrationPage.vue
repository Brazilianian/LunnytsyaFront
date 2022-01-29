<template>

  <nav-bar></nav-bar>

  <div class="main overflow-hidden">
    <div class="container">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8 bg-dark opacity-90 rounded-3 p-3 text-white">

          <div class="mb-3 fs-3 has-validation">
            <label class="form-label" for="username">Ім'я користувача:</label>
            <input
                :class="'form-control ' + [validationMessage.username === undefined ? '' : 'is-invalid']"
                id="username" v-model="user.username" placeholder="Username" type="text" class="form-control">
            <div v-if="validationMessage.username !== undefined" class="invalid-feedback">
              {{ validationMessage.username }}
            </div>
          </div>

          <div class="mb-3 fs-3 has-validation">
            <label class="form-label" for="password">Пароль</label>
            <input
                :class="'form-control ' + [validationMessage.password === undefined ? '' : 'is-invalid']"
                id="password" v-model="user.password" placeholder="Password" type="password" class="form-control">
            <div v-if="validationMessage.password !== undefined" class="invalid-feedback">
              {{ validationMessage.password }}
            </div>
          </div>

          <div class="mb-3 fs-3 has-validation">
            <label for="password2">Пароль</label>
            <input
                :class="'form-control ' + [validationMessage.password2 === undefined ? '' : 'is-invalid']"
                id="password2" v-model="user.password2" placeholder="Password" type="password" class="form-control">
            <div v-if="validationMessage.password2 !== undefined" class="invalid-feedback">
              {{ validationMessage.password2 }}
            </div>
          </div>
          <button type="submit" class="btn btn-primary float-end" @click="registration">Зареєструватися</button>
          <h5>
            Не маєте акаунт?
            <a href="/registration" class="link-primary">Зареєструйтесь</a>
          </h5>
        </div>
        <div class="col-2"></div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import bcrypt from "bcryptjs"

export default {
  name: "RegistrationPage",
  components: {},

  data() {
    return {
      rounds: 8,
      user: {
        username: '',
        password: '',
        password2: '',
      },
      validationMessage: {
      }
    }
  },
  methods: {
    async registration() {
      try {
        if (this.user.password !== this.user.password2) {
          this.validationMessage.password = "Паролі мають співпадати";
          this.validationMessage.password2 = "Паролі мають співпадати";
          return;
        }

        if (this.user.password !== '') {
          await axios.post('/auth/registration', {
            username: this.user.username,
            password: await bcrypt.hash(this.user.password, this.rounds),
            password2: await bcrypt.hash(this.user.password2, this.rounds),
          }).then(response => {
            if (response.status === 200) {
              this.$router.push('/login');
            }
          }).catch(error => {
            if (error.response.status === 422) {
              this.validationMessage = error.response.data;
            }
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

.main {
  background-image: url(../../assets/images/background.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
}

.container{
  margin-top: 15vh;
}

.opacity-90 {
  opacity: 90%;
}
</style>