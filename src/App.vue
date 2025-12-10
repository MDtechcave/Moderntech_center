<script>
import NavBar from './components/NavBar.vue';

export default {
  components: { NavBar }
};
</script>

<template>
  <nav-bar v-if="$route.path !== '/login'" />
  <router-view />
</template>

