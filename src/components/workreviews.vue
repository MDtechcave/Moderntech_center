<template>
  <div class="reviews-page">
    <div class="reviews-layout">

      <!-- Left: Form -->
      <div class="review-form-card">
        <h1>Performance Reviews</h1>
        <p class="subtitle">Record and track employee performance feedback</p>

        <div class="field">
          <label>Employee</label>
          <select v-model="form.employee_id">
            <option disabled value="">Select employee</option>
            <option v-for="emp in employees" :key="emp.id" :value="emp.id">
              {{ emp.name }} — {{ emp.position }}
            </option>
          </select>
        </div>

        <div class="field">
          <label>Rating</label>
          <div class="star-row">
            <button
              v-for="n in 5"
              :key="n"
              class="star-btn"
              :class="{ active: form.rating >= n }"
              @click="form.rating = n"
              type="button"
            >
              ★
            </button>
            <span class="rating-label" v-if="form.rating">{{ ratingLabel }}</span>
          </div>
        </div>

        <div class="field">
          <label>Comments</label>
          <textarea
            v-model="form.comments"
            placeholder="Write performance feedback..."
          ></textarea>
        </div>

        <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>

        <button class="submit-btn" @click="submitReview" :disabled="loading">
          {{ loading ? 'Submitting...' : 'Submit Review' }}
        </button>
      </div>

      <!-- Right: Submitted Reviews -->
      <div class="reviews-list-card">
        <h3>Submitted Reviews</h3>

        <LoadingSpinner v-if="loadingReviews" message="Loading reviews..." />

        <div v-else>
          <div v-if="reviews.length === 0" class="empty-reviews">
            <p>No reviews submitted yet.</p>
          </div>

          <div
            v-for="review in reviews"
            :key="review.id"
            class="review-item"
          >
            <div class="review-header">
              <div class="review-avatar">{{ review.employees?.name?.charAt(0) }}</div>
              <div>
                <div class="review-name">{{ review.employees?.name }}</div>
                <div class="review-position">{{ review.employees?.position }}</div>
              </div>
              <div class="review-stars">
                <span v-for="n in 5" :key="n" :class="{ filled: review.rating >= n }">★</span>
              </div>
            </div>
            <p class="review-comment">{{ review.comments }}</p>
            <div class="review-date">{{ new Date(review.created_at).toLocaleDateString() }}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner.vue'

const form = reactive({ employee_id: '', rating: 0, comments: '' })
const reviews = ref([])
const employees = ref([])
const successMessage = ref('')
const loading = ref(false)
const loadingReviews = ref(true)

const ratingLabel = computed(() => {
  const labels = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' }
  return labels[form.rating] || ''
})

async function fetchData() {
  try {
    const [reviewsRes, employeesRes] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/reviews/`),
      axios.get(`${import.meta.env.VITE_API_URL}/employees/`)
    ])
    reviews.value = reviewsRes.data
    employees.value = employeesRes.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
  } finally {
    loadingReviews.value = false
  }
}

async function submitReview() {
  if (!form.employee_id || !form.rating || !form.comments) {
    alert('Please fill out all fields')
    return
  }

  loading.value = true
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/reviews/`, {
      employee_id: parseInt(form.employee_id),
      rating: form.rating,
      comments: form.comments
    })

    successMessage.value = 'Review submitted successfully!'
    form.employee_id = ''
    form.rating = 0
    form.comments = ''
    await fetchData()
  } catch (error) {
    console.error('Failed to submit review:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<style scoped>
.reviews-page {
  padding: 30px;
  background: #f4f6f8;
  min-height: 100vh;
}

.reviews-layout {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 20px;
  align-items: start;
  max-width: 1100px;
  margin: 0 auto;
}

.review-form-card {
  background: #ffffff;
  border: 0.5px solid #e8e8f0;
  border-radius: 12px;
  padding: 24px;
}

h1 { font-size: 20px; font-weight: 500; color: #2c2c2a; margin-bottom: 4px; }
.subtitle { font-size: 13px; color: #888780; margin-bottom: 20px; }

.field { margin-bottom: 16px; }

label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #5f5e5a;
  margin-bottom: 6px;
}

select, textarea {
  width: 100%;
  padding: 9px 12px;
  border: 0.5px solid #d3d1c7;
  border-radius: 8px;
  font-size: 13px;
  color: #2c2c2a;
  background: #ffffff;
}

select:focus, textarea:focus { outline: none; border-color: #185fa5; }
textarea { resize: none; height: 100px; }

.star-row { display: flex; align-items: center; gap: 6px; margin-top: 4px; }

.star-btn {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #d3d1c7;
  padding: 0;
  width: auto;
  transition: color 0.15s;
}

.star-btn.active { color: #f4b400; }
.star-btn:hover { color: #f4b400; }

.rating-label { font-size: 12px; color: #888780; margin-left: 4px; }

.submit-btn {
  width: 100%;
  padding: 10px;
  background: #185fa5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover { background: #0c447c; }
.submit-btn:disabled { background: #b5d4f4; cursor: not-allowed; }

.success-msg { color: #3b6d11; font-size: 13px; margin-bottom: 12px; }

.reviews-list-card {
  background: #ffffff;
  border: 0.5px solid #e8e8f0;
  border-radius: 12px;
  padding: 24px;
}

.reviews-list-card h3 { font-size: 15px; font-weight: 500; color: #2c2c2a; margin-bottom: 16px; }

.empty-reviews { text-align: center; padding: 40px; color: #888780; font-size: 13px; }

.review-item { padding: 14px 0; border-bottom: 0.5px solid #e8e8f0; }
.review-item:last-child { border-bottom: none; }

.review-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }

.review-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e6f1fb;
  color: #185fa5;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.review-name { font-size: 13px; font-weight: 500; color: #2c2c2a; }
.review-position { font-size: 11px; color: #888780; }

.review-stars { margin-left: auto; font-size: 16px; }
.review-stars span { color: #d3d1c7; }
.review-stars span.filled { color: #f4b400; }

.review-comment { font-size: 13px; color: #5f5e5a; margin-bottom: 6px; line-height: 1.5; }
.review-date { font-size: 11px; color: #888780; }
</style>