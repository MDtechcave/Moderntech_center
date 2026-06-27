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
      const response = await axios.get('http://127.0.0.1:8000/employees/')
      this.employees = response.data
    } catch (error) {
      console.error('Failed to fetch employees:', error)
    } finally {
      this.loading = false
    }
  }
}
</script>