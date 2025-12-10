<template>
  <!-- <div>
    <h1>Welcome, {{ username }}</h1>
    <button @click="logout">Logout</button>
  </div> -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      
      <!-- WEB APP NAME -->
      <router-link class="navbar-brand fw-bold" to="/">
        StaffSync
      </router-link>

      <!-- Mobile toggle -->
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

      <!-- Nav items -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">

          <!-- Dropdown -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
            >
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
              <li><router-link class="dropdown-item" to="/workreviews">Reviews</router-link></li>
            </ul>
          </li>

          <!-- About -->
          <li class="nav-item">
            <router-link class="nav-link" to="/about">
              About
            </router-link>
          </li>

          <!-- Logout -->
          <li class="nav-item">
  <a class="nav-link text-warning" href="#" @click="logout">
    Logout
  </a>
</li>

        </ul>

        <!-- Search -->
        <form class="d-flex ms-auto" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="search"
          />
          <button class="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>

      </div>
    </div>
  </nav>
</template>

<script>
// export default {
//   methods: {
//     logout() {
//       localStorage.clear()
//       this.$router.push('/login')
//     }
//   }
// }
export default {
  data() {
    return {
      username: localStorage.getItem('user') || ''
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  }
}
</script>
<style>
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

