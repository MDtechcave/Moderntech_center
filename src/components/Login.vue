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

<!-- <template>
  <div class="login">
    <h2>StaffSync</h2>
    <form @submit.prevent="login">
      <div>
        <input v-model.trim="username" placeholder="username" />
        <span v-if="errors.username" class="error">{{ errors.username }}</span>
      </div>
      <div>
        <input v-model="password" type="password" placeholder="Password" />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>
    <div class="forgot-password">
      <a href="#" @click.prevent>Forgot password?</a>
    </div>

      <button type="submit">Login</button>
    </form>
    <p class="login-footer">© 2025 StaffSync</p>

  </div>
</template> -->
<template>
  <div class="login-page">
    <div class="login-card">
      <h2>StaffSync HR Portal</h2>
      <p class="subtitle">Human Resource Management System</p>

      <form @submit.prevent="login">
        <div class="field">
          <input
            v-model.trim="username"
            placeholder="Username"
          />
          <span v-if="errors.username" class="error">
            {{ errors.username }}
          </span>
        </div>

        <div class="field">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
          />
          <span v-if="errors.password" class="error">
            {{ errors.password }}
          </span>
        </div>

        <div class="forgot-password">
          <a href="#" @click.prevent>Forgot password?</a>
        </div>

        <button type="submit">Login</button>
      </form>

      <p class="login-footer">© 2025 StaffSync</p>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      errors: {}
    };
  },
  methods: {
    login() {
      this.errors = {};

      if (!this.username) this.errors.username = "Username is required";
      if (!this.password) this.errors.password = "Password is required";

      if (Object.keys(this.errors).length === 0) {
        localStorage.setItem("user", this.username);
        this.$router.push("/");
      }
    }
  }
};

</script>
<style>
/* Page background */
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Card */
.login-card {
  width: 100%;
  max-width: 380px;
  background: #ffffff;
  padding: 35px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
  text-align: center;
}

/* Title */
.login-card h2 {
  color: #2a2a72;
  margin-bottom: 5px;
  font-weight: 700;
}

/* Subtitle */
.subtitle {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 25px;
}

/* Input fields */
.field {
  text-align: left;
}

.login-card input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  margin-bottom: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.login-card input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

/* Error text */
.error {
  color: #dc2626;
  font-size: 0.8rem;
  margin-bottom: 10px;
  display: block;
}

/* Forgot password */
.forgot-password {
  text-align: right;
  margin: 10px 0 18px;
}

.forgot-password a {
  font-size: 0.85rem;
  color: #2563eb;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

/* Button */
.login-card button {
  width: 100%;
  padding: 12px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-card button:hover {
  background: #1e40af;
  transform: translateY(-1px);
}

/* Footer */
.login-footer {
  margin-top: 20px;
  font-size: 0.8rem;
  color: #6b7280;
}
</style>

<!-- <style>
  /* Page background */
body {
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Login container */
/* .login {
  max-width: 380px;
  margin: 80px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
} */
.login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Title */
.login h2 {
  margin-bottom: 20px;
  color: #2a2a72;
  font-weight: 600;
}

/* Inputs */
.login input {
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  transition: border 0.3s;
}

.login input:focus {
  outline: none;
  border-color: #2a5298;
}

/* Error message */
.error {
  color: #e53935;
  font-size: 12px;
  display: block;
  margin-bottom: 6px;
  text-align: left;
}

/* Button */
.login button {
  width: 100%;
  padding: 12px;
  background: #2a5298;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.login button:hover {
  background: #1e3c72;
  transform: translateY(-1px);
}

.forgot-password {
  text-align: right;
  margin-bottom: 15px;
}

.forgot-password a {
  font-size: 0.85rem;
  color: #2563eb;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

.error { color: red;
   font-size: 0.8rem;
   }

.login { 
  max-width: 300px;
  margin: auto;
  padding-top: 2rem; 
}

.login input { 
  display: block;
   margin-bottom: 0.5rem;
    width: 100%; 
  }

.login-footer {
  margin-top: 20px;
  font-size: 0.8rem;
  color: #777;
  text-align: center;
}

</style> -->
