<script>
import SideBar from '../src/components/Sidebar.vue'

export default {
  components: { SideBar }
}
</script>

<template>
  <div class="app-layout">
    <SideBar v-if="$route.path !== '/login'" />
    <main class="main-content" :class="{ 'with-sidebar': $route.path !== '/login' }">
      <router-view />
    </main>
  </div>
</template>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #f4f6f8;
}

.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  transition: margin-left 0.25s ease;
}

.main-content.with-sidebar {
  margin-left: 220px;
}
</style>

