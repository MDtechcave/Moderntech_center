<template>
<!-- <template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Monthly Payroll</h1>
    <div v-for="employee in payrollData" :key="employee.employeeId" class="border rounded-lg p-4 mb-4 shadow-md">
      <h2 class="text-xl font-semibold">{{ employee.name }}</h2>
      <p><strong>Department:</strong> {{ employee.department }}</p>
      <p><strong>Position:</strong> {{ employee.position }}</p>
      <p><strong>Days Worked:</strong> {{ employee.daysWorked }}</p>
      <p><strong>Approved Leave Days:</strong> {{ employee.approvedLeaveDays }}</p>
      <p class="mt-2 font-bold"><strong>Monthly Salary:</strong> ZAR {{ employee.salary.toLocaleString() }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Payroll",
  data() {
    return {
      employees: [
        // Paste your employeeInformation data here
      ],
      attendanceAndLeave: [
        // Paste your attendanceAndLeave data here
      ],
    };
  },
  computed: {
    payrollData() {
      // Combine employee info with attendance/leave
      return this.employees.map(emp => {
        const attendanceRecord = this.attendanceAndLeave.find(a => a.employeeId === emp.employeeId);

        const daysWorked = attendanceRecord.attendance.filter(a => a.status === "Present").length;

        const approvedLeaveDays = attendanceRecord.leaveRequests.filter(l => l.status === "Approved").length;

        return {
          employeeId: emp.employeeId,
          name: emp.name,
          department: emp.department,
          position: emp.position,
          daysWorked,
          approvedLeaveDays,
          salary: emp.salary,
        };
      });
    },
  },
};
</script> -->

<!-- <style scoped>
/* Optional: basic styling */
</style> -->

     <div class ="about-page">
    <div class="hero-section"></div>
    <h1>About Staff Sync</h1>
    <p>Streamlining HR operations for the modern workplace</p>

    <h2>What this system does</h2>
    <p>The system helps the teams manage employee records, attendance, payroll, and performance in one centralized platform</p>
    </div>

    <h2>Features</h2>
    <ul>
        <li>Employee Management</li>
        <li>Attendance Tracking</li>
        <li>Payroll System</li>
    </ul>
 

    <div class="features">
    <div class="feature-card">
        <i class="fa-solid fa-users fa-2x"></i>
        <h3>Employee Management</h3>
        <p>Keep track of all employee details efficiently</p>
    </div>

    <div class="feature-card">
        <i class="fa-solid fa-money-check-dollar fa-2x"></i>
        <h3>Payroll System</h3>
        <p>Automated payroll calculations with accuracy.</p>
    </div>

    <div class="feature-card">
        <i class="fa-solid fa-calender-check fa-2x"></i>
        <h3>Attendance Tracking</h3>
        <p>Monitor attendance and leave with ease</p>

    </div>


    <h2>Who is it for</h2>
    <p>This platform is designed for the HR managers, administrators and small to medium-sized organizations.</p>
    </div>

 </template> 
 <script>
export default{
    name: "About"
}
</script>

<style>
.about {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
}

.about h1 {
    margin-bottom: 20px;
}

.about h2 {
    margin-top: 25px
}

.about h2 {
    margin-top: 25px;
}
.about ul {
    margin-left: 20px;
}
</style> 