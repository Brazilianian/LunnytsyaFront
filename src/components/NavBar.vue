<template>


  <nav class="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">

    <div class="container-fluid">
      <a class="navbar-brand" href="/">Головна</a>
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

    checkIsAdmin() {
      this.token = this.getToken();

      axios.get('/admin/check', {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      }).then(response => {
        if (response.status === 200) {
          this.isAdmin = true;
          this.$emit('admin', true);
        }
      }).catch((e) => {
        let exception = e.response.headers.exception;
        if (e.response.status === 403 && exception !== null) {
          this.refreshToken(false);
        } else {
          this.isAdmin = false;
          this.$emit('admin', false);
        }
      })
    },

    refreshToken(isAuth) {
      console.log('refresh token')
      axios.get('/auth/refresh-token', {
        headers: {
          'Authorization': 'Bearer ' + this.token,
          'isRefreshToken': 'true'
        }
      }).then(response => {
        if (response.status === 200) {
          console.log('success refresh')
          localStorage.setItem('token', response.data.jwtToken);
          if (isAuth) {
            this.checkIsAuthorized();
          } else {
            this.checkIsAdmin()
          }
        }
      })
    },

    checkIsAuthorized() {
      this.token = this.getToken();

      axios.get('/check/auth', {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      }).then(() => {
        this.isAuthorized = true;
        this.$emit('auth', true);
      }).catch(e => {
        if (e.response.status === 403) {
          let exception = e.response.headers.exception;
          if (exception !== null && exception !== undefined && exception.includes('JWT expired')) {
            this.refreshToken(true);
          } else {
            this.isAuthorized = false;
            this.$emit('auth', false);
          }
        }
      })
    }
  },

  mounted() {
    this.checkIsAuthorized()
    this.checkIsAdmin();
  }
}
</script>

<style scoped>

</style>