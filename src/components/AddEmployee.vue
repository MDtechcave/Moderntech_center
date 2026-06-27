<template>
  <div class="add-employee-page">
    <h1>Add employee</h1>

    <div class="form-card">
      <div class="field-grid">
        <div class="field">
          <label>Full name</label>
          <input v-model="form.name" placeholder="e.g. Sipho Dlamini" />
        </div>
        <div class="field">
          <label>Position</label>
          <input v-model="form.position" placeholder="e.g. Software Engineer" />
        </div>
        <div class="field">
          <label>Department</label>
          <select v-model="form.department">
            <option disabled value="">Select department</option>
            <option>Development</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Marketing</option>
            <option>Sales</option>
            <option>Design</option>
            <option>IT</option>
            <option>QA</option>
            <option>Support</option>
          </select>
        </div>
        <div class="field">
          <label>Salary (R)</label>
          <input v-model="form.salary" type="number" placeholder="e.g. 55000" />
        </div>
        <div class="field full">
          <label>Employment history</label>
          <input v-model="form.employment_history" placeholder="e.g. Joined in 2026" />
        </div>
        <div class="field full">
          <label>Contact email</label>
          <input v-model="form.contact" placeholder="e.g. sipho@moderntech.com" />
        </div>
      </div>

      <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

      <div class="form-actions">
        <button class="btn-cancel" @click="$router.push('/employees')">Cancel</button>
        <button class="btn-submit" @click="submitEmployee" :disabled="loading">
          {{ loading ? 'Adding...' : 'Add employee' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        name: '',
        position: '',
        department: '',
        salary: '',
        employment_history: '',
        contact: ''
      },
      loading: false,
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    async submitEmployee() {
      if (!this.form.name || !this.form.position || !this.form.department || !this.form.salary || !this.form.contact) {
        this.errorMessage = 'Please fill out all required fields'
        return
      }

      this.loading = true
      this.errorMessage = ''
      this.successMessage = ''

      try {
        await axios.post('http://127.0.0.1:8000/employees/', {
          name: this.form.name,
          position: this.form.position,
          department: this.form.department,
          salary: parseFloat(this.form.salary),
          employment_history: this.form.employment_history,
          contact: this.form.contact
        })

        this.successMessage = `${this.form.name} added successfully!`
        this.form = { name: '', position: '', department: '', salary: '', employment_history: '', contact: '' }
      } catch (error) {
        this.errorMessage = 'Failed to add employee. Please try again.'
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.add-employee-page {
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 22px;
  font-weight: 500;
  color: #2c2c2a;
  margin-bottom: 24px;
}

.form-card {
  background: #ffffff;
  border: 0.5px solid #e8e8f0;
  border-radius: 12px;
  padding: 24px;
}

.field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.field { display: flex; flex-direction: column; gap: 5px; }
.field.full { grid-column: span 2; }

label {
  font-size: 12px;
  font-weight: 500;
  color: #5f5e5a;
}

input, select {
  padding: 9px 12px;
  border: 0.5px solid #d3d1c7;
  border-radius: 8px;
  font-size: 13px;
  color: #2c2c2a;
  background: #ffffff;
}

input:focus, select:focus {
  outline: none;
  border-color: #185fa5;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 8px;
}

.btn-cancel {
  padding: 9px 20px;
  border-radius: 8px;
  border: 0.5px solid #d3d1c7;
  background: #ffffff;
  color: #5f5e5a;
  font-size: 13px;
  cursor: pointer;
  width: auto;
}

.btn-cancel:hover { background: #f4f4f4; }

.btn-submit {
  padding: 9px 20px;
  border-radius: 8px;
  border: none;
  background: #185fa5;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  width: auto;
}

.btn-submit:hover { background: #0c447c; }
.btn-submit:disabled { background: #b5d4f4; cursor: not-allowed; }

.success-msg { color: #3b6d11; font-size: 13px; margin-bottom: 12px; }
.error-msg { color: #a32d2d; font-size: 13px; margin-bottom: 12px; }
</style>