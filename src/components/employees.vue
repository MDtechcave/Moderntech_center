<template>

  <div class="employees-page">
  <div class="table-container">

    <h1>Employees</h1>

    <table class="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Employment History</th>
          <th>Contact</th>
        </tr>
      </thead>

      <transition-group tag="tbody" name="fade">
        <tr v-for="emp in employees" :key="emp.employeeId">
          <td>{{ emp.name }}</td>
          <td>{{ emp.position }}</td>
          <td>{{ emp.department }}</td>
          <td>{{ emp.salary }}</td>
          <td>{{ emp.employmentHistory }}</td>
          <td>{{ emp.contact }}</td>

        </tr>
      </transition-group>
    </table>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [
        {"employeeId": 1,
            "name": "Sibongile Nkosi",
            "position": "Software Engineer",
            "department": "Development",
            "salary": 70000,
            "employmentHistory": "Joined in 2015, promoted to Senior in 2018",
            "contact": "sibongile.nkosi@moderntech.com"
      },
      {
            "employeeId": 2,
            "name": "Lungile Moyo",
            "position": "HR Manager",
            "department": "HR",
            "salary": 80000,
            "employmentHistory": "Joined in 2013, promoted to Manager in 2017",
            "contact": "lungile.moyo@moderntech.com"
        },
        {
            "employeeId": 3,
            "name": "Thabo Molefe",
            "position": "Quality Analyst",
            "department": "QA",
            "salary": 55000,
            "employmentHistory": "Joined in 2018",
            "contact": "thabo.molefe@moderntech.com"
        },
        {
            "employeeId": 4,
            "name": "Keshav Naidoo",
            "position": "Sales Representative",
            "department": "Sales",
            "salary": 60000,
            "employmentHistory": "Joined in 2020",
            "contact": "keshav.naidoo@moderntech.com"
        },
        {
            "employeeId": 5,
            "name": "Zanele Khumalo",
            "position": "Marketing Specialist",
            "department": "Marketing",
            "salary": 58000,
            "employmentHistory": "Joined in 2019",
            "contact": "zanele.khumalo@moderntech.com"
        },
        {
            "employeeId": 6,
            "name": "Sipho Zulu",
            "position": "UI/UX Designer",
            "department": "Design",
            "salary": 65000,
            "employmentHistory": "Joined in 2016",
            "contact": "sipho.zulu@moderntech.com"
        },
        {
            "employeeId": 7,
            "name": "Naledi Moeketsi",
            "position": "DevOps Engineer",
            "department": "IT",
            "salary": 72000,
            "employmentHistory": "Joined in 2017",
            "contact": "naledi.moeketsi@moderntech.com"
        },
        {
            "employeeId": 8,
            "name": "Farai Gumbo",
            "position": "Content Strategist",
            "department": "Marketing",
            "salary": 56000,
            "employmentHistory": "Joined in 2021",
            "contact": "farai.gumbo@moderntech.com"
        },
        {
            "employeeId": 9,
            "name": "Karabo Dlamini",
            "position": "Accountant",
            "department": "Finance",
            "salary": 62000,
            "employmentHistory": "Joined in 2018",
            "contact": "karabo.dlamini@moderntech.com"
        },
        {
            "employeeId": 10,
            "name": "Fatima Patel",
            "position": "Customer Support Lead",
            "department": "Support",
            "salary": 58000,
            "employmentHistory": "Joined in 2016",
            "contact": "fatima.patel@moderntech.com"
        }
    ]
    };
  }
};
</script>

<style>
  /* PAGE BACKGROUND */
.employees-page {
  min-height: 100vh;
  background: #f4f6f8;
  padding: 30px;
}

/* CONTAINER */
.table-container {
  max-width: 1200px;
  margin: auto;
  background: white;
  padding: 25px;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
}

/* TITLE */
.table-container h1 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
}

/* TABLE */
.employee-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

/* TABLE HEADERS */
.employee-table th {
  background: #1e3a8a; /* HR blue */
  color: white;
  padding: 12px;
  text-align: left;
  font-size: 13px;
  text-transform: uppercase;
}

/* TABLE BODY */
.employee-table td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

/* ROW HOVER */
.employee-table tbody tr:hover {
  background: #f1f5f9;
}

/* EMAIL STYLE */
.employee-table td:last-child {
  color: #2563eb;
  font-weight: 500;
}

/* TRANSITION */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .employee-table {
    font-size: 12px;
  }
}

</style>
