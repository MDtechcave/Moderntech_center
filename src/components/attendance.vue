<template>
  <div class="attendance-page">
    <h1>Employee Records</h1>

    <LoadingSpinner v-if="loading" message="Fetching attendance records..." />

    <div class="grid-container" v-else>
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
import LoadingSpinner from './LoadingSpinner.vue'

export default {
  components: { LoadingSpinner },
  data() {
    return {
      attendanceAndLeave: [],
      role: localStorage.getItem('role') || 'employee',
      loading: true
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
      this.loading = true
      try {
        const [attendanceRes, leaveRes, employeesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/attendance/`),
          axios.get(`${import.meta.env.VITE_API_URL}/attendance/leave`),
          axios.get(`${import.meta.env.VITE_API_URL}/employees/`)
        ])

        this.attendanceAndLeave = employeesRes.data.map(emp => ({
          employeeId: emp.id,
          name: emp.name,
          attendance: attendanceRes.data.filter(a => a.employee_id === emp.id),
          leaveRequests: leaveRes.data.filter(l => l.employee_id === emp.id)
        }))
      } catch (error) {
        console.error('Failed to fetch attendance:', error)
      } finally {
        this.loading = false
      }
    },
    async updateLeave(leaveId, status) {
      try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/attendance/leave/${leaveId}`, { status })
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
  font-weight: 500;
  font-size: 22px;
  color: #2c2c2a;
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
  border: 0.5px solid #e8e8f0;
  box-shadow: 0 6px 15px rgba(0,0,0,0.06);
}

.employee-table h2 {
  text-align: center;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #2c2c2a;
}

.employee-table h3 {
  margin-top: 15px;
  font-size: 13px;
  color: #888780;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}

th {
  text-align: left;
  font-size: 11px;
  color: #888780;
  padding-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  padding: 6px 0;
  font-size: 13px;
  color: #2c2c2a;
  border-bottom: 0.5px solid #f4f4f4;
}

.attendance-row { background-color: #f8fbff; }
.leave-row { background-color: #fffbf5; }

.status-badge {
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  display: inline-block;
}

.status-badge.present { background: #eaf3de; color: #3b6d11; }
.status-badge.absent { background: #fcebeb; color: #a32d2d; }
.status-badge.pending { background: #faeeda; color: #854f0b; }
.status-badge.denied { background: #fcebeb; color: #a32d2d; }
.status-badge.approved { background: #e6f1fb; color: #185fa5; }

.btn-approve {
  background: #e6f1fb;
  color: #185fa5;
  border: none;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 5px;
  font-size: 12px;
}

.btn-deny {
  background: #fcebeb;
  color: #a32d2d;
  border: none;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}
</style>