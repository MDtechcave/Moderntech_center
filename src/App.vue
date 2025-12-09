<script >
import HrHome from './components/HrHome.vue';
import NavBar from './components/NavBar.vue';
export default {
  components: {
    NavBar
  }
};
</script>

<template>
  <!-- <div> -->
  <!-- <hr-home/> -->
  <nav-bar/>
  <router-view />
  <!-- </div>  -->
</template>

<style scoped>


</style>
