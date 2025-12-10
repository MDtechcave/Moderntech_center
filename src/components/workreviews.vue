<template>
  <div class="review-box">
    <h2>Employee Performance Review</h2>
    <p class="subtext">Record and track employee performance feedback</p>
    <p><strong style="color: red;">ONLY MANAGEMENT MUST REVIEW!</strong></p>


     Inputs
     <label>Employee Name</label>
    <input v-model="form.name" placeholder="Jane Doe" />

    <label>Position</label>
    <input v-model="form.position" placeholder="Software Developer" />

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

    <button @click="submitReview">Submit Review</button>

      <!-- Reviews 
     <h3 v-if="reviews.length" class="reviews-title">Submitted Reviews</h3>
    <p v-else class="empty-text">No reviews submitted yet.</p>

     <div
      v-for="(rev, index) in reviews"
      :key="index"
      class="review-item"
    >
      <div class="review-header">
        <strong>{{ rev.name }}</strong>
        <span class="rating">{{ rev.rating }}/5</span>
      </div>

      <small>{{ rev.position }}</small>
      <p>{{ rev.comments }}</p> -->
    </div> 
  <!-- </div>  -->
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  name: "",
  position: "",
  rating: "", 
 comments: ""
});

const reviews = ref([]);

function submitReview() {
  if (!form.name || !form.position || !form.rating || !form.comments) {
    alert("Please fill out all fields");
    return;
  }

  // reviews.value.push({ ...form });

  // form.name = "";
  // form.position = "";
  // form.rating = "";
  // form.comments = "";
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

  
