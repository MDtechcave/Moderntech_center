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
            <th v-if="role === 'admin'">Action</th>
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
            <td v-if="role === 'admin' && leave.status === 'Pending'">
              <button class="btn-approve" @click="updateLeave(leave.id, 'Approved')">Approve</button>
              <button class="btn-deny" @click="updateLeave(leave.id, 'Denied')">Deny</button>
            </td>
            <td v-else-if="role === 'admin'"></td>
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
      attendanceAndLeave: [],
      role: localStorage.getItem('role') || 'employee'
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    statusClass(status) {
      return status.toLowerCase()
    },
    async fetchData() {
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
    async updateLeave(leaveId, status) {
      try {
        await axios.patch(`http://127.0.0.1:8000/attendance/leave/${leaveId}`, { status })
        await this.fetchData()
      } catch (error) {
        console.error('Failed to update leave:', error)
      }
    }
  }
}
</script>

<style>
.attendance-page {
  background: #f4f6f8;
  min-height: 100vh;
  padding: 30px;
}

.attendance-page h1 {
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 25px;
}

.employee-table {
  background: #ffffff;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 6px 15px rgba(0,0,0,0.06);
}

.employee-table h2 {
  text-align: center;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
}

.employee-table h3 {
  margin-top: 15px;
  font-size: 16px;
  color: #333;
}

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

.attendance-row {
  background-color: #f1f8ff;
}

.leave-row {
  background-color: #fff7eb;
}

.status-badge {
  padding: 5px 12px;
  border-radius: 14px;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  display: inline-block;
}

.status-badge.present { background: #2e7d32; }
.status-badge.absent { background: #c62828; }
.status-badge.pending { background: #f9a825; }
.status-badge.denied { background: #8e0000; }
.status-badge.approved { background: #1565c0; }

.btn-approve {
  background: #1565c0;
  color: white;
  border: none;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 5px;
  font-size: 12px;
}

.btn-deny {
  background: #8e0000;
  color: white;
  border: none;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}
</style>