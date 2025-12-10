<template>
  <div class="hr-home">
    <div class="dashboard-card">

      <h2>Welcome to StaffSync</h2>
      <p class="subtitle">
        Manage employees, attendance, payroll and leave <strong> all in one place</strong>!
      </p>

      <div class="icon-container">
        <div class="icon-card">
          <img src="@/assets/attendance.png" alt="Attendance">
          <p>Attendance</p>
        </div>

        <div class="icon-card">
          <img src="@/assets/payroll.png" alt="Payroll">
          <p>Payroll</p>
        </div>

        <div class="icon-card">
          <img src="@/assets/graph.png" alt="Reports">
          <p>Reports</p>
        </div>

        <div class="icon-card">
          <img src="@/assets/leave.png" alt="Leave">
          <p>Leave</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "HrHome",
};
</script>

<style >
/* FULL PAGE CENTERING */
.hr-home {
  min-height: calc(100vh - 56px); /* navbar height */
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f6f8;
}

/* DASHBOARD CARD */
.dashboard-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

/* TITLE */
.dashboard-card h2 {
  font-weight: 700;
  margin-bottom: 10px;
}

/* SUBTITLE */
.subtitle {
  color: #6c757d;
  margin-bottom: 30px;
}

/* ICON LAYOUT */
.icon-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

/* ICON CARD */
.icon-card {
  width: 140px;
  padding: 20px;
  border-radius: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.icon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* ICON IMG */
.icon-card img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

/* ICON TEXT */
.icon-card p {
  font-weight: 600;
}
</style>

