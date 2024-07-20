<script setup>
import Header from "./components/Header.vue";
import Images from "./components/Images.vue";
import ModalWindow from "./components/ModalWindow.vue";

import { ref } from "vue";

const showModal = ref(false);
const selectedImage = ref(null);

function openModal(image) {
  selectedImage.value = image;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedImage.value = null;
}
</script>

<template>
  <div id="app">
    <Header />
    <Images @image-click="openModal" />

    <ModalWindow v-if="showModal" :image="selectedImage" @close="closeModal" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 104px;
}
body {
  background-color: #cac2c2;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
