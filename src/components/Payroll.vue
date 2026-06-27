
<template>
  <div class="payroll-page">
    <div class="payroll-header">
      <h1>Payroll</h1>
      <p class="payroll-sub">Monthly payslips for all employees</p>
    </div>

    <LoadingSpinner v-if="loading" message="Calculating payroll..." />

    <div class="payroll-grid" v-else>
      <div
        v-for="employee in payslips"
        :key="employee.employee_id"
        class="payslip-card"
      >
        <div class="payslip-card-header">
          <div class="employee-avatar">
            {{ employee.name.charAt(0) }}
          </div>
          <div>
            <div class="employee-name">{{ employee.name }}</div>
            <div class="employee-meta">{{ employee.position }} — {{ employee.department }}</div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="payslip-stats">
          <div class="stat-item">
            <span class="stat-label">Present</span>
            <span class="stat-val">{{ employee.present_days }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Absent</span>
            <span class="stat-val red">{{ employee.absent_days }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Leave</span>
            <span class="stat-val">{{ employee.approved_leave }}</span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="salary-breakdown">
          <div class="salary-row">
            <span>Base salary</span>
            <span>R{{ employee.salary.toLocaleString() }}</span>
          </div>
          <div class="salary-row">
            <span>Deduction</span>
            <span class="red">- R{{ employee.deduction.toLocaleString() }}</span>
          </div>
          <div class="salary-row final">
            <span>Final salary</span>
            <span class="green">R{{ employee.final_salary.toLocaleString() }}</span>
          </div>
        </div>

        <button class="download-btn" @click="downloadPayslip(employee)">
          <i class="ti ti-download" aria-hidden="true"></i>
          Download payslip
        </button>
      </div>
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
      payslips: [],
      loading: true
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/payroll/')
      this.payslips = response.data
    } catch (error) {
      console.error('Failed to fetch payroll:', error)
    } finally {
      this.loading = false
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
----------------------------------------`
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
.payroll-page {
  padding: 30px;
  background: #f4f6f8;
  min-height: 100vh;
}

.payroll-header {
  margin-bottom: 24px;
}

.payroll-header h1 {
  font-size: 22px;
  font-weight: 500;
  color: #2c2c2a;
  margin-bottom: 4px;
}

.payroll-sub {
  font-size: 13px;
  color: #888780;
}

.payroll-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.payslip-card {
  background: #ffffff;
  border: 0.5px solid #e8e8f0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.payslip-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.employee-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #e6f1fb;
  color: #185fa5;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.employee-name {
  font-size: 14px;
  font-weight: 500;
  color: #2c2c2a;
}

.employee-meta {
  font-size: 12px;
  color: #888780;
  margin-top: 2px;
}

.divider {
  border: none;
  border-top: 0.5px solid #e8e8f0;
  margin: 14px 0;
}

.payslip-stats {
  display: flex;
  justify-content: space-between;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-label {
  font-size: 11px;
  color: #888780;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-val {
  font-size: 18px;
  font-weight: 500;
  color: #2c2c2a;
}

.salary-breakdown {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.salary-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #2c2c2a;
}

.salary-row.final {
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
  padding-top: 8px;
  border-top: 0.5px solid #e8e8f0;
}

.red { color: #a32d2d; }
.green { color: #3b6d11; }

.download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
  padding: 9px;
  background: #e6f1fb;
  color: #185fa5;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;
}

.download-btn:hover { background: #b5d4f4; }
</style>