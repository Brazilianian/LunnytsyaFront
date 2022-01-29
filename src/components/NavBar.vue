<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Лунниця</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/product">Намиста</a>
          </li>
          <li class="nav-item dropdown" v-if="isAdmin">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
               aria-expanded="false">
              Адміністратор
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="/admin">Створення продукту</a></li>
              <li><a class="dropdown-item" href="/admin/main-page">Налаштування головної сторінки</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex" v-if="!isAuthorized">
          <a href="/login" class="btn btn-outline-success" type="submit">Увійти</a>
        </form>
        <form class="d-flex" v-if="isAuthorized">
          <a href="/profile" class="btn btn-outline-success" type="submit">Профіль</a>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: "nav-bar",
  data() {
    return {
      isAuthorized: false,
      isAdmin: false,
    }
  },

  methods: {
    getToken() {
      return localStorage.getItem("token");
    },

    async checkIsAdmin() {
      this.token = this.getToken();

      await axios.get('/admin/check', {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      }).then(response => {
          this.isAdmin = response.status === 200;
      }).catch(() => {
        this.isAdmin = false
      })
    },

    async checkIsAuthorized(){
      this.token = this.getToken();

      await axios.get('/check/auth', {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      }).then(response => {
        this.isAuthorized = response.status === 200;
      }).catch(() => {
        this.isAuthorized = false;
      })
    },
  },

  async mounted() {
    await this.checkIsAuthorized()

    if (this.isAuthorized) {
      await this.checkIsAdmin();
    }
  }
}
</script>

<style scoped>

</style>