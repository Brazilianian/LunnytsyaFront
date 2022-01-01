<template>
  <nav>
    <ul class="pagination justify-content-center">
      <li
          :class="page === 0 ? 'page-item disabled' : 'page-item'"
      >
        <a
            class="page-link user-select-none"
            href="#"
            aria-label="Previous"
            @click="previousPage">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li
          v-for="numberPage in totalPages"
          :key="numberPage"
          :class="page + 1 === numberPage ? 'page-item active' : 'page-item'"
          @click="changePage"
      >
        <a class="page-link user-select-none" href="#">
          {{ numberPage }}
        </a>
      </li>

      <li
          :class="page + 1 === totalPages ? 'page-item disabled' : 'page-item'"
      >
        <a
            class="page-link user-select-none"
            href="#"
            aria-label="Next"
            @click="nextPage"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "pagination",
  props: {
    page: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    changePage(event) {
      this.$emit('changePage', event.target.innerHTML);
    },
    previousPage() {
      this.$emit('changePage', this.page);
    },
    nextPage() {
      this.$emit('changePage', this.page + 2);
    }
  }
}
</script>

<style scoped>

</style>