<template>
  <div class="employees-page">
    <div class="table-container">
      <div class="table-header">
        <h1>Employee Info</h1>
        <router-link to="/employees/add" class="add-btn">
          <i class="ti ti-user-plus" aria-hidden="true"></i>
          Add employee
        </router-link>
      </div>

      <LoadingSpinner v-if="loading" message="Fetching employees..." />

      <table class="employee-table" v-else>
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
          <tr v-for="emp in employees" :key="emp.id">
            <td>{{ emp.name }}</td>
            <td>{{ emp.position }}</td>
            <td>{{ emp.department }}</td>
            <td>R{{ emp.salary.toLocaleString() }}</td>
            <td>{{ emp.employment_history }}</td>
            <td>{{ emp.contact }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner.vue'

export default {
  components: { LoadingSpinner },
  data() {
    return {
      employees: [],
      loading: true
    }
  },
  async mounted() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/employees/`)
      this.employees = response.data
    } catch (error) {
      console.error('Failed to fetch employees:', error)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style>
.employees-page {
  min-height: 100vh;
  background: #f4f6f8;
  padding: 30px;
}

.table-container {
  max-width: 1200px;
  margin: auto;
  background: white;
  padding: 25px;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table-container h1 {
  font-size: 22px;
  font-weight: 500;
  color: #2c2c2a;
  margin: 0;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  background: #185fa5;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
}

.add-btn:hover { background: #0c447c; color: white; }

.employee-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.employee-table th {
  background: #185fa5;
  color: white;
  padding: 12px;
  text-align: left;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.employee-table td {
  padding: 12px;
  border-bottom: 0.5px solid #e8e8f0;
  color: #2c2c2a;
}

.employee-table tbody tr:hover { background: #f4f6f8; }

.employee-table td:last-child {
  color: #185fa5;
  font-weight: 500;
}

.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(8px); }

@media (max-width: 768px) {
  .employee-table { font-size: 12px; }
}
</style>