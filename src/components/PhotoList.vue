<template>
  <div>
    <div v-for="photo in photos" :key="photo.id" @click="openModal(photo)">
      <img :src="photo.image" alt="Photo" />
    </div>
    <ModalWindow
      :isOpen="isModalOpen"
      :photo="selectedPhoto"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { store } from "./store";
import ModalWindow from "./ModalWindow.vue";

const photos = ref([]);

const fetchPhotos = async () => {
  const response = await fetch("http://test-backend.itdelta.agency/api/images");
  photos.value = await response.json();
};

onMounted(() => {
  fetchPhotos();
});

const isModalOpen = computed(() => store.selectedPhoto !== null);
const selectedPhoto = computed(() => store.selectedPhoto);

const openModal = (photo) => {
  store.selectPhoto(photo);
};

const closeModal = () => {
  store.clearPhoto();
};
</script>

<style scoped>
img {
  cursor: pointer;
  margin: 10px;
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
