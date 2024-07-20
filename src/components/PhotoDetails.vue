<template>
  <div>
    <img :src="photo.largeImage" alt="Large Photo" />
    <div v-if="photo.comments">
      <div v-for="comment in photo.comments" :key="comment.id">
        <p>
          <strong>{{ comment.author }}</strong
          >: {{ comment.text }}
        </p>
      </div>
    </div>
    <div>
      <textarea v-model="newComment" placeholder="Add a comment..."></textarea>
      <button @click="addComment">Add Comment</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  photo: Object,
});

const newComment = ref("");

const addComment = () => {
  if (newComment.value.trim()) {
    props.photo.comments.push({
      id: Date.now(),
      author: "Anonymous",
      text: newComment.value.trim(),
    });
    newComment.value = "";
  }
};
</script>
