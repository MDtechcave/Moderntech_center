<template>
  <div class="review-box">
    <h2>Employee Work Review</h2>

    <!-- Inputs -->
    <label>Employee Name:</label>
    <input v-model="form.name" placeholder="Jane Doe" />

    <label>Position:</label>
    <input v-model="form.position" placeholder="Murderer" />

    <label>Rating (1–10):</label>
    <select v-model="form.rating">
      <option disabled value="">Select rating...</option>
      <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
    </select>

    <label>Comments:</label>
    <textarea v-model="form.comments" placeholder="Write your review..." />

    <button @click="submitReview">Submit Review</button>

    <h3 v-if="reviews.length">Submitted Reviews</h3>
    <div 
      v-for="(rev, index) in reviews" 
      :key="index" 
      class="review-item"
    >
      <strong>{{ rev.name }}</strong> — {{ rev.position }}
      <br>
      <strong>Rating:</strong> {{ rev.rating }}/5
      <p>{{ rev.comments }}</p>
    </div>
  </div>
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
    alert("Please fill out all fields!");
    return;
  }

  // push a copy so reactive object resets cleanly
  reviews.value.push({ ...form });

  // clear form
  form.name = "";
  form.position = "";
  form.rating = "";
  form.comments = "";
}
</script>

<style scoped>
.review-box {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
}

input, textarea, select {
  width: 100%;
  margin-top: 6px;
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.review-item {
  margin-top: 12px;
  background: #f9f9f9;
  padding: 12px;
  border-radius: 5px;
  border-left: 4px solid #007bff;
}
</style>
