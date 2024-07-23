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
      <div class="avatar-container">
        <img class="avatar" src="/Avatar-profile.svg" alt="Avatar" />
      </div>
    </div>
    <div v-else class="loading">Загрузка...</div>

    <div class="header-content">
      <div class="header-text">Ricardo Cooper</div>
      <div class="button-container">
        <Button icon="/mail.png" text="Message" />
        <Button icon="/phone.png" text="Call" />
      </div>
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
  overflow: visible;
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
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 20px;
  margin-top: -50px;
  position: relative;
  z-index: 1;
}

.header-text {
  max-width: 569px;
  height: 32px;
  gap: 0px;
  opacity: 1;
  font-family: Inter;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-align: left;
  color: #111827;

  padding-left: 270px;
}
.avatar-container {
  position: absolute;
  top: 100%;
  left: 150px;
  transform: translateY(-50%);
  border: none;
  box-shadow: none;
}

.avatar {
  max-width: 128px;
  max-height: 128px;
  border: none;
  box-shadow: none;
}

.button-container {
  display: flex;
  gap: 8px;
  margin-right: 60px;
}

@media (max-width: 768px) {
  .header-text {
    padding-left: 50px; /* Настройка для планшетов */
  }

  .header-content {
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }

  .button-container {
    margin-top: 10px;
  }
  .avatar-container {
    top: 100%;
    left: 150px;
  }
}

@media (max-width: 480px) {
  .header-text {
    padding-left: 20px; /* Настройка для телефонов */
    font-size: 20px; /* Уменьшение размера шрифта на телефонах */
  }

  .header-content {
    align-items: center;
  }

  .button-container {
    margin-top: 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  .avatar-container {
    top: 100%; /* Располагаем аватарку выше текста и кнопок */
    left: 150px;
  }
}
</style>
