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
        <p class="image-id">ID: {{ image.id }}</p>
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
  gap: 20px;
}

.image {
  width: calc(33.33% - 20px);
  max-width: 431.33px;
  height: 216px;
  position: relative;
  cursor: pointer;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.image .image-id {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  text-align: left;
  color: black;
  padding: 2px 5px;
  border-radius: 0 0 8px 8px;
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
