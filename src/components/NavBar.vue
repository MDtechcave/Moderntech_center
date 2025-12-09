 <template>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div class="container-fluid">
    <router-link class="navbar-brand" to="/">Staff Sync</router-link>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
         <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" >
            Home
          </a>
          <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" to="/employees">Employees manangement</router-link></li>
            <li><router-link class="dropdown-item" to="/payroll" >Payroll manangement</router-link></li>
            <li><router-link class="dropdown-item" to="/attendance">Attendance manangement</router-link></li>
          </ul>
        </li>
        
        <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">LOGOUT</a>
        </li> 
        </ul>

        <form class="d-flex ms-auto" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      
    </div>
  </div>
</nav> 
    </template>
    <script></script>
    <style>

    </style>
 
