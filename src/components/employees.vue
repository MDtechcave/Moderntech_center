<template>

  <div class="employees-page">
  <div class="table-container">

    <h1>Employee Info</h1>

    <table class="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Employment History</th>
          <th>Contact</th>
        </tr>
      </thead>

      <transition-group tag="tbody" name="fade">
        <tr v-for="emp in employees" :key="emp.employeeId">
          <td>{{ emp.name }}</td>
          <td>{{ emp.position }}</td>
          <td>{{ emp.department }}</td>
          <td>{{ emp.salary }}</td>
          <td>{{ emp.employmentHistory }}</td>
          <td>{{ emp.contact }}</td>

        </tr>
      </transition-group>
    </table>
  </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      employees: []
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/employees')
      this.employees = response.data
    } catch (error) {
      console.error('Failed to fetch employees:', error)
    }
  }
}
</script>

<style>
  /* PAGE BACKGROUND */
.employees-page {
  min-height: 100vh;
  background: #f4f6f8;
  padding: 30px;
}

/* CONTAINER */
.table-container {
  max-width: 1200px;
  margin: auto;
  background: white;
  padding: 25px;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
}

/* TITLE */
.table-container h1 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
}

/* TABLE */
.employee-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

/* TABLE HEADERS */
.employee-table th {
  background: #1e3a8a; /* HR blue */
  color: white;
  padding: 12px;
  text-align: left;
  font-size: 13px;
  text-transform: uppercase;
}

/* TABLE BODY */
.employee-table td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

/* ROW HOVER */
.employee-table tbody tr:hover {
  background: #f1f5f9;
}

/* EMAIL STYLE */
.employee-table td:last-child {
  color: #2563eb;
  font-weight: 500;
}

/* TRANSITION */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .employee-table {
    font-size: 12px;
  }
}

</style>
