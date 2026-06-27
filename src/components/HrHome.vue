<template>
  <div class="dashboard">
    <div v-if="role === 'admin'">
      <h1 class="dashboard-title">Admin Dashboard</h1>

      <div class="stats-grid">
        <div class="stat-card">
          <p class="stat-label">Total Employees</p>
          <h2 class="stat-value">{{ stats.total_employees }}</h2>
        </div>
        <div class="stat-card">
          <p class="stat-label">Present Today</p>
          <h2 class="stat-value">{{ stats.present_today }}</h2>
        </div>
        <div class="stat-card">
          <p class="stat-label">Pending Leave Requests</p>
          <h2 class="stat-value">{{ stats.pending_leave_requests }}</h2>
        </div>
        <div class="stat-card">
          <p class="stat-label">Total Monthly Payroll</p>
          <h2 class="stat-value">R{{ stats.total_monthly_payroll ? stats.total_monthly_payroll.toLocaleString() : 0 }}</h2>        </div>
      </div>

      <div class="quick-links">
        <h3>Quick Links</h3>
        <div class="links-grid">
          <router-link to="/employees" class="link-card">Employee Management</router-link>
          <router-link to="/attendance" class="link-card">Attendance</router-link>
          <router-link to="/payroll" class="link-card">Payroll</router-link>
          <router-link to="/workreviews" class="link-card">Reviews</router-link>
        </div>
      </div>
    </div>

<div v-else>
  <h1 class="dashboard-title">Welcome, {{ stats.name }}</h1>
  <p class="subtitle">{{ stats.position }} — {{ stats.department }}</p>

  <div class="stats-grid">
    <div class="stat-card">
      <p class="stat-label">Days Present</p>
      <h2 class="stat-value">{{ stats.present_days }}</h2>
    </div>
    <div class="stat-card">
      <p class="stat-label">Days Absent</p>
      <h2 class="stat-value">{{ stats.absent_days }}</h2>
    </div>
    <div class="stat-card">
      <p class="stat-label">Approved Leave</p>
      <h2 class="stat-value">{{ stats.approved_leave }}</h2>
    </div>
    <div class="stat-card">
      <p class="stat-label">Pending Leave</p>
      <h2 class="stat-value">{{ stats.pending_leave }}</h2>
    </div>
    <div class="stat-card">
      <p class="stat-label">Final Salary</p>
      <h2 class="stat-value">R{{ stats.final_salary ? stats.final_salary.toLocaleString() : 0 }}</h2>
    </div>
  </div>

  <div class="leave-form">
  <h3>Submit Leave Request</h3>
  <div class="field">
    <label>Date</label>
    <input type="date" v-model="leaveForm.date" />
  </div>
  <div class="field">
    <label>Reason</label>
    <select v-model="leaveForm.reason">
      <option disabled value="">Select reason</option>
      <option>Sick Leave</option>
      <option>Vacation</option>
      <option>Family Responsibility</option>
      <option>Medical Appointment</option>
      <option>Bereavement</option>
      <option>Childcare</option>
      <option>Personal</option>
    </select>
  </div>
  <p v-if="leaveSuccess" style="color: green;">Leave request submitted successfully!</p>
  <button @click="submitLeave">Submit Leave Request</button>
</div>

  <div class="leave-section">
    <h3>My Leave Requests</h3>
    <table class="leave-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Reason</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="leave in stats.leave_requests" :key="leave.id">
          <td>{{ leave.date }}</td>
          <td>{{ leave.reason }}</td>
          <td>
            <span class="status-badge" :class="leave.status.toLowerCase()">
              {{ leave.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: "HrHome",
  data() {
    return {
      role: localStorage.getItem('role') || 'employee',
      email: localStorage.getItem('user') || '',
      stats: {
        total_days: 0,
        present_days: 0,
        absent_days: 0,
        approved_leave: 0,
        pending_leave: 0,
        salary: 0,
        deduction: 0,
        final_salary: 0,
        leave_requests: []
      },
      leaveForm: {
        date: '',
        reason: ''
      },
      leaveSuccess: false
    }
  },
  async mounted() {
    if (this.role === 'admin') {
      try {
        const response = await axios.get('http://127.0.0.1:8000/dashboard/admin')
        this.stats = response.data
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      }
    } else {
      try {
        const employeeId = localStorage.getItem('employee_id')
        const response = await axios.get(`http://127.0.0.1:8000/dashboard/employee/${employeeId}`)
        this.stats = response.data
      } catch (error) {
        console.error('Failed to fetch employee stats:', error)
      }
    }
  },
  methods: {
    async submitLeave() {
      if (!this.leaveForm.date || !this.leaveForm.reason) {
        alert('Please fill out all fields')
        return
      }

      try {
        await axios.post('http://127.0.0.1:8000/attendance/leave', {
          employee_id: parseInt(localStorage.getItem('employee_id')),
          date: this.leaveForm.date,
          reason: this.leaveForm.reason
        })

        this.leaveSuccess = true
        this.leaveForm.date = ''
        this.leaveForm.reason = ''

        const employeeId = localStorage.getItem('employee_id')
        const response = await axios.get(`http://127.0.0.1:8000/dashboard/employee/${employeeId}`)
        this.stats = response.data
      } catch (error) {
        console.error('Failed to submit leave:', error)
        alert('Failed to submit leave request')
      }
    }
  }
}
</script>
<style>
.dashboard {
  padding: 30px;
  background: #f4f6f8;
  min-height: calc(100vh - 56px);
  max-width: 1100px;
  margin: 0 auto;
}

.dashboard-title {
  font-weight: 700;
  margin-bottom: 25px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.07);
  text-align: center;
}

.stat-label {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 8px;
}

.stat-value {
  color: #1e3a8a;
  font-size: 2rem;
  font-weight: 700;
}

.quick-links h3 {
  margin-bottom: 15px;
  font-weight: 600;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 15px;
}

.link-card {
  background: #1e3a8a;
  color: white;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
}

.link-card:hover {
  background: #2563eb;
}

.subtitle {
  color: #6b7280;
}

.leave-section {
  margin-top: 30px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.07);
}

.leave-section h3 {
  margin-bottom: 15px;
  font-weight: 600;
}

.leave-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.leave-table th {
  background: #1e3a8a;
  color: white;
  padding: 10px;
  text-align: left;
}

.leave-table td {
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.approved { background:
   #1565c0; 
  }
.status-badge.pending { background:
   #f9a825; 
  }
.status-badge.denied { background:
   #8e0000; 
  }

  .leave-form {
  margin-top: 30px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.07);
}

.leave-form h3 {
  margin-bottom: 15px;
  font-weight: 600;
}

.leave-form .field {
  margin-bottom: 15px;
}

.leave-form label {
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 5px;
}

.leave-form input,
.leave-form select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}

.leave-form button {
  width: 100%;
  padding: 12px;
  background: #1e3a8a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
}

.leave-form button:hover {
  background: #2563eb;
}

</style>