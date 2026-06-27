<template>
  <div class="myattendance-page">
    <h1>My Attendance</h1>

    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-icon present"><i class="ti ti-check" aria-hidden="true"></i></div>
        <div>
          <div class="summary-val">{{ presentDays }}</div>
          <div class="summary-lbl">Days present</div>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon absent"><i class="ti ti-x" aria-hidden="true"></i></div>
        <div>
          <div class="summary-val">{{ absentDays }}</div>
          <div class="summary-lbl">Days absent</div>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon total"><i class="ti ti-calendar" aria-hidden="true"></i></div>
        <div>
          <div class="summary-val">{{ attendance.length }}</div>
          <div class="summary-lbl">Total recorded</div>
        </div>
      </div>
    </div>

    <div class="attendance-table-wrap">
      <h3>Attendance record</h3>
      <table class="att-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in attendance" :key="record.id">
            <td>{{ record.date }}</td>
            <td>
              <span class="status-badge" :class="record.status.toLowerCase()">
                {{ record.status }}
              </span>
            </td>
          </tr>
          <tr v-if="attendance.length === 0">
            <td colspan="2" class="empty">No attendance records found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      attendance: []
    }
  },
  async mounted() {
    try {
      const employeeId = localStorage.getItem('employee_id')
      const response = await axios.get(`http://127.0.0.1:8000/attendance/${employeeId}`)
      this.attendance = response.data.sort((a, b) => new Date(b.date) - new Date(a.date))
    } catch (error) {
      console.error('Failed to fetch attendance:', error)
    }
  },
  computed: {
    presentDays() {
      return this.attendance.filter(a => a.status === 'Present').length
    },
    absentDays() {
      return this.attendance.filter(a => a.status === 'Absent').length
    }
  }
}
</script>

<style scoped>
.myattendance-page {
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

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.summary-card {
  background: #ffffff;
  border: 0.5px solid #e8e8f0;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.summary-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.summary-icon.present { background: #eaf3de; color: #3b6d11; }
.summary-icon.absent { background: #fcebeb; color: #a32d2d; }
.summary-icon.total { background: #e6f1fb; color: #185fa5; }

.summary-val {
  font-size: 22px;
  font-weight: 500;
  color: #2c2c2a;
}

.summary-lbl {
  font-size: 11px;
  color: #888780;
  margin-top: 2px;
}

.attendance-table-wrap {
  background: #ffffff;
  border: 0.5px solid #e8e8f0;
  border-radius: 12px;
  padding: 20px;
}

.att-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.att-table th {
  text-align: left;
  color: #888780;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 0 10px;
}

.att-table td {
  padding: 10px 0;
  border-bottom: 0.5px solid #e8e8f0;
  color: #2c2c2a;
}

.att-table tr:last-child td { border-bottom: none; }

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

.status-badge.present { background: #eaf3de; color: #3b6d11; }
.status-badge.absent { background: #fcebeb; color: #a32d2d; }
</style>