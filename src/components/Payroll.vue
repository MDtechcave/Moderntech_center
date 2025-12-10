<template>
  <div class="container mt-5">
    <h1 class="mb-4">Payroll Payslips</h1>

    <div v-for="employee in payslips" :key="employee.employeeId" class="card mb-3">
      <div class="card-body">
        <h4>{{ employee.name }} - {{ employee.position }}</h4>
        <p><strong>Department:</strong> {{ employee.department }}</p>
        <p><strong>Contact:</strong> {{ employee.contact }}</p>

        <hr>
        <p><strong>Total Working Days:</strong> {{ employee.totalDays }}</p>
        <p><strong>Days Present:</strong> {{ employee.presentDays }}</p>
        <p><strong>Approved Leave:</strong> {{ employee.approvedLeave }}</p>
        <p><strong>Days Absent:</strong> {{ employee.absentDays }}</p>

        <hr>
        <p><strong>Base Salary:</strong> R{{ employee.salary }}</p>
        <p><strong>Deduction for Absences:</strong> R{{ employee.deduction }}</p>
        <h5><strong>Final Salary:</strong> R{{ employee.finalSalary }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [
        {
          employeeId: 1,
          name: "Sibongile Nkosi",
          position: "Software Engineer",
          department: "Development",
          salary: 70000,
          contact: "sibongile.nkosi@moderntech.com"
        },
        {
          employeeId: 2,
          name: "Lungile Moyo",
          position: "HR Manager",
          department: "HR",
          salary: 80000,
          contact: "lungile.moyo@moderntech.com"
        }
      ],

      attendance: [
        {
          employeeId: 1,
          presentDays: 20,
          approvedLeave: 2,
          absentDays: 2
        },
        {
          employeeId: 2,
          presentDays: 22,
          approvedLeave: 1,
          absentDays: 1
        }
      ]
    };
  },

  computed: {
    payslips() {
      return this.employees.map(emp => {
        const record = this.attendance.find(
          att => att.employeeId === emp.employeeId
        );

        const totalDays = 22;
        const dailyRate = emp.salary / totalDays;
        const deduction = dailyRate * record.absentDays;

        return {
          ...emp,
          totalDays,
          presentDays: record.presentDays,
          approvedLeave: record.approvedLeave,
          absentDays: record.absentDays,
          deduction: Math.round(deduction),
          finalSalary: Math.round(emp.salary - deduction)
        };
      });
    }
  }
};
</script>

<style>
    body {
  background: #f4f6f9;
}

h1 {
  font-weight: 700;
  text-align: center;
}

.card h4 {
  color: #1e3a8a;
}

.card p {
  margin-bottom: 6px;
}

.card h5 {
  color: #2e7d32;
}

</style>

