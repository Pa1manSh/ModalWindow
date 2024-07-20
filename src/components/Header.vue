<script setup>
import { ref, onMounted } from "vue";
import { getFirstImage } from "../api";
import Button from "./Button.vue";

const image = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    image.value = await getFirstImage();
  } catch (err) {
    error.value = "Не удалось загрузить изображение для хедера";
    console.error(error.value, err);
  }
});
</script>

<template>
  <div>
    <div v-if="image" class="header-image">
      <img :src="image.image" :alt="'Image ' + image.id" />
    </div>
    <div v-else class="loading">Загрузка...</div>

    <div class="button-container">
      <Button icon="/mail.png" text="Message" />
      <Button icon="/phone.png" text="Call" />
    </div>
  </div>
</template>
<style>
.header-image {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1220px;
  height: 192px;
  overflow: hidden;
  margin-bottom: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .header-image {
    max-width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (max-width: 480px) {
  .header-image {
    max-width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
}
.header-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin: 30px 20px;
  margin-top: -50px;
  position: relative;
  z-index: 1;
}
</style>
