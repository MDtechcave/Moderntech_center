<template>
  <div class="myleave-page">
    <h1>My Leave</h1>

    <div class="balance-grid">
      <div class="balance-card">
        <div class="balance-icon annual"><i class="ti ti-sun" aria-hidden="true"></i></div>
        <div>
          <div class="balance-val">{{ balance.annual_leave }}</div>
          <div class="balance-lbl">Annual leave</div>
        </div>
      </div>
      <div class="balance-card">
        <div class="balance-icon sick"><i class="ti ti-thermometer" aria-hidden="true"></i></div>
        <div>
          <div class="balance-val">{{ balance.sick_leave }}</div>
          <div class="balance-lbl">Sick leave</div>
        </div>
      </div>
      <div class="balance-card">
        <div class="balance-icon family"><i class="ti ti-heart" aria-hidden="true"></i></div>
        <div>
          <div class="balance-val">{{ balance.family_responsibility }}</div>
          <div class="balance-lbl">Family responsibility</div>
        </div>
      </div>
      <div class="balance-card">
        <div class="balance-icon study"><i class="ti ti-book" aria-hidden="true"></i></div>
        <div>
          <div class="balance-val">{{ balance.study_leave }}</div>
          <div class="balance-lbl">Study leave</div>
        </div>
      </div>
    </div>

    <div class="leave-history">
      <h3>Leave history</h3>
      <table class="leave-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="leave in leaveRequests" :key="leave.id">
            <td>{{ leave.date }}</td>
            <td>{{ leave.reason }}</td>
            <td>
              <span class="status-badge" :class="leave.status.toLowerCase()">
                {{ leave.status }}
              </span>
            </td>
          </tr>
          <tr v-if="leaveRequests.length === 0">
            <td colspan="3" class="empty">No leave requests yet.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="leave-form">
      <h3>Submit new request</h3>
      <div class="field">
        <label>Date</label>
        <input type="date" v-model="form.date" />
      </div>
      <div class="field">
        <label>Reason</label>
    <select v-model="form.reason">
          <option disabled value="">Select reason</option>
          <option>Annual Leave</option>
          <option>Sick Leave</option>
          <option>Family Responsibility</option>
          <option>Medical Appointment</option>
          <option>Bereavement</option>
          <option>Childcare</option>
           <option>Study Leave</option>
    </select>
      </div>
      <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>
      <button @click="submitLeave">Submit leave request</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      leaveRequests: [],
      balance: {
        annual_leave: 0,
        sick_leave: 0,
        family_responsibility: 0,
        study_leave: 0
      },
      form: { date: '', reason: '' },
      successMessage: ''
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const employeeId = localStorage.getItem('employee_id')
        const [dashRes, balanceRes] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/dashboard/employee/${employeeId}`),
          axios.get(`http://127.0.0.1:8000/attendance/leave/balance/${employeeId}`)
        ])
        this.leaveRequests = dashRes.data.leave_requests
        this.balance = balanceRes.data
      } catch (error) {
        console.error('Failed to fetch leave data:', error)
      }
    },
    async submitLeave() {
      if (!this.form.date || !this.form.reason) {
        alert('Please fill out all fields')
        return
      }
      try {
        await axios.post('http://127.0.0.1:8000/attendance/leave', {
          employee_id: parseInt(localStorage.getItem('employee_id')),
          date: this.form.date,
          reason: this.form.reason
        })
        this.successMessage = 'Leave request submitted!'
        this.form.date = ''
        this.form.reason = ''
        await this.fetchData()
      } catch (error) {
        console.error('Failed to submit leave:', error)
      }
    }
  }
}
</script>
<style scoped>
.myleave-page {
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

h1 {
  font-size: 22px;
  font-weight: 500;
  color: #2c2c2a;
}

h3 {
  font-size: 15px;
  font-weight: 500;
  color: #2c2c2a;
  margin-bottom: 12px;
}

.leave-history, .leave-form {
  background: #ffffff;
  border: 0.5px solid #e8e8f0;
  border-radius: 12px;
  padding: 20px;
}

.leave-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.leave-table th {
  text-align: left;
  color: #888780;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 0 10px;
}

.leave-table td {
  padding: 10px 0;
  border-bottom: 0.5px solid #e8e8f0;
  color: #2c2c2a;
}

.leave-table tr:last-child td { border-bottom: none; }

.empty {
  color: #888780;
  text-align: center;
  padding: 20px 0;
}

.status-badge {
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.status-badge.approved { background: #eaf3de; color: #3b6d11; }
.status-badge.pending { background: #faeeda; color: #854f0b; }
.status-badge.denied { background: #fcebeb; color: #a32d2d; }

.field {
  margin-bottom: 14px;
}

.field label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #5f5e5a;
  margin-bottom: 5px;
}

.field input, .field select {
  width: 100%;
  padding: 9px 12px;
  border: 0.5px solid #d3d1c7;
  border-radius: 8px;
  font-size: 13px;
  color: #2c2c2a;
  background: #ffffff;
}

.field input:focus, .field select:focus {
  outline: none;
  border-color: #185fa5;
}

button {
  width: 100%;
  padding: 10px;
  background: #185fa5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover { background: #0c447c; }

.success-msg {
  color: #3b6d11;
  font-size: 13px;
  margin-bottom: 10px;
}
.balance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}

.balance-card {
  background: #ffffff;
  border: 0.5px solid #e8e8f0;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.balance-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.balance-icon.annual { background: #e6f1fb; color: #185fa5; }
.balance-icon.sick { background: #fcebeb; color: #a32d2d; }
.balance-icon.family { background: #fbeaf0; color: #993556; }
.balance-icon.study { background: #eaf3de; color: #3b6d11; }

.balance-val {
  font-size: 22px;
  font-weight: 500;
  color: #2c2c2a;
}

.balance-lbl {
  font-size: 11px;
  color: #888780;
  margin-top: 2px;
}
</style>