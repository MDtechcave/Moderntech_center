<template>
  <div class="mypayslip-page">
    <h1>My Payslip</h1>

    <div class="payslip-card" v-if="payslip">
      <div class="payslip-header">
        <div>
          <h2>{{ payslip.name }}</h2>
          <p>{{ payslip.position }} — {{ payslip.department }}</p>
          <p>{{ payslip.contact }}</p>
        </div>
        <button class="download-btn" @click="downloadPayslip">
          <i class="ti ti-download" aria-hidden="true"></i>
          Download
        </button>
      </div>

      <div class="divider"></div>

      <div class="payslip-section">
        <h3>Attendance summary</h3>
        <div class="detail-row">
          <span>Total working days</span>
          <span>{{ payslip.total_days }}</span>
        </div>
        <div class="detail-row">
          <span>Days present</span>
          <span>{{ payslip.present_days }}</span>
        </div>
        <div class="detail-row">
          <span>Approved leave</span>
          <span>{{ payslip.approved_leave }}</span>
        </div>
        <div class="detail-row">
          <span>Days absent</span>
          <span class="red">{{ payslip.absent_days }}</span>
        </div>
      </div>

      <div class="divider"></div>

      <div class="payslip-section">
        <h3>Salary breakdown</h3>
        <div class="detail-row">
          <span>Base salary</span>
          <span>R{{ payslip.salary.toLocaleString() }}</span>
        </div>
        <div class="detail-row">
          <span>Deduction for absences</span>
          <span class="red">- R{{ payslip.deduction.toLocaleString() }}</span>
        </div>
        <div class="detail-row final">
          <span>Final salary</span>
          <span class="green">R{{ payslip.final_salary.toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <i class="ti ti-file-off" style="font-size:40px;color:#888780;" aria-hidden="true"></i>
      <p>No payslip found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      payslip: null
    }
  },
  async mounted() {
    try {
      const employeeId = localStorage.getItem('employee_id')
      const response = await axios.get(`http://127.0.0.1:8000/dashboard/employee/${employeeId}`)
      this.payslip = response.data
    } catch (error) {
      console.error('Failed to fetch payslip:', error)
    }
  },
  methods: {
    downloadPayslip() {
      const content = `
PAYSLIP
----------------------------------------
Name: ${this.payslip.name}
Position: ${this.payslip.position}
Department: ${this.payslip.department}
Contact: ${this.payslip.contact}

Total Working Days: ${this.payslip.total_days}
Days Present: ${this.payslip.present_days}
Approved Leave: ${this.payslip.approved_leave}
Days Absent: ${this.payslip.absent_days}

Base Salary: R${this.payslip.salary.toLocaleString()}
Deduction: R${this.payslip.deduction.toLocaleString()}
Final Salary: R${this.payslip.final_salary.toLocaleString()}

Generated: ${new Date().toLocaleDateString()}
----------------------------------------`

      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Payslip-${this.payslip.name}.txt`
      link.click()
      URL.revokeObjectURL(url)
    }
  }
}
</script>

<style scoped>
.mypayslip-page {
  padding: 30px;
  max-width: 700px;
  margin: 0 auto;
}

h1 {
  font-size: 22px;
  font-weight: 500;
  color: #2c2c2a;
  margin-bottom: 24px;
}

.payslip-card {
  background: #ffffff;
  border: 0.5px solid #e8e8f0;
  border-radius: 12px;
  padding: 24px;
}

.payslip-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.payslip-header h2 {
  font-size: 18px;
  font-weight: 500;
  color: #2c2c2a;
  margin-bottom: 4px;
}

.payslip-header p {
  font-size: 13px;
  color: #888780;
  margin-bottom: 2px;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #e6f1fb;
  color: #185fa5;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  width: auto;
}

.download-btn:hover { background: #b5d4f4; }

.divider {
  border: none;
  border-top: 0.5px solid #e8e8f0;
  margin: 20px 0;
}

.payslip-section h3 {
  font-size: 13px;
  font-weight: 500;
  color: #888780;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #2c2c2a;
  padding: 8px 0;
  border-bottom: 0.5px solid #f4f4f4;
}

.detail-row:last-child { border-bottom: none; }

.detail-row.final {
  font-size: 15px;
  font-weight: 500;
  margin-top: 4px;
}

.red { color: #a32d2d; }
.green { color: #3b6d11; }

.empty-state {
  text-align: center;
  padding: 60px;
  color: #888780;
  font-size: 14px;
}
</style>