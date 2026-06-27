<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand fw-bold" to="/">
        StaffSync
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
       <ul class="navbar-nav">
  <li class="nav-item dropdown" v-if="role === 'admin'">
    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
      HR Management
    </a>
    <ul class="dropdown-menu">
      <li>
        <router-link class="dropdown-item" to="/employees">
          Employee Management
        </router-link>
      </li>
      <li>
        <router-link class="dropdown-item" to="/attendance">
          Attendance Management
        </router-link>
      </li>
      <li>
        <router-link class="dropdown-item" to="/payroll">
          Payroll Management
        </router-link>
      </li>
      <li>
        <router-link class="dropdown-item" to="/workreviews">
          Reviews
        </router-link>
      </li>
    </ul>
  </li>

  <li class="nav-item" v-if="role === 'admin'">
    <router-link class="nav-link" to="/about">About</router-link>
  </li>

  <li class="nav-item" v-if="role === 'employee'">
    <router-link class="nav-link" to="/">Home</router-link>
  </li>

  <li class="nav-item">
    <a class="nav-link text-warning" href="#" @click="logout">Logout</a>
  </li>
</ul>

        <form class="d-flex ms-auto" role="search" v-if="role === 'admin'">
          <input class="form-control me-2" type="search" placeholder="Search" />
          <button class="btn btn-outline-light" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>
<script>
import { supabase } from '../supabase'

export default {
  data() {
    return {
      role: localStorage.getItem('role') || 'employee'
    }
  },
  methods: {
    async logout() {
      await supabase.auth.signOut()
      localStorage.removeItem('user')
      localStorage.removeItem('role')
      this.$router.push('/login')
    }
  }
}
</script><style>
  .navbar-brand {
  letter-spacing: 1px;
}

.dropdown-menu {
  font-size: 14px;
}

.nav-link {
  cursor: pointer;
}

</style>

