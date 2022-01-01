<template>
  <nav-bar></nav-bar>
  
  <div
      id="background"
      class="vh-75 vw-100"
  >

  </div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      HTTP_REQUEST: 'http://localhost:8888/api/v1',
    }
  },
  methods: {
    getBackgroundImage() {
      try {
        axios.get(this.HTTP_REQUEST + '/background-image/get-main')
            .then(response => {
              this.setBackgroundImage(response.data.content);
            })
            .catch(error => {
              alert(error);
            })
      } catch (error) {
        alert(error);
      }
    },
    setBackgroundImage(content) {
      let background = document.getElementById('background');
      background.setAttribute("style", 'background-image: url("' + content + '")');
    }
  },
  mounted() {
    this.getBackgroundImage();
  }
}
</script>

<style scoped>
.vh-75{
  height: 75vh;
}
</style>