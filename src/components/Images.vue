<script setup>
import { ref, onMounted } from "vue";
import { getAllImages } from "../api";
import ModalWindow from "./ModalWindow.vue";

const images = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedImage = ref(null);
const showModal = ref(false);

onMounted(async () => {
  try {
    images.value = await getAllImages();
  } catch (err) {
    error.value = "Не удалось загрузить фотографии";
  } finally {
    loading.value = false;
  }
});

const openModal = (image) => {
  selectedImage.value = image;
  showModal.value = true;
};

const closeModal = () => {
  selectedImage.value = null;
  showModal.value = false;
};
</script>

<template>
  <div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="loading" class="loading">Загрузка...</div>
    <div v-else class="images-container">
      <div
        v-for="image in images"
        :key="image.id"
        class="image"
        @click="openModal(image)"
      >
        <img :src="image.image" :alt="'Image ' + image.id" />
        <p class="image-id">id: {{ image.id }}</p>
      </div>
    </div>
    <ModalWindow v-if="showModal" :image="selectedImage" @close="closeModal" />
  </div>
</template>

<style>
.images-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
}

.image {
  width: calc(33.33% - 20px);
  max-width: 431.33px;
  height: 216px;
  position: relative;
  cursor: pointer;
  margin-top: 20px;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.image .image-id {
  max-width: 431.33px;
  height: 20px;
  gap: 0px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: #111827;
  border-radius: 0 0 8px 8px;
  margin-top: 1px;
}

@media (max-width: 768px) {
  .image {
    width: calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .image {
    width: 100%;
  }
}
</style>
