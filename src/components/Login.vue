<!-- <template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <input v-model.trim="username" placeholder="Username" />
        <span v-if="errors.username" class="error">{{ errors.username }}</span>
      </div>
      <div>
        <input v-model="password" type="password" placeholder="Password" />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errors: {}
    }
  },
  methods: {
    login() {
      this.errors = {}

      if (!this.username) this.errors.username = "You crazy or what?"
      if (!this.password) this.errors.password = "Password is required"

      if (Object.keys(this.errors).length === 0) {
        localStorage.setItem('user', this.username)
        this.$router.push('/StaffSync')
      }
    }
  }
}
</script>

<style>
.error { color: red; font-size: 0.8rem; }
.login { max-width: 300px; margin: auto; padding-top: 2rem; }
.login input { display: block; margin-bottom: 0.5rem; width: 100%; }
</style> -->

<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <input v-model.trim="username" placeholder="Username" />
        <span v-if="errors.username" class="error">{{ errors.username }}</span>
      </div>
      <div>
        <input v-model="password" type="password" placeholder="Password" />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>
      <button type="submit" @click="login">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errors: {}
    }
  },
  methods: {
    login() {
      this.errors = {}

      if (!this.username) this.errors.username = "Username is required"
      if (!this.password) this.errors.password = "Password is required"
    
      if (Object.keys(this.errors).length === 0) {
        // Save a token or user info to indicate logged-in state
        localStorage.setItem('user', this.username)
        // Redirect to main app
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>
.error { color: red; font-size: 0.8rem; }
.login { max-width: 300px; margin: auto; padding-top: 2rem; }
.login input { display: block; margin-bottom: 0.5rem; width: 100%; }
</style>
