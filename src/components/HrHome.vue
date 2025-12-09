
 <template> 
<div class="container mt-4">
  <h2>Welcome To Staff Sync</h2>


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
    <img src="@/assets/graph.png" alt="Graphs">
    <p>Graphs</p>
  </div>

  <div class="icon-card">
    <img src="@/assets/leave.png" alt="Leave">
    <p>Leave</p>
  </div>

</div>
</div>

</template>
<script>

</script> 
<style>
  .icon-container{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .icon-card{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
  }
  .icon-card img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    margin-bottom: 10px;
  }

  .icon-card p {
    text-align: center;
    font-weight: bold;
    font-size: 14px;
  }
 
.container mt-4 {
  align-items: center;
}

</style>