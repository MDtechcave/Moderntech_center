<template>
  <div>
    <h1>Employee Records</h1>

    <div class="grid-container">
      <div
        class="employee-table"
        v-for="emp in attendanceAndLeave"
        :key="emp.employeeId"
      >
        <h2>{{ emp.name }}</h2>

        <!-- tablemountain, intab'etafile -->
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
export default {
  data() {
    return {
      attendanceAndLeave: [
        {
            "employeeId": 1,
            "name": "Sibongile Nkosi",
            "attendance": [
                {
                    "date": "2025-07-25",
                    "status": "Present"
                },
                {
                    "date": "2025-07-26",
                    "status": "Absent"
                },
                {
                    "date": "2025-07-27",
                    "status": "Present"
                },
                {
                    "date": "2025-07-28",
                    "status": "Present"
                },
                {
                    "date": "2025-07-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2025-07-22",
                    "reason": "Sick Leave",
                    "status": "Approved"
                },
                {
                    "date": "2024-12-01",
                    "reason": "Personal",
                    "status": "Pending"
                }
            ]
        },
        {
            "employeeId": 2,
            "name": "Lungile Moyo",
            "attendance": [
                {
                    "date": "2025-07-25",
                    "status": "Present"
                },
                {
                    "date": "2025-07-26",
                    "status": "Present"
                },
                {
                    "date": "2025-07-27",
                    "status": "Absent"
                },
                {
                    "date": "2025-07-28",
                    "status": "Present"
                },
                {
                    "date": "2025-07-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2025-07-15",
                    "reason": "Family Responsibility",
                    "status": "Denied"
                },
                {
                    "date": "2024-12-02",
                    "reason": "Vacation",
                    "status": "Approved"
                }
            ]
        },
        {
            "employeeId": 3,
            "name": "Thabo Molefe",
            "attendance": [
                {
                    "date": "2025-07-25",
                    "status": "Present"
                },
                {
                    "date": "2025-07-26",
                    "status": "Present"
                },
                {
                    "date": "2025-07-27",
                    "status": "Present"
                },
                {
                    "date": "2025-07-28",
                    "status": "Absent"
                },
                {
                    "date": "2025-07-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2025-07-10",
                    "reason": "Medical Appointment",
                    "status": "Approved"
                },
                {
                    "date": "2024-12-05",
                    "reason": "Personal",
                    "status": "Pending"
                }
            ]
        },
        {
            "employeeId": 4,
            "name": "Keshav Naidoo",
            "attendance": [
                {
                    "date": "2025-07-25",
                    "status": "Absent"
                },
                {
                    "date": "2025-07-26",
                    "status": "Present"
                },
                {
                    "date": "2025-07-27",
                    "status": "Present"
                },
                {
                    "date": "2025-07-28",
                    "status": "Present"
                },
                {
                    "date": "2025-07-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2025-07-20",
                    "reason": "Bereavement",
                    "status": "Approved"
                }
            ]
        },
        {
            "employeeId": 5,
            "name": "Zanele Khumalo",
            "attendance": [
                {
                    "date": "2025-07-25",
                    "status": "Present"
                },
                {
                    "date": "2025-07-26",
                    "status": "Present"
                },
                {
                    "date": "2025-07-27",
                    "status": "Absent"
                },
                {
                    "date": "2025-07-28",
                    "status": "Present"
                },
                {
                    "date": "2025-07-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-12-01",
                    "reason": "Childcare",
                    "status": "Pending"
                }
            ]
        },
        {
            "employeeId": 6,
            "name": "Sipho Zulu",
            "attendance": [
                {
                    "date": "2025-07-25",
                    "status": "Present"
                },
                {
                    "date": "2025-07-26",
                    "status": "Present"
                },
                {
                    "date": "2025-07-27",
                    "status": "Absent"
                },
                {
                    "date": "2025-07-28",
                    "status": "Present"
                },
                {
                    "date": "2025-07-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2025-07-18",
                    "reason": "Sick Leave",
                    "status": "Approved"
                }
            ]
        },
        {
            "employeeId": 7,
            "name": "Naledi Moeketsi",
            "attendance": [
                {
                    "date": "2025-07-25",
                    "status": "Present"
                },
                {
                    "date": "2025-07-26",
                    "status": "Present"
                },
                {
                    "date": "2025-07-27",
                    "status": "Present"
                },
                {
                    "date": "2025-07-28",
                    "status": "Absent"
                },
                {
                    "date": "2025-07-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2025-07-22",
                    "reason": "Vacation",
                    "status": "Pending"
                }
            ]
        },
        {
            "employeeId": 8,
            "name": "Farai Gumbo",
            "attendance": [
                {
                    "date": "2025-07-25",
                    "status": "Present"
                },
                {
                    "date": "2025-07-26",
                    "status": "Absent"
                },
                {
                    "date": "2025-07-27",
                    "status": "Present"
                },
                {
                    "date": "2025-07-28",
                    "status": "Present"
                },
                {
                    "date": "2025-07-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-12-02",
                    "reason": "Medical Appointment",
                    "status": "Approved"
                }
            ]
        },
        {
            "employeeId": 9,
            "name": "Karabo Dlamini",
            "attendance": [
                {
                    "date": "2025-07-25",
                    "status": "Present"
                },
                {
                    "date": "2025-07-26",
                    "status": "Present"
                },
                {
                    "date": "2025-07-27",
                    "status": "Present"
                },
                {
                    "date": "2025-07-28",
                    "status": "Absent"
                },
                {
                    "date": "2025-07-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2025-07-19",
                    "reason": "Childcare",
                    "status": "Denied"
                }
            ]
        },
        {
            "employeeId": 10,
            "name": "Fatima Patel",
            "attendance": [
                {
                    "date": "2025-07-25",
                    "status": "Present"
                },
                {
                    "date": "2025-07-26",
                    "status": "Present"
                },
                {
                    "date": "2025-07-27",
                    "status": "Absent"
                },
                {
                    "date": "2025-07-28",
                    "status": "Present"
                },
                {
                    "date": "2025-07-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-12-03",
                    "reason": "Vacation",
                    "status": "Pending"
                }
            ]
        }
    
      ]
    };
  },

  methods: {
    statusClass(status) {
      return status.toLowerCase();
    }
  }
};
</script>

<style>

.grid-container {
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
}
</style>