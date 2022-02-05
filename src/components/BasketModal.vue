<template>
  <div class="position-absolute">
    <!-- Button trigger modal -->
    <div class="position-fixed end-0 bottom-0 mb-2 me-2">
      <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <fas class="fs-1" icon="shopping-basket"></fas>
      </button>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Корзина</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
<!--          {{ $co }}-->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрити</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "basket-modal",

  data() {
    return {
      user: {
        basket: {

        }
      }
    }
  }
}
</script>

<style scoped>
</style>