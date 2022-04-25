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
            </ul>
          </li>
        </ul>

        <form class="d-flex me-2">
          <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#basket">
            <fas class="fs-5" icon="shopping-basket"></fas>
          </button>
        </form>

        <form class="d-flex" v-if="!isAuthorized">
          <a href="/login" class="btn btn-outline-success" type="submit">
            <fas icon="user"></fas>
          </a>
        </form>

        <form class="d-flex" v-if="isAuthorized">
          <a href="/profile" class="btn btn-outline-success" type="submit">
            <fas icon="id-card"></fas>
          </a>
        </form>
      </div>
    </div>

  </nav>


  <basket-modal></basket-modal>
</template>

<script>
import {checkIsAdmin, checkIsAuthorized} from "../../public/js/security";

export default {
  name: "nav-bar",
  data() {
    return {
      isAuthorized: false,
      isAdmin: false,
    }
  },

  mounted() {
    checkIsAuthorized().then(res => this.isAuthorized = res);
    checkIsAdmin().then(res => this.isAdmin = res);
  }
}
</script>

<style scoped>

</style>