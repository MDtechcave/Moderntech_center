<template>
  <div class="review-box">
    <h2>Employee Performance Review</h2>
    <p class="subtext">Record and track employee performance feedback</p>
    <p><strong style="color: red;">ONLY MANAGEMENT MUST REVIEW!</strong></p>
  </div>

     
<label>Employee ID</label>
<input v-model="form.employee_id" placeholder="e.g. 1" type="number" />

<label>Rating (1–5)</label>
<select v-model="form.rating">
  <option disabled value="">Select rating</option>
  <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
</select>

<label>Comments</label>
<textarea
  v-model="form.comments"
  placeholder="Write performance comments..."
></textarea>

<p v-if="successMessage" style="color: green;">{{ successMessage }}</p>

<button @click="submitReview">Submit Review</button>     
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";

const form = reactive({
  employee_id: "",
  rating: "",
  comments: ""
});

const reviews = ref([]);
const successMessage = ref("");

async function submitReview() {
  if (!form.employee_id || !form.rating || !form.comments) {
    alert("Please fill out all fields");
    return;
  }

  try {
    await axios.post("http://127.0.0.1:8000/reviews/", {
      employee_id: parseInt(form.employee_id),
      rating: parseInt(form.rating),
      comments: form.comments
    });

    successMessage.value = "Review submitted successfully!";
    form.employee_id = "";
    form.rating = "";
    form.comments = "";
  } catch (error) {
    console.error("Failed to submit review:", error);
    alert("Failed to submit review");
  }
}
</script>

<style scoped>
.review-box {
  max-width: 550px;
  margin: 40px auto;
  padding: 25px;
  background: #ffffff; 
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  font-family: "Segoe UI", Arial, sans-serif;
} 

 h2 {
  margin-bottom: 5px;
}

.subtext {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
}

label {
  font-weight: 600;
  font-size: 14px;
}

input,
textarea,
select {
  width: 100%;
  margin-top: 6px;
  margin-bottom: 16px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
} 

 input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #2563eb;
}

textarea {
  resize: none;
  height: 90px;
}

button {
  width: 100%;
  padding: 12px;
  background: #2563eb;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
} 
 
 button:hover {
  background: #1e4fd8;
}

.reviews-title {
  margin-top: 30px;
}

.empty-text {
  color: #888;
  font-size: 14px;
  margin-top: 20px;
}


.review-item {
  margin-top: 15px;
  background: #f8fafc;
  padding: 15px;
  border-radius: 10px;
  border-left: 4px solid #2563eb;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating {
  background: #2563eb;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}
</style>

  
