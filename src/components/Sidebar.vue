<template>
  <div class="sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-header">
      <div class="brand" v-if="!isCollapsed">
        <i class="ti ti-users" aria-hidden="true"></i>
        StaffSync
      </div>
      <button class="collapse-btn" @click="toggleSidebar" :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'">
        <i :class="isCollapsed ? 'ti ti-chevron-right' : 'ti ti-chevron-left'" aria-hidden="true"></i>
      </button>
    </div>

    <nav class="sidebar-nav">
      <template v-if="role === 'admin'">
        <div class="nav-section" v-if="!isCollapsed">Overview</div>
        <router-link to="/" class="nav-item" exact>
          <i class="ti ti-layout-dashboard" aria-hidden="true"></i>
          <span v-if="!isCollapsed">Dashboard</span>
        </router-link>

        <div class="nav-section" v-if="!isCollapsed">HR Management</div>
        <router-link to="/employees" class="nav-item">
          <i class="ti ti-user" aria-hidden="true"></i>
          <span v-if="!isCollapsed">Employees</span>
        </router-link>
        <router-link to="/attendance" class="nav-item">
          <i class="ti ti-calendar-check" aria-hidden="true"></i>
          <span v-if="!isCollapsed">Attendance</span>
        </router-link>
        <router-link to="/payroll" class="nav-item">
          <i class="ti ti-cash" aria-hidden="true"></i>
          <span v-if="!isCollapsed">Payroll</span>
        </router-link>
        <router-link to="/workreviews" class="nav-item">
          <i class="ti ti-star" aria-hidden="true"></i>
          <span v-if="!isCollapsed">Reviews</span>
        </router-link>
      </template>

      <template v-if="role === 'employee'">
        <router-link to="/" class="nav-item" exact>
          <i class="ti ti-home" aria-hidden="true"></i>
          <span v-if="!isCollapsed">Dashboard</span>
        </router-link>
        <router-link to="/myleave" class="nav-item">
          <i class="ti ti-calendar" aria-hidden="true"></i>
          <span v-if="!isCollapsed">My leave</span>
        </router-link>
        <router-link to="/myattendance" class="nav-item">
          <i class="ti ti-clock" aria-hidden="true"></i>
          <span v-if="!isCollapsed">Attendance</span>
        </router-link>
        <router-link to="/mypayslip" class="nav-item">
          <i class="ti ti-file-text" aria-hidden="true"></i>
          <span v-if="!isCollapsed">My payslip</span>
        </router-link>
      </template>
    </nav>

    <div class="sidebar-footer">
      <button class="logout-btn" @click="logout">
        <i class="ti ti-logout" aria-hidden="true"></i>
        <span v-if="!isCollapsed">Logout</span>
      </button>
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabase'

export default {
  data() {
    return {
      isCollapsed: false,
      role: localStorage.getItem('role') || 'employee'
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    },
    async logout() {
      await supabase.auth.signOut()
      localStorage.removeItem('user')
      localStorage.removeItem('role')
      localStorage.removeItem('employee_id')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.sidebar {
  width: 220px;
  min-height: 100vh;
  background: #ffffff;
  border-right: 0.5px solid #e8e8f0;
  display: flex;
  flex-direction: column;
  padding: 16px 10px;
  gap: 2px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  transition: width 0.25s ease;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  margin-bottom: 16px;
}

.brand {
  font-size: 15px;
  font-weight: 500;
  color: #185fa5;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.brand i { font-size: 18px; }

.collapse-btn {
  background: #e6f1fb;
  border: none;
  border-radius: 6px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #185fa5;
  flex-shrink: 0;
  font-size: 14px;
}

.collapse-btn:hover { background: #b5d4f4; }

.nav-section {
  font-size: 10px;
  color: #888780;
  padding: 8px 12px 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  font-size: 13px;
  color: #5f5e5a;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.nav-item i { font-size: 17px; flex-shrink: 0; }

.nav-item:hover {
  background: #e6f1fb;
  color: #185fa5;
}

.nav-item.router-link-active,
.nav-item.router-link-exact-active {
  background: #e6f1fb;
  color: #185fa5;
  font-weight: 500;
}

.sidebar-footer {
  border-top: 0.5px solid #e8e8f0;
  padding-top: 10px;
  margin-top: 8px;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: #a32d2d;
  font-size: 13px;
  cursor: pointer;
  width: 100%;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.logout-btn i { font-size: 17px; flex-shrink: 0; }

.logout-btn:hover { background: #fcebeb; }
</style>