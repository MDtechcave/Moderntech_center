<template>
  <div class="payroll-page">
    <div class="payroll-header">
      <h1>Payroll</h1>
      <p class="payroll-sub">Click an employee to view their payslip</p>
    </div>

    <LoadingSpinner v-if="loading" message="Calculating payroll..." />

    <div class="payroll-layout" v-else>
      <!-- Employee List -->
      <div class="employee-list">
        <div
          v-for="employee in payslips"
          :key="employee.employee_id"
          class="emp-row"
          :class="{ active: selected && selected.employee_id === employee.employee_id }"
          @click="selected = employee"
        >
          <div class="emp-avatar">{{ employee.name.charAt(0) }}</div>
          <div>
            <div class="emp-name">{{ employee.name }}</div>
            <div class="emp-dept">{{ employee.department }}</div>
          </div>
          <span class="emp-arrow">›</span>
        </div>
      </div>

      <!-- Payslip View -->
      <div class="payslip-view" v-if="selected">
        <div class="payslip-card">
          <div class="ps-header">
            <div class="ps-avatar">{{ selected.name.charAt(0) }}</div>
            <div>
              <div class="ps-name">{{ selected.name }}</div>
              <div class="ps-meta">{{ selected.position }} — {{ selected.department }}</div>
              <div class="ps-meta">{{ selected.contact }}</div>
            </div>
            <button class="dl-btn" @click="downloadPayslip(selected)">
              <i class="ti ti-download" aria-hidden="true"></i>
              Download
            </button>
          </div>

          <div class="divider"></div>

          <div class="ps-stats">
            <div class="ps-stat">
              <div class="ps-stat-val">{{ selected.present_days }}</div>
              <div class="ps-stat-lbl">Present</div>
            </div>
            <div class="ps-stat">
              <div class="ps-stat-val red">{{ selected.absent_days }}</div>
              <div class="ps-stat-lbl">Absent</div>
            </div>
            <div class="ps-stat">
              <div class="ps-stat-val">{{ selected.approved_leave }}</div>
              <div class="ps-stat-lbl">Leave</div>
            </div>
            <div class="ps-stat">
              <div class="ps-stat-val">{{ selected.total_days }}</div>
              <div class="ps-stat-lbl">Working days</div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="salary-breakdown">
            <div class="salary-row">
              <span>Base salary</span>
              <span>R{{ selected.salary.toLocaleString() }}</span>
            </div>
            <div class="salary-row">
              <span>Deduction for absences</span>
              <span class="red">- R{{ selected.deduction.toLocaleString() }}</span>
            </div>
            <div class="salary-row final">
              <span>Final salary</span>
              <span class="green">R{{ selected.final_salary.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div class="empty-state" v-else>
        <i class="ti ti-hand-click" style="font-size:36px;color:#888780;" aria-hidden="true"></i>
        <p>Select an employee to view their payslip</p>
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
      selected: null,
      loading: true
    }
  },
  async mounted() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/payroll/`)
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

.payroll-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 16px;
  align-items: start;
}

.employee-list {
  background: #ffffff;
  border: 0.5px solid #e8e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.emp-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 0.5px solid #e8e8f0;
  cursor: pointer;
  transition: background 0.15s;
}

.emp-row:last-child { border-bottom: none; }
.emp-row:hover { background: #f4f6f8; }

.emp-row.active {
  background: #e6f1fb;
  border-left: 3px solid #185fa5;
}

.emp-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e6f1fb;
  color: #185fa5;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.emp-name { font-size: 13px; font-weight: 500; color: #2c2c2a; }
.emp-dept { font-size: 11px; color: #888780; margin-top: 1px; }
.emp-arrow { margin-left: auto; color: #888780; font-size: 18px; }

.payslip-card {
  background: #ffffff;
  border: 0.5px solid #e8e8f0;
  border-radius: 12px;
  padding: 24px;
}

.ps-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 16px;
}

.ps-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #e6f1fb;
  color: #185fa5;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ps-name { font-size: 16px; font-weight: 500; color: #2c2c2a; margin-bottom: 3px; }
.ps-meta { font-size: 12px; color: #888780; margin-bottom: 2px; }

.dl-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  padding: 8px 14px;
  background: #e6f1fb;
  color: #185fa5;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  width: auto;
  white-space: nowrap;
}

.dl-btn:hover { background: #b5d4f4; }

.divider {
  border: none;
  border-top: 0.5px solid #e8e8f0;
  margin: 16px 0;
}

.ps-stats { display: flex; justify-content: space-around; }
.ps-stat { text-align: center; }
.ps-stat-val { font-size: 24px; font-weight: 500; color: #2c2c2a; }
.ps-stat-lbl { font-size: 11px; color: #888780; margin-top: 3px; text-transform: uppercase; letter-spacing: 0.5px; }

.salary-breakdown { display: flex; flex-direction: column; gap: 10px; }
.salary-row { display: flex; justify-content: space-between; font-size: 13px; color: #2c2c2a; }
.salary-row.final { font-size: 15px; font-weight: 500; padding-top: 10px; border-top: 0.5px solid #e8e8f0; }

.red { color: #a32d2d; }
.green { color: #3b6d11; }

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 80px;
  color: #888780;
  font-size: 13px;
  background: #ffffff;
  border: 0.5px solid #e8e8f0;
  border-radius: 12px;
}
</style>
