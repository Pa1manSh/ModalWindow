<script setup>
import { defineProps } from "vue";

const props = defineProps({
  icon: String,
  text: String,
});
</script>

<template>
  <button class="custom-button">
    <img :src="icon" alt="icon" class="button-icon" />
    <span class="button-text">{{ text }}</span>
  </button>
</template>

<style>
.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  width: 100%;
  max-width: 119px;
  height: 100%;
  max-height: 38px;
  /* padding: 100px; */
  border-radius: 6px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #070606;
  padding: 9px 17px 9px 13px;
}

.button-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.button-text {
  font-size: 14px;
  color: #333;
}
</style>
