
<template>
  <div class="container mt-5">
    <h1 class="mb-4">Payroll Payslips</h1>

    <div
  v-for="employee in payslips"
  :key="employee.employee_id"
  class="card mb-4 payslip-card"
>
      <div class="card-body">
        <h2 class="text-center mb-3">Payslip</h2>
        <h4>{{ employee.name }} - {{ employee.position }}</h4>
        <p><strong>Department:</strong> {{ employee.department }}</p>
        <p><strong>Contact:</strong> {{ employee.contact }}</p>

        <hr>
        <p><strong>Total Working Days:</strong> {{ employee.total_days }}</p>
        <p><strong>Days Present:</strong> {{ employee.present_days }}</p>
        <p><strong>Approved Leave:</strong> {{ employee.approved_leave }}</p>
        <p><strong>Days Absent:</strong> {{ employee.absent_days }}</p>

        <hr>
        <p><strong>Base Salary:</strong> R{{ employee.salary.toLocaleString() }}</p>
        <p><strong>Deduction for Absences:</strong> R{{ employee.deduction.toLocaleString() }}</p>
        <h5><strong>Final Salary:</strong> R{{ employee.final_salary.toLocaleString() }}</h5>

         
        <button class="btn btn-success mt-3" @click="downloadPayslip(employee)">
          Download Payslip
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      payslips: []
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/payroll/')
      this.payslips = response.data
    } catch (error) {
      console.error('Failed to fetch payroll:', error)
    }
  },
  methods: {
    downloadPayslip(employee) {
      const content = `
PAYSLIP
----------------------------------------
Name: ${employee.name}
Position: ${employee.position}
Department: ${employee.department}
Contact: ${employee.contact}

Total Working Days: ${employee.total_days}
Days Present: ${employee.present_days}
Approved Leave: ${employee.approved_leave}
Days Absent: ${employee.absent_days}

Base Salary: R${employee.salary.toLocaleString()}
Deduction for Absences: R${employee.deduction.toLocaleString()}
Final Salary: R${employee.final_salary.toLocaleString()}

Generated on: ${new Date().toLocaleDateString()}
----------------------------------------
`
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Payslip-${employee.name}.txt`
      link.click()
      URL.revokeObjectURL(url)
    }
  }
}
</script>

<style>
body {
  background: #f4f6f9;
}

h1 {
  font-weight: 700;
  text-align: center;
}

.payslip-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.payslip-card h2 {
  color: #1e3a8a;
}

.payslip-card h4 {
  color: #0d47a1;
  margin-bottom: 10px;
}

.payslip-card p {
  margin-bottom: 6px;
  font-size: 14px;
}

.payslip-card h5 {
  color: #2e7d32;
  margin-top: 10px;
}

button {
  cursor: pointer;
}
</style>




