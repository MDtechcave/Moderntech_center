<template>
  <div class="about-page">

    <div class="hero-section">
      <h1>About Staff Sync</h1>
      <p>Streamlining HR operations for the modern workplace</p>
    </div>

    <h2>What this system does</h2>
    <p>
      The system helps teams manage employee records,
      attendance, payroll, and performance in one place.
    </p>

    <h2>Features</h2>
    <ul>
      <li>Employee Management</li>
      <li>Attendance Tracking</li>
      <li>Payroll System</li>
    </ul>

    <div class="features">
      <div class="feature-card">
        <i class="fa-solid fa-users fa-2x"></i>
        <h3>Employee Management</h3>
        <p>Keep track of all employee details efficiently.</p>
      </div>

      <div class="feature-card">
        <i class="fa-solid fa-money-check-dollar fa-2x"></i>
        <h3>Payroll System</h3>
        <p>Automated payroll calculations with accuracy.</p>
      </div>

      <div class="feature-card">
        <i class="fa-solid fa-calendar-check fa-2x"></i>
        <h3>Attendance Tracking</h3>
        <p>Monitor attendance and leave with ease.</p>
      </div>
    </div>

    <h2>Who is it for</h2>
    <p>
      This platform is designed for HR managers,
      administrators, and small to medium-sized organizations.
    </p>

  </div>
</template>

<script>
export default {
  name: "About"
}
</script>
<style>
.about-page {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.hero-section {
  text-align: center;
  margin-bottom: 30px;
}

.hero-section h1 {
  color: #2a2a72;
}

h2 {
  margin-top: 30px;
  color: #333;
}

ul {
  margin-left: 20px;
}

.features {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.feature-card {
  background: #f4f6fc;
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
}

.feature-card i {
  color: #2a2a72;
  margin-bottom: 10px;
}
</style>

