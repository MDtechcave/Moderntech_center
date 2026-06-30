<template>
  <div class="home-page">
    <LoadingSpinner v-if="loading" message="Loading..." />

    <div v-else>
      <!-- ADMIN -->
      <div v-if="role === 'admin'">
        <div class="greeting-card">
          <div>
            <div class="greeting-main">Admin Dashboard</div>
            <div class="greeting-sub">ModernTech Center HR System</div>
          </div>
          <div class="date-badge">{{ today }}</div>
        </div>

        <div class="stats-grid">
          <div class="stat-card blue">
            <div class="stat-val">{{ stats.total_employees }}</div>
            <div class="stat-lbl">Total employees</div>
          </div>
          <div class="stat-card green">
            <div class="stat-val">{{ stats.present_today }}</div>
            <div class="stat-lbl">Present today</div>
          </div>
          <div class="stat-card yellow">
            <div class="stat-val">{{ stats.pending_leave_requests }}</div>
            <div class="stat-lbl">Pending leave</div>
          </div>
          <div class="stat-card">
            <div class="stat-val">R{{ stats.total_monthly_payroll ? stats.total_monthly_payroll.toLocaleString() : 0 }}</div>
            <div class="stat-lbl">Monthly payroll</div>
          </div>
        </div>
      </div>

      <!-- EMPLOYEE -->
      <div v-else>
        <div class="greeting-card">
          <div>
            <div class="greeting-main">{{ greeting }}, {{ stats.name }} 👋</div>
            <div class="greeting-sub">{{ stats.position }} — {{ stats.department }} · ModernTech Center</div>
          </div>
          <div class="date-badge">{{ today }}</div>
        </div>

        <div class="stats-grid">
          <div class="stat-card blue">
            <div class="stat-val">{{ stats.present_days }}</div>
            <div class="stat-lbl">Days present</div>
          </div>
          <div class="stat-card red">
            <div class="stat-val">{{ stats.absent_days }}</div>
            <div class="stat-lbl">Days absent</div>
          </div>
          <div class="stat-card yellow">
            <div class="stat-val">{{ stats.pending_leave }}</div>
            <div class="stat-lbl">Pending leave</div>
          </div>
          <div class="stat-card green">
            <div class="stat-val">R{{ stats.final_salary ? stats.final_salary.toLocaleString() : 0 }}</div>
            <div class="stat-lbl">Final salary</div>
          </div>
        </div>

        <div class="clockin-section">
          <div class="clockin-card">
            <div>
              <div class="clockin-title">{{ clockedIn ? 'You are clocked in today ✓' : 'Not clocked in yet' }}</div>
              <div class="clockin-sub">{{ clockedIn ? 'Attendance recorded for today' : 'Press the button to record your attendance' }}</div>
            </div>
            <button
              class="clockin-btn"
              :class="{ clocked: clockedIn }"
              @click="clockIn"
              :disabled="clockedIn"
            >
              {{ clockedIn ? 'Clocked In' : 'Clock In' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner.vue'

export default {
  name: 'HrHome',
  components: { LoadingSpinner },
  data() {
    return {
      role: localStorage.getItem('role') || 'employee',
      loading: true,
      stats: {},
      clockedIn: false,
      today: new Date().toLocaleDateString('en-ZA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  computed: {
    greeting() {
      const hour = new Date().getHours()
      if (hour < 12) return 'Good morning'
      if (hour < 17) return 'Good afternoon'
      return 'Good evening'
    }
  },
  async mounted() {
    try {
      if (this.role === 'admin') {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/admin`)
        this.stats = response.data
      } else {
        const employeeId = localStorage.getItem('employee_id')
        const [statsRes, attRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/dashboard/employee/${employeeId}`),
          axios.get(`${import.meta.env.VITE_API_URL}/attendance/${employeeId}`)
        ])
        this.stats = statsRes.data
        const today = new Date().toISOString().split('T')[0]
        const todayRecord = attRes.data.find(a => a.date === today)
        if (todayRecord) this.clockedIn = true
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    async clockIn() {
      try {
        const employeeId = parseInt(localStorage.getItem('employee_id'))
        await axios.post(`${import.meta.env.VITE_API_URL}/attendance/clockin`, {
          employee_id: employeeId
        })
        this.clockedIn = true
      } catch (error) {
        console.error('Failed to clock in:', error)
      }
    }
  }
}
</script>

<style>
.home-page {
  padding: 30px;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.greeting-card {
  background: #ffffff;
  border: 0.5px solid #e8e8f0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.greeting-main { font-size: 20px; font-weight: 500; color: #2c2c2a; margin-bottom: 4px; }
.greeting-sub { font-size: 13px; color: #888780; }

.date-badge {
  font-size: 11px;
  color: #888780;
  background: #f4f6f8;
  border: 0.5px solid #e8e8f0;
  padding: 6px 12px;
  border-radius: 6px;
  white-space: nowrap;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.stat-card {
  background: #ffffff;
  border: 0.5px solid #e8e8f0;
  border-radius: 10px;
  padding: 20px 16px;
}

.stat-val { font-size: 26px; font-weight: 500; color: #2c2c2a; }
.stat-lbl { font-size: 11px; color: #888780; margin-top: 4px; }

.stat-card.blue { border-color: #b5d4f4; }
.stat-card.blue .stat-val { color: #185fa5; }
.stat-card.green { border-color: #b8dca0; }
.stat-card.green .stat-val { color: #3b6d11; }
.stat-card.red { border-color: #f4b5b5; }
.stat-card.red .stat-val { color: #a32d2d; }
.stat-card.yellow { border-color: #f4dfa0; }
.stat-card.yellow .stat-val { color: #854f0b; }

.clockin-section { margin-top: 4px; }

.clockin-card {
  background: #ffffff;
  border: 0.5px solid #e8e8f0;
  border-radius: 12px;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clockin-title { font-size: 15px; font-weight: 500; color: #2c2c2a; margin-bottom: 4px; }
.clockin-sub { font-size: 12px; color: #888780; }

.clockin-btn {
  padding: 10px 24px;
  background: #185fa5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  width: auto;
  transition: background 0.2s;
}

.clockin-btn:hover { background: #0c447c; }
.clockin-btn.clocked { background: #3b6d11; cursor: not-allowed; }
</style>