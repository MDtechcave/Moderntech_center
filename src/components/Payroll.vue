
<template>
  <div class="container mt-5">
    <h1 class="mb-4">Payroll Payslips</h1>

    <div
      v-for="employee in payslips"
      :key="employee.employeeId"
      class="card mb-4 payslip-card"
    >
      <div class="card-body">
        <h2 class="text-center mb-3">Payslip</h2>
        <h4>{{ employee.name }} - {{ employee.position }}</h4>
        <p><strong>Department:</strong> {{ employee.department }}</p>
        <p><strong>Contact:</strong> {{ employee.contact }}</p>

        <hr>
        <p><strong>Total Working Days:</strong> {{ employee.totalDays }}</p>
        <p><strong>Days Present:</strong> {{ employee.presentDays }}</p>
        <p><strong>Approved Leave:</strong> {{ employee.approvedLeave }}</p>
        <p><strong>Days Absent:</strong> {{ employee.absentDays }}</p>

        <hr>
        <p><strong>Base Salary:</strong> R{{ employee.salary.toLocaleString() }}</p>
        <p><strong>Deduction for Absences:</strong> R{{ employee.deduction.toLocaleString() }}</p>
        <h5><strong>Final Salary:</strong> R{{ employee.finalSalary.toLocaleString() }}</h5>

         Download button 
        <button class="btn btn-success mt-3" @click="downloadPayslip(employee)">
          Download Payslip
        </button>
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
  },

  methods: {
    downloadPayslip(employee) {
      // Build payslip content as plain text
      const content = `
PAYSLIP
----------------------------------------
Name: ${employee.name}
Position: ${employee.position}
Department: ${employee.department}
Contact: ${employee.contact}

Total Working Days: ${employee.totalDays}
Days Present: ${employee.presentDays}
Approved Leave: ${employee.approvedLeave}
Days Absent: ${employee.absentDays}

Base Salary: R${employee.salary.toLocaleString()}
Deduction for Absences: R${employee.deduction.toLocaleString()}
Final Salary: R${employee.finalSalary.toLocaleString()}

Generated on: ${new Date().toLocaleDateString()}
----------------------------------------
`;

      // Create a downloadable blob
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      // Create a temporary link to download
      const link = document.createElement("a");
      link.href = url;
      link.download = `Payslip-${employee.name}.txt`;
      link.click();

      URL.revokeObjectURL(url);
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

.payslip-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.payslip-card h2 {
  color: #1e3a8a;
}

.payslip-card h4 {
  color: #0d47a1;
  margin-bottom: 10px;
}

.payslip-card p {
  margin-bottom: 6px;
  font-size: 14px;
}

.payslip-card h5 {
  color: #2e7d32;
  margin-top: 10px;
}

button {
  cursor: pointer;
}
</style>




