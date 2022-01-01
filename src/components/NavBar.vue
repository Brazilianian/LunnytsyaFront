<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Головна</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/admin">Адміністратор</a>
          </li>
        </ul>

        <form class="d-flex">
          <button class="btn btn-outline-success" type="submit">Профіль</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "nav-bar"
}
</script>

<style scoped>

</style>