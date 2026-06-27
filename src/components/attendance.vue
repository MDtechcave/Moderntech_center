<template>
  <div class="attendance-page">
    <h1>Employee Records</h1>

    <div class="grid-container">
      <div
        class="employee-table"
        v-for="emp in attendanceAndLeave"
        :key="emp.employeeId"
      >
        <h2>{{ emp.name }}</h2>

        
        <h3>Attendance</h3>
        <table border="0" cellpadding="5" cellspacing="0">
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
          <tr
            v-for="(att, idx) in emp.attendance"
            :key="`${emp.employeeId}-att-${idx}`"
            class="attendance-row"
          >
            <td>{{ att.date }}</td>
            <td>
              <span class="status-badge" :class="statusClass(att.status)">
                {{ att.status }}
              </span>
            </td>
          </tr>
        </table>


        <h3>Leave Requests</h3>
        <table border="0" cellpadding="5" cellspacing="0">
          <tr>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
          <tr
            v-for="(leave, idx) in emp.leaveRequests"
            :key="`${emp.employeeId}-leave-${idx}`"
            class="leave-row"
          >
            <td>{{ leave.date }}</td>
            <td>{{ leave.reason }}</td>
            <td>
              <span class="status-badge" :class="statusClass(leave.status)">
                {{ leave.status }}
              </span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      attendanceAndLeave: []
    }
  },
  async mounted() {
    try {
      const [attendanceRes, leaveRes, employeesRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/attendance/'),
        axios.get('http://127.0.0.1:8000/attendance/leave'),
        axios.get('http://127.0.0.1:8000/employees/')
      ])

      this.attendanceAndLeave = employeesRes.data.map(emp => ({
        employeeId: emp.id,
        name: emp.name,
        attendance: attendanceRes.data.filter(a => a.employee_id === emp.id),
        leaveRequests: leaveRes.data.filter(l => l.employee_id === emp.id)
      }))
    } catch (error) {
      console.error('Failed to fetch attendance:', error)
    }
  },
  methods: {
    statusClass(status) {
      return status.toLowerCase()
    }
  }
}
</script>

<style>
    /*  BACKGROUND */
.attendance-page {
  background: #f4f6f8;
  min-height: 100vh;
  padding: 30px;
}

/*  TITLE */
.attendance-page h1 {
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
}

/* GRID LAYOUT */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 25px;
}

/* EMPLOYEE CARD */
.employee-table {
  background: #ffffff;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 6px 15px rgba(0,0,0,0.06);
}

/* EMPLOYEE NAME */
.employee-table h2 {
  text-align: center;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
}

/* SECTION HEADERS */
.employee-table h3 {
  margin-top: 15px;
  font-size: 16px;
  color: #333;
}

/* TABLE */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}

th {
  text-align: left;
  font-size: 13px;
  color: #555;
  padding-bottom: 6px;
}

td {
  padding: 6px 0;
  font-size: 14px;
}

/* ROW COLORS */
.attendance-row {
  background-color: #f1f8ff;
}

.leave-row {
  background-color: #fff7eb;
}

/* STATUS BADGES */
.status-badge {
  padding: 5px 12px;
  border-radius: 14px;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  display: inline-block;
}

/* STATUS COLORS */
.status-badge.present {
  background: #2e7d32;
}

.status-badge.absent {
  background: #c62828;
}

.status-badge.pending {
  background: #f9a825;
}

.status-badge.denied {
  background: #8e0000;
}

.status-badge.approved {
  background: #1565c0;
}


/* .grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  padding: 20px;
}

.employee-table {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05);
}

.employee-table h2 {
  text-align: center;
  margin-bottom: 15px;
}

.employee-table h3 {
  margin-top: 15px;
  margin-bottom: 8px;
  color: #333;
}

.attendance-row {
  background: #e9f5ff;
}

.leave-row {
  background: #fff2e0;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  text-transform: capitalize;
  font-size: 12px;
}

.status-badge.present {
  background: #28a745;
}

.status-badge.absent {
  background: #dc3545;
}

.status-badge.pending {
  background: #ff9800;
}

.status-badge.denied {
  background: #b71c1c;
}

.status-badge.approved {
  background: #1e88e5;
} */
</style>