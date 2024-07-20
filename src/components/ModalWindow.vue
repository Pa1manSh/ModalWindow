<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-image">
        <img :src="image.largeImage" alt="Modal Image" />
      </div>
      <div class="modal-comment">
        <div class="comment-header">
          <span class="comment-label">Comment</span>
        </div>
        <textarea v-model="newComment" class="comment-input"></textarea>
        <span class="comment-about"
          >Write a few sentences about the photo.</span
        >

        <div
          v-if="image.comments && image.comments.length"
          class="comments-list"
        >
          <div
            v-for="comment in image.comments"
            :key="comment.id"
            class="comment-item"
          >
            <p>
              <strong>{{ comment.author }}:</strong> {{ comment.text }}
            </p>
          </div>
        </div>

        <button class="save-button" @click="saveComment">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { postCommentsForAllImages } from "../api";

const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);
const newComment = ref("");

const closeModal = () => {
  emit("close");
};
const saveComment = async () => {
  newComment.value = "";
  try {
    await postCommentsForAllImages(newComment.value);
    alert("Комментарий успешно добавлен ко всем изображениям");
    closeModal();
  } catch (error) {
    alert("Не удалось добавить комментарий");
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #6b7280;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  max-width: 692px;
  max-height: 706px;
  padding: 24px;
  gap: 24px;
  border-radius: 8px;
  box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.modal-image {
  max-width: 405px;
  height: 405px;
  border-radius: 24px;
  overflow: hidden;
  margin: 0 auto;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-comment {
  display: flex;
  flex-direction: column;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 24px;
}

.comment-label {
  width: 66px;
  height: 20px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;

  color: #374151;
  display: flex;
  align-items: center;
  justify-content: start;
  border-radius: 6px 0 0 0;
}

.comment-input {
  width: 100%;
  height: 105px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  font-family: Inter;
  font-size: 14px;
  resize: none;
  margin-top: 8px;
  margin-bottom: 8px;
}

.comment-about {
  width: 644px;
  height: 20px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;

  color: #6b7280;
  display: flex;
  align-items: start;
  justify-content: start;
  border-radius: 6px 0 0 0;
}

.save-button {
  max-width: 67px;
  max-height: 38px;
  padding: 9px 17px;
  border-radius: 6px;
  background: #4f46e5;
  color: white;
  border: none;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
  margin-left: 300px;
  margin-bottom: 30px;
}

.save-button:hover {
  background: #4338ca;
}

@media (max-width: 768px) {
  .modal-comment {
    min-width: 100%;
    padding-left: 8px;
    padding-right: 8px;
  }

  .comment-about {
    width: 100%;
  }

  .comment-input {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .modal-comment {
    min-width: 100%;
    padding-left: 5px;
    padding-right: 5px;
  }

  .comment-about {
    width: 100%;
  }

  .comment-input {
    max-width: 100%;
    padding: 10px;
  }
}
.comments-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* Расстояние между комментариями */
  margin-top: 10px;
}

.comment-item {
  background-color: #f0f0f0;
  border-radius: 6px;
  padding: 4px 8px; /* Уменьшенный отступ для экономии места */
  display: flex;
  align-items: center;
}
</style>
